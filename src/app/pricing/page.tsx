import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "料金",
  description:
    "エムスタは初期費用不要・月額のみのシンプルな料金。アカウント基本利用料3,000円/月、Webアプリ2,000円/URL、iOS・Android各5,000円/月。2週間無料トライアルから。",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/pricing" }])}
      audience="general"
    >
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            初期費用不要、<br className="hidden md:block" />
            <span className="text-gradient">月額のみ</span>のシンプル料金
          </>
        }
        description="登録から2週間無料でご利用いただけます。アカウント1つで複数アプリの作成・運用が可能です。"
        actions={
          <>
            <Button
              href={CTA_LINKS.signup}
              external={CTA_LINKS.signup.startsWith("http")}
              variant="primary"
              size="lg"
              icon={<ArrowIcon />}
            >
              2週間無料で始める
            </Button>
            <Button
              href={CTA_LINKS.spirOfficial}
              external={CTA_LINKS.spirOfficial.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              オフィシャル制作に相談
            </Button>
          </>
        }
      />
      <Pricing />
      <FAQ />
    </SiteShell>
  );
}
