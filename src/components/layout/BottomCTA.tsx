"use client";

import { motion } from "framer-motion";
import { Button, ArrowIcon, DownloadIcon, ChatIcon } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/sections";

type Audience = "general" | "agency" | "both";

type Props = {
  /** どちらの動線を強めるか。"agency" は資料DLを Primary に、"general" は無料を Primary に。 */
  audience?: Audience;
  title?: string;
  description?: string;
  className?: string;
};

const titles: Record<Audience, string> = {
  general: "アプリ制作を、もっと自由に。",
  agency: "アプリビジネスを、ここから始める。",
  both: "エムスタで、まず一歩を。",
};

const descs: Record<Audience, string> = {
  general:
    "まずは2週間無料トライアルで、エムスタの管理画面・CMS・モードの違いを体験してください。",
  agency:
    "代理店・制作会社・クリエイター向けの制度をまとめた資料をお送りします。オンラインで詳細をご相談いただくことも可能です。",
  both: "2週間無料トライアル、パートナー資料、オンライン相談から、最適な入り口を選んでください。",
};

export default function BottomCTA({ audience = "both", title, description, className }: Props) {
  const heading = title ?? titles[audience];
  const desc = description ?? descs[audience];

  const showAgencyPrimary = audience === "agency";

  return (
    <section
      aria-label="主要動線CTA"
      className={`relative isolate overflow-hidden bg-neutral-900 text-white ${className ?? ""}`}
    >
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

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold leading-normal tracking-tight md:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base"
        >
          {desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {showAgencyPrimary ? (
            <>
              <Button
                href="/partners/document"
                variant="primary"
                size="lg"
                icon={<DownloadIcon />}
              >
                パートナー資料をダウンロード
              </Button>
              <Button
                href={CTA_LINKS.spirGeneral}
                external={CTA_LINKS.spirGeneral.startsWith("http")}
                variant="secondary"
                size="lg"
                icon={<ChatIcon />}
                className="!border-white/0 !bg-white !text-neutral-900"
              >
                オンラインで相談する
              </Button>
              <Button
                href={CTA_LINKS.signup}
                external={CTA_LINKS.signup.startsWith("http")}
                variant="ghost"
                size="lg"
                icon={<ArrowIcon />}
                className="!text-white hover:!bg-white/10"
              >
                2週間無料を試す
              </Button>
            </>
          ) : (
            <>
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
                href="/partners/document"
                variant="secondary"
                size="lg"
                icon={<DownloadIcon />}
                className="!border-white/0 !bg-white !text-neutral-900"
              >
                パートナー資料DL
              </Button>
              <Button
                href={CTA_LINKS.spirGeneral}
                external={CTA_LINKS.spirGeneral.startsWith("http")}
                variant="ghost"
                size="lg"
                icon={<ChatIcon />}
                className="!text-white hover:!bg-white/10"
              >
                オンラインで相談
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
