"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CommercialTransaction() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>トップページに戻る</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">特定商取引法に基づく表記</h1>
          
          <div className="prose prose-neutral max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">サービス名</h2>
              <p className="text-neutral-600">エムスタ</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">事業者名</h2>
              <p className="text-neutral-600">株式会社R117</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">運営責任者</h2>
              <p className="text-neutral-600">早川 元暉</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">所在地</h2>
              <p className="text-neutral-600">
                〒450-0002<br />
                愛知県名古屋市中村区名駅５丁目２－１７フロンティア名駅１３階
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">問い合わせ先</h2>
              <p className="text-neutral-600 mb-2">
                ※お問い合わせは原則としてメールにて承っております。<br />
                問い合わせ電話番号については、請求後遅延なく開示いたします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">メールアドレス</h2>
              <p className="text-neutral-600">
                <a href="mailto:support@msta-app.com" className="text-primary-600 hover:text-primary-700 underline">
                  support@msta-app.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">販売価格</h2>
              <p className="text-neutral-600">
                各サービス・プランごとに表示された金額（消費税別）<br />
                ※詳細は料金表ページ及び概要資料をご参照ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">商品代金以外の必要料金</h2>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>インターネット接続に伴う通信料（お客様負担）</li>
                <li>App Store / Google Play のデベロッパー登録費用（該当する場合）</li>
                <li>オプション機能、追加開発費用（該当する場合）</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">支払方法</h2>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>初期費用（開発費用）：銀行振込（請求書払い）</li>
                <li>サービス利用料（クラウドサーバー代/CMS利用料）：クレジットカード決済<br />
                ※サブスクリプション形式（自動継続課金）</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">支払時期</h2>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>初回決済：契約成立時</li>
                <li>月額利用料：以降、毎月契約日に自動課金</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">サービス提供時期</h2>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>リプレイス支援・開発を伴う場合：別途契約内容に基づき提供</li>
                <li>エムスタ管理ダッシュボード（CMS）：決済確認後、順次利用可能</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">返品・キャンセルについて</h2>
              <p className="text-neutral-600">
                サービスの性質上、契約成立後の返金・キャンセルには原則として応じられません。<br />
                ただし、当社都合によるサービス提供不可の場合はこの限りではありません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">解約・退会について</h2>
              <p className="text-neutral-600">
                解約をご希望の場合は、次回更新日の1ヶ月前までに所定の方法にてご連絡ください。<br />
                解約後は、契約期間満了をもってサービスの提供を終了いたします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">動作環境</h2>
              <p className="text-neutral-600">
                最新の推奨ブラウザおよび、iOS / Android の対応OS環境<br />
                ※詳細は別途ご案内いたします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">特記事項</h2>
              <p className="text-neutral-600">
                本サービスはアプリ生成ツールではなく、<br />
                当社が開発を行ったアプリを対象に、運用管理・更新等を行うSaaS型サービスです。
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
