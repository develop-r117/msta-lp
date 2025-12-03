"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    problem: "アプリ開発の費用が高い",
    solution: "低価格でのリリースでリスクを低減。テストマーケティングにも最適。月額9,800円から始められます。",
    icon: "💰",
    stat: "低価格",
    statLabel: "リスク低減",
  },
  {
    problem: "iOS・Android両方に対応したい",
    solution: "iOS/Android両対応。既存のWEBサイト・システムとの連携も可能で、WEB資産の効率化・最大化を実現。",
    icon: "📱",
    stat: "両OS",
    statLabel: "ワンソースで対応",
  },
  {
    problem: "アプリ開発の技術がない",
    solution: "プログラミング不要で運用が簡易化。ノーコードでアプリの運用が内製化でき、編集作業や管理もかんたん直感的に。",
    icon: "🚀",
    stat: "ノーコード",
    statLabel: "専門知識不要",
  },
  {
    problem: "リリース後のサポートが心配",
    solution: "リリース後の相談窓口を設置。専用チームにていつでも対応サポート。安心してアプリ運用を続けられます。",
    icon: "🛡️",
    stat: "専任",
    statLabel: "サポートチーム",
  },
  {
    problem: "業務効率を上げたい",
    solution: "業務・学習・予約などの効率化を実現。能動的かつ効率的なマーケティングで事業成長をサポート。",
    icon: "📈",
    stat: "最短2週間",
    statLabel: "でリリース可能",
  },
];

export default function Problems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-[0.03]">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
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
            className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4"
          >
            SOLUTIONS
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            こんな<span className="text-gradient">課題</span>を解決します
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            店舗・コミュニティ運営者が抱える課題を、エムスタがまとめて解決
          </p>
        </motion.div>

        {/* Problems list */}
        <div className="space-y-6">
          {problems.map((item, index) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100">
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Problem side */}
                  <div className="lg:col-span-4 flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-2xl lg:text-3xl shrink-0"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <div className="text-xs font-semibold text-accent-500 uppercase tracking-wider mb-1">
                        課題
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-neutral-800">
                        {item.problem}
                      </h3>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Solution side */}
                  <div className="lg:col-span-5">
                    <div className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-2">
                      解決策
                    </div>
                    <p className="text-neutral-600 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2">
                    <div className="text-3xl lg:text-4xl font-bold text-gradient">
                      {item.stat}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {item.statLabel}
                    </div>
                  </div>
                </div>

                {/* Progress bar decoration */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-6 h-1 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 origin-left"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-105"
          >
            <span>課題を相談する</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

