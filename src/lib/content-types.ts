export type CaseImage = {
  url: string;
  width?: number;
  height?: number;
};

export type CaseEntry = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  /** 詳細ページ冒頭のリード文（段落は空行区切り）。任意。 */
  intro?: string;
  cover?: CaseImage;
  activeFeatures: string[];
  result: string;
  customerVoice?: string;
  body?: string;
  /** /admin 編集用の Markdoc 原文 (body は HTML 化済みのため別途保持) */
  bodySource?: string;
  /** true の場合は下書き(非公開)。公開ページには表示されない。 */
  draft?: boolean;
  publishedAt?: string;
  updatedAt?: string;
};

export type UsecaseEntry = {
  id: string;
  industry: string;
  title: string;
  description: string;
  scenarios: string[];
  activeFeatures: string[];
  cover?: CaseImage;
  body?: string;
  bodySource?: string;
  /** true の場合は下書き(非公開)。公開ページには表示されない。 */
  draft?: boolean;
  publishedAt?: string;
  updatedAt?: string;
};

export type HelpCategory = {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconKey?: string;
  order?: number;
  /** true の場合は下書き(非公開)。公開ページには表示されない。 */
  draft?: boolean;
  publishedAt?: string;
  updatedAt?: string;
};

export type HelpArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: { slug: string; title: string } | string;
  body?: string;
  bodySource?: string;
  tags?: string[];
  relatedArticles?: { slug: string; title: string }[];
  /** true の場合は下書き(非公開)。公開ページには表示されない。 */
  draft?: boolean;
  publishedAt?: string;
  updatedAt?: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  label: string;
  items: FAQItem[];
  /** true の場合は下書き(非公開)。公開ページには表示されない。 */
  draft?: boolean;
};

function helpCategoryFromArticle(a: HelpArticle): { slug: string; title: string } {
  if (typeof a.category === "string") return { slug: a.category, title: a.category };
  return a.category;
}

export function getHelpCategorySlug(article: HelpArticle): string {
  return helpCategoryFromArticle(article).slug;
}

export function getHelpCategoryTitle(article: HelpArticle): string {
  return helpCategoryFromArticle(article).title;
}
