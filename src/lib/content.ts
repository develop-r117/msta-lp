import "server-only";

import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import keystaticConfig from "../../keystatic.config";

export type {
  CaseImage,
  CaseEntry,
  UsecaseEntry,
  HelpCategory,
  HelpArticle,
  FAQItem,
  FAQCategory,
} from "./content-types";

export { getHelpCategorySlug, getHelpCategoryTitle } from "./content-types";

import type { CaseEntry, UsecaseEntry, HelpCategory, HelpArticle, FAQCategory } from "./content-types";

const reader = createReader(process.cwd(), keystaticConfig);

async function renderBody(
  bodyFn: (() => Promise<unknown>) | undefined,
): Promise<string | undefined> {
  if (!bodyFn) return undefined;
  const node = await bodyFn();
  if (!node) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Markdoc.renderers.html(Markdoc.transform(node as any));
}

/* ===== Cases ===== */

export async function fetchCases(opts?: { limit?: number }): Promise<CaseEntry[]> {
  const slugs = await reader.collections.cases.list();
  const entries = await Promise.all(
    slugs.map(async (dirSlug) => {
      const raw = await reader.collections.cases.read(dirSlug, { resolveLinkedFiles: true });
      if (!raw) return null;
      const body = await renderBody(raw.body as unknown as (() => Promise<unknown>) | undefined);
      return {
        id: dirSlug,
        slug: raw.slug ?? dirSlug,
        title: raw.title ?? "",
        category: raw.category ?? "",
        summary: raw.summary ?? "",
        intro: raw.intro || undefined,
        cover: raw.cover ? { url: raw.cover } : undefined,
        activeFeatures: [...(raw.activeFeatures ?? [])],
        result: raw.result ?? "",
        customerVoice: raw.customerVoice || undefined,
        draft: (raw as { draft?: boolean }).draft || undefined,
        cardOnly: (raw as { cardOnly?: boolean }).cardOnly || undefined,
        body,
      } satisfies CaseEntry;
    }),
  );
  const result = entries.filter((e): e is NonNullable<typeof e> => e !== null);
  return opts?.limit ? result.slice(0, opts.limit) : result;
}

export async function fetchCasesByCategory(category: string): Promise<CaseEntry[]> {
  const all = await fetchCases();
  return all.filter((c) => c.category === category);
}

export async function fetchCaseBySlug(slug: string): Promise<CaseEntry | null> {
  const all = await fetchCases();
  return all.find((c) => c.slug === slug) ?? null;
}

/* ===== Usecases ===== */

export async function fetchUsecases(): Promise<UsecaseEntry[]> {
  const slugs = await reader.collections.usecases.list();
  const entries = await Promise.all(
    slugs.map(async (dirSlug) => {
      const raw = await reader.collections.usecases.read(dirSlug, { resolveLinkedFiles: true });
      if (!raw) return null;
      const body = await renderBody(raw.body as unknown as (() => Promise<unknown>) | undefined);
      return {
        id: dirSlug,
        industry: raw.industry ?? dirSlug,
        title: raw.title ?? "",
        description: raw.description ?? "",
        scenarios: [...(raw.scenarios ?? [])],
        activeFeatures: [...(raw.activeFeatures ?? [])],
        cover: raw.cover ? { url: raw.cover } : undefined,
        body,
      } satisfies UsecaseEntry;
    }),
  );
  return entries.filter((e): e is NonNullable<typeof e> => e !== null);
}

export async function fetchUsecaseByIndustry(industry: string): Promise<UsecaseEntry | null> {
  const all = await fetchUsecases();
  return all.find((u) => u.industry === industry) ?? null;
}

/* ===== Help Categories ===== */

export async function fetchHelpCategories(): Promise<HelpCategory[]> {
  const slugs = await reader.collections.helpCategories.list();
  const entries = await Promise.all(
    slugs.map(async (dirSlug) => {
      const raw = await reader.collections.helpCategories.read(dirSlug);
      if (!raw) return null;
      return {
        id: dirSlug,
        slug: raw.slug ?? dirSlug,
        title: raw.title ?? "",
        description: raw.description ?? "",
        iconKey: raw.iconKey || undefined,
        order: raw.order ?? 99,
      } satisfies HelpCategory;
    }),
  );
  return entries
    .filter((e): e is NonNullable<typeof e> => e !== null)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function fetchHelpCategoryBySlug(slug: string): Promise<HelpCategory | null> {
  const all = await fetchHelpCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

/* ===== Help Articles ===== */

async function readAllHelpArticles(): Promise<HelpArticle[]> {
  const categories = await fetchHelpCategories();
  const catMap = new Map(categories.map((c) => [c.slug, c.title]));

  const slugs = await reader.collections.helpArticles.list();
  const entries = await Promise.all(
    slugs.map(async (dirSlug) => {
      const raw = await reader.collections.helpArticles.read(dirSlug, { resolveLinkedFiles: true });
      if (!raw) return null;
      const body = await renderBody(raw.body as unknown as (() => Promise<unknown>) | undefined);
      const catSlug = raw.categorySlug ?? "";
      return {
        id: dirSlug,
        slug: raw.slug ?? dirSlug,
        title: raw.title ?? "",
        summary: raw.summary ?? "",
        category: {
          slug: catSlug,
          title: catMap.get(catSlug) ?? catSlug,
        },
        body,
        tags: [...(raw.tags ?? [])],
        relatedArticles: [...(raw.relatedArticleSlugs ?? [])].map((s) => ({
          slug: s,
          title: s,
        })),
      } satisfies HelpArticle;
    }),
  );
  return entries.filter((e): e is NonNullable<typeof e> => e !== null);
}

type HelpArticleFilter = {
  categorySlug?: string;
  q?: string;
  limit?: number;
};

export async function fetchHelpArticles(filter: HelpArticleFilter = {}): Promise<HelpArticle[]> {
  let arr = await readAllHelpArticles();
  const { categorySlug, q, limit } = filter;

  if (categorySlug) {
    const { getHelpCategorySlug } = await import("./content-types");
    arr = arr.filter((a) => getHelpCategorySlug(a) === categorySlug);
  }
  if (q) {
    const ql = q.toLowerCase();
    arr = arr.filter(
      (a) =>
        a.title.toLowerCase().includes(ql) ||
        a.summary.toLowerCase().includes(ql) ||
        (a.tags ?? []).some((t) => t.toLowerCase().includes(ql)),
    );
  }
  return limit ? arr.slice(0, limit) : arr;
}

export async function fetchHelpArticleBySlug(slug: string): Promise<HelpArticle | null> {
  const all = await readAllHelpArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

/* ===== FAQ ===== */

export async function fetchFAQCategories(): Promise<FAQCategory[]> {
  const faq = await reader.singletons.faq.read();
  if (!faq) return [];
  return (faq.categories ?? []).map((cat) => ({
    id: cat.id,
    label: cat.label,
    items: (cat.items ?? []).map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    })),
  }));
}
