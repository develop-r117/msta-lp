import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Marketplace from "@/components/sections/Marketplace";
import { Button, ArrowIcon, DownloadIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "マーケットプレイス構想",
  description:
    "テンプレート、コンポーネント、デザインアセット、機能アドオンが流通するエムスタのマーケットプレイス構想についてご紹介します。",
  path: "/marketplace",
});

export default function MarketplacePage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/marketplace" }])}
      audience="both"
    >
      <PageHero
        eyebrow="Marketplace"
        title={<>テンプレ・コンポーネントが<br className="hidden md:block" /><span className="text-gradient">流通する場所</span>へ。</>}
        description="エムスタは単なる制作ツールではなく、流通プラットフォームを目指します。テンプレート・コンポーネント・機能アドオンが、作り手と使い手の間で循環するマーケットプレイス構想を進めています。"
        actions={
          <>
            <Button href="/partners/document" variant="primary" size="lg" icon={<DownloadIcon />}>
              出品 / 制作側として参加
            </Button>
            <Button
              href={CTA_LINKS.signup}
              external={CTA_LINKS.signup.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ArrowIcon />}
            >
              利用側として2週間無料で
            </Button>
          </>
        }
      />
      <Marketplace />
    </SiteShell>
  );
}
