"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

/**
 * Shows an image from /public. If the file doesn't exist yet, it shows a
 * dashed placeholder with the expected file name, so the deck still looks
 * finished while images are being generated.
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
  const fileName = src.split("/").pop();

  if (failed) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-blue-50/70 border-2 border-dashed border-blue-300 text-blue-500 text-center p-3 ${className}`}
      >
        <ImageIcon size={32} strokeWidth={1.5} />
        <span className="text-xs font-bold uppercase tracking-wider">{alt}</span>
        <span className="text-[10px] font-mono text-blue-400">{fileName}</span>
      </div>
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
