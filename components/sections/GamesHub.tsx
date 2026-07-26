"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AuroraBlobs } from "@/components/shared/AuroraBlobs";
import { Icon } from "@/components/shared/Icon";
import { ReactionTest } from "@/components/games/ReactionTest";
import { RockPaperScissors } from "@/components/games/RockPaperScissors";
import { MemoryMatch } from "@/components/games/MemoryMatch";

type GameId = "reaction" | "rps" | "memory";

const GAMES: { id: GameId; icon: string; title: string; description: string }[] = [
  { id: "reaction", icon: "speed", title: "Reaction Test", description: "How fast are your reflexes, really." },
  { id: "rps", icon: "content_cut", title: "Rock Paper Scissors", description: "Best of unlimited rounds." },
  { id: "memory", icon: "grid_view", title: "Memory Match", description: "Find every pair, no peeking." },
];

// The other 4 named games (Mood Radar, Spin The Wheel, Catch The Chill,
// Guess Champa Reply) aren't built yet. Rather than ship unfinished
// "Coming Soon" placeholder tiles in production, they're hidden behind
// this flag until each one is actually implemented. Flip to true (and
// build the missing game components) when ready.
const SHOW_COMING_SOON = false;
const COMING_SOON = ["Mood Radar", "Spin The Wheel", "Catch The Chill"];

export function GamesHub() {
  const [active, setActive] = useState<GameId | null>(null);

  return (
    <section
      id="games"
      className="relative overflow-hidden px-margin-safe py-section-gap-mobile md:py-section-gap-desktop"
    >
      <AuroraBlobs colorA="primary-container" colorB="secondary-container" layout="tr-bl" />

      <div className="mx-auto max-w-container-max">
        <Reveal>
          <SectionHeader eyebrow="Mini Games" title="Prove You Can Keep Up" accent="secondary" />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game, i) => (
            <Reveal key={game.id} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setActive(active === game.id ? null : game.id)}
                className={`w-full rounded-xl p-gutter text-left transition-colors glass-card ${
                  active === game.id ? "border-primary/50" : "hover:border-primary/30"
                }`}
              >
                <Icon name={game.icon} className="text-primary" size={24} aria-hidden="true" />
                <h3 className="mt-4 font-headline-md text-headline-md-mobile text-on-background">
                  {game.title}
                </h3>
                <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                  {game.description}
                </p>
                <span className="mt-4 inline-block font-label-sm text-label-sm uppercase tracking-widest text-primary">
                  {active === game.id ? "Playing now" : "Play"}
                </span>
              </button>
            </Reveal>
          ))}

          {SHOW_COMING_SOON &&
            COMING_SOON.map((title, i) => (
            <Reveal key={title} delay={(GAMES.length + i) * 0.06}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-white/5 bg-white/[0.02] p-gutter opacity-60">
                <div>
                  <Icon name="lock" className="text-on-surface-variant" size={24} aria-hidden="true" />
                  <h3 className="mt-4 font-headline-md text-headline-md-mobile text-on-background">
                    {title}
                  </h3>
                  <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                    Next chapter of the games hub.
                  </p>
                </div>
                <span className="mt-4 inline-block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                  Coming Soon
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="mt-gutter"
            >
              {active === "reaction" && <ReactionTest />}
              {active === "rps" && <RockPaperScissors />}
              {active === "memory" && <MemoryMatch />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
