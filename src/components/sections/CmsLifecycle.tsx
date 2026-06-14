"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    no: "01",
    title: "情報発信",
    description:
      "プッシュ通知 / メール / ポップアップで、必要な情報を必要なユーザーに即時に届ける。",
    color: "from-primary-500 to-primary-600",
    items: ["プッシュ通知", "メール配信", "ポップアップ", "投稿コンテンツ"],
  },
  {
    no: "02",
    title: "反応収集",
    description:
      "アンケート・問い合わせ・チャット・スタンプ利用で、ユーザーの声と行動データを集める。",
    color: "from-accent-500 to-accent-600",
    items: ["アンケート", "問い合わせ", "チャット", "スタンプ"],
  },
  {
    no: "03",
    title: "分析",
    description:
      "標準分析 + Google Analytics で、利用率・継続率・収益への寄与を多角的に可視化する。",
    color: "from-emerald-500 to-emerald-600",
    items: ["DAU/MAU", "新規/離脱", "ダウンロード", "GA4連携"],
  },
  {
    no: "04",
    title: "改善",
    description:
      "投稿・導線・機能ON/OFF・有償オプションまで、即日で打ち手を反映できる。",
    color: "from-fuchsia-500 to-fuchsia-600",
    items: ["導線エディタ", "投稿更新", "機能設定", "AI制作"],
  },
];

export default function CmsLifecycle() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Operation loop"
          title={
            <>
              運用は、<span className="text-gradient">ループ</span>でまわす。
            </>
          }
          description="情報発信 → 反応収集 → 分析 → 改善。エムスタCMSは、この4つのフェーズを1つの管理画面で繋ぎ、リリース後のグロースを当たり前にします。"
        />

        <div className="mt-12">
          <ol className="grid gap-3 md:grid-cols-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.no}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100"
              >
                <span
                  className={`inline-flex items-center rounded-full bg-gradient-to-r ${s.color} px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white`}
                >
                  STEP {s.no}
                </span>
                <h3 className="mt-3 text-base font-bold text-neutral-900 md:text-lg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {s.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden md:absolute md:-right-2.5 md:top-1/2 md:-translate-y-1/2 md:block"
                  >
                    <svg
                      className="h-5 w-5 text-neutral-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                ) : null}
              </motion.li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs text-neutral-500">
            ループ可能な4ステップ。最後の「改善」は次の「情報発信」の起点にもなります。
          </p>
        </div>
      </div>
    </section>
  );
}
