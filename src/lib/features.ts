/**
 * エムスタ全機能カタログ。
 * 一次情報源: ../msta-projects/dashboard/src/config/featureMarketplace.ts
 *           ../msta-projects/dashboard/src/layout/AppSidebar.tsx
 * /product/features 一覧と /product/features/[slug] 詳細ページの単一情報源。
 */

export type FeatureCategoryId =
  | "broadcast"
  | "members"
  | "comm"
  | "content"
  | "ops"
  | "ext"
  | "build";

export type FeatureBilling = "default" | "free-add" | "paid";

export type FeatureIcon =
  | "broadcast"
  | "members"
  | "comm"
  | "content"
  | "ops"
  | "ext"
  | "build";

export type Feature = {
  slug: string;
  name: string;
  category: FeatureCategoryId;
  billing: FeatureBilling;
  icon: FeatureIcon;
  summary: string;
  keyCapabilities: string[];
  screens?: string[];
  relatedSettings?: string[];
  audiences?: string[];
  relatedSlugs?: string[];
};

export const FEATURE_CATEGORIES: { id: FeatureCategoryId; label: string; description: string }[] =
  [
    { id: "broadcast", label: "情報発信", description: "プッシュ・メール・ポップアップなど、ユーザーに届ける機能" },
    { id: "members", label: "会員管理", description: "会員基盤、ランク、課金、権限の管理" },
    { id: "comm", label: "コミュニケーション", description: "チャット・問い合わせ・アンケート・クーポン" },
    { id: "content", label: "コンテンツ", description: "投稿・固定・ギャラリー・ファイル・地図" },
    { id: "ops", label: "業務支援", description: "予約・スタンプ・EC・分析" },
    { id: "ext", label: "拡張・連携", description: "AI・広告・外部連携" },
    { id: "build", label: "アプリ構築", description: "導線・モバイルUI・公開・機能設定" },
  ];

export const BILLING_LABELS: Record<FeatureBilling, string> = {
  default: "初期搭載",
  "free-add": "無料追加",
  paid: "有償オプション",
};

