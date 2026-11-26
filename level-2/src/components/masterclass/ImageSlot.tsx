"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

/**
 * Shows a /public image with a slow "settle" zoom as it scrolls into view.
 * If the file is missing, shows a designed placeholder naming the file to add —
 * save the file with that name and it appears automatically.
 */
export default function ImageSlot({
  src,
  label,
  className = "",
  rounded = "rounded-3xl",
}: {
  src: string;
  label: string;
  className?: string;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // An image can fail before React hydrates and misses onError; check once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center gap-2 text-center p-4 border-2 border-dashed border-ink/15 bg-gradient-to-br from-white/80 via-[#eef0ff]/80 to-coral-soft/70 ${rounded} ${className}`}
      >
        <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-coral">
          <ImageIcon size={22} />
        </div>
        <p className="text-[13px] font-bold text-ink leading-tight max-w-[90%]">{label}</p>
        <p className="font-mono text-[10.5px] text-ink-soft break-all">public{src}</p>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden bg-white/60 shadow-[0_24px_60px_-30px_rgba(60,50,160,0.45)] ${rounded} ${className}`}>
      <motion.img
        ref={imgRef}
        src={src}
        alt={label}
        onError={() => setFailed(true)}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
      />
    </div>
  );
}
