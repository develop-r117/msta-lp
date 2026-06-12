"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { DemoState } from "./scenario";
import { ModalShell, SaveDialog } from "./panels";
import BlockPicker from "./BlockPicker";

/**
 * シーン1「構築」= 固定コンテンツ編集（/build/static）のデフォルメ。
 * 実UI準拠: ダッシュボード上のモーダル、紫テーマ、ページビルダーセクション
 * （from-purple-50 to-pink-50 ヘッダー、AI制作 = violet→fuchsia /
 * ブロックを追加 = purple-600）、フッターの プレビュー/キャンセル/保存。
 */
export default function BuildMock({ state }: { state: DemoState }) {
  const blockCount = state.bannerAdded ? 2 : 1;

  return (
    <ModalShell>
      <div className="relative flex h-full flex-col bg-white text-left">
      {/* タイトル行 */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-neutral-100 px-3 py-1.5">
        <DocIcon className="h-3 w-3 text-purple-500" />
        <span className="text-[10px] font-bold text-neutral-800">固定コンテンツ編集</span>
        <span
          data-demo="ve-toggle"
          className={cn(
            "ml-auto flex items-center gap-1 rounded-lg border px-2 py-0.5 transition-colors",
            state.veToggled
              ? "border-purple-400 bg-purple-100"
              : "border-purple-200 bg-purple-50/50"
          )}
        >
          <span
            className={cn(
              "grid h-2.5 w-2.5 place-items-center rounded-[3px] border text-white",
              state.veToggled ? "border-purple-600 bg-purple-600" : "border-purple-300 bg-white"
            )}
          >
            {state.veToggled && (
              <svg className="h-1.5 w-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="text-[7px] font-semibold text-purple-700">
            ビジュアルエディタモードを有効にする
          </span>
        </span>
        <span className="grid h-4 w-4 place-items-center rounded-full bg-neutral-100 text-neutral-400">
          <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </span>
      </div>

      {/* フィールドバー: 画面名 / URLスラッグ */}
      <div className="flex shrink-0 gap-2 border-b border-neutral-100 bg-neutral-50/60 px-3 py-1.5">
        <div className="min-w-0 flex-1">
          <div className="text-[7px] font-semibold text-neutral-500">画面名</div>
          <div className="mt-0.5 flex h-[16px] items-center rounded border border-neutral-200 bg-white px-1.5 text-[8px] font-semibold text-neutral-800">
            ホーム
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[7px] font-semibold text-neutral-500">
            URLスラッグ <span className="font-normal text-neutral-400">（Webのみ・任意）</span>
          </div>
          <div className="mt-0.5 flex h-[16px] items-center gap-1 rounded border border-neutral-200 bg-white px-1.5 text-[8px] text-neutral-400">
            <span className="font-semibold text-neutral-500">/p/</span>
            home
          </div>
        </div>
      </div>

      {/* 折りたたみアコーディオン */}
      <div className="flex shrink-0 gap-1.5 px-3 pt-1.5">
        <span className="flex flex-1 items-center gap-1 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-[7px] font-semibold text-neutral-600">
          <ChevronIcon /> 会員ランク別アクセス制御
        </span>
        <span className="flex flex-1 items-center gap-1 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-[7px] font-semibold text-neutral-600">
          <ChevronIcon /> 画面表示設定（AppBar・背景・ボトムメニュー）
        </span>
      </div>

      {/* ページビルダーセクション */}
      <div className="mx-3 mt-1.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-neutral-200">
        {/* セクションヘッダー */}
        <div className="flex shrink-0 items-center gap-1.5 bg-gradient-to-r from-purple-50 to-pink-50 px-2 py-1.5">
          <CubesIcon className="h-3 w-3 shrink-0 text-purple-500" />
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="truncate text-[9px] font-bold text-neutral-800">
                ホーム（ページビルダー）
              </span>
              <span className="text-[7px] text-neutral-500">({blockCount}ブロック)</span>
            </div>
            <div className="hidden truncate text-[6px] text-neutral-500 md:block">
              ブロックをドラッグ&ドロップで並び替え。クリックで編集。
            </div>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <span className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2 py-1 text-[8px] font-bold text-white shadow-sm">
              <MagicIcon className="h-2 w-2" />
              AI制作
            </span>
            <span
              data-demo="add-block"
              className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-2 py-1 text-[8px] font-bold text-white shadow-sm"
            >
              <span className="text-[9px] leading-none">+</span>
              ブロックを追加
            </span>
          </div>
        </div>

        {/* ブロックリスト */}
        <div className="min-h-0 flex-1 space-y-1 overflow-hidden bg-white p-1.5">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div key="slider-row" layout>
              <BlockRow kind="slider" name="スライダー" preview="1枚のスライド" index={1} />
            </motion.div>
            {state.bannerAdded && (
              <motion.div
                key="banner-row"
                layout
                initial={{ opacity: 0, scale: 0.9, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 360, damping: 26 }}
              >
                <BlockRow
                  kind="banner"
                  name="1カラムバナー"
                  preview="横幅いっぱいのバナー画像"
                  index={2}
                  highlighted
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-1 px-1 pt-0.5 text-[6px] text-neutral-400">
            <InfoIcon />
            ドラッグ&ドロップで並び順を変更できます
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="flex shrink-0 items-center gap-1.5 px-3 py-1.5">
        <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 text-[8px] font-semibold text-neutral-600">
          <PhoneGlyph />
          プレビュー
        </span>
        <span className="ml-auto rounded-lg border border-neutral-300 px-2.5 py-1 text-[8px] font-semibold text-neutral-600">
          キャンセル
        </span>
        <span
          data-demo="build-save"
          className="rounded-lg bg-purple-600 px-3 py-1 text-[8px] font-bold text-white shadow-sm"
        >
          保存
        </span>
      </div>

        {/* ブロックピッカーモーダル */}
        <BlockPicker open={state.pickerOpen} />

        {/* 保存成功ダイアログ */}
        <SaveDialog show={state.buildSaved} message="固定コンテンツが正常に保存されました。" />
      </div>
    </ModalShell>
  );
}

function BlockRow({
  kind,
  name,
  preview,
  index,
  highlighted = false,
}: {
  kind: BlockKind;
  name: string;
  preview: string;
  index: number;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg border px-1.5 py-1.5",
        highlighted ? "border-purple-300 bg-purple-50/60" : "border-neutral-200 bg-white"
      )}
    >
      <GripIcon className="h-2.5 w-2.5 shrink-0 text-neutral-300" />
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600">
        <BlockIcon kind={kind} className="h-2.5 w-2.5" />
      </span>
      <span className="grid h-3 w-3 shrink-0 place-items-center rounded-full bg-neutral-100 text-[6px] font-bold text-neutral-500">
        {index}
      </span>
      <div className="min-w-0">
        <div className="truncate text-[8px] font-bold text-neutral-800">{name}</div>
        <div className="truncate text-[6px] text-neutral-400">{preview}</div>
      </div>
      <span className="ml-auto flex shrink-0 gap-1 text-neutral-300">
        <PenIcon className="h-2 w-2" />
        <CopyIcon className="h-2 w-2" />
        <TrashIcon className="h-2 w-2" />
      </span>
    </div>
  );
}

/* ============ アイコン ============ */

export type BlockKind = "slider" | "banner" | "menu2" | "heading" | "text" | "article";

export function BlockIcon({ kind, className }: { kind: BlockKind; className?: string }) {
  const common = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "slider":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M2 9v6M22 9v6" />
        </svg>
      );
    case "banner":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 14l5-4 5 4 4-3 4 3" />
        </svg>
      );
    case "menu2":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="8" height="12" rx="1.5" />
          <rect x="13" y="6" width="8" height="12" rx="1.5" />
        </svg>
      );
    case "heading":
      return (
        <svg {...common}>
          <path d="M5 5v14M19 5v14M5 12h14" />
        </svg>
      );
    case "text":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      );
    case "article":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
        </svg>
      );
  }
}

function DocIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6zM14 3v6h6M9 13h6M9 17h6"
      />
    </svg>
  );
}

function CubesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function MagicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM5 19L17 7M19 15l.7 1.3L21 17l-1.3.7L19 19l-.7-1.3L17 17l1.3-.7L19 15z"
      />
    </svg>
  );
}

function GripIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="9" cy="6" r="1.6" />
      <circle cx="15" cy="6" r="1.6" />
      <circle cx="9" cy="12" r="1.6" />
      <circle cx="15" cy="12" r="1.6" />
      <circle cx="9" cy="18" r="1.6" />
      <circle cx="15" cy="18" r="1.6" />
    </svg>
  );
}

function PenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 3l4 4L8 20l-5 1 1-5L17 3z" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 8h.01M12 11v5" />
    </svg>
  );
}

export function PhoneGlyph() {
  return (
    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="h-1.5 w-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5l8 7-8 7V5z" />
    </svg>
  );
}
