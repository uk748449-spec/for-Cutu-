import { SmartImage } from "@/components/ui/SmartImage";

/**
 * Ported verbatim from the_purpose_card/code.html (identical file also
 * shipped as moments_traits_gallery and analysis_secrets in the export —
 * see project README for why only one copy is implemented here).
 */
export function WhyThisExists() {
  return (
    <section
      id="why"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-margin-safe py-section-gap-desktop"
    >
      <div className="aurora-bg">
        <div className="aurora-blob animate-aurora-1 -left-20 -top-20 h-[600px] w-[600px] bg-primary-container" />
        <div className="aurora-blob animate-aurora-2 -right-20 top-1/2 h-[500px] w-[500px] bg-tertiary-container" />
      </div>

      <div className="w-full max-w-container-max">
        <div className="mb-gutter text-center md:text-left">
          <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Origin &amp; Intent
          </span>

          <h2 className="mb-unit font-display-lg text-display-lg text-on-background md:text-display-2xl">
            Why This Website Exists
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-gutter md:mt-24 md:grid-cols-12">
          <div className="order-2 md:order-1 md:col-span-5">
            <div className="glass-card transform rounded-xl p-4 transition-transform duration-700 hover:rotate-0 md:-rotate-2">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-surface-container-highest">
                <SmartImage
                  alt="A highly detailed, minimalist close-up of a frosted glass sculpture resembling a human heart, illuminated by a warm amber light from within."
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                  src="/images/why-this-exists.jpg"
                />
              </div>

              <p className="mt-4 px-2 font-note-text text-note-text italic text-on-surface-variant opacity-80">
                &ldquo;A quiet space for the things left unsaid.&rdquo;
              </p>
            </div>
          </div>

          <div className="order-1 flex flex-col gap-gutter md:order-2 md:col-span-7 md:pl-gutter">
            <div className="transform rounded-xl glass-card p-gutter transition-all duration-700 hover:translate-x-8 md:translate-x-12">
              <p className="font-headline-md text-headline-md leading-tight text-primary">
                Sometimes words become difficult.
              </p>

              <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
                It&apos;s not like I didn&apos;t want to tell you, but I didn&apos;t have the courage to tell you about it after saying so many times that I had never been in a relationship...
              </p>
            </div>

            <div className="transform rounded-xl glass-card p-gutter transition-all duration-700 hover:translate-x-[-16px] md:translate-x-[-24px]">
              <p className="font-headline-md text-headline-md leading-tight text-tertiary-container">
                Sometimes courage becomes late.
              </p>

              <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
                Perfectionism is often just fear in a suit. This sanctuary is the antidote, a
                place where the work speaks before the doubt does.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}