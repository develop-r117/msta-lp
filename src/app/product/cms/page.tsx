import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import CMS from "@/components/sections/CMS";
import WhyAfterRelease from "@/components/sections/WhyAfterRelease";
import CmsLifecycle from "@/components/sections/CmsLifecycle";
import CmsCapabilityMatrix from "@/components/sections/CmsCapabilityMatrix";
import CmsScreenshotTour from "@/components/sections/CmsScreenshotTour";
import CmsRelatedFeatures from "@/components/sections/CmsRelatedFeatures";
import { Button, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CMS / 管理ダッシュボード",
  description:
    "アプリは、リリースしてからが本番。エムスタは投稿・通知・会員・予約・チャット・分析を1つの管理画面で運用できる、強力な標準CMSを搭載。リリース後のグロースを当たり前にします。",
  path: "/product/cms",
});

export default function CMSPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/product" },
        { href: "/product/cms" },
      ])}
      audience="general"
    >
      <PageHero
        eyebrow="CMS / Dashboard"
        title={
          <>
            アプリは、
            <span className="text-gradient">リリースしてからが本番。</span>
          </>
        }
        description="情報更新・通知配信・データ収集・分析・改善—リリース後の運用に必要なすべてを、1つの管理画面で。エムスタは強力なCMSを最初から標準搭載しています。"
        actions={
          <>
            <SignupButton variant="primary" size="lg">
              CMSを2週間無料で試す
            </SignupButton>
            <Button
              href={CTA_LINKS.spirGeneral}
              external={CTA_LINKS.spirGeneral.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              運用イメージを相談
            </Button>
          </>
        }
      />
      <WhyAfterRelease />
      <CMS />
      <CmsLifecycle />
      <CmsCapabilityMatrix />
      <CmsScreenshotTour />
      <CmsRelatedFeatures />
    </SiteShell>
  );
}
