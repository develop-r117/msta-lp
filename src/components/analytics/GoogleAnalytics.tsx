"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  trackBookingClick,
  trackOutboundClick,
  trackPageView,
} from "@/lib/analytics";

/**
 * SPA（App Router クライアント遷移）のページビューを計測する内部コンポーネント。
 * useSearchParams を使うため Suspense 境界の内側で描画する。
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

/** 予約系（Spir等）と判定するためのホスト/キーワード。 */
function isBookingLink(url: URL): boolean {
  return /spir\.app|calendar|calendly|timerex|booking/i.test(
    `${url.hostname}${url.pathname}`,
  );
}

/**
 * 外部リンク（別オリジン）のクリックをサイト全体で自動計測する。
 * 予約系リンクは booking_click、それ以外は outbound_click として送信する。
 * data-ga-skip-outbound 属性を持つ要素配下のリンクは個別計測済みとしてスキップ。
 */
function OutboundClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.closest("[data-ga-skip-outbound]")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin === window.location.origin) return;

      const label = anchor.textContent?.trim().slice(0, 100) || undefined;
      if (isBookingLink(url)) {
        trackBookingClick(label ?? "booking", url.href);
      } else {
        trackOutboundClick(url.href, label);
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}

/**
 * Google Analytics 4 (gtag.js) をサイト全体に埋め込む。
 *
 * - gtag.js を afterInteractive で読み込む。
 * - 初期 config では send_page_view を無効化し、ページビューは PageViewTracker で
 *   SPA遷移も含めて手動送信することで重複なく精密に計測する。
 * - 測定IDが未設定の場合は何も描画しない。
 */
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        id="ga-gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <OutboundClickTracker />
    </>
  );
}
