import { notFound } from "next/navigation";
import Image from "next/image";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";
import { getUsecaseByIndustry } from "@/lib/cms-data";
import { buildMetadata } from "@/lib/seo";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const u = await getUsecaseByIndustry(industry);
  if (!u) {
    return buildMetadata({
      title: "ユースケース",
      description: "エムスタのユースケース",
      path: `/usecases/${industry}`,
    });
  }
  const base = buildMetadata({
    title: `${u.title}向けのアプリ活用`,
    description: u.description,
    path: `/usecases/${u.industry}`,
    ogImage: u.cover?.url,
  });
  if (u.cardOnly) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function UsecaseDetailPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const u = await getUsecaseByIndustry(industry);
  if (!u) notFound();

  if (u.cardOnly) {
    return (
      <SiteShell
        breadcrumbs={buildBreadcrumb([
          { href: "/usecases" },
          { href: `/usecases/${u.industry}`, label: u.title },
        ])}
        audience="general"
      >
        <article>
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <span className="inline-block rounded-full bg-sky-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              Coming soon
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
              {u.title}向けのアプリ活用
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
              このユースケースの詳細は現在準備中です。近日公開予定ですので、もうしばらくお待ちください。
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href="/usecases"
                variant="secondary"
                size="lg"
                icon={<ArrowIcon />}
              >
                他のユースケースを見る
              </Button>
              <Button
                href={CTA_LINKS.spirGeneral}
                external={CTA_LINKS.spirGeneral.startsWith("http")}
                variant="primary"
                size="lg"
                icon={<ChatIcon />}
              >
                業種別に相談する
              </Button>
            </div>
          </div>
        </article>
      </SiteShell>
    );
  }

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
            <SignupButton variant="primary" size="lg" icon={<ArrowIcon />}>
              2週間無料で試す
            </SignupButton>
            <Button
              href={CTA_LINKS.spirGeneral}
              external={CTA_LINKS.spirGeneral.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              業種別に相談する
            </Button>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {u.cover ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
              <Image
                src={u.cover.url}
                alt={u.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 95vw, 70vw"
                priority
              />
            </div>
          ) : null}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-base font-bold text-neutral-900 md:text-lg">
                代表的な活用シナリオ
              </h2>
              <ul className="mt-4 grid gap-2">
                {u.scenarios.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700 ring-1 ring-neutral-100"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-base font-bold text-neutral-900 md:text-lg">
                活用機能の組み合わせ
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {u.activeFeatures.map((f) => (
                  <li
                    key={f}
                    className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700"
                  >
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
