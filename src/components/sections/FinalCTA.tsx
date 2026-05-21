"use client";

import { motion } from "framer-motion";
import { Button, ArrowIcon, DownloadIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="section-padding relative overflow-hidden bg-neutral-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-primary-500/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-accent-500/30 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 ring-1 ring-white/20"
        >
          Start now
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl"
        >
          アプリ開発の民主化は、
          <br />
          世界にどんな価値をもたらすのか。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base"
        >
          エムスタは、アプリを作るだけのツールではありません。
          <br className="hidden md:block" />
          アプリを運用し、改善し、価値を生み出し続けるためのオープンプラットフォームです。
          <br />
          まずは2週間無料で、エムスタの可能性を体験してください。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Button
            href={CTA_LINKS.signup}
            external={CTA_LINKS.signup.startsWith("http")}
            variant="primary"
            size="lg"
            icon={<ArrowIcon />}
          >
            2週間無料で始める
          </Button>
          <Button
            href="#partner-doc"
            variant="secondary"
            size="lg"
            icon={<DownloadIcon />}
            className="!border-white/0 !bg-white !text-neutral-900"
          >
            パートナー資料をダウンロード
          </Button>
          <Button
            href={CTA_LINKS.spirGeneral}
            external={CTA_LINKS.spirGeneral.startsWith("http")}
            variant="ghost"
            size="lg"
            icon={<ChatIcon />}
            className="!text-white hover:!bg-white/10"
          >
            オフィシャルに相談する
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
