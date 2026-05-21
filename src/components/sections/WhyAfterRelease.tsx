"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const challenges = [
  {
    no: "01",
    issue: "情報の更新が止まる",
    description: "リリース後、毎週のように発生する情報更新。コードを触らずに進められないと、すぐに更新が滞ります。",
    answer: "投稿コンテンツ・固定コンテンツ・お知らせを管理画面から即時更新。プログラミング不要でユーザーを退屈させません。",
    icon: "freeze",
  },
  {
    no: "02",
    issue: "ユーザーへの到達率が低い",
    description: "アプリを開いてもらえなければ、情報は届きません。多チャネルへの配信を後付けで作るのは大変です。",
    answer: "プッシュ通知 / メール配信 / ポップアップ / SNSリンクが標準搭載。セグメント配信で到達率も最適化できます。",
    icon: "reach",
  },
  {
    no: "03",
    issue: "改善の打ち手が分からない",
    description: "どの機能が使われているか・どこで離脱しているかが見えないと、改善のしようがありません。",
    answer: "標準分析 + Google Analytics 4 連携。新規登録・利用停止・スタンプ・DLまで多角的に可視化します。",
    icon: "analyze",
  },
  {
    no: "04",
    issue: "収益化の仕組みが整わない",
    description: "リリースしただけではマネタイズできません。EC・課金・広告を後から組み込むのは負担が重い。",
    answer: "EC / アプリ内課金・会員ランク / AdMob まで標準搭載。リリース後の収益化を最短ルートで設計できます。",
    icon: "money",
  },
];

export default function WhyAfterRelease() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The truth about apps"
          title={<>リリース後にこそ、<span className="text-gradient">本当の課題</span>が訪れる。</>}
          description="アプリは作って終わりではありません。情報更新の停滞・到達率・改善・収益化—この4つの課題に、エムスタは標準CMSで答えます。"
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {challenges.map((c, i) => (
            <motion.li
              key={c.no}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="bg-neutral-900 px-6 py-5 text-white md:px-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 items-center justify-center rounded-full bg-accent-500 px-3 text-[11px] font-bold uppercase tracking-widest text-white">
                    課題 {c.no}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-bold md:text-2xl">{c.issue}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{c.description}</p>
              </div>
              <div className="px-6 py-5 md:px-8">
                <p className="text-xs font-bold uppercase tracking-widest text-primary-700">
                  エムスタの答え
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{c.answer}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
