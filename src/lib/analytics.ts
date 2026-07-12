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

/** フォームの送信試行（送信ボタン押下でバリデーション通過後）。 */
export function trackFormStart(formId: string): void {
  trackEvent("form_start", {
    form_id: formId,
  });
}

/** フォーム送信の失敗。エラー要因の把握に使う。 */
export function trackFormError(formId: string, message?: string): void {
  trackEvent("form_submit_error", {
    form_id: formId,
    error_message: message?.slice(0, 100),
  });
}

/** アコーディオン（FAQ等）の開閉。 */
export function trackFaqToggle(
  questionId: string,
  action: "open" | "close",
  category?: string,
): void {
  trackEvent("faq_toggle", {
    question_id: questionId,
    toggle_action: action,
    faq_category: category,
  });
}

/** タブUIの切替。 */
export function trackTabChange(tabGroup: string, tabId: string): void {
  trackEvent("tab_change", {
    tab_group: tabGroup,
    tab_id: tabId,
  });
}

/** カルーセルのスライド移動（矢印・ドット・スワイプ共通）。 */
export function trackCarouselNavigate(carouselId: string, index: number): void {
  trackEvent("carousel_navigate", {
    carousel_id: carouselId,
    slide_index: index,
  });
}

/** サイト内検索（ヘルプ・FAQ）。GA4推奨の search イベント。 */
export function trackSearch(
  searchTerm: string,
  resultCount: number,
  source: string,
): void {
  trackEvent("search", {
    search_term: searchTerm.slice(0, 100),
    result_count: resultCount,
    search_source: source,
  });
}

/** ページ内セクションへの到達（スクロール到達計測）。 */
export function trackSectionView(sectionId: string): void {
  trackEvent("section_view", {
    section_id: sectionId,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** ページのスクロール到達率（25/50/75/90/100%）。 */
export function trackScrollDepth(percent: number): void {
  trackEvent("scroll_depth", {
    percent_scrolled: percent,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** ページ単位の滞在時間（ミリ秒）。SPA遷移・タブ非表示・離脱時に送信。 */
export function trackPageEngagement(
  path: string,
  engagementTimeMsec: number,
): void {
  trackEvent("page_engagement", {
    page_path: path,
    engagement_time_msec: Math.round(engagementTimeMsec),
  });
}
