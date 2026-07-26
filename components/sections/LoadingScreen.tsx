"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const AuroraBackground = dynamic(
  () => import("@/components/effects/AuroraBackground").then((m) => m.AuroraBackground),
  { ssr: false }
);

/**
 * Ported verbatim from the loading sequence script in
 * welcome_journey_entry/code.html: same two messages, same 3000ms
 * hold / 500ms gap timing, same fade-in classnames and durations.
 */

const MESSAGES = ["One small thing for Champa...", "Please don't bully the Me.."];

const MONOGRAM_SRC = "/images/monogram.svg";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    let step = 0;

    function showMessage() {
      const loadingText = textRef.current;
      const loadingScreen = screenRef.current;
      if (!loadingText || !loadingScreen) return;

      if (step < MESSAGES.length) {
        loadingText.textContent = MESSAGES[step];
        loadingText.classList.remove("opacity-0");
        loadingText.classList.add("loading-text-anim");

        timeouts.push(
          setTimeout(() => {
            loadingText.classList.remove("loading-text-anim");
            loadingText.classList.add("opacity-0");
            step++;
            timeouts.push(setTimeout(showMessage, 500));
          }, 3000)
        );
      } else {
        loadingScreen.style.opacity = "0";
        timeouts.push(
          setTimeout(() => {
            if (!completedRef.current) {
              completedRef.current = true;
              onComplete();
            }
          }, 1000)
        );
      }
    }

    timeouts.push(setTimeout(showMessage, 1000));

    return () => {
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={screenRef}
      id="loading-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-1000"
    >
      <div className="absolute inset-0 h-full w-full opacity-40">
        <AuroraBackground />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="relative h-32 w-32 md:h-48 md:w-48">
          <Image
            alt="Glassmorphic C Monogram"
            fill
            priority
            className="animate-pulse object-contain"
            src={MONOGRAM_SRC}
          />
          <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-3xl" />
        </div>
        <div className="flex h-12 items-center justify-center">
          <p
            ref={textRef}
            id="loading-text"
            className="font-note-text text-note-text italic text-primary/80 opacity-0"
          />
        </div>
      </div>
    </div>
  );
}
