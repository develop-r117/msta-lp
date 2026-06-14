import Link from "next/link";
import type { LegalPage } from "@/lib/content-types";

const proseClass =
  "prose prose-neutral max-w-none " +
  "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 " +
  "[&_p]:leading-relaxed [&_p]:text-neutral-600 " +
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-neutral-600 " +
  "[&_a]:text-primary-600 hover:[&_a]:text-primary-700 [&_a]:underline " +
  "[&_strong]:text-neutral-900";

/**
 * 規約・法務ページ（特定商取引法 / プライバシーポリシー）の共通表示。
 * 本文は CMS (KV) で管理された Markdoc → HTML を描画する。
 */
export default function LegalPageView({ page }: { page: LegalPage | null }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>トップページに戻る</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          {page?.title ?? "ページが見つかりません"}
        </h1>

        {page?.body ? (
          <div
            className={proseClass}
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
        ) : (
          <p className="text-neutral-600">
            このページの内容は現在準備中です。
          </p>
        )}

        {page?.effectiveDate ? (
          <p className="mt-12 whitespace-pre-line text-sm text-neutral-500">
            {page.effectiveDate}
          </p>
        ) : null}
      </main>
    </div>
  );
}
