"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NAV_SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/cn";

export default function MobileSectionNav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(NAV_SECTIONS[0]?.id ?? "");
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setShow(window.scrollY > 480);
      if (open) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const sections = NAV_SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const active = NAV_SECTIONS.find((s) => s.id === activeId) ?? NAV_SECTIONS[0];

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-3 top-[72px] z-40 lg:hidden"
        >
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="セクション一覧を開く"
            className="glass flex w-full items-center justify-between gap-3 rounded-full px-4 py-2.5 shadow-md shadow-neutral-900/10"
          >
            <span className="flex items-center gap-2.5 text-left">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-[10px] font-bold text-white">
                {active.navNumber}
              </span>
              <span className="text-sm font-semibold text-neutral-900">
                {active.fullLabel}
              </span>
            </span>
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="h-4 w-4 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>

          <AnimatePresence>
            {open ? (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-2 max-h-[60vh] overflow-y-auto rounded-2xl bg-white p-2 shadow-xl ring-1 ring-neutral-200"
              >
                {NAV_SECTIONS.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                          isActive
                            ? "bg-primary-50 text-primary-800"
                            : "text-neutral-700 hover:bg-neutral-50",
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold",
                            isActive
                              ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white"
                              : "bg-neutral-100 text-neutral-500",
                          )}
                        >
                          {s.navNumber}
                        </span>
                        <span className="font-semibold">{s.fullLabel}</span>
                      </a>
                    </li>
                  );
                })}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
