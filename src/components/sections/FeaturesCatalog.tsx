"use client";

import { useMemo, useState } from "react";
import { FeatureGrid } from "@/components/sections/Features";
import {
  FEATURES,
  FEATURE_CATEGORIES,
  type FeatureCategoryId,
} from "@/lib/features";
import { cn } from "@/lib/cn";

/**
 * /product/features 一覧用の検索＋カテゴリフィルタ付きカタログ。
 */
export default function FeaturesCatalog() {
  const [activeCategory, setActiveCategory] = useState<
    FeatureCategoryId | "all"
  >("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FEATURES.filter((f) => {
      const inCategory =
        activeCategory === "all" || f.category === activeCategory;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.summary.toLowerCase().includes(q) ||
        f.keyCapabilities.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, query]);

  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <label className="sr-only" htmlFor="feature-search">
            機能を検索
          </label>
          <div className="relative max-w-2xl">
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
              id="feature-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="機能名や説明で検索（例: 通知、会員、AI）"
              className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
              activeCategory === "all"
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900",
            )}
          >
            すべて ({FEATURES.length})
          </button>
          {FEATURE_CATEGORIES.map((c) => {
            const count = FEATURES.filter((f) => f.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
                  activeCategory === c.id
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900",
                )}
              >
                {c.label} ({count})
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <FeatureGrid features={filtered} />
        ) : (
          <p className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-neutral-500 ring-1 ring-neutral-200">
            該当する機能が見つかりませんでした。検索条件を変えてお試しください。
          </p>
        )}
      </div>
    </section>
  );
}
