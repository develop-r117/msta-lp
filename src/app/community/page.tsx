import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import UGC from "@/components/sections/UGC";
import { Button, DownloadIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "UGC / 共創プラットフォーム",
  description:
    "エムスタは、ユーザーやパートナーが共創するUGC型のプラットフォームを目指しています。制作・運用・改善・収益化までを共に育てるエコシステム。",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/community" }])}
      audience="both"
    >
      <PageHero
        variant="dark"
        eyebrow="UGC / Community"
        title={
          <>
            使い手と作り手で、
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              共に育てる
            </span>
            プラットフォーム。
          </>
        }
        description="エムスタは、ユーザーやパートナーが共にプロダクトを育てていく共創型のプラットフォームを目指しています。テンプレート、ノウハウ、機能アドオン、UI、サポート…全てがコミュニティを通じて循環していくエコシステムを設計しています。"
        actions={
          <>
            <Button
              href="/partners/document"
              variant="partner"
              size="lg"
              icon={<DownloadIcon />}
            >
              共創パートナーとして参加
            </Button>
            <SignupButton
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white"
            >
              ユーザーとして2週間無料で
            </SignupButton>
          </>
        }
      />
      <UGC />
    </SiteShell>
  );
}
