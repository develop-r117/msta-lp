"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  url?: string;
  /** Spirが発行する埋め込みコード（<iframe ...> 等のHTML）。指定時はurlより優先。 */
  embedCode?: string;
  title?: string;
  className?: string;
  fallback?: ReactNode;
};

/**
 * Spirのカレンダー埋め込み。
 * - embedCode（CMSで貼り付けた埋め込みHTML）があればそれを優先して描画する。
 * - なければurlをiframeで表示し、どちらも無ければfallbackを表示する。
 */
export default function SpirEmbed({ url, embedCode, title = "オンライン相談カレンダー", className, fallback }: Props) {
  if (embedCode?.trim()) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm [&_iframe]:block [&_iframe]:h-[640px] [&_iframe]:w-full",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    );
  }

  if (!url) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-8 text-center text-sm text-neutral-500",
          className,
        )}
      >
        {fallback ?? (
          <>
            <span className="mb-2 inline-block rounded-full bg-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700">
              Spir埋め込み予定
            </span>
            <p>カレンダーURLが設定されると、ここに直接予約フォームが表示されます。</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm", className)}>
      <iframe
        src={url}
        title={title}
        className="h-[640px] w-full"
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  );
}
