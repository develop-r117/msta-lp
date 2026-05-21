"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

const items = [
  "独自機能開発",
  "高度なUI/UX",
  "既存アプリのリプレイス",
  "専用CMS追加",
  "カスタム管理機能",
  "スクラッチ要件対応",
];

export default function MstaFull() {
  return (
    <section id="msta-full" className="section-padding relative overflow-hidden bg-neutral-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-500/30 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="エムスタFull"
              title={<>最強のコスパ。<span className="text-gradient">エムスタFull</span>。</>}
              description={
                <span className="text-white/80">
                  標準機能では対応できない独自要件や、高度なUI/UXなどのご要望に対応。エムスタの基盤を活用することで、一般的なスクラッチ開発よりも低コスト・短納期で、柔軟なアプリ開発を実現します。
                </span>
              }
            />

            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {items.map((it) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold">{it}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                href={CTA_LINKS.spirFull}
                external={CTA_LINKS.spirFull.startsWith("http")}
                variant="primary"
                size="lg"
                icon={<ChatIcon />}
              >
                エムスタFullについて相談する
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-white/15 to-white/5 p-7 ring-1 ring-white/15 backdrop-blur md:p-9">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">対応イメージ</p>
              <ul className="mt-4 space-y-3 text-sm">
                <BulletWhite label="基盤" value="エムスタを活用、運用も標準CMSへ" />
                <BulletWhite label="開発期間" value="スクラッチ比 短縮" />
                <BulletWhite label="開発費" value="スクラッチ比 低コスト" />
                <BulletWhite label="柔軟性" value="独自仕様 / 高度UIに対応" />
              </ul>
              <p className="mt-6 text-xs text-white/60">
                ※ ローンチ時点では最低限のオンライン相談CTAでスタート。エムスタFull診断コンテンツは順次追加します。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BulletWhite({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </li>
  );
}
