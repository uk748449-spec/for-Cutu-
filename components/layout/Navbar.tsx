"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/scroll";

const LINKS = [
  { href: "journey", label: "The Journey" },
  { href: "letter", label: "Stories" },
  { href: "analysis", label: "Craft" },
  { href: "photo-wall", label: "Archive" },
];

/**
 * Ported from the <nav> in welcome_journey_entry/code.html, extended with:
 * - scroll-spy active-link highlighting (IntersectionObserver, not a scroll
 *   listener, so it's cheap and doesn't run on every pixel of scroll).
 * - a working Connect button (scrolls to the Letter section — the site's
 *   one clear "here's where I actually say the thing" destination).
 */
export function Navbar() {
  const [active, setActive] = useState<string>("journey");

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-surface/10 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-safe py-unit">
        <div className="flex items-center gap-4">
          <span className="cursor-default font-display-lg text-display-lg text-primary-container drop-shadow-[0_0_15px_rgba(255,179,71,0.5)]">
            C
          </span>
        </div>
        <div className="hidden items-center gap-gutter md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={`#${link.href}`}
                aria-current={isActive ? "true" : undefined}
                className={`border-b-2 pb-1 font-body-lg text-body-lg transition-all duration-500 ease-out ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-6">
          <MagneticButton
            onClick={() => scrollToSection("letter")}
            aria-label="Read the letter"
            className="rounded-full bg-primary-container px-6 py-2 font-label-sm text-label-sm text-on-primary-container shadow-[0_0_15px_rgba(255,179,71,0.2)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Connect
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
