"use client";

import { motion } from "framer-motion";

type Rank = {
  name: string;
  rate: number; // 0.15 〜 0.35
  color: string;
};

const RANKS: Rank[] = [
  { name: "Bronze", rate: 0.15, color: "from-amber-700 to-amber-800" },
  { name: "Silver", rate: 0.2, color: "from-zinc-400 to-zinc-500" },
  { name: "Gold", rate: 0.25, color: "from-yellow-500 to-amber-500" },
  { name: "Platinum", rate: 0.3, color: "from-cyan-400 to-blue-500" },
  { name: "Legend", rate: 0.35, color: "from-fuchsia-500 to-violet-600" },
];

type Case = {
  id: string;
  label: string;
  description: string;
  baseFee: number; // クライアント月額（アカウント基本料 + 各公開料）
  breakdown: { item: string; amount: number }[];
};

const CASES: Case[] = [
  {
    id: "web-only",
    label: "Webアプリのみ",
    description: "アカウント基本料 ¥3,000 + Web公開 ¥2,000 / URL",
    baseFee: 5000,
    breakdown: [
      { item: "アカウント基本利用料", amount: 3000 },
      { item: "Webアプリ公開料 / URL", amount: 2000 },
    ],
  },
  {
    id: "ios-android",
    label: "iOS + Android",
    description: "アカウント基本料 ¥3,000 + iOS ¥5,000 + Android ¥5,000",
    baseFee: 13000,
    breakdown: [
      { item: "アカウント基本利用料", amount: 3000 },
      { item: "iOSアプリ公開料", amount: 5000 },
      { item: "Androidアプリ公開料", amount: 5000 },
    ],
  },
  {
    id: "all",
    label: "Web + iOS + Android",
    description: "アカウント基本料 + Web + iOS + Android",
    baseFee: 15000,
    breakdown: [
      { item: "アカウント基本利用料", amount: 3000 },
      { item: "Webアプリ公開料 / URL", amount: 2000 },
      { item: "iOSアプリ公開料", amount: 5000 },
      { item: "Androidアプリ公開料", amount: 5000 },
    ],
  },
];

const yen = (n: number) =>
  `¥${n.toLocaleString("ja-JP", { maximumFractionDigits: 0 })}`;

export default function PartnerRevenueCalculator() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
            Revenue share calculator
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
            <span className="text-gradient">月額シェア</span>を、ランク別にシミュレーション。
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
            「Webのみ」「iOS+Android」「Web+iOS+Android」の3パターン × Bronze〜Legend のランク別に、月額シェア額の試算をご覧いただけます。
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
            >
              <header className="border-b border-neutral-100 bg-gradient-to-br from-neutral-900 to-neutral-800 px-6 py-5 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Case {i + 1}
                </p>
                <h3 className="mt-1.5 text-xl font-bold">{c.label}</h3>
                <p className="mt-2 text-xs text-white/70">{c.description}</p>
                <p className="mt-4 text-3xl font-black">
                  {yen(c.baseFee)}
                  <span className="ml-1 text-xs font-semibold text-white/60">/ 月（クライアント支払い）</span>
                </p>
              </header>

              <div className="px-6 py-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                  内訳
                </p>
                <ul className="mt-2 space-y-1 text-xs text-neutral-700">
                  {c.breakdown.map((b) => (
                    <li key={b.item} className="flex justify-between">
                      <span>{b.item}</span>
                      <span className="font-semibold">{yen(b.amount)}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                  ランク別 月額シェア額（1アプリあたり）
                </p>
                <ul className="mt-2 space-y-1.5">
                  {RANKS.map((r) => (
                    <li
                      key={r.name}
                      className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2 text-xs"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-neutral-700">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br ${r.color} text-white`}
                        >
                          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </span>
                        {r.name}
                        <span className="text-[10px] font-normal text-neutral-500">
                          ({(r.rate * 100).toFixed(0)}%)
                        </span>
                      </span>
                      <span className="text-sm font-black text-neutral-900">
                        {yen(c.baseFee * r.rate)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-xl bg-primary-50 px-3 py-3 text-xs text-primary-800">
                  <p className="font-bold">10件運用時 (Goldの場合)</p>
                  <p className="mt-1">
                    月額 {yen(c.baseFee * 0.25 * 10)} / 年間 {yen(c.baseFee * 0.25 * 10 * 12)}
                  </p>
                </div>
                <div className="mt-2 rounded-xl bg-accent-50 px-3 py-3 text-xs text-accent-800">
                  <p className="font-bold">30件運用時 (Goldの場合)</p>
                  <p className="mt-1">
                    月額 {yen(c.baseFee * 0.25 * 30)} / 年間 {yen(c.baseFee * 0.25 * 30 * 12)}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500">
          ※ 還元率は公開アプリ実績・契約条件により変動します。詳細はパートナー資料をご確認ください。
          <br />
          ※ 上記は1アプリあたりのシェア額です。複数件運用時は累積で増えていきます。
        </p>
      </div>
    </section>
  );
}
