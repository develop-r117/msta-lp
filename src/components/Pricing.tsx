"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "スタンダード",
    price: "9,800",
    description: "小規模事業者・個人向け",
    features: [
      { text: "標準機能利用可能", included: true },
      { text: "iOS / Android対応", included: true },
      { text: "プッシュ通知", included: true },
      { text: "メールサポート", included: true },
      { text: "電話サポート", included: false },
      { text: "ストア公開サポート", included: false },
    ],
    popular: false,
    color: "neutral",
  },
  {
    name: "プレミアム",
    price: "16,800",
    description: "店舗・チーム向け",
    features: [
      { text: "標準機能利用可能", included: true },
      { text: "iOS / Android対応", included: true },
      { text: "プッシュ通知", included: true },
      { text: "メール+電話サポート", included: true },
      { text: "ストア公開サポート", included: true },
      { text: "カスタマイズ対応", included: false },
    ],
    popular: false,
    color: "neutral",
  },
  {
    name: "ビジネス",
    price: "26,800",
    description: "中規模事業者向け",
    features: [
      { text: "全機能利用可能", included: true },
      { text: "iOS / Android対応", included: true },
      { text: "プッシュ通知", included: true },
      { text: "専任サポート", included: true },
      { text: "ストア公開サポート", included: true },
      { text: "カスタマイズ対応", included: true },
    ],
    popular: true,
    color: "primary",
  },
  {
    name: "エンタープライズ",
    price: "要問い合わせ",
    description: "大規模事業者向け",
    features: [
      { text: "全機能利用可能", included: true },
      { text: "専用環境構築", included: true },
      { text: "SLA対応", included: true },
      { text: "専任サポート", included: true },
      { text: "保守契約対応", included: true },
      { text: "フルカスタマイズ対応", included: true },
    ],
    popular: false,
    color: "neutral",
  },
];

const commonFeatures = [
  "初期費用無料",
  "セットアップ費用無料",
  "いつでも解約可能",
  "14日間無料トライアル",
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
            シンプルな<span className="text-gradient">料金プラン</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            初期費用無料。月額料金のみで運用可能
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
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-neutral-500">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  {plan.price === "要問い合わせ" ? (
                    <div className="text-2xl font-bold text-neutral-900">{plan.price}</div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-lg text-neutral-500">¥</span>
                      <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                      <span className="text-neutral-500">/月</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      {feature.included ? (
                        <svg className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-neutral-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={feature.included ? "text-neutral-700" : "text-neutral-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full py-4 text-center font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {plan.price === "要問い合わせ" ? "お問い合わせ" : "今すぐ始める"}
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
          ※ 料金は税抜表示です。別途消費税がかかります。
        </motion.p>
      </div>
    </section>
  );
}

