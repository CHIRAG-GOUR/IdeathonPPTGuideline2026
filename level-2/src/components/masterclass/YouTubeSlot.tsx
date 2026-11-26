"use client";

import { useState } from "react";
import { Play, MonitorPlay } from "lucide-react";
import type { Video } from "@/content/masterclass";

function fmt(s?: number) {
  if (s === undefined) return "";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/**
 * YouTube embed that starts at a set timestamp (and can stop at `end`).
 * Shows the thumbnail first and only loads the player on click, so the page
 * stays fast. With no `youtubeId`, shows a placeholder.
 */
export default function YouTubeSlot({ video, className = "" }: { video: Video; className?: string }) {
  const [playing, setPlaying] = useState(false);

  if (!video.youtubeId) {
    return (
      <div
        className={`relative aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-ink/15 bg-gradient-to-br from-white/80 to-coral-soft/70 flex flex-col items-center justify-center gap-2 text-center p-4 ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center shadow-md">
          <MonitorPlay size={22} />
        </div>
        <p className="text-[13px] font-bold text-ink">{video.title}</p>
        <p className="font-mono text-[10.5px] text-ink-soft">Add youtubeId + start time in src/content/masterclass.ts</p>
      </div>
    );
  }

  const params = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1", autoplay: "1" });
  if (video.start) params.set("start", String(video.start));
  if (video.end) params.set("end", String(video.end));
  const src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params}`;

  return (
    <div className={`relative aspect-video rounded-3xl overflow-hidden bg-white shadow-lg ${className}`}>
      {playing ? (
        <iframe
          src={src}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-coral text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play size={26} fill="currentColor" className="ml-1" />
            </span>
          </span>
          <span className="absolute left-4 bottom-3 text-left text-white">
            <span className="block text-[14px] font-bold">{video.title}</span>
            {video.start !== undefined && (
              <span className="block font-mono text-[11px] opacity-90">
                Starts at {fmt(video.start)}
                {video.end !== undefined ? ` · ends ${fmt(video.end)}` : ""}
              </span>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
