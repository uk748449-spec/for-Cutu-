# For Champa ❤️

Next.js 15 / React 19 / TypeScript / Tailwind. Full journey, one continuous
design language.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Built and last reviewed with no network
access on my end, so this hasn't been through `npm install` / `next build`
in this pass either — run that locally and tell me if anything doesn't
compile and I'll fix it immediately.

## Bugfix / polish pass (latest)

- Icons: replaced every Material-Symbols string-as-text icon with a proper
  Lucide React icon via `components/shared/Icon.tsx`. Removed the Google
  Material Symbols font import entirely.
- Images: added `components/ui/SmartImage.tsx` (graceful fallback to a local
  placeholder frame, blur-in, fade-in). Replaced every external
  gstatic/googleusercontent placeholder URL with local assets in
  `/public/images`. Photo Wall now looks for `/public/images/photo-wall/{id}.jpg`
  per photo — drop real files in with matching names and they replace the
  placeholder automatically.
- Navigation: smooth scroll + scroll-margin-top offset (so the fixed navbar
  never covers a section heading), scroll-spy active-link highlighting.
- Connect button and Hero's Start Journey button now actually do something
  (scroll to Letter / Why This Exists respectively) instead of being dead.
- Games Hub: the 4 unbuilt "Coming Soon" games are now hidden behind a
  `SHOW_COMING_SOON` flag rather than shown as unfinished placeholders.
- Accessibility: `role="dialog"`/`aria-modal` on both modals, Escape-to-close
  added to the Memory Jar note modal, `MotionConfig reducedMotion="user"` so
  framer-motion (not just CSS) respects prefers-reduced-motion, larger touch
  targets in Memory Match on small screens.
- Performance: Prediction Engine's per-reply confidence values are now
  memoized instead of being recomputed with `Math.random()` on every render;
  the two canvas/WebGL effects are dynamically imported with `ssr: false`.

## What's faithfully ported from Stitch (unchanged)

- `tailwind.config.ts`, `app/globals.css` — every color hex, font size,
  spacing token, and hand-written CSS class (`.glass-panel`, `.glass-card`,
  `.magnetic-button`, `.aurora-glow`, `.aurora-bg`, keyframes) copied
  verbatim from the export.
- `components/effects/AuroraBackground.tsx` — the loading screen's GLSL
  shader, line for line.
- `components/sections/LoadingScreen.tsx`, `Hero.tsx`,
  `components/layout/Navbar.tsx` / `Footer.tsx` — copy, layout, and timing
  from `welcome_journey_entry`.
- `components/sections/WhyThisExists.tsx` — copy and layout from
  `the_purpose_card`.

## What I designed as a continuation (new, not in the export)

Everything below extends the same token system — same colors, type scale,
`glass-card`/`glass-panel` language, `Reveal` fade-in-up motion (same easing
as the source's `.fade-in`), rounded scale, and icon style. None of it
introduces a new visual language:

| Section | File | Notes |
|---|---|---|
| Interactive Timeline | `sections/Timeline.tsx` | scroll-snap cards, amber glow connector line |
| Traits gallery | `sections/Traits.tsx` | floating glass cards, ambient motion |
| Analysis Dashboard | `sections/AnalysisDashboard.tsx` | glowing progress bars per DESIGN.md's spec |
| Notebook | `sections/Notebook.tsx` | click-to-reveal, Literata italic reveals |
| Trust | `sections/Trust.tsx` | quieter, more spacious per "breathability" principle |
| Games Hub | `sections/GamesHub.tsx` + `games/*` | 3 fully playable games (Reaction Test, Rock Paper Scissors, Memory Match); 4 more listed as a "coming soon" tile in the same visual language rather than faked |
| Prediction Engine | `sections/PredictionEngine.tsx` | pick a line, get 3 guessed replies with a joke confidence meter |
| Memory Jar | `sections/MemoryJar.tsx` | draggable notes with spring physics (Framer Motion, not a dedicated physics engine — see note below) |
| Letter | `sections/Letter.tsx` | — |
| Photo Wall | `sections/PhotoWall.tsx` | placeholder images — swap in real photos |
| Constellation Ending | `sections/ConstellationEnding.tsx` + `effects/StarfieldCanvas.tsx` | same message-sequencing rhythm as the loading screen; ends and stays, no CTA |
| Easter Egg | `effects/EasterEgg.tsx` | Konami-code triggered, mounted globally, tiny hint in the footer |

**Content note:** everything in `lib/content.ts` (timeline events, traits,
notebook entries, the letter, memory jar notes, prediction-engine replies)
is placeholder copy in the established voice, not real details about your
actual history — it's structured so you can drop in the real stuff without
touching layout code.

## Two intentional scope calls

1. **Memory Jar physics**: implemented with Framer Motion's drag/spring
   system (constrained, elastic, momentum-based) rather than a dedicated
   physics engine like Matter.js. It reads as physical and needed zero new
   dependencies. Say the word if you want real rigid-body jostling instead
   and I'll wire in Matter.js.
2. **Games Hub**: 3 of the 7 named games are fully built and playable.
   The other 4 (Mood Radar, Spin The Wheel, Catch The Chill, Puzzle) are
   shown as real, styled "coming soon" tiles rather than faked — happy to
   build any of them out next.

## Stack

Next, React, Framer Motion, clsx, tailwind-merge, lucide-react (icon set
available if you want it alongside Material Symbols). Still no GSAP,
Lenis, or Three.js/R3F/Drei — nothing built so far needed them. If you
want a true scroll-driven (not scroll-snap) timeline or a 3D photo wall,
that's where those would come in.
