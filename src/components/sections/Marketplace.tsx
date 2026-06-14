"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const items = [
  "有償アドオン機能",
  "UIテンプレート",
  "デザインテンプレート",
  "コンテンツテンプレート",
  "業界特化テンプレート",
  "パートナー開発の独自機能",
  "API連携",
];

export default function Marketplace() {
  return (
    <section
      id="marketplace"
      className="section-padding relative bg-section-dark"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Marketplace"
          title={
            <>
              機能・テンプレート・コンポーネントが
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                流通するエコシステム
              </span>
              へ。
            </>
          }
          description="エムスタは、オフィシャル提供の公式機能だけでなく、パートナーが制作した機能・テンプレート・デザインアセットなどを流通させ、ユーザーと制作者の双方が価値を生み出せるエコシステムを構築していきます。"
          tone="dark"
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="card-on-dark rounded-2xl px-4 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:border-accent-400/40 hover:shadow-xl"
            >
              <span className="mr-2 inline-block rounded-full bg-accent-400/20 px-1.5 py-0.5 text-[10px] font-bold text-accent-300 ring-1 ring-accent-400/30">
                M
              </span>
              {it}
            </motion.div>
          ))}
        </div>

        <div className="card-on-dark mt-10 grid gap-6 rounded-3xl p-7 md:grid-cols-2 md:p-9">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-400">
              ユーザー
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              必要な機能を、必要なタイミングで追加できる。
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-400">
              パートナー
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              自社の技術やデザインを、エムスタ上で販売できる。
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-on-dark-muted">
          ※ マーケットプレイス詳細は、ローンチ後に順次拡張していきます。
        </p>
      </div>
    </section>
  );
}
