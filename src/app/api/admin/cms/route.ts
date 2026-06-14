/**
 * /admin 用 CMS データ API (KV 読み書き)。
 *
 * - GET: 全データ取得 (KV 優先 / 静的 JSON フォールバック)
 * - PUT: { action: "upsert" | "delete", collection, item | id }
 *   upsert 時は bodySource (Markdoc 原文) を edge 上で HTML に変換して保存する。
 *   保存後は公開ページが次のリクエストから KV の新データを読むため即時反映となる。
 */
import Markdoc from "@markdoc/markdoc";
import { isAuthorized } from "@/lib/admin-auth";
import {
  CMS_KV_KEY,
  DEFAULT_CONTACT,
  getCmsKv,
  getCmsData,
  type CmsData,
} from "@/lib/cms-data";
import type { ContactSettings, HelpCategory } from "@/lib/content-types";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type Collection =
  | "cases"
  | "usecases"
  | "helpCategories"
  | "helpArticles"
  | "faqCategories"
  | "legalPages";

const COLLECTIONS: Collection[] = [
  "cases",
  "usecases",
  "helpCategories",
  "helpArticles",
  "faqCategories",
  "legalPages",
];

type UpsertPayload = {
  action: "upsert";
  collection: Collection;
  item: Record<string, unknown>;
};

type DeletePayload = {
  action: "delete";
  collection: Collection;
  id: string;
};

type SaveContactPayload = {
  action: "saveContact";
  contact: Partial<ContactSettings>;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function normalizeContact(input: Partial<ContactSettings> | undefined): ContactSettings {
  const c = input ?? {};
  return {
    signupUrl: asString(c.signupUrl).trim(),
    spirGeneral: asString(c.spirGeneral).trim(),
    spirOfficial: asString(c.spirOfficial).trim(),
    spirThreeHour: asString(c.spirThreeHour).trim(),
    spirFull: asString(c.spirFull).trim(),
    spirPartner: asString(c.spirPartner).trim(),
    // 埋め込みコードはHTMLなのでtrimのみ（改行は保持）
    generalCalendarEmbed: asString(c.generalCalendarEmbed).trim(),
  };
}

function renderMdoc(source: string): string | undefined {
  if (!source.trim()) return undefined;
  const ast = Markdoc.parse(source);
  const transformed = Markdoc.transform(ast);
  return Markdoc.renderers.html(transformed);
}

function unauthorized(): Response {
  return Response.json({ error: "認証が必要です。" }, { status: 401 });
}

export async function GET(req: Request) {
  if (!(await isAuthorized(req))) return unauthorized();
  const data = await getCmsData();
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request) {
  if (!(await isAuthorized(req))) return unauthorized();

  const kv = getCmsKv();
  if (!kv) {
    return Response.json(
      {
        error:
          "KV が利用できない環境です (ローカル開発では Keystatic をご利用ください)。",
      },
      { status: 500 },
    );
  }

  let payload: UpsertPayload | DeletePayload | SaveContactPayload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  // 最新を読み直して read-modify-write (短命キャッシュを避けるため KV を直接読む)
  const raw = await kv.get(CMS_KV_KEY, "text");
  const data: CmsData = raw ? (JSON.parse(raw) as CmsData) : await getCmsData();

  // 旧データに存在しない可能性のあるコレクションを初期化しておく
  if (!Array.isArray(data.legalPages)) data.legalPages = [];

  // お問い合わせ / 予約リンク設定の保存 (コレクションではなく単一オブジェクト)
  if (payload.action === "saveContact") {
    data.contact = { ...DEFAULT_CONTACT, ...normalizeContact(payload.contact) };
    data.generatedAt = new Date().toISOString();
    await kv.put(CMS_KV_KEY, JSON.stringify(data));
    return Response.json({ ok: true, data });
  }

  if (!COLLECTIONS.includes(payload.collection)) {
    return Response.json(
      { error: "不明なコレクションです。" },
      { status: 400 },
    );
  }

  if (payload.action === "delete") {
    const list = data[payload.collection] as Array<{ id: string }>;
    const next = list.filter((x) => x.id !== payload.id);
    if (next.length === list.length) {
      return Response.json(
        { error: "対象が見つかりません。" },
        { status: 404 },
      );
    }
    (data[payload.collection] as unknown) = next;
  } else if (payload.action === "upsert") {
    const item = payload.item;
    const id = typeof item.id === "string" && item.id ? item.id : null;
    if (!id) {
      return Response.json({ error: "id は必須です。" }, { status: 400 });
    }

    const now = new Date().toISOString();
    item.updatedAt = now;

    // Markdoc 原文を持つコレクションは HTML を再生成
    if (
      payload.collection === "cases" ||
      payload.collection === "usecases" ||
      payload.collection === "helpArticles" ||
      payload.collection === "legalPages"
    ) {
      const src = typeof item.bodySource === "string" ? item.bodySource : "";
      item.body = renderMdoc(src);
      item.bodySource = src || undefined;
    }

    // ヘルプ記事はカテゴリタイトルを非正規化して保持しているため解決する
    if (payload.collection === "helpArticles") {
      const cat = item.category as { slug?: string } | string | undefined;
      const slug =
        typeof cat === "string"
          ? cat
          : typeof cat?.slug === "string"
            ? cat.slug
            : "";
      const found = data.helpCategories.find((c) => c.slug === slug);
      item.category = { slug, title: found?.title ?? slug };
    }

    const list = data[payload.collection] as Array<Record<string, unknown>>;
    const idx = list.findIndex((x) => x.id === id);
    if (idx >= 0) {
      if (!item.publishedAt && list[idx].publishedAt) {
        item.publishedAt = list[idx].publishedAt;
      }
      list[idx] = item;
    } else {
      item.publishedAt = item.publishedAt ?? now;
      list.push(item);
    }

    if (payload.collection === "helpCategories") {
      (data.helpCategories as HelpCategory[]).sort(
        (a, b) => (a.order ?? 99) - (b.order ?? 99),
      );
    }
  } else {
    return Response.json({ error: "不明な操作です。" }, { status: 400 });
  }

  data.generatedAt = new Date().toISOString();
  await kv.put(CMS_KV_KEY, JSON.stringify(data));

  return Response.json({ ok: true, data });
}
