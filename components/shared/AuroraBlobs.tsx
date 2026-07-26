type BlobColor = "primary-container" | "secondary-container" | "tertiary-container";

interface AuroraBlobsProps {
  colorA?: BlobColor;
  colorB?: BlobColor;
  /** "tl-br" (default, matches source) or "tr-bl" for visual variety between sections */
  layout?: "tl-br" | "tr-bl";
}

// Tailwind only picks up class names it can see as complete literal
// strings, so dynamic template strings like `bg-${color}` silently
// fail to compile. This lookup keeps every class name literal while
// still letting callers pick a color.
const BG_CLASS: Record<BlobColor, string> = {
  "primary-container": "bg-primary-container",
  "secondary-container": "bg-secondary-container",
  "tertiary-container": "bg-tertiary-container",
};

/**
 * Same .aurora-bg / .aurora-blob classes and animate-aurora-1/2
 * keyframes as the_purpose_card/code.html, just parameterized so
 * every section can use a different accent pairing without
 * introducing new CSS.
 */
export function AuroraBlobs({
  colorA = "primary-container",
  colorB = "tertiary-container",
  layout = "tl-br",
}: AuroraBlobsProps) {
  const first = layout === "tl-br" ? "-left-20 -top-20" : "-right-20 -top-20";
  const second = layout === "tl-br" ? "-right-20 top-1/2" : "-left-20 top-1/2";
  return (
    <div className="aurora-bg">
      <div className={`aurora-blob animate-aurora-1 h-[600px] w-[600px] ${BG_CLASS[colorA]} ${first}`} />
      <div className={`aurora-blob animate-aurora-2 h-[500px] w-[500px] ${BG_CLASS[colorB]} ${second}`} />
    </div>
  );
}
