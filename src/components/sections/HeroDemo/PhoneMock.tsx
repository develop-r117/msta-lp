"use client";

import { AnimatePresence, motion } from "framer-motion";
import { THEMES, type DemoState } from "./scenario";
import { Caret, ThemeGradient } from "./panels";
import { TicketIcon } from "./DashboardMock";

/**
 * CSSスマホデバイスモック。
 * demoState を受け、ダッシュボード側の編集（ブロック挿入 / テーマ色 / 見出し / 公開通知）を
 * 「ライブプレビュー」としてリアルタイムに反映する。
 */
export default function PhoneMock({
  state,
  faded = false,
}: {
  state: DemoState;
  /** リセットフェード中（画面内コンテンツのみフェードアウト） */
  faded?: boolean;
}) {
  const theme = THEMES[state.theme];

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
          {/* ヘッダー（テーマグラデーション + 見出し） */}
          <div className="relative shrink-0 px-3 pb-4 pt-7">
            <ThemeGradient theme={theme} />
            <div className="relative z-10">
              <div className="flex min-h-[14px] items-center text-[9px] font-bold leading-tight text-white">
                <span className="line-clamp-1">{state.headline}</span>
                {state.typing && <Caret className="h-2.5" />}
              </div>
              <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/50" />
            </div>
          </div>

          {/* コンテンツ */}
          <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden p-2">
            <AnimatePresence initial={false} mode="popLayout">
              {state.couponAdded && (
                <motion.div
                  key="coupon"
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: -8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    borderColor: theme.solid,
                    backgroundColor: theme.soft,
                  }}
                  exit={{ opacity: 0 }}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-dashed px-2 py-1.5"
                >
                  <TicketIcon className="h-3.5 w-3.5 shrink-0" style={{ color: theme.solid }} />
                  <div className="min-w-0">
                    <div
                      className="text-[6px] font-extrabold tracking-wider"
                      style={{ color: theme.solid }}
                    >
                      COUPON
                    </div>
                    <div className="truncate text-[8px] font-bold text-neutral-800">
                      10% OFF クーポン
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div layout className="grid grid-cols-2 gap-1.5">
              <div className="aspect-square rounded-lg bg-neutral-100" />
              <div className="aspect-square rounded-lg bg-neutral-100" />
            </motion.div>
            <motion.div layout className="h-2 w-3/4 rounded-full bg-neutral-200" />
            <motion.div layout className="h-2 w-1/2 rounded-full bg-neutral-200" />
            <motion.div
              layout
              animate={{ backgroundColor: theme.solid }}
              className="h-7 rounded-xl"
            />
          </div>

          {/* ボトムナビ */}
          <div className="flex shrink-0 items-center justify-around border-t border-neutral-100 px-2 py-2.5">
            <span className="h-4 w-4 rounded bg-neutral-200" />
            <span className="h-4 w-4 rounded bg-neutral-200" />
            <span className="h-4 w-4 rounded bg-neutral-200" />
            <span className="h-4 w-4 rounded bg-neutral-200" />
          </div>
        </motion.div>

        {/* 公開時のプッシュ通知バナー */}
        <AnimatePresence>
          {state.published && !faded && (
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
                  style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[8px] font-bold text-neutral-900">
                    アプリを更新しました
                  </div>
                  <div className="truncate text-[7px] text-neutral-500">
                    最新のホーム画面が公開されました
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
