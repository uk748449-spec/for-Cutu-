"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/shared/Icon";

const ICONS = ["favorite", "auto_awesome", "bolt", "local_fire_department", "emoji_objects", "psychology"];

interface Card {
  key: string;
  icon: string;
}

function shuffled(): Card[] {
  const pairs = [...ICONS, ...ICONS].map((icon, i) => ({ key: `${icon}-${i}`, icon }));
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

export function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>(() => shuffled());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);

  const isWon = matched.size === cards.length;

  function reset() {
    setCards(shuffled());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setBusy(false);
  }

  function handleFlip(index: number) {
    if (busy || flipped.includes(index) || matched.has(cards[index].key)) return;
    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setBusy(true);
      setMoves((m) => m + 1);
      const [a, b] = next;
      const aCard = cards[a];
      const bCard = cards[b];
      if (aCard.icon === bCard.icon) {
        setTimeout(() => {
          setMatched((prev) => new Set(prev).add(aCard.key).add(bCard.key));
          setFlipped([]);
          setBusy(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 800);
      }
    }
  }

  const memoText = useMemo(
    () => (isWon ? `Solved in ${moves} moves. Certified sharp.` : "Find every pair."),
    [isWon, moves]
  );

  return (
    <div className="rounded-xl glass-card p-gutter">
      <h3 className="font-headline-md text-headline-md-mobile text-on-background">Memory Match</h3>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{memoText}</p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.has(card.key);
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => handleFlip(index)}
              aria-label={isFlipped ? card.icon : "hidden card"}
              className={`flex aspect-square min-h-[44px] items-center justify-center rounded-lg border transition-all duration-300 ${
                matched.has(card.key)
                  ? "border-primary/50 bg-primary-container/20"
                  : "border-white/10 bg-white/5 hover:border-primary/30"
              }`}
            >
              {isFlipped ? (
                <Icon name={card.icon} className="text-primary" size={22} aria-hidden="true" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-white/20" />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary-container/15 py-3"
          >
            <Icon name="auto_awesome" className="text-primary" size={18} aria-hidden="true" />
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Solved. Certified sharp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/60">
          Moves: {moves}
        </p>
        <MagneticButton
          onClick={reset}
          className="rounded-full bg-primary-container px-6 py-2 font-label-sm text-label-sm text-on-primary-container"
        >
          Reshuffle
        </MagneticButton>
      </div>
    </div>
  );
}
