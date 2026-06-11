"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { BODY_LINE_COUNT, type DemoState } from "./scenario";
import { Caret, ModalShell, SaveDialog } from "./panels";
import { PhoneGlyph } from "./BuildMock";

/**
 * シーン2「運用」= 投稿コンテンツ編集（/content/list）のデフォルメ。
 * 実UI準拠: ダッシュボード上のモーダル、表示対象/公開/掲載日時のフィールド群、
 * タイトル、「AI記事作成」= emerald→teal グラデ、ビジュアル/HTMLタブ + ツールバー、
 * 保存 = brand青。
 */
export default function OperateMock({ state }: { state: DemoState }) {
  return (
    <ModalShell>
      <div className="relative flex h-full flex-col bg-white text-left">
      {/* タイトル行 */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-neutral-100 px-3 py-1.5">
        <NewsIcon className="h-3 w-3 text-[#465fff]" />
        <span className="text-[10px] font-bold text-neutral-800">投稿コンテンツ編集</span>
        <span className="ml-auto grid h-4 w-4 place-items-center rounded-full bg-neutral-100 text-neutral-400">
          <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </span>
      </div>

      {/* フィールド群 */}
      <div className="grid shrink-0 grid-cols-2 gap-x-2 gap-y-1 px-3 pt-1.5">
        <Field label="表示対象">
          <SelectBox value="全会員" />
        </Field>
        <Field label="公開/非公開">
          <SelectBox value="公開" />
        </Field>
        <Field label="掲載開始日時">
          <div className="flex h-[16px] items-center justify-between rounded border border-neutral-200 bg-white px-1.5 text-[8px] font-semibold text-neutral-800">
            2026/06/11 09:33
            <CalendarIcon className="h-2 w-2 text-neutral-400" />
          </div>
        </Field>
        <Field label="掲載終了日時">
          <SelectBox value="選択しない" muted />
        </Field>
      </div>

      {/* タイトル */}
      <div className="shrink-0 px-3 pt-1.5">
        <div className="text-[7px] font-semibold text-neutral-500">タイトル</div>
        <div
          data-demo="post-title"
          className={cn(
            "mt-0.5 flex h-[18px] items-center rounded border bg-white px-1.5",
            state.typing ? "border-[#465fff] ring-1 ring-blue-200" : "border-neutral-200"
          )}
        >
          <span className="truncate text-[9px] font-bold text-neutral-800">{state.postTitle}</span>
          {state.typing && <Caret className="h-2.5 text-neutral-800" />}
        </div>
      </div>

      {/* 本文ラベル + AI記事作成 */}
      <div className="flex shrink-0 items-center justify-between px-3 pt-1.5">
        <span className="text-[7px] font-semibold text-neutral-500">本文</span>
        <motion.span
          data-demo="ai-write"
          animate={state.aiGenerating ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            state.aiGenerating ? { duration: 1.2, repeat: Infinity } : { duration: 0.2 }
          }
          className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-2 py-1 text-[8px] font-bold text-white shadow-sm"
        >
          <PenSparkIcon className="h-2 w-2" />
          AI記事作成
        </motion.span>
      </div>

      {/* リッチテキストエディタ */}
      <div className="mx-3 mt-1 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-neutral-200">
        {/* タブ */}
        <div className="flex shrink-0 border-b border-neutral-200 bg-neutral-100 text-[7px] font-bold">
          <span className="border-b-2 border-blue-500 bg-white px-2.5 py-1 text-neutral-800">
            ビジュアル
          </span>
          <span className="px-2.5 py-1 text-neutral-500">HTML</span>
        </div>
        {/* ツールバー */}
        <div className="flex shrink-0 items-center gap-1 border-b border-neutral-200 bg-neutral-50 px-1.5 py-1 text-[7px] text-neutral-600">
          <span className="flex items-center gap-0.5 rounded border border-neutral-200 bg-white px-1 py-px">
            デフォルト <DropGlyph />
          </span>
          <span className="flex items-center gap-0.5 rounded border border-neutral-200 bg-white px-1 py-px">
            標準 <DropGlyph />
          </span>
          <span className="px-0.5 font-extrabold">B</span>
          <span className="px-0.5 italic">I</span>
          <span className="px-0.5 underline">U</span>
          <span className="px-0.5 line-through">S</span>
          <span className="hidden items-center gap-0.5 rounded border border-neutral-200 bg-white px-1 py-px md:flex">
            段落 <DropGlyph />
          </span>
          <span className="hidden px-0.5 md:inline">•</span>
          <span className="hidden px-0.5 md:inline">1.</span>
          <span className="ml-auto rounded bg-yellow-200 px-0.5 font-bold">A</span>
        </div>
        {/* 本文エリア */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-white p-2">
          {/* AI生成中ローダー */}
          <AnimatePresence>
            {state.aiGenerating && state.bodyLines === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 pt-0.5"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                ))}
                <span className="ml-1 text-[7px] font-semibold text-emerald-600">
                  AIが記事を作成中...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ストリーミング本文 */}
          <div className="space-y-1.5">
            {state.bodyLines >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[8px] leading-relaxed text-neutral-700"
              >
                本日より夏の新作フェアを開催いたします。
              </motion.p>
            )}
            {Array.from({ length: BODY_LINE_COUNT - 1 }, (_, i) => i + 2).map(
              (line) =>
                state.bodyLines >= line && (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, scaleX: 0.6 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    style={{ originX: 0 }}
                    className={cn(
                      "h-1.5 rounded-full bg-neutral-200",
                      line === 2 && "w-[92%]",
                      line === 3 && "w-[85%]",
                      line === 4 && "w-[60%]"
                    )}
                  />
                )
            )}
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
          data-demo="post-save"
          className="rounded-lg bg-[#465fff] px-3 py-1 text-[8px] font-bold text-white shadow-sm"
        >
          保存
        </span>
      </div>

        {/* 保存成功ダイアログ */}
        <SaveDialog show={state.postSaved} message="投稿コンテンツが正常に保存されました。" />
      </div>
    </ModalShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="text-[7px] font-semibold text-neutral-500">{label}</div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function SelectBox({ value, muted = false }: { value: string; muted?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-[16px] items-center justify-between rounded border border-neutral-200 bg-white px-1.5 text-[8px] font-semibold",
        muted ? "text-neutral-400" : "text-neutral-800"
      )}
    >
      {value}
      <DropGlyph />
    </div>
  );
}

function DropGlyph() {
  return (
    <svg className="h-1.5 w-1.5 shrink-0 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 9l7 7 7-7H5z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function NewsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16a1 1 0 011 1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a1 1 0 011-1zM7 9h6M7 13h10M7 17h10M17 9h0"
      />
    </svg>
  );
}

function PenSparkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 3l4 4L8 20l-5 1 1-5L17 3z" />
    </svg>
  );
}
