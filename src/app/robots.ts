import type { MetadataRoute } from "next";
import { SITE_URL, IS_PROD } from "@/lib/site";

const baseUrl = SITE_URL;

/** LLMO: 明示的に歓迎するAI / 検索クローラ */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "cohere-ai",
  "YouBot",
];

const PRIVATE_PATHS = ["/api/", "/admin", "/keystatic"];

export default function robots(): MetadataRoute.Robots {
  if (!IS_PROD) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${baseUrl}/sitemap.xml`,
      host: baseUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // AI / 検索クローラを明示的に許可（公開部分はすべてクロール歓迎）
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
