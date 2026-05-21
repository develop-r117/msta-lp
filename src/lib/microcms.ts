import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

/**
 * microCMSクライアント。
 * 環境変数未設定時は null を返し、ページ側でフォールバック表示できるようにする。
 */
let cached: ReturnType<typeof createClient> | null = null;

export function getMicroCMS() {
  if (cached) return cached;
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) return null;
  cached = createClient({ serviceDomain, apiKey });
  return cached;
}

/* ===== Cases ===== */

export type CaseImage = {
  url: string;
  width?: number;
  height?: number;
};

export type CaseEntry = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  cover?: CaseImage;
  activeFeatures: string[];
  result: string;
  customerVoice?: string;
  body?: string; // HTML / Rich text
  publishedAt?: string;
  updatedAt?: string;
};

/**
 * フォールバック用の静的事例。microCMSが未設定 or 取得失敗時に使う。
 * PDF 18章記載の初期掲載候補 7事例。
 */
export const FALLBACK_CASES: CaseEntry[] = [
  {
    id: "tottori",
    slug: "tottori-dental",
    title: "鳥取県歯科医師会様 / App歯っ鳥くん",
    category: "医療・団体",
    summary: "県内の歯科医師会会員と地域住民への情報インフラとして導入。",
    cover: { url: "/screenshots/3.png" },
    activeFeatures: ["会員管理", "プッシュ通知", "ファイル共有"],
    result: "情報共有のスピードと到達率が大幅向上",
    customerVoice: "印刷物中心の連絡を、アプリに集約できた。",
  },
  {
    id: "puncho",
    slug: "puncho",
    title: "パンチョ診断コンテンツ",
    category: "店舗・施設",
    summary: "スパゲッティ・パンチョのファン向けに診断型のキャンペーンアプリを展開。",
    cover: { url: "/screenshots/4.png" },
    activeFeatures: ["ポップアップ", "アンケート", "クーポン"],
    result: "来店動機の創出と、ファン層の見える化を実現",
    customerVoice: "短期間で診断アプリを実装でき、季節キャンペーンに合わせて回せる。",
  },
  {
    id: "tt",
    slug: "tenten-chinese",
    title: "天天中文",
    category: "教育・スクール",
    summary: "中国語学習者向けの会員アプリとしてエムスタを採用。",
    cover: { url: "/screenshots/5.png" },
    activeFeatures: ["会員管理", "コンテンツ配信", "通知"],
    result: "学習継続率を底上げ",
    customerVoice: "学習コンテンツの配信と進捗管理が一つの場所で完結。",
  },
  {
    id: "trasupo",
    slug: "trasupo-map",
    title: "トラスポMAP",
    category: "業務支援",
    summary: "現場向けマップ・情報共有アプリとして活用。",
    cover: { url: "/screenshots/6.png" },
    activeFeatures: ["マップ", "投稿", "通知"],
    result: "現場の情報共有スピードを改善",
    customerVoice: "現場担当者でも管理画面から直接更新できる。",
  },
  {
    id: "tsuya",
    slug: "tsuya-factory",
    title: "艶女ファクトリー / 体質診断",
    category: "クリエイター・コミュニティ",
    summary: "ファン向けの体質診断アプリ。診断結果を入り口にコミュニティへ誘導。",
    cover: { url: "/screenshots/7.png" },
    activeFeatures: ["診断", "アンケート", "会員管理"],
    result: "コアファンとの接点を獲得",
    customerVoice: "診断のロジック更新も自分たちで運用できる。",
  },
  {
    id: "fb",
    slug: "fb-scout",
    title: "FBスカウト公式アプリ",
    category: "エムスタFull",
    summary: "スカウト案件・情報を一元管理する大型独自アプリを、エムスタFullで構築・運用。",
    cover: { url: "/screenshots/8.png" },
    activeFeatures: ["会員管理", "通知", "コンテンツ", "独自要件開発"],
    result: "案件流通の透明性を向上 / 独自要件をフルマネージドで実装",
    customerVoice: "オペレーション全体をアプリに寄せられた。エムスタFullで独自仕様も問題なく構築できた。",
  },
  {
    id: "msta-full-saas",
    slug: "msta-full-bizsaas",
    title: "BtoB業務支援アプリ / エムスタFull導入",
    category: "エムスタFull",
    summary: "業界特化のBtoB業務支援SaaSをエムスタFullで構築。要件定義 → 設計 → 開発 → 運用までフルマネージド対応。",
    cover: { url: "/screenshots/2.png" },
    activeFeatures: ["独自要件開発", "会員管理", "ダッシュボード", "通知", "ファイル管理"],
    result: "PoC〜本番リリースまで4ヶ月で達成 / 内製化に近い継続改善体制を構築",
    customerVoice: "戦略パートナーとして並走してくれるので、要件変更にも柔軟に対応できた。",
  },
  {
    id: "tarufami",
    slug: "tarufami",
    title: "たるファミ公式アプリ",
    category: "クリエイター・コミュニティ",
    summary: "公式コミュニティアプリとして展開。会員限定の情報配信を実装。",
    cover: { url: "/screenshots/9.png" },
    activeFeatures: ["会員限定", "投稿", "通知"],
    result: "コアファンの満足度を底上げ",
    customerVoice: "ファンに直接届くチャネルが手に入った。",
  },
];

