"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Carousel from "@/components/ui/Carousel";
import { Button, ArrowIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";
import { type CaseEntry } from "@/lib/content-types";

type Props = {
  initialCases: CaseEntry[];
  /** トップ用に短縮表示するか */
  variant?: "carousel" | "grid";
  /** 見出しを変更したい場合 */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 詳細ページへのリンクを表示するか */
  showDetailLink?: boolean;
};

export default function Cases({
  initialCases,
  variant = "carousel",
  title,
  description,
  showDetailLink = true,
}: Props) {
  return (
    <section id="cases" className="section-padding relative bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer cases"
          title={title ?? <>導入<span className="text-gradient">事例</span></>}
          description={description ?? "医療・店舗・教育・コミュニティまで、業種・目的を問わず多数の事例をエムスタ上で運用しています。"}
        />

        <div className="mt-12">
          {variant === "carousel" ? (
            <Carousel ariaLabel="導入事例">
              {initialCases.map((c) => (
                <CaseCard key={c.id} c={c} showDetailLink={showDetailLink} />
              ))}
            </Carousel>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {initialCases.map((c) => (
                <li key={c.id}>
                  <CaseCard c={c} showDetailLink={showDetailLink} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            href="/cases"
            variant="primary"
            size="lg"
            icon={<ArrowIcon />}
          >
            すべての事例を見る
          </Button>
          <Button
            href={CTA_LINKS.spirGeneral}
            external={CTA_LINKS.spirGeneral.startsWith("http")}
            variant="secondary"
            size="lg"
            icon={<ChatIcon />}
          >
            同じようなアプリを相談
          </Button>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ c, showDetailLink }: { c: CaseEntry; showDetailLink: boolean }) {
  const cover = c.cover?.url ?? "/screenshots/2.png";
  const Wrapper = showDetailLink
    ? ({ children }: { children: React.ReactNode }) => (
        <Link
          href={`/cases/${c.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          {children}
        </article>
      );

  return (
    <Wrapper>
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={cover}
          alt={c.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 80vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-neutral-900/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          {c.category}
        </span>
      </div>
      <div className="flex grow flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-neutral-900 group-hover:text-primary-700">
          {c.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600">{c.summary}</p>

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">活用機能</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {c.activeFeatures.map((f) => (
              <span
                key={f}
                className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">導入効果</p>
          <p className="mt-1 text-xs font-semibold text-neutral-800">{c.result}</p>
        </div>

        {c.customerVoice ? (
          <p className="mt-4 grow rounded-xl bg-neutral-50 p-3 text-xs italic text-neutral-600 ring-1 ring-neutral-100">
            “{c.customerVoice}”
          </p>
        ) : null}

        {showDetailLink ? (
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary-700">
            詳細を見る
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
