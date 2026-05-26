"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PartnerForm from "@/components/ui/PartnerForm";
import { Button, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

const docContents = [
  "パートナー制度の概要",
  "レベニューシェア",
  "対象者",
  "活用イメージ",
  "導入までの流れ",
  "収益化モデル",
  "制作 / 紹介 / テンプレート販売の違い",
];

export default function PartnerDocCTA() {
  return (
    <section id="partner-doc" className="section-padding relative bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Partner document"
          title={<>アプリ制作を、あなたの<span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">新しいビジネス</span>に。</>}
          description="制作会社・開発会社・代理店・クリエイターが、アプリ制作・運用支援・テンプレート販売・紹介活動を通じて新しい収益機会を作るための制度概要をまとめました。"
          tone="dark"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-primary-900 via-primary-700 to-accent-500 p-8 text-white shadow-2xl">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-3xl bg-white/10 backdrop-blur" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent-300">Partner deck</p>
              <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                エムスタ
                <br />
                Partner Program
              </h3>
              <p className="mt-3 text-sm text-white/80">アプリビジネスを始めるための制度ガイド</p>

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-300/80">資料の主な内容</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {docContents.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-white/90">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Button
                href={CTA_LINKS.spirGeneral}
                external={CTA_LINKS.spirGeneral.startsWith("http")}
                variant="secondary"
                size="md"
                fullWidth
                icon={<ChatIcon />}
                className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white"
              >
                直接オンラインで相談する
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <PartnerForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
