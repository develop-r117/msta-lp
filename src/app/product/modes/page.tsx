import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import Modes from "@/components/sections/Modes";
import { Button, DownloadIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "かんたんモード / プロモード",
  description:
    "事業者・店舗担当者にも、制作会社・デザイナーにも。エムスタは2つのモードで、リテラシーに応じた最適なUIを提供します。",
  path: "/product/modes",
});

export default function ModesPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/product" },
        { href: "/product/modes" },
      ])}
      audience="both"
    >
      <PageHero
        eyebrow="Easy / Pro"
        title={
          <>
            初心者にも、プロにも。
            <br className="hidden md:block" />
            使い方に合わせた<span className="text-gradient">2つのモード</span>。
          </>
        }
        description="リテラシーの壁を撤廃し、誰でも直感的に運用できる「かんたんモード」と、自由度の高い編集・コード差し込み・テンプレート制作に対応する「プロモード」。"
        actions={
          <>
            <SignupButton variant="primary" size="lg">
              2週間無料で始める
            </SignupButton>
            <Button
              href="/partners"
              variant="secondary"
              size="lg"
              icon={<DownloadIcon />}
            >
              プロモード活用の制度を見る
            </Button>
          </>
        }
      />
      <Modes />
    </SiteShell>
  );
}
