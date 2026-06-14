import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import HelpArticleList from "@/components/sections/HelpArticleList";
import HelpCategoryGrid from "@/components/sections/HelpCategoryGrid";
import {
  getAllHelpArticles,
  getAllHelpCategories,
  getHelpArticlesByCategory,
  getHelpCategoryBySlug,
} from "@/lib/cms-data";
import { buildMetadata } from "@/lib/seo";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = await getHelpCategoryBySlug(category);
  if (!cat) {
    return buildMetadata({
      title: "ヘルプ",
      description: "ヘルプセンター",
      path: `/help/${category}`,
    });
  }
  return buildMetadata({
    title: `${cat.title} | ヘルプセンター`,
    description: cat.description,
    path: `/help/${cat.slug}`,
  });
}

export default async function HelpCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = await getHelpCategoryBySlug(category);
  if (!cat) notFound();

  const articles = await getHelpArticlesByCategory(cat.slug);
  const allCategories = await getAllHelpCategories();
  const allArticles = await getAllHelpArticles();

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/help" },
        { href: `/help/${cat.slug}`, label: cat.title },
      ])}
      audience="general"
    >
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            Help category
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            {cat.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            {cat.description}
          </p>
        </div>
      </section>
      <HelpArticleList
        articles={articles}
        title={`${cat.title}の記事（${articles.length}件）`}
        emptyMessage="このカテゴリの記事は準備中です。"
      />
      <HelpCategoryGrid
        categories={allCategories.filter((c) => c.slug !== cat.slug)}
        articles={allArticles}
      />
    </SiteShell>
  );
}
