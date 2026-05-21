import Link from "next/link";
import { ROUTE_LABELS } from "@/lib/navigation";

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: Props) {
  if (items.length === 0) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msta.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <nav
        aria-label="パンくずリスト"
        className={`mx-auto mt-20 max-w-7xl px-4 pt-4 text-xs text-neutral-500 sm:px-6 lg:px-8 md:mt-24 ${className ?? ""}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded text-neutral-500 underline-offset-4 transition-colors hover:text-primary-700 hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-semibold text-neutral-800" : "text-neutral-500"} aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast ? (
                  <span aria-hidden className="text-neutral-300">/</span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

/**
 * 所定のラベル辞書からパンくずを組み立てるヘルパ。
 * 例: buildBreadcrumb([{ href: "/product" }, { href: "/product/cms" }])
 */
export function buildBreadcrumb(
  segments: { href: string; label?: string }[],
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ href: "/", label: "ホーム" }];
  for (const seg of segments) {
    items.push({
      href: seg.href,
      label: seg.label ?? ROUTE_LABELS[seg.href] ?? seg.href,
    });
  }
  return items;
}
