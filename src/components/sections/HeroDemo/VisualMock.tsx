"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { DemoState } from "./scenario";
import { SaveDialog } from "./panels";

/**
 * シーン2「ビジュアルエディタ」= ホーム - ブロック編集 のデフォルメ。
 * 実UI準拠: 青の「ブロックを追加」、AI制作（violet→fuchsia）、デバイス切替ピル、
 * レイヤー/プロパティの左パネル、中央キャンバス（青AppBarのアートボード）、
 * 紫の「保存」。右側の実機プレビューはKV右下のスマホモックがその役を担う。
 */
export default function VisualMock({ state }: { state: DemoState }) {
  return (
    <div className="relative flex h-full flex-col bg-white text-left">
      {/* タイトル行 */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-neutral-100 px-3 py-1.5">
        <CanvasIcon className="h-3 w-3 text-purple-500" />
        <span className="text-[10px] font-bold text-neutral-800">
          ホーム - ブロック編集
        </span>
        <span className="ml-auto grid h-4 w-4 place-items-center rounded-full bg-neutral-100 text-neutral-400">
          <svg
            className="h-2 w-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </span>
      </div>

      {/* 画面表示設定アコーディオン */}
      <div className="shrink-0 px-3 pt-1.5">
        <span className="flex items-center gap-1 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-[7px] font-semibold text-neutral-600">
          <ChevronGlyph /> 画面表示設定（AppBar・背景・ボトムメニュー）
        </span>
      </div>

      {/* ツールバー */}
      <div className="flex shrink-0 items-center gap-1 px-3 py-1.5">
        <span
          data-demo="ve-add"
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-[8px] font-bold text-white shadow-sm"
        >
          <span className="text-[9px] leading-none">+</span>
          ブロック追加
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2 py-1 text-[8px] font-bold text-white shadow-sm">
          <MagicGlyph className="h-2 w-2" />
          AI制作
        </span>
        <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[7px] font-bold text-blue-600 ring-1 ring-blue-200">
          <PhoneTinyGlyph />
          スマホ
        </span>
        <span className="hidden rounded-md px-1.5 py-0.5 text-[7px] font-semibold text-neutral-500 md:inline">
          タブレット縦
        </span>
        <span className="hidden rounded-md px-1.5 py-0.5 text-[7px] font-semibold text-neutral-500 md:inline">
          PC
        </span>
        <span className="rounded border border-neutral-200 px-1.5 py-0.5 text-[7px] font-semibold text-neutral-600">
          375×812
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[7px] font-bold transition-colors",
            state.veBlockAdded
              ? "border-pink-300 bg-pink-50 text-pink-600"
              : "border-neutral-200 text-neutral-300",
          )}
        >
          <MagicGlyph className="h-1.5 w-1.5" />
          ブランド化
        </span>
      </div>

      {/* 本体: 左パネル / キャンバス / 右余白（実機プレビュー位置） */}
      <div className="flex min-h-0 flex-1 border-t border-neutral-100">
        {/* 左パネル */}
        <div className="flex w-[24%] shrink-0 flex-col border-r border-neutral-100">
          <div className="flex shrink-0 border-b border-neutral-100 text-[7px] font-bold">
            <span className="px-2 py-1 text-neutral-400">レイヤー</span>
            <span className="border-b-2 border-blue-500 px-2 py-1 text-neutral-800">
              プロパティ
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden p-1.5">
            {state.veBlockAdded ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1.5"
              >
                <PropGroup label="位置">
                  <PropField k="X" v="0" />
                  <PropField k="Y" v="40" />
                </PropGroup>
                <PropGroup label="サイズ">
                  <PropField k="幅" v="375" />
                  <PropField k="高さ" v="40" />
                </PropGroup>
                <PropGroup label="テキスト">
                  <div className="flex h-[14px] flex-1 items-center rounded border border-neutral-200 bg-white px-1 text-[7px] font-bold text-neutral-800">
                    見出し
                  </div>
                </PropGroup>
                <PropGroup label="フォント">
                  <div className="flex h-[14px] flex-1 items-center justify-between rounded border border-neutral-200 bg-white px-1 text-[6px] font-semibold text-neutral-700">
                    Noto Sans JP
                    <DropGlyph />
                  </div>
                </PropGroup>
                <div className="flex gap-1">
                  <PropField k="サイズ" v="22" />
                  <div className="flex h-[14px] min-w-0 flex-1 items-center justify-between rounded border border-neutral-200 bg-white px-1 text-[6px] font-semibold text-neutral-700">
                    SemiBold
                    <DropGlyph />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="pt-2 text-center text-[6px] leading-relaxed text-neutral-400">
                ブロックを選択して
                <br />
                プロパティを編集
              </div>
            )}
          </div>
        </div>

        {/* キャンバス */}
        <div className="grid min-w-0 flex-1 place-items-center bg-neutral-100 py-1.5">
          <div className="flex aspect-[9/16] h-[94%] flex-col overflow-hidden rounded-md bg-white shadow-md ring-1 ring-neutral-200">
            {/* AppBar */}
            <div className="flex h-[13%] shrink-0 items-end justify-center bg-blue-500 pb-0.5">
              <span className="text-[6px] font-bold text-white">ホーム</span>
            </div>
            {/* 見出しブロック（選択状態） */}
            <AnimatePresence initial={false}>
              {state.veBlockAdded && (
                <motion.div
                  key="ve-heading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  className="relative mx-px mt-px shrink-0 border border-blue-400 bg-white px-1 py-0.5 ring-1 ring-blue-200"
                >
                  <span className="text-[8px] font-semibold leading-none text-neutral-900">
                    見出し
                  </span>
                  {/* 選択ハンドル */}
                  <span className="absolute -left-px -top-px h-1 w-1 rounded-full border border-blue-500 bg-white" />
                  <span className="absolute -right-px -top-px h-1 w-1 rounded-full border border-blue-500 bg-white" />
                  <span className="absolute -bottom-px -left-px h-1 w-1 rounded-full border border-blue-500 bg-white" />
                  <span className="absolute -bottom-px -right-px h-1 w-1 rounded-full border border-blue-500 bg-white" />
                </motion.div>
              )}
            </AnimatePresence>
            {/* 空きボディ */}
            <div className="min-h-0 flex-1" />
            {/* フッターセーフエリア */}
            <div className="h-[6%] shrink-0 border-t border-dashed border-neutral-300 bg-neutral-50" />
          </div>
        </div>

        {/* 右余白（KVのスマホモックが実機プレビューとして重なる領域） */}
        <div className="w-[30%] shrink-0 border-l border-neutral-100 bg-neutral-50" />
      </div>

      {/* フッター（スマホモックと重ならない位置に寄せる） */}
      <div className="flex shrink-0 items-center justify-end gap-1.5 px-3 py-1.5 pr-[33%]">
        <span className="rounded-lg border border-neutral-300 px-2.5 py-1 text-[8px] font-semibold text-neutral-600">
          キャンセル
        </span>
        <span
          data-demo="ve-save"
          className="rounded-lg bg-purple-600 px-3 py-1 text-[8px] font-bold text-white shadow-sm"
        >
          保存
        </span>
      </div>

      {/* 保存成功ダイアログ（エディタ領域の中央に表示） */}
      <div className="absolute inset-y-0 left-0 right-[28%]">
        <SaveDialog
          show={state.veSaved}
          message="ホーム画面を実機アプリに公開しました。"
        />
      </div>
    </div>
  );
}

function PropGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[6px] font-semibold text-neutral-400">{label}</div>
      <div className="mt-0.5 flex gap-1">{children}</div>
    </div>
  );
}

function PropField({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex h-[14px] min-w-0 flex-1 items-center gap-1 rounded border border-neutral-200 bg-white px-1">
      <span className="text-[6px] text-neutral-400">{k}</span>
      <span className="text-[7px] font-semibold text-neutral-800">{v}</span>
    </div>
  );
}

/* ============ アイコン ============ */

function CanvasIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path strokeLinecap="round" d="M3 9h18M9 9v12" />
    </svg>
  );
}

function MagicGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.4}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM5 19L17 7M19 15l.7 1.3L21 17l-1.3.7L19 19l-.7-1.3L17 17l1.3-.7L19 15z"
      />
    </svg>
  );
}

function PhoneTinyGlyph() {
  return (
    <svg
      className="h-2 w-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.4}
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  );
}

function DropGlyph() {
  return (
    <svg
      className="h-1.5 w-1.5 shrink-0 text-neutral-400"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M5 9l7 7 7-7H5z" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg
      className="h-1.5 w-1.5 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8 5l8 7-8 7V5z" />
    </svg>
  );
}
