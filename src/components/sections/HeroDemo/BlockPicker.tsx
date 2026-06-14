"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { BlockIcon, type BlockKind } from "./BuildMock";

/**
 * 「ブロックを追加」ピッカーモーダルのデフォルメ。
 * 実UI: カテゴリpillタブ（すべて/メディア/コンテンツ/ナビゲーション）+
 * 紫系カードグリッド。ダッシュボード領域内に absolute 配置する。
 */

const CATEGORIES = ["すべて", "メディア", "コンテンツ", "ナビゲーション"];

const CARDS: {
  kind: BlockKind;
  name: string;
  desc: string;
  target?: boolean;
}[] = [
  { kind: "slider", name: "スライダー", desc: "複数の画像をスライド表示" },
  {
    kind: "banner",
    name: "1カラムバナー",
    desc: "横幅いっぱいのバナー画像",
    target: true,
  },
  { kind: "menu2", name: "2カラム正方形バナー", desc: "2つの正方形バナー" },
  { kind: "heading", name: "大見出し", desc: "大きな見出しテキスト" },
  { kind: "text", name: "テキスト", desc: "リッチテキストコンテンツ" },
  { kind: "article", name: "記事一覧（カード）", desc: "カード形式の記事一覧" },
];

export default function BlockPicker({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 z-10 grid place-items-center bg-neutral-900/30 backdrop-blur-[1px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="w-[86%] max-w-[330px] overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            {/* ヘッダー */}
            <div className="flex items-center gap-1.5 border-b border-neutral-100 px-3 py-2">
              <span className="text-[11px] font-bold text-purple-500">+</span>
              <span className="text-[10px] font-bold text-neutral-800">
                ブロックを追加
              </span>
              <span className="ml-auto grid h-3.5 w-3.5 place-items-center text-neutral-400">
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

            {/* カテゴリタブ */}
            <div className="flex gap-1 px-3 pt-2">
              {CATEGORIES.map((c, i) => (
                <span
                  key={c}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[7px] font-bold",
                    i === 0
                      ? "bg-purple-600 text-white"
                      : "bg-neutral-100 text-neutral-500",
                  )}
                >
                  {c}
                </span>
              ))}
            </div>

            {/* カードグリッド */}
            <div className="grid grid-cols-3 gap-1.5 p-3">
              {CARDS.map((card) => (
                <div
                  key={card.kind}
                  data-demo={card.target ? "picker-banner" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border-2 px-1 py-1.5 text-center",
                    card.target
                      ? "border-purple-400 bg-purple-50"
                      : "border-neutral-200 bg-white",
                  )}
                >
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                    <BlockIcon kind={card.kind} className="h-2.5 w-2.5" />
                  </span>
                  <span className="text-[7px] font-bold leading-tight text-neutral-800">
                    {card.name}
                  </span>
                  <span className="hidden text-[6px] leading-tight text-neutral-400 md:block">
                    {card.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
