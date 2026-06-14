/**
 * Cloudflare Pages (edge runtime) で利用するための静的 CMS データアクセサ。
 *
 * - `npm run dump:cms` で生成される `src/data/cms.generated.json` を同期的に import するだけ。
 * - reader (Node fs) や Markdoc transformer を runtime で呼ばないため、edge でも動く。
 * - dev / build / build:cf すべて prebuild フックでダンプが走るので、import 時点で最新。
 */
import generated from "../data/cms.generated.json";
import {
  getHelpCategorySlug,
  type CaseEntry,
  type UsecaseEntry,
  type HelpCategory,
  type HelpArticle,
  type FAQCategory,
} from "./content-types";

type Generated = {
  generatedAt: string;
  cases: CaseEntry[];
  usecases: UsecaseEntry[];
  helpCategories: HelpCategory[];
  helpArticles: HelpArticle[];
  faqCategories: FAQCategory[];
};

const data = generated as unknown as Generated;

/* ===== Cases ===== */
export function getAllCases(): CaseEntry[] {
  return data.cases;
}

export function getCaseBySlug(slug: string): CaseEntry | null {
  return data.cases.find((c) => c.slug === slug) ?? null;
}

export function getCasesByCategory(category: string): CaseEntry[] {
  return data.cases.filter((c) => c.category === category);
}

/* ===== Usecases ===== */
export function getAllUsecases(): UsecaseEntry[] {
  return data.usecases;
}

export function getUsecaseByIndustry(industry: string): UsecaseEntry | null {
  return data.usecases.find((u) => u.industry === industry) ?? null;
}

/* ===== Help Categories ===== */
export function getAllHelpCategories(): HelpCategory[] {
  return data.helpCategories;
}

export function getHelpCategoryBySlug(slug: string): HelpCategory | null {
  return data.helpCategories.find((c) => c.slug === slug) ?? null;
}

/* ===== Help Articles ===== */
export function getAllHelpArticles(): HelpArticle[] {
  return data.helpArticles;
}

export function getHelpArticleBySlug(slug: string): HelpArticle | null {
  return data.helpArticles.find((a) => a.slug === slug) ?? null;
}

export function getHelpArticlesByCategory(categorySlug: string): HelpArticle[] {
  return data.helpArticles.filter(
    (a) => getHelpCategorySlug(a) === categorySlug,
  );
}

export function searchHelpArticles(q: string): HelpArticle[] {
  const ql = q.toLowerCase();
  return data.helpArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(ql) ||
      a.summary.toLowerCase().includes(ql) ||
      (a.tags ?? []).some((t) => t.toLowerCase().includes(ql)),
  );
}

/* ===== FAQ ===== */
export function getAllFAQCategories(): FAQCategory[] {
  return data.faqCategories;
}
