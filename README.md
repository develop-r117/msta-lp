# エムスタ ランディングページ

店舗・コミュニティ向けアプリ作成SaaS「エムスタ」のランディングページです。

## 🚀 特徴

- **モダンなデザイン** - エメラルドグリーンとコーラルを基調とした独創的な配色
- **豊富なアニメーション** - Framer Motionを使用したスクロールアニメーション、ホバーエフェクト
- **レスポンシブ対応** - モバイル、タブレット、デスクトップに完全対応
- **パフォーマンス最適化** - Next.js 15のApp Routerによる高速レンダリング

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIライブラリ**: React 19
- **アニメーション**: Framer Motion

## 📁 プロジェクト構造

```
src/
├── app/
│   ├── globals.css      # グローバルスタイル・カスタムテーマ
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # メインページ
└── components/
    ├── Header.tsx       # 固定ヘッダー（ナビゲーション）
    ├── Hero.tsx         # ヒーローセクション
    ├── Benefits.tsx     # 主要3つのベネフィット
    ├── Problems.tsx     # 解決できる課題
    ├── Features.tsx     # 機能紹介（21機能を7グループに分類）
    ├── Cases.tsx        # 導入事例・お客様の声
    ├── Pricing.tsx      # 料金プラン
    ├── FAQ.tsx          # よくある質問
    ├── Contact.tsx      # お問い合わせフォーム
    ├── Footer.tsx       # フッター
    ├── FloatingCTA.tsx  # モバイル用フローティングCTA
    ├── ScrollReveal.tsx # スクロールアニメーションユーティリティ
    └── ParticleBackground.tsx # パーティクル背景エフェクト
```

## 🎨 デザイン特徴

### カラーパレット

- **プライマリ**: エメラルドグリーン系（oklch color space使用）
- **アクセント**: コーラルピンク系
- **ニュートラル**: 温かみのあるグレー

### フォント

- **日本語**: Zen Kaku Gothic New
- **英数字**: Outfit

### アニメーション

- メッシュグラデーション背景
- グラスモーフィズム効果
- スクロール連動フェードイン
- ホバー時のスケール・シャドウ変化
- フローティング要素アニメーション

## 🚀 開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プロダクション起動
npm start
```

## 📱 セクション構成

1. **ヘッダー** - 固定ナビゲーション、CTAボタン
2. **ヒーローセクション** - キャッチコピー、アプリモックアップ、統計情報
3. **主要3つのベネフィット** - コスト削減、簡単操作、スピード感
4. **解決できる課題** - 5つの課題と解決策
5. **機能紹介** - 21機能を7グループに分類、タブ切り替え
6. **導入事例** - 3業種の成功事例、統計情報
7. **料金プラン** - 3プラン（スタンダード、プロ、エンタープライズ）
8. **よくある質問** - 10項目のFAQ
9. **お問い合わせフォーム** - 7項目のフォーム
10. **フッター** - リンク、SNS、CTA

## ☁️ Cloudflare Pages デプロイ

このプロジェクトはCloudflare Pagesにデプロイできます。

### デプロイ手順

1. **GitHubリポジトリを接続**
   - Cloudflare Pagesのダッシュボードで新しいプロジェクトを作成
   - GitHubリポジトリ `develop-r117/msta-lp` を接続

2. **ビルド設定**
   - **フレームワークプリセット**: Next.js
   - **ビルドコマンド**: `npx @cloudflare/next-on-pages@1`
   - **ビルド出力ディレクトリ**: `.vercel/output/static` (自動設定)

3. **Node.js互換性フラグの設定（重要）**
   
   Cloudflare Pagesダッシュボードで以下の設定を行ってください：
   
   - プロジェクトの **Settings** → **Functions** → **Compatibility Flags** に移動
   - **Compatibility Flags** セクションで以下を追加：
     - `nodejs_compat`
   - **Production** と **Preview** の両方の環境に適用

   または、`wrangler.toml` ファイル（プロジェクトルートに含まれています）が自動的に読み込まれます。

### トラブルシューティング

**Node.js互換性エラーが発生する場合:**
- Cloudflare Pagesダッシュボードで Compatibility Flags を確認
- `nodejs_compat` フラグが Production と Preview の両方で有効になっているか確認
- 再デプロイを実行

## 📄 ライセンス

Private
