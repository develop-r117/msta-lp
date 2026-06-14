"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const highlights = [
  "アプリ制作だけでなく、リリース後の運用管理まで",
  "コンテンツ更新、画面構成の追加 / 編集、機能追加まで管理ダッシュボードから直感的に",
  "従来よりも数段低いリテラシーで構築・運用できる",
];

const pillars = ["作る", "運用する", "改善する", "収益化する"];

export default function About() {
  return (
    <section id="about" className="section-padding relative bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              エムスタとは？
              <br className="hidden md:block" />
              <span className="text-gradient">真のノーコード × 最強CMS</span>
            </>
          }
          description="エムスタは、Webアプリ・iOSアプリ・Androidアプリを、CMS付きで構築・運用できるアプリ制作プラットフォームです。"
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9"
            >
              <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
                単に「コードを書かずに作れる」だけのツールではありません。
                <br />
                同じようなクオリティのアプリを、従来よりも数段低いリテラシーで構築・運用できること。
                <span className="font-semibold text-neutral-900">
                  それがエムスタの価値です。
                </span>
              </p>

              <ul className="mt-6 space-y-3">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-neutral-700 md:text-base"
                  >
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-7 text-white shadow-xl md:p-9"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />

              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                All in one
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
                アプリを作る。
                <br />
                運用する。改善する。
                <br />
                収益化する。
              </h3>
              <p className="mt-3 text-sm text-white/70">
                そのすべてを一つの場所で。
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pillars.map((p) => (
                  <div
                    key={p}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-sm font-semibold backdrop-blur"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
