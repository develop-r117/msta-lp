"use client";

/**
 * /admin コンテンツ管理画面。
 *
 * 公開サイト上で動く軽量 CMS エディタ。保存は /api/admin/cms 経由で
 * Cloudflare KV に書き込まれ、公開ページへ即時反映される。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Markdoc from "@markdoc/markdoc";
import type {
  CaseEntry,
  UsecaseEntry,
  HelpCategory,
  HelpArticle,
  FAQCategory,
  FAQItem,
} from "@/lib/content-types";

type CmsData = {
  generatedAt: string;
  cases: CaseEntry[];
  usecases: UsecaseEntry[];
  helpCategories: HelpCategory[];
  helpArticles: HelpArticle[];
  faqCategories: FAQCategory[];
};

type Collection =
  | "cases"
  | "usecases"
  | "helpCategories"
  | "helpArticles"
  | "faqCategories";

const TABS: { key: Collection; label: string }[] = [
  { key: "cases", label: "導入事例" },
  { key: "usecases", label: "ユースケース" },
  { key: "helpCategories", label: "ヘルプカテゴリ" },
  { key: "helpArticles", label: "ヘルプ記事" },
  { key: "faqCategories", label: "FAQ" },
];

/* ===== フォーム状態 (フラット化したレコード / FAQ項目は別Stateで管理) ===== */
type FormState = Record<string, string>;

