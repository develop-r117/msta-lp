import Link from "next/link";
import type { HelpArticle, HelpCategory } from "@/lib/content-types";
import { getHelpCategorySlug } from "@/lib/content-types";

type Props = {
  categories: HelpCategory[];
  articles: HelpArticle[];
};

const ICON_PATHS: Record<string, string> = {
  rocket: "M5 13l4 4L19 7M12 2C7 2 4 6 4 10c0 4 5 9 8 12 3-3 8-8 8-12 0-4-3-8-8-8z",
  billing: "M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z",
  build: "M14.7 6.3a1 1 0 011.4 0l1.6 1.6a1 1 0 010 1.4L9 18.5 4 19l.5-5z",
  ops: "M3 12h4l3-9 4 18 3-9h4",
  warn: "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
};

export default function HelpCategoryGrid({ categories, articles }: Props) {
  const countByCategory = (slug: string) =>
    articles.filter((a) => getHelpCategorySlug(a) === slug).length;

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-neutral-900 md:text-3xl">
          カテゴリから探す
        </h2>
        <p className="mt-3 text-center text-sm text-neutral-600">
          目的別のカテゴリから、関連記事を一覧でご覧いただけます。
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const count = countByCategory(c.slug);
            const path = ICON_PATHS[c.iconKey ?? "rocket"] ?? ICON_PATHS.rocket;
            return (
              <li key={c.slug}>
                <Link
                  href={`/help/${c.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                      </svg>
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600">
                      {count} 記事
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-neutral-900 group-hover:text-primary-700">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {c.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary-700">
                    記事を見る
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
