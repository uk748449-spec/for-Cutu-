"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/shared/Icon";
import { memoryJarNotes } from "@/lib/content";

/**
 * "Memory Jar" — physics-based in spirit rather than a full engine:
 * each note is a real framer-motion draggable object constrained to
 * the jar, with spring-back and momentum, which reads as physical
 * without pulling in a dedicated physics library for one section.
 * Tap (not drag) opens the note; "Shake" re-randomizes positions.
 */
export function MemoryJar() {
  const jarRef = useRef<HTMLDivElement | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [openNote, setOpenNote] = useState<string | null>(null);

  const positions = useMemo(() => {
    // seeded-ish pseudo-random layout, re-rolled every shake
    return memoryJarNotes.map((note, i) => {
      const seed = shakeKey * 97 + i * 53;
      const pseudo = (n: number) => (Math.sin(n) * 10000) % 1;
      const top = 30 + Math.abs(pseudo(seed)) * 55;
      const left = 12 + Math.abs(pseudo(seed + 1)) * 70;
      return { id: note.id, top, left };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shakeKey]);

  const activeNote = memoryJarNotes.find((n) => n.id === openNote) ?? null;

  useEffect(() => {
    if (!openNote) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenNote(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openNote]);

  return (
    <section id="memory-jar" className="relative px-margin-safe py-section-gap-mobile md:py-section-gap-desktop">
      <div className="mx-auto max-w-container-max">
        <Reveal>
          <SectionHeader eyebrow="Drag. Tap. Read." title="The Memory Jar" align="center" />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={jarRef}
            className="relative mx-auto mt-16 h-[420px] w-full max-w-xl overflow-hidden rounded-[3rem] glass-panel"
          >
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-container/10 to-transparent" />

            {memoryJarNotes.map((note, i) => {
              const pos = positions[i];
              return (
                <motion.button
                  key={`${note.id}-${shakeKey}`}
                  type="button"
                  drag
                  dragConstraints={jarRef}
                  dragElastic={0.3}
                  dragMomentum
                  onTap={() => setOpenNote(note.id)}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16, delay: i * 0.05 }}
                  whileDrag={{ scale: 1.1 }}
                  style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                  className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary shadow-[0_0_20px_rgba(255,179,71,0.15)] active:cursor-grabbing"
                  aria-label="Open memory"
                >
                  <Icon name="favorite" size={22} aria-hidden="true" />
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center">
          <MagneticButton
            onClick={() => setShakeKey((k) => k + 1)}
            className="rounded-full border border-white/10 bg-white/5 px-6 py-2 font-label-sm text-label-sm text-primary"
          >
            Shake the jar
          </MagneticButton>
        </div>
      </div>

      <AnimatePresence>
        {activeNote && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-margin-safe backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenNote(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Memory note"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md rounded-xl glass-card p-gutter text-center"
            >
              <Icon name="favorite" className="mx-auto text-primary" size={24} aria-hidden="true" />
              <p className="mt-4 font-note-text text-note-text italic text-on-background">
                {activeNote.text}
              </p>
              <button
                onClick={() => setOpenNote(null)}
                className="mt-6 font-label-sm text-label-sm uppercase tracking-widest text-primary"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
