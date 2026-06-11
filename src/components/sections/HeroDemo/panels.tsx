"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

/* ============================================================
 * HeroDemo 共有パーツ:
 * ブラウザ風クローム / フローティングパネル / 保存ダイアログ / キャレット
 * ============================================================ */

/** ブラウザ風クロームのカード。中身（ダッシュボード領域）を children で受ける */
export function BrowserChrome({
  label = "エムスタ 管理画面",
  children,
}: {
  /** タブに表示する画面名（シーン連動） */
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10">
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </span>
        <span className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-500 ring-1 ring-neutral-200">
          <EditorIcon />
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-primary-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
          </span>
          編集中
        </span>
      </div>
      {children}
    </div>
  );
}

/** かんたん / プロ モード切替ピル */
export function ModePill() {
  return (
    <div className="absolute -left-3 top-16 hidden rounded-full bg-white p-1 shadow-xl ring-1 ring-neutral-200 sm:flex">
      <span className="rounded-full bg-primary-600 px-3 py-1 text-[11px] font-bold text-white">
        かんたん
      </span>
      <span className="px-3 py-1 text-[11px] font-bold text-neutral-500">プロ</span>
    </div>
  );
}

/** AIパネル（シーン連動の文言 / active でパルス強調） */
export function AiPanel({
  active = false,
  title = "AI制作",
  subtitle = "画面を自動構成",
}: {
  active?: boolean;
  title?: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      animate={active ? { scale: 1.06 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={cn(
        "absolute -right-2 -top-5 hidden rounded-2xl bg-neutral-900 px-4 py-3 text-white shadow-xl sm:block",
        active && "ring-2 ring-accent-400"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
          <SparkIcon />
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-block"
              >
                {title}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="text-sm font-bold">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-block"
              >
                {subtitle}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** CMSパネル（active でパルス強調） */
export function CmsPanel({ active = false }: { active?: boolean }) {
  return (
    <motion.div
      animate={active ? { scale: 1.06 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={cn(
        "absolute -left-4 bottom-16 z-40 hidden rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-neutral-200 sm:block",
        active && "ring-2 ring-primary-400"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-100 text-primary-700">
          <CmsIcon />
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
            CMS
          </div>
          <div className="text-sm font-bold text-neutral-900">投稿・通知を更新</div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * 保存成功ダイアログ（実UIの SaveSuccessDialog のデフォルメ）。
 * 緑チェック + 「保存しました」。親（ダッシュボード領域）に absolute 配置。
 */
export function SaveDialog({ show, message }: { show: boolean; message: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-20 grid place-items-center bg-neutral-900/20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            className="flex w-[52%] max-w-[230px] flex-col items-center gap-1.5 rounded-2xl bg-white px-4 py-3.5 shadow-2xl"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 16, delay: 0.1 }}
              className="grid h-7 w-7 place-items-center rounded-full bg-green-100 text-green-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.span>
            <span className="text-[11px] font-bold text-neutral-900">保存しました</span>
            <span className="text-center text-[8px] leading-snug text-neutral-500">{message}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * 編集モーダルのシェル。
 * 実UI同様、ダッシュボード（サイドバー+一覧のスケルトン）の上に
 * モーダルカードとして編集画面を重ねる。スマホモックと重ならないよう左寄せ。
 */
export function ModalShell({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 bg-neutral-100">
      {/* 背景のダッシュボードスケルトン */}
      <div className="absolute inset-y-0 left-0 w-[10%] space-y-2 border-r border-neutral-200 bg-white p-2">
        <div className="h-2 w-2/3 rounded bg-primary-200" />
        <div className="h-1.5 rounded bg-neutral-100" />
        <div className="h-1.5 rounded bg-neutral-200" />
        <div className="h-1.5 rounded bg-neutral-100" />
        <div className="h-1.5 rounded bg-neutral-100" />
      </div>
      <div className="absolute inset-y-0 left-[10%] right-0 space-y-1.5 p-3">
        <div className="h-2.5 w-1/4 rounded bg-neutral-300" />
        <div className="h-4 rounded bg-white" />
        <div className="h-4 rounded bg-white" />
        <div className="h-4 rounded bg-white" />
      </div>
      {/* ディム */}
      <div className="absolute inset-0 bg-neutral-900/25" />
      {/* 編集モーダル本体 */}
      <div className="absolute bottom-[4.5%] left-[3.5%] top-[4.5%] w-[62%] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

/** タイプ中の点滅キャレット */
export function Caret({ className }: { className?: string }) {
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      className={cn("ml-px inline-block w-px self-stretch bg-current align-middle", className)}
    />
  );
}

/** モーダル/フォームの ✕ 閉じるボタン風 */
export function CloseGlyph() {
  return (
    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-400">
      <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

function EditorIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 4H4v16h16v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      />
    </svg>
  );
}

function CmsIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h7" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
      />
    </svg>
  );
}
