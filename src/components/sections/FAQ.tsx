"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";

const items: AccordionItem[] = [
  {
    id: "no-code",
    question: "プログラミングができなくても使えますか？",
    answer:
      "はい。かんたんモードでは、専門知識がなくてもアプリ制作・運用ができる設計を目指しています。",
  },
  {
    id: "platforms",
    question: "iOS / Androidの両方に対応できますか？",
    answer:
      "はい。Webアプリ、iOS、Androidに対応可能です。デスクトップファースト設定にも対応予定です。",
  },
  {
    id: "publish",
    question: "公開にはデベロッパー登録が必要ですか？",
    answer:
      "ネイティブアプリの公開には、Apple / Googleのデベロッパー登録が必要です。サポートメニューもご用意しています。",
  },
  {
    id: "production",
    question: "制作を依頼できますか？",
    answer:
      "はい。標準代行のオフィシャル制作、即日3hパック、スクラッチ開発のエムスタFullをご用意しています。",
  },
  {
    id: "agency",
    question: "代理店として利用できますか？",
    answer:
      "はい。パートナー制度およびレベニューシェア制度を設計しています。詳細はパートナー資料をご確認ください。",
  },
  {
    id: "custom",
    question: "独自機能の開発はできますか？",
    answer:
      "はい。エムスタFullにて個別要件に対応可能です。Spir経由で詳細をヒアリングいたします。",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-padding relative bg-neutral-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              よくある<span className="text-gradient">ご質問</span>
            </>
          }
          description="制作 / 公開 / パートナーに関する代表的な質問をまとめました。"
        />

        <div className="mt-12">
          <Accordion items={items} analyticsCategory="faq_home" />
        </div>
      </div>
    </section>
  );
}
