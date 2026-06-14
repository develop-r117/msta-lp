import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Flow from "@/components/sections/Flow";
import PricingSummary from "@/components/sections/PricingSummary";
import { Button, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "導入までの流れ",
  description:
    "エムスタのセルフ構築・オフィシャル制作の2つの導入フローをご紹介。最短で2週間無料トライアルから運用開始まで。",
  path: "/flow",
});

export default function FlowPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/flow" }])}
      audience="general"
    >
      <PageHero
        eyebrow="Onboarding flow"
        title={
          <>
            まずは<span className="text-gradient">無料</span>で始められます。
          </>
        }
        description="セルフ構築でも、公式チームによる制作でも。最短ステップで運用開始まで進めます。"
        actions={
          <>
            <SignupButton variant="primary" size="lg">
              2週間無料で始める
            </SignupButton>
            <Button
              href={CTA_LINKS.spirOfficial}
              external={CTA_LINKS.spirOfficial.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              導入相談する
            </Button>
          </>
        }
      />
      <Flow />
      <PricingSummary />
    </SiteShell>
  );
}
