"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { THEMES, type DemoState, type ThemeId } from "./scenario";
import { Caret, ThemeGradient } from "./panels";

/**
 * 様式化したホーム画面ビルダーUI。
 * 上: ツールバー（公開）+ プロパティバー（テーマカラー / 見出し）
 * 左: コンポーネントパレット / 中央: ブロックキャンバス。
 * 右下はスマホモックが重なるため、操作ターゲットは上部と左に配置する。
 */
export default function DashboardMock({
  state,
  dragging,
  grabbing,
}: {
  state: DemoState;
  /** ドラッグゴースト随伴中（キャンバスにドロップ枠を表示） */
  dragging: boolean;
  /** パレットの「クーポン」を掴んでいる間の強調 */
  grabbing: boolean;
}) {
  const theme = THEMES[state.theme];

  return (
    <div className="flex h-full flex-col bg-neutral-50 text-left">
      {/* アプリツールバー */}
      <div className="flex shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-3 py-1.5">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-primary-500 to-accent-500 text-[9px] font-extrabold text-white">
          m
        </span>
        <span className="truncate text-[10px] font-bold text-neutral-700">ホーム画面ビルダー</span>
        <span className="hidden rounded bg-neutral-100 px-1.5 py-0.5 text-[8px] font-semibold text-neutral-500 md:inline">
          下書き
        </span>
        <span className="ml-1 flex shrink-0 rounded-full bg-neutral-100 p-0.5">
          <span className="rounded-full bg-primary-600 px-2 py-0.5 text-[8px] font-bold text-white">
            かんたん
          </span>
          <span className="px-2 py-0.5 text-[8px] font-bold text-neutral-500">プロ</span>
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1 text-neutral-400 md:flex">
            <DeviceIcon kind="phone" active />
            <DeviceIcon kind="desktop" />
          </span>
          <motion.span
            data-demo="publish"
            animate={{ backgroundColor: state.published ? "#059669" : "#00509D" }}
            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[9px] font-bold text-white shadow-sm"
          >
            <AnimatePresence initial={false}>
              {state.published && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="grid"
                >
                  <CheckIcon className="h-2.5 w-2.5" />
                </motion.span>
              )}
            </AnimatePresence>
            {state.published ? "公開済み" : "公開"}
          </motion.span>
        </div>
      </div>

      {/* プロパティバー（テーマカラー / 見出し） */}
      <div className="flex shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-3 py-1.5">
        <span className="shrink-0 text-[8px] font-semibold text-neutral-500">テーマ</span>
        <span className="flex shrink-0 items-center gap-1.5">
          {(["ocean", "sunset", "forest"] as ThemeId[]).map((id) => (
            <span
              key={id}
              data-demo={`swatch-${id}`}
              className={cn(
                "h-3.5 w-3.5 rounded-full transition-shadow",
                state.theme === id && "ring-2 ring-neutral-400 ring-offset-1"
              )}
              style={{
                background: `linear-gradient(135deg, ${THEMES[id].from}, ${THEMES[id].to})`,
              }}
            />
          ))}
        </span>
        <span className="mx-1 h-3.5 w-px shrink-0 bg-neutral-200" />
        <span className="shrink-0 text-[8px] font-semibold text-neutral-500">見出し</span>
        <span
          data-demo="headline-field"
          className={cn(
            "flex h-[18px] min-w-0 flex-1 items-center rounded border bg-white px-1.5",
            state.typing ? "border-primary-400 ring-1 ring-primary-200" : "border-neutral-200"
          )}
        >
          <span className="truncate text-[8px] font-semibold text-neutral-800">
            {state.headline}
          </span>
          {state.typing && <Caret className="h-2.5 text-neutral-800" />}
        </span>
        <span className="ml-1 hidden shrink-0 items-center gap-1 md:flex">
          <span className="text-[8px] font-semibold text-neutral-500">通知</span>
          <span className="flex h-2.5 w-5 items-center justify-end rounded-full bg-primary-500 px-px">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        </span>
      </div>

      {/* 本体 */}
      <div className="flex min-h-0 flex-1">
        {/* パレット */}
        <div className="flex w-[22%] shrink-0 flex-col gap-1 border-r border-neutral-200 bg-white p-2">
          <div className="px-1 pb-0.5 text-[8px] font-bold uppercase tracking-wider text-neutral-400">
            パーツ
          </div>
          <PaletteItem icon="banner" label="バナー" />
          <PaletteItem
            icon="coupon"
            label="クーポン"
            active={grabbing || dragging}
            dataDemo="palette-coupon"
          />
          <PaletteItem icon="reserve" label="予約" />
          <PaletteItem icon="stamp" label="スタンプ" />
          <PaletteItem icon="news" label="お知らせ" />
        </div>

        {/* キャンバス（右下はスマホモックと重なるため左寄せ） */}
        <div className="relative min-w-0 flex-1 overflow-hidden p-2.5">
          <div
            data-demo="canvas-col"
            className="ml-4 flex h-full w-[58%] max-w-[200px] flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white p-2 shadow-sm"
          >
            {/* ヒーローブロック */}
            <div data-demo="hero-block" className="relative shrink-0 overflow-hidden rounded-lg px-2 py-2.5">
              <ThemeGradient theme={theme} />
              <div className="relative z-10">
                <div className="flex min-h-[12px] items-center text-[8px] font-bold leading-tight text-white">
                  <span className="truncate">{state.headline}</span>
                  {state.typing && <Caret className="h-2.5" />}
                </div>
                <div className="mt-1 h-1 w-2/3 rounded-full bg-white/50" />
              </div>
            </div>

            {/* ドロップ位置のヒント / クーポンブロック */}
            <AnimatePresence initial={false} mode="popLayout">
              {dragging && (
                <motion.div
                  key="drop-hint"
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 26 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="shrink-0 rounded-lg border border-dashed border-primary-400 bg-primary-50/60"
                />
              )}
              {state.couponAdded && (
                <motion.div
                  key="coupon-block"
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: -6 }}
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
                  <TicketIcon className="h-3 w-3 shrink-0" style={{ color: theme.solid }} />
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

            {/* メニューグリッド */}
            <motion.div layout className="grid shrink-0 grid-cols-2 gap-1.5">
              <div className="aspect-[4/3] rounded-lg bg-neutral-100" />
              <div className="aspect-[4/3] rounded-lg bg-neutral-100" />
            </motion.div>

            {/* お知らせリスト */}
            <motion.div layout className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
              <div className="h-1.5 w-3/4 rounded-full bg-neutral-200" />
              <div className="h-1.5 w-1/2 rounded-full bg-neutral-200" />
              <motion.div animate={{ backgroundColor: theme.solid }} className="h-5 rounded-md" />
            </motion.div>
          </div>

          {/* 公開トースト（キャンバス列の下） */}
          <AnimatePresence>
            {state.published && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-2 left-6 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-neutral-900 py-1 pl-1.5 pr-3 text-white shadow-xl"
              >
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
                <span className="text-[9px] font-bold">公開が完了しました</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PaletteItem({
  icon,
  label,
  active = false,
  dataDemo,
}: {
  icon: "banner" | "coupon" | "reserve" | "stamp" | "news";
  label: string;
  active?: boolean;
  dataDemo?: string;
}) {
  return (
    <div
      data-demo={dataDemo}
      className={cn(
        "flex items-center gap-1.5 rounded-lg border px-1.5 py-1.5 transition-colors",
        active
          ? "border-primary-400 bg-primary-50 ring-1 ring-primary-200"
          : "border-neutral-200 bg-neutral-50"
      )}
    >
      <span
        className={cn(
          "grid h-4 w-4 shrink-0 place-items-center rounded",
          active ? "bg-primary-100 text-primary-700" : "bg-white text-neutral-500"
        )}
      >
        <PaletteIcon kind={icon} />
      </span>
      <span className="truncate text-[8px] font-bold text-neutral-700">{label}</span>
    </div>
  );
}

function PaletteIcon({ kind }: { kind: "banner" | "coupon" | "reserve" | "stamp" | "news" }) {
  const common = {
    className: "h-2.5 w-2.5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "banner":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 15l5-5 5 5 4-4 4 4" />
        </svg>
      );
    case "coupon":
      return <TicketIcon className="h-2.5 w-2.5" />;
    case "reserve":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "stamp":
      return (
        <svg {...common}>
          <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
        </svg>
      );
    case "news":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M10.3 21a2 2 0 003.4 0" />
        </svg>
      );
  }
}

export function TicketIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9V7a2 2 0 012-2h14a2 2 0 012 2v2a3 3 0 000 6v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a3 3 0 000-6z" />
      <path d="M13 5v2M13 11v2M13 17v2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DeviceIcon({ kind, active = false }: { kind: "phone" | "desktop"; active?: boolean }) {
  return (
    <span
      className={cn(
        "grid h-4 w-4 place-items-center rounded",
        active ? "bg-primary-100 text-primary-700" : "text-neutral-400"
      )}
    >
      {kind === "phone" ? (
        <svg
          className="h-2.5 w-2.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          className="h-2.5 w-2.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <rect x="2" y="4" width="20" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
