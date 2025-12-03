"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "エムスタとは何ですか？",
    answer: "クリエイターのためではなく事業者（運営者）のために創られた「アプリ開発プラットフォーム」＆「アプリ運用管理CMS」サービスです。あなたのビジョン（想像）を価値（創造）へと昇華いたします。",
  },
  {
    question: "どのような規模の事業者が利用できますか？",
    answer: "小規模コミュニティやチーム、地域個人事業主から店舗、企業のDXまで、規模を問わずご利用いただけます。",
  },
  {
    question: "プログラミングの知識は必要ですか？",
    answer: "いいえ、プログラミング不要です。ノーコードでアプリの運用が内製化でき、編集作業や管理もかんたん直感的に行えます。運用に際しての学習コストを最小限に抑えています。",
  },
  {
    question: "どのような用途のアプリが作れますか？",
    answer: "店舗アプリ、社内アプリ、ストア公開のネイティブアプリからWebアプリまで、あらゆる業種のマーケティングやDXにご利用いただけます。地域アプリ、ファンアプリ、コミュニティアプリなども開発可能です。",
  },
  {
    question: "ネイティブアプリとWebアプリの違いは何ですか？",
    answer: "ネイティブアプリはApp Store / Google Playに公開する一般向けのアプリで、店舗アプリやファンアプリなどに最適です。WebアプリはURLでアクセスできるアプリで、ストア公開せずに運用が可能です。",
  },
  {
    question: "プライベートアプリとは何ですか？",
    answer: "ストアを経由せずテストアプリのまま運用することで、特定の企業内やコミュニティ内だけで運用するアプリです。社内アプリや会員限定アプリなどに最適です。",
  },
  {
    question: "既存のアプリからの切替は可能ですか？",
    answer: "はい、可能です。developerアカウント・アプリアイコン・アプリ名・アプリストアのURLの情報を引き継ぐことが可能です。コンテンツや顧客情報等のバックアップデータがあれば内部情報の移行も可能です。",
  },
  {
    question: "リリースまでどのくらいの期間がかかりますか？",
    answer: "プランにより異なります。スタータープランは最短14日〜、スタンダードプランは30日〜、カスタマイズプラン・エムスタFullは60日〜となります。所定の条件により変動する場合があります。",
  },
  {
    question: "リリース後のサポートはありますか？",
    answer: "はい、リリース後の相談窓口を設置しており、専用チームにていつでも対応サポートいたします。アプリのメンテナンスや対策も契約内容に応じて行います。",
  },
  {
    question: "既存のWEBサイトやシステムと連携できますか？",
    answer: "はい、iOS/Android対応で、既存のWEBサイト・システムとの連携が可能です。WEB資産の効率化・最大化を実現します。",
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

