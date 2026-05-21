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
    <section id="marketplace" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Marketplace"
          title={
            <>
              機能・テンプレート・コンポーネントが
              <br className="hidden md:block" />
              <span className="text-gradient">流通するエコシステム</span>へ。
            </>
          }
          description="エムスタは、オフィシャル提供の公式機能だけでなく、パートナーが制作した機能・テンプレート・デザインアセットなどを流通させ、ユーザーと制作者の双方が価値を生み出せるエコシステムを構築していきます。"
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
            >
              <span className="mr-2 inline-block rounded-full bg-primary-100 px-1.5 py-0.5 text-[10px] font-bold text-primary-700">
                M
              </span>
              {it}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-7 md:grid-cols-2 md:p-9">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">ユーザー</p>
            <p className="mt-2 text-base font-semibold text-neutral-900">
              必要な機能を、必要なタイミングで追加できる。
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">パートナー</p>
            <p className="mt-2 text-base font-semibold text-neutral-900">
              自社の技術やデザインを、エムスタ上で販売できる。
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          ※ マーケットプレイス詳細は、ローンチ後に順次拡張していきます。
        </p>
      </div>
    </section>
  );
}
