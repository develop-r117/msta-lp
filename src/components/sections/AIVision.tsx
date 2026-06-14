"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const groups = [
  {
    title: "制作支援",
    items: ["企画整理", "画面構成提案", "コンテンツ構成提案", "UI生成支援"],
    icon: BulbIcon,
    accent: "from-primary-400 to-accent-400",
  },
  {
    title: "運用支援",
    items: [
      "投稿内容の整理",
      "プッシュ通知文面作成",
      "FAQ生成",
      "運用改善提案",
    ],
    icon: GearIcon,
    accent: "from-accent-400 to-primary-300",
  },
  {
    title: "サポート支援",
    items: ["運用・操作", "マニュアル", "申請準備サポート", "初期設定ガイド"],
    icon: SupportIcon,
    accent: "from-primary-500 to-primary-800",
  },
];

export default function AIVision() {
  return (
    <section id="ai" className="section-padding relative bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI / Agent"
          title={
            <>
              AIが、
              <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                制作と運用
              </span>
              を支援する。
            </>
          }
          description="完全自動化ではなく、制作・運用の工数削減を支援するAI。エムスタでは、アプリ制作の各フェーズでAIによる支援機能を順次搭載していきます。"
          tone="dark"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {groups.map(({ title, items, icon: Icon, accent }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="card-on-dark rounded-3xl p-7 shadow-xl md:p-8"
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-primary-900 shadow-md`}
              >
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-on-dark-muted">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="card-on-dark mt-10 rounded-3xl border border-dashed border-white/20 p-7 md:p-9"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-accent-400">
            将来像
          </p>
          <p className="mt-3 text-sm leading-relaxed text-on-dark-muted md:text-base">
            アプリ専用の目的設計・運用状況を理解し、制作からリリース後の運用まで伴走するAIエージェント機能のリリースを予定しています。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function BulbIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1.5M5.636 5.636l1.06 1.06M3 12h1.5M5.636 18.364l1.06-1.06M12 21v-1.5M18.364 18.364l-1.06-1.06M21 12h-1.5M18.364 5.636l-1.06 1.06M9 17h6m-3 0v3m-3-7a3 3 0 116 0v.5c0 .8-.3 1.5-.8 2L13 14h-2l-.7-1.3A3 3 0 019 12.5V13z"
      />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.997.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.364 5.636l-1.591 1.591M5.636 18.364l1.591-1.591M21 12h-2.25M5.25 12H3M18.364 18.364l-1.591-1.591M5.636 5.636l1.591 1.591M12 6.75A5.25 5.25 0 1117.25 12 5.25 5.25 0 0112 6.75z"
      />
    </svg>
  );
}
