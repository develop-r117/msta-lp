"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "課題・目的の整理",
    description: "アプリ毎のビジョンや課題をしっかりとヒアリング",
    icon: "🎯",
  },
  {
    step: "02",
    title: "方向性の決定",
    description: "より最適な方向性や道筋をご提案",
    icon: "🧭",
  },
  {
    step: "03",
    title: "提案・開発",
    description: "ご依頼者様の構想を具現化し価値へと昇華",
    icon: "🛠️",
  },
  {
    step: "04",
    title: "運用整理",
    description: "運用体制の整備と引き継ぎサポート",
    icon: "📋",
  },
  {
    step: "05",
    title: "運用サポート",
    description: "リリース後も専用チームがいつでも対応",
    icon: "💬",
  },
];

export default function Support() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="support" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary-50 to-accent-50 blur-3xl opacity-50" />
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
            SUPPORT
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            <span className="text-gradient">伴走型支援</span>で安心
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            専門スタッフがアプリ毎のビジョンや課題をしっかりとヒアリングさせていただき、
            より最適な方向性や道筋を示します。<br className="hidden md:block" />
            リリースまでアプリのプロが<span className="font-semibold text-primary-600">先導</span>いたします。
          </p>
        </motion.div>

        {/* Process flow */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-accent-400 transform -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100 text-center relative z-10 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full">
                    <span className="text-xs font-bold text-white">STEP {step.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4 mt-2">{step.icon}</div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-neutral-900 mb-2">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-neutral-600">{step.description}</p>
                </div>

                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "専任チーム体制",
              description: "お客様ごとに専任チームがつき、プロジェクト全体を一貫してサポート",
              icon: "👥",
            },
            {
              title: "リリース後も安心",
              description: "リリース後の相談窓口を設置。アプリのメンテナンスや対策も対応",
              icon: "🛡️",
            },
            {
              title: "いつでも相談可能",
              description: "専用チームにていつでも対応サポート。お気軽にご相談ください",
              icon: "💬",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-neutral-900 mb-2">{item.title}</h4>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

