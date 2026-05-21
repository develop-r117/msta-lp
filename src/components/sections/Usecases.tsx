"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Tabs, { type TabItem } from "@/components/ui/Tabs";

type UsecaseGroup = {
  id: string;
  label: string;
  description: string;
  items: string[];
};

const groups: UsecaseGroup[] = [
  {
    id: "shop",
    label: "店舗・施設",
    description: "会員アプリ・予約・クーポン・来店促進など、店舗運営をまるごと支援。",
    items: ["会員アプリ", "予約アプリ", "クーポン配信", "来店管理", "イベント", "コンテンツ配信"],
  },
  {
    id: "edu",
    label: "教育・スクール",
    description: "学習・お知らせ・出欠・コミュニティの中心となるアプリ。",
    items: ["学習アプリ", "お知らせ配信", "資料共有", "出欠管理", "コミュニティ運営"],
  },
  {
    id: "med",
    label: "医療・団体",
    description: "会員向けの安全な情報インフラを構築。",
    items: ["会員向け情報インフラ", "災害時連絡", "アンケート", "ファイル共有", "行事予定"],
  },
  {
    id: "creator",
    label: "クリエイター・コミュニティ",
    description: "ファンとの距離を近づけ、限定情報や告知の場として活用。",
    items: ["ファンコミュニティ", "コンテンツ配信", "会員限定情報", "イベント告知"],
  },
  {
    id: "biz",
    label: "企業・社内利用",
    description: "業務連絡、社内ポータル、プライベートアプリとして展開。",
    items: ["社内ポータル", "ナレッジ共有", "プライベートアプリ", "業務連絡"],
  },
];

const tabs: TabItem<string>[] = groups.map((g) => ({
  id: g.id,
  label: g.label,
  content: (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm leading-relaxed text-neutral-700 md:text-base">{g.description}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {g.items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-800"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  ),
}));

export default function Usecases() {
  return (
    <section id="usecases" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Use cases"
          title={<>さまざまな業種・<span className="text-gradient">目的に対応</span>。</>}
          description="店舗・教育・医療・クリエイター・社内利用まで。エムスタは業種を選ばず、目的に合わせて自由に組み立てられます。"
        />
        <div className="mt-12">
          <Tabs items={tabs} ariaLabel="業種別ユースケース" />
        </div>
      </div>
    </section>
  );
}
