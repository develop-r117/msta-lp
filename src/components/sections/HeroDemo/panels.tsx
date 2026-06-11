"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Theme } from "./scenario";

/* ============================================================
 * HeroDemo 共有パーツ:
 * ブラウザ風クローム / フローティングパネル / テーマグラデーション / キャレット
 * ============================================================ */

/** ブラウザ風クロームのカード。中身（ダッシュボード領域）を children で受ける */
export function BrowserChrome({ children }: { children: ReactNode }) {
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
          エムスタ エディタ
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

/** AI生成パネル（active でパルス強調） */
export function AiPanel({ active = false }: { active?: boolean }) {
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
            AI生成
          </div>
          <div className="text-sm font-bold">画面を自動構成</div>
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
        "absolute -left-4 bottom-16 hidden rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-neutral-200 sm:block",
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

/** テーマ切替時にクロスフェードするグラデーション背景（親に relative が必要） */
export function ThemeGradient({ theme }: { theme: Theme }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={theme.from}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
      />
    </AnimatePresence>
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