function linesToArray(v: string): string[] {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function itemToForm(
  collection: Collection,
  item: Record<string, unknown> | null,
): FormState {
  if (!item) {
    return collection === "faqCategories" ? { id: "", label: "" } : {};
  }
  const f: FormState = {};
  switch (collection) {
    case "cases": {
      const c = item as unknown as CaseEntry;
      Object.assign(f, {
        id: c.id ?? "",
        slug: c.slug ?? "",
        title: c.title ?? "",
        category: c.category ?? "",
        summary: c.summary ?? "",
        coverUrl: c.cover?.url ?? "",
        activeFeatures: (c.activeFeatures ?? []).join("\n"),
        result: c.result ?? "",
        customerVoice: c.customerVoice ?? "",
        bodySource: c.bodySource ?? "",
        draft: c.draft ? "1" : "",
        cardOnly: c.cardOnly ? "1" : "",
      });
      break;
    }
    case "usecases": {
      const u = item as unknown as UsecaseEntry;
      Object.assign(f, {
        id: u.id ?? "",
        industry: u.industry ?? "",
        title: u.title ?? "",
        description: u.description ?? "",
        scenarios: (u.scenarios ?? []).join("\n"),
        activeFeatures: (u.activeFeatures ?? []).join("\n"),
        coverUrl: u.cover?.url ?? "",
        bodySource: u.bodySource ?? "",
        draft: u.draft ? "1" : "",
        cardOnly: u.cardOnly ? "1" : "",
      });
      break;
    }
    case "helpCategories": {
      const c = item as unknown as HelpCategory;
      Object.assign(f, {
        id: c.id ?? "",
        slug: c.slug ?? "",
        title: c.title ?? "",
        description: c.description ?? "",
        iconKey: c.iconKey ?? "",
        order: String(c.order ?? 99),
        draft: c.draft ? "1" : "",
      });
      break;
    }
    case "helpArticles": {
      const a = item as unknown as HelpArticle;
      const catSlug =
        typeof a.category === "string" ? a.category : (a.category?.slug ?? "");
      Object.assign(f, {
        id: a.id ?? "",
        slug: a.slug ?? "",
        title: a.title ?? "",
        summary: a.summary ?? "",
        categorySlug: catSlug,
        tags: (a.tags ?? []).join("\n"),
        relatedSlugs: (a.relatedArticles ?? []).map((r) => r.slug).join("\n"),
        bodySource: a.bodySource ?? "",
        draft: a.draft ? "1" : "",
      });
      break;
    }
    case "faqCategories": {
      const c = item as unknown as FAQCategory;
      f.id = c.id ?? "";
      f.label = c.label ?? "";
      f.draft = c.draft ? "1" : "";
      break;
    }
  }
  return f;
}

function formToItem(
  collection: Collection,
  f: FormState,
  faqItems: FAQItem[],
): Record<string, unknown> {
  switch (collection) {
    case "cases":
      return {
        id: f.id.trim(),
        slug: (f.slug || f.id).trim(),
        title: f.title ?? "",
        category: f.category ?? "",
        summary: f.summary ?? "",
        cover: f.coverUrl?.trim() ? { url: f.coverUrl.trim() } : undefined,
        activeFeatures: linesToArray(f.activeFeatures ?? ""),
        result: f.result ?? "",
        customerVoice: f.customerVoice?.trim() || undefined,
        bodySource: f.bodySource ?? "",
        draft: f.draft === "1",
        cardOnly: f.cardOnly === "1",
      };
    case "usecases":
      return {
        id: f.id.trim(),
        industry: (f.industry || f.id).trim(),
        title: f.title ?? "",
        description: f.description ?? "",
        scenarios: linesToArray(f.scenarios ?? ""),
        activeFeatures: linesToArray(f.activeFeatures ?? ""),
        cover: f.coverUrl?.trim() ? { url: f.coverUrl.trim() } : undefined,
        bodySource: f.bodySource ?? "",
        draft: f.draft === "1",
        cardOnly: f.cardOnly === "1",
      };
    case "helpCategories":
      return {
        id: f.id.trim(),
        slug: (f.slug || f.id).trim(),
        title: f.title ?? "",
        description: f.description ?? "",
        iconKey: f.iconKey?.trim() || undefined,
        order: Number(f.order) || 99,
        draft: f.draft === "1",
      };
    case "helpArticles":
      return {
        id: f.id.trim(),
        slug: (f.slug || f.id).trim(),
        title: f.title ?? "",
        summary: f.summary ?? "",
        category: { slug: f.categorySlug ?? "" },
        tags: linesToArray(f.tags ?? ""),
        relatedArticles: linesToArray(f.relatedSlugs ?? "").map((s) => ({
          slug: s,
          title: s,
        })),
        bodySource: f.bodySource ?? "",
        draft: f.draft === "1",
      };
    case "faqCategories":
      return {
        id: f.id.trim(),
        label: f.label ?? "",
        items: faqItems.map((it, i) => ({
          id: it.id?.trim() || `${f.id.trim()}-${i + 1}`,
          question: it.question ?? "",
          answer: it.answer ?? "",
        })),
        draft: f.draft === "1",
      };
  }
}

function listTitle(
  collection: Collection,
  item: Record<string, unknown>,
): string {
  if (collection === "faqCategories") return String(item.label ?? item.id);
  return String(item.title ?? item.id);
}

function listSub(
  collection: Collection,
  item: Record<string, unknown>,
): string {
  switch (collection) {
    case "cases":
      return `${item.category ?? ""} / ${item.slug ?? ""}`;
    case "usecases":
      return String(item.industry ?? "");
    case "helpCategories":
      return `順序: ${item.order ?? "-"} / ${item.slug ?? ""}`;
    case "helpArticles": {
      const cat = item.category as { title?: string } | string | undefined;
      const t = typeof cat === "string" ? cat : (cat?.title ?? "");
      return `${t} / ${item.slug ?? ""}`;
    }
    case "faqCategories": {
      const items = item.items as unknown[] | undefined;
      return `${items?.length ?? 0} 件の質問`;
    }
  }
}

/* ===== UI 部品 ===== */
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-neutral-700">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1 block text-[11px] text-neutral-400">{hint}</span>
      ) : null}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900";

/* ===== 画像アップロード / Markdown WYSIWYG 補助 ===== */

/** 画像を /api/admin/upload へ送信し、公開 URL を返す。 */
async function uploadImageFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const j = (await res.json().catch(() => null)) as {
    url?: string;
    error?: string;
  } | null;
  if (!res.ok || !j?.url) {
    throw new Error(j?.error ?? "アップロードに失敗しました。");
  }
  return j.url;
}

/** Markdoc 原文を公開ページと同一手順で HTML 化(プレビュー用)。 */
function renderMarkdocPreview(src: string): string {
  if (!src.trim()) return "";
  try {
    const ast = Markdoc.parse(src);
    const transformed = Markdoc.transform(ast);
    return Markdoc.renderers.html(transformed);
  } catch {
    return "";
  }
}

type ImageMatch = { index: number; length: number; alt: string; url: string };

