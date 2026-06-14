"use client";

import { AnimatePresence, motion } from "framer-motion";
import { POST_TITLE, type DemoState } from "./scenario";
import { BlockIcon } from "./BuildMock";

/** アプリのブランドグラデーション（LPブランド色で固定） */
const BRAND = { from: "#00509D", to: "#00C4D6" };

/**
 * CSSスマホデバイスモック（ライブプレビュー）。
 * - 構築シーン: 1カラムバナー追加がホーム画面に即時反映、保存でフラッシュ
 * - 運用シーン: 投稿保存でプッシュ通知バナー + お知らせカードが挿入
 */
export default function PhoneMock({
  state,
  faded = false,
}: {
  state: DemoState;
  /** リセットフェード中（画面内コンテンツのみフェードアウト） */
  faded?: boolean;
}) {
  return (
    <div className="relative rounded-[2.2rem] border-[3px] border-neutral-800 bg-neutral-900 p-1.5 shadow-2xl">
      {/* サイドボタン */}
      <span className="absolute -left-[3px] top-16 h-10 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -right-[3px] top-12 h-7 w-[3px] rounded-r bg-neutral-700" />
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.7rem] bg-white">
        {/* ノッチ */}
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-neutral-900/90" />

        <motion.div
          animate={{ opacity: faded ? 0 : 1 }}
          transition={{ duration: 0.45 }}
          className="flex h-full flex-col"
        >
          {/* AppBar */}
          <div
            className="shrink-0 px-3 pb-2.5 pt-6"
            style={{
              background: `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`,
            }}
          >
            <div className="text-[8px] font-bold leading-tight text-white">
              エムスタアプリ
            </div>
            <div className="mt-1 h-1 w-1/2 rounded-full bg-white/50" />
          </div>

          {/* コンテンツ */}
          <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden p-2">
            {/* 見出しブロック（ビジュアルエディタで追加） */}
            <AnimatePresence initial={false} mode="popLayout">
              {state.veBlockAdded && (
                <motion.div
                  key="ve-heading"
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  className="px-0.5"
                >
                  <div className="text-[9px] font-semibold leading-tight text-neutral-900">
                    見出し
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* スライダーブロック（既存） */}
            <motion.div
              layout
              className="relative h-11 overflow-hidden rounded-lg bg-neutral-100"
            >
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background: `linear-gradient(120deg, ${BRAND.from}22, ${BRAND.to}33)`,
                }}
              />
              <span className="absolute left-1.5 top-1.5 grid h-3.5 w-3.5 place-items-center rounded bg-white/80 text-neutral-500">
                <BlockIcon kind="slider" className="h-2 w-2" />
              </span>
              <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                <span className="h-1 w-1 rounded-full bg-white" />
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span className="h-1 w-1 rounded-full bg-white/40" />
              </span>
            </motion.div>

            {/* 1カラムバナー（構築シーンで追加） */}
            <AnimatePresence initial={false} mode="popLayout">
              {state.bannerAdded && (
                <motion.div
                  key="banner"
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  className="relative h-8 overflow-hidden rounded-lg"
                  style={{
                    background: `linear-gradient(120deg, ${BRAND.to}, ${BRAND.from})`,
                  }}
                >
                  <span className="absolute left-1.5 top-1/2 grid h-3.5 w-3.5 -translate-y-1/2 place-items-center rounded bg-white/85 text-neutral-500">
                    <BlockIcon kind="banner" className="h-2 w-2" />
                  </span>
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-0.5">
                    <div className="h-1 w-12 rounded-full bg-white/80" />
                    <div className="h-1 w-8 rounded-full bg-white/50" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* お知らせセクション */}
            <motion.div layout className="space-y-1 pt-0.5">
              <div className="text-[7px] font-bold text-neutral-600">
                お知らせ
              </div>
              <AnimatePresence initial={false} mode="popLayout">
                {state.postSaved && (
                  <motion.div
                    key="new-post"
                    layout
                    initial={{ opacity: 0, scale: 0.88, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 340, damping: 26 }}
                    className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/70 px-1.5 py-1.5"
                  >
                    <span
                      className="h-5 w-5 shrink-0 rounded"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`,
                      }}
                    />
                    <div className="min-w-0">
                      <div className="truncate text-[7px] font-bold text-neutral-800">
                        {POST_TITLE}
                      </div>
                      <div className="mt-0.5 h-1 w-10 rounded-full bg-neutral-200" />
                    </div>
                    <span className="ml-auto shrink-0 rounded-full bg-red-500 px-1 py-px text-[5px] font-extrabold text-white">
                      NEW
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                layout
                className="flex items-center gap-1.5 rounded-lg bg-neutral-50 px-1.5 py-1.5"
              >
                <span className="h-5 w-5 shrink-0 rounded bg-neutral-200" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="h-1 w-3/4 rounded-full bg-neutral-200" />
                  <div className="h-1 w-1/2 rounded-full bg-neutral-200" />
                </div>
              </motion.div>
              <motion.div
                layout
                className="flex items-center gap-1.5 rounded-lg bg-neutral-50 px-1.5 py-1.5"
              >
                <span className="h-5 w-5 shrink-0 rounded bg-neutral-200" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="h-1 w-2/3 rounded-full bg-neutral-200" />
                  <div className="h-1 w-1/3 rounded-full bg-neutral-200" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ボトムナビ */}
          <div className="flex shrink-0 items-center justify-around border-t border-neutral-100 px-2 py-2">
            <span
              className="h-3.5 w-3.5 rounded"
              style={{ backgroundColor: BRAND.from }}
            />
            <span className="h-3.5 w-3.5 rounded bg-neutral-200" />
            <span className="h-3.5 w-3.5 rounded bg-neutral-200" />
            <span className="h-3.5 w-3.5 rounded bg-neutral-200" />
          </div>
        </motion.div>

        {/* 構築/ビジュアルエディタの保存時: 反映フラッシュ */}
        <AnimatePresence>
          {(state.buildSaved || state.veSaved) && (
            <motion.div
              key="flash"
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 z-20 bg-white"
            />
          )}
        </AnimatePresence>

        {/* 投稿保存時のプッシュ通知バナー */}
        <AnimatePresence>
          {state.postSaved && !faded && (
            <motion.div
              initial={{ y: -36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="absolute left-1.5 right-1.5 top-5 z-20 rounded-xl bg-white/95 px-2 py-1.5 shadow-lg ring-1 ring-neutral-200 backdrop-blur"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-md text-white"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`,
                  }}
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M10.3 21a2 2 0 003.4 0"
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[8px] font-bold text-neutral-900">
                    {POST_TITLE}
                  </div>
                  <div className="truncate text-[7px] text-neutral-500">
                    新しいお知らせが届きました
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
