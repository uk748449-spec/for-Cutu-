"use client";

import { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/shared/Icon";

const CHOICES = ["rock", "paper", "scissors"] as const;
type Choice = (typeof CHOICES)[number];

const ICON: Record<Choice, string> = {
  rock: "casino",
  paper: "description",
  scissors: "content_cut",
};

function decide(player: Choice, cpu: Choice): "win" | "lose" | "draw" {
  if (player === cpu) return "draw";
  const beats: Record<Choice, Choice> = { rock: "scissors", paper: "rock", scissors: "paper" };
  return beats[player] === cpu ? "win" : "lose";
}

const RESULT_COPY: Record<"win" | "lose" | "draw", string> = {
  win: "You win. Try not to be smug about it.",
  lose: "You lost. To me. A website.",
  draw: "A draw. Suspiciously diplomatic of us.",
};

export function RockPaperScissors() {
  const [cpu, setCpu] = useState<Choice | null>(null);
  const [player, setPlayer] = useState<Choice | null>(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  function play(choice: Choice) {
    const opponent = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    const outcome = decide(choice, opponent);
    setPlayer(choice);
    setCpu(opponent);
    setScore((s) => ({ ...s, [outcome]: s[outcome] + 1 }));
  }

  const outcome = player && cpu ? decide(player, cpu) : null;

  return (
    <div className="rounded-xl glass-card p-gutter">
      <h3 className="font-headline-md text-headline-md-mobile text-on-background">
        Rock, Paper, Scissors
      </h3>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Against the developer. He rigged nothing, promise.
      </p>

      <div className="mt-6 flex gap-4">
        {CHOICES.map((choice) => (
          <MagneticButton
            key={choice}
            onClick={() => play(choice)}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary transition-colors hover:border-primary/40"
            aria-label={choice}
          >
            <Icon name={ICON[choice]} size={26} aria-hidden="true" />
          </MagneticButton>
        ))}
      </div>

      {outcome && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="font-body-md text-body-md text-on-surface-variant">
            You picked <span className="text-primary">{player}</span>, I picked{" "}
            <span className="text-primary">{cpu}</span>.
          </p>
          <p className="mt-1 font-headline-md text-headline-md-mobile text-on-background">
            {RESULT_COPY[outcome]}
          </p>
        </div>
      )}

      <p className="mt-4 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/60">
        Wins {score.win} · Losses {score.lose} · Draws {score.draw}
      </p>
    </div>
  );
}
