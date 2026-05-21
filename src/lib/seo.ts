import type { Metadata } from "next";

const siteName = "エムスタ";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app";

type Args = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

/**
 * 各ページが共通してOG・Twitter・canonicalを揃えるためのヘルパ。
 */
export function buildMetadata({ title, description, path, ogImage }: Args): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: "website",
      locale: "ja_JP",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
