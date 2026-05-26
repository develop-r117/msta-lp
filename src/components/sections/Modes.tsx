"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

type Mode = {
  id: string;
  label: string;
  headline: string;
  targets: string[];
  points: string[];
  image: string;
  accent: string;
  badge: string;
  tone: "light" | "dark";
};

const modes: Mode[] = [
  {
    id: "easy",
    label: "かんたんモード",
    headline: "リテラシーの壁を撤廃し、誰でも直感的に。",
    targets: ["事業者", "店舗担当者", "非エンジニア", "現場運用担当者", "一般の方"],
    points: [
      "テンプレートを選んで初期設定だけで運用開始",
      "管理画面はガイド付き・項目ベースの入力",
      "リテラシーの壁を最小化",
    ],
    image: "/screenshots/6.png",
    accent: "from-primary-50 to-primary-100",
    badge: "bg-primary-500",
    tone: "light",
  },
  {
    id: "pro",
    label: "プロモード",
    headline: "より自由度の高い編集、コード差し込み、テンプレート制作。",
    targets: ["制作会社", "開発会社", "デザイナー", "クリエイター", "代理店"],
    points: [
      "詳細な画面設計 / カスタムCSS / コード差し込み",
      "テンプレート / コンポーネントの内製・販売",
      "クライアントの案件をエムスタ上で展開",
    ],
    image: "/screenshots/7.png",
    accent: "from-primary-800 to-primary-900",
    badge: "bg-accent-400 text-primary-900",
    tone: "dark",
  },
];

export default function Modes() {
  return (
    <section id="modes" className="section-padding relative bg-section-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Easy / Pro"
          title={<>初心者にも、プロにも。<br className="hidden md:block" />使い方に合わせた<span className="text-gradient">2つのモード</span>。</>}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {modes.map((m, i) => {
            const isDark = m.tone === "dark";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={
                  isDark
                    ? "relative overflow-hidden rounded-3xl bg-section-dark p-7 shadow-xl ring-1 ring-white/10 md:p-9"
                    : "relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9"
                }
              >
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${m.accent} opacity-60`} />

                <div className="relative">
                  <span className={`inline-flex items-center gap-2 rounded-full ${m.badge} px-3.5 py-1.5 text-xs font-bold ${isDark ? "" : "text-white"}`}>
                    {m.label}
                  </span>
                  <h3 className={`mt-4 text-2xl font-bold md:text-3xl ${isDark ? "text-white" : "text-neutral-900"}`}>
                    {m.headline}
                  </h3>

                  <div className="mt-5">
                    <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-accent-400" : "text-neutral-500"}`}>対象</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.targets.map((t) => (
                        <span
                          key={t}
                          className={
                            isDark
                              ? "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15"
                              : "rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700"
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className={`mt-5 space-y-2.5 text-sm ${isDark ? "text-on-dark-muted" : "text-neutral-700"}`}>
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? "bg-accent-400" : m.badge}`} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-7 overflow-hidden rounded-2xl ${isDark ? "border border-white/10 bg-white/5" : "border border-neutral-200 bg-neutral-100"}`}>
                    <Image src={m.image} alt={`${m.label} のUIイメージ`} width={1200} height={760} className="h-auto w-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
