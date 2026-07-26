"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Icon } from "@/components/shared/Icon";
import { notebookEntries } from "@/lib/content";

/**
 * Minimalist glass notebook, click-to-reveal. Uses note-text
 * (Literata italic) for the revealed thought, exactly as DESIGN.md
 * specifies: "note-text should be styled with a Rose Gold or Amber
 * tint to signify a 'handwritten' thought."
 */
export function Notebook() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="notebook" className="relative px-margin-safe py-section-gap-mobile md:py-section-gap-desktop">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeader
            eyebrow="Click To Open"
            title="Things I Never Said"
            align="center"
            accent="tertiary"
          />
        </Reveal>

        <div className="mt-16 space-y-4">
          {notebookEntries.map((entry, i) => {
            const isOpen = openId === entry.id;
            return (
              <Reveal key={entry.id} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : entry.id)}
                  aria-expanded={isOpen}
                  className="w-full rounded-xl glass-card p-gutter text-left transition-colors hover:border-primary/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-body-lg text-body-lg text-on-background">
                      {entry.prompt}
                    </span>
                    <Icon
                      name="add"
                      className="shrink-0 text-primary transition-transform duration-500"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      size={22}
                      aria-hidden="true"
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-t border-white/10 pt-4 font-note-text text-note-text italic text-primary/90">
                          {entry.reveal}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
