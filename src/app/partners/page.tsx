import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Partner from "@/components/sections/Partner";
import PartnerRevenueCalculator from "@/components/sections/PartnerRevenueCalculator";
import PartnerRevenueExamples from "@/components/sections/PartnerRevenueExamples";
import { Button, DownloadIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "パートナープログラム",
  description:
    "エムスタ上でアプリビジネスを始めるパートナー制度。制作会社・開発会社・代理店・クリエイター向けに、レベニューシェア最大35%・テンプレート販売の仕組みを提供します。",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/partners" }])}
      audience="agency"
    >
      <PageHero
        eyebrow="Partner program"
        title={<>エムスタ上で、<br className="hidden md:block" /><span className="text-gradient">アプリビジネス</span>を始める。</>}
        description="制作会社・開発会社・代理店・クリエイターの方向けの制度です。アプリ制作の継続収益化、テンプレート・コンポーネント販売、クライアント案件の効率化を支援します。"
        actions={
          <>
            <Button href="/partners/document" variant="primary" size="lg" icon={<DownloadIcon />}>
              パートナー資料DL
            </Button>
            <Button
              href={CTA_LINKS.spirPartner}
              external={CTA_LINKS.spirPartner.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              オンラインで相談
            </Button>
          </>
        }
      />
      <Partner />
      <PartnerRevenueCalculator />
      <PartnerRevenueExamples />
    </SiteShell>
  );
}
