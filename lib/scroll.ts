/**
 * Smooth-scrolls to a section by id. The fixed-navbar offset is handled by
 * the `scroll-margin-top` rule in globals.css (kept in one place so nav
 * anchors, this helper, and keyboard/hash navigation all land in the same
 * spot instead of duplicating the pixel offset here too). Respects
 * prefers-reduced-motion via the `html { scroll-behavior }` override in
 * globals.css. Fails silently if the target doesn't exist.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
