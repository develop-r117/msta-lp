"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "プログラミングの知識は必要ですか？",
    answer: "いいえ、一切必要ありません。管理画面から直感的に操作でき、専門知識がなくてもアプリの構築・運用が可能です。",
  },
  {
    question: "どのくらいの期間でアプリを公開できますか？",
    answer: "最短3日で公開可能です。基本的な設定だけで、すぐに運用を開始できます。App Store・Google Playへの審査サポートも行っています。",
  },
  {
    question: "初期費用はかかりますか？",
    answer: "いいえ、初期費用は無料です。セットアップ費用も不要で、月額料金のみで運用できます。",
  },
  {
    question: "既存のWebサイトやSNSと連携できますか？",
    answer: "はい、Webビュー機能で既存のWebサイトをアプリ内で表示できます。SNSリンク機能で各SNSへのリンクも一元管理できます。",
  },
  {
    question: "会員数の制限はありますか？",
    answer: "プランによって異なります。スタンダードプランは1,000人まで、プロプランは5,000人まで利用可能です。それ以上はエンタープライズプランをご検討ください。",
  },
  {
    question: "アプリの審査に時間がかかりますか？",
    answer: "App Store・Google Playの審査は通常1-2週間程度かかりますが、審査のサポートも行っています。審査で問題が発生した場合も、私たちがサポートいたします。",
  },
  {
    question: "解約はいつでもできますか？",
    answer: "はい、いつでも解約可能です。解約後も30日間はデータにアクセスできます。違約金などもございません。",
  },
  {
    question: "サポートはどのように受けられますか？",
    answer: "メールサポート、電話サポート（プロプラン以上）、専任サポート（エンタープライズプラン）を提供しています。導入時のサポートも充実しています。",
  },
  {
    question: "カスタマイズは可能ですか？",
    answer: "モバイルUI設定機能で、デザインやレイアウトを自由にカスタマイズできます。より高度なカスタマイズが必要な場合は、エンタープライズプランをご検討ください。",
  },
  {
    question: "プッシュ通知はどのくらい配信できますか？",
    answer: "配信回数に制限はありません。全員一斉配信、セグメント配信、個別配信など、様々な配信方法に対応しています。",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-neutral-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-600 font-bold text-sm shrink-0">
            {index + 1}
          </span>
          <span className="font-semibold text-neutral-900 text-lg">{faq.question}</span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0"
        >
          <svg
            className="w-5 h-5 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-12 pr-4">
              <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-100/30 to-primary-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-accent-100/30 to-accent-200/20 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
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
            FAQ
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            よくある<span className="text-gradient">質問</span>
          </h2>
          <p className="text-lg text-neutral-600">
            ご不明点はお気軽にお問い合わせください
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm border border-neutral-200 divide-y divide-neutral-200 px-6 md:px-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-4">
            その他のご質問やご相談はこちら
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-105"
          >
            <span>お問い合わせ</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

