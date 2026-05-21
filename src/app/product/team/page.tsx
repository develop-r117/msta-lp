import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import TeamRoles from "@/components/sections/TeamRoles";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "チーム運用 / 権限ロール",
  description:
    "エムスタはチームや組織での運用を前提に、管理者・編集者・投稿者・閲覧者・外部パートナーなど役割に応じた権限ロールを設定できます。",
  path: "/product/team",
});

export default function TeamPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([
        { href: "/product" },
        { href: "/product/team" },
      ])}
      audience="both"
    >
      <PageHero
        eyebrow="Team & roles"
        title={<>チームでも、組織でも、<span className="text-gradient">安全に運用</span>できる。</>}
        description="役割に応じて権限を分けられるため、セキュリティを担保しながら運用できます。アカウント内に複数のアプリを作成でき、アプリごとに権限を付与することも可能です。外部パートナーや制作会社を巻き込んだ運用にも対応可能です。"
        actions={
          <>
            <Button
              href={CTA_LINKS.signup}
              external={CTA_LINKS.signup.startsWith("http")}
              variant="primary"
              size="lg"
              icon={<ArrowIcon />}
            >
              チーム運用を試す
            </Button>
            <Button
              href={CTA_LINKS.spirGeneral}
              external={CTA_LINKS.spirGeneral.startsWith("http")}
              variant="secondary"
              size="lg"
              icon={<ChatIcon />}
            >
              組織導入を相談する
            </Button>
          </>
        }
      />
      <TeamRoles />
    </SiteShell>
  );
}
