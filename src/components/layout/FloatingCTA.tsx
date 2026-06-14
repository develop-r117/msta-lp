"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SignupFloatingTile } from "@/components/ui/SignupButton";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="border-t border-neutral-200 bg-white/95 px-3 py-2.5 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
            <div className="grid grid-cols-3 gap-2">
              <SignupFloatingTile />
              <a
                href="/partners/document"
                className="flex flex-col items-center justify-center rounded-xl bg-neutral-900 px-3 py-2.5 text-center text-white"
              >
                <span className="text-[10px] font-medium opacity-90">
                  資料DL
                </span>
                <span className="text-sm font-bold leading-none">
                  パートナー
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