/** 本文中の ![alt](url) を抽出する。 */
function extractImages(src: string): ImageMatch[] {
  const re = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const out: ImageMatch[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    out.push({ index: m.index, length: m[0].length, alt: m[1], url: m[2] });
  }
  return out;
}

/** カバー画像などの単一画像フィールド (アップロード / 差し替え / URL手入力)。 */
function ImageUploadField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImageFile(file));
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "アップロードに失敗しました。");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="プレビュー"
            className="max-h-44 rounded-lg border border-neutral-200 object-contain"
          />
        ) : (
          <div className="grid h-24 w-full place-items-center rounded-lg border border-dashed border-neutral-300 text-xs text-neutral-400">
            画像が未設定です
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="rounded-lg bg-neutral-900 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-neutral-700 disabled:opacity-40"
          >
            {busy
              ? "アップロード中…"
              : value
                ? "画像を差し替える"
                : "画像をアップロード"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-lg border border-neutral-300 px-3.5 py-1.5 text-xs font-bold text-neutral-600 transition hover:border-red-400 hover:text-red-500"
            >
              画像を外す
            </button>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="hidden"
            onChange={onPick}
          />
        </div>
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/screenshots/xxx.png または https://..."
        />
        {err ? (
          <p className="text-[11px] font-semibold text-red-600">{err}</p>
        ) : null}
      </div>
    </Field>
  );
}

const toolbarBtn =
  "rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-bold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-40";

const previewProse =
  "prose prose-sm prose-neutral max-w-none rounded-lg border border-neutral-200 bg-white p-4 [&_h2]:mt-5 [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mt-4 [&_h3]:font-bold [&_img]:rounded-lg [&_img]:border [&_img]:border-neutral-200 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_a]:text-primary-700 [&_a]:underline";

