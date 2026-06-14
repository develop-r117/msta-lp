/**
 * KVデモのシナリオ定義（単一ソース）。
 *
 * 実際のダッシュボードの3画面に即した3シーン構成:
 *
 * シーン1「構築」= 固定コンテンツ編集（ページビルダー / 紫テーマ）
 *   1. 「ブロックを追加」をクリック → ブロックピッカーが開く
 *   2. 「1カラムバナー」カードをクリック → ブロックリストとスマホに同時挿入
 *   3. 「保存」→ 緑チェック「保存しました」ダイアログ
 *
 * シーン2「ビジュアルエディタ」= ホーム - ブロック編集（青ツールバー）
 *   4. 「ビジュアルエディタモード」トグルをクリックしてアクセス
 *   5. 「ブロックを追加」→ キャンバスに見出しブロック + プロパティパネル + スマホ反映
 *   6. 「保存」→「保存しました」→ スマホに公開フラッシュ
 *
 * シーン3「運用」= 投稿コンテンツ編集（AI記事作成 / 緑グラデ）
 *   7. タイトルをタイプライター入力
 *   8. 「AI記事作成」→ ローダー → 本文がストリーミング生成
 *   9. 「保存」→ スマホにプッシュ通知 + お知らせカード挿入
 *
 * 各フェーズはカーソル座標（ダッシュボード領域に対する%）と
 * 適用される状態パッチを持ち、HeroDemo がタイマーで順送りする。
 */

export type SceneId = "build" | "visual" | "operate";

export type DemoState = {
  scene: SceneId;
  /* --- 構築シーン --- */
  /** ブロックピッカーモーダルが開いているか */
  pickerOpen: boolean;
  /** 「1カラムバナー」ブロックが追加済みか */
  bannerAdded: boolean;
  /** 構築の保存完了（保存しましたダイアログ） */
  buildSaved: boolean;
  /* --- ビジュアルエディタシーン --- */
  /** 「ビジュアルエディタモード」トグルがONか */
  veToggled: boolean;
  /** ビジュアルエディタで見出しブロックが追加済みか */
  veBlockAdded: boolean;
  /** ビジュアルエディタの保存完了（ダイアログ + スマホ公開フラッシュ） */
  veSaved: boolean;
  /* --- 運用シーン --- */
  postTitle: string;
  /** タイトル入力中（キャレット表示） */
  typing: boolean;
  /** AI記事作成の生成中ローダー */
  aiGenerating: boolean;
  /** 本文のストリーミング済み行数 (0〜4) */
  bodyLines: number;
  /** 投稿の保存完了（ダイアログ + スマホ通知） */
  postSaved: boolean;
};

export const POST_TITLE = "夏の新作フェア開催中";
export const BODY_LINE_COUNT = 4;

export const INITIAL_STATE: DemoState = {
  scene: "build",
  pickerOpen: false,
  bannerAdded: false,
  buildSaved: false,
  veToggled: false,
  veBlockAdded: false,
  veSaved: false,
  postTitle: "",
  typing: false,
  aiGenerating: false,
  bodyLines: 0,
  postSaved: false,
};

export type Phase = {
  id: string;
  /** フェーズの長さ(ms)。カーソルはこの時間で目標へ到達する */
  duration: number;
  /** カーソル目標座標（ダッシュボード領域に対する%） */
  cursor: { x: number; y: number };
  /** フェーズ開始時にクリックリップルを表示 */
  click?: boolean;
  /** フェーズ開始時に適用する状態パッチ */
  patch?: Partial<DemoState>;
  /** フローティングパネルの強調 */
  highlight?: "cms" | "ai" | null;
  /** リセット/シーン切替用フェードアウト */
  fade?: boolean;
};

// 座標は各 Mock の data-demo 要素の実測値（aspect-[16/10] 領域に対する%）
const HOME = { x: 40, y: 72 };
const ADD_BLOCK_BTN = { x: 55, y: 40.6 }; // data-demo="add-block"
const PICKER_BANNER = { x: 34.5, y: 48.1 }; // data-demo="picker-banner"
const BUILD_SAVE = { x: 60, y: 91 }; // data-demo="build-save"
const VE_TOGGLE = { x: 46.3, y: 8.4 }; // data-demo="ve-toggle"
const VE_ADD = { x: 8.3, y: 19.5 }; // data-demo="ve-add"
const VE_SAVE = { x: 63.6, y: 95 }; // data-demo="ve-save"
const TITLE_FIELD = { x: 20, y: 38.2 }; // data-demo="post-title"（フィールド左寄りをクリック）
const AI_BUTTON = { x: 57.7, y: 45 }; // data-demo="ai-write"
const POST_SAVE = { x: 60, y: 91 }; // data-demo="post-save"

