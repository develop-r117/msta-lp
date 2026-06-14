import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import About from "@/components/sections/About";
import Intro3 from "@/components/sections/Intro3";
import { Button, DownloadIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "プロダクト",
  description:
    "エムスタは、Webアプリ・iOS・Androidに対応した次世代型アプリ制作プラットフォーム。CMS標準搭載で、アプリ制作・運用・改善・収益化までを一つの場所で。",
  path: "/product",
});

const pillars = [
  {
    href: "/product/cms",
    title: "CMS / 管理ダッシュボード",
    desc: "投稿、通知、会員、予約、チャット、アンケート…運用に必要な全てを管理画面から。",
  },
  {
    href: "/product/modes",
    title: "かんたん / プロモード",
    desc: "事業者にも、制作会社にも。リテラシーに応じた最適なUIを提供。",
  },
  {
    href: "/product/features",
    title: "全機能一覧",
    desc: "情報発信・会員・コミュニケーション・コンテンツ・業務支援・拡張を網羅。",
  },
  {
    href: "/product/ai",
    title: "AI / エージェント",
    desc: "制作・運用・サポートを支援するAIを順次搭載していきます。",
  },
  {
    href: "/product/team",
    title: "チーム運用 / 権限",
    desc: "組織でも安全に運用できる権限ロールと、外部パートナー連携。",
  },
];

export default function ProductPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/product" }])}
      audience="general"
    >
      <PageHero
        eyebrow="Product"
        title={
          <>
            真のノーコード × 最強CMSを備えた、
            <br className="hidden md:block" />
            <span className="text-gradient">
              次世代型アプリ制作プラットフォーム
            </span>
          </>
        }
        description={
          <>
            エムスタは、Webアプリ・iOSアプリ・Androidアプリを、CMS付きで構築・運用できるアプリ制作プラットフォームです。
            <br />
            アプリ制作だけでなく、リリース後の運用管理・コンテンツ更新・機能追加まで、管理ダッシュボードから直感的に行うことができます。
          </>
        }
        actions={
          <>
            <SignupButton variant="primary" size="lg">
              2週間無料で始める
            </SignupButton>
            <Button
              href="/partners/document"
              variant="secondary"
              size="lg"
              icon={<DownloadIcon />}
            >
              パートナー資料DL
            </Button>
          </>
        }
      />

      <Intro3 />
      <About />

      <section className="section-padding bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            プロダクト構成
          </h2>
          <p className="mt-3 text-sm text-neutral-600 md:text-base">
            プロダクトは大きく5つの軸で構成されています。各ページで詳細を確認できます。
          </p>
          <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
                >
                  <div>
                    <p className="text-base font-bold text-neutral-900 group-hover:text-primary-700">
                      {p.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                      {p.desc}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-500 transition-colors group-hover:bg-primary-100 group-hover:text-primary-700">
                    <svg
                      className="h-4 w-4"
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
        </div>
      </section>
    </SiteShell>
  );
}
