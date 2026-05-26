import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import FAQGroups from "@/components/sections/FAQGroups";
import { fetchFAQCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "よくある質問",
  description:
    "エムスタに関するよくあるご質問。プロダクト、公開・運用、料金、制作・サポート、パートナー制度のカテゴリ別に整理し、検索もできます。",
  path: "/faq",
});

export default async function FAQPage() {
  const FAQ_CATEGORIES = await fetchFAQCategories();
  const allItems = FAQ_CATEGORIES.flatMap((c) => c.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/faq" }])}
      audience="both"
    >
      <PageHero
        eyebrow="FAQ"
        title={<>よくある<span className="text-gradient">ご質問</span></>}
        description="エムスタに関する代表的なご質問をカテゴリ別にまとめています。検索でも該当箇所を素早く確認いただけます。"
      />
      <FAQGroups categories={FAQ_CATEGORIES} enableSearch />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteShell>
  );
}
