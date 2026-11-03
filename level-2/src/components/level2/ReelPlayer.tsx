"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Camera,
  Music2,
} from "lucide-react";

export type Reel = {
  id: string;
  src: string;
  poster: string;
  handle: string;
  caption: string;
  audio: string;
  likes: number;
  comments: number;
};

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : `${n}`;
}

function formatTime(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Instagram-Reels-style video player inside a phone frame.
 * - Tap: play / pause.  Double-tap: like (heart burst).
 * - Speaker button: mute / unmute.  Bottom bar: click to seek.
 * - Only one reel plays at a time: the parent passes `activeId` and `onPlay`.
 */
export default function ReelPlayer({
  reel,
  activeId,
  onPlay,
  width = 290,
}: {
  reel: Reel;
  activeId: string | null;
  onPlay: (id: string) => void;
  width?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [burst, setBurst] = useState(0);

  // Pause when another reel starts.
  useEffect(() => {
    if (activeId !== reel.id && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [activeId, reel.id]);

  // Smooth progress bar while playing.
  useEffect(() => {
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration) {
        setProgress(v.currentTime / v.duration);
        setCurrent(v.currentTime);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (playing) rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  useEffect(() => () => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      onPlay(reel.id);
      v.play().catch(() => {
        // Autoplay with sound blocked: retry muted.
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    } else {
      v.pause();
    }
  };

  const handleTap = () => {
    if (clickTimer.current) {
      // Second tap within window → double-tap like.
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setLiked(true);
      setBurst((b) => b + 1);
      return;
    }
    clickTimer.current = setTimeout(() => {
      clickTimer.current = null;
      togglePlay();
    }, 230);
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
    setCurrent(v.currentTime);
  };

  const stop = (e: MouseEvent) => e.stopPropagation();
  const height = Math.round((width * 16) / 9);

  return (
    <div
      className="relative rounded-[38px] bg-black p-[7px] border-2 border-black shadow-[7px_7px_0_#e11d48]"
      style={{ width: width + 14, height: height + 14 }}
    >
      {/* Notch */}
      <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30" />

      <div
        className="relative w-full h-full rounded-[31px] overflow-hidden bg-gray-900 cursor-pointer select-none"
        onClick={handleTap}
      >
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        {/* Top & bottom shading like Instagram */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="absolute top-8 inset-x-4 flex items-center justify-between text-white pointer-events-none">
          <span className="text-[19px] font-extrabold tracking-tight">Reels</span>
          <Camera size={22} />
        </div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute top-[68px] right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center z-20 hover:bg-black/70"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Centre play/pause indicator */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-16 h-16 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center text-white">
                <Play size={30} fill="currentColor" className="ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Double-tap heart burst */}
        <AnimatePresence>
          {burst > 0 && (
            <motion.div
              key={burst}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.2, 1, 1.1], y: [0, 0, 0, -40] }}
              transition={{ duration: 0.9, times: [0, 0.25, 0.6, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none text-white drop-shadow-lg"
            >
              <Heart size={96} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right action rail */}
        <div className="absolute right-2.5 bottom-16 flex flex-col items-center gap-4 text-white z-20" onClick={stop}>
          <button onClick={() => setLiked((l) => !l)} className="flex flex-col items-center gap-0.5">
            <motion.span animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
              <Heart size={26} className={liked ? "text-red-500" : ""} fill={liked ? "currentColor" : "none"} />
            </motion.span>
            <span className="text-[11px] font-bold">{formatCount(reel.likes + (liked ? 1 : 0))}</span>
          </button>
          <div className="flex flex-col items-center gap-0.5">
            <MessageCircle size={25} className="-scale-x-100" />
            <span className="text-[11px] font-bold">{formatCount(reel.comments)}</span>
          </div>
          <Send size={23} />
          <button onClick={() => setSaved((s) => !s)}>
            <Bookmark size={23} fill={saved ? "currentColor" : "none"} />
          </button>
          <MoreHorizontal size={22} />
          <div className="w-7 h-7 rounded-md border-2 border-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={reel.poster} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute left-3 right-14 bottom-6 text-white z-20" onClick={stop}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 shrink-0">
              <div className="w-full h-full rounded-full bg-gray-900 border-2 border-gray-900 flex items-center justify-center text-[11px] font-black">
                SZ
              </div>
            </div>
            <span className="text-[13px] font-bold truncate">{reel.handle}</span>
            <button
              onClick={() => setFollowing((f) => !f)}
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border shrink-0 ${
                following ? "bg-white/20 border-transparent" : "border-white/80"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
          <p className="mt-1.5 text-[12px] leading-snug line-clamp-2">{reel.caption}</p>
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] overflow-hidden">
            <Music2 size={12} className="shrink-0" />
            <div className="overflow-hidden whitespace-nowrap">
              <motion.span
                className="inline-block"
                animate={playing ? { x: ["0%", "-50%"] } : { x: "0%" }}
                transition={playing ? { repeat: Infinity, duration: 8, ease: "linear" } : { duration: 0.3 }}
              >
                {reel.audio}&nbsp;&nbsp;•&nbsp;&nbsp;{reel.audio}&nbsp;&nbsp;•&nbsp;&nbsp;
              </motion.span>
            </div>
          </div>
        </div>

        {/* Time (shown while paused) */}
        {!playing && duration > 0 && (
          <div className="absolute bottom-3 right-3 text-[10px] font-bold text-white/90 bg-black/40 px-1.5 py-0.5 rounded z-20 pointer-events-none">
            {formatTime(current)} / {formatTime(duration)}
          </div>
        )}

        {/* Seek bar */}
        <div className="absolute inset-x-0 bottom-0 h-3 flex items-end z-30 group" onClick={seek}>
          <div className="w-full h-[3px] group-hover:h-[5px] bg-white/30 transition-all">
            <div className="h-full bg-white" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
