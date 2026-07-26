import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { trustPoints } from "@/lib/content";

/**
 * "Trust (The Core)" — a quieter, more spacious section than the
 * ones around it, per DESIGN.md's "Extravagant Breathability"
 * principle: a large central statement, then three supporting
 * glass-cards, generous whitespace throughout.
 */
export function Trust() {
  return (
    <section id="trust" className="relative px-margin-safe py-section-gap-mobile md:py-section-gap-desktop">
      <div className="mx-auto max-w-container-max">
        <Reveal>
          <SectionHeader eyebrow="The Core" title="Trust" align="center" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-note-text text-note-text italic text-on-surface-variant">
            Not a promise made once, a pattern held over time...
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-gutter md:grid-cols-3">
          {trustPoints.map((point, i) => (
            <Reveal key={point.title} delay={0.15 + i * 0.1}>
              <div className="h-full rounded-xl glass-card p-gutter">
                <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-primary/60">
                  0{i + 1}
                </span>
                <h3 className="font-headline-md text-headline-md-mobile text-on-background">
                  {point.title}
                </h3>
                <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
