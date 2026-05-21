"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Tabs, { type TabItem } from "@/components/ui/Tabs";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

const cmsCheckList = [
  "プログラミング不要で日々の情報更新",
  "投稿・固定コンテンツの追加 / 編集",
  "プッシュ通知 / ポップアップ配信",
  "会員管理 / 権限管理 / セグメント配信",
  "予約 / クーポン / アンケート",
  "プレビューしながら画面を組み立て",
];

type TabId = "post" | "push" | "member";
const tabs: TabItem<TabId>[] = [
  {
    id: "post",
    label: "投稿の追加",
    content: (
      <CmsTabPanel
        image="/screenshots/3.png"
        title="数クリックで投稿・お知らせを更新"
        bullets={[
          "テンプレートに従って入力するだけ",
          "画像・動画・リンクをドラッグ&ドロップ",
          "予約投稿 / 公開範囲設定にも対応",
        ]}
      />
    ),
  },
  {
    id: "push",
    label: "プッシュ通知",
    content: (
      <CmsTabPanel
        image="/screenshots/4.png"
        title="重要なお知らせを、確実に届ける"
        bullets={[
          "テキスト・画像付きの通知を作成",
          "セグメント別配信で適切なユーザーへ",
          "配信結果・到達率をダッシュボードで確認",
        ]}
      />
    ),
  },
  {
    id: "member",
    label: "会員管理",
    content: (
      <CmsTabPanel
        image="/screenshots/5.png"
        title="会員情報・アクションを一元管理"
        bullets={[
          "登録ユーザーをCMSから検索・編集",
          "権限ロール / セグメントタグを付与",
          "外部パートナーの権限管理にも対応",
        ]}
      />
    ),
  },
];

export default function CMS() {
  return (
    <section id="cms" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Built-in CMS"
          title={<>アプリは、<span className="text-gradient">リリースしてからが本番。</span></>}
          description="エムスタは、アプリを作るだけでなく、リリース後の更新・運用まで管理できるCMSを標準提供します。プログラミング不要で、管理画面から日々の情報更新や運用管理が可能です。"
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
              <Image
                src="/screenshots/2.png"
                alt="エムスタ CMS 管理画面"
                width={1200}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900">CMSでできること</h3>
              <ul className="mt-4 space-y-3">
                {cmsCheckList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-500 text-white">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Button
                  href={CTA_LINKS.signup}
                  external={CTA_LINKS.signup.startsWith("http")}
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<ArrowIcon />}
                >
                  2週間無料で始める
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14">
          <Tabs<TabId> items={tabs} ariaLabel="CMSの主な操作" />
        </div>
      </div>
    </section>
  );
}

function CmsTabPanel({
  image,
  title,
  bullets,
}: {
  image: string;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="grid items-center gap-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
          <Image src={image} alt={title} width={1200} height={760} className="h-auto w-full" />
        </div>
      </div>
      <div className="lg:col-span-5">
        <h4 className="text-xl font-bold text-neutral-900 md:text-2xl">{title}</h4>
        <ul className="mt-4 space-y-2.5 text-sm text-neutral-600">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
