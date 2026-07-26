interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  accent?: "primary" | "secondary" | "tertiary";
}

const ACCENT_CLASS: Record<NonNullable<SectionHeaderProps["accent"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

/**
 * Same pattern as the_purpose_card's "Origin & Intent" / "Why This
 * Website Exists" header: uppercase label-sm eyebrow in an accent
 * color, then a display-lg/display-2xl heading in on-background.
 */
export function SectionHeader({
  eyebrow,
  title,
  align = "left",
  accent = "primary",
}: SectionHeaderProps) {
  return (
    <div className={`mb-gutter ${align === "center" ? "text-center" : "text-center md:text-left"}`}>
      <span
        className={`mb-4 block font-label-sm text-label-sm uppercase tracking-widest ${ACCENT_CLASS[accent]}`}
      >
        {eyebrow}
      </span>
      <h2 className="mb-unit font-display-lg text-display-lg text-on-background md:text-display-2xl">
        {title}
      </h2>
    </div>
  );
}
