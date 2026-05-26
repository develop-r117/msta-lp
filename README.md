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
/cases                       導入事例 (Keystatic)
/cases/[slug]                事例詳細 (Keystatic)
/usecases                    業種別ユースケース (Keystatic)
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
/help                        ヘルプセンター (Zendesk風 / Keystatic)
  /help/[category]           ヘルプカテゴリ
  /help/articles/[slug]      ヘルプ記事
/keystatic                   CMS 管理画面 (Keystatic Admin UI)
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
- **CMS**: [Keystatic](https://keystatic.com/) (Git-based / 完全無料 / MIT) — 事例・ユースケース・ヘルプ・FAQ をリポジトリ内 `content/` で管理

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
| `KEYSTATIC_GITHUB_CLIENT_ID` | (本番のみ) Keystatic GitHub OAuth App の Client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | (本番のみ) Keystatic GitHub OAuth App の Client Secret |
| `KEYSTATIC_SECRET` | (本番のみ) セッション暗号化用ランダム文字列 (32桁以上推奨) |
| `KEYSTATIC_GITHUB_REPO_OWNER` | (本番のみ) リポジトリ所有者 (例: `develop-r117`) |
| `KEYSTATIC_GITHUB_REPO_NAME` | (本番のみ) リポジトリ名 (例: `msta-lp`) |

## CMS (Keystatic)

リポジトリの `content/` 配下に Markdoc / JSON で全コンテンツを保存し、`@keystatic/core/reader` を `src/lib/content.ts` で経由して読み込みます。

| コレクション | パス | フォーマット | 公開URL |
| --- | --- | --- | --- |
| 導入事例 | `content/cases/*` | `body` を Markdoc、他は frontmatter | `/cases/[slug]` |
| 業種別ユースケース | `content/usecases/*` | `body` を Markdoc、他は frontmatter | `/usecases/[industry]` |
| ヘルプカテゴリ | `content/help-categories/*.json` | JSON | `/help/[category]` |
| ヘルプ記事 | `content/help-articles/*` | `body` を Markdoc、他は frontmatter | `/help/articles/[slug]` |
| よくある質問 (singleton) | `content/faq.json` | JSON | `/faq` |

詳細スキーマは [`keystatic.config.ts`](keystatic.config.ts) を参照。

### ローカル開発で CMS を使う (認証不要)

```bash
npm run dev
# → http://localhost:3000/keystatic
```

`storage: { kind: "local" }` で動作し、編集はそのまま `content/` 配下のファイル + `public/screenshots/` の画像に保存されます。保存後は通常の git ワークフロー (commit & push) で反映してください。

### 本番 (Cloudflare Pages / staging) で CMS を使う (GitHub OAuth)

`NODE_ENV !== "development"` かつ `KEYSTATIC_GITHUB_CLIENT_ID` と `KEYSTATIC_SECRET` がセットされている場合のみ、`storage: { kind: "github" }` に自動切替され、編集内容は GitHub へ自動コミット (=ブランチ更新 + PR) されます。

セットアップ手順:

1. **GitHub OAuth App を作成** (Settings → Developer settings → OAuth Apps → New)
   - Homepage URL: `https://<本番ドメイン>`
   - Authorization callback URL: `https://<本番ドメイン>/api/keystatic/github/oauth/callback`
   - 発行された `Client ID` と `Client Secret` を控える
2. **Cloudflare Pages の環境変数** (Settings → Environment variables) に以下を Production + Preview の両方に追加:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID     = <Client ID>
   KEYSTATIC_GITHUB_CLIENT_SECRET = <Client Secret>
   KEYSTATIC_SECRET               = $(openssl rand -hex 32)
   KEYSTATIC_GITHUB_REPO_OWNER    = develop-r117
   KEYSTATIC_GITHUB_REPO_NAME     = msta-lp
   ```
3. **デプロイ後** `https://<本番ドメイン>/keystatic` を開き、`Sign in with GitHub` から認証
4. 初回アクセス時、Keystatic GitHub App のリポジトリ連携を求められたら許可

> staging ブランチで運用する場合、Cloudflare Pages の **Preview deployments** が staging ブランチをビルドし、`https://staging.<プロジェクト名>.pages.dev` のような Preview URL が発行されます。OAuth App の Authorization callback URL もこの Preview URL に合わせてください。

## Cloudflare Pages デプロイ

- **ビルドコマンド**: `npx @cloudflare/next-on-pages@1`
- **ビルド出力ディレクトリ**: `.vercel/output/static`
- **Compatibility Flags**: `nodejs_compat` を Production / Preview の両方に追加
- 環境変数: Resend / Keystatic / その他の `NEXT_PUBLIC_*` を Production + Preview に設定
- **Production ブランチ**: `main`
- **Preview ブランチ**: `staging` 等を含めることで staging プレビュー環境が自動生成される

## ライセンス

Private
