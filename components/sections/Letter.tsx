import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { letterParagraphs } from "@/lib/content";

export function Letter() {
  return (
    <section id="letter" className="relative px-margin-safe py-section-gap-mobile md:py-section-gap-desktop">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <SectionHeader eyebrow="Chapter IX" title="A Letter" align="center" accent="secondary" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl glass-panel p-gutter md:p-16">
            {letterParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`font-note-text text-note-text italic text-on-background ${
                  i > 0 ? "mt-6" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-10 text-right font-note-text text-note-text italic text-primary/80">
              ~with love~
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
