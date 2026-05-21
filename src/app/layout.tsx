import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const siteName = "エムスタ";
const description =
  "エムスタは、Webアプリ・iOS・Androidに対応した次世代型アプリ制作プラットフォーム。CMSを標準搭載し、誰でも直感的にアプリ制作・運用・改善・収益化までを一つの場所で。2週間無料トライアル / 初期費用0円。";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app"),
  title: {
    default: `${siteName} - 真のノーコード × 最強CMS`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "エムスタ",
    "アプリ制作",
    "ノーコード",
    "CMS",
    "iOSアプリ",
    "Androidアプリ",
    "Webアプリ",
    "アプリ制作プラットフォーム",
    "アプリ開発代行",
  ],
  openGraph: {
    title: `${siteName} - 真のノーコード × 最強CMS`,
    description,
    type: "website",
    locale: "ja_JP",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - 真のノーコード × 最強CMS`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/faq?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Product",
      name: siteName,
      description,
      brand: { "@type": "Brand", name: siteName },
      offers: {
        "@type": "Offer",
        price: "3000",
        priceCurrency: "JPY",
        url: siteUrl,
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className={`${notoSansJP.className} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
