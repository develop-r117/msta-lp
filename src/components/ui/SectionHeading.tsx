"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
  id,
}: Props) {
  const isDark = tone === "dark";
  return (
    <div
      id={id}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest",
            isDark
              ? "bg-white/10 text-accent-400 ring-1 ring-white/20"
              : "bg-primary-50 text-primary-700",
          )}
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={cn(
          "mt-4 text-3xl font-bold leading-normal tracking-tight sm:text-4xl md:text-5xl",
          isDark ? "text-white" : "text-neutral-900",
          eyebrow ? "" : "mt-0",
        )}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            isDark ? "text-on-dark-muted" : "text-neutral-600",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
