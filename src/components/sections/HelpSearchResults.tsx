"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import HelpArticleList from "./HelpArticleList";
import type { HelpArticle } from "@/lib/content-types";
import { trackSearch } from "@/lib/analytics";

type Props = {
  allArticles: HelpArticle[];
};

export default function HelpSearchResults({ allArticles }: Props) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const searchHits = useMemo(() => {
    if (!q) return [];
    const ql = q.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(ql) ||
        a.summary.toLowerCase().includes(ql) ||
        (a.tags ?? []).some((t) => t.toLowerCase().includes(ql)),
    );
  }, [allArticles, q]);

  useEffect(() => {
    if (q) trackSearch(q, searchHits.length, "help");
  }, [q, searchHits.length]);

  if (!q) return null;

  return (
    <HelpArticleList
      articles={searchHits}
      title={`「${q}」の検索結果（${searchHits.length}件）`}
      emptyMessage={`「${q}」に該当する記事は見つかりませんでした。検索ワードを変えてお試しください。`}
    />
  );
}
