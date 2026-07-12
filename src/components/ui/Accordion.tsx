"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { trackFaqToggle } from "@/lib/analytics";

export type AccordionItem = {
  id: string;
  question: ReactNode;
  answer: ReactNode;
};

type Props = {
  items: AccordionItem[];
  className?: string;
  initialOpenId?: string;
  /** GA計測用のカテゴリラベル（例: "faq", "help"） */
  analyticsCategory?: string;
};

export default function Accordion({
  items,
  className,
  initialOpenId,
  analyticsCategory,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(initialOpenId ?? null);

  const toggle = (item: AccordionItem, open: boolean) => {
    setOpenId(open ? null : item.id);
    trackFaqToggle(item.id, open ? "close" : "open", analyticsCategory);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all",
              open && "border-primary-200 shadow-md shadow-primary-500/5",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => toggle(item, open)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-neutral-50/60 md:px-6"
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-neutral-900 md:text-base">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                  Q
                </span>
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-500"
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v14M5 12h14"
                  />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pl-12 text-sm leading-relaxed text-neutral-600 md:px-6 md:pl-14 md:text-[0.95rem]">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
