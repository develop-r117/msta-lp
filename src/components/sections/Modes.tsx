"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import KvMedia from "@/components/ui/KvMedia";

type Mode = {
  id: string;
  label: string;
  headline: string;
  targets: string[];
  points: string[];
  /** プレビュー静止画。素材到着までは暫定でダッシュボード画像を使用 */
  image: string;
  /** プレビュー動画（任意）。用意でき次第ここに渡すだけで差し替え可能 */
  video?: { webm?: string; mp4?: string };
  /** プレビューで「何が見えるか」を一言で */
  previewNote: string;
  /** プレビュー上に重ねる差分のハイライト */
  highlights: string[];
  accent: string;
  badge: string;
  tone: "light" | "dark";
};

// NOTE: 本来は each mode の専用スクショ/プレビュー動画（旧 6.png / 7.png 相当）を割り当てる。
// 現状それらの素材が未配置のため、暫定で既存の 2.png を表示し、差分は注釈で示している。
const modes: Mode[] = [
  {
    id: "easy",
    label: "かんたんモード",
    headline: "リテラシーの壁を撤廃し、誰でも直感的に。",
    targets: [
      "事業者",
      "店舗担当者",
      "非エンジニア",
      "現場運用担当者",
      "一般の方",
    ],
    points: [
      "テンプレートを選んで初期設定だけで運用開始",
      "管理画面はガイド付き・項目ベースの入力",
      "リテラシーの壁を最小化",
    ],
    image: "/screenshots/2.png",
    previewNote: "ガイドに沿って項目を入力するだけ。難しい設定は出てきません。",
    highlights: ["ガイド付き入力", "設定項目は最小限", "テンプレから選ぶだけ"],
    accent: "from-primary-50 to-primary-100",
    badge: "bg-primary-500",
    tone: "light",
  },
  {
    id: "pro",
    label: "プロモード",
    headline: "より自由度の高い編集、コード差し込み、テンプレート制作。",
    targets: ["制作会社", "開発会社", "デザイナー", "クリエイター", "代理店"],
    points: [
      "詳細な画面設計 / カスタムCSS / コード差し込み",
      "テンプレート / コンポーネントの内製・販売",
      "クライアントの案件をエムスタ上で展開",
    ],
    image: "/screenshots/2.png",
    previewNote: "詳細な画面設計・カスタムCSS・コード差し込みまで自由に編集。",
    highlights: [
      "カスタムCSS / コード",
      "詳細な画面設計",
      "コンポーネント制作",
    ],
    accent: "from-primary-800 to-primary-900",
    badge: "bg-accent-400 text-primary-900",
    tone: "dark",
  },
];

export default function Modes() {
  return (
    <section id="modes" className="section-padding relative bg-section-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Easy / Pro"
          title={
            <>
              初心者にも、プロにも。
              <br className="hidden md:block" />
              使い方に合わせた<span className="text-gradient">2つのモード</span>
              。
            </>
          }
          description="同じプロジェクトを、ガイド付きで運用するか・細部まで作り込むか。各モードのプレビューで「何がどう違うのか」を一目で確認できます。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {modes.map((m, i) => {
            const isDark = m.tone === "dark";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={
                  isDark
                    ? "relative overflow-hidden rounded-3xl bg-section-dark p-7 shadow-xl ring-1 ring-white/10 md:p-9"
                    : "relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9"
                }
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${m.accent} opacity-60`}
                />

                <div className="relative">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full ${m.badge} px-3.5 py-1.5 text-xs font-bold ${isDark ? "" : "text-white"}`}
                  >
                    {m.label}
                  </span>
                  <h3
                    className={`mt-4 text-2xl font-bold md:text-3xl ${isDark ? "text-white" : "text-neutral-900"}`}
                  >
                    {m.headline}
                  </h3>

                  <div className="mt-5">
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-accent-400" : "text-neutral-500"}`}
                    >
                      対象
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.targets.map((t) => (
                        <span
                          key={t}
                          className={
                            isDark
                              ? "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15"
                              : "rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700"
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul
                    className={`mt-5 space-y-2.5 text-sm ${isDark ? "text-on-dark-muted" : "text-neutral-700"}`}
                  >
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span
                          className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? "bg-accent-400" : m.badge}`}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* プレビューフレーム: 何がどう違うかを枠＋注釈で明示（動画差し替え可能） */}
                  <div
                    className={`mt-7 overflow-hidden rounded-2xl ${isDark ? "border border-white/10 bg-white/5" : "border border-neutral-200 bg-neutral-100"}`}
                  >
                    <div
                      className={`flex items-center justify-between px-3 py-2 text-[11px] font-bold ${isDark ? "bg-white/5 text-white/80" : "bg-white text-neutral-600"}`}
                    >
                      <span className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-red-400" />
                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                        <span className="h-2 w-2 rounded-full bg-green-400" />
                      </span>
                      <span
                        className={
                          isDark ? "text-accent-400" : "text-primary-600"
                        }
                      >
                        編集画面
                      </span>
                    </div>
                    <div className="relative aspect-[16/10] w-full">
                      <KvMedia
                        image={m.image}
                        video={m.video}
                        alt={`${m.label} の編集画面プレビュー`}
                        className="absolute inset-0 h-full w-full object-cover"
                        imageClassName="object-cover"
                        sizes="(max-width: 1024px) 90vw, 45vw"
                      />
                      {/* 差分ハイライト注釈 */}
                      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-black/55 to-transparent p-3">
                        {m.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-neutral-800 shadow-sm backdrop-blur"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`mt-3 text-xs leading-relaxed ${isDark ? "text-on-dark-muted" : "text-neutral-500"}`}
                  >
                    {m.previewNote}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
