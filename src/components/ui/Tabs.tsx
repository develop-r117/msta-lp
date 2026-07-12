"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useId, useState, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { trackTabChange } from "@/lib/analytics";

export type TabItem<T extends string = string> = {
  id: T;
  label: ReactNode;
  content: ReactNode;
};

type Props<T extends string> = {
  items: readonly TabItem<T>[];
  defaultId?: T;
  className?: string;
  listClassName?: string;
  panelClassName?: string;
  ariaLabel?: string;
  tone?: "light" | "dark";
  /** GA計測用のタブグループ識別子。未指定時は ariaLabel を使用 */
  analyticsId?: string;
};

export default function Tabs<T extends string>({
  items,
  defaultId,
  className,
  listClassName,
  panelClassName,
  ariaLabel,
  tone = "light",
  analyticsId,
}: Props<T>) {
  const isDark = tone === "dark";
  const baseId = useId();
  const [active, setActive] = useState<T>(defaultId ?? items[0].id);

  const selectTab = (id: T) => {
    setActive(id);
    trackTabChange(analyticsId ?? ariaLabel ?? "tabs", id);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (
      e.key !== "ArrowRight" &&
      e.key !== "ArrowLeft" &&
      e.key !== "Home" &&
      e.key !== "End"
    )
      return;
    e.preventDefault();
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % items.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    selectTab(items[next].id);
    const target = document.getElementById(`${baseId}-tab-${items[next].id}`);
    target?.focus();
  };

  const activeItem = items.find((i) => i.id === active) ?? items[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "no-scrollbar flex gap-2 overflow-x-auto rounded-full p-1.5",
          isDark ? "bg-white/5 ring-1 ring-white/10" : "bg-neutral-100",
          listClassName,
        )}
      >
        {items.map((item, idx) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(e) => onKey(e, idx)}
              onClick={() => selectTab(item.id)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors md:px-5 md:py-2.5 md:text-[0.95rem]",
                selected
                  ? isDark
                    ? "text-primary-900"
                    : "text-white"
                  : isDark
                    ? "text-on-dark-muted hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`tabs-${baseId}-active`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={cn(
                    "absolute inset-0 -z-0 rounded-full",
                    isDark
                      ? "bg-accent-400"
                      : "bg-gradient-to-r from-primary-500 to-primary-600",
                  )}
                />
              ) : null}
              <span className="relative z-10 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          id={`${baseId}-panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={cn("mt-8", panelClassName)}
        >
          {activeItem.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
