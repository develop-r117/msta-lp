"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const featureGroups = [
  {
    id: "communication",
    name: "顧客コミュニケーション",
    icon: "💬",
    color: "from-blue-400 to-cyan-500",
    features: [
      {
        name: "プッシュ通知",
        description: "顧客に直接届く、パーソナライズされたメッセージ配信。全員一斉配信、セグメント配信、個別配信に対応。",
        icon: "🔔",
      },
      {
        name: "チャット",
        description: "1対1の直接対話で、顧客との信頼関係を構築。テキスト・画像の送受信、既読管理に対応。",
        icon: "💭",
      },
      {
        name: "問い合わせフォーム",
        description: "カスタマイズ可能なフォームで、必要な情報を効率的に収集。メール通知で見逃しを防止。",
        icon: "📝",
      },
    ],
  },
  {
    id: "loyalty",
    name: "リピーター育成",
    icon: "🎯",
    color: "from-pink-400 to-rose-500",
    features: [
      {
        name: "スタンプ",
        description: "スタンプカード機能で、リピーターを増やす。QRコード対応、特典設定、ループ機能も。",
        icon: "💎",
      },
      {
        name: "クーポン",
        description: "デジタルクーポンで、集客とリピートを促進。有効期限設定、カウントダウン表示に対応。",
        icon: "🎟️",
      },
      {
        name: "会員",
        description: "会員情報を一元管理し、パーソナライズされたサービスを提供。購入履歴、行動データも管理。",
        icon: "👤",
      },
    ],
  },
  {
    id: "content",
    name: "コンテンツ配信",
    icon: "📱",
    color: "from-violet-400 to-purple-500",
    features: [
      {
        name: "カタログギャラリー",
        description: "PDFカタログをアプリ内で閲覧可能に。商品カタログやパンフレットを快適に閲覧。",
        icon: "📚",
      },
      {
        name: "フォトギャラリー",
        description: "写真ギャラリーで、商品やサービスを魅力的に紹介。一覧表示と個別表示に対応。",
        icon: "📷",
      },
      {
        name: "ムービーギャラリー",
        description: "動画コンテンツで、商品やサービスを立体的に伝える。YouTube、Vimeo対応。",
        icon: "🎬",
      },
      {
        name: "ファイル",
        description: "各種ファイルをアプリ内で配布・共有。PDF、画像、その他ファイルに対応。",
        icon: "📁",
      },
    ],
  },
  {
    id: "info",
    name: "情報発信",
    icon: "📢",
    color: "from-amber-400 to-orange-500",
    features: [
      {
        name: "投稿コンテンツ",
        description: "お知らせやブログ記事を、カテゴリ別に管理。HTML形式で自由に編集可能。",
        icon: "📰",
      },
      {
        name: "固定コンテンツ",
        description: "会社情報や利用規約など、変更頻度の低いページを管理。リッチなページ作成が可能。",
        icon: "📌",
      },
      {
        name: "GPS店舗管理",
        description: "店舗情報を地図で表示し、来店をサポート。複数店舗対応、ナビ連携も。",
        icon: "📍",
      },
    ],
  },
  {
    id: "business",
    name: "ビジネス機能",
    icon: "💼",
    color: "from-emerald-400 to-teal-500",
    features: [
      {
        name: "EC（Eコマース）",
        description: "アプリ内で完結する、オンラインショップ機能。商品登録から注文管理、在庫管理まで。",
        icon: "🛒",
      },
      {
        name: "予約",
        description: "オンライン予約システムで、予約業務を効率化。カレンダー表示、自動メール通知対応。",
        icon: "📅",
      },
      {
        name: "Webビュー",
        description: "外部Webサイトをアプリ内で表示。既存のWebサイトの資産を活用しながら機能を拡張。",
        icon: "🌐",
      },
    ],
  },
  {
    id: "analytics",
    name: "連携・分析",
    icon: "📊",
    color: "from-indigo-400 to-blue-500",
    features: [
      {
        name: "SNSリンク",
        description: "各種SNSアカウントをアプリ内で一元表示。Facebook、Twitter/X、Instagram、TikTok対応。",
        icon: "🔗",
      },
      {
        name: "分析",
        description: "ユーザーの行動データを可視化し、マーケティングを最適化。データドリブンな意思決定を支援。",
        icon: "📈",
      },
    ],
  },
  {
    id: "customize",
    name: "カスタマイズ",
    icon: "⚙️",
    color: "from-slate-400 to-gray-600",
    features: [
      {
        name: "モバイルUI設定",
        description: "アプリの見た目を、管理画面から完全カスタマイズ。ロゴ、カラー、レイアウトを自由に変更。",
        icon: "🎨",
      },
      {
        name: "機能設定",
        description: "必要な機能だけを選んで、シンプルなアプリから始める。機能のON/OFFを自由に切り替え。",
        icon: "🔧",
      },
      {
        name: "アプリ公開",
        description: "構築したアプリを、App Store・Google Playに簡単に公開。バージョン管理も可能。",
        icon: "🚀",
      },
    ],
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeGroup, setActiveGroup] = useState(featureGroups[0].id);

  const currentGroup = featureGroups.find((g) => g.id === activeGroup)!;

  return (
    <section id="features" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-neutral-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-neutral-50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4"
          >
            21 FEATURES
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            <span className="text-gradient">21種類</span>の機能を自由に組み合わせ
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            必要な機能だけを選んで、あなただけのアプリを作成
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {featureGroups.map((group, index) => (
              <motion.button
                key={group.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setActiveGroup(group.id)}
                className={`px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
                  activeGroup === group.id
                    ? "bg-gradient-to-r text-white shadow-lg"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
                style={{
                  backgroundImage:
                    activeGroup === group.id
                      ? `linear-gradient(to right, var(--tw-gradient-stops))`
                      : undefined,
                  ...(activeGroup === group.id && {
                    ["--tw-gradient-from" as string]: group.color.includes("blue")
                      ? "#60a5fa"
                      : group.color.includes("pink")
                      ? "#f472b6"
                      : group.color.includes("violet")
                      ? "#a78bfa"
                      : group.color.includes("amber")
                      ? "#fbbf24"
                      : group.color.includes("emerald")
                      ? "#34d399"
                      : group.color.includes("indigo")
                      ? "#818cf8"
                      : "#94a3b8",
                    ["--tw-gradient-to" as string]: group.color.includes("cyan")
                      ? "#22d3ee"
                      : group.color.includes("rose")
                      ? "#fb7185"
                      : group.color.includes("purple")
                      ? "#c084fc"
                      : group.color.includes("orange")
                      ? "#fb923c"
                      : group.color.includes("teal")
                      ? "#2dd4bf"
                      : group.color.includes("blue")
                      ? "#3b82f6"
                      : "#64748b",
                  }),
                }}
              >
                <span className="mr-1.5">{group.icon}</span>
                {group.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Features grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentGroup.features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 border border-neutral-200 hover:border-transparent hover:shadow-xl transition-all duration-500"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentGroup.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-xl bg-neutral-100 group-hover:bg-white group-hover:shadow-lg flex items-center justify-center text-2xl mb-4 transition-all duration-300"
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-6 right-6 text-primary-500"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-500 mb-4">
            他にも多数の機能をご用意しています
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-primary-600 font-semibold hover:bg-primary-50 rounded-xl transition-colors"
          >
            <span>すべての機能について相談する</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

