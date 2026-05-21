import { notFound } from "next/navigation";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import { BillingBadge, FeatureIconSvg } from "@/components/sections/Features";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import {
  FEATURES,
  getFeature,
  getRelatedFeatures,
  getCategoryLabel,
  BILLING_LABELS,
} from "@/lib/features";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) {
    return buildMetadata({
      title: "機能",
      description: "エムスタの機能",
      path: `/product/features/${slug}`,
    });
  }
  return buildMetadata({
    title: `${f.name} | 機能詳細`,
    description: f.summary,
    path: `/product/features/${f.slug}`,
  });
}

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const related = getRelatedFeatures(slug);
  const categoryLabel = getCategoryLabel(feature.category);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${feature.name} | エムスタ`,
    description: feature.summary,
    mainEntityOfPage: `${baseUrl}/product/features/${feature.slug}`,
    about: feature.name,
    keywords: feature.keyCapabilities.join(", "),
  };

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/product" },
        { href: "/product/features" },
        { href: `/product/features/${feature.slug}`, label: feature.name },
      ])}
      audience="general"
    >
      <PageHero
        eyebrow={categoryLabel}
        title={
          <span className="inline-flex flex-wrap items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary-700 md:h-14 md:w-14">
              <FeatureIconSvg category={feature.category} />
            </span>
            <span>{feature.name}</span>
            <BillingBadge billing={feature.billing} />
          </span>
        }
        description={feature.summary}
        actions={
          <>
            <Button
              href={CTA_LINKS.signup}
              external={CTA_LINKS.signup.startsWith("http")}
              variant="primary"
              size="lg"
              icon={<ArrowIcon />}
            >
              この機能を試す
            </Button>
            <Button
              href={CTA_LINKS.spirGeneral}
              external={CTA_LINKS.spirGeneral.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              活用方法を相談
            </Button>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-base font-bold text-neutral-900 md:text-lg">主な機能</h2>
              <ul className="mt-4 space-y-3">
                {feature.keyCapabilities.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-500 text-white">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              {feature.screens?.length ? (
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-base font-bold text-neutral-900 md:text-lg">管理画面</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {feature.screens.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-base font-bold text-neutral-900 md:text-lg">提供区分</h2>
                <p className="mt-3 text-sm text-neutral-700">
                  この機能は <strong>{BILLING_LABELS[feature.billing]}</strong> で提供されます。
                </p>
                {feature.relatedSettings?.length ? (
                  <ul className="mt-3 space-y-1.5 text-xs text-neutral-500">
                    {feature.relatedSettings.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href="/pricing"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
                >
                  料金詳細を見る
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {feature.audiences?.length ? (
            <div className="mt-8 rounded-3xl bg-neutral-50 p-6 ring-1 ring-neutral-100 md:p-8">
              <h2 className="text-base font-bold text-neutral-900 md:text-lg">向いている業種・シーン</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {feature.audiences.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1 ring-neutral-200"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">関連機能</h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/product/features/${r.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100">
                          <FeatureIconSvg category={r.category} />
                        </span>
                        <BillingBadge billing={r.billing} />
                      </div>
                      <p className="mt-3 text-sm font-bold text-neutral-900 group-hover:text-primary-700">
                        {r.name}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                        {r.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 text-center">
            <Link
              href="/product/features"
              className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h18" />
              </svg>
              全機能一覧へ戻る
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </SiteShell>
  );
}
