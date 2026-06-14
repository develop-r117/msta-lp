import SiteShell from "@/components/layout/SiteShell";
import { buildBreadcrumb } from "@/components/layout/Breadcrumb";
import PageHero from "@/components/sections/PageHero";
import SpirEmbed from "@/components/ui/SpirEmbed";
import {
  Button,
  ArrowIcon,
  DownloadIcon,
  ChatIcon,
} from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS, GENERAL_CALENDAR_EMBED } from "@/lib/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "お問い合わせ",
  description:
    "エムスタのお問い合わせ窓口。一般のご相談、オフィシャル制作、3hパック、エムスタFull、パートナー制度それぞれカテゴリ別の予約フォームをご利用いただけます。",
  path: "/contact",
});

const categories = [
  {
    id: "general",
    label: "一般のご相談",
    description: "エムスタの導入・利用方法・機能のご質問はこちらから。",
    spirUrl: CTA_LINKS.spirGeneral,
    cta: "一般相談を予約",
  },
  {
    id: "official",
    label: "オフィシャル制作",
    description: "公式チームによるアプリ制作代行のお見積り・要件相談。",
    spirUrl: CTA_LINKS.spirOfficial,
    cta: "オフィシャル制作に相談",
  },
  {
    id: "three-h",
    label: "3hパック",
    description: "ローンチ記念半額の3hパックの予約・事前相談。",
    spirUrl: CTA_LINKS.spirThreeHour,
    cta: "3hパックを予約",
  },
  {
    id: "full",
    label: "エムスタFull",
    description: "独自要件・既存システムリプレイス・スクラッチ開発のご相談。",
    spirUrl: CTA_LINKS.spirFull,
    cta: "エムスタFullに相談",
  },
  {
    id: "partner",
    label: "パートナー制度",
    description: "代理店・制作会社・クリエイター向けのパートナー制度のご相談。",
    spirUrl: CTA_LINKS.spirPartner,
    cta: "パートナー相談を予約",
  },
];

export default function ContactPage() {
  return (
    <SiteShell
      breadcrumbs={buildBreadcrumb([{ href: "/contact" }])}
      audience="both"
    >
      <PageHero
        eyebrow="Contact"
        title={
          <>
            カテゴリーに合わせて、
            <br className="hidden md:block" />
            <span className="text-gradient">最適な相談窓口</span>を。
          </>
        }
        description="エムスタでは、ご相談内容に合わせてカテゴリ別の予約フォームをご用意しています。お急ぎの方は2週間無料トライアル、または資料DLからもお進みいただけます。"
        actions={
          <>
            <SignupButton variant="primary" size="lg" icon={<ArrowIcon />}>
              先に2週間無料を試す
            </SignupButton>
            <Button
              href="/partners/document"
              variant="secondary"
              size="lg"
              icon={<DownloadIcon />}
            >
              パートナー資料DL
            </Button>
          </>
        }
      />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li
                key={c.id}
                className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-7"
              >
                <p className="text-base font-bold text-neutral-900 md:text-lg">
                  {c.label}
                </p>
                <p className="mt-2 grow text-sm leading-relaxed text-neutral-600">
                  {c.description}
                </p>
                <a
                  href={c.spirUrl}
                  target={c.spirUrl.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.spirUrl.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  <ChatIcon />
                  {c.cta}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            一般相談カレンダー
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
            まずは話を聞いてみたい方向けの、一般相談用予約フォームです。専用カテゴリのご相談は、上のカード群からカレンダーをご選択ください。
          </p>
          <div className="mt-8">
            <SpirEmbed
              embedCode={GENERAL_CALENDAR_EMBED}
              url={
                CTA_LINKS.spirGeneral.startsWith("http")
                  ? CTA_LINKS.spirGeneral
                  : undefined
              }
              title="一般相談カレンダー"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