/** ツールバー + ライブプレビュー + 画像挿入/差し替え付き Markdown エディタ。 */
function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const insertInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceTargetRef = useRef<ImageMatch | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const html = useMemo(() => renderMarkdocPreview(value), [value]);
  const images = useMemo(() => extractImages(value), [value]);

  const surround = (before: string, after: string, placeholder: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const next =
      value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + before.length;
      ta.setSelectionRange(pos, pos + selected.length);
    });
  };

  const insertBlock = (text: string) => {
    const ta = taRef.current;
    if (!ta) {
      onChange(value ? `${value}\n\n${text}` : text);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const needNl = start > 0 && value[start - 1] !== "\n";
    const prefix = needNl ? "\n\n" : "";
    const next = value.slice(0, start) + prefix + text + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + prefix.length + text.length;
      ta.setSelectionRange(pos, pos);
    });
  };

  const onInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const url = await uploadImageFile(file);
      const alt = file.name.replace(/\.[^.]+$/, "");
      insertBlock(`![${alt}](${url})`);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "アップロードに失敗しました。");
    } finally {
      setBusy(false);
    }
  };

  const onReplaceImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    const target = replaceTargetRef.current;
    replaceTargetRef.current = null;
    if (!file || !target) return;
    setBusy(true);
    setErr("");
    try {
      const url = await uploadImageFile(file);
      const md = `![${target.alt}](${url})`;
      const next =
        value.slice(0, target.index) +
        md +
        value.slice(target.index + target.length);
      onChange(next);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "アップロードに失敗しました。");
    } finally {
      setBusy(false);
    }
  };

  const triggerReplace = (img: ImageMatch) => {
    replaceTargetRef.current = img;
    replaceInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => insertBlock("## 見出し")}
        >
          見出し
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => insertBlock("### 小見出し")}
        >
          小見出し
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => surround("**", "**", "太字")}
        >
          太字
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => insertBlock("- 項目")}
        >
          箇条書き
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => insertBlock("1. 項目")}
        >
          番号リスト
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => surround("[", "](https://)", "リンクテキスト")}
        >
          リンク
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() =>
            insertBlock(
              '{% callout type="note" %}\nここに注意書きを入力\n{% /callout %}',
            )
          }
        >
          注意書き
        </button>
        <button
          type="button"
          className={`${toolbarBtn} border-neutral-900 bg-neutral-900 text-white hover:text-white`}
          disabled={busy}
          onClick={() => insertInputRef.current?.click()}
        >
          {busy ? "アップロード中…" : "画像を挿入"}
        </button>
        <button
          type="button"
          className={`${toolbarBtn} ml-auto`}
          onClick={() => setShowPreview((v) => !v)}
        >
          {showPreview ? "プレビューを隠す" : "プレビューを表示"}
        </button>
      </div>

      {err ? (
        <p className="text-[11px] font-semibold text-red-600">{err}</p>
      ) : null}

      <div
        className={
          showPreview ? "grid gap-3 lg:grid-cols-2" : "grid gap-3 grid-cols-1"
        }
      >
        <textarea
          ref={taRef}
          className={`${inputCls} min-h-[360px] font-mono text-[13px] leading-relaxed`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="本文を入力… 見出しは ## 、箇条書きは - 、画像はツールバーの「画像を挿入」から追加できます。"
        />
        {showPreview ? (
          html ? (
            <div
              className={previewProse}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div className="grid min-h-[360px] place-items-center rounded-lg border border-dashed border-neutral-300 text-xs text-neutral-400">
              プレビューはここに表示されます
            </div>
          )
        ) : null}
      </div>

      {images.length > 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-xs font-bold text-neutral-700">
            本文内の画像 ({images.length})
          </p>
          <p className="mt-0.5 text-[11px] text-neutral-400">
            各画像は「差し替え」から新しい画像をアップロードして置き換えられます。
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {images.map((img, i) => (
              <li
                key={`${img.index}-${i}`}
                className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-2.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt || "画像"}
                  className="h-14 w-14 shrink-0 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-neutral-700">
                    {img.alt || "(説明なし)"}
                  </p>
                  <p className="truncate text-[11px] text-neutral-400">
                    {img.url}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => triggerReplace(img)}
                  className="shrink-0 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-40"
                >
                  差し替え
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <input
        ref={insertInputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        className="hidden"
        onChange={onInsertImage}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        className="hidden"
        onChange={onReplaceImage}
      />
    </div>
  );
}

export default function AdminApp() {
  const [phase, setPhase] = useState<"loading" | "login" | "ready">("loading");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<CmsData | null>(null);
  const [tab, setTab] = useState<Collection>("cases");
  const [form, setForm] = useState<FormState | null>(null);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [editingExisting, setEditingExisting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/admin/cms", { cache: "no-store" });
    if (res.status === 401) {
      setPhase("login");
      return;
    }
    if (!res.ok) {
      setError("データの取得に失敗しました。");
      setPhase("login");
      return;
    }
    setData((await res.json()) as CmsData);
    setPhase("ready");
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(j?.error ?? "ログインに失敗しました。");
        return;
      }
      setPassword("");
      await fetchData();
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setData(null);
    setPhase("login");
  };

  const save = async () => {
    if (!form) return;
    const item = formToItem(tab, form, faqItems);
    if (!item.id) {
      setError("ID は必須です (半角英数とハイフン)。");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upsert", collection: tab, item }),
      });
      const j = (await res.json().catch(() => null)) as {
        error?: string;
        data?: CmsData;
      } | null;
      if (!res.ok) {
        setError(j?.error ?? "保存に失敗しました。");
        return;
      }
      if (j?.data) setData(j.data);
      const wasDraft = form.draft === "1";
      setForm(null);
      setNotice(
        wasDraft
          ? "下書きとして保存しました。公開ページには表示されません。"
          : "保存しました。公開ページに即時反映されます。",
      );
      setTimeout(() => setNotice(""), 4000);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string, title: string) => {
    if (!window.confirm(`「${title}」を削除します。よろしいですか?`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: tab, id }),
      });
      const j = (await res.json().catch(() => null)) as {
        error?: string;
        data?: CmsData;
      } | null;
      if (!res.ok) {
        setError(j?.error ?? "削除に失敗しました。");
        return;
      }
      if (j?.data) setData(j.data);
      setNotice("削除しました。");
      setTimeout(() => setNotice(""), 4000);
    } finally {
      setBusy(false);
    }
  };

  const items = useMemo(() => {
    if (!data) return [];
    return data[tab] as unknown as Record<string, unknown>[];
  }, [data, tab]);

  /* ===== ログイン画面 ===== */
  if (phase === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-sm text-neutral-500">
        読み込み中…
      </div>
    );
  }

  if (phase === "login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          <h1 className="text-lg font-bold text-neutral-900">コンテンツ管理</h1>
          <p className="mt-1 text-xs text-neutral-500">
            管理者パスワードを入力してください。
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            className={`${inputCls} mt-4`}
            autoFocus
          />
          {error ? (
            <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={busy || !password}
            className="mt-4 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-700 disabled:opacity-40"
          >
            {busy ? "確認中…" : "ログイン"}
          </button>
        </form>
      </div>
    );
  }

  /* ===== 編集フォーム ===== */
  if (form) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <button
              onClick={() => setForm(null)}
              className="text-sm font-semibold text-neutral-500 hover:text-neutral-900"
            >
              ← 一覧へ戻る
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={save}
                disabled={busy}
                className="rounded-lg bg-neutral-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-neutral-700 disabled:opacity-40"
              >
                {busy
                  ? "保存中…"
                  : form.draft === "1"
                    ? "下書きとして保存"
                    : "保存して公開"}
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-3xl space-y-4 px-4 py-6">
          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">
              {error}
            </p>
          ) : null}
          <Editor
            collection={tab}
            form={form}
            setForm={setForm}
            faqItems={faqItems}
            setFaqItems={setFaqItems}
            editingExisting={editingExisting}
            helpCategories={data?.helpCategories ?? []}
          />
        </main>
      </div>
    );
  }

  /* ===== 一覧 ===== */
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-bold text-neutral-900">
              コンテンツ管理
            </h1>
            <p className="text-[11px] text-neutral-400">
              保存すると公開ページへ即時反映されます
              (海外リージョンは最大60秒)。
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="/"
              target="_blank"
              className="font-semibold text-neutral-500 hover:text-neutral-900"
            >
              サイトを表示 ↗
            </a>
            <button
              onClick={logout}
              className="font-semibold text-neutral-500 hover:text-neutral-900"
            >
              ログアウト
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-bold transition ${
                tab === t.key
                  ? "border-b-2 border-neutral-900 text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {notice ? (
          <p className="mb-4 rounded-lg bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
            {notice}
          </p>
        ) : null}
        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mb-4 flex justify-end">
          <button
            onClick={() => {
              setForm(itemToForm(tab, null));
              setFaqItems([]);
              setEditingExisting(false);
              setError("");
            }}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-neutral-700"
          >
            + 新規作成
          </button>
        </div>

        <ul className="divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {items.map((item) => (
            <li
              key={String(item.id)}
              className="flex items-center justify-between gap-3 px-5 py-3.5"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 truncate text-sm font-bold text-neutral-900">
                  <span className="truncate">{listTitle(tab, item)}</span>
                  {item.draft ? (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      下書き
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                      公開中
                    </span>
                  )}
                  {(tab === "cases" || tab === "usecases") && item.cardOnly ? (
                    <span className="shrink-0 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                      カードのみ
                    </span>
                  ) : null}
                </p>
                <p className="truncate text-xs text-neutral-400">
                  {listSub(tab, item)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => {
                    setForm(itemToForm(tab, item));
                    setFaqItems(
                      tab === "faqCategories"
                        ? ((item.items as FAQItem[] | undefined) ?? []).map(
                            (it) => ({ ...it }),
                          )
                        : [],
                    );
                    setEditingExisting(true);
                    setError("");
                  }}
                  className="rounded-lg border border-neutral-300 px-3.5 py-1.5 text-xs font-bold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  編集
                </button>
                <button
                  onClick={() => remove(String(item.id), listTitle(tab, item))}
                  disabled={busy}
                  className="rounded-lg border border-red-200 px-3.5 py-1.5 text-xs font-bold text-red-500 transition hover:border-red-500 disabled:opacity-40"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
          {items.length === 0 ? (
            <li className="px-5 py-10 text-center text-sm text-neutral-400">
              まだコンテンツがありません。
            </li>
          ) : null}
        </ul>
      </main>
    </div>
  );
}

