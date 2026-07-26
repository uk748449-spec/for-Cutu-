"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/shared/Icon";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Global keyboard-triggered easter egg. Mounted once at page root so
 * it can fire from anywhere on the site, not tied to a single
 * section. Same glass-card + amber-glow visual language as
 * everything else — just a hidden entry point rather than a new one.
 */
export function EasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let progress: string[] = [];

    function handleKey(e: KeyboardEvent) {
      progress.push(e.key);
      progress = progress.slice(-KONAMI.length);

      if (progress.join(",") === KONAMI.join(",")) {
        setOpen(true);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/85 px-margin-safe backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Secret room"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-md rounded-xl glass-card p-gutter text-center"
          >
            <Icon
              name="auto_awesome"
              className="mx-auto text-primary"
              size={40}
              aria-hidden="true"
            />

            <h3 className="mt-4 font-headline-md text-headline-md-mobile text-on-background">
              You found the secret room.
            </h3>

            <p className="mt-3 font-note-text text-note-text italic text-on-surface-variant">
              Of course you did. You find everything eventually — it&apos;s honestly a little annoying.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 font-label-sm text-label-sm uppercase tracking-widest text-primary"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}