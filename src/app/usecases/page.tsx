import Link from "next/link";
import Image from "next/image";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import { fetchUsecases } from "@/lib/microcms";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "業種別ユースケース",
  description:
    "店舗・教育・医療・コミュニティ・社内利用まで、業種ごとの活用シナリオと適した機能の組み合わせをご紹介します。",
  path: "/usecases",
});

export default async function UsecasesPage() {
  const usecases = await fetchUsecases();

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/usecases" }])}
      audience="general"
    >
      <PageHero
        eyebrow="Use cases"
        title={<>さまざまな業種・<span className="text-gradient">目的に対応</span>。</>}
        description="エムスタは業種を選ばず、目的に合わせて自由に組み立てられます。各業種の代表的な活用シナリオから、自社プロジェクトのヒントを見つけてください。"
        actions={
          <>
            <Button href={CTA_LINKS.signup} external={CTA_LINKS.signup.startsWith("http")} variant="primary" size="lg" icon={<ArrowIcon />}>
              2週間無料で始める
            </Button>
            <Button href={CTA_LINKS.spirGeneral} external={CTA_LINKS.spirGeneral.startsWith("http")} variant="secondary" size="lg" icon={<ChatIcon />}>
              業種別に相談する
            </Button>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-6 md:grid-cols-2">
            {usecases.map((u) => (
              <li key={u.id}>
                <Link
                  href={`/usecases/${u.industry}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  {u.cover ? (
                    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                      <Image src={u.cover.url} alt={u.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 90vw, 45vw" />
                    </div>
                  ) : null}
                  <div className="flex grow flex-col p-6 md:p-7">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-700">{u.industry}</span>
                    <h2 className="mt-2 text-xl font-bold text-neutral-900 group-hover:text-primary-700 md:text-2xl">{u.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{u.description}</p>

                    <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">活用シナリオ</p>
                    <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                      {u.scenarios.map((s) => (
                        <li key={s} className="flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700">
                          <span className="h-1 w-1 rounded-full bg-primary-500" />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700">
                      詳しく見る
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
