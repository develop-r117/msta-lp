"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Phase } from "./scenario";
import { TicketIcon } from "./DashboardMock";

/**
 * デモを操作する疑似カーソル。
 * フェーズの duration に同期して目標座標（%）へ移動し、
 * クリックリップル / ドラッグゴースト（クーポンチップ）を演出する。
 */
export default function DemoCursor({ phase }: { phase: Phase }) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ left: `${phase.cursor.x}%`, top: `${phase.cursor.y}%` }}
      transition={{
        duration: Math.min(phase.duration / 1000, 1.1),
        ease: [0.32, 0.08, 0.24, 1],
      }}
      className="pointer-events-none absolute z-30"
    >
      {/* クリックリップル（カーソル先端中心） */}
      <AnimatePresence>
        {phase.click && (
          <motion.span
            key={phase.id}
            initial={{ scale: 0.3, opacity: 0.7 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute -left-3.5 -top-3.5 h-7 w-7 rounded-full bg-primary-400/50"
          />
        )}
      </AnimatePresence>

      {/* ドラッグゴースト */}
      <AnimatePresence>
        {phase.drag && (
          <motion.span
            key="ghost"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.95, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-4 flex items-center gap-1 whitespace-nowrap rounded-lg bg-white px-2 py-1 shadow-xl ring-1 ring-primary-200"
          >
            <TicketIcon className="h-3 w-3 text-primary-600" />
            <span className="text-[9px] font-bold text-neutral-800">クーポン</span>
          </motion.span>
        )}
      </AnimatePresence>

      {/* ポインタ本体（先端 = 座標原点） */}
      <motion.svg
        animate={{ scale: phase.pressed ? 0.82 : 1 }}
        transition={{ duration: 0.15 }}
        className="h-5 w-5 origin-top-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        viewBox="0 0 24 24"
      >
        <path
          d="M4.5 2.5l14.5 11.4-6.6.9 3.5 6.7-3.1 1.5-3.4-6.8-4.9 4.4V2.5z"
          fill="#fff"
          stroke="#111827"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
