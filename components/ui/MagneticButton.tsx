"use client";

import { useRef } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Ported from the "Magnetic Button micro-interaction" script in
 * welcome_journey_entry/code.html: on mousemove the button translates
 * toward the cursor by 15% of the offset, and snaps back on mouseleave.
 */

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function MagneticButton({ className, children, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }

  function handleMouseLeave() {
    const button = buttonRef.current;
    if (!button) return;
    button.style.transform = "translate(0, 0)";
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("magnetic-button", className)}
      {...props}
    >
      {children}
    </button>
  );
}
