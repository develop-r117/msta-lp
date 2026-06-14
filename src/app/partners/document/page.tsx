import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import PartnerDocCTA from "@/components/sections/PartnerDocCTA";
import { Button, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "パートナー資料ダウンロード",
  description:
    "エムスタパートナー制度の概要、レベニュー条件、申請の流れ、サポート体制をまとめたPDF資料をダウンロードできます。",
  path: "/partners/document",
});

export default function PartnerDocumentPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/partners" },
        { href: "/partners/document" },
      ])}
      audience="agency"
      bottomCtaTitle="まずは制度の全容を確認しませんか?"
      bottomCtaDescription="資料はメールでお送りします。導入のご相談はオンラインでも承っております。"
    >
      <PageHero
        eyebrow="Partner document"
        title={
          <>
            パートナー制度の
            <br className="hidden md:block" />
            <span className="text-gradient">資料をダウンロード</span>
          </>
        }
        description="制度の概要、レベニュー条件、申請の流れ、サポート体制までをまとめたPDFをメールでお送りします。"
        actions={
          <Button
            href={CTA_LINKS.spirPartner}
            external={CTA_LINKS.spirPartner.startsWith("http")}
            variant="secondary"
            size="lg"
            icon={<ChatIcon />}
          >
            先にオンライン相談する
          </Button>
        }
      />
      <PartnerDocCTA />
    </SiteShell>
  );
}
