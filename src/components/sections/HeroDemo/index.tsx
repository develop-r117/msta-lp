"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PHASES, stateAt } from "./scenario";
import { AiPanel, BrowserChrome, CmsPanel } from "./panels";
import BuildMock from "./BuildMock";
import VisualMock from "./VisualMock";
import OperateMock from "./OperateMock";
import PhoneMock from "./PhoneMock";
import DemoCursor from "./DemoCursor";
import StaticKv from "./StaticKv";

/**
 * KVデモのオーケストレータ。
 * scenario.ts のフェーズをタイマーで順送りし、構築（ページビルダー）→
 * 運用（投稿コンテンツ編集）の2シーンを疑似カーソルの操作と
 * スマホプレビューに同期させてループ再生する。
 *
 * - シーン切替はフェード中（fade フェーズ）に行い、切り替わりを見せない
 * - 画面外（useInView）・非表示タブ（visibilitychange）では進行を停止
 * - prefers-reduced-motion 時は静的コンポジションへフォールバック
 */
export default function HeroDemo() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <StaticKv />;
  return <AnimatedKv />;
}

function AnimatedKv() {
  const containerRef = useRef<HTMLDivElement>(null);
  // 画面内判定（楽観的に true で開始し、外れたら停止する）
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const active = inView && pageVisible;

  // 開発時の視覚検証用: ?demoPhase=<id> でフェーズを固定できる
  const frozenIndex = useMemo(() => {
    if (process.env.NODE_ENV === "production" || typeof window === "undefined") return -1;
    const id = new URLSearchParams(window.location.search).get("demoPhase");
    return id ? PHASES.findIndex((p) => p.id === id) : -1;
  }, []);

  const [phaseIndex, setPhaseIndex] = useState(frozenIndex >= 0 ? frozenIndex : 0);
  useEffect(() => {
    if (!active || frozenIndex >= 0) return;
    const timer = setTimeout(
      () => setPhaseIndex((i) => (i + 1) % PHASES.length),
      PHASES[phaseIndex].duration
    );
    return () => clearTimeout(timer);
  }, [active, phaseIndex, frozenIndex]);

  const phase = PHASES[phaseIndex];
  const state = useMemo(() => stateAt(phaseIndex), [phaseIndex]);
  const isOperate = state.scene === "operate";

  const CHROME_LABELS = {
    build: "固定コンテンツ編集",
    visual: "ホーム - ブロック編集",
    operate: "投稿コンテンツ編集",
  } as const;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="エムスタの操作デモ: ページビルダーでのブロック追加、ビジュアルエディタでの画面編集、AIによる投稿作成を行うと、アプリのプレビューに即時反映され保存・公開される様子"
      data-phase={phase.id}
      className="relative"
    >
      <BrowserChrome label={CHROME_LABELS[state.scene]}>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-50">
          <motion.div
            aria-hidden
            animate={{ opacity: phase.fade ? 0 : 1 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            {state.scene === "build" ? (
              <BuildMock state={state} />
            ) : state.scene === "visual" ? (
              <VisualMock state={state} />
            ) : (
              <OperateMock state={state} />
            )}
          </motion.div>
          <DemoCursor phase={phase} />
        </div>
      </BrowserChrome>

      <AiPanel
        active={phase.highlight === "ai"}
        title={isOperate ? "AI記事作成" : "AI制作"}
        subtitle={isOperate ? "記事を自動生成" : "画面を自動構成"}
      />
      <CmsPanel active={phase.highlight === "cms"} />

      {/* ライブプレビュー（スマホ） */}
      <div className="absolute -bottom-10 -right-1 hidden w-[36%] max-w-[180px] sm:block lg:-bottom-12">
        <PhoneMock state={state} faded={Boolean(phase.fade)} />
      </div>
    </div>
  );
}
