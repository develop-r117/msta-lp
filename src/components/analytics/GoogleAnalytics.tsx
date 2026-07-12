"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  trackBookingClick,
  trackOutboundClick,
  trackPageEngagement,
  trackPageView,
  trackScrollDepth,
  trackSectionView,
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
 * ページ内の id 付き <section> への到達を計測する。
 * 各セクションはページビューごとに一度だけ section_view を送信する。
 */
function SectionViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const tracked = new Set<string>();
    let observer: IntersectionObserver | null = null;

    // クライアントコンポーネントのマウント完了を待ってからセクションを収集する
    const timer = setTimeout(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]"),
      );
      if (sections.length === 0) return;

      observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            const id = entry.target.id;
            if (entry.isIntersecting && !tracked.has(id)) {
              tracked.add(id);
              trackSectionView(id);
              obs.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "-20% 0px -20% 0px", threshold: 0.1 },
      );
      sections.forEach((s) => observer?.observe(s));
    }, 500);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}

/** スクロール到達率（25/50/75/90/100%）を各閾値一度だけ送信する。 */
const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100] as const;

function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const fired = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const percent =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackScrollDepth(threshold);
        }
      }
      if (fired.size === SCROLL_THRESHOLDS.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}

/**
 * ページ単位の滞在時間を計測する。
 * SPA遷移時・タブ非表示時・ページ離脱時に、直前ページの滞在時間を送信する。
 * タブが非表示の間は滞在時間に含めない。
 */
function PageEngagementTracker() {
  const pathname = usePathname();
  const stateRef = useRef({
    path: "",
    startedAt: 0,
    accumulated: 0,
    hidden: false,
  });

  useEffect(() => {
    if (!pathname) return;
    const state = stateRef.current;

    // 直前ページの滞在時間を送信してから現在ページの計測を開始
    if (state.path && state.path !== pathname) {
      const elapsed =
        state.accumulated + (state.hidden ? 0 : Date.now() - state.startedAt);
      if (elapsed > 0) trackPageEngagement(state.path, elapsed);
    }
    state.path = pathname;
    state.startedAt = Date.now();
    state.accumulated = 0;
    state.hidden = document.visibilityState === "hidden";
  }, [pathname]);

  useEffect(() => {
    const state = stateRef.current;

    const flush = () => {
      const elapsed =
        state.accumulated + (state.hidden ? 0 : Date.now() - state.startedAt);
      if (state.path && elapsed > 0) {
        trackPageEngagement(state.path, elapsed);
      }
      state.accumulated = 0;
      state.startedAt = Date.now();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        state.accumulated += Date.now() - state.startedAt;
        state.hidden = true;
        // 非表示になったタイミングで一旦送信（離脱に備える）
        if (state.path && state.accumulated > 0) {
          trackPageEngagement(state.path, state.accumulated);
          state.accumulated = 0;
        }
      } else {
        state.startedAt = Date.now();
        state.hidden = false;
      }
    };

    const onPageHide = () => {
      if (!state.hidden) flush();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
    };
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
      <SectionViewTracker />
      <ScrollDepthTracker />
      <PageEngagementTracker />
    </>
  );
}
