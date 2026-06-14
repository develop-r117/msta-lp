import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { BillingBadge, FeatureIconSvg } from "@/components/sections/Features";
import { getFeature } from "@/lib/features";

const SLUGS = [
  "cms-posts",
  "push-notifications",
  "members",
  "reservations",
  "ecommerce",
  "analytics",
  "ai-builder",
  "coupons",
  "stamps",
];

export default function CmsRelatedFeatures() {
  const features = SLUGS.map((s) => getFeature(s)).filter((f) => f !== null);

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Linked features"
          title={
            <>
              CMSと<span className="text-gradient">連動する主要機能</span>。
            </>
          }
          description="CMSは単独機能ではなく、運用に必要な機能群と密接に連動します。代表的な9機能を紹介します。"
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/product/features/${f.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100">
                    <FeatureIconSvg category={f.category} />
                  </span>
                  <BillingBadge billing={f.billing} />
                </div>
                <p className="mt-3 text-sm font-bold text-neutral-900 group-hover:text-primary-700">
                  {f.name}
                </p>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                  {f.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/product/features"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
          >
            全機能一覧を見る
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
          </Link>
        </div>
      </div>
    </section>
  );
}
