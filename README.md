# エムスタ ウェブサイト

アプリ制作・運用・改善・収益化までを一つの場所で完結させる、次世代型アプリ制作プラットフォーム「エムスタ」の公式サイト。

## サイト構成

```
/                            ホーム（ダイジェスト + 二系統CTA）
/product                     プロダクト概要 / ハブ
  /product/cms               CMS / 管理ダッシュボード
  /product/modes             かんたん / プロモード
  /product/features          全機能一覧
  /product/ai                AI / エージェント構想
  /product/team              チーム運用 / 権限ロール
/pricing                     料金
/flow                        導入までの流れ
/cases                       導入事例 (microCMS)
/cases/[slug]                事例詳細 (microCMS)
/usecases                    業種別ユースケース (microCMS)
/usecases/[industry]         業種別ユースケース詳細
/services                    サービス入口
  /services/official         オフィシャル制作
  /services/3h-pack          3hパック (ローンチ記念半額)
  /services/full             エムスタFull
/partners                    パートナープログラム
/partners/document           パートナー資料DL
/marketplace                 マーケットプレイス
/community                   UGC / 共創プラットフォーム
/faq                         よくある質問
/help                        ヘルプセンター（Zendesk風 / microCMS）
  /help/[category]           ヘルプカテゴリ
  /help/articles/[slug]      ヘルプ記事
/contact                     お問い合わせ (カテゴリ分岐ハブ)
/company / /privacy / /commercial  企業情報・法務
```

二系統の動線:

- **一般ユーザー**: トップ → プロダクト / 料金 / 事例 → 「2週間無料」
- **代理店ユーザー**: トップ → サービス / パートナー → 「パートナー資料DL」

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIライブラリ**: React 19
- **アニメーション**: Framer Motion
- **フォーム**: react-hook-form + zod
- **メール送信**: Resend (Edge Runtime)
- **CMS**: microCMS (`microcms-js-sdk`) - 事例・ユースケース管理用

## 開発

```bash
npm install
npm run dev
npm run build
npm start
```

## 環境変数

`.env.example` を参照。`/.env.local` にコピーしてご利用ください。

| 変数 | 説明 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | サイトURL (例: `https://msta.app`) |
| `NEXT_PUBLIC_SITE_ENV` | `production` で robots を全開放 |
| `NEXT_PUBLIC_SIGNUP_URL` | 「2週間無料」CTAのリンク先 |
| `NEXT_PUBLIC_SPIR_GENERAL_URL` | 一般相談用 Spir URL |
| `NEXT_PUBLIC_SPIR_OFFICIAL_URL` | オフィシャル制作相談用 Spir URL |
| `NEXT_PUBLIC_SPIR_PARTNER_URL` | パートナー相談用 Spir URL |
| `NEXT_PUBLIC_SPIR_FULL_URL` | エムスタFull相談用 Spir URL |
| `RESEND_API_KEY` | Resend APIキー (パートナー資料DL通知) |
| `RESEND_FROM` | Resend 送信元メール |
| `PARTNER_DOC_URL` | パートナー資料の公開URL |
| `NOTIFY_TO` | 内部通知先メール |
| `MICROCMS_SERVICE_DOMAIN` | microCMSのサービスドメイン |
| `MICROCMS_API_KEY` | microCMSのAPIキー |

## microCMS スキーマと初期投入手順

`microcms-js-sdk` を使い、Edge Runtime / ISR (`revalidate: 60`) で取得します。
`MICROCMS_*` 環境変数が未設定の場合は、`src/lib/microcms.ts` 内のフォールバックデータが表示されます。

### `cases` (リスト型) スキーマ

| フィールド | 種別 | 説明 |
| --- | --- | --- |
| `slug` | テキスト | URL用 (`/cases/[slug]`) |
| `title` | テキスト | 事例タイトル |
| `category` | テキスト | 例: 「医療・団体」「店舗・施設」 |
| `summary` | テキストエリア | 一覧用要約 |
| `cover` | 画像 | カバー画像 |
| `activeFeatures` | 繰り返し / テキスト | 活用機能のタグ |
| `result` | テキスト | 導入効果 |
| `customerVoice` | テキストエリア | お客様の声 |
| `body` | リッチエディタ | 本文 (HTML) |

### `usecases` (リスト型) スキーマ

| フィールド | 種別 | 説明 |
| --- | --- | --- |
| `industry` | テキスト | URL用 (`/usecases/[industry]`)。`shop` / `edu` / `med` / `creator` / `biz` 等 |
| `title` | テキスト | 業種名 |
| `description` | テキストエリア | 概要 |
| `scenarios` | 繰り返し / テキスト | 活用シナリオ |
| `activeFeatures` | 繰り返し / テキスト | 活用機能 |
| `cover` | 画像 | カバー画像 |
| `body` | リッチエディタ | 本文 (HTML) |

### `helpCategories` (リスト型) スキーマ

| フィールド | 種別 | 説明 |
| --- | --- | --- |
| `slug` | テキスト | URL用 (`/help/[category]`) |
| `title` | テキスト | カテゴリ名 |
| `description` | テキストエリア | カテゴリ概要 |
| `iconKey` | テキスト | アイコンキー (`rocket` / `billing` / `build` / `ops` / `warn` 等) |
| `order` | 数値 | 並び順 |

### `helpArticles` (リスト型) スキーマ

| フィールド | 種別 | 説明 |
| --- | --- | --- |
| `slug` | テキスト | URL用 (`/help/articles/[slug]`) |
| `title` | テキスト | 記事タイトル |
| `summary` | テキストエリア | 記事の要約 |
| `category` | コンテンツ参照 (`helpCategories`) | 紐づくカテゴリ |
| `body` | リッチエディタ (HTML) | 本文 |
| `tags` | 繰り返し / テキスト | 検索タグ |
| `relatedArticles` | 繰り返し / コンテンツ参照 (自身) | 関連記事 |

### 初期投入候補

要件定義書 18章記載の 7 事例を `cases` に、5 業種を `usecases` に、5 カテゴリ + 11 記事を `helpCategories` / `helpArticles` に初期投入します。
`src/lib/microcms.ts` の `FALLBACK_CASES` / `FALLBACK_USECASES` / `FALLBACK_HELP_CATEGORIES` / `FALLBACK_HELP_ARTICLES` がそのまま投入用テンプレとして利用可能です。

## Cloudflare Pages デプロイ

- **ビルドコマンド**: `npx @cloudflare/next-on-pages@1`
- **ビルド出力ディレクトリ**: `.vercel/output/static`
- **Compatibility Flags**: `nodejs_compat` を Production / Preview の両方に追加
- microCMS と Resend の API キーを Cloudflare Pages の環境変数に設定

## ライセンス

Private
