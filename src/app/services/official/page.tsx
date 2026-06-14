import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Flow from "@/components/sections/Flow";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "オフィシャル制作",
  description:
    "公式チームがアプリ制作を代行。エムスタの標準機能を活用し、スピードと品質の両方を担保。¥100,000〜から、企画相談・公開・運用支援まで対応。",
  path: "/services/official",
});

export default function OfficialPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/services" },
        { href: "/services/official" },
      ])}
      audience="general"
      bottomCtaTitle="まずは公式チームに相談する"
      bottomCtaDescription="ご予算・期間・実現したいアプリ像を教えていただければ、最適な進め方をご案内します。"
    >
      <PageHero
        eyebrow="Official build"
        title={
          <>
            公式チームが、
            <br className="hidden md:block" />
            アプリ制作を<span className="text-gradient">丁寧にサポート</span>。
          </>
        }
        description="自分で作るのが不安な方、社内にリソースが足りない方、スピードと品質を担保したい方向け。エムスタの作り手である公式チームが、企画相談から制作・公開・運用までを支援します。"
        actions={
          <>
            <Button
              href={CTA_LINKS.spirOfficial}
              external={CTA_LINKS.spirOfficial.startsWith("http")}
              variant="primary"
              size="lg"
              icon={<ChatIcon />}
            >
              無料で相談する
            </Button>
            <SignupButton variant="secondary" size="lg" icon={<ArrowIcon />}>
              先に2週間無料を試す
            </SignupButton>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "企画相談",
                desc: "オンラインMTGで詳細ヒアリング。最適な機能構成を提案します。",
              },
              {
                title: "実装",
                desc: "標準機能を組み合わせて構築。要件に応じてカスタマイズも可能。",
              },
              {
                title: "公開・運用",
                desc: "公開作業から運用立ち上げまでカバー。納品後のサポート相談も。",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <p className="text-lg font-bold text-neutral-900">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-neutral-900 p-7 text-white shadow-xl md:p-9">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">
              基本料金
            </p>
            <p className="mt-2 text-4xl font-black">
              ¥100,000
              <span className="ml-2 text-base font-semibold text-white/80">
                〜
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              ご予算に応じて、標準機能をアプリごとにカスタマイズすることも可能です。詳細はオンラインMTGでご相談いただけます。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={CTA_LINKS.spirOfficial}
                external={CTA_LINKS.spirOfficial.startsWith("http")}
                variant="primary"
                size="md"
                icon={<ChatIcon />}
              >
                オフィシャル制作に相談
              </Button>
              <Button
                href="/services/3h-pack"
                variant="secondary"
                size="md"
                icon={<ArrowIcon />}
                className="!border-white/0 !bg-white !text-neutral-900"
              >
                短期で形にしたい方は3hパックへ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Flow />
    </SiteShell>
  );
}
