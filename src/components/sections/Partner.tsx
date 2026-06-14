"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Tabs, { type TabItem } from "@/components/ui/Tabs";
import { Button, DownloadIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

const tabs: TabItem<"create" | "intro" | "template">[] = [
  {
    id: "create",
    label: "制作パートナー",
    content: (
      <PartnerTab
        title="クライアント向けにアプリ制作"
        description="プロモードを活用し、クライアント向けアプリを制作。自社の制作メニューに「アプリ制作」を追加できます。"
        bullets={[
          "自社クライアント向けにアプリ制作ができる",
          "プロモードで自由度の高い設計が可能",
          "完成後の運用はクライアント自身がCMSで対応",
        ]}
        accent="from-primary-400 to-accent-400"
      />
    ),
  },
  {
    id: "intro",
    label: "紹介パートナー",
    content: (
      <PartnerTab
        title="広告代理店・営業会社向け"
        description="紹介・販売・アフィリエイトプログラムとして参加できます。"
        bullets={[
          "紹介経由のアカウントから継続収益",
          "代理店としてのレベニューシェアを獲得",
          "アフィリエイト経由の獲得も対応",
        ]}
        accent="from-accent-400 to-primary-300"
      />
    ),
  },
  {
    id: "template",
    label: "テンプレート / コンポーネント販売",
    content: (
      <PartnerTab
        title="デザイン資産を販売できる"
        description="自社で制作したデザインパッケージ、コンポーネント、コンテンツの型を販売できます。"
        bullets={[
          "テンプレート / コンポーネント / コンテンツ販売",
          "業界特化テンプレートも展開可能",
          "マーケットプレイス上での流通が可能",
        ]}
        accent="from-primary-500 to-primary-800"
      />
    ),
  },
];

const ranks = [
  { name: "Bronze", rate: "15%", color: "from-amber-700 to-amber-800" },
  { name: "Silver", rate: "20%", color: "from-zinc-400 to-zinc-500" },
  { name: "Gold", rate: "25%", color: "from-yellow-500 to-amber-500" },
  { name: "Platinum", rate: "30%", color: "from-cyan-400 to-blue-500" },
  { name: "Legend", rate: "35%", color: "from-fuchsia-500 to-violet-600" },
];

const points = [
  "自社クライアント向けにアプリ制作ができる",
  "ライセンス利用料のレベニューシェアを受けられる",
  "テンプレートやコンポーネントを販売できる",
  "パートナーランクに応じて還元率が上がる",
  "エムスタ経済圏内で認知・信用力を獲得できる",
  "AI時代の新しい制作ビジネス環境として活用できる",
];

export default function Partner() {
  return (
    <section id="partner" className="section-padding relative bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Partner program"
          title={
            <>
              エムスタ上で、
              <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                アプリビジネス
              </span>
              を始める。
            </>
          }
          description="制作会社、開発会社、デザイン会社、個人クリエイター、代理店は、エムスタを活用してアプリ制作サービスを展開できます。AI時代に、制作の価値は変わっていきます。"
          tone="dark"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {points.map((p) => (
              <li
                key={p}
                className="card-on-dark flex items-start gap-3 rounded-2xl p-4 text-sm text-white"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-400 to-primary-400 text-primary-900">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/20 bg-white/5 p-7 text-white shadow-xl md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-400">
                Lead capture
              </p>
              <h3 className="mt-2 text-2xl font-bold leading-tight">
                パートナー向け資料
              </h3>
              <p className="mt-3 text-sm text-on-dark-muted">
                制度概要、レベニューシェア、対象者、活用イメージなどをまとめた資料をお送りします。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href="#partner-doc"
                  variant="partner"
                  size="md"
                  icon={<DownloadIcon />}
                >
                  資料をダウンロード
                </Button>
                <Button
                  href={CTA_LINKS.spirGeneral}
                  external={CTA_LINKS.spirGeneral.startsWith("http")}
                  variant="secondary"
                  size="md"
                  icon={<ChatIcon />}
                  className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white"
                >
                  オンラインで相談する
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs items={tabs} ariaLabel="パートナー種別" tone="dark" />
        </div>

        {/* Rank table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="card-on-dark mt-12 overflow-hidden rounded-3xl shadow-xl"
        >
          <div className="border-b border-white/10 bg-white/5 px-6 py-4">
            <h3 className="text-base font-bold text-white">レベニューシェア</h3>
            <p className="mt-1 text-xs text-on-dark-muted">
              公開アプリ数や貢献度に応じて、ランクと還元率が向上していきます。
            </p>
          </div>
          <ul className="grid divide-y divide-white/10 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
            {ranks.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between gap-4 px-5 py-5 sm:flex-col sm:items-start"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${r.color} text-white shadow-md`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                  <span className="text-sm font-bold text-white">{r.name}</span>
                </div>
                <p className="text-xl font-black text-accent-400 sm:mt-2">
                  {r.rate}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function PartnerTab({
  title,
  description,
  bullets,
  accent,
}: {
  title: string;
  description: string;
  bullets: string[];
  accent: string;
}) {
  return (
    <div className="card-on-dark grid gap-6 rounded-3xl p-7 shadow-xl md:grid-cols-12 md:p-8">
      <div className="md:col-span-7">
        <h4
          className={`bg-gradient-to-r ${accent} bg-clip-text text-2xl font-bold text-transparent md:text-3xl`}
        >
          {title}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-on-dark-muted md:text-base">
          {description}
        </p>
      </div>
      <ul className="md:col-span-5 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-white">
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${accent}`}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
