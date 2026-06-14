import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import { Button, ChatIcon, ArrowIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "3hパック (ローンチ記念半額)",
  description:
    "事前ヒアリングをもとに、当日オンラインで3時間リアルタイム制作。最短で当日にアプリが完成。ローンチ記念半額の¥35,000で公式チームにご依頼いただけます。",
  path: "/services/3h-pack",
});

export default function ThreeHPackPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/services" },
        { href: "/services/3h-pack" },
      ])}
      audience="general"
      bottomCtaTitle="3hパックで、まず形にする"
      bottomCtaDescription="リアルタイムに、その日のうちにアプリを完成させたい方。当日制作の時間を予約してください。"
    >
      <PageHero
        eyebrow="3h pack"
        variant="dark"
        title={
          <>
            3時間で、まずアプリを<span className="text-gradient">かたちに</span>
            。
          </>
        }
        description="事前にヒアリングシートをご提出いただき、当日オンラインで詳細をお聞きしながら、公式チームがリアルタイムでアプリを制作。最短その日にアプリが完成します。"
        actions={
          <>
            <Button
              href={CTA_LINKS.spirThreeHour}
              external={CTA_LINKS.spirThreeHour.startsWith("http")}
              variant="primary"
              size="lg"
              icon={<ChatIcon />}
            >
              3hパックを予約する
            </Button>
            <Button
              href="/services/official"
              variant="secondary"
              size="lg"
              icon={<ArrowIcon />}
              className="!border-white/0 !bg-white !text-neutral-900"
            >
              じっくり制作したい場合
            </Button>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-primary-300 bg-gradient-to-br from-primary-500 to-primary-700 p-7 text-white shadow-xl md:p-10">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold ring-1 ring-white/30">
              ローンチ記念半額
            </span>
            <h2 className="mt-5 text-3xl font-black md:text-4xl">
              ¥35,000 / 回
            </h2>
            <p className="mt-2 text-sm font-semibold text-white/80">
              通常 ¥70,000 → ローンチ期間中の半額
            </p>
            <ul className="mt-6 grid gap-2 text-sm md:grid-cols-2">
              <li className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
                事前ヒアリングシートをご提供
              </li>
              <li className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
                当日オンライン3時間でリアルタイム制作
              </li>
              <li className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
                標準機能の組み合わせで完結
              </li>
              <li className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
                当日中の完成を目指します
              </li>
            </ul>
            <div className="mt-7">
              <Button
                href={CTA_LINKS.spirThreeHour}
                external={CTA_LINKS.spirThreeHour.startsWith("http")}
                variant="secondary"
                size="lg"
                icon={<ChatIcon />}
              >
                3hパックを予約する
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { step: "01", title: "予約", desc: "Spirで日時を選択" },
              {
                step: "02",
                title: "事前準備",
                desc: "ヒアリングシートにご記入",
              },
              {
                step: "03",
                title: "当日制作",
                desc: "オンラインで一緒に作って公開",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-primary-700">
                  {s.step}
                </span>
                <p className="mt-2 text-lg font-bold text-neutral-900">
                  {s.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
