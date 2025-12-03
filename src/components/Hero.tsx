"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const badges = [
  { icon: "✓", text: "初期費用無料" },
  { icon: "✓", text: "専門知識不要" },
  { icon: "✓", text: "最短3日で公開" },
];

const stats = [
  { value: "500+", label: "導入店舗数" },
  { value: "3日", label: "平均構築期間" },
  { value: "95%", label: "顧客満足度" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden mesh-gradient noise"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-primary-200/40 to-primary-300/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent-200/30 to-accent-300/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-primary-100/50 to-accent-100/30 blur-3xl"
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Announcement badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-lg shadow-neutral-900/5 border border-neutral-200/50 mb-8"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              <span className="text-sm font-medium text-neutral-700">
                14日間の無料トライアル実施中
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight"
            >
              <span className="block">あなたの店舗・</span>
              <span className="block">コミュニティ専用アプリを、</span>
              <span className="block mt-2">
                <span className="text-gradient">まるごと自動生成。</span>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-xl mx-auto lg:mx-0"
            >
              プログラミング不要。数時間で立ち上げられる
              <br className="hidden sm:block" />
              SaaSプラットフォーム
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-neutral-100"
                >
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">
                    {badge.icon}
                  </span>
                  <span className="text-sm font-medium text-neutral-700">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-xl shadow-primary-500/30 overflow-hidden"
              >
                <span className="relative z-10">無料で始める</span>
                <svg
                  className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.a
                href="#features"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-700 font-semibold rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:text-primary-600 shadow-lg transition-all"
              >
                <span>機能を見る</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-200/50"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visual Element - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Phone mockup */}
            <div className="relative mx-auto w-[320px]">
              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -left-16 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 shadow-xl shadow-primary-500/30 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-12 w-16 h-16 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 shadow-xl shadow-accent-500/30 flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 -right-20 w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">4.8</div>
                  <div className="flex justify-center text-yellow-400 text-xs">★★★★★</div>
                  <div className="text-xs text-neutral-500 mt-1">評価</div>
                </div>
              </motion.div>

              {/* Main phone */}
              <div className="relative bg-neutral-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-neutral-900 rounded-b-2xl z-10" />
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* App Header */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <span className="text-xl font-bold">M</span>
                      </div>
                      <div>
                        <div className="font-bold">カフェ サクラ</div>
                        <div className="text-sm text-white/80">公式アプリ</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      いつもご利用ありがとうございます！
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    {/* Stamp Card */}
                    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-neutral-800">スタンプカード</span>
                        <span className="text-sm text-primary-600">7/10</span>
                      </div>
                      <div className="flex gap-2">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full ${
                              i < 7
                                ? "bg-primary-500"
                                : "bg-neutral-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-4 gap-2">
                      {["🎟️", "📅", "💬", "🛒"].map((emoji, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-xl bg-neutral-100 flex items-center justify-center text-xl"
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>

                    {/* News */}
                    <div className="bg-neutral-50 rounded-xl p-3">
                      <div className="text-xs text-primary-600 font-medium mb-1">NEW</div>
                      <div className="font-medium text-sm text-neutral-800">
                        春の新メニュー登場！
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        季節限定の桜ラテをご用意しました
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="flex justify-around py-4 border-t border-neutral-100">
                    {["🏠", "🎁", "📍", "👤"].map((emoji, i) => (
                      <div
                        key={i}
                        className={`text-xl ${i === 0 ? "opacity-100" : "opacity-40"}`}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-neutral-300 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-neutral-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