export async function fetchCases(queries?: MicroCMSQueries): Promise<CaseEntry[]> {
  const client = getMicroCMS();
  if (!client) return FALLBACK_CASES;
  try {
    const res = await client.getList<CaseEntry>({
      endpoint: "cases",
      queries: { limit: 100, ...queries },
    });
    return res.contents.length > 0 ? res.contents : FALLBACK_CASES;
  } catch (e) {
    console.warn("[microcms] fetchCases failed, falling back", e);
    return FALLBACK_CASES;
  }
}

export async function fetchCasesByCategory(
  category: string,
  queries?: MicroCMSQueries,
): Promise<CaseEntry[]> {
  const client = getMicroCMS();
  if (!client) {
    return FALLBACK_CASES.filter((c) => c.category === category);
  }
  try {
    const res = await client.getList<CaseEntry>({
      endpoint: "cases",
      queries: {
        filters: `category[equals]${category}`,
        limit: 100,
        ...queries,
      },
    });
    return res.contents.length > 0
      ? res.contents
      : FALLBACK_CASES.filter((c) => c.category === category);
  } catch (e) {
    console.warn("[microcms] fetchCasesByCategory failed, falling back", e);
    return FALLBACK_CASES.filter((c) => c.category === category);
  }
}

export async function fetchCaseBySlug(slug: string): Promise<CaseEntry | null> {
  const client = getMicroCMS();
  if (!client) {
    return FALLBACK_CASES.find((c) => c.slug === slug) ?? null;
  }
  try {
    const res = await client.getList<CaseEntry>({
      endpoint: "cases",
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    return res.contents[0] ?? FALLBACK_CASES.find((c) => c.slug === slug) ?? null;
  } catch (e) {
    console.warn("[microcms] fetchCaseBySlug failed", e);
    return FALLBACK_CASES.find((c) => c.slug === slug) ?? null;
  }
}

/* ===== Usecases ===== */

export type UsecaseEntry = {
  id: string;
  industry: string; // shop, edu, med, creator, biz
  title: string;
  description: string;
  scenarios: string[];
  activeFeatures: string[];
  cover?: CaseImage;
  body?: string;
  publishedAt?: string;
  updatedAt?: string;
};

export const FALLBACK_USECASES: UsecaseEntry[] = [
  {
    id: "shop",
    industry: "shop",
    title: "店舗・施設",
    description: "会員アプリ・予約・クーポン・来店促進など、店舗運営をまるごと支援。",
    scenarios: ["会員アプリ", "予約アプリ", "クーポン配信", "来店管理", "イベント", "コンテンツ配信"],
    activeFeatures: ["会員管理", "通知", "クーポン", "予約"],
    cover: { url: "/screenshots/4.png" },
  },
  {
    id: "edu",
    industry: "edu",
    title: "教育・スクール",
    description: "学習・お知らせ・出欠・コミュニティの中心となるアプリ。",
    scenarios: ["学習アプリ", "お知らせ配信", "資料共有", "出欠管理", "コミュニティ運営"],
    activeFeatures: ["会員管理", "コンテンツ", "通知", "ファイル管理"],
    cover: { url: "/screenshots/5.png" },
  },
  {
    id: "med",
    industry: "med",
    title: "医療・団体",
    description: "会員向けの安全な情報インフラを構築。",
    scenarios: ["会員向け情報インフラ", "災害時連絡", "アンケート", "ファイル共有", "行事予定"],
    activeFeatures: ["会員管理", "通知", "アンケート"],
    cover: { url: "/screenshots/3.png" },
  },
  {
    id: "creator",
    industry: "creator",
    title: "クリエイター・コミュニティ",
    description: "ファンとの距離を近づけ、限定情報や告知の場として活用。",
    scenarios: ["ファンコミュニティ", "コンテンツ配信", "会員限定情報", "イベント告知"],
    activeFeatures: ["会員限定", "投稿", "通知", "チャット"],
    cover: { url: "/screenshots/7.png" },
  },
  {
    id: "biz",
    industry: "biz",
    title: "企業・社内利用",
    description: "業務連絡、社内ポータル、プライベートアプリとして展開。",
    scenarios: ["社内ポータル", "ナレッジ共有", "プライベートアプリ", "業務連絡"],
    activeFeatures: ["権限管理", "ファイル管理", "通知"],
    cover: { url: "/screenshots/8.png" },
  },
];

export async function fetchUsecases(): Promise<UsecaseEntry[]> {
  const client = getMicroCMS();
  if (!client) return FALLBACK_USECASES;
  try {
    const res = await client.getList<UsecaseEntry>({
      endpoint: "usecases",
      queries: { limit: 100 },
    });
    return res.contents.length > 0 ? res.contents : FALLBACK_USECASES;
  } catch (e) {
    console.warn("[microcms] fetchUsecases failed", e);
    return FALLBACK_USECASES;
  }
}

export async function fetchUsecaseByIndustry(industry: string): Promise<UsecaseEntry | null> {
  const client = getMicroCMS();
  if (!client) {
    return FALLBACK_USECASES.find((u) => u.industry === industry) ?? null;
  }
  try {
    const res = await client.getList<UsecaseEntry>({
      endpoint: "usecases",
      queries: { filters: `industry[equals]${industry}`, limit: 1 },
    });
    return res.contents[0] ?? FALLBACK_USECASES.find((u) => u.industry === industry) ?? null;
  } catch (e) {
    console.warn("[microcms] fetchUsecaseByIndustry failed", e);
    return FALLBACK_USECASES.find((u) => u.industry === industry) ?? null;
  }
}

/* ===== Help center (Zendesk風) ===== */

export type HelpCategory = {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconKey?: string;
  order?: number;
  publishedAt?: string;
  updatedAt?: string;
};

export type HelpArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  /** microCMSではコンテンツ参照になる想定。フォールバックでは category.slug 直挿し */
  category: { slug: string; title: string } | string;
  body?: string;
  tags?: string[];
  relatedArticles?: { slug: string; title: string }[];
  publishedAt?: string;
  updatedAt?: string;
};

export const FALLBACK_HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "getting-started",
    slug: "getting-started",
    title: "はじめに",
    description: "アカウント開設、トライアル、基本的な使い方をご案内します。",
    iconKey: "rocket",
    order: 1,
  },
  {
    id: "account-billing",
    slug: "account-billing",
    title: "アカウントと料金",
    description: "プラン、有償オプション、請求、支払い方法に関するヘルプ。",
    iconKey: "billing",
    order: 2,
  },
  {
    id: "build",
    slug: "build",
    title: "アプリの作り方",
    description: "導線エディタ、モバイルUI設定、AI制作機能の使い方。",
    iconKey: "build",
    order: 3,
  },
  {
    id: "operations",
    slug: "operations",
    title: "運用と機能",
    description: "プッシュ通知・会員管理・予約・EC・分析など、各機能の運用ヘルプ。",
    iconKey: "ops",
    order: 4,
  },
  {
    id: "troubleshooting",
    slug: "troubleshooting",
    title: "トラブルシューティング",
    description: "うまく動かない / 通知が届かない などの問題解決ガイド。",
    iconKey: "warn",
    order: 5,
  },
];

