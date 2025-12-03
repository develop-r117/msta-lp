"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const cases = [
  {
    id: 1,
    company: "某県歯科医師会",
    industry: "医師会",
    logo: "🦷",
    challenge: "会員管理と情報共有の効率化",
    solution: "コミュニティアプリ",
    results: [
      { label: "会員管理", value: "一元化", suffix: "" },
      { label: "情報共有", value: "リアルタイム", suffix: "" },
    ],
    testimonial: "勉強会の予約、会員管理、災害発生時の安否確認機能、地区別情報コンテンツなど、会員様限定のコミュニティアプリとして重宝いただいております。",
    person: "事務局担当者様",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    company: "オンライン語学教室",
    industry: "教育",
    logo: "📚",
    challenge: "学習環境の提供と予約管理",
    solution: "学習・予約管理アプリ",
    results: [
      { label: "学習環境", value: "いつでも", suffix: "どこでも" },
      { label: "予約管理", value: "効率化", suffix: "" },
    ],
    testimonial: "アプリでどこでも手軽に予習・復習できる環境を提供。新人講師の紹介、会員様のレッスン予約や担当者との面談予約もスムーズに行えるようになりました。",
    person: "教室運営者様",
    color: "from-violet-400 to-purple-500",
  },
  {
    id: 3,
    company: "接骨院",
    industry: "医療・健康",
    logo: "💆",
    challenge: "他社サービス終了に伴うリプレイス",
    solution: "店舗アプリへの移行",
    results: [
      { label: "リプレイス", value: "迅速", suffix: "対応" },
      { label: "予約機能", value: "アップグレード", suffix: "" },
    ],
    testimonial: "他社サービスの終了に伴い、リプレイスを実施。これまでの機能を踏襲し、予約機能を予約管理システムへアップデート。既存のアプリを止めることなく、迅速にリプレイスいただきました。",
    person: "院長様",
    color: "from-emerald-400 to-teal-500",
  },
];

const stats = [
  { value: "幅広い", label: "業種に対応", icon: "🏢" },
  { value: "個人〜企業", label: "規模問わず", icon: "👥" },
  { value: "専任", label: "サポート体制", icon: "🛡️" },
];

export default function Cases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section id="cases" className="py-24 md:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cases-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-neutral-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cases-pattern)" />
        </svg>
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
            SUCCESS STORIES
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            導入事例・<span className="text-gradient">お客様の声</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            様々な業種でエムスタが活用されています
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center bg-white rounded-2xl p-4 md:p-6 shadow-sm"
            >
              <div className="text-2xl md:text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-4xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-3 mb-8"
        >
          {cases.map((caseItem, index) => (
            <button
              key={caseItem.id}
              onClick={() => setActiveCase(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeCase === index
                  ? "bg-white shadow-lg text-neutral-900"
                  : "bg-transparent text-neutral-500 hover:bg-white/50"
              }`}
            >
              <span className="text-xl">{caseItem.logo}</span>
              <span className="hidden sm:inline font-medium">{caseItem.industry}</span>
            </button>
          ))}
        </motion.div>

        {/* Case details */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left - Info */}
              <div className={`bg-gradient-to-br ${cases[activeCase].color} p-8 lg:p-12 text-white`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                    {cases[activeCase].logo}
                  </div>
                  <div>
                    <div className="text-sm text-white/80 mb-1">{cases[activeCase].industry}</div>
                    <h3 className="text-2xl font-bold">{cases[activeCase].company}</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-white/70 mb-1">課題</div>
                    <div className="font-semibold text-lg">{cases[activeCase].challenge}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">導入した機能</div>
                    <div className="font-semibold text-lg">{cases[activeCase].solution}</div>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/20">
                  {cases[activeCase].results.map((result) => (
                    <div key={result.label}>
                      <div className="text-3xl md:text-4xl font-bold">{result.value}</div>
                      <div className="text-sm text-white/80">
                        {result.label}
                        <span className="text-white font-medium ml-1">{result.suffix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Testimonial */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-neutral-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6">
                  {cases[activeCase].testimonial}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{cases[activeCase].person}</div>
                    <div className="text-sm text-neutral-500">{cases[activeCase].company}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {cases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCase(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCase === index
                  ? "w-8 bg-primary-500"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

