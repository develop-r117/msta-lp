"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

type PaidAddon = {
  name: string;
  price: string;
  description: string;
  note?: string;
};

// 料金は dashboard リポジトリの src/config/featureMarketplace.ts を正とする（税抜・月額）
const paidAddons: PaidAddon[] = [
  {
    name: "決済",
    price: "680",
    description: "決済基盤の有効化・特商法対応",
    note: "決済手数料 2% / 出金手数料 3.6%",
  },
  {
    name: "メール配信",
    price: "980",
    description: "メールキャンペーンの作成・配信",
  },
  {
    name: "問い合わせフォーム",
    price: "980",
    description: "問い合わせフォームの管理",
  },
  { name: "アンケート", price: "980", description: "アンケートの作成・集計" },
  { name: "スタンプ", price: "980", description: "スタンプカード機能" },
  { name: "クーポン", price: "980", description: "クーポンの発行・管理" },
  { name: "Q&A", price: "980", description: "よくある質問の管理" },
  {
    name: "マップコンテンツ",
    price: "980",
    description: "位置情報コンテンツの管理",
  },
  {
    name: "アプリ内課金・会員ランク",
    price: "980",
    description: "アプリ内課金（IAP）と会員ランク別アクセス制御",
  },
  {
    name: "チャット",
    price: "1,480",
    description: "ユーザーとのリアルタイムチャット",
  },
  {
    name: "EC",
    price: "1,980",
    description: "ECサイト・商品管理",
    note: "決済手数料 2% / 出金手数料 3.6%",
  },
  {
    name: "予約",
    price: "1,980",
    description:
      "定期・イベント予約／スタッフ管理／Googleカレンダー連携／事前決済",
    note: "予約手数料 2% / 出金手数料 3.6%",
  },
];

const freeAddons = [
  "カタログギャラリー",
  "フォトギャラリー",
  "ムービーギャラリー",
  "SNSリンク",
  "AI制作",
  "AI画像制作",
  "Google Analytics",
  "広告（AdMob）",
  "かんたん予約",
];

export default function AddonPricing() {
  return (
    <section id="addons" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Add-ons"
          title={
            <>
              必要な機能だけ、
              <br className="hidden md:block" />
              <span className="text-gradient">アドオン</span>で追加。
            </>
          }
          description="初期搭載の機能に加えて、用途に応じた機能を月額で追加できます。すべて初期費用0円。各アドオンは初回1回限り3日間無料でお試しいただけます。"
        />

        {/* Paid add-ons */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-4">
            <span className="text-sm font-semibold text-neutral-800">
              有償アドオン
            </span>
            <span className="text-xs font-medium text-neutral-500">
              月額（税抜） / 初期費用 0円
            </span>
          </div>
          <ul className="divide-y divide-neutral-100">
            {paidAddons.map((addon, i) => (
              <motion.li
                key={addon.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.2) }}
                className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-neutral-900">
                    {addon.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                    {addon.description}
                  </p>
                  {addon.note ? (
                    <p className="mt-1 inline-block rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-100">
                      {addon.note}
                    </p>
                  ) : null}
                </div>
                <p className="flex shrink-0 items-baseline gap-1 sm:justify-end">
                  <span className="text-2xl font-black text-neutral-900">
                    ¥{addon.price}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    円 / 月
                  </span>
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Free add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
              無料アドオン
            </span>
            <span className="text-xs text-neutral-500">
              追加料金なしで有効化できます
            </span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {freeAddons.map((name) => (
              <li
                key={name}
                className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700"
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="mt-6 text-center text-xs leading-relaxed text-neutral-500">
          表示価格はすべて税抜です。年払いをご利用の場合、アドオンを含む各種料金が20%OFFになります。
          <br className="hidden sm:block" />
          初期搭載の機能（トップ・プッシュ通知・会員・ファイル・投稿/固定コンテンツ・ポップアップ・Webビュー・分析・モバイルUI設定）は基本利用料に含まれます。
        </p>
      </div>
    </section>
  );
}
