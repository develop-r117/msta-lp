"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { HelpCategory } from "@/lib/microcms";

type Props = {
  categories: HelpCategory[];
};

/**
 * ヘルプセンターのヒーロー（検索バー + カテゴリピル）。
 * 検索は /help?q=... へ遷移する単純な仕組み。
 */
export default function HelpHero({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/help?q=${encodeURIComponent(q)}` : "/help");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
          Help center
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          困ったときは、ここから。
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
          エムスタの使い方・運用ノウハウ・トラブル対応をまとめた公式ヘルプセンターです。
        </p>
        <form onSubmit={onSubmit} className="mt-8" role="search" aria-label="ヘルプ検索">
          <label htmlFor="help-search" className="sr-only">ヘルプ記事を検索</label>
          <div className="relative mx-auto max-w-2xl">
            <span aria-hidden className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.3-4.3M16.5 11A5.5 5.5 0 1 1 5.5 11a5.5 5.5 0 0 1 11 0Z" />
              </svg>
            </span>
            <input
              id="help-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="例: プッシュ通知が届かない、料金プラン、ビルド失敗"
              className="w-full rounded-full border-0 bg-white py-4 pl-14 pr-32 text-sm text-neutral-800 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/40 md:text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800 md:text-sm"
            >
              検索
            </button>
          </div>
        </form>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/help/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                {c.title}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