/** 1文字ずつ postTitle を埋めるタイプライターフェーズ群 */
function typingPhases(): Phase[] {
  const chars = Array.from(POST_TITLE);
  return chars.map((_, i) => ({
    id: `o-type-${i + 1}`,
    duration: i === chars.length - 1 ? 550 : 110,
    cursor: TITLE_FIELD,
    patch: { postTitle: chars.slice(0, i + 1).join("") },
  }));
}

/** 本文をストリーミング風に1行ずつ出すフェーズ群 */
function streamingPhases(): Phase[] {
  return Array.from({ length: BODY_LINE_COUNT }, (_, i) => ({
    id: `o-stream-${i + 1}`,
    duration: i === BODY_LINE_COUNT - 1 ? 750 : 420,
    cursor: AI_BUTTON,
    highlight: "ai" as const,
    patch: {
      bodyLines: i + 1,
      ...(i === BODY_LINE_COUNT - 1 ? { aiGenerating: false } : null),
    },
  }));
}

export const PHASES: Phase[] = [
  /* ===== シーン1: 構築（固定コンテンツ編集） ===== */
  // リセット直後: 非表示のまま状態の逆転トランジションを済ませる
  { id: "settle", duration: 600, cursor: HOME, fade: true },
  { id: "b-start", duration: 1000, cursor: HOME },
  { id: "b-to-add", duration: 900, cursor: ADD_BLOCK_BTN },
  {
    id: "b-click-add",
    duration: 500,
    cursor: ADD_BLOCK_BTN,
    click: true,
    patch: { pickerOpen: true },
  },
  { id: "b-to-card", duration: 900, cursor: PICKER_BANNER },
  {
    id: "b-click-card",
    duration: 450,
    cursor: PICKER_BANNER,
    click: true,
    patch: { pickerOpen: false, bannerAdded: true },
    highlight: "cms",
  },
  { id: "b-applied", duration: 1100, cursor: HOME, highlight: "cms" },
  { id: "b-to-save", duration: 800, cursor: BUILD_SAVE },
  {
    id: "b-click-save",
    duration: 450,
    cursor: BUILD_SAVE,
    click: true,
    patch: { buildSaved: true },
  },
  { id: "b-saved", duration: 1300, cursor: HOME },

  /* ===== シーン2: ビジュアルエディタ（ホーム - ブロック編集） ===== */
  // アクセス: 「ビジュアルエディタモード」トグルをONにする
  {
    id: "v-to-toggle",
    duration: 800,
    cursor: VE_TOGGLE,
    patch: { buildSaved: false },
  },
  {
    id: "v-click-toggle",
    duration: 500,
    cursor: VE_TOGGLE,
    click: true,
    patch: { veToggled: true },
  },
  { id: "v-switch", duration: 600, cursor: VE_TOGGLE, fade: true },
  { id: "v-start", duration: 900, cursor: HOME, patch: { scene: "visual" } },
  // 編集: ブロック追加 → キャンバス/プロパティ/スマホに反映
  { id: "v-to-add", duration: 800, cursor: VE_ADD },
  {
    id: "v-click-add",
    duration: 450,
    cursor: VE_ADD,
    click: true,
    patch: { veBlockAdded: true },
    highlight: "cms",
  },
  { id: "v-applied", duration: 1100, cursor: HOME, highlight: "cms" },
  // 保存・公開
  { id: "v-to-save", duration: 800, cursor: VE_SAVE },
  {
    id: "v-click-save",
    duration: 450,
    cursor: VE_SAVE,
    click: true,
    patch: { veSaved: true },
  },
  { id: "v-saved", duration: 1500, cursor: HOME },

  /* ===== シーン切替（フェード中に運用画面へ差し替え） ===== */
  { id: "scene-switch", duration: 600, cursor: HOME, fade: true },

  /* ===== シーン3: 運用（投稿コンテンツ編集） ===== */
  {
    id: "o-start",
    duration: 900,
    cursor: HOME,
    patch: { scene: "operate", veSaved: false },
  },
  { id: "o-to-title", duration: 800, cursor: TITLE_FIELD },
  {
    id: "o-click-title",
    duration: 400,
    cursor: TITLE_FIELD,
    click: true,
    patch: { typing: true },
  },
  ...typingPhases(),
  { id: "o-to-ai", duration: 800, cursor: AI_BUTTON, patch: { typing: false } },
  {
    id: "o-click-ai",
    duration: 450,
    cursor: AI_BUTTON,
    click: true,
    patch: { aiGenerating: true },
    highlight: "ai",
  },
  { id: "o-ai-loading", duration: 900, cursor: AI_BUTTON, highlight: "ai" },
  ...streamingPhases(),
  { id: "o-to-save", duration: 900, cursor: POST_SAVE },
  {
    id: "o-click-save",
    duration: 450,
    cursor: POST_SAVE,
    click: true,
    patch: { postSaved: true },
  },
  { id: "o-celebrate", duration: 2300, cursor: HOME },
  { id: "reset", duration: 700, cursor: HOME, fade: true },
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
