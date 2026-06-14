/**
 * ランタイム CMS データアクセサ (KV 優先 / 静的 JSON フォールバック)。
 *
 * - Cloudflare Pages 上では KV (CMS_KV) からリクエスト時に読み込む。
 *   /admin での保存が push・再ビルドなしで即座に公開ページへ反映される。
 * - KV が無い環境 (next dev / ビルド時の静的生成) では
 *   dump:cms が生成した cms.generated.json にフォールバックする。
 * - すべて async。利用側ページは edge runtime + force-dynamic を指定すること。
 */
import { getRequestContext } from "@cloudflare/next-on-pages";
import generated from "../data/cms.generated.json";
import {
  getHelpCategorySlug,
  type CaseEntry,
  type UsecaseEntry,
  type HelpCategory,
  type HelpArticle,
  type FAQCategory,
  type ContactSettings,
} from "./content-types";

export type CmsData = {
  generatedAt: string;
  cases: CaseEntry[];
  usecases: UsecaseEntry[];
  helpCategories: HelpCategory[];
  helpArticles: HelpArticle[];
  faqCategories: FAQCategory[];
  contact?: ContactSettings;
};

/** お問い合わせ設定の既定値 (未設定項目は空文字 → 利用側で env / 既定値にフォールバック)。 */
export const DEFAULT_CONTACT: ContactSettings = {
  signupUrl: "",
  spirGeneral: "",
  spirOfficial: "",
  spirThreeHour: "",
  spirFull: "",
  spirPartner: "",
  generalCalendarEmbed: "",
};

export const CMS_KV_KEY = "cms:data";

type KvLike = {
  get(key: string, type: "text"): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

const fallback = generated as unknown as CmsData;

export function getCmsKv(): KvLike | null {
  try {
    const env = getRequestContext().env as { CMS_KV?: KvLike };
    return env.CMS_KV ?? null;
  } catch {
    return null;
  }
}

/**
 * isolate 単位の短命キャッシュ。
 * 1 リクエスト内の複数アクセサ呼び出しで KV を読み直さないための dedupe であり、
 * TTL を短くすることで /admin 保存後の反映遅延を数秒以内に抑える。
 */
let cached: { at: number; promise: Promise<CmsData> } | null = null;
const CACHE_TTL_MS = 3000;

async function loadFromKv(kv: KvLike): Promise<CmsData> {
  const raw = await kv.get(CMS_KV_KEY, "text");
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as CmsData;
  } catch {
    return fallback;
  }
}

export async function getCmsData(): Promise<CmsData> {
  const kv = getCmsKv();
  if (!kv) return fallback;
  const now = Date.now();
  if (!cached || now - cached.at > CACHE_TTL_MS) {
    cached = { at: now, promise: loadFromKv(kv) };
  }
  return cached.promise;
}

/**
 * 下書き(draft=true)を除外して公開対象のみを返すフィルタ。
 * 公開ページ向けのアクセサはこれを通すこと。/admin は getCmsData() を
 * 直接読むため、下書きも含めた全件を編集できる。
 */
function publishedOnly<T extends { draft?: boolean }>(list: T[]): T[] {
  return list.filter((x) => !x.draft);
}

/* ===== Cases ===== */
export async function getAllCases(): Promise<CaseEntry[]> {
  return publishedOnly((await getCmsData()).cases);
}

export async function getCaseBySlug(slug: string): Promise<CaseEntry | null> {
  const found = (await getCmsData()).cases.find((c) => c.slug === slug);
  return found && !found.draft ? found : null;
}

export async function getCasesByCategory(
  category: string,
): Promise<CaseEntry[]> {
  return publishedOnly((await getCmsData()).cases).filter(
    (c) => c.category === category,
  );
}

/* ===== Usecases ===== */
export async function getAllUsecases(): Promise<UsecaseEntry[]> {
  return publishedOnly((await getCmsData()).usecases);
}

export async function getUsecaseByIndustry(
  industry: string,
): Promise<UsecaseEntry | null> {
  const found = (await getCmsData()).usecases.find(
    (u) => u.industry === industry,
  );
  return found && !found.draft ? found : null;
}

/* ===== Help Categories ===== */
export async function getAllHelpCategories(): Promise<HelpCategory[]> {
  return publishedOnly((await getCmsData()).helpCategories);
}

export async function getHelpCategoryBySlug(
  slug: string,
): Promise<HelpCategory | null> {
  const found = (await getCmsData()).helpCategories.find(
    (c) => c.slug === slug,
  );
  return found && !found.draft ? found : null;
}

/* ===== Help Articles ===== */
export async function getAllHelpArticles(): Promise<HelpArticle[]> {
  return publishedOnly((await getCmsData()).helpArticles);
}

export async function getHelpArticleBySlug(
  slug: string,
): Promise<HelpArticle | null> {
  const found = (await getCmsData()).helpArticles.find((a) => a.slug === slug);
  return found && !found.draft ? found : null;
}

export async function getHelpArticlesByCategory(
  categorySlug: string,
): Promise<HelpArticle[]> {
  return publishedOnly((await getCmsData()).helpArticles).filter(
    (a) => getHelpCategorySlug(a) === categorySlug,
  );
}

export async function searchHelpArticles(q: string): Promise<HelpArticle[]> {
  const ql = q.toLowerCase();
  return publishedOnly((await getCmsData()).helpArticles).filter(
    (a) =>
      a.title.toLowerCase().includes(ql) ||
      a.summary.toLowerCase().includes(ql) ||
      (a.tags ?? []).some((t) => t.toLowerCase().includes(ql)),
  );
}

/* ===== FAQ ===== */
export async function getAllFAQCategories(): Promise<FAQCategory[]> {
  return publishedOnly((await getCmsData()).faqCategories);
}

/* ===== お問い合わせ / 予約リンク設定 ===== */
export async function getContactSettings(): Promise<ContactSettings> {
  const data = await getCmsData();
  return { ...DEFAULT_CONTACT, ...(data.contact ?? {}) };
}
