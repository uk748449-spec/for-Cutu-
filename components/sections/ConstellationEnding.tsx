"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { endingMessages } from "@/lib/content";

const StarfieldCanvas = dynamic(
  () => import("@/components/effects/StarfieldCanvas").then((m) => m.StarfieldCanvas),
  { ssr: false }
);

// A handful of star points, drawn as a small connected constellation
// once the final message settles — echoes the "C" monogram loosely
// without trying to be literal about it.
const POINTS = [
  { x: 60, y: 40 },
  { x: 110, y: 20 },
  { x: 150, y: 55 },
  { x: 140, y: 100 },
  { x: 90, y: 105 },
];
const PATH = POINTS.map((p) => `${p.x},${p.y}`).join(" ");

/**
 * Same message-sequencing rhythm as LoadingScreen (3000ms hold /
 * 500ms gap, same fade+blur classnames), and the same important
 * detail: the paragraph's className stays a constant string across
 * renders, with the animation state owned entirely by direct
 * classList calls on the ref. If className were derived from React
 * state instead, a re-render mid-animation would reset the DOM
 * class list and silently cancel the transition — which is exactly
 * what happened in an earlier draft of this file. The final message
 * stays on screen instead of fading out — "simply end peacefully,"
 * per the brief — no button, no form, nothing to do.
 */
export function ConstellationEnding() {
  const [settled, setSettled] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let i = 0;

    function showNext() {
      const el = textRef.current;
      if (!el) return;
      if (i >= endingMessages.length) return;

      el.textContent = endingMessages[i];
      const isLast = i === endingMessages.length - 1;

      if (isLast) {
        el.classList.remove("opacity-0");
        el.classList.add("fade-in");
        timeouts.push(setTimeout(() => setSettled(true), 1800));
        return;
      }

      el.classList.remove("opacity-0");
      el.classList.add("loading-text-anim");
      timeouts.push(
        setTimeout(() => {
          el.classList.remove("loading-text-anim");
          el.classList.add("opacity-0");
          i++;
          timeouts.push(setTimeout(showNext, 500));
        }, 3000)
      );
    }

    timeouts.push(setTimeout(showNext, 800));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="ending"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-container-lowest px-margin-safe py-section-gap-desktop text-center"
    >
      <div className="absolute inset-0 h-full w-full">
        <StarfieldCanvas />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        <div className="flex h-24 items-center justify-center">
          <p
            ref={textRef}
            className="font-note-text text-note-text italic text-primary/90 opacity-0 md:text-[28px]"
          />
        </div>

        {settled && (
          <motion.svg
            viewBox="0 0 200 140"
            className="h-28 w-40 opacity-80"
            initial="hidden"
            animate="visible"
          >
            <motion.polyline
              points={PATH}
              fill="none"
              stroke="rgba(255,215,169,0.6)"
              strokeWidth={1}
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } },
              }}
            />
            {POINTS.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={2.5}
                fill="#ffd7a9"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
              />
            ))}
          </motion.svg>
        )}
      </div>
    </section>
  );
}
