"use client";

import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AuroraBlobs } from "@/components/shared/AuroraBlobs";
import { timelineEvents } from "@/lib/content";

/**
 * "When Everything Changed" — horizontal scroll-snap timeline on
 * desktop, stacked cards on mobile. Uses the same glass-card,
 * label-sm chapter badges, and amber "neon glow" progress-indicator
 * language the DESIGN.md calls for ("thin 2px lines... outer-glow
 * using the Primary Amber color").
 */
export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden px-margin-safe py-section-gap-mobile md:py-section-gap-desktop"
    >
      <AuroraBlobs colorA="tertiary-container" colorB="primary-container" layout="tr-bl" />

      <div className="mx-auto max-w-container-max">
        <Reveal>
          <SectionHeader eyebrow="A Small History" title="When Everything Changed" />
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_12px_rgba(255,179,71,0.6)] md:block" />

          <div className="flex snap-x snap-mandatory gap-gutter overflow-x-auto pb-8 md:pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {timelineEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 0.08} className="snap-start">
                <div className="relative w-[85vw] max-w-sm flex-shrink-0 md:w-[360px]">
                  <div className="mb-6 hidden items-center md:flex">
                    <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_rgba(255,179,71,0.8)]" />
                  </div>
                  <div className="glass-card h-full rounded-xl p-gutter">
                    <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-primary/60">
                      {event.chapter} — {event.date}
                    </span>
                    <h3 className="font-headline-md text-headline-md leading-tight text-on-background">
                      {event.title}
                    </h3>
                    <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
