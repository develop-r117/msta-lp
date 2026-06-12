import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import MstaFull from "@/components/sections/MstaFull";
import Cases from "@/components/sections/Cases";
import { Button, ChatIcon, ArrowIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { getAllCases } from "@/lib/cms-data";
import { buildMetadata } from "@/lib/seo";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "エムスタFull (スクラッチ受託開発)",
  description:
    "エムスタをベースに、独自機能・既存リプレイス・複雑な要件にも対応するスクラッチ受託開発サービス。継続的な運用支援と組み合わせて。",
  path: "/services/full",
});

// エムスタFullで構築・リプレイスした事例のスラッグ (業種タグは業種ベースのため明示指定)
const FULL_CASE_SLUGS = ["tsuya-factory", "fb-scout"];

export default async function FullPage() {
  const fullCases = (await getAllCases()).filter((c) => FULL_CASE_SLUGS.includes(c.slug));

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/services" },
        { href: "/services/full" },
      ])}
      audience="agency"
      bottomCtaTitle="エムスタFullに相談する"
      bottomCtaDescription="独自要件・既存システムリプレイス・大型案件の構想段階からご相談いただけます。"
    >
      <PageHero
        variant="dark"
        eyebrow="Msta Full"
        title={<>独自要件にも、<span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">スクラッチ品質</span>で。</>}
        description="エムスタをベースに、独自のUI・独自の機能・既存システムのリプレイスにも対応するスクラッチ寄りの受託開発。標準機能だけでは難しい要件をお持ちの方に。"
        actions={
          <>
            <Button
              href={CTA_LINKS.spirFull}
              external={CTA_LINKS.spirFull.startsWith("http")}
              variant="partner"
              size="lg"
              icon={<ChatIcon />}
            >
              エムスタFullに相談
            </Button>
            <Button
              href="/services/official"
              variant="secondary"
              size="lg"
              icon={<ArrowIcon />}
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white"
            >
              標準機能でまかなえる方はこちら
            </Button>
          </>
        }
      />
      <MstaFull />
      {fullCases.length > 0 ? (
        <Cases
          initialCases={fullCases}
          variant="grid"
          title={<>エムスタFullの<span className="text-gradient">導入事例</span></>}
          description="独自要件・大型案件で、エムスタFullを採用いただいた事例をご紹介します。"
        />
      ) : (
        <section className="section-padding bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
              エムスタFullの導入事例
            </h2>
            <p className="mt-4 text-sm text-neutral-600">
              現在、エムスタFullの掲載事例を準備中です。具体的な実績や類似事例については、ご相談時に直接ご紹介します。
            </p>
            <div className="mt-6">
              <Link
                href={CTA_LINKS.spirFull}
                className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
              >
                エムスタFullに直接相談する
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
