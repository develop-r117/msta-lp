import { Suspense } from "react";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import HelpHero from "@/components/sections/HelpHero";
import HelpCategoryGrid from "@/components/sections/HelpCategoryGrid";
import HelpArticleList from "@/components/sections/HelpArticleList";
import HelpSearchResults from "@/components/sections/HelpSearchResults";
import {
  getAllHelpArticles,
  getAllHelpCategories,
} from "@/lib/cms-static";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ヘルプセンター",
  description:
    "エムスタの使い方・運用ノウハウ・トラブル対応をまとめた公式ヘルプセンター。アカウント、料金、アプリ構築、運用、トラブルシューティングをカテゴリ別にご覧いただけます。",
  path: "/help",
});

export default async function HelpHomePage() {
  const categories = getAllHelpCategories();
  const allArticles = getAllHelpArticles();

  const popular = allArticles.slice(0, 6);

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
      <Suspense fallback={null}>
        <HelpHero categories={categories} />
      </Suspense>

      <Suspense fallback={null}>
        <HelpSearchResults allArticles={allArticles} />
      </Suspense>

      <HelpCategoryGrid categories={categories} articles={allArticles} />

      <HelpArticleList articles={popular} title="よく読まれている記事" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </SiteShell>
  );
}
