"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Button,
  ArrowIcon,
  DownloadIcon,
  ChatIcon,
} from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";

/**
 * トップページ専用のダイジェスト系セクション群。
 * 二系統の動線（一般ユーザー / 代理店ユーザー）を分かりやすく示す。
 */

export function TwoPathSplit() {
  const cards = [
    {
      audience: "一般ユーザー",
      heading: "アプリを作る・運用する",
      description:
        "店舗・教育・医療・コミュニティ・社内ツールまで。CMS標準搭載で、リリース後の運用までこなせます。",
      ctaPrimary: {
        label: "2週間無料で始める",
        signup: true as const,
        icon: ArrowIcon,
      },
      ctaSecondary: {
        label: "プロダクトを見る",
        href: "/product",
        icon: ArrowIcon,
      },
      gradient: "from-primary-500 to-primary-600",
      pills: ["2週間無料", "初期費用0円", "Web/iOS/Android"],
    },
    {
      audience: "代理店・制作会社",
      heading: "アプリビジネスを作る",
      description:
        "プロモード・テンプレート販売・レベニューシェアで、AI時代の制作ビジネスを継続収益化。",
      ctaPrimary: {
        label: "パートナー資料DL",
        href: "/partners/document",
        external: false,
        icon: DownloadIcon,
      },
      ctaSecondary: {
        label: "オンラインで相談",
        href: CTA_LINKS.spirGeneral,
        external: true,
        icon: ChatIcon,
      },
      gradient: "from-neutral-900 to-neutral-700",
      pills: ["最大35%還元", "テンプレ販売", "クライアント案件"],
    },
  ];

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Two paths"
          title={
            <>
              あなたに合った<span className="text-gradient">入り口</span>から。
            </>
          }
          description="一般ユーザーと代理店ユーザーで、最初に進むべき道が違います。エムスタは両方の動線を等しくサポートします。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => {
            const Icon1 = c.ctaPrimary.icon;
            const Icon2 = c.ctaSecondary.icon;
            return (
              <motion.article
                key={c.audience}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${c.gradient}`}
                />
                <span className="inline-flex w-fit items-center rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                  {c.audience}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-neutral-900 md:text-3xl">
                  {c.heading}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed text-neutral-600 md:text-base">
                  {c.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {c.pills.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                  {"signup" in c.ctaPrimary && c.ctaPrimary.signup ? (
                    <SignupButton
                      variant="primary"
                      size="md"
                      className="flex-1"
                    />
                  ) : (
                    <Button
                      href={c.ctaPrimary.href}
                      external={c.ctaPrimary.external}
                      variant="primary"
                      size="md"
                      icon={<Icon1 />}
                      className="flex-1"
                    >
                      {c.ctaPrimary.label}
                    </Button>
                  )}
                  <Button
                    href={c.ctaSecondary.href}
                    external={c.ctaSecondary.external}
                    variant="secondary"
                    size="md"
                    icon={<Icon2 />}
                    className="flex-1"
                  >
                    {c.ctaSecondary.label}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductGrid() {
  const items = [
    {
      href: "/product/cms",
      title: "CMS / 管理ダッシュボード",
      desc: "リリース後の更新・運用までCMSで。",
    },
    {
      href: "/product/modes",
      title: "かんたん / プロモード",
      desc: "初心者にも、プロにも、最適なUIを。",
    },
    {
      href: "/product/features",
      title: "全機能一覧",
      desc: "情報発信・会員・予約・通知・拡張まで。",
    },
    {
      href: "/product/ai",
      title: "AI / エージェント",
      desc: "制作と運用を支援するAIを順次搭載。",
    },
    {
      href: "/product/team",
      title: "チーム運用 / 権限",
      desc: "組織でも安全に運用できる権限ロール。",
    },
    {
      href: "/marketplace",
      title: "マーケットプレイス",
      desc: "テンプレ・コンポーネントが流通する場へ。",
    },
  ];

  return (
    <section className="section-padding relative bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore the product"
          title={
            <>
              プロダクトの<span className="text-gradient">全体像</span>を見る
            </>
          }
          description="単なるノーコードではない、CMSで運用・改善・収益化までできるプラットフォーム。"
        />
        <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.li
              key={it.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Link
                href={it.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
              >
                <div>
                  <p className="text-base font-bold text-neutral-900 group-hover:text-primary-700">
                    {it.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    {it.desc}
                  </p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-500 transition-colors group-hover:bg-primary-100 group-hover:text-primary-700">
                  <svg
                    className="h-4 w-4"
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
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PartnerStrip() {
  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-primary-700 to-accent-600 p-8 text-white shadow-2xl md:p-12">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                For Partners
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-normal md:text-3xl lg:text-4xl">
                エムスタ上で、
                <br className="hidden md:block" />
                アプリビジネスを始める。
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
                制作会社・開発会社・代理店・クリエイター向け。レベニューシェアで継続収益、テンプレート販売で新しい収益機会を。
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {[
                  "Bronze 15%",
                  "Silver 20%",
                  "Gold 25%",
                  "Platinum 30%",
                  "Legend 35%",
                ].map((r) => (
                  <li
                    key={r}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/90 ring-1 ring-white/20"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:col-span-5">
              <Button
                href="/partners/document"
                variant="primary"
                size="lg"
                icon={<DownloadIcon />}
                fullWidth
              >
                パートナー資料DL
              </Button>
              <Button
                href="/partners"
                variant="secondary"
                size="lg"
                icon={<ArrowIcon />}
                fullWidth
                className="!border-white/0 !bg-white !text-neutral-900"
              >
                パートナー制度を見る
              </Button>
              <Button
                href={CTA_LINKS.spirGeneral}
                external={CTA_LINKS.spirGeneral.startsWith("http")}
                variant="ghost"
                size="lg"
                icon={<ChatIcon />}
                fullWidth
                className="!text-white hover:!bg-white/10"
              >
                オンラインで相談
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceMix() {
  const services = [
    {
      href: "/services/official",
      title: "オフィシャル制作",
      price: "¥100,000〜",
      desc: "公式チームが標準機能内で制作代行。企画から構築までサポート。",
    },
    {
      href: "/services/3h-pack",
      title: "3hパック",
      price: "¥35,000 (半額)",
      desc: "当日オンラインでリアルタイム制作。最短その日に完成。",
      badge: "ローンチ記念半額",
    },
    {
      href: "/services/full",
      title: "エムスタFull",
      price: "個別見積",
      desc: "独自機能・高度なUI・既存リプレイスにも対応するスクラッチ要件。",
    },
  ];

  return (
    <section className="section-padding relative bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              不安があれば、<span className="text-gradient">公式チーム</span>
              と一緒に。
            </>
          }
          description="セルフ構築だけでなく、オフィシャル制作・3hパック・エムスタFullで、規模と要件に応じた支援を提供します。"
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.li
              key={s.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {s.badge ? (
                <span className="absolute right-4 top-4 inline-flex rounded-full bg-accent-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  {s.badge}
                </span>
              ) : null}
              <Link href={s.href} className="block">
                <p className="text-lg font-bold text-neutral-900">{s.title}</p>
                <p className="mt-2 text-2xl font-black text-neutral-900">
                  {s.price}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {s.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                  詳しく見る
                  <svg
                    className="h-4 w-4"
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
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
