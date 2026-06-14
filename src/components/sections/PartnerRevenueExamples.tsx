"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const examples = [
  {
    persona: "Web制作会社 A社",
    rank: "Gold（25%還元）",
    scenario:
      "月5件のクライアント案件をエムスタで制作。アカウント基本利用料 + アプリ公開料が継続課金されるため、制作後も毎月レベニューシェアが発生。",
    numbers: [
      { label: "制作売上 / 件", value: "¥150,000" },
      { label: "継続レベニュー / 月 (5件)", value: "約 ¥18,750" },
      { label: "年間継続収益", value: "約 ¥225,000" },
    ],
    highlight: "制作単価に加えて、ストック型の継続収益が積み上がるモデル。",
    color: "from-amber-400 to-amber-600",
  },
  {
    persona: "フリーランスデザイナー Bさん",
    rank: "Silver（20%還元）",
    scenario:
      "月2件のミニアプリ制作を受注。セルフ構築＋3hパックを活用してスピード納品。テンプレートも2点販売中。",
    numbers: [
      { label: "制作売上 / 月", value: "¥100,000" },
      { label: "テンプレ販売 / 月", value: "約 ¥30,000" },
      { label: "継続レベニュー / 月", value: "約 ¥6,000" },
    ],
    highlight:
      "テンプレート販売 × 継続シェアで、固定費をカバーする副収入源に。",
    color: "from-neutral-400 to-neutral-600",
  },
  {
    persona: "アプリ開発会社 C社",
    rank: "Platinum（30%還元）",
    scenario:
      "オフィシャル制作パートナーとして月10件以上を継続納品。エムスタFullでの大型案件も対応し、既存クライアントの運用も一括管理。",
    numbers: [
      { label: "制作売上 / 月", value: "¥1,500,000+" },
      { label: "継続レベニュー / 月 (30件)", value: "約 ¥135,000" },
      { label: "年間継続収益", value: "約 ¥1,620,000" },
    ],
    highlight: "制作実績の積み上げに比例して、ストック収益が事業の安定基盤に。",
    color: "from-primary-400 to-primary-600",
  },
];

export default function PartnerRevenueExamples() {
  return (
    <section className="section-padding relative bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Revenue examples"
          title={
            <>
              パートナー
              <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                収益シミュレーション
              </span>
            </>
          }
          description="パートナーランクと案件数に応じた収益イメージ。制作費に加え、継続課金のレベニューシェアが積み上がります。"
          tone="dark"
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {examples.map((ex, i) => (
            <motion.li
              key={ex.persona}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card-on-dark relative flex flex-col overflow-hidden rounded-3xl shadow-xl"
            >
              <div className={`h-1.5 bg-gradient-to-r ${ex.color}`} />
              <div className="flex grow flex-col p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {ex.persona}
                  </span>
                  <span className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-on-dark-muted">
                    {ex.rank}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-on-dark-muted">
                  {ex.scenario}
                </p>

                <dl className="mt-5 grid gap-2">
                  {ex.numbers.map((n) => (
                    <div
                      key={n.label}
                      className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10"
                    >
                      <dt className="text-[11px] font-semibold text-on-dark-muted">
                        {n.label}
                      </dt>
                      <dd className="text-sm font-black text-accent-400">
                        {n.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 rounded-xl bg-accent-400/10 px-4 py-3 text-xs font-semibold leading-relaxed text-accent-300 ring-1 ring-accent-400/20">
                  {ex.highlight}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-on-dark-muted">
          ※
          収益はあくまで試算例であり、実際のランク条件・還元率・案件単価は契約内容によって異なります。詳しくはパートナー資料をご確認ください。
        </p>
      </div>
    </section>
  );
}
