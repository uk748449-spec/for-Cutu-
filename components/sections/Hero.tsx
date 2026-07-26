"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/shared/Icon";
import { scrollToSection } from "@/lib/scroll";

/**
 * Ported verbatim from the <main> "Welcome Hero" + bento grid in
 * welcome_journey_entry/code.html — same copy, same layout, same
 * fade-in delays (200ms / 600ms).
 */
export function Hero() {
  return (
    <>
      <div className="aurora-glow left-[-5%] top-[-10%] bg-primary-container" />
      <div className="aurora-glow bottom-[-10%] right-[-5%] bg-secondary-container" />

      <main
        id="journey"
        className="mx-auto flex min-h-screen max-w-container-max flex-col items-center justify-center px-margin-safe pt-40 text-center"
      >
        <section className="mx-auto mb-section-gap-desktop max-w-4xl space-y-12">
          <div className="fade-in space-y-6" style={{ animationDelay: "200ms" }}>
            <h1 className="font-display-2xl text-display-2xl tracking-tight text-on-background">
              Hi Champa 👋
            </h1>
            <p className="mx-auto max-w-2xl font-note-text text-note-text text-on-surface-variant md:text-[28px] md:leading-[40px]">
              I wanted to tell you a few things...
            </p>
          </div>
          <div className="fade-in" style={{ animationDelay: "600ms" }}>
            <MagneticButton
              onClick={() => scrollToSection("why")}
              className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/5 px-10 py-5 font-headline-md text-headline-md text-primary backdrop-blur-xl"
            >
              <span className="relative z-10">Start Journey</span>
              <Icon
                name="arrow_right_alt"
                className="relative z-10 transition-transform group-hover:translate-x-2"
                size={24}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </MagneticButton>
          </div>
        </section>

        <section className="grid w-full grid-cols-1 gap-gutter pb-section-gap-desktop md:grid-cols-12">
          <div className="group relative h-[500px] overflow-hidden rounded-3xl glass-panel p-gutter md:col-span-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-transparent to-transparent" />
            <div className="relative flex h-full flex-col justify-end space-y-4 text-left">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary/60">
                Chapter I
              </span>
              <h3 className="font-headline-md text-headline-md text-on-background">
                The Hidden Archive
              </h3>
              <p className="max-w-md font-body-lg text-body-lg text-on-surface-variant">
                Exploring the collected thoughts and whispers curated just for you.
              </p>
            </div>
          </div>
          <div className="group flex h-[500px] flex-col items-center justify-center gap-8 rounded-3xl glass-panel p-gutter md:col-span-4">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-primary/20 transition-colors group-hover:border-primary/50">
              <Icon name="favorite" className="text-primary" size={48} fill="currentColor" aria-hidden="true" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="font-headline-md text-headline-md text-on-background">Pure Intent</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Every pixel serves a purpose.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
