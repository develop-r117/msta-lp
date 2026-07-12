"use client";

import { useEffect, useMemo, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import type { FAQCategory } from "@/lib/content-types";
import { cn } from "@/lib/cn";
import { trackEvent, trackSearch } from "@/lib/analytics";

type Props = {
  categories: FAQCategory[];
  enableSearch?: boolean;
};

export default function FAQGroups({ categories, enableSearch = true }: Props) {
  const [activeId, setActiveId] = useState<string>(
    categories[0]?.id ?? "general",
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return categories.find((c) => c.id === activeId)?.items ?? [];
    }
    const q = query.toLowerCase();
    const all = categories.flatMap((c) => c.items);
    return all.filter(
      (it) =>
        it.question.toLowerCase().includes(q) ||
        it.answer.toLowerCase().includes(q),
    );
  }, [categories, activeId, query]);

  // 検索語の計測。キー入力毎の過剰送信を防ぐためデバウンスして送る。
  useEffect(() => {
    const term = query.trim();
    if (!term) return;
    const timer = setTimeout(() => {
      trackSearch(term, filtered.length, "faq");
    }, 600);
    return () => clearTimeout(timer);
  }, [query, filtered.length]);

  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {enableSearch ? (
          <div className="mb-8">
            <label className="sr-only" htmlFor="faq-search">
              FAQを検索
            </label>
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.3-4.3M16.5 11A5.5 5.5 0 1 1 5.5 11a5.5 5.5 0 0 1 11 0Z"
                  />
                </svg>
              </span>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="キーワードで検索（例: 料金、公開、AI）"
                className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>
          </div>
        ) : null}

        {!query.trim() ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveId(c.id);
                  trackEvent("faq_category_select", { category_id: c.id });
                }}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
                  activeId === c.id
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-sm md:p-4">
          {filtered.length > 0 ? (
            <Accordion
              items={filtered}
              analyticsCategory={query.trim() ? "faq_search" : activeId}
            />
          ) : (
            <p className="px-4 py-12 text-center text-sm text-neutral-500">
              該当する質問が見つかりませんでした。お問い合わせフォームよりお気軽にご相談ください。
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
