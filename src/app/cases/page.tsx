import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Cases from "@/components/sections/Cases";
import { fetchCases } from "@/lib/microcms";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "導入事例",
  description:
    "医療・店舗・教育・コミュニティまで、業種・目的を問わずエムスタ上で運用されている導入事例を業種別にご紹介します。",
  path: "/cases",
});

export default async function CasesPage() {
  const cases = await fetchCases();

  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/cases" }])}
      audience="both"
    >
      <PageHero
        eyebrow="Customer cases"
        title={<>導入<span className="text-gradient">事例</span></>}
        description="医療・店舗・教育・コミュニティまで、エムスタを活用して運用されているアプリの事例集です。各事例の活用機能・効果・お客様の声を掲載しています。"
        actions={
          <>
            <Button
              href={CTA_LINKS.signup}
              external={CTA_LINKS.signup.startsWith("http")}
              variant="primary"
              size="lg"
              icon={<ArrowIcon />}
            >
              同じようなアプリを作る
            </Button>
            <Button
              href={CTA_LINKS.spirGeneral}
              external={CTA_LINKS.spirGeneral.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              相談する
            </Button>
          </>
        }
      />
      <Cases initialCases={cases} variant="grid" showDetailLink />
    </SiteShell>
  );
}
