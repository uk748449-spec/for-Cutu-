"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Icon } from "@/components/shared/Icon";
import { traits } from "@/lib/content";

/**
 * Floating card gallery of personality traits. Same glass-card /
 * rounded-xl language as the rest of the site; the only new motion
 * is a gentle continuous float, which is the "Ambient Motion" the
 * blueprint's global-effects list already calls for.
 */
export function Traits() {
  return (
    <section id="traits" className="relative px-margin-safe py-section-gap-mobile md:py-section-gap-desktop">
      <div className="mx-auto max-w-container-max">
        <Reveal>
          <SectionHeader
            eyebrow="Not Generic. Specific."
            title="Things That Make You... You"
            accent="secondary"
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {traits.map((trait, i) => (
            <Reveal key={trait.title} delay={i * 0.06}>
              <motion.div
                className="group relative h-full rounded-xl glass-card p-gutter"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                whileHover={{ y: -12 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 transition-colors group-hover:border-primary/50">
                  <Icon name={trait.icon} className="text-primary" size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-headline-md text-headline-md-mobile text-on-background">
                  {trait.title}
                </h3>
                <p className="mt-2 font-note-text text-note-text italic text-on-surface-variant/80">
                  {trait.note}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