export const FALLBACK_HELP_ARTICLES: HelpArticle[] = [
  /* getting-started */
  {
    id: "ga-1",
    slug: "account-signup",
    title: "アカウント登録の流れ",
    summary: "メールアドレスでサインアップしてから、はじめてのアプリを作成するまでの手順をご案内します。",
    category: { slug: "getting-started", title: "はじめに" },
    body: `<h2>1. サインアップ</h2><p>ダッシュボードからメールアドレスでサインアップします。確認メールに記載のリンクをクリックして本登録を完了してください。</p><h2>2. ワークスペースの作成</h2><p>初回ログイン後、自社・自分用のワークスペースを作成します。複数のアプリを管理する場合も、まずは1つのワークスペースから始めるのがおすすめです。</p><h2>3. はじめてのアプリ作成</h2><p>テンプレートから作るか、ゼロから導線エディタで設計するかを選べます。プロモードを使うと自由度の高い設計が可能です。</p>`,
    tags: ["登録", "オンボーディング"],
  },
  {
    id: "ga-2",
    slug: "trial-restrictions",
    title: "2週間トライアル中の制約",
    summary: "無料トライアル中に利用できる機能と、本契約後に開放される機能の違いをまとめました。",
    category: { slug: "getting-started", title: "はじめに" },
    body: `<h2>トライアルでできること</h2><p>トライアル期間中は、標準機能・有償オプションを含めほぼすべての機能を試すことができます。</p><h2>トライアル中の制限</h2><ul><li>App Store / Google Play への公開はできません。</li><li>独自ドメインの割り当ては未対応です。</li><li>商用配信の前に本契約への切り替えが必要です。</li></ul><h2>本契約への切り替え</h2><p>本契約後は、トライアルで作成したアプリ・データをそのまま引き継いで運用を継続できます。</p>`,
    tags: ["トライアル", "制限"],
  },
  {
    id: "ga-3",
    slug: "first-publish",
    title: "はじめてのアプリ公開",
    summary: "Web / iOS / Android にアプリを公開するまでの流れをまとめます。",
    category: { slug: "getting-started", title: "はじめに" },
    body: `<h2>公開前のチェック</h2><p>必須情報（アプリ名・アイコン・スプラッシュ・利用規約）が登録されているかを確認します。</p><h2>Web公開</h2><p>独自URLが必要な場合はカスタムドメインの設定を行います。基本URLでよければ即時公開可能です。</p><h2>iOS / Android公開</h2><p>App Store ConnectおよびGoogle Play Consoleの設定が必要です。詳細はストアごとの公開手順をご確認ください。</p>`,
    tags: ["公開", "ストア"],
  },

  /* account-billing */
  {
    id: "ab-1",
    slug: "billing-plans",
    title: "料金プラン早わかり",
    summary: "アカウント基本料・公開料・有償オプションを表形式で確認できます。",
    category: { slug: "account-billing", title: "アカウントと料金" },
    body: `<h2>基本料金</h2><ul><li>アカウント基本利用料: 月額¥3,000</li><li>Web公開: ¥2,000 / URL / 月</li><li>iOS / Android公開: 各 ¥5,000 / 月</li></ul><h2>有償オプション</h2><p>EC・チャット・予約・メール配信などは有償オプションです。料金ページをご確認ください。</p>`,
    tags: ["料金", "プラン"],
  },
  {
    id: "ab-2",
    slug: "payment-methods",
    title: "支払い方法と請求書",
    summary: "クレジットカード支払いと請求書払いに関するご案内。",
    category: { slug: "account-billing", title: "アカウントと料金" },
    body: `<h2>クレジットカード</h2><p>VISA / Master / JCB / AMEX / Diners をご利用いただけます。請求は毎月1日に締め、当月分のご請求が発生します。</p><h2>請求書払い</h2><p>法人のお客様には請求書払いに対応しています。お問い合わせフォームよりご連絡ください。</p>`,
    tags: ["支払い", "請求"],
  },

  /* build */
  {
    id: "bu-1",
    slug: "flow-editor-basics",
    title: "導線エディタの使い方",
    summary: "アプリ導線をビジュアルに設計する基本フローを解説します。",
    category: { slug: "build", title: "アプリの作り方" },
    body: `<h2>導線エディタとは</h2><p>アプリ内のメニュー、画面遷移、コンテンツ呼び出しをビジュアルに編集できるノーコード設計ツールです。</p><h2>基本操作</h2><p>左サイドのノードから「メニュー」「コンテンツ」「アクション」をドラッグして配置し、線で繋ぐだけで導線が完成します。</p><h2>AI制作との連携</h2><p>AI制作パネルから「こういうアプリを作りたい」と入力すると、ベースの導線が自動生成されます。</p>`,
    tags: ["導線エディタ", "AI"],
  },
  {
    id: "bu-2",
    slug: "mobile-ui-customize",
    title: "モバイルUI設定でブランディング",
    summary: "アプリのカラー・ロゴ・トップ画面・メニューを一括コントロールする方法。",
    category: { slug: "build", title: "アプリの作り方" },
    body: `<h2>アプリ基本設定</h2><p>カラーパレット、ロゴ、スプラッシュ画像を設定します。複数アプリ運用時はブランドコンポーネントの一括更新が便利です。</p><h2>トップコンテンツ</h2><p>アプリ起動時の見え方を、カードリスト・ヒーロー・カルーセルなどから選択して構成できます。</p>`,
    tags: ["モバイルUI", "ブランド"],
  },

  /* operations */
  {
    id: "op-1",
    slug: "push-notification-setup",
    title: "プッシュ通知の準備",
    summary: "iOS / Androidにプッシュ通知を送信するために必要な準備をまとめます。",
    category: { slug: "operations", title: "運用と機能" },
    body: `<h2>必要な前提</h2><ul><li>iOS: APNs証明書の登録</li><li>Android: FCMの設定</li></ul><h2>送信のテスト</h2><p>テスト用ユーザーグループを作って、必ず本番送信前にプレビュー送信してください。</p>`,
    tags: ["プッシュ", "セットアップ"],
  },
  {
    id: "op-2",
    slug: "members-rank-setup",
    title: "会員ランクとアプリ内課金の設定",
    summary: "App Store / Google PlayのIAPと連携した会員ランクの設定手順。",
    category: { slug: "operations", title: "運用と機能" },
    body: `<h2>1. ランクの定義</h2><p>無料・有料の各ランクを設定し、機能アクセス制御を割り当てます。</p><h2>2. ストア課金商品の登録</h2><p>App Store Connect / Google Play Consoleでサブスクリプション商品を登録し、IDをエムスタ管理画面に紐づけます。</p>`,
    tags: ["会員", "課金"],
  },
  {
    id: "op-3",
    slug: "analytics-quickstart",
    title: "分析ダッシュボードの読み方",
    summary: "DAU、MAU、新規登録、ダウンロードなど、運用判断に使う指標の見方。",
    category: { slug: "operations", title: "運用と機能" },
    body: `<h2>主要指標</h2><ul><li>DAU/MAU: 利用継続性の目安</li><li>新規登録: マーケ施策の効果測定</li><li>ダウンロード: アプリ獲得状況</li></ul><h2>GA4連携</h2><p>より詳細な分析はGA4連携で行います。連携設定は分析設定画面から実施できます。</p>`,
    tags: ["分析"],
  },

  /* troubleshooting */
  {
    id: "tr-1",
    slug: "push-not-arriving",
    title: "プッシュ通知が届かないとき",
    summary: "プッシュ通知が届かない原因と確認手順を解説します。",
    category: { slug: "troubleshooting", title: "トラブルシューティング" },
    body: `<h2>1. ストア証明書の有効性確認</h2><p>APNs証明書 / FCM設定が有効期限切れでないか確認してください。</p><h2>2. ユーザー側の通知許可</h2><p>iOS / Android双方で「通知」が許可されている必要があります。アプリ内案内で許可を促す設計が有効です。</p><h2>3. テスト送信</h2><p>テストグループへ送信し、配信ログで成功/失敗を確認します。</p>`,
    tags: ["プッシュ", "トラブル"],
  },
  {
    id: "tr-2",
    slug: "build-failed",
    title: "アプリビルドが失敗するとき",
    summary: "ビルドエラーの典型的な原因とチェックリスト。",
    category: { slug: "troubleshooting", title: "トラブルシューティング" },
    body: `<h2>典型的な原因</h2><ul><li>必須情報（アイコン・規約 等）の未設定</li><li>iOS App Store Connect 側のCertificate期限切れ</li><li>Android keystoreの差し替えが必要なケース</li></ul><h2>サポートへの問い合わせ</h2><p>ログを添付の上、お問い合わせフォームよりご連絡ください。</p>`,
    tags: ["ビルド", "トラブル"],
  },
];

