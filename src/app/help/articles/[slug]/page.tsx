import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import HelpArticleBody from "@/components/sections/HelpArticleBody";
import {
  FALLBACK_HELP_ARTICLES,
  fetchHelpArticleBySlug,
  fetchHelpArticles,
  getHelpCategorySlug,
  getHelpCategoryTitle,
} from "@/lib/microcms";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return FALLBACK_HELP_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchHelpArticleBySlug(slug);
  if (!article) {
    return buildMetadata({
      title: "ヘルプ記事",
      description: "ヘルプセンター",
      path: `/help/articles/${slug}`,
    });
  }
  return buildMetadata({
    title: `${article.title} | ヘルプセンター`,
    description: article.summary,
    path: `/help/articles/${article.slug}`,
  });
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchHelpArticleBySlug(slug);
  if (!article) notFound();

  const categorySlug = getHelpCategorySlug(article);
  const categoryTitle = getHelpCategoryTitle(article);

  const sameCategory = await fetchHelpArticles({ categorySlug });
  const related = (article.relatedArticles?.length
    ? (await Promise.all(
        article.relatedArticles.map((r) => fetchHelpArticleBySlug(r.slug)),
      )).filter((a): a is NonNullable<typeof a> => a !== null)
    : sameCategory.filter((a) => a.slug !== article.slug)
  ).slice(0, 4);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${article.title} | エムスタ ヘルプセンター`,
    description: article.summary,
    mainEntityOfPage: `${baseUrl}/help/articles/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Organization", name: "エムスタ" },
    publisher: {
      "@type": "Organization",
      name: "エムスタ",
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.svg` },
    },
    articleSection: categoryTitle,
    keywords: (article.tags ?? []).join(", "),
  };

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/help" },
        { href: `/help/${categorySlug}`, label: categoryTitle },
        { href: `/help/articles/${article.slug}`, label: article.title },
      ])}
      audience="general"
    >
      <HelpArticleBody article={article} related={related} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </SiteShell>
  );
}
