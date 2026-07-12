/**
 * グローバルナビゲーション・フッター・パンくずリストの単一情報源。
 * マルチページ構成における全ページ間で共通参照される。
 */

export type NavLink = {
  href: string;
  label: string;
  description?: string;
  /** 外部サイトへのリンク（別タブ・rel=noopener で開く） */
  external?: boolean;
};

export type NavGroup = {
  id: string;
  label: string;
  audience?: "general" | "agency" | "both";
  /** トップに飛ぶ単独リンク */
  href?: string;
  /** ドロップダウン内のリンク群 */
  children?: NavLink[];
  /** 二系統動線の重要度（1=最強） */
  priority?: number;
};

/**
 * グローバルヘッダーに表示するメインナビ。
 */
export const PRIMARY_NAV: NavGroup[] = [
  {
    id: "product",
    label: "プロダクト",
    audience: "general",
    children: [
      {
        href: "/product",
        label: "エムスタとは",
        description: "真のノーコード × 最強CMS",
      },
      {
        href: "/product/cms",
        label: "CMS / 管理ダッシュボード",
        description: "リリース後の運用までカバー",
      },
      {
        href: "/product/modes",
        label: "かんたん / プロモード",
        description: "初心者にもプロにも",
      },
      {
        href: "/product/features",
        label: "全機能一覧",
        description: "情報発信から拡張まで",
      },
      {
        href: "/product/ai",
        label: "AI / エージェント",
        description: "制作と運用を支援するAI",
      },
      {
        href: "/product/team",
        label: "チーム運用 / 権限",
        description: "組織でも安全に運用",
      },
    ],
  },
  {
    id: "cases",
    label: "事例",
    audience: "both",
    children: [
      {
        href: "/cases",
        label: "導入事例",
        description: "業種・目的別の事例集",
      },
      // ユースケースは一旦非公開化のためコメントアウト
      // { href: "/usecases", label: "ユースケース", description: "業種ごとの活用シナリオ" },
    ],
  },
  {
    id: "pricing",
    label: "料金",
    href: "/pricing",
    audience: "general",
  },
  {
    id: "services",
    label: "サービス",
    audience: "agency",
    children: [
      {
        href: "/services/official",
        label: "オフィシャル制作",
        description: "公式チームによる代行",
      },
      {
        href: "/services/3h-pack",
        label: "3hパック",
        description: "ローンチ記念半額",
      },
      {
        href: "/services/full",
        label: "エムスタFull",
        description: "独自要件・スクラッチ対応",
      },
    ],
  },
  {
    id: "partners",
    label: "パートナー",
    audience: "agency",
    priority: 1,
    children: [
      {
        href: "/partners",
        label: "パートナープログラム",
        description: "アプリビジネスを始める",
      },
      {
        href: "/partners/document",
        label: "資料ダウンロード",
        description: "制度概要を入手",
      },
    ],
  },
  {
    id: "support",
    label: "サポート",
    audience: "both",
    children: [
      // ヘルプセンターは一旦非公開化のためコメントアウト
      // { href: "/help", label: "ヘルプセンター", description: "使い方・運用・トラブル対応" },
      {
        href: "/faq",
        label: "よくある質問",
        description: "FAQをまとめてチェック",
      },
      {
        href: "/contact",
        label: "お問い合わせ",
        description: "ご相談・ご質問はこちら",
      },
    ],
  },
];

/**
 * フッター用サイトマップ。
 */
export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const FOOTER_SITEMAP: FooterColumn[] = [
  {
    title: "プロダクト",
    links: [
      { href: "/product", label: "エムスタとは" },
      { href: "/product/cms", label: "CMS / 管理ダッシュボード" },
      { href: "/product/modes", label: "かんたん / プロモード" },
      { href: "/product/features", label: "全機能一覧" },
      { href: "/product/ai", label: "AI / エージェント" },
      { href: "/product/team", label: "チーム運用 / 権限" },
    ],
  },
  {
    title: "活用シーン",
    links: [
      { href: "/cases", label: "導入事例" },
      // ユースケースは一旦非公開化のためコメントアウト
      // { href: "/usecases", label: "業種別ユースケース" },
      { href: "/marketplace", label: "マーケットプレイス" },
      { href: "/community", label: "UGC / 共創" },
    ],
  },
  {
    title: "サービス・パートナー",
    links: [
      { href: "/services/official", label: "オフィシャル制作" },
      { href: "/services/3h-pack", label: "3hパック" },
      { href: "/services/full", label: "エムスタFull" },
      { href: "/partners", label: "パートナープログラム" },
      { href: "/partners/document", label: "パートナー資料DL" },
    ],
  },
  {
    title: "サポート",
    links: [
      // ヘルプセンターは一旦非公開化のためコメントアウト
      // { href: "/help", label: "ヘルプセンター" },
      { href: "/pricing", label: "料金" },
      { href: "/flow", label: "導入までの流れ" },
      { href: "/faq", label: "よくある質問" },
      { href: "/contact", label: "お問い合わせ" },
    ],
  },
  {
    title: "会社情報",
    links: [
      { href: "https://r117.co.jp/", label: "運営会社", external: true },
      { href: "/privacy", label: "プライバシーポリシー" },
      { href: "/commercial", label: "特定商取引法に基づく表記" },
      { href: "/terms", label: "利用規約" },
    ],
  },
];

/**
 * パンくずに使うラベル辞書。プログラマブルにラベルを引きたい場合に利用。
 */
export const ROUTE_LABELS: Record<string, string> = {
  "/": "ホーム",
  "/product": "プロダクト",
  "/product/cms": "CMS / 管理ダッシュボード",
  "/product/modes": "かんたん / プロモード",
  "/product/features": "全機能一覧",
  "/product/ai": "AI / エージェント",
  "/product/team": "チーム運用 / 権限",
  "/pricing": "料金",
  "/flow": "導入までの流れ",
  "/cases": "導入事例",
  "/usecases": "ユースケース",
  "/services": "サービス",
  "/services/official": "オフィシャル制作",
  "/services/3h-pack": "3hパック",
  "/services/full": "エムスタFull",
  "/partners": "パートナープログラム",
  "/partners/document": "パートナー資料DL",
  "/marketplace": "マーケットプレイス",
  "/community": "UGC / 共創",
  "/faq": "よくある質問",
  "/help": "ヘルプセンター",
  "/help/articles": "ヘルプ記事",
  "/contact": "お問い合わせ",
  "/privacy": "プライバシーポリシー",
  "/commercial": "特定商取引法に基づく表記",
  "/terms": "利用規約",
};

/**
 * 静的ルートのリスト (sitemap生成に使用)。
 */
export const STATIC_ROUTES: string[] = [
  "/",
  "/product",
  "/product/cms",
  "/product/modes",
  "/product/features",
  "/product/ai",
  "/product/team",
  "/pricing",
  "/flow",
  "/cases",
  "/usecases",
  "/services",
  "/services/official",
  "/services/3h-pack",
  "/services/full",
  "/partners",
  "/partners/document",
  "/marketplace",
  "/community",
  "/faq",
  "/help",
  "/contact",
  "/privacy",
  "/commercial",
  "/terms",
];
