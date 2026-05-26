"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  variant?: "light" | "dark" | "mesh";
  className?: string;
};

const variants = {
  light: "bg-section-light",
  dark: "bg-section-dark text-white",
  mesh: "mesh-gradient",
} as const;

/**
 * 各下層ページの共通ヘッダー。トップ以外のサブページで再利用する。
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  variant = "mesh",
  className,
}: Props) {
  const isDark = variant === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        variants[variant],
        "px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">
        {eyebrow ? (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "inline-block rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest",
              isDark ? "bg-white/10 text-white/80 ring-1 ring-white/20" : "bg-primary-50 text-primary-700",
            )}
          >
            {eyebrow}
          </motion.span>
        ) : null}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={cn(
            "mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl",
            isDark ? "text-white" : "text-neutral-900",
          )}
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              "mt-6 max-w-3xl text-base leading-relaxed sm:text-lg",
              isDark ? "text-on-dark-muted" : "text-neutral-600",
            )}
          >
            {description}
          </motion.div>
        ) : null}

        {actions ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {actions}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
