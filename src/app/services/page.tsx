import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "サービス",
  description:
    "公式チームによるアプリ制作・運用支援サービス。オフィシャル制作・3hパック・エムスタFullの3つのサービスから選べます。",
  path: "/services",
});

const services = [
  {
    href: "/services/official",
    title: "オフィシャル制作",
    desc: "公式チームによるアプリ制作代行。標準機能内で、安心・安定した品質を担保。",
    price: "¥100,000〜",
    audience: "事業者・店舗・公式アプリを早く形にしたい方",
  },
  {
    href: "/services/3h-pack",
    title: "3hパック",
    desc: "当日オンライン上でリアルタイム制作。最短その日にアプリ完成。",
    price: "¥35,000 (半額) / 通常 ¥70,000",
    badge: "ローンチ記念",
    audience: "短期・低コストでまず形を作りたい方",
  },
  {
    href: "/services/full",
    title: "エムスタFull",
    desc: "エムスタをベースに独自要件・スクラッチ要件にも対応する受託開発。",
    price: "個別お見積り",
    audience: "独自機能・既存リプレイス・複雑な要件をお持ちの方",
  },
];

export default function ServicesPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/services" }])}
      audience="agency"
    >
      <PageHero
        eyebrow="Services"
        title={
          <>
            不安があれば、<span className="text-gradient">公式チーム</span>
            と一緒に。
          </>
        }
        description="エムスタはセルフ構築だけでなく、公式チームによる制作代行・伴走サービスもご用意しています。スピード・品質・要件に応じて最適な選択肢を。"
        actions={
          <>
            <Button
              href={CTA_LINKS.spirOfficial}
              external={CTA_LINKS.spirOfficial.startsWith("http")}
              variant="primary"
              size="lg"
              icon={<ChatIcon />}
            >
              サービスを相談する
            </Button>
            <SignupButton variant="secondary" size="lg" icon={<ArrowIcon />}>
              まずは2週間無料を試す
            </SignupButton>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-7"
                >
                  {s.badge ? (
                    <span className="absolute right-5 top-5 inline-flex rounded-full bg-accent-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                      {s.badge}
                    </span>
                  ) : null}
                  <p className="text-lg font-bold text-neutral-900 group-hover:text-primary-700">
                    {s.title}
                  </p>
                  <p className="mt-2 text-2xl font-black text-neutral-900">
                    {s.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {s.desc}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-neutral-500">
                    向いている方: {s.audience}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700">
                    詳しく見る
                    <svg
                      className="h-3.5 w-3.5"
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
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
