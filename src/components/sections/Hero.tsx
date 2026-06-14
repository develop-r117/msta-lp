"use client";

import { motion } from "framer-motion";
import { Button, DownloadIcon, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import HeroDemo from "@/components/sections/HeroDemo";
import { CTA_LINKS } from "@/lib/sections";

const badges = [
  { label: "2週間無料" },
  { label: "初期費用0円" },
  { label: "Web / iOS / Android" },
  { label: "CMS標準搭載" },
  { label: "オフィシャル制作対応" },
  { label: "パートナー還元あり" },
];

const platformPills = [
  { name: "Web", svg: WebIcon },
  { name: "iOS", svg: AppleIcon },
  { name: "Android", svg: AndroidIcon },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-section-light noise pt-28 md:pt-32 lg:pt-36"
    >
      {/* decorative orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: copy + CTA */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
              </span>
              真のノーコード × 最強CMS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-[2.25rem] font-bold leading-normal tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-[4rem]"
            >
              アプリ制作を、
              <br className="hidden sm:block" />
              もっと
              <span className="text-gradient">自由に。</span>
              <br className="hidden sm:block" />
              もっと
              <span className="text-gradient">身近に。</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg"
            >
              エムスタは、アプリ制作・運用・改善を一つにする次世代型アプリ制作プラットフォームです。
              <br className="hidden md:block" />
              Web・iOS・Androidに対応し、誰でも直感的に管理・更新できるCMSを標準搭載しています。
            </motion.p>

            {/* Platform pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              {platformPills.map(({ name, svg: Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Icon />
                  {name}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
                CMS標準搭載
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <SignupButton variant="primary" size="lg">
                2週間無料で始める
              </SignupButton>
              <Button
                href="#partner-doc"
                variant="secondary"
                size="lg"
                icon={<DownloadIcon />}
              >
                パートナー資料DL
              </Button>
              <Button
                href={CTA_LINKS.spirGeneral}
                external={CTA_LINKS.spirGeneral.startsWith("http")}
                variant="ghost"
                size="lg"
                icon={<ChatIcon />}
              >
                オンラインで相談する
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600"
            >
              {badges.map((b) => (
                <li key={b.label} className="inline-flex items-center gap-1.5">
                  <CheckIcon />
                  <span className="font-medium">{b.label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: 操作デモKV（ダッシュボード操作 → スマホプレビューに即時反映） */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none"
          >
            <HeroDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-100 text-primary-700">
      <svg
        className="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
  );
}

function WebIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.392 2.155-1.156 2.954-.87.91-1.875 1.439-2.96 1.36-.116-1.07.4-2.183 1.094-2.917.797-.853 2.034-1.448 3.022-1.397zM20.633 17.276c-.51 1.18-1.123 2.295-1.84 3.345-1.077 1.566-2.137 2.345-3.182 2.345-1.005 0-1.667-.336-2.99-.336-1.39 0-2.106.336-3.05.336-1.078 0-2.149-.91-3.295-2.49-1.96-2.7-2.65-6.13-1.4-8.78.81-1.71 2.27-2.86 3.92-2.91 1.07-.04 2.07.74 2.78.74.7 0 1.94-.92 3.27-.78.55.02 2.1.22 3.09 1.66-2.74 1.5-2.27 5.39.7 7.86z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.34a1.05 1.05 0 11-1.05-1.05 1.05 1.05 0 011.05 1.05M7.527 15.34a1.05 1.05 0 11-1.05-1.05 1.05 1.05 0 011.05 1.05m9.96-3.51 2.07-3.58a.42.42 0 00-.73-.42l-2.1 3.62a13.43 13.43 0 00-10.46 0L4.16 7.83a.42.42 0 00-.73.42l2.07 3.58A11.93 11.93 0 000 19.5h24a11.93 11.93 0 00-5.49-7.67" />
    </svg>
  );
}
