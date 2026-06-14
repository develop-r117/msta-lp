"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Tabs, { type TabItem } from "@/components/ui/Tabs";
import {
  FEATURES,
  FEATURE_CATEGORIES,
  BILLING_LABELS,
  type Feature,
  type FeatureCategoryId,
} from "@/lib/features";
import { cn } from "@/lib/cn";

const tabs: TabItem<FeatureCategoryId>[] = FEATURE_CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
  content: (
    <FeatureGrid features={FEATURES.filter((f) => f.category === c.id)} />
  ),
}));

export default function Features() {
  return (
    <section id="features" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="All-in-one features"
          title={
            <>
              アプリ運用に必要な機能を、
              <span className="text-gradient">標準搭載</span>。
            </>
          }
          description="情報発信・会員管理・コミュニケーション・予約・分析・拡張まで。標準機能を組み合わせるだけで、業種を問わず実用レベルのアプリが形になります。各機能の詳細ページもご覧いただけます。"
        />
        <div className="mt-14">
          <Tabs<FeatureCategoryId> items={tabs} ariaLabel="機能カテゴリ" />
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary-700">
              詳細を見る
              <svg
                className="h-3 w-3"
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
  );
}

export function BillingBadge({
  billing,
  className,
}: {
  billing: Feature["billing"];
  className?: string;
}) {
  const styles: Record<Feature["billing"], string> = {
    default: "bg-primary-50 text-primary-700",
    "free-add": "bg-emerald-50 text-emerald-700",
    paid: "bg-accent-50 text-accent-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider",
        styles[billing],
        className,
      )}
    >
      {BILLING_LABELS[billing]}
    </span>
  );
}

export function FeatureIconSvg({ category }: { category: FeatureCategoryId }) {
  const path = (() => {
    switch (category) {
      case "broadcast":
        return "M11 5h2v6h-2zm0 8h2v2h-2zM5 12a7 7 0 0114 0M3 12a9 9 0 0118 0";
      case "members":
        return "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0";
      case "comm":
        return "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z";
      case "content":
        return "M4 4h16v16H4V4zm0 6h16M10 4v16";
      case "ops":
        return "M3 12h4l3-9 4 18 3-9h4";
      case "ext":
        return "M13 2L3 14h7l-1 8 11-14h-7l1-6z";
      case "build":
        return "M14.7 6.3a1 1 0 011.4 0l1.6 1.6a1 1 0 010 1.4L9 18.5 4 19l.5-5z";
    }
  })();
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
