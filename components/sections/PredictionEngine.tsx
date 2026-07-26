"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { predictionPrompts } from "@/lib/content";

/**
 * "Champa AI Prediction Engine" — obviously not a real model. A
 * small, honest joke: pick a line, get three guessed replies with a
 * fake confidence meter, styled with the same progress-bar glow
 * language as the Analysis Dashboard.
 */
export function PredictionEngine() {
  const [promptId, setPromptId] = useState(predictionPrompts[0].id);
  const [revealed, setRevealed] = useState(false);

  const prompt = predictionPrompts.find((p) => p.id === promptId)!;

  const confidences = useMemo(
    () => prompt.replies.map((_, i) => 88 - i * 22 + Math.floor(Math.random() * 6)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [promptId]
  );

  function choose(id: string) {
    setPromptId(id);
    setRevealed(false);
  }

  return (
    <section id="prediction" className="relative px-margin-safe py-section-gap-mobile md:py-section-gap-desktop">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeader
            eyebrow="Highly Unscientific"
            title="Champa AI Prediction Engine"
            align="center"
            accent="tertiary"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl glass-panel p-gutter">
            <p className="text-center font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">
              Pick a message to send
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {predictionPrompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => choose(p.id)}
                  className={`rounded-full border px-5 py-2 font-body-md text-body-md transition-colors ${
                    p.id === promptId
                      ? "border-primary/60 bg-primary-container/20 text-primary"
                      : "border-white/10 bg-white/5 text-on-surface-variant hover:border-primary/30"
                  }`}
                >
                  {p.message}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <MagneticButton
                onClick={() => setRevealed(true)}
                className="rounded-full bg-primary-container px-8 py-3 font-label-sm text-label-sm text-on-primary-container"
              >
                Predict Her Reply
              </MagneticButton>
            </div>

            {revealed && (
              <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
                {prompt.replies.map((reply, i) => {
                  const confidence = confidences[i];
                  return (
                    <motion.div
                      key={reply}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                      className="rounded-lg border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-note-text text-note-text italic text-on-background">
                          {reply}
                        </p>
                        <span className="shrink-0 font-label-sm text-label-sm text-primary">
                          {confidence}%
                        </span>
                      </div>
                      <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-primary-container shadow-[0_0_8px_rgba(255,179,71,0.7)]"
                          style={{ width: `${confidence}%` }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
                <p className="pt-2 text-center font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/50">
                  Model confidence: entirely made up
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
