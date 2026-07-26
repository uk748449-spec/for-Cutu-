"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Same motion signature as the source .fade-in keyframe
 * (opacity 0->1, translateY 20px->0, cubic-bezier(0.4,0,0.2,1)),
 * triggered on scroll instead of on page load. Used to give every
 * new section the same "staggered fade-in-up" the blueprint calls
 * for as the site-wide motion system.
 */

const EASE = [0.4, 0, 0.2, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
