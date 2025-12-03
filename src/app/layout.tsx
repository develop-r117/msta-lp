import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Outfit } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "エムスタ - プログラミング不要の店舗アプリ作成サービス",
  description:
    "エムスタは、プログラミング不要で店舗やコミュニティのオリジナルモバイルアプリを数時間で立ち上げられるSaaSプラットフォームです。初期費用無料、月額料金のみで運用可能。",
  keywords:
    "店舗アプリ,コミュニティアプリ,アプリ作成,ノーコード,飲食店アプリ,美容院アプリ",
  openGraph: {
    title: "エムスタ - プログラミング不要の店舗アプリ作成サービス",
    description:
      "プログラミング不要で店舗やコミュニティのオリジナルモバイルアプリを数時間で立ち上げられるSaaSプラットフォーム",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
