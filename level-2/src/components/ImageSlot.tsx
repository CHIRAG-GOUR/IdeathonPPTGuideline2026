"use client";

import { useState } from "react";

/**
 * Shows an image from /public. If the file is missing, it quietly falls back
 * to a soft brand-blue gradient: no placeholder text is ever shown on a slide.
 */
export default function ImageSlot({
  src,
  alt,
  className = "",
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full bg-gradient-to-br from-blue-100 via-blue-50 to-amber-50 ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`w-full h-full ${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
    />
  );
}
