"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, ExternalLink, MonitorPlay } from "lucide-react";
import type { Tool } from "@/content/tools";

const fmt = (s = 0) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * One video window for all the tools on a page. Pick a tool tab and its
 * explainer loads in the same player, starting at the set timestamp.
 * The thumbnail shows first; the YouTube player only loads after the first
 * click, then switching tabs plays the next video straight away.
 */
export default function ToolPlayer({ tools, label = "Watch how each tool works" }: { tools: Tool[]; label?: string }) {
  const uid = useId();
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const t = tools[i];

  const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1", playsinline: "1" });
  if (t.start) params.set("start", String(t.start));
  const src = `https://www.youtube-nocookie.com/embed/${t.youtubeId}?${params}`;
  const watch = `https://www.youtube.com/watch?v=${t.youtubeId}${t.start ? `&t=${t.start}s` : ""}`;

  return (
    <div className="rounded-3xl bg-white/85 border border-white shadow-[0_24px_60px_-30px_rgba(60,50,160,0.45)] p-3 sm:p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 px-1">
        <p className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          <MonitorPlay size={14} className="text-coral" /> {label}
        </p>
        <span className="font-mono text-[11px] font-bold text-ink-soft">
          {i + 1}/{tools.length}
        </span>
      </div>

      {/* Tool tabs */}
      <div className="flex flex-wrap gap-1.5" role="tablist">
        {tools.map((x, k) => {
          const on = k === i;
          return (
            <button
              key={x.name}
              role="tab"
              aria-selected={on}
              onClick={() => setI(k)}
              className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold border transition-colors cursor-pointer ${
                on ? "text-white border-coral" : "bg-white text-ink border-line hover:border-coral/50"
              }`}
            >
              {on && (
                <motion.span
                  layoutId={`tp-pill-${uid}`}
                  className="absolute inset-0 rounded-full bg-coral"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${x.domain}&sz=64`}
                alt=""
                className="relative w-3.5 h-3.5 rounded bg-white"
              />
              <span className="relative">{x.name}</span>
            </button>
          );
        })}
      </div>

      {/* The one video window */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#e5e3ff]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${t.youtubeId}-${live}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {live ? (
              <iframe
                src={src}
                title={`${t.name}: ${t.video}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button onClick={() => setLive(true)} className="group absolute inset-0 w-full h-full cursor-pointer" aria-label={`Play ${t.name} video`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${t.youtubeId}/hqdefault.jpg`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#26245c]/70 via-[#26245c]/10 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 rounded-full bg-coral/40 animate-ping" />
                    <span className="relative w-16 h-16 rounded-full bg-coral text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play size={26} fill="currentColor" className="ml-1" />
                    </span>
                  </span>
                </span>
                <span className="absolute left-4 right-4 bottom-3 text-left text-white">
                  <span className="block text-[14px] font-bold leading-tight line-clamp-1">{t.video}</span>
                  <span className="block font-mono text-[11px] opacity-90">
                    {t.start ? `Starts at ${fmt(t.start)}` : "From the start"}
                  </span>
                </span>
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tool info + links */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-[13px] font-medium text-ink-soft leading-snug min-w-0 flex-1">
          <span className="font-bold text-ink">{t.name}: </span>
          {t.desc}
        </p>
        <div className="flex gap-1.5 shrink-0">
          <a
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-coral text-white px-3 py-1.5 text-[12px] font-semibold hover:bg-coral-deep transition-colors"
          >
            Open {t.name} <ExternalLink size={12} />
          </a>
          <a
            href={watch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-white border border-line text-ink px-3 py-1.5 text-[12px] font-semibold hover:border-coral transition-colors"
          >
            YouTube <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
