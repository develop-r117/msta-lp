"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/cn";

export default function ScrollSpyNav() {
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      aria-label="セクションナビゲーション"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-1.5 rounded-full bg-white/70 p-2 shadow-lg shadow-neutral-900/10 backdrop-blur-md ring-1 ring-neutral-200/50">
        {NAV_SECTIONS.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group relative flex items-center justify-end gap-2",
                )}
              >
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all",
                    active
                      ? "bg-neutral-900 text-white opacity-100"
                      : "bg-white/80 text-neutral-600 opacity-0 group-hover:opacity-100",
                  )}
                >
                  {s.navLabel}
                </span>
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold transition-all",
                    active
                      ? "scale-110 bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md shadow-primary-500/30"
                      : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200",
                  )}
                >
                  {s.navNumber}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
