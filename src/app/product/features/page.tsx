import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import FeaturesCatalog from "@/components/sections/FeaturesCatalog";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "全機能一覧",
  description:
    "情報発信・会員管理・コミュニケーション・コンテンツ管理・業務支援・拡張機能まで、エムスタの全機能をカテゴリ別にご覧いただけます。各機能の詳細ページから、画面・活用シーン・関連設定を確認できます。",
  path: "/product/features",
});

export default function FeaturesPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/product" },
        { href: "/product/features" },
      ])}
      audience="general"
    >
      <PageHero
        eyebrow="All features"
        title={<>アプリ運用に必要な機能を、<span className="text-gradient">標準搭載</span>。</>}
        description="情報発信・会員・コミュニケーション・予約・分析・拡張まで。標準機能を組み合わせるだけで、業種を問わず実用レベルのアプリが形になります。各機能ごとに詳細ページもご用意しています。"
        actions={
          <Button
            href={CTA_LINKS.signup}
            external={CTA_LINKS.signup.startsWith("http")}
            variant="primary"
            size="lg"
            icon={<ArrowIcon />}
          >
            機能を実際に試す
          </Button>
        }
      />
      <FeaturesCatalog />
    </SiteShell>
  );
}
