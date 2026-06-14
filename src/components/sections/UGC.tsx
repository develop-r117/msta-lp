"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const points = [
  "不具合報告を改善に反映",
  "改善提案をプロダクトに反映",
  "有効な貢献には還元",
  "パートナーの制作物を流通",
  "ユーザー事例をプロダクト成長に活用",
  "最初の1000ユーザーを大切にする",
];

export default function UGC() {
  return (
    <section id="ugc" className="section-padding relative bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Co-creation"
          title={
            <>
              一緒に創る。
              <br className="hidden md:block" />
              だから、
              <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                進化し続ける。
              </span>
            </>
          }
          description="エムスタは、ユーザー・代理店・制作パートナーからのフィードバックをもとに進化していく共創型プロダクトです。バグ報告や改善提案を専用のAIエージェントで受け付け、プロダクト改善に反映。有効な改善提案には、パートナーへのレベニューシェア還元や評価制度の仕組みを提供いたします。"
          tone="dark"
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="card-on-dark rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent-400/20 text-accent-300 ring-1 ring-accent-400/30">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-white">{p}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
