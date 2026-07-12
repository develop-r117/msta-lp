/**
 * LPセクション情報の単一情報源。
 * - スクロール追従ナビゲーション (PC/SP) の表示用に使う
 * - section要素のid属性として使う
 * 番号と並び順は要件定義書のセクション順に準拠。
 */
import contactSettings from "../data/contact.generated.json";
import type { ContactSettings } from "./content-types";

export type SectionMeta = {
  id: string;
  navNumber: string | null;
  navLabel: string | null;
  fullLabel: string;
};

export const SECTIONS: readonly SectionMeta[] = [
  {
    id: "hero",
    navNumber: "01",
    navLabel: "FV",
    fullLabel: "ファーストビュー",
  },
  {
    id: "intro",
    navNumber: "02",
    navLabel: "Concept",
    fullLabel: "エムスタでできること",
  },
  {
    id: "about",
    navNumber: "03",
    navLabel: "About",
    fullLabel: "エムスタとは",
  },
  {
    id: "cms",
    navNumber: "04",
    navLabel: "CMS",
    fullLabel: "CMS / 管理ダッシュボード",
  },
  {
    id: "modes",
    navNumber: "05",
    navLabel: "Mode",
    fullLabel: "かんたん / プロモード",
  },
  {
    id: "features",
    navNumber: "06",
    navLabel: "Feature",
    fullLabel: "主な機能",
  },
  {
    id: "usage",
    navNumber: "07",
    navLabel: "Style",
    fullLabel: "3つの利用スタイル",
  },
  { id: "pricing", navNumber: "08", navLabel: "Price", fullLabel: "料金" },
  {
    id: "partner",
    navNumber: "09",
    navLabel: "Partner",
    fullLabel: "パートナープログラム",
  },
  {
    id: "partner-doc",
    navNumber: null,
    navLabel: null,
    fullLabel: "パートナー向け資料請求",
  },
  {
    id: "ai",
    navNumber: null,
    navLabel: null,
    fullLabel: "AI / エージェント構想",
  },
  {
    id: "team",
    navNumber: null,
    navLabel: null,
    fullLabel: "チーム運用 / 権限ロール",
  },
  {
    id: "marketplace",
    navNumber: null,
    navLabel: null,
    fullLabel: "マーケットプレイス構想",
  },
  { id: "ugc", navNumber: null, navLabel: null, fullLabel: "UGC / 共創型" },
  {
    id: "official",
    navNumber: null,
    navLabel: null,
    fullLabel: "オフィシャル制作 / 3hパック",
  },
  {
    id: "msta-full",
    navNumber: null,
    navLabel: null,
    fullLabel: "エムスタFull",
  },
  {
    id: "usecases",
    navNumber: null,
    navLabel: null,
    fullLabel: "ユースケース",
  },
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
 * クローズ公開中は false。dashboard への導線を Coming soon 表示に切り替える。
 * リリース時に true に戻す。
 */
export const SIGNUP_OPEN = true;

export const SIGNUP_COMING_SOON_LABEL = "Coming soon";
export const SIGNUP_COMING_SOON_NOTE = "6月末頃リリース予定";

const cmsContact = contactSettings as ContactSettings;

/**
 * 候補を順に評価し、最初の非空文字列を返す。
 * 優先順位は「CMS（/keystatic で編集）→ 環境変数 → コード上の既定値」。
 */
function resolveLink(...candidates: (string | undefined)[]): string {
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value) return value;
  }
  return "/contact";
}

/**
 * CTAリンク。/keystatic の「お問い合わせ / 予約リンク」で編集でき、
 * 未設定時は従来どおり環境変数 / 既定値にフォールバックする。
 */
export const CTA_LINKS = {
  signup: SIGNUP_OPEN
    ? resolveLink(
        cmsContact.signupUrl,
        process.env.NEXT_PUBLIC_SIGNUP_URL,
        "https://cms.msta-app-com",
      )
    : "",
  spirGeneral: resolveLink(
    cmsContact.spirGeneral,
    process.env.NEXT_PUBLIC_SPIR_GENERAL_URL,
    process.env.NEXT_PUBLIC_SPIR_URL,
  ),
  spirOfficial: resolveLink(
    cmsContact.spirOfficial,
    process.env.NEXT_PUBLIC_SPIR_OFFICIAL_URL,
  ),
  spirThreeHour: resolveLink(
    cmsContact.spirThreeHour,
    process.env.NEXT_PUBLIC_SPIR_3H_URL,
  ),
  spirFull: resolveLink(
    cmsContact.spirFull,
    process.env.NEXT_PUBLIC_SPIR_FULL_URL,
  ),
  spirPartner: resolveLink(
    cmsContact.spirPartner,
    process.env.NEXT_PUBLIC_SPIR_PARTNER_URL,
  ),
} as const;

/**
 * 一般相談カレンダーのSpir埋込コード（/keystatic で編集）。未設定時は空文字。
 */
export const GENERAL_CALENDAR_EMBED =
  cmsContact.generalCalendarEmbed?.trim() ?? "";
