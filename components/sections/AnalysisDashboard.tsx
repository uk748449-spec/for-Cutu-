"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AuroraBlobs } from "@/components/shared/AuroraBlobs";
import { analysisMetrics, analysisBadges } from "@/lib/content";

/**
 * "Certified Champa Analysis" — a mock gamified dashboard. Progress
 * indicators follow DESIGN.md's spec directly: thin 2px lines with
 * an amber "outer-glow / neon effect" on the active fill. Badges use
 * the "small semi-transparent capsule, high-contrast text" chip spec.
 */
export function AnalysisDashboard() {
  return (
    <section
      id="analysis"
      className="relative overflow-hidden px-margin-safe py-section-gap-mobile md:py-section-gap-desktop"
    >
      <AuroraBlobs colorA="secondary-container" colorB="primary-container" />

      <div className="mx-auto max-w-container-max">
        <Reveal>
          <SectionHeader eyebrow="Peer Reviewed. Mostly." title="Certified Champa Analysis" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl glass-panel p-gutter">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {analysisMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-body-lg text-body-lg text-on-background">
                      {metric.label}
                    </span>
                    <span className="font-headline-md text-headline-md-mobile text-primary">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-primary-container shadow-[0_0_10px_rgba(255,179,71,0.8)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/60">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-white/10 pt-8">
              {analysisBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-label-sm text-label-sm uppercase tracking-widest text-primary"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