const helpCategoryFromArticle = (a: HelpArticle): { slug: string; title: string } => {
  if (typeof a.category === "string") return { slug: a.category, title: a.category };
  return a.category;
};

export async function fetchHelpCategories(): Promise<HelpCategory[]> {
  const client = getMicroCMS();
  if (!client) return FALLBACK_HELP_CATEGORIES.slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  try {
    const res = await client.getList<HelpCategory>({
      endpoint: "helpCategories",
      queries: { limit: 100, orders: "order" },
    });
    return res.contents.length > 0
      ? res.contents
      : FALLBACK_HELP_CATEGORIES.slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  } catch (e) {
    console.warn("[microcms] fetchHelpCategories failed, falling back", e);
    return FALLBACK_HELP_CATEGORIES.slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }
}

export async function fetchHelpCategoryBySlug(slug: string): Promise<HelpCategory | null> {
  const client = getMicroCMS();
  if (!client) return FALLBACK_HELP_CATEGORIES.find((c) => c.slug === slug) ?? null;
  try {
    const res = await client.getList<HelpCategory>({
      endpoint: "helpCategories",
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    return res.contents[0] ?? FALLBACK_HELP_CATEGORIES.find((c) => c.slug === slug) ?? null;
  } catch (e) {
    console.warn("[microcms] fetchHelpCategoryBySlug failed", e);
    return FALLBACK_HELP_CATEGORIES.find((c) => c.slug === slug) ?? null;
  }
}

type HelpArticleFilter = {
  categorySlug?: string;
  q?: string;
  limit?: number;
};

export async function fetchHelpArticles(filter: HelpArticleFilter = {}): Promise<HelpArticle[]> {
  const client = getMicroCMS();
  const { categorySlug, q, limit } = filter;

  const fallback = (() => {
    let arr = FALLBACK_HELP_ARTICLES.slice();
    if (categorySlug) {
      arr = arr.filter((a) => helpCategoryFromArticle(a).slug === categorySlug);
    }
    if (q) {
      const ql = q.toLowerCase();
      arr = arr.filter(
        (a) =>
          a.title.toLowerCase().includes(ql) ||
          a.summary.toLowerCase().includes(ql) ||
          (a.tags ?? []).some((t) => t.toLowerCase().includes(ql)),
      );
    }
    return limit ? arr.slice(0, limit) : arr;
  })();

  if (!client) return fallback;
  try {
    const filters: string[] = [];
    if (categorySlug) filters.push(`category.slug[equals]${categorySlug}`);

    const res = await client.getList<HelpArticle>({
      endpoint: "helpArticles",
      queries: {
        limit: limit ?? 100,
        ...(filters.length ? { filters: filters.join("[and]") } : {}),
        ...(q ? { q } : {}),
      },
    });
    return res.contents.length > 0 ? res.contents : fallback;
  } catch (e) {
    console.warn("[microcms] fetchHelpArticles failed, falling back", e);
    return fallback;
  }
}

export async function fetchHelpArticleBySlug(slug: string): Promise<HelpArticle | null> {
  const client = getMicroCMS();
  if (!client) return FALLBACK_HELP_ARTICLES.find((a) => a.slug === slug) ?? null;
  try {
    const res = await client.getList<HelpArticle>({
      endpoint: "helpArticles",
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    return res.contents[0] ?? FALLBACK_HELP_ARTICLES.find((a) => a.slug === slug) ?? null;
  } catch (e) {
    console.warn("[microcms] fetchHelpArticleBySlug failed", e);
    return FALLBACK_HELP_ARTICLES.find((a) => a.slug === slug) ?? null;
  }
}

export function getHelpCategorySlug(article: HelpArticle): string {
  return helpCategoryFromArticle(article).slug;
}

export function getHelpCategoryTitle(article: HelpArticle): string {
  return helpCategoryFromArticle(article).title;
}
