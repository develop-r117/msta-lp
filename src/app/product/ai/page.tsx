import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import AIVision from "@/components/sections/AIVision";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI / エージェント構想",
  description:
    "エムスタはAIによる制作・運用・サポートの支援機能を順次搭載。完全自動化ではなく、現場の工数を削減する現実的なAI活用を提案します。",
  path: "/product/ai",
});

export default function AIPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/product" },
        { href: "/product/ai" },
      ])}
      audience="general"
    >
      <PageHero
        variant="dark"
        eyebrow="AI / Agent"
        title={<>AIが、<span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">制作と運用</span>を支援する。</>}
        description="完全自動化ではなく、制作・運用の工数削減を支援するAI。エムスタでは、アプリ制作の各フェーズでAIによる支援機能を順次搭載していきます。"
        actions={
          <>
            <Button
              href={CTA_LINKS.signup}
              external={CTA_LINKS.signup.startsWith("http")}
              variant="partner"
              size="lg"
              icon={<ArrowIcon />}
            >
              AI支援を体験する
            </Button>
            <Button
              href={CTA_LINKS.spirGeneral}
              external={CTA_LINKS.spirGeneral.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white"
            >
              活用方法を相談する
            </Button>
          </>
        }
      />
      <AIVision />
    </SiteShell>
  );
}
