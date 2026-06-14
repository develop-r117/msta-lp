"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, DownloadIcon } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupButton";
import { PRIMARY_NAV, type NavGroup } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenId(null);
  }, [pathname]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "glass shadow-md shadow-neutral-900/5"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        <Link
          href="/"
          className="group flex items-center"
          aria-label="エムスタ ホーム"
        >
          <Image
            src="/logo.png"
            alt="エムスタ"
            width={508}
            height={176}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="グローバルナビ" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((g) => (
              <li key={g.id} className="relative">
                <NavTrigger
                  group={g}
                  active={openId === g.id}
                  pathname={pathname}
                  onToggle={() =>
                    setOpenId((cur) => (cur === g.id ? null : g.id))
                  }
                />
                <AnimatePresence>
                  {openId === g.id && g.children ? (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-[calc(100%+8px)] w-80 -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl ring-1 ring-neutral-100"
                      onMouseLeave={() => setOpenId(null)}
                    >
                      <ul className="flex flex-col">
                        {g.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setOpenId(null)}
                              className="flex flex-col gap-0.5 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-primary-50/60"
                            >
                              <span className="text-sm font-bold text-neutral-900">
                                {c.label}
                              </span>
                              {c.description ? (
                                <span className="text-xs text-neutral-500">
                                  {c.description}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* SP/タブレットでは固定CTAを下部フローティング1本に集約するため、
              ヘッダー上部の常時表示CTAはデスクトップ(lg+)のみに限定 */}
          <Button
            href="/partners/document"
            variant="secondary"
            size="sm"
            icon={<DownloadIcon />}
            className="hidden lg:inline-flex"
          >
            資料DL
          </Button>
          <SignupButton
            variant="primary"
            size="sm"
            compact
            className="hidden lg:inline-flex"
          />

          <button
            type="button"
            aria-label="メニューを開く"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
          >
            <motion.div
              animate={mobileOpen ? "open" : "closed"}
              className="flex h-6 w-6 flex-col items-center justify-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -4 },
                  open: { rotate: 45, y: 1 },
                }}
                className="block h-0.5 w-5 origin-center bg-neutral-800"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1, y: 0 },
                  open: { opacity: 0, y: 0 },
                }}
                className="my-1 block h-0.5 w-5 bg-neutral-800"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 4 },
                  open: { rotate: -45, y: -7 },
                }}
                className="block h-0.5 w-5 origin-center bg-neutral-800"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-neutral-200 bg-white lg:hidden"
          >
            <div className="mx-auto max-h-[80vh] max-w-7xl overflow-y-auto px-4 py-4 sm:px-6">
              <ul className="flex flex-col">
                {PRIMARY_NAV.map((g) => (
                  <li
                    key={g.id}
                    className="border-b border-neutral-100 py-1.5 last:border-b-0"
                  >
                    {g.href ? (
                      <Link
                        href={g.href}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-50"
                      >
                        {g.label}
                      </Link>
                    ) : (
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-50">
                          {g.label}
                          <svg
                            className="h-4 w-4 text-neutral-500 transition-transform group-open:rotate-180"
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
                          </svg>
                        </summary>
                        <ul className="ml-2 mt-1 flex flex-col gap-0.5 border-l border-neutral-200 pl-3">
                          {g.children?.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className="block rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-primary-50/60 hover:text-primary-800"
                              >
                                <span className="font-semibold">{c.label}</span>
                                {c.description ? (
                                  <span className="block text-[11px] text-neutral-500">
                                    {c.description}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function NavTrigger({
  group,
  active,
  pathname,
  onToggle,
}: {
  group: NavGroup;
  active: boolean;
  pathname: string | null;
  onToggle: () => void;
}) {
  const isCurrent =
    !!pathname &&
    (group.href === pathname ||
      group.children?.some(
        (c) => pathname === c.href || pathname.startsWith(c.href + "/"),
      ));

  if (group.href) {
    return (
      <Link
        href={group.href}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          isCurrent
            ? "text-primary-700"
            : "text-neutral-700 hover:text-primary-700",
        )}
        aria-current={isCurrent ? "page" : undefined}
      >
        {group.label}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-haspopup="menu"
      aria-expanded={active}
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active || isCurrent
          ? "text-primary-700"
          : "text-neutral-700 hover:text-primary-700",
      )}
    >
      {group.label}
      <motion.svg
        animate={{ rotate: active ? 180 : 0 }}
        transition={{ duration: 0.15 }}
        className="h-3.5 w-3.5 text-neutral-400"
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
  );
}
