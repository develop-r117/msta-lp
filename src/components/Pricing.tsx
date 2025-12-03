"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "スタータープラン",
    devPrice: "140,000",
    devPriceNote: "~",
    monthlyPrice: "10,000",
    monthlyNote: "かんたんモード",
    monthlyPriceAlt: "15,000",
    monthlyNoteAlt: "プロモード",
    description: "最短14日〜で開発",
    features: [
      { text: "標準搭載機能にて開発", included: true },
      { text: "ヒアリングベースで企画", included: true },
      { text: "デフォルト素材の提供あり", included: true },
      { text: "デベロッパー登録（有償代行可）", included: true },
    ],
    popular: false,
  },
  {
    name: "スタンダードプラン",
    devPrice: "270,000",
    devPriceNote: "",
    monthlyPrice: "10,000",
    monthlyNote: "かんたんモード",
    monthlyPriceAlt: "15,000",
    monthlyNoteAlt: "プロモード",
    description: "30日〜で開発",
    features: [
      { text: "標準搭載機能にて開発", included: true },
      { text: "ヒアリングベースで企画", included: true },
      { text: "テンプレート素材使用", included: true },
      { text: "アプリアイコン等オリジナル制作", included: true },
    ],
    popular: true,
  },
  {
    name: "カスタマイズプラン",
    devPrice: "270,000",
    devPriceNote: "+α",
    monthlyPrice: "15,000",
    monthlyNote: "プロモード",
    monthlyPriceAlt: "",
    monthlyNoteAlt: "内容により変動",
    description: "60日〜で開発",
    features: [
      { text: "標準機能の拡張実装", included: true },
      { text: "API連携対応", included: true },
      { text: "企画フルサポート", included: true },
      { text: "ご予算に応じたカスタマイズ", included: true },
    ],
    popular: false,
  },
  {
    name: "エムスタFull",
    devPrice: "応相談",
    devPriceNote: "",
    monthlyPrice: "15,000",
    monthlyNote: "プロモード",
    monthlyPriceAlt: "",
    monthlyNoteAlt: "内容により変動",
    description: "スクラッチ開発・60日〜",
    features: [
      { text: "機能単体開発対応", included: true },
      { text: "オリジナルUI実装", included: true },
      { text: "デベロッパー登録代行（無償）", included: true },
      { text: "フルサポート対応", included: true },
    ],
    popular: false,
  },
];

const commonFeatures = [
  "iOS / Android両対応",
  "ノーコードで運用管理",
  "専任サポート体制",
  "リリース後も安心サポート",
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary-100/50 to-accent-100/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4"
          >
            PRICING
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            開発プラン<span className="text-gradient">一覧表</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            お客様のニーズに合わせた最適なプランをご提案いたします
          </p>
        </motion.div>

        {/* Common features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
        >
          {commonFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full"
            >
              <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-primary-800">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-1 ${
                plan.popular
                  ? "bg-gradient-to-br from-primary-400 to-accent-400"
                  : "bg-transparent"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold rounded-full shadow-lg"
                >
                  おすすめ
                </motion.div>
              )}

              <div className={`h-full rounded-[calc(1.5rem-4px)] p-6 lg:p-8 ${
                plan.popular ? "bg-white" : "bg-white border-2 border-neutral-200"
              }`}>
                {/* Plan name */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-neutral-500">{plan.description}</p>
                </div>

                {/* Development Price */}
                <div className="text-center mb-4 pb-4 border-b border-neutral-100">
                  <div className="text-xs text-neutral-500 mb-1">開発プラン料金</div>
                  {plan.devPrice === "応相談" ? (
                    <div className="text-xl font-bold text-neutral-900">{plan.devPrice}</div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-sm text-neutral-500">¥</span>
                      <span className="text-2xl font-bold text-gradient">{plan.devPrice}</span>
                      <span className="text-sm text-neutral-500">{plan.devPriceNote}</span>
                    </div>
                  )}
                </div>

                {/* Monthly Price */}
                <div className="text-center mb-6">
                  <div className="text-xs text-neutral-500 mb-1">月額利用料</div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-xs text-primary-600 mr-1">{plan.monthlyNote}</span>
                      <span className="text-sm text-neutral-500">¥</span>
                      <span className="text-xl font-bold text-neutral-800">{plan.monthlyPrice}</span>
                      <span className="text-sm text-neutral-500">/月</span>
                    </div>
                    {plan.monthlyPriceAlt && (
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className="text-xs text-accent-600 mr-1">{plan.monthlyNoteAlt}</span>
                        <span className="text-sm text-neutral-500">¥</span>
                        <span className="text-xl font-bold text-neutral-800">{plan.monthlyPriceAlt}</span>
                        <span className="text-sm text-neutral-500">/月</span>
                      </div>
                    )}
                    {!plan.monthlyPriceAlt && plan.monthlyNoteAlt && (
                      <div className="text-xs text-neutral-500">{plan.monthlyNoteAlt}</div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-neutral-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full py-3 text-center font-semibold rounded-xl transition-all text-sm ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  お問い合わせ
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-sm text-neutral-500 mt-12"
        >
          ※ 表記されている価格は全て税別価格です。
        </motion.p>
      </div>
    </section>
  );
}

