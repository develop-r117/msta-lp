"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { HelpArticle } from "@/lib/content-types";
import { getHelpCategorySlug, getHelpCategoryTitle } from "@/lib/content-types";
import { cn } from "@/lib/cn";

type Props = {
  article: HelpArticle;
  related: HelpArticle[];
};

type TocItem = { id: string; text: string };

/**
 * H2 見出しから目次データを生成し、表を横スクロール用にラップする。
 */
function enhanceArticleHtml(html: string): { html: string; items: TocItem[] } {
  const items: TocItem[] = [];
  let counter = 0;
  const withIds = html.replace(
    /<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/g,
    (_match, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      counter += 1;
      const id = `section-${counter}`;
      items.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    },
  );
  const withTables = withIds.replace(
    /<table[\s\S]*?<\/table>/g,
    (table) => `<div class="help-table-wrap">${table}</div>`,
  );
  return { html: withTables, items };
}

export default function HelpArticleBody({ article, related }: Props) {
  const [helpful, setHelpful] = useState<"yes" | "no" | null>(null);

  const { html, items } = useMemo(
    () => enhanceArticleHtml(article.body ?? ""),
    [article.body],
  );

  useEffect(() => {
    setHelpful(null);
  }, [article.slug]);

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {items.length > 0 ? (
            <aside className="lg:col-span-3">
              <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5">
                <p className="text-[11px] font-bold tracking-[0.16em] text-neutral-500">
                  目次
                </p>
                <ol className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-neutral-600">
                  {items.map((it, i) => (
                    <li key={it.id}>
                      <a
                        href={`#${it.id}`}
                        className="line-clamp-2 transition-colors hover:text-primary-700"
                      >
                        <span className="mr-1.5 font-semibold text-neutral-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {it.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          ) : null}

          <article
            className={cn(
              "min-w-0",
              items.length > 0 ? "lg:col-span-9" : "lg:col-span-12",
            )}
          >
            <p className="text-[11px] font-bold tracking-[0.18em] text-primary-700">
              {getHelpCategoryTitle(article)}
            </p>
            <h1 className="mt-3 text-[1.75rem] font-bold leading-snug tracking-tight text-neutral-900 md:text-[2rem]">
              {article.title}
            </h1>
            <p className="mt-4 text-[0.975rem] leading-[1.85] tracking-[0.02em] text-neutral-600 md:text-base">
              {article.summary}
            </p>
            {article.tags?.length ? (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-600"
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            ) : null}

            <div
              className="help-article mt-10 max-w-none border-t border-neutral-100 pt-8"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
              <p className="text-base font-bold text-neutral-900">
                この記事は役に立ちましたか？
              </p>
              {helpful === null ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setHelpful("yes")}
                    className="rounded-full bg-primary-500 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-600"
                  >
                    はい
                  </button>
                  <button
                    type="button"
                    onClick={() => setHelpful("no")}
                    className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
                  >
                    いいえ
                  </button>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-neutral-200">
                  {helpful === "yes" ? (
                    <p className="text-sm text-neutral-700">
                      フィードバックありがとうございます。引き続きヘルプセンターの改善にご協力ください。
                    </p>
                  ) : (
                    <p className="text-sm text-neutral-700">
                      お役に立てず申し訳ありません。
                      <Link
                        href="/contact"
                        className="font-bold text-primary-700 underline-offset-4 hover:underline"
                      >
                        お問い合わせフォーム
                      </Link>
                      から、解決したい内容をお知らせください。
                    </p>
                  )}
                </div>
              )}
            </div>

            {related.length > 0 ? (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">
                  関連記事
                </h2>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/help/articles/${r.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary-700">
                          {getHelpCategoryTitle(r)}
                        </p>
                        <p className="mt-2 text-sm font-bold text-neutral-900 group-hover:text-primary-700">
                          {r.title}
                        </p>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                          {r.summary}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-12 text-center">
              <Link
                href={`/help/${getHelpCategorySlug(article)}`}
                className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h18"
                  />
                </svg>
                {getHelpCategoryTitle(article)} の一覧へ
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
