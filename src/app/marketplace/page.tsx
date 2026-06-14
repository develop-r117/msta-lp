import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Marketplace from "@/components/sections/Marketplace";
import { Button, DownloadIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
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
        variant="dark"
        eyebrow="Marketplace"
        title={
          <>
            テンプレ・コンポーネントが
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              流通する場所
            </span>
            へ。
          </>
        }
        description="エムスタは単なる制作ツールではなく、流通プラットフォームを目指します。テンプレート・コンポーネント・機能アドオンが、作り手と使い手の間で循環するマーケットプレイス構想を進めています。"
        actions={
          <>
            <Button
              href="/partners/document"
              variant="partner"
              size="lg"
              icon={<DownloadIcon />}
            >
              出品 / 制作側として参加
            </Button>
            <SignupButton
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white"
            >
              利用側として2週間無料で
            </SignupButton>
          </>
        }
      />
      <Marketplace />
    </SiteShell>
  );
}