/* ===== コレクション別エディタ ===== */
function Editor({
  collection,
  form,
  setForm,
  faqItems,
  setFaqItems,
  editingExisting,
  helpCategories,
}: {
  collection: Collection;
  form: FormState;
  setForm: (f: FormState) => void;
  faqItems: FAQItem[];
  setFaqItems: (items: FAQItem[]) => void;
  editingExisting: boolean;
  helpCategories: HelpCategory[];
}) {
  const set =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm({ ...form, [key]: e.target.value });

  const idField = (
    <Field
      label="ID (URLスラッグ)"
      hint={
        editingExisting
          ? "既存コンテンツの ID は変更できません。"
          : "半角英数とハイフン。例: my-new-case"
      }
    >
      <input
        className={inputCls}
        value={form.id ?? ""}
        onChange={set("id")}
        disabled={editingExisting}
        placeholder="my-content-id"
      />
    </Field>
  );

  const markdownField = (
    <Field
      label="本文"
      hint="ツールバーで見出し・装飾・画像を挿入でき、右側に公開時の見た目をプレビュー表示します。"
    >
      <MarkdownEditor
        value={form.bodySource ?? ""}
        onChange={(v) => setForm({ ...form, bodySource: v })}
      />
    </Field>
  );

  const isDraft = form.draft === "1";
  const draftField = (
    <label className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
      <input
        type="checkbox"
        checked={isDraft}
        onChange={(e) =>
          setForm({ ...form, draft: e.target.checked ? "1" : "" })
        }
        className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500"
      />
      <span className="block">
        <span className="block text-sm font-bold text-neutral-800">
          下書き (非公開) にする
        </span>
        <span className="mt-0.5 block text-[11px] text-neutral-500">
          チェックすると公開サイトには表示されません。管理画面では編集できます。
        </span>
      </span>
    </label>
  );

  const isCardOnly = form.cardOnly === "1";
  const cardOnlyField = (
    <label className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
      <input
        type="checkbox"
        checked={isCardOnly}
        onChange={(e) =>
          setForm({ ...form, cardOnly: e.target.checked ? "1" : "" })
        }
        className="mt-0.5 h-4 w-4 shrink-0 accent-sky-500"
      />
      <span className="block">
        <span className="block text-sm font-bold text-neutral-800">
          カード表示のみ (詳細は Coming soon)
        </span>
        <span className="mt-0.5 block text-[11px] text-neutral-500">
          チェックすると一覧には Coming soon
          タグ付きのカードで表示され、詳細ページは Coming soon 表示になります。
        </span>
      </span>
    </label>
  );

  const card = "space-y-4 rounded-2xl border border-neutral-200 bg-white p-6";

  switch (collection) {
    case "cases":
      return (
        <div className={card}>
          {idField}
          {draftField}
          {cardOnlyField}
          <Field label="タイトル">
            <input
              className={inputCls}
              value={form.title ?? ""}
              onChange={set("title")}
            />
          </Field>
          <Field label="カテゴリ (業種ラベル)">
            <input
              className={inputCls}
              value={form.category ?? ""}
              onChange={set("category")}
              placeholder="例: 飲食店"
            />
          </Field>
          <Field label="概要">
            <textarea
              className={`${inputCls} min-h-[80px]`}
              value={form.summary ?? ""}
              onChange={set("summary")}
            />
          </Field>
          <ImageUploadField
            label="カバー画像"
            hint="アップロードするか、/screenshots/xxx.png (publicフォルダ内) や https:// のURLを直接指定できます。"
            value={form.coverUrl ?? ""}
            onChange={(v) => setForm({ ...form, coverUrl: v })}
          />
          <Field label="活用機能 (1行に1つ)">
            <textarea
              className={`${inputCls} min-h-[80px]`}
              value={form.activeFeatures ?? ""}
              onChange={set("activeFeatures")}
            />
          </Field>
          <Field label="導入効果">
            <input
              className={inputCls}
              value={form.result ?? ""}
              onChange={set("result")}
            />
          </Field>
          <Field label="お客様の声 (任意)">
            <textarea
              className={`${inputCls} min-h-[60px]`}
              value={form.customerVoice ?? ""}
              onChange={set("customerVoice")}
            />
          </Field>
          {markdownField}
        </div>
      );

    case "usecases":
      return (
        <div className={card}>
          {idField}
          {draftField}
          {cardOnlyField}
          <Field label="業種キー" hint="URL に使われます。例: shop / med / edu">
            <input
              className={inputCls}
              value={form.industry ?? ""}
              onChange={set("industry")}
            />
          </Field>
          <Field label="タイトル">
            <input
              className={inputCls}
              value={form.title ?? ""}
              onChange={set("title")}
            />
          </Field>
          <Field label="説明">
            <textarea
              className={`${inputCls} min-h-[80px]`}
              value={form.description ?? ""}
              onChange={set("description")}
            />
          </Field>
          <Field label="活用シナリオ (1行に1つ)">
            <textarea
              className={`${inputCls} min-h-[100px]`}
              value={form.scenarios ?? ""}
              onChange={set("scenarios")}
            />
          </Field>
          <Field label="活用機能 (1行に1つ)">
            <textarea
              className={`${inputCls} min-h-[80px]`}
              value={form.activeFeatures ?? ""}
              onChange={set("activeFeatures")}
            />
          </Field>
          <ImageUploadField
            label="カバー画像"
            hint="アップロードするか、/screenshots/xxx.png や https:// のURLを直接指定できます。"
            value={form.coverUrl ?? ""}
            onChange={(v) => setForm({ ...form, coverUrl: v })}
          />
          {markdownField}
        </div>
      );

    case "helpCategories":
      return (
        <div className={card}>
          {idField}
          {draftField}
          <Field label="タイトル">
            <input
              className={inputCls}
              value={form.title ?? ""}
              onChange={set("title")}
            />
          </Field>
          <Field label="説明">
            <textarea
              className={`${inputCls} min-h-[80px]`}
              value={form.description ?? ""}
              onChange={set("description")}
            />
          </Field>
          <Field label="アイコンキー (任意)">
            <input
              className={inputCls}
              value={form.iconKey ?? ""}
              onChange={set("iconKey")}
            />
          </Field>
          <Field label="表示順 (小さいほど先頭)">
            <input
              className={inputCls}
              type="number"
              value={form.order ?? "99"}
              onChange={set("order")}
            />
          </Field>
        </div>
      );

    case "helpArticles":
      return (
        <div className={card}>
          {idField}
          {draftField}
          <Field label="タイトル">
            <input
              className={inputCls}
              value={form.title ?? ""}
              onChange={set("title")}
            />
          </Field>
          <Field label="概要">
            <textarea
              className={`${inputCls} min-h-[60px]`}
              value={form.summary ?? ""}
              onChange={set("summary")}
            />
          </Field>
          <Field label="カテゴリ">
            <select
              className={inputCls}
              value={form.categorySlug ?? ""}
              onChange={set("categorySlug")}
            >
              <option value="">選択してください</option>
              {helpCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="タグ (1行に1つ)">
            <textarea
              className={`${inputCls} min-h-[60px]`}
              value={form.tags ?? ""}
              onChange={set("tags")}
            />
          </Field>
          <Field label="関連記事スラッグ (1行に1つ / 任意)">
            <textarea
              className={`${inputCls} min-h-[60px]`}
              value={form.relatedSlugs ?? ""}
              onChange={set("relatedSlugs")}
            />
          </Field>
          {markdownField}
        </div>
      );

    case "faqCategories": {
      const setItems = setFaqItems;
      return (
        <div className="space-y-4">
          <div className={card}>
            {idField}
            {draftField}
            <Field label="カテゴリ名">
              <input
                className={inputCls}
                value={form.label ?? ""}
                onChange={set("label")}
              />
            </Field>
          </div>
          {faqItems.map((it, i) => (
            <div key={i} className={card}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400">
                  Q{i + 1}
                </span>
                <button
                  onClick={() => setItems(faqItems.filter((_, j) => j !== i))}
                  className="text-xs font-bold text-red-500 hover:text-red-700"
                >
                  この質問を削除
                </button>
              </div>
              <Field label="質問">
                <input
                  className={inputCls}
                  value={it.question}
                  onChange={(e) =>
                    setItems(
                      faqItems.map((x, j) =>
                        j === i ? { ...x, question: e.target.value } : x,
                      ),
                    )
                  }
                />
              </Field>
              <Field label="回答">
                <textarea
                  className={`${inputCls} min-h-[100px]`}
                  value={it.answer}
                  onChange={(e) =>
                    setItems(
                      faqItems.map((x, j) =>
                        j === i ? { ...x, answer: e.target.value } : x,
                      ),
                    )
                  }
                />
              </Field>
            </div>
          ))}
          <button
            onClick={() =>
              setItems([...faqItems, { id: "", question: "", answer: "" }])
            }
            className="w-full rounded-2xl border-2 border-dashed border-neutral-300 py-3 text-sm font-bold text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            + 質問を追加
          </button>
        </div>
      );
    }
  }
}
