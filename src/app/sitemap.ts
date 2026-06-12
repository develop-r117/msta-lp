import type { MetadataRoute } from "next";
import { STATIC_ROUTES } from "@/lib/navigation";
import { FEATURES } from "@/lib/features";
import {
  getAllCases,
  getAllUsecases,
  getAllHelpCategories,
  getAllHelpArticles,
} from "@/lib/cms-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));

  const featureEntries: MetadataRoute.Sitemap = FEATURES.map((f) => ({
    url: `${baseUrl}/product/features/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const cases = await getAllCases();
    const usecases = await getAllUsecases();
    const helpCategories = await getAllHelpCategories();
    const helpArticles = await getAllHelpArticles();
    const caseEntries: MetadataRoute.Sitemap = cases.map((c) => ({
      url: `${baseUrl}/cases/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    const usecaseEntries: MetadataRoute.Sitemap = usecases.map((u) => ({
      url: `${baseUrl}/usecases/${u.industry}`,
      lastModified: u.updatedAt ? new Date(u.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    const helpCategoryEntries: MetadataRoute.Sitemap = helpCategories.map((c) => ({
      url: `${baseUrl}/help/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    const helpArticleEntries: MetadataRoute.Sitemap = helpArticles.map((a) => ({
      url: `${baseUrl}/help/articles/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    dynamicEntries = [
      ...caseEntries,
      ...usecaseEntries,
      ...helpCategoryEntries,
      ...helpArticleEntries,
    ];
  } catch (e) {
    console.warn("[sitemap] failed to load microCMS entries, returning static only", e);
  }

  return [...staticEntries, ...featureEntries, ...dynamicEntries];
}
