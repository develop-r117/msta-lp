"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

export default function OfficialBuild() {
  return (
    <section id="official" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Official build"
          title={
            <>
              自分で作るのが不安な方には、
              <span className="text-gradient">公式チームがサポート</span>。
            </>
          }
          description="エムスタでは、公式チームによる制作代行もご用意。初期設計に不安がある方、スピードと品質を担保したい方、まずは早く形にしたい方向けの選択肢です。"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9"
          >
            <span className="inline-flex items-center rounded-full bg-accent-500 px-3.5 py-1.5 text-xs font-bold text-white">
              オフィシャル制作
            </span>
            <h3 className="mt-4 text-2xl font-bold text-neutral-900 md:text-3xl">
              公式チームが、丁寧にアプリ制作を代行
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
              企画相談から構築までサポート。ご予算に応じて、標準機能をアプリごとにカスタマイズすることも可能です。
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <Dot /> オンラインMTGで詳細ヒアリング
              </li>
              <li className="flex items-start gap-2">
                <Dot /> カスタマイズ実装対応可能
              </li>
              <li className="flex items-start gap-2">
                <Dot /> 公開・運用までサポート
              </li>
            </ul>
            <p className="mt-6 rounded-2xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-900 ring-1 ring-neutral-200">
              基本料金 <span className="text-2xl font-black">¥100,000</span>〜
            </p>
            <div className="mt-6">
              <Button
                href={CTA_LINKS.spirOfficial}
                external={CTA_LINKS.spirOfficial.startsWith("http")}
                variant="tertiary"
                size="md"
                fullWidth
                icon={<ChatIcon />}
              >
                オフィシャル制作に相談する
              </Button>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-primary-300 bg-gradient-to-br from-primary-500 to-primary-700 p-7 text-white shadow-xl md:p-9"
          >
            <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold ring-1 ring-white/30">
              ローンチ記念半額
            </span>
            <h3 className="mt-4 text-2xl font-bold leading-tight md:text-3xl">
              3hパック
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
              事前に企画・ヒアリングシートをご提供いただき、当日オンライン上で詳細なご要望を伺いながらリアルタイムで制作。当日中にアプリの完成を目指します。
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <Dot light /> 事前ヒアリングシートご提供
              </li>
              <li className="flex items-start gap-2">
                <Dot light /> 当日リアルタイム制作
              </li>
              <li className="flex items-start gap-2">
                <Dot light /> 当日中の完成を目指します
              </li>
            </ul>

            <div className="mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                通常価格
              </p>
              <p className="mt-1 line-through opacity-70">¥70,000 / 回</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/60">
                ローンチ記念
              </p>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-black">¥35,000</span>
                <span className="text-sm font-semibold">/ 回</span>
                <span className="ml-2 inline-flex items-center rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase">
                  半額
                </span>
              </p>
            </div>
            <div className="mt-6">
              <Button
                href={CTA_LINKS.spirThreeHour}
                external={CTA_LINKS.spirThreeHour.startsWith("http")}
                variant="secondary"
                size="md"
                fullWidth
                icon={<ChatIcon />}
              >
                3hパックについて相談
              </Button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function Dot({ light }: { light?: boolean }) {
  return (
    <span
      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${light ? "bg-white/70" : "bg-primary-500"}`}
    />
  );
}
