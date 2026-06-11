"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PHASES, stateAt } from "./scenario";
import { AiPanel, BrowserChrome, CmsPanel } from "./panels";
import DashboardMock from "./DashboardMock";
import PhoneMock from "./PhoneMock";
import DemoCursor from "./DemoCursor";
import StaticKv from "./StaticKv";

/**
 * KVデモのオーケストレータ。
 * scenario.ts のフェーズをタイマーで順送りし、疑似カーソルの操作と
 * ダッシュボード / スマホプレビューの状態を同期させてループ再生する。
 *
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
  const inView = useInView(containerRef, { amount: 0.25 });

  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const active = inView && pageVisible;

  const [phaseIndex, setPhaseIndex] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(
      () => setPhaseIndex((i) => (i + 1) % PHASES.length),
      PHASES[phaseIndex].duration
    );
    return () => clearTimeout(timer);
  }, [active, phaseIndex]);

  const phase = PHASES[phaseIndex];
  const state = useMemo(() => stateAt(phaseIndex), [phaseIndex]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="エムスタの操作デモ: ダッシュボードでクーポン追加・テーマ変更・テキスト編集を行うと、アプリのプレビューに即時反映され、ワンクリックで公開される様子"
      data-phase={phase.id}
      className="relative"
    >
      <BrowserChrome>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-50">
          <motion.div
            aria-hidden
            animate={{ opacity: phase.fade ? 0 : 1 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <DashboardMock
              state={state}
              dragging={Boolean(phase.drag)}
              grabbing={Boolean(phase.pressed)}
            />
          </motion.div>
          <DemoCursor phase={phase} />
        </div>
      </BrowserChrome>

      <AiPanel active={phase.highlight === "ai"} />
      <CmsPanel active={phase.highlight === "cms"} />

      {/* ライブプレビュー（スマホ） */}
      <div className="absolute -bottom-10 -right-1 hidden w-[36%] max-w-[180px] sm:block lg:-bottom-12">
        <PhoneMock state={state} faded={Boolean(phase.fade)} />
      </div>
    </div>
  );
}
