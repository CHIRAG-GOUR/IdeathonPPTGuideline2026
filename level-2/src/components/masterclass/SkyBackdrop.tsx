"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useScroller } from "./Scroll";

/**
 * Fixed sky behind the whole page. As you scroll, the sky moves from dawn to
 * dusk and the sun travels across it in an arc. Light colours only.
 */

// dawn → morning → noon → afternoon → golden hour → dusk
const STOPS = [0, 0.2, 0.4, 0.6, 0.8, 1];
const TOP = ["#9aa4ff", "#a3c9ff", "#b3defd", "#bfe9ee", "#ffcfb3", "#e7c2f2"];
const MID = ["#d5d0ff", "#d6e8ff", "#def3ff", "#e3f8f2", "#ffe3cf", "#f6dcf5"];
const BOTTOM = ["#ffe4d6", "#eef5ff", "#f6fbff", "#f3fff8", "#fff3e6", "#ffeef6"];

const CLOUDS = [
  { top: "12%", left: "-4%", w: 340, o: 0.85, speed: -60, dur: 38 },
  { top: "22%", left: "62%", w: 420, o: 0.75, speed: -120, dur: 46 },
  { top: "48%", left: "8%", w: 260, o: 0.6, speed: -180, dur: 34 },
  { top: "64%", left: "74%", w: 300, o: 0.65, speed: -90, dur: 42 },
  { top: "80%", left: "30%", w: 380, o: 0.55, speed: -150, dur: 50 },
];

// Deterministic sparkle positions (same on server and client).
const SPARKS = Array.from({ length: 22 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };
  // Rounded so server and client render identical style strings (no hydration mismatch).
  const round = (v: number) => Math.round(v * 100) / 100;
  return { left: round(r(1) * 100), size: round(3 + r(2) * 5), delay: round(r(3) * 14), dur: round(12 + r(4) * 12) };
});

function Cloud({ width, opacity }: { width: number; opacity: number }) {
  return (
    <svg width={width} viewBox="0 0 200 80" style={{ opacity }} aria-hidden>
      <path
        d="M24 66c-13 0-22-8-22-18s9-18 21-18c2-12 13-21 27-21 9 0 17 4 22 10 5-9 15-15 27-15 17 0 31 13 31 29v1c3-1 6-1 9-1 15 0 27 10 27 22s-12 21-27 21H24z"
        fill="white"
      />
    </svg>
  );
}

export default function SkyBackdrop() {
  const scroller = useScroller();
  const { scrollYProgress } = useScroll({ container: scroller });
  const top = useTransform(scrollYProgress, STOPS, TOP);
  const mid = useTransform(scrollYProgress, STOPS, MID);
  const bottom = useTransform(scrollYProgress, STOPS, BOTTOM);
  const background = useMotionTemplate`linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bottom} 100%)`;

  // Sun arc: rises from the left, peaks mid-page, sets on the right.
  const sunX = useTransform(scrollYProgress, [0, 1], ["6vw", "84vw"]);
  const sunY = useTransform(scrollYProgress, [0, 0.5, 1], ["30vh", "6vh", "30vh"]);
  const sunHue = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], ["#fff6d6", "#fffbe8", "#ffd9a8", "#ffd1e6"]);

  return (
    <motion.div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ background }} aria-hidden>
      {/* Sun + glow */}
      <motion.div className="absolute" style={{ x: sunX, y: sunY }}>
        <div className="relative w-40 h-40">
          <div
            className="absolute -inset-40 rounded-full opacity-60"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)" }}
          />
          <div
            className="absolute -inset-24 opacity-30"
            style={{
              background: "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.9) 0deg 4deg, transparent 4deg 18deg)",
              maskImage: "radial-gradient(circle, black 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle, black 20%, transparent 70%)",
              animation: "mc-spin 90s linear infinite",
            }}
          />
          <motion.div className="absolute inset-6 rounded-full blur-[2px]" style={{ background: sunHue }} />
        </div>
      </motion.div>

      {/* Diagonal light shafts, like sun through haze */}
      <div className="absolute inset-0 opacity-40">
        {[12, 28, 46].map((l, i) => (
          <div
            key={l}
            className="absolute -top-1/4 h-[150%] bg-gradient-to-b from-white/70 via-white/10 to-transparent"
            style={{ left: `${l}%`, width: 60 + i * 30, transform: "rotate(-28deg)", filter: "blur(18px)" }}
          />
        ))}
      </div>

      {/* Parallax clouds */}
      {CLOUDS.map((c, i) => (
        <ParallaxCloud key={i} {...c} />
      ))}

      {/* Rising sparkles */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)",
            animation: `mc-rise ${s.dur}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </motion.div>
  );
}

function ParallaxCloud({ top, left, w, o, speed, dur }: (typeof CLOUDS)[number]) {
  const scroller = useScroller();
  const { scrollY } = useScroll({ container: scroller });
  const y = useTransform(scrollY, [0, 4000], [0, speed * 6]);
  return (
    <motion.div className="absolute" style={{ top, left, y }}>
      <div style={{ animation: `mc-drift ${dur}s ease-in-out infinite alternate` }}>
        <Cloud width={w} opacity={o} />
      </div>
    </motion.div>
  );
}
