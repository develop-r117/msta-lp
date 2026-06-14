/**
 * サイト全体のメタ情報・会社情報の単一情報源。
 * canonical / OGP / 構造化データ / sitemap / robots / llms.txt などで共通参照する。
 */

/** 本番URL（末尾スラッシュなし）。環境変数で上書き可能。 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta-app.com"
).replace(/\/$/, "");

/** サービス名（表示用） */
export const SITE_NAME = "エムスタ";

/** サービス名（英字 / 正式表記） */
export const SERVICE_NAME = "MS Studio（エムスタ）";

/** 本番環境かどうか */
export const IS_PROD = process.env.NEXT_PUBLIC_SITE_ENV === "production";

/** サイト全体の既定ディスクリプション */
export const SITE_DESCRIPTION =
  "エムスタは、Webアプリ・iOS・Androidに対応した次世代型アプリ制作プラットフォーム。CMSを標準搭載し、誰でも直感的にアプリ制作・運用・改善・収益化までを一つの場所で。2週間無料トライアル / 初期費用0円。";

/** 既定OGP画像の絶対URLを返す（next/og で動的生成） */
export function ogImageUrl(title?: string, subtitle?: string): string {
  const params = new URLSearchParams();
  if (title) params.set("title", title);
  if (subtitle) params.set("subtitle", subtitle);
  const qs = params.toString();
  return `${SITE_URL}/api/og${qs ? `?${qs}` : ""}`;
}

/** 運営会社情報 */
export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "株式会社R117",
  url: "https://r117.co.jp",
  email: "info@r117.com",
  logo: `${SITE_URL}/logo.png`,
  /** SNS等の確定済み外部プロフィール（確定分のみ） */
  sameAs: ["https://r117.co.jp"],
  address: {
    postalCode: "450-0002",
    region: "愛知県",
    locality: "名古屋市中村区",
    street: "名駅5丁目2-17 フロンティア名駅13階",
    country: "JP",
  },
} as const;
