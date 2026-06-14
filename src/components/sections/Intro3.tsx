"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const cards = [
  {
    no: "01",
    title: "アプリを作る",
    body: "Webアプリ・iOS・Androidに対応。標準機能を組み合わせて、低コスト・短納期でアプリを制作できます。",
    accent: "from-primary-500 to-primary-600",
    icon: BuildIcon,
  },
  {
    no: "02",
    title: "アプリを運用する",
    body: "CMSを標準搭載。投稿、通知、会員管理、予約、チャット、アンケートなど運用に必要な全ての機能を搭載し、誰でも直感的に管理画面から更新できます。",
    accent: "from-accent-500 to-accent-600",
    icon: OperateIcon,
  },
  {
    no: "03",
    title: "アプリビジネスを作る",
    body: "制作会社・代理店・クリエイターは、パートナー制度を活用してアプリビジネスを展開できます。",
    accent: "from-neutral-700 to-neutral-900",
    icon: BizIcon,
  },
];

export default function Intro3() {
  return (
    <section id="intro" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What you can do"
          title={
            <>
              エムスタで<span className="text-gradient">できること</span>
            </>
          }
          description="アプリを作り、運用し、ビジネスにする。エムスタが提供する3つの軸。"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map(({ no, title, body, accent, icon: Icon }, i) => (
            <motion.article
              key={no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
              />
              <div className="flex items-start justify-between">
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md`}
                >
                  <Icon />
                </div>
                <span className="text-xs font-bold tracking-widest text-neutral-400">
                  {no}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-neutral-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildIcon() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4"
      />
    </svg>
  );
}

function OperateIcon() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 10h16M4 14h10M4 18h7"
      />
    </svg>
  );
}

function BizIcon() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2V9z"
      />
    </svg>
  );
}
