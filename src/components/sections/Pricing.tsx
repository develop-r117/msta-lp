"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button, ChatIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { CTA_LINKS } from "@/lib/sections";

const baseRow = {
  title: "アカウント基本利用料",
  price: "3,000",
  unit: "円 / 月",
  description: "1アカウントで複数アプリの作成・運用が可能",
};

const publishRows = [
  {
    name: "Webアプリ",
    price: "2,000",
    unit: "円 / URL",
    notes: ["ドメイン提供", "独自ドメイン接続可能"],
    icon: WebIcon,
  },
  {
    name: "iOSアプリ",
    price: "5,000",
    unit: "円 / 月",
    notes: ["App Store公開対応", "デベロッパー登録サポートあり"],
    icon: AppleIcon,
  },
  {
    name: "Androidアプリ",
    price: "5,000",
    unit: "円 / 月",
    notes: ["Google Play公開対応", "デベロッパー登録サポートあり"],
    icon: AndroidIcon,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding relative bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              初期費用不要で、
              <br className="hidden md:block" />
              <span className="text-gradient">誰でもすぐに</span>
              ご利用いただけます。
            </>
          }
          description="月額のみのシンプルな料金。最初は無料トライアルで、まずは触ってみてください。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Trial highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-7 text-white shadow-lg shadow-primary-500/20 md:p-9"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              Free Trial
            </p>
            <p className="mt-2 text-4xl font-black md:text-5xl">2週間無料</p>
            <p className="mt-3 text-sm text-white/90">
              登録から2週間、すべての機能を無料でお試しいただけます。クレジットカード登録不要。
            </p>
            <div className="mt-6">
              <SignupButton
                variant="secondary"
                size="md"
                fullWidth
                className="!text-primary-700"
              >
                無料で始める
              </SignupButton>
            </div>
          </motion.div>

          {/* Base plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Base
            </p>
            <p className="mt-2 text-base font-semibold text-neutral-900">
              {baseRow.title}
            </p>
            <p className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-black text-neutral-900 md:text-5xl">
                ¥{baseRow.price}
              </span>
              <span className="text-sm font-semibold text-neutral-500">
                {baseRow.unit}
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {baseRow.description}
            </p>

            <div className="mt-6 space-y-2">
              {[
                "アカウント発行・複数アプリ管理",
                "プロモード / かんたんモード対応",
                "管理ダッシュボード標準提供",
              ].map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-2 text-sm text-neutral-700"
                >
                  <CheckCircle />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Support callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm md:p-9"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Support Options
            </p>
            <p className="mt-2 text-base font-semibold text-neutral-900">
              公開・運用に必要なサポートも
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              デベロッパー登録、ストア申請代行、テストアプリの発行、素材制作など、公開に必要な各種サポートもご用意しています。
            </p>
            <p className="mt-4 rounded-xl bg-neutral-50 px-3 py-2 text-xs text-neutral-600 ring-1 ring-neutral-200">
              詳細料金はアカウント発行後のダッシュボード内でご案内します。
            </p>
            <div className="mt-6">
              <Button
                href={CTA_LINKS.spirOfficial}
                external={CTA_LINKS.spirOfficial.startsWith("http")}
                variant="ghost"
                size="md"
                fullWidth
                icon={<ChatIcon />}
              >
                オフィシャル制作に相談
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Publish pricing rows */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-sm font-semibold text-neutral-800">
            公開料金
          </div>
          <ul className="divide-y divide-neutral-100">
            {publishRows.map(({ name, price, unit, notes, icon: Icon }) => (
              <li
                key={name}
                className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-900 text-white">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{name}</p>
                    <p className="text-xs text-neutral-500">
                      {notes.join(" / ")}
                    </p>
                  </div>
                </div>
                <p className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-neutral-900">
                    ¥{price}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {unit}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <SignupButton variant="primary" size="lg">
            2週間無料で始める
          </SignupButton>
          <Button
            href={CTA_LINKS.spirOfficial}
            external={CTA_LINKS.spirOfficial.startsWith("http")}
            variant="secondary"
            size="lg"
            icon={<ChatIcon />}
          >
            オフィシャル制作に相談する
          </Button>
        </div>
      </div>
    </section>
  );
}

function CheckCircle() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
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
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.392 2.155-1.156 2.954-.87.91-1.875 1.439-2.96 1.36-.116-1.07.4-2.183 1.094-2.917.797-.853 2.034-1.448 3.022-1.397zM20.633 17.276c-.51 1.18-1.123 2.295-1.84 3.345-1.077 1.566-2.137 2.345-3.182 2.345-1.005 0-1.667-.336-2.99-.336-1.39 0-2.106.336-3.05.336-1.078 0-2.149-.91-3.295-2.49-1.96-2.7-2.65-6.13-1.4-8.78.81-1.71 2.27-2.86 3.92-2.91 1.07-.04 2.07.74 2.78.74.7 0 1.94-.92 3.27-.78.55.02 2.1.22 3.09 1.66-2.74 1.5-2.27 5.39.7 7.86z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.34a1.05 1.05 0 11-1.05-1.05 1.05 1.05 0 011.05 1.05M7.527 15.34a1.05 1.05 0 11-1.05-1.05 1.05 1.05 0 011.05 1.05m9.96-3.51 2.07-3.58a.42.42 0 00-.73-.42l-2.1 3.62a13.43 13.43 0 00-10.46 0L4.16 7.83a.42.42 0 00-.73.42l2.07 3.58A11.93 11.93 0 000 19.5h24a11.93 11.93 0 00-5.49-7.67" />
    </svg>
  );
}
