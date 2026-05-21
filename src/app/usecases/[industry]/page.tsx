import { notFound } from "next/navigation";
import Image from "next/image";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { fetchUsecaseByIndustry, fetchUsecases } from "@/lib/microcms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const usecases = await fetchUsecases();
  return usecases.map((u) => ({ industry: u.industry }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const u = await fetchUsecaseByIndustry(industry);
  if (!u) {
    return buildMetadata({
      title: "ユースケース",
      description: "エムスタのユースケース",
      path: `/usecases/${industry}`,
    });
  }
  return buildMetadata({
    title: `${u.title}向けのアプリ活用`,
    description: u.description,
    path: `/usecases/${u.industry}`,
    ogImage: u.cover?.url,
  });
}

export default async function UsecaseDetailPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const u = await fetchUsecaseByIndustry(industry);
  if (!u) notFound();

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/usecases" },
        { href: `/usecases/${u.industry}`, label: u.title },
      ])}
      audience="general"
    >
      <PageHero
        eyebrow={u.industry.toUpperCase()}
        title={<>{u.title}向けのアプリ活用</>}
        description={u.description}
        actions={
          <>
            <Button href={CTA_LINKS.signup} external={CTA_LINKS.signup.startsWith("http")} variant="primary" size="lg" icon={<ArrowIcon />}>
              2週間無料で試す
            </Button>
            <Button href={CTA_LINKS.spirGeneral} external={CTA_LINKS.spirGeneral.startsWith("http")} variant="secondary" size="lg" icon={<ChatIcon />}>
              業種別に相談する
            </Button>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {u.cover ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
              <Image src={u.cover.url} alt={u.title} fill className="object-cover" sizes="(max-width: 768px) 95vw, 70vw" priority />
            </div>
          ) : null}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-base font-bold text-neutral-900 md:text-lg">代表的な活用シナリオ</h2>
              <ul className="mt-4 grid gap-2">
                {u.scenarios.map((s) => (
                  <li key={s} className="flex items-center gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700 ring-1 ring-neutral-100">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-base font-bold text-neutral-900 md:text-lg">活用機能の組み合わせ</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {u.activeFeatures.map((f) => (
                  <li key={f} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-600 ring-1 ring-neutral-100">
                掲載機能はエムスタの標準搭載機能のみで構成可能です。具体的な構築サポートは、オフィシャル制作・3hパックでも承っております。
              </div>
            </div>
          </div>

          {u.body ? (
            <div
              className="prose prose-neutral mx-auto mt-12 max-w-none [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold"
              dangerouslySetInnerHTML={{ __html: u.body }}
            />
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
