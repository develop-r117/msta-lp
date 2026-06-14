import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  ORGANIZATION,
  ogImageUrl,
} from "@/lib/site";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const defaultTitle = `${SITE_NAME} - 真のノーコード × 最強CMS`;

export const viewport: Viewport = {
  themeColor: "#2563eb",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: ORGANIZATION.legalName, url: ORGANIZATION.url }],
  creator: ORGANIZATION.legalName,
  publisher: ORGANIZATION.legalName,
  category: "technology",
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
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    images: [
      {
        url: ogImageUrl(defaultTitle),
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: [ogImageUrl(defaultTitle)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: ORGANIZATION.legalName,
      url: SITE_URL,
      email: ORGANIZATION.email,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
        width: 508,
        height: 176,
      },
      sameAs: ORGANIZATION.sameAs,
      address: {
        "@type": "PostalAddress",
        postalCode: ORGANIZATION.address.postalCode,
        addressRegion: ORGANIZATION.address.region,
        addressLocality: ORGANIZATION.address.locality,
        streetAddress: ORGANIZATION.address.street,
        addressCountry: ORGANIZATION.address.country,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "ja-JP",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/faq?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      inLanguage: "ja-JP",
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "3000",
        priceCurrency: "JPY",
        url: `${SITE_URL}/pricing`,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#product`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      brand: { "@type": "Brand", name: SITE_NAME },
      offers: {
        "@type": "Offer",
        price: "3000",
        priceCurrency: "JPY",
        url: `${SITE_URL}/pricing`,
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
