import {
  Sparkles,
  Brain,
  Zap,
  Heart,
  Flame,
  Lightbulb,
  Gauge,
  Scissors,
  Grid3x3,
  Lock,
  ArrowRight,
  Plus,
  Dices,
  FileText,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

/**
 * Maps the Material-Symbols-style string names that used to live in
 * lib/content.ts and each component's icon lookup tables (e.g. "auto_awesome",
 * "favorite", "content_cut") to the closest Lucide equivalent. This keeps the
 * existing data model (plain strings) untouched while removing the runtime
 * dependency on the Google Material Symbols web font — the reason those
 * names were rendering as literal text instead of icons.
 *
 * Add new entries here as new icon names are introduced; unknown names fall
 * back to Sparkles rather than rendering broken/blank, so a typo in content.ts
 * never surfaces as missing UI.
 */
const ICON_MAP: Record<string, ComponentType<LucideProps>> = {
  auto_awesome: Sparkles,
  psychology: Brain,
  bolt: Zap,
  favorite: Heart,
  local_fire_department: Flame,
  emoji_objects: Lightbulb,
  speed: Gauge,
  content_cut: Scissors,
  grid_view: Grid3x3,
  lock: Lock,
  arrow_right_alt: ArrowRight,
  add: Plus,
  casino: Dices,
  description: FileText,
};

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = ICON_MAP[name] ?? Sparkles;
  return <Component {...props} />;
}
