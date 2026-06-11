"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Phase } from "./scenario";

/**
 * デモを操作する疑似カーソル。
 * フェーズの duration に同期して目標座標（%）へ移動し、
 * クリック時はリップル + 押下スケールを演出する。
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

      {/* ポインタ本体（先端 = 座標原点） */}
      <motion.svg
        animate={{ scale: phase.click ? 0.85 : 1 }}
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
