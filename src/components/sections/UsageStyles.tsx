"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

const styles = [
  {
    id: "self",
    label: "セルフ構築",
    targets: ["開発会社 / デザイナー", "個人クリエイター", "低コストで始めたい方"],
    description:
      "初期費用なしで、アカウント登録からアプリ制作を開始可能。標準機能を組み合わせて、すぐにアイデアをアプリ化できます。",
    cta: { label: "まずは無料トライアル", href: CTA_LINKS.signup, external: true },
    accent: "from-primary-500 to-primary-600",
    chip: "おすすめ",
  },
  {
    id: "official",
    label: "オフィシャル制作",
    targets: ["スピードと品質を担保したい事業者", "プロに任せたい方", "工数削減を優先したい方"],
    description:
      "エムスタ公式チームが、標準機能内でのアプリ制作を代行。企画相談から構築までサポートします。ご予算に応じて、標準機能をアプリごとにカスタマイズすることも可能。",
    cta: { label: "オフィシャル制作に相談", href: CTA_LINKS.spirOfficial, external: true },
    accent: "from-accent-500 to-accent-600",
    note: "基本料金 100,000円〜 / 3hパック 70,000円〜",
  },
  {
    id: "full",
    label: "エムスタFull",
    targets: ["独自機能を実装したい", "高度なUI/UX", "既存アプリのリプレイス"],
    description:
      "エムスタの基盤を活用しながら、独自要件にも対応。一般的なスクラッチ開発よりも低コスト・短納期で、柔軟なアプリ開発を実現します。",
    cta: { label: "エムスタFullを相談", href: CTA_LINKS.spirFull, external: true },
    accent: "from-neutral-700 to-neutral-900",
    note: "個別見積",
  },
];

export default function UsageStyles() {
  return (
    <section id="usage" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="3 ways to use"
          title={<>目的に合わせて選べる<span className="text-gradient">3つの使い方</span></>}
          description="セルフ構築・オフィシャル制作・エムスタFull。状況に合わせて、最適な進め方を選べます。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {styles.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:p-8"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.accent}`} />
              {s.chip ? (
                <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-700">
                  {s.chip}
                </span>
              ) : null}

              <h3 className={`bg-gradient-to-r ${s.accent} bg-clip-text text-2xl font-bold text-transparent`}>
                {s.label}
              </h3>

              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">対象</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {s.targets.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-5 grow text-sm leading-relaxed text-neutral-600">{s.description}</p>

              {s.note ? (
                <p className="mt-5 rounded-xl bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 ring-1 ring-neutral-200">
                  {s.note}
                </p>
              ) : null}

              <div className="mt-6">
                <Button
                  href={s.cta.href}
                  external={s.cta.external}
                  variant={s.id === "self" ? "primary" : "tertiary"}
                  size="md"
                  fullWidth
                  icon={s.id === "self" ? <ArrowIcon /> : <ChatIcon />}
                >
                  {s.cta.label}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
