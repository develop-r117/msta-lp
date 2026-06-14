"use client";

import Link from "next/link";

const items = [
  { label: "アカウント基本利用料", price: "¥3,000 / 月" },
  { label: "Webアプリ公開", price: "¥2,000 / URL" },
  { label: "iOS / Android公開", price: "各¥5,000 / 月" },
];

/**
 * 他のページに埋め込める軽量な料金サマリ。`/pricing`への導線も含む。
 */
export default function PricingSummary({ className }: { className?: string }) {
  return (
    <section className={`section-padding bg-neutral-50 ${className ?? ""}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-700">
                Pricing
              </p>
              <h3 className="mt-2 text-2xl font-bold text-neutral-900 md:text-3xl">
                初期費用不要、<span className="text-gradient">月額のみ</span>
                のシンプル料金
              </h3>
            </div>
            <Link
              href="/pricing"
              className="text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
            >
              料金詳細を見る →
            </Link>
          </div>

          <ul className="mt-6 grid divide-y divide-neutral-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {items.map((it) => (
              <li
                key={it.label}
                className="flex items-center justify-between gap-4 py-3 sm:flex-col sm:items-start sm:gap-1 sm:px-4 sm:py-1"
              >
                <span className="text-xs font-semibold text-neutral-500">
                  {it.label}
                </span>
                <span className="text-base font-black text-neutral-900 md:text-lg">
                  {it.price}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700">
            登録から2週間無料 / 初期費用0円
          </p>
        </div>
      </div>
    </section>
  );
}