export const FEATURES: Feature[] = [
  /* ===== 情報発信 ===== */
  {
    slug: "push-notifications",
    name: "プッシュ通知",
    category: "broadcast",
    billing: "default",
    icon: "broadcast",
    summary: "通常プッシュと誕生日プッシュの自動配信で、ユーザーへの再訪を促進。アプリ内リンク指定にも対応。",
    keyCapabilities: [
      "通常プッシュ送信（即時 / 予約）",
      "誕生日プッシュの自動配信",
      "アプリ内ディープリンク指定",
      "通知履歴の管理",
    ],
    screens: ["プッシュ通知"],
    relatedSettings: ["機能ON/OFF（push）", "メニュー並び替え"],
    audiences: ["店舗・サービス業", "教育", "コミュニティ"],
    relatedSlugs: ["email-campaigns", "popups", "members"],
  },
  {
    slug: "email-campaigns",
    name: "メール配信",
    category: "broadcast",
    billing: "paid",
    icon: "broadcast",
    summary: "テンプレート・配信グループ・ドメイン認証まで揃った本格的なメールキャンペーン。SPF認証で到達率を高めます。",
    keyCapabilities: [
      "配信一覧・新規配信の作成",
      "テンプレート管理",
      "配信グループのセグメント",
      "送信設定とドメイン（SPF）認証",
    ],
    screens: ["配信一覧", "新規配信", "テンプレート", "配信グループ", "メール設定", "ドメイン認証"],
    relatedSettings: ["有償オプション 初期¥3,000 / 月¥980"],
    audiences: ["店舗", "BtoBサービス", "教育"],
    relatedSlugs: ["push-notifications", "members", "analytics"],
  },
  {
    slug: "popups",
    name: "ポップアップ",
    category: "broadcast",
    billing: "default",
    icon: "broadcast",
    summary: "アプリ内ポップアップで、お知らせ・キャンペーン・重要告知を確実に届けます。",
    keyCapabilities: [
      "ポップアップの新規作成・編集",
      "表示タイミング・表示回数の制御",
      "画像・テキスト・ボタンリンクのカスタマイズ",
    ],
    screens: ["ポップアップ一覧", "新規 / 編集"],
    audiences: ["店舗", "EC", "コミュニティ"],
    relatedSlugs: ["push-notifications", "coupons"],
  },
  {
    slug: "sns-links",
    name: "SNSリンク",
    category: "broadcast",
    billing: "free-add",
    icon: "broadcast",
    summary: "公式SNSへの導線をアプリ内に集約。ユーザーがフォローしやすい一元管理を実現します。",
    keyCapabilities: [
      "各種SNSへのリンクをまとめて配置",
      "アイコン・順序のカスタマイズ",
      "アプリ・WebViewからの遷移制御",
    ],
    screens: ["SNSリンク設定"],
    audiences: ["クリエイター", "店舗", "ブランド"],
    relatedSlugs: ["webview", "cms-static"],
  },

  /* ===== 会員管理 ===== */
  {
    slug: "members",
    name: "会員管理",
    category: "members",
    billing: "default",
    icon: "members",
    summary: "会員の登録・ログイン・規約・ログイン後コンテンツまで、アプリ会員基盤を一元管理します。",
    keyCapabilities: [
      "会員一覧 / 新規 / 編集",
      "登録フローのカスタマイズ",
      "ログイン後表示コンテンツ設定",
      "利用規約・プライバシーポリシーの管理",
    ],
    screens: ["会員一覧", "会員登録設定", "ログインコンテンツ設定", "利用規約設定", "プライバシー設定"],
    audiences: ["全業種"],
    relatedSlugs: ["member-ranks-iap", "chat", "push-notifications"],
  },
  {
    slug: "member-ranks-iap",
    name: "アプリ内課金・会員ランク",
    category: "members",
    billing: "paid",
    icon: "members",
    summary: "App Store / Google Play の課金を活用し、会員ランクごとに機能アクセスをコントロール。",
    keyCapabilities: [
      "会員ランクの定義",
      "機能ごとのアクセス制御",
      "iOS / Android のIAPと連携",
      "サブスクリプション運用",
    ],
    screens: ["会員ランク設定", "機能アクセス制御"],
    relatedSettings: ["有償 初期¥3,000 / 月¥980"],
    audiences: ["コミュニティ", "教育", "クリエイター"],
    relatedSlugs: ["members", "ecommerce"],
  },

  /* ===== コミュニケーション ===== */
  {
    slug: "chat",
    name: "チャット",
    category: "comm",
    billing: "paid",
    icon: "comm",
    summary: "ユーザーとのリアルタイムチャット。通報モデレーション、設定もすべて管理画面から。",
    keyCapabilities: [
      "1対1リアルタイムチャット",
      "通報受付とモデレーション",
      "チャット設定 / 利用ルール",
      "チャットユーザーの管理",
    ],
    screens: ["チャット一覧", "通報一覧", "チャット設定"],
    relatedSettings: ["有償 月¥1,480"],
    audiences: ["コミュニティ", "クリエイター", "店舗"],
    relatedSlugs: ["members", "inquiry-forms", "coupons"],
  },
  {
    slug: "inquiry-forms",
    name: "問い合わせフォーム",
    category: "comm",
    billing: "paid",
    icon: "comm",
    summary: "カスタマイズ可能な問い合わせフォームと管理者通知をワンセットで提供します。",
    keyCapabilities: [
      "フォームの項目カスタマイズ",
      "問い合わせ内容の一覧管理",
      "管理者向け通知メール設定",
    ],
    screens: ["問い合わせ内容一覧", "フォーム設定", "通知設定"],
    audiences: ["全業種"],
    relatedSlugs: ["surveys", "chat"],
  },
  {
    slug: "surveys",
    name: "アンケート",
    category: "comm",
    billing: "paid",
    icon: "comm",
    summary: "アンケート作成、回答収集、集計、通知連携までを一気通貫で。",
    keyCapabilities: [
      "アンケートの作成・配信",
      "回答の収集と集計表示",
      "アンケート完了通知メール",
    ],
    screens: ["アンケート一覧", "回答・集計", "アンケート設定"],
    audiences: ["店舗", "教育", "医療"],
    relatedSlugs: ["coupons", "analytics", "inquiry-forms"],
  },
  {
    slug: "coupons",
    name: "クーポン",
    category: "comm",
    billing: "paid",
    icon: "comm",
    summary: "クーポンの発行・配布・利用管理で、来店促進やリピートをサポートします。",
    keyCapabilities: [
      "クーポンの発行・配布",
      "利用状況のトラッキング",
      "プッシュ・チャット連携での配布",
    ],
    screens: ["クーポン一覧", "クーポン設定"],
    audiences: ["店舗", "EC", "サービス業"],
    relatedSlugs: ["push-notifications", "stamps", "ecommerce"],
  },

  /* ===== コンテンツ ===== */
  {
    slug: "cms-posts",
    name: "投稿コンテンツ",
    category: "content",
    billing: "default",
    icon: "content",
    summary: "記事・お知らせなどの投稿型コンテンツを、カテゴリ管理・AI制作と組み合わせて運用。",
    keyCapabilities: [
      "記事の追加 / 編集 / 公開設定",
      "カテゴリ・タグでの整理",
      "デフォルト画像 / OGPの設定",
      "AI制作との連携",
    ],
    screens: ["コンテンツ一覧", "カテゴリ管理", "デフォルト画像設定"],
    audiences: ["店舗", "メディア", "教育"],
    relatedSlugs: ["cms-static", "push-notifications", "ai-builder"],
  },
  {
    slug: "cms-static",
    name: "固定コンテンツ",
    category: "content",
    billing: "default",
    icon: "content",
    summary: "店舗情報・サービス案内など、変更頻度の少ないページ群を導線エディタと組み合わせて構築。",
    keyCapabilities: [
      "固定ページの追加・編集",
      "カテゴリ管理",
      "導線エディタからの呼び出し",
    ],
    screens: ["コンテンツ一覧", "カテゴリ管理", "導線エディタ"],
    audiences: ["店舗", "サービス業", "BtoB"],
    relatedSlugs: ["flow-editor", "cms-posts", "webview"],
  },
  {
    slug: "gallery-catalog",
    name: "カタログギャラリー",
    category: "content",
    billing: "free-add",
    icon: "content",
    summary: "商品やサービスをカタログ形式で見せるギャラリーモジュール。",
    keyCapabilities: [
      "カタログ画像の追加・並び替え",
      "詳細リンクの設定",
      "アプリ内表示のカスタマイズ",
    ],
    screens: ["カタログギャラリー"],
    audiences: ["店舗", "EC"],
    relatedSlugs: ["gallery-photo", "gallery-movie", "ecommerce"],
  },
  {
    slug: "gallery-photo",
    name: "フォトギャラリー",
    category: "content",
    billing: "free-add",
    icon: "content",
    summary: "写真をアルバム形式でアプリに掲載。イベントレポートや作品集として活用できます。",
    keyCapabilities: [
      "アルバム作成と画像アップロード",
      "順序のカスタマイズ",
      "アプリ内ビューワー対応",
    ],
    screens: ["フォトギャラリー"],
    audiences: ["クリエイター", "店舗", "イベント運営"],
    relatedSlugs: ["gallery-catalog", "gallery-movie"],
  },
  {
    slug: "gallery-movie",
    name: "ムービーギャラリー",
    category: "content",
    billing: "free-add",
    icon: "content",
    summary: "動画コンテンツのアプリ配信。チュートリアル、店舗紹介、作品集まで幅広く活用。",
    keyCapabilities: [
      "動画のアップロード / 外部URL指定",
      "アルバム形式の整理",
      "サムネイルカスタマイズ",
    ],
    screens: ["ムービーギャラリー"],
    audiences: ["クリエイター", "教育", "店舗"],
    relatedSlugs: ["gallery-photo", "cms-posts"],
  },
  {
    slug: "files",
    name: "ファイル",
    category: "content",
    billing: "default",
    icon: "content",
    summary: "PDFや資料、契約書などをアプリで配布。会員限定配信にも対応します。",
    keyCapabilities: [
      "ファイルのアップロード",
      "公開範囲の設定",
      "ダウンロード履歴",
    ],
    screens: ["ファイル管理"],
    audiences: ["医療・団体", "BtoB", "教育"],
    relatedSlugs: ["members", "cms-posts"],
  },
  {
    slug: "qa",
    name: "Q&A",
    category: "content",
    billing: "paid",
    icon: "content",
    summary: "FAQ・よくある質問を、カテゴリ別に整理してアプリ内表示。問い合わせ削減に貢献。",
    keyCapabilities: [
      "Q&Aの追加・編集",
      "カテゴリ管理",
      "アプリ内検索対応",
    ],
    screens: ["Q&A一覧", "カテゴリ管理"],
    audiences: ["全業種"],
    relatedSlugs: ["inquiry-forms", "cms-static"],
  },
  {
    slug: "webview",
    name: "Webビュー",
    category: "content",
    billing: "default",
    icon: "content",
    summary: "外部Webサイト・LP・ECページなどを、アプリ内のWebViewで表示できます。",
    keyCapabilities: [
      "外部URLの設定",
      "ヘッダー・タイトルのカスタマイズ",
      "認証情報の引き渡し（実装による）",
    ],
    screens: ["Webビュー設定"],
    audiences: ["EC", "BtoB", "メディア"],
    relatedSlugs: ["cms-static", "sns-links"],
  },
  {
    slug: "map-content",
    name: "マップコンテンツ",
    category: "content",
    billing: "paid",
    icon: "content",
    summary: "地図上に拠点・スポット・ユーザー投稿を配置できるGPS連動コンテンツ。",
    keyCapabilities: [
      "地点・タグの登録と編集",
      "ユーザー投稿スポットの管理",
      "マップ表示設定 / 削除依頼対応",
    ],
    screens: ["地点一覧", "マップタグ", "マップ設定", "削除依頼"],
    relatedSettings: ["GPS（有償）"],
    audiences: ["観光", "店舗", "コミュニティ"],
    relatedSlugs: ["cms-static", "members"],
  },

  /* ===== 業務支援 ===== */
  {
    slug: "dashboard-top",
    name: "ダッシュボード",
    category: "ops",
    billing: "default",
    icon: "ops",
    summary: "運用ウィジェットを集約した管理ホーム。各機能へワンクリックでアクセスできます。",
    keyCapabilities: [
      "ウィジェットによる運用指標の可視化",
      "各機能へのショートカット",
      "カスタマイズ可能な配置",
    ],
    screens: ["トップ"],
    audiences: ["全業種"],
    relatedSlugs: ["analytics", "feature-flags"],
  },
  {
    slug: "stamps",
    name: "スタンプ",
    category: "ops",
    billing: "paid",
    icon: "ops",
    summary: "スタンプカードと特典で、来店・リピート・購買を後押し。手動付与にも対応。",
    keyCapabilities: [
      "スタンプカード設計",
      "特典の発行 / 利用管理",
      "手動付与・QR/CSV取込",
      "スタンプ分析との連動",
    ],
    screens: ["スタンプカード一覧", "特典", "手動付与"],
    audiences: ["店舗", "サービス業"],
    relatedSlugs: ["coupons", "analytics", "members"],
  },
  {
    slug: "reservations",
    name: "予約",
    category: "ops",
    billing: "paid",
    icon: "ops",
    summary: "シンプル予約とフル予約の2モード。メニュー・グループ・予約枠まできめ細かく設計可能。",
    keyCapabilities: [
      "予約メニュー / グループ / 枠の設定",
      "予約一覧・キャンセル管理",
      "シンプル予約モード",
      "臨時営業・休業設定",
    ],
    screens: ["予約メニュー", "枠管理", "予約一覧", "シンプル予約", "設定"],
    audiences: ["店舗", "サロン", "クリニック", "教育"],
    relatedSlugs: ["push-notifications", "stamps", "members"],
  },
  {
    slug: "ecommerce",
    name: "EC",
    category: "ops",
    billing: "paid",
    icon: "ops",
    summary: "アプリ内EC機能。Stripe決済、ポイント、ギフト、レビュー、在庫アラートまで完備。",
    keyCapabilities: [
      "商品 / カテゴリ / 注文管理",
      "Stripe Connect連携",
      "ポイント / ギフト / クーポン",
      "在庫アラート / 売上レポート",
    ],
    screens: ["商品", "注文", "顧客", "レビュー", "ポイント", "Stripe連携", "売上レポート"],
    relatedSettings: ["有償アドオン 月¥1,980 / 初期費用0円"],
    audiences: ["EC", "店舗", "コミュニティ"],
    relatedSlugs: ["coupons", "stamps", "analytics"],
  },
  {
    slug: "analytics",
    name: "分析",
    category: "ops",
    billing: "default",
    icon: "ops",
    summary: "登録・利用・DL・スタンプ・GA4連携まで、運用データを多角的に可視化します。",
    keyCapabilities: [
      "サマリー / DAU・MAU",
      "新規登録・利用停止トラッキング",
      "ダウンロード分析",
      "スタンプ分析 / GA4連携",
    ],
    screens: ["サマリー", "アクティブユーザー", "新規登録", "ダウンロード", "スタンプ分析", "GA設定"],
    audiences: ["全業種"],
    relatedSlugs: ["ga-analytics", "stamps", "members"],
  },

  /* ===== 拡張・連携 ===== */
  {
    slug: "ai-image",
    name: "AI画像制作",
    category: "ext",
    billing: "free-add",
    icon: "ext",
    summary: "AIによる画像生成。AIプラン枠で利用量を管理し、運用に必要な画像を素早く準備できます。",
    keyCapabilities: [
      "AIによる画像生成",
      "AIプラン枠での利用管理",
      "投稿コンテンツ・固定ページとの連携",
    ],
    screens: ["AI画像制作"],
    audiences: ["全業種"],
    relatedSlugs: ["ai-builder", "cms-posts"],
  },
  {
    slug: "ai-builder",
    name: "AI制作",
    category: "ext",
    billing: "free-add",
    icon: "ext",
    summary: "アプリ導線・記事のAI自動生成。導線エディタや投稿一覧に統合され、運用効率を高めます。",
    keyCapabilities: [
      "導線エディタからのAI生成",
      "投稿コンテンツのAI下書き",
      "AIプラン枠の利用管理",
    ],
    screens: ["導線エディタ", "投稿コンテンツ"],
    audiences: ["全業種"],
    relatedSlugs: ["flow-editor", "cms-posts", "ai-image"],
  },
  {
    slug: "admob",
    name: "広告（AdMob）",
    category: "ext",
    billing: "free-add",
    icon: "ext",
    summary: "Google AdMobを活用したバナー・インタースティシャル・リワード広告で収益化。",
    keyCapabilities: [
      "AdMobとの接続設定",
      "バナー / インタースティシャル / リワード",
      "アプリ別広告ユニット管理",
    ],
    screens: ["広告設定（運用 / 構築）"],
    audiences: ["メディア", "コミュニティ", "コンテンツ提供者"],
    relatedSlugs: ["analytics", "ga-analytics"],
  },
  {
    slug: "ga-analytics",
    name: "Google Analytics",
    category: "ext",
    billing: "free-add",
    icon: "ext",
    summary: "GA4 連携でアプリの詳細分析を実施。標準分析と組み合わせて多角的に運用判断。",
    keyCapabilities: [
      "GA4プロパティの接続",
      "イベント設定",
      "クライアント別分析",
    ],
    screens: ["GA設定", "クライアント別分析"],
    audiences: ["メディア", "EC", "BtoB"],
    relatedSlugs: ["analytics", "admob"],
  },

  /* ===== 構築 ===== */
  {
    slug: "flow-editor",
    name: "導線エディタ",
    category: "build",
    billing: "default",
    icon: "build",
    summary: "アプリ内ナビ・画面遷移をビジュアルに設計。AI制作も統合され、ノーコードでUXを構築できます。",
    keyCapabilities: [
      "フローノードによる導線設計",
      "メニュー・コンテンツノードの編集",
      "AI制作パネルからの自動生成",
    ],
    screens: ["導線エディタ"],
    audiences: ["全業種"],
    relatedSlugs: ["mobile-ui", "ai-builder", "cms-static"],
  },
  {
    slug: "mobile-ui",
    name: "モバイルUI設定",
    category: "build",
    billing: "default",
    icon: "build",
    summary: "ホーム・メニュー・ブランドコンポーネントなど、アプリの見た目を一括コントロール。",
    keyCapabilities: [
      "トップコンテンツ / メニュー設定",
      "アプリ基本設定（カラー、ロゴ）",
      "ブランドコンポーネントの一括更新（PRO）",
    ],
    screens: ["トップコンテンツ", "メニュー設定", "アプリ基本設定", "ブランドコンポーネント"],
    audiences: ["全業種"],
    relatedSlugs: ["flow-editor", "feature-flags"],
  },
  {
    slug: "app-deployment",
    name: "アプリ公開",
    category: "build",
    billing: "default",
    icon: "build",
    summary: "ストア向けビルドを管理画面から実行。ビルド設定とリリースを統合管理できます。",
    keyCapabilities: [
      "ビルド実行（iOS / Android / Web）",
      "ビルド設定の管理",
      "リリースワークフロー",
    ],
    screens: ["ビルド実行", "ビルド設定"],
    audiences: ["全業種"],
    relatedSlugs: ["mobile-ui", "feature-flags"],
  },
  {
    slug: "feature-flags",
    name: "機能設定",
    category: "build",
    billing: "default",
    icon: "build",
    summary: "利用する機能モジュールをON/OFF。マーケットプレイスの課金と連動した有償機能管理。",
    keyCapabilities: [
      "機能モジュールのON/OFF",
      "有償オプションの追加・解除",
      "アプリごとの機能セット管理",
    ],
    screens: ["機能設定"],
    audiences: ["全業種"],
    relatedSlugs: ["app-deployment", "mobile-ui"],
  },
];

export function getFeature(slug: string): Feature | null {
  return FEATURES.find((f) => f.slug === slug) ?? null;
}

export function getFeaturesByCategory(category: FeatureCategoryId): Feature[] {
  return FEATURES.filter((f) => f.category === category);
}

export function getRelatedFeatures(slug: string): Feature[] {
  const f = getFeature(slug);
  if (!f) return [];
  if (f.relatedSlugs?.length) {
    return f.relatedSlugs
      .map((s) => getFeature(s))
      .filter((x): x is Feature => x !== null);
  }
  return getFeaturesByCategory(f.category)
    .filter((x) => x.slug !== slug)
    .slice(0, 3);
}

export function getCategoryLabel(id: FeatureCategoryId): string {
  return FEATURE_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
