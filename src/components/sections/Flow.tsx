"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Tabs, { type TabItem } from "@/components/ui/Tabs";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

const selfSteps = [
  { title: "アカウント登録", description: "メールアドレスで即時登録。" },
  { title: "2週間無料トライアル開始", description: "全機能を試せる無料期間がスタート。" },
  { title: "アプリ作成", description: "テンプレート / 標準機能を組み合わせて構築。" },
  {
    title: "プレビュー確認",
    description: "SP / タブレット / PCに標準でレスポンシブ対応",
  },
  { title: "公開設定", description: "ドメイン・ストア提出情報を設定。" },
  { title: "Web / iOS / Androidで公開", description: "そのまま公開・配信を開始。" },
];

const officialSteps = [
  { title: "お問い合わせ", description: "オンライン相談 or 資料DLからスタート。" },
  { title: "ヒアリング", description: "目的・必要機能・ご予算を確認。" },
  { title: "プラン選定", description: "オフィシャル制作 / 3hパック / Fullから提案。" },
  { title: "制作開始", description: "公式チームでアプリ制作を進行。" },
  { title: "テスト確認", description: "ご担当者と一緒に動作 / 内容を確認。" },
  { title: "公開申請", description: "ストア申請・ドメイン設定をサポート。" },
  { title: "運用開始", description: "CMSに移行し、運用フェーズへ。" },
];

const tabs: TabItem<"self" | "official">[] = [
  {
    id: "self",
    label: "セルフ構築",
    content: <Steps steps={selfSteps} accent="from-primary-500 to-primary-600" />,
  },
  {
    id: "official",
    label: "オフィシャル制作",
    content: <Steps steps={officialSteps} accent="from-accent-500 to-accent-600" />,
  },
];

export default function Flow() {
  return (
    <section id="flow" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Onboarding flow"
          title={<>まずは<span className="text-gradient">無料</span>で始められます。</>}
          description="セルフ構築でも、公式チーム制作でも。最短ステップで運用開始まで進めます。"
        />

        <div className="mt-14">
          <Tabs items={tabs} ariaLabel="導入までの流れ" />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            href={CTA_LINKS.signup}
            external={CTA_LINKS.signup.startsWith("http")}
            variant="primary"
            size="lg"
            icon={<ArrowIcon />}
          >
            2週間無料で始める
          </Button>
          <Button
            href={CTA_LINKS.spirOfficial}
            external={CTA_LINKS.spirOfficial.startsWith("http")}
            variant="secondary"
            size="lg"
            icon={<ChatIcon />}
          >
            導入相談する
          </Button>
        </div>
      </div>
    </section>
  );
}

function Steps({
  steps,
  accent,
}: {
  steps: { title: string; description: string }[];
  accent: string;
}) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <span
            className={`absolute -top-3 left-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r ${accent} px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white`}
          >
            STEP {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 text-base font-bold text-neutral-900">{s.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{s.description}</p>
        </motion.li>
      ))}
    </ol>
  );
}
