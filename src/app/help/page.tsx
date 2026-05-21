import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import HelpHero from "@/components/sections/HelpHero";
import HelpCategoryGrid from "@/components/sections/HelpCategoryGrid";
import HelpArticleList from "@/components/sections/HelpArticleList";
import {
  fetchHelpArticles,
  fetchHelpCategories,
} from "@/lib/microcms";
import { buildMetadata } from "@/lib/seo";

export const runtime = "edge";

type SearchParams = Promise<{ q?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  if (q) {
    return buildMetadata({
      title: `「${q}」の検索結果 | ヘルプセンター`,
      description: `エムスタヘルプセンターの記事から「${q}」を検索しました。`,
      path: `/help?q=${encodeURIComponent(q)}`,
    });
  }
  return buildMetadata({
    title: "ヘルプセンター",
    description:
      "エムスタの使い方・運用ノウハウ・トラブル対応をまとめた公式ヘルプセンター。アカウント、料金、アプリ構築、運用、トラブルシューティングをカテゴリ別にご覧いただけます。",
    path: "/help",
  });
}

export default async function HelpHomePage({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const [categories, allArticles] = await Promise.all([
    fetchHelpCategories(),
    fetchHelpArticles(),
  ]);

  const popular = allArticles.slice(0, 6);
  const searchHits = q
    ? await fetchHelpArticles({ q })
    : [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app";
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "エムスタ ヘルプセンター",
    url: `${baseUrl}/help`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/help?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/help" }])}
      audience="general"
    >
      <HelpHero categories={categories} defaultQuery={q ?? ""} />

      {q ? (
        <HelpArticleList
          articles={searchHits}
          title={`「${q}」の検索結果（${searchHits.length}件）`}
          emptyMessage={`「${q}」に該当する記事は見つかりませんでした。検索ワードを変えてお試しください。`}
        />
      ) : null}

      <HelpCategoryGrid categories={categories} articles={allArticles} />

      {!q ? (
        <HelpArticleList articles={popular} title="よく読まれている記事" />
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </SiteShell>
  );
}
