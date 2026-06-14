import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, ORGANIZATION, ogImageUrl } from "@/lib/site";

type Args = {
  title: string;
  description: string;
  path: string;
  /** OGP画像URL。未指定時はタイトルから動的OG画像を生成する */
  ogImage?: string;
  /** OGの種別。記事系は "article" を指定 */
  type?: "website" | "article";
};

/**
 * 各ページが共通してOG・Twitter・canonicalを揃えるためのヘルパ。
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
}: Args): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const image = ogImage ?? ogImageUrl(title);
  const images = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: fullTitle,
    },
  ];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "ja_JP",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

type ServiceArgs = {
  name: string;
  description: string;
  path: string;
  /** 価格（数値文字列）。無い場合は offers を出さない */
  price?: string;
  priceCurrency?: string;
};

/**
 * サービスページ用の Service + Offer JSON-LD を組み立てる。
 */
export function buildServiceJsonLd({
  name,
  description,
  path,
  price,
  priceCurrency = "JPY",
}: ServiceArgs) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url,
    areaServed: "JP",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: ORGANIZATION.legalName,
      url: SITE_URL,
    },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency,
            url,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}
