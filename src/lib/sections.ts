/**
 * LPセクション情報の単一情報源。
 * - スクロール追従ナビゲーション (PC/SP) の表示用に使う
 * - section要素のid属性として使う
 * 番号と並び順は要件定義書のセクション順に準拠。
 */
export type SectionMeta = {
  id: string;
  navNumber: string | null;
  navLabel: string | null;
  fullLabel: string;
};

export const SECTIONS: readonly SectionMeta[] = [
  { id: "hero", navNumber: "01", navLabel: "FV", fullLabel: "ファーストビュー" },
  { id: "intro", navNumber: "02", navLabel: "Concept", fullLabel: "エムスタでできること" },
  { id: "about", navNumber: "03", navLabel: "About", fullLabel: "エムスタとは" },
  { id: "cms", navNumber: "04", navLabel: "CMS", fullLabel: "CMS / 管理ダッシュボード" },
  { id: "modes", navNumber: "05", navLabel: "Mode", fullLabel: "かんたん / プロモード" },
  { id: "features", navNumber: "06", navLabel: "Feature", fullLabel: "主な機能" },
  { id: "usage", navNumber: "07", navLabel: "Style", fullLabel: "3つの利用スタイル" },
  { id: "pricing", navNumber: "08", navLabel: "Price", fullLabel: "料金" },
  { id: "partner", navNumber: "09", navLabel: "Partner", fullLabel: "パートナープログラム" },
  { id: "partner-doc", navNumber: null, navLabel: null, fullLabel: "パートナー向け資料請求" },
  { id: "ai", navNumber: null, navLabel: null, fullLabel: "AI / エージェント構想" },
  { id: "team", navNumber: null, navLabel: null, fullLabel: "チーム運用 / 権限ロール" },
  { id: "marketplace", navNumber: null, navLabel: null, fullLabel: "マーケットプレイス構想" },
  { id: "ugc", navNumber: null, navLabel: null, fullLabel: "UGC / 共創型" },
  { id: "official", navNumber: null, navLabel: null, fullLabel: "オフィシャル制作 / 3hパック" },
  { id: "msta-full", navNumber: null, navLabel: null, fullLabel: "エムスタFull" },
  { id: "usecases", navNumber: null, navLabel: null, fullLabel: "ユースケース" },
  { id: "cases", navNumber: null, navLabel: null, fullLabel: "導入事例" },
  { id: "flow", navNumber: null, navLabel: null, fullLabel: "導入までの流れ" },
  { id: "faq", navNumber: "10", navLabel: "FAQ", fullLabel: "よくある質問" },
  { id: "final-cta", navNumber: "11", navLabel: "Start", fullLabel: "最終CTA" },
];

export type SectionId = string;

export type NavSection = SectionMeta & { navNumber: string; navLabel: string };

/**
 * スクロール追従ナビに表示するセクションだけ抽出 (FV〜最終CTAの主要11セクション)。
 */
export const NAV_SECTIONS: NavSection[] = SECTIONS.filter(
  (s): s is NavSection => s.navNumber !== null && s.navLabel !== null,
);

/**
 * CTAリンク (環境変数で外部URLに差し替え可能)。
 */
export const CTA_LINKS = {
  signup: process.env.NEXT_PUBLIC_SIGNUP_URL ?? "https://dashboard.msta-app.com/",
  spirGeneral:
    process.env.NEXT_PUBLIC_SPIR_GENERAL_URL ?? process.env.NEXT_PUBLIC_SPIR_URL ?? "/contact",
  spirOfficial: process.env.NEXT_PUBLIC_SPIR_OFFICIAL_URL ?? "/contact",
  spirThreeHour: process.env.NEXT_PUBLIC_SPIR_3H_URL ?? "/contact",
  spirFull: process.env.NEXT_PUBLIC_SPIR_FULL_URL ?? "/contact",
  spirPartner: process.env.NEXT_PUBLIC_SPIR_PARTNER_URL ?? "/contact",
} as const;
