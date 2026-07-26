"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const FALLBACK_SRC = "/images/placeholder-photo.svg";
// Small inline blur — a single soft navy swatch matching the site's dark
// surface color, so there's never a flash of white/empty space while an
// image is loading. Precomputed base64 (not built with Buffer, which isn't
// available in the browser runtime this component executes in).
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxNzFmMzMiLz48L3N2Zz4=";

interface SmartImageProps extends Omit<ImageProps, "onError" | "onLoad" | "placeholder" | "blurDataURL"> {
  /** Shown instead of a broken-image icon if `src` 404s or otherwise fails to load. */
  fallbackSrc?: string;
}

/**
 * Wraps next/image with:
 * - graceful fallback to an elegant local placeholder frame on load error
 *   (instead of a broken-image icon), so dropping in real photos later is
 *   as simple as adding a file at the referenced path — nothing breaks in
 *   the meantime.
 * - a smooth fade-in once the image actually loads.
 * - a blur placeholder so there's no layout flash before it does.
 * - lazy loading by default (next/image's default `loading="lazy"`,
 *   skipped automatically when `priority` is set for above-the-fold use).
 */
export function SmartImage({ className, fallbackSrc = FALLBACK_SRC, src, alt, ...props }: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      src={errored ? fallbackSrc : src}
      alt={alt}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onLoad={() => setLoaded(true)}
      onError={() => setErrored(true)}
      className={cn(
        "transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
