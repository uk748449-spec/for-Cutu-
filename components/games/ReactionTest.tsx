"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Phase = "idle" | "waiting" | "go" | "early" | "result";

export function ReactionTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const goAtRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function start() {
    setPhase("waiting");
    setReactionMs(null);
    const delay = 1000 + Math.random() * 2500;
    timeoutRef.current = setTimeout(() => {
      goAtRef.current = performance.now();
      setPhase("go");
    }, delay);
  }

  function handlePress() {
    if (phase === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("early");
      return;
    }
    if (phase === "go") {
      setReactionMs(Math.round(performance.now() - goAtRef.current));
      setPhase("result");
    }
  }

  const panelClass =
    phase === "go"
      ? "border-primary/60 bg-primary-container/20"
      : phase === "early"
      ? "border-error/50 bg-error-container/10"
      : "border-white/10 bg-white/5";

  return (
    <div className="rounded-xl glass-card p-gutter">
      <h3 className="font-headline-md text-headline-md-mobile text-on-background">
        Reaction Test
      </h3>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Wait for the panel to glow amber, then tap as fast as you can.
      </p>

      <button
        type="button"
        onClick={phase === "waiting" || phase === "go" ? handlePress : undefined}
        disabled={phase === "idle" || phase === "result" || phase === "early"}
        className={`mt-6 flex h-40 w-full items-center justify-center rounded-lg border transition-colors duration-300 ${panelClass}`}
      >
        <span className="font-headline-md text-headline-md-mobile text-on-background">
          {phase === "idle" && "Press start below"}
          {phase === "waiting" && "Wait for it..."}
          {phase === "go" && "Tap now!"}
          {phase === "early" && "Too early — try again"}
          {phase === "result" && `${reactionMs} ms`}
        </span>
      </button>

      <div className="mt-6">
        <MagneticButton
          onClick={start}
          className="rounded-full bg-primary-container px-6 py-2 font-label-sm text-label-sm text-on-primary-container"
        >
          {phase === "idle" ? "Start" : "Try again"}
        </MagneticButton>
      </div>
    </div>
  );
}
