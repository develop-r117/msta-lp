"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const cases = [
  {
    id: 1,
    company: "カフェ サクラ",
    industry: "飲食店",
    logo: "☕",
    challenge: "リピーターを増やしたい",
    solution: "スタンプカードとプッシュ通知",
    results: [
      { label: "リピーター率", value: "30%", suffix: "向上" },
      { label: "月間売上", value: "20%", suffix: "増" },
    ],
    testimonial: "スタンプカード機能で、お客様の来店頻度が上がりました。プッシュ通知も簡単に配信できて助かっています。",
    person: "オーナー 田中様",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    company: "美容院 ルミエール",
    industry: "美容院",
    logo: "✂️",
    challenge: "予約業務の効率化",
    solution: "オンライン予約システム",
    results: [
      { label: "予約業務工数", value: "50%", suffix: "削減" },
      { label: "キャンセル率", value: "15%", suffix: "減少" },
    ],
    testimonial: "予約システムで24時間受付ができるようになり、予約数が増えました。スタッフの負担も大幅に減りました。",
    person: "店長 佐藤様",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 3,
    company: "フィットネスジム アクティブ",
    industry: "スポーツジム",
    logo: "💪",
    challenge: "会員とのコミュニケーション",
    solution: "チャット機能とプッシュ通知",
    results: [
      { label: "問い合わせ対応率", value: "95%", suffix: "向上" },
      { label: "会員継続率", value: "25%", suffix: "向上" },
    ],
    testimonial: "チャットで会員の方と直接やり取りできるようになり、信頼関係が深まりました。退会率も下がっています。",
    person: "マネージャー 山田様",
    color: "from-emerald-400 to-teal-500",
  },
];

const stats = [
  { value: "500+", label: "導入店舗数", icon: "🏪" },
  { value: "4.8", label: "平均満足度", icon: "⭐" },
  { value: "3ヶ月", label: "効果実感まで", icon: "📈" },
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

