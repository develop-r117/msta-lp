/**
 * KVデモのシナリオ定義（単一ソース）。
 *
 * ループ構成:
 *   1. パレットから「クーポン」ブロックをキャンバスへドラッグ＆ドロップ
 *   2. インスペクタでテーマカラーを変更
 *   3. 見出しテキストをタイプライター編集
 *   4. 「公開」→ ダッシュボードにトースト / スマホに通知バナー
 *   5. フェードしてリセット
 *
 * 各フェーズはカーソル座標（ダッシュボード領域に対する%）と
 * 適用される状態パッチを持ち、HeroDemo がタイマーで順送りする。
 */

export type ThemeId = "ocean" | "sunset" | "forest";

export type Theme = {
  /** グラデーション開始色 */
  from: string;
  /** グラデーション終了色 */
  to: string;
  /** ボタン等の単色 */
  solid: string;
  /** 淡い背景色 */
  soft: string;
};

export const THEMES: Record<ThemeId, Theme> = {
  ocean: { from: "#00509D", to: "#00C4D6", solid: "#00509D", soft: "#E0F2FE" },
  sunset: { from: "#F97316", to: "#EC4899", solid: "#F0590E", soft: "#FFEDD5" },
  forest: { from: "#059669", to: "#84CC16", solid: "#059669", soft: "#D1FAE5" },
};

export type DemoState = {
  /** クーポンブロックが配置済みか */
  couponAdded: boolean;
  theme: ThemeId;
  headline: string;
  /** タイプ中（キャレット表示） */
  typing: boolean;
  published: boolean;
};

export const HEADLINE_BEFORE = "ようこそ、エムスタへ";
export const HEADLINE_AFTER = "夏の新作フェア開催中";

export const INITIAL_STATE: DemoState = {
  couponAdded: false,
  theme: "ocean",
  headline: HEADLINE_BEFORE,
  typing: false,
  published: false,
};

export type Phase = {
  id: string;
  /** フェーズの長さ(ms)。カーソルはこの時間で目標へ到達する */
  duration: number;
  /** カーソル目標座標（ダッシュボード領域に対する%） */
  cursor: { x: number; y: number };
  /** マウス押下中（カーソル縮小） */
  pressed?: boolean;
  /** フェーズ開始時にクリックリップルを表示 */
  click?: boolean;
  /** クーポンのドラッグゴーストを随伴 */
  drag?: boolean;
  /** フェーズ開始時に適用する状態パッチ */
  patch?: Partial<DemoState>;
  /** フローティングパネルの強調 */
  highlight?: "cms" | "ai" | null;
  /** リセット用フェードアウト */
  fade?: boolean;
};

// 座標は DashboardMock の data-demo 要素の実測値（aspect-[16/10] 領域に対する%）
const CURSOR_HOME = { x: 58, y: 72 };
const PALETTE_COUPON = { x: 11, y: 38.5 };
const CANVAS_DROP = { x: 43.5, y: 39 };
const SWATCH_SUNSET = { x: 12, y: 13.5 };
const TEXT_FIELD = { x: 32, y: 13.5 };
const PUBLISH_BUTTON = { x: 94.5, y: 4.6 };

/** 1文字ずつ headline を埋めるタイプライターフェーズ群 */
function typingPhases(): Phase[] {
  const chars = Array.from(HEADLINE_AFTER);
  return chars.map((_, i) => ({
    id: `type-${i + 1}`,
    duration: i === chars.length - 1 ? 650 : 110,
    cursor: TEXT_FIELD,
    highlight: "ai" as const,
    patch: { headline: chars.slice(0, i + 1).join("") },
  }));
}

export const PHASES: Phase[] = [
  // リセット直後: 非表示のままテーマ色やブロックの逆転トランジションを済ませる
  { id: "settle", duration: 600, cursor: CURSOR_HOME, fade: true },
  { id: "start", duration: 1000, cursor: CURSOR_HOME },
  { id: "to-palette", duration: 900, cursor: PALETTE_COUPON },
  { id: "grab", duration: 380, cursor: PALETTE_COUPON, pressed: true, click: true },
  { id: "drag", duration: 1100, cursor: CANVAS_DROP, pressed: true, drag: true },
  {
    id: "drop",
    duration: 950,
    cursor: CANVAS_DROP,
    patch: { couponAdded: true },
    highlight: "cms",
  },
  { id: "to-swatch", duration: 900, cursor: SWATCH_SUNSET },
  {
    id: "click-swatch",
    duration: 950,
    cursor: SWATCH_SUNSET,
    click: true,
    patch: { theme: "sunset" },
  },
  { id: "to-text", duration: 800, cursor: TEXT_FIELD },
  {
    id: "click-text",
    duration: 500,
    cursor: TEXT_FIELD,
    click: true,
    patch: { headline: "", typing: true },
    highlight: "ai",
  },
  ...typingPhases(),
  { id: "to-publish", duration: 900, cursor: PUBLISH_BUTTON, patch: { typing: false } },
  {
    id: "click-publish",
    duration: 500,
    cursor: PUBLISH_BUTTON,
    click: true,
    patch: { published: true },
  },
  { id: "celebrate", duration: 2400, cursor: CURSOR_HOME },
  { id: "reset", duration: 700, cursor: CURSOR_HOME, fade: true },
];

/** フェーズ index 時点の累積状態を返す（ループ先頭で自動的に初期状態へ戻る） */
export function stateAt(index: number): DemoState {
  let state = INITIAL_STATE;
  for (let i = 0; i <= index && i < PHASES.length; i++) {
    const patch = PHASES[i].patch;
    if (patch) state = { ...state, ...patch };
  }
  return state;
}
