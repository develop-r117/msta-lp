"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const modes = [
  {
    name: "かんたんモード",
    price: "10,000",
    tagline: "誰でもかんたんに、管理・運用操作",
    description: "標準搭載機能の運用・管理・更新作業が誰でも直感的に行うことができます。",
    features: [
      "シンプルな管理画面",
      "直感的な操作性",
      "プッシュ通知配信",
      "コンテンツ更新",
      "会員管理",
      "基本的な分析機能",
    ],
    color: "primary",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "プロモード",
    price: "15,000",
    priceNote: "〜",
    tagline: "簡易的なUIの編集変更もセルフで可能",
    description: "アプリ画面の編集機能（UI編集）を搭載。各機能の表示場所や配列、バナーや素材、カラー調整等を運用画面内で編集可能です。",
    features: [
      "かんたんモードの全機能",
      "アプリUI編集機能",
      "表示配列のカスタマイズ",
      "バナー・素材の変更",
      "カラー調整",
      "リアルタイム反映",
    ],
    color: "accent",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
];

export default function OperationModes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="modes" className="py-24 md:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary-100/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-accent-100/40 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4"
          >
            OPERATION MODES
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            選べる<span className="text-gradient">運用モード</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            運用ダッシュボードは2つのモードからお選びいただけます
          </p>
        </motion.div>

        {/* Mode cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
                mode.color === "primary" 
                  ? "from-primary-400 to-primary-600" 
                  : "from-accent-400 to-accent-600"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
              
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-neutral-200 h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${
                      mode.color === "primary" 
                        ? "bg-primary-100 text-primary-600" 
                        : "bg-accent-100 text-accent-600"
                    }`}>
                      {mode.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900">{mode.name}</h3>
                    <p className={`text-sm font-medium ${
                      mode.color === "primary" ? "text-primary-600" : "text-accent-600"
                    }`}>{mode.tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-neutral-500">¥</span>
                      <span className={`text-3xl font-bold ${
                        mode.color === "primary" ? "text-primary-600" : "text-accent-600"
                      }`}>{mode.price}</span>
                      {mode.priceNote && <span className="text-sm text-neutral-500">{mode.priceNote}</span>}
                    </div>
                    <span className="text-sm text-neutral-500">/月（税別）</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-600 mb-6">{mode.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {mode.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <svg className={`w-4 h-4 shrink-0 ${
                        mode.color === "primary" ? "text-primary-500" : "text-accent-500"
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Note for pro mode */}
                {mode.name === "プロモード" && (
                  <div className="mt-6 p-4 bg-accent-50 rounded-xl border border-accent-100">
                    <p className="text-sm text-accent-700">
                      <strong>※ アップデート作業なし</strong>でリアルタイムに反映されます
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Customize note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-6 py-4 bg-white rounded-2xl shadow-sm border border-neutral-200">
            <p className="text-neutral-600">
              <span className="font-semibold text-neutral-900">カスタマイズプラン / エムスタFull</span>をご利用の場合、
              標準機能の機能拡張や追加機能の実装により<br className="hidden md:block" />
              ダッシュボード（CMS）のカスタムが必要な場合は<span className="text-accent-600 font-semibold">プロモード</span>が適用されます。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

