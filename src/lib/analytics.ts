/**
 * Google Analytics 4 (gtag.js) 用の計測ヘルパー。
 *
 * - 測定IDは環境変数 NEXT_PUBLIC_GA_ID で上書き可能（既定値: G-DH0T9XEVSB）。
 * - 空文字や開発時の未設定でも安全に動くよう、gtag が存在しない場合は no-op。
 * - ページビューはSPA遷移ごとに手動送信する想定（GoogleAnalytics コンポーネント参照）。
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-DH0T9XEVSB";

/** GA計測を有効にするか。測定IDが設定されていれば有効。 */
export const isAnalyticsEnabled = (): boolean =>
  typeof window !== "undefined" && Boolean(GA_MEASUREMENT_ID);

type GtagCommand = "config" | "set" | "event" | "js" | "consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

/** 任意のイベントパラメータ。GA4 の推奨命名（snake_case）で送る。 */
export type EventParams = Record<
  string,
  string | number | boolean | undefined | null
>;

/**
 * GA4へカスタムイベントを送信する。gtagが未ロード/無効の場合は何もしない。
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}

/**
 * SPA遷移時のページビューを送信する。
 * GA4側の自動page_view（send_page_view）は無効化し、ここで一元管理する。
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
}

// ---- 主要コンバージョン / 導線のイベントヘルパー ----

/** 無料トライアル登録CTAのクリック。SIGNUP_OPEN前は coming_soon 表示の計測にも使う。 */
export function trackSignupClick(location: string, available: boolean): void {
  trackEvent(available ? "sign_up_click" : "signup_coming_soon_view", {
    cta_location: location,
    signup_available: available,
  });
}

/** パートナー資料請求フォーム送信完了（リード獲得）。 */
export function trackLeadSubmit(params: EventParams = {}): void {
  trackEvent("generate_lead", {
    form_id: "partner_document",
    currency: "JPY",
    value: 0,
    ...params,
  });
}

/** お問い合わせ/予約（Spir等）リンクのクリック。 */
export function trackBookingClick(label: string, url: string): void {
  trackEvent("booking_click", {
    booking_label: label,
    link_url: url,
  });
}

/** 外部サイトへの離脱（アウトバウンド）クリック。 */
export function trackOutboundClick(url: string, label?: string): void {
  trackEvent("outbound_click", {
    link_url: url,
    link_text: label,
  });
}

/** 主要CTAボタン全般のクリック計測。 */
export function trackCtaClick(label: string, location: string): void {
  trackEvent("cta_click", {
    cta_label: label,
    cta_location: location,
  });
}
