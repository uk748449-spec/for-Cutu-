"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { photoWallItems } from "@/lib/content";

const ROTATIONS = [-6, 4, -3, 6, -5, 3];

/**
 * Same glass-card + note-text caption language as the rest of the
 * site, arranged as a scattered polaroid wall. Each photo looks for
 * /public/images/photo-wall/{id}.jpg — drop a real photo in with that
 * exact filename and it replaces the placeholder automatically, no code
 * changes needed. Until then, SmartImage's built-in fallback renders an
 * elegant "photo coming soon" frame instead of a broken-image icon.
 */
export function PhotoWall() {
  return (
    <section id="photo-wall" className="relative px-margin-safe py-section-gap-mobile md:py-section-gap-desktop">
      <div className="mx-auto max-w-container-max">
        <Reveal>
          <SectionHeader eyebrow="Kept, Not Curated" title="A Few Photos" align="center" accent="tertiary" />
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {photoWallItems.map((photo, i) => (
            <Reveal key={photo.id} delay={i * 0.05}>
              <motion.div
                className="rounded-xl bg-surface-container-highest p-3 pb-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                style={{ rotate: ROTATIONS[i % ROTATIONS.length] }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-container">
                  <SmartImage
                    src={`/images/photo-wall/${photo.id}.jpg`}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-center font-note-text text-[14px] italic leading-snug text-on-surface-variant">
                  {photo.caption}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-md text-center font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/50">
          
        </p>
      </div>
    </section>
  );
}
