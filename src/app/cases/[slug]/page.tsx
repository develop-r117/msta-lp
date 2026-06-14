import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";
import type { CaseEntry } from "@/lib/content-types";
import { getCaseBySlug, getAllCases } from "@/lib/cms-data";
import { buildMetadata } from "@/lib/seo";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  if (!c) {
    return buildMetadata({
      title: "導入事例",
      description: "エムスタの導入事例詳細",
      path: `/cases/${slug}`,
    });
  }
  const base = buildMetadata({
    title: c.title,
    description: c.summary,
    path: `/cases/${c.slug}`,
    ogImage: c.cover?.url,
  });
  if (c.cardOnly) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getCaseBySlug(slug);
  if (!entry) notFound();

  const others = (await getAllCases())
    .filter((c) => c.slug !== entry.slug)
    .slice(0, 3);

  if (entry.cardOnly) {
    return (
      <SiteShell
        breadcrumbs={buildBreadcrumb([
          { href: "/cases" },
          { href: `/cases/${entry.slug}`, label: entry.title },
        ])}
        audience="both"
      >
        <article>
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <span className="inline-block rounded-full bg-sky-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              Coming soon
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
              {entry.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
              この事例の詳細記事は現在準備中です。近日公開予定ですので、もうしばらくお待ちください。
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href="/cases"
                variant="secondary"
                size="lg"
                icon={<ArrowIcon />}
              >
                他の事例を見る
              </Button>
              <Button
                href={CTA_LINKS.spirGeneral}
                external={CTA_LINKS.spirGeneral.startsWith("http")}
                variant="primary"
                size="lg"
                icon={<ChatIcon />}
              >
                似た導入を相談する
              </Button>
            </div>
          </div>
          <RelatedCases items={others} />
        </article>
      </SiteShell>
    );
  }

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/cases" },
        { href: `/cases/${entry.slug}`, label: entry.title },
      ])}
      audience="both"
    >
      <article>
        <header className="mx-auto max-w-5xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-neutral-900/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            {entry.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg">
            {entry.summary}
          </p>
          {entry.intro ? (
            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              {entry.intro
                .split(/\n{2,}/)
                .map((p) => p.trim())
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          ) : null}
        </header>

        {entry.cover ? (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
              <Image
                src={entry.cover.url}
                alt={entry.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 95vw, 70vw"
                priority
              />
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <dl className="grid gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-3 md:p-8">
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                活用機能
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {entry.activeFeatures.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700"
                  >
                    {f}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                導入効果
              </dt>
              <dd className="mt-2 text-sm font-semibold text-neutral-900">
                {entry.result}
              </dd>
            </div>
            {entry.customerVoice ? (
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  お客様の声
                </dt>
                <dd className="mt-2 rounded-xl bg-neutral-50 p-3 text-sm italic text-neutral-700 ring-1 ring-neutral-100">
                  “{entry.customerVoice}”
                </dd>
              </div>
            ) : null}
          </dl>

          {entry.body ? (
            <div
              className="case-article mx-auto mt-12 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: entry.body }}
            />
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-7 text-sm text-neutral-600 md:p-9">
              <p className="font-semibold text-neutral-800">
                本事例の詳細記事は順次公開予定です。
              </p>
              <p className="mt-2">
                同様のアプリ構築・運用について、まずはお気軽にご相談ください。
              </p>
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <SignupButton variant="primary" size="lg" icon={<ArrowIcon />}>
              同じようなアプリを作る
            </SignupButton>
            <Button
              href={CTA_LINKS.spirGeneral}
              external={CTA_LINKS.spirGeneral.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              似た導入を相談する
            </Button>
          </div>
        </div>

        <RelatedCases items={others} />

        <div id="json-ld">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: entry.title,
                description: entry.summary,
                image: entry.cover?.url,
                datePublished: entry.publishedAt,
                dateModified: entry.updatedAt ?? entry.publishedAt,
              }),
            }}
          />
        </div>
      </article>
    </SiteShell>
  );
}

function RelatedCases({ items }: { items: CaseEntry[] }) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">
          他の事例も見る
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <li key={c.id}>
              <Link
                href={`/cases/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {c.cover ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <Image
                      src={c.cover.url}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, 30vw"
                    />
                  </div>
                ) : null}
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {c.category}
                  </span>
                  <p className="mt-1 text-sm font-bold text-neutral-900 group-hover:text-primary-700">
                    {c.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
