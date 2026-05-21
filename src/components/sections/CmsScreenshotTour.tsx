"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Carousel from "@/components/ui/Carousel";

const slides = [
  {
    src: "/screenshots/2.png",
    title: "ダッシュボード",
    description: "運用に必要な指標とショートカットを集約。日々の運用はここから始まります。",
  },
  {
    src: "/screenshots/3.png",
    title: "プッシュ / お知らせ",
    description: "通知の即時配信・予約配信・誕生日プッシュをまとめて管理。",
  },
  {
    src: "/screenshots/4.png",
    title: "投稿コンテンツ",
    description: "AIアシスタントとカテゴリ管理で、記事更新を最短ルートに。",
  },
  {
    src: "/screenshots/6.png",
    title: "会員管理",
    description: "登録フロー、ランク、ログイン後コンテンツまで一元コントロール。",
  },
  {
    src: "/screenshots/8.png",
    title: "分析",
    description: "DAU・新規・離脱・スタンプなど、運用判断に必要なメトリクスを可視化。",
  },
];

export default function CmsScreenshotTour() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Screenshot tour"
          title={<>運用画面の<span className="text-gradient">5コマツアー</span>。</>}
          description="管理画面の使い心地は、画面そのものを見ていただくのが一番。代表的な5シーンを紹介します。"
        />

        <div className="mt-10">
          <Carousel ariaLabel="管理画面ツアー" slideClassName="md:basis-2/3 lg:basis-1/2">
            {slides.map((s) => (
              <article
                key={s.src}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-neutral-100">
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-5 py-4">
                  <h3 className="text-sm font-bold text-neutral-900 md:text-base">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{s.description}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
