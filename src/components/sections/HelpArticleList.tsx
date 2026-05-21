import Link from "next/link";
import type { HelpArticle } from "@/lib/microcms";
import { getHelpCategorySlug, getHelpCategoryTitle } from "@/lib/microcms";

type Props = {
  articles: HelpArticle[];
  /** 見出し */
  title?: string;
  /** 0件のときの文言 */
  emptyMessage?: string;
};

export default function HelpArticleList({ articles, title, emptyMessage }: Props) {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {title ? (
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">{title}</h2>
        ) : null}

        {articles.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-white px-6 py-12 text-center text-sm text-neutral-500 ring-1 ring-neutral-200">
            {emptyMessage ?? "該当する記事が見つかりませんでした。"}
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/help/articles/${a.slug}`}
                  className="group flex flex-col gap-3 px-5 py-5 transition hover:bg-neutral-50 md:flex-row md:items-center md:px-6 md:py-6"
                >
                  <div className="grow">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary-700">
                      {getHelpCategoryTitle(a)}
                    </p>
                    <h3 className="mt-1.5 text-base font-bold text-neutral-900 group-hover:text-primary-700 md:text-lg">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500 md:text-sm">
                      {a.summary}
                    </p>
                    {a.tags?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600"
                          >
                            #{t}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-xs font-bold text-primary-700 md:self-start md:pt-1">
                    記事を読む →
                  </span>
                </Link>
                {/* 検索エンジンに残るよう、カテゴリへのテキストリンクも備える */}
                <p className="hidden">
                  カテゴリ:{" "}
                  <Link href={`/help/${getHelpCategorySlug(a)}`}>{getHelpCategoryTitle(a)}</Link>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
