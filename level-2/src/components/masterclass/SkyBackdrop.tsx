"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useScroller } from "./Scroll";

function interp(v: number, input: number[], output: number[]) {
  if (v <= input[0]) return output[0];
  const last = input.length - 1;
  if (v >= input[last]) return output[last];
  let i = 0;
  while (i < last - 1 && v > input[i + 1]) i++;
  const t = (v - input[i]) / (input[i + 1] - input[i]);
  return output[i] + (output[i + 1] - output[i]) * t;
}
/** Scroll-linked opacity that is always exact (function form = no WAAPI acceleration). */
function useFade(p: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(p, (v) => interp(v, input, output));
}

/**
 * The living sky behind the whole deck: one full day, driven by scroll.
 *
 *   top ─────────────────────────────────────────────── end
 *   dawn → morning → noon → afternoon → golden → moonlit night
 *   sun rises, arcs over ── cools into a moon ── sinks into the sea
 *   birds + balloon in daylight ────── sea rises, ship sails, stars appear
 *
 * Everything is a pure function of scroll position, so scrolling back up
 * plays the day in reverse: the moon rises out of the sea, warms back into
 * the sun and returns to dawn at the top. Light colours only.
 *
 * Performance: sky colours are pre-painted layers cross-faded with opacity,
 * and all motion is transform/opacity (GPU-composited).
 */

const STOPS = [0, 0.17, 0.34, 0.5, 0.66, 0.83, 1];
const SKIES = [
  ["#9aa4ff", "#d5d0ff", "#ffe4d6"], // dawn
  ["#a3c9ff", "#d6e8ff", "#eef5ff"], // morning
  ["#b3defd", "#def3ff", "#f6fbff"], // noon
  ["#c8d3ff", "#e9e6ff", "#fff2ea"], // afternoon
  ["#ffcfb3", "#ffe3cf", "#fff3e6"], // golden hour
  ["#d9bff2", "#ecd9f7", "#fde9f3"], // dusk
  ["#9fa9f0", "#c9cdfa", "#e4e6ff"], // moonlit (still light)
];

// Timeline (scroll progress 0..1)
const T = {
  dayEnd: 0.72, // birds, balloon, sun rays start to fade
  seaIn: [0.66, 0.88],
  toMoon: [0.72, 0.86],
  set: [0.86, 1],
  ship: [0.76, 1],
};

const CLOUDS = [
  { top: "12%", left: "-4%", w: 340, o: 0.85, speed: -60, dur: 38 },
  { top: "22%", left: "62%", w: 420, o: 0.75, speed: -120, dur: 46 },
  { top: "48%", left: "8%", w: 260, o: 0.6, speed: -180, dur: 34 },
  { top: "64%", left: "74%", w: 300, o: 0.65, speed: -90, dur: 42 },
  { top: "80%", left: "30%", w: 380, o: 0.55, speed: -150, dur: 50 },
];

const rnd = (i: number, n: number) => {
  const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280;
  return x - Math.floor(x);
};
const round = (v: number) => Math.round(v * 100) / 100;

const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  left: round(rnd(i, 1) * 100),
  size: round(3 + rnd(i, 2) * 5),
  delay: round(rnd(i, 3) * 14),
  dur: round(12 + rnd(i, 4) * 12),
}));

const STARS = Array.from({ length: 34 }, (_, i) => ({
  left: round(rnd(i, 11) * 100),
  top: round(rnd(i, 12) * 58),
  size: round(2 + rnd(i, 13) * 3),
  delay: round(rnd(i, 14) * 4),
  dur: round(2.2 + rnd(i, 15) * 2.5),
}));

// Bird flocks: different heights, speeds, directions and start times.
const FLOCKS = [
  { top: "14%", dur: 30, delay: -6, rev: false, n: 5, size: 1 },
  { top: "30%", dur: 42, delay: 8, rev: true, n: 3, size: 0.8 },
  { top: "9%", dur: 36, delay: 20, rev: false, n: 4, size: 0.7 },
  { top: "40%", dur: 48, delay: 30, rev: true, n: 2, size: 0.9 },
  { top: "22%", dur: 26, delay: 44, rev: false, n: 3, size: 0.85 },
];

/* ───────────────────────── small pieces ───────────────────────── */

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

function SkyLayer({ colors, index, progress }: { colors: string[]; index: number; progress: MotionValue<number> }) {
  const last = STOPS.length - 1;
  const prev = STOPS[Math.max(0, index - 1)];
  const at = STOPS[index];
  const next = STOPS[Math.min(last, index + 1)];
  const opacity = useFade(
    progress,
    index === 0 ? [at, next] : index === last ? [prev, at] : [prev, at, next],
    index === 0 ? [1, 0] : index === last ? [0, 1] : [0, 1, 0]
  );
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity: index === 0 ? 1 : opacity,
        background: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 55%, ${colors[2]} 100%)`,
        willChange: "opacity",
      }}
    />
  );
}

function Bird({ scale, speed }: { scale: number; speed: number }) {
  return (
    <svg className="mc-bird" width={28 * scale} height={14 * scale} viewBox="0 0 28 14" aria-hidden>
      <path
        d="M1 8 Q 7 1 14 8 Q 21 1 27 8"
        fill="none"
        stroke="#5d5b8f"
        strokeOpacity="0.75"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ animationDuration: `${speed}s` }}
      />
    </svg>
  );
}

function Flock({ top, dur, delay, rev, n, size }: (typeof FLOCKS)[number]) {
  return (
    <div
      className="absolute left-0"
      style={{ top, animation: `${rev ? "mc-fly-rev" : "mc-fly"} ${dur}s linear ${delay}s infinite`, willChange: "transform" }}
    >
      <div className="relative" style={{ width: 160 * size, height: 70 * size }}>
        {Array.from({ length: n }, (_, k) => (
          <div
            key={k}
            className="absolute"
            style={{
              left: `${k * 26 * size}px`,
              top: `${(k % 2 ? 18 : 4) + k * 5 * size}px`,
              animation: `mc-glide ${3 + k * 0.6}s ease-in-out ${k * 0.3}s infinite`,
            }}
          >
            <Bird scale={size * (k === 0 ? 1.1 : 0.85 + rnd(k, 7) * 0.2)} speed={0.45 + rnd(k, 8) * 0.25} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Balloon() {
  return (
    <svg width="74" height="104" viewBox="0 0 74 104" aria-hidden>
      <defs>
        <clipPath id="mc-balloon-clip">
          <path d="M37 2 C 60 2 72 20 72 38 C 72 56 52 68 46 78 H 28 C 22 68 2 56 2 38 C 2 20 14 2 37 2 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#mc-balloon-clip)">
        <rect x="0" y="0" width="74" height="80" fill="#ffe3ea" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={6 + i * 24} y="0" width="12" height="80" fill="#f0547a" opacity="0.85" />
        ))}
      </g>
      <path d="M37 2 C 60 2 72 20 72 38 C 72 56 52 68 46 78 H 28 C 22 68 2 56 2 38 C 2 20 14 2 37 2 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.8" />
      <line x1="29" y1="78" x2="31" y2="90" stroke="#5d5b8f" strokeOpacity="0.6" />
      <line x1="45" y1="78" x2="43" y2="90" stroke="#5d5b8f" strokeOpacity="0.6" />
      <rect x="29" y="90" width="16" height="11" rx="2.5" fill="#e2b48a" />
    </svg>
  );
}

function Ship() {
  return (
    <svg width="150" height="120" viewBox="0 0 150 120" aria-hidden>
      {/* sails */}
      <path d="M72 10 L72 78 L30 78 Z" fill="#fff8ee" />
      <path d="M72 10 L72 78 L30 78 Z" fill="none" stroke="#ffd0dc" strokeWidth="2" />
      <path d="M78 22 L78 78 L112 78 Z" fill="#ffe3ea" />
      <rect x="42" y="56" width="26" height="5" fill="#f0547a" opacity="0.7" transform="skewX(-28)" />
      {/* mast + flag */}
      <line x1="75" y1="4" x2="75" y2="84" stroke="#8a6a5a" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 4 L92 9 L75 14 Z" fill="#f0547a" />
      {/* hull */}
      <path d="M14 84 H136 L120 104 H32 Z" fill="#f0547a" />
      <path d="M18 84 H132 L129 89 H21 Z" fill="#ffffff" opacity="0.85" />
      <circle cx="56" cy="95" r="3" fill="#ffe3ea" />
      <circle cx="74" cy="95" r="3" fill="#ffe3ea" />
      <circle cx="92" cy="95" r="3" fill="#ffe3ea" />
    </svg>
  );
}

/** One looping wave strip (twice the screen wide, slid left forever). */
function WaveStrip({ top, color, foam, dur, amp, reverse }: { top: string; color: string; foam: number; dur: number; amp: number; reverse?: boolean }) {
  const W = 2880;
  const period = 180;
  let d = `M0 ${amp}`;
  for (let x = 0; x < W; x += period) d += ` Q ${x + period / 4} 0 ${x + period / 2} ${amp} T ${x + period} ${amp}`;
  const fill = `${d} V 400 H 0 Z`;
  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ top }}>
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: "200%",
          animation: `mc-wave ${dur}s linear infinite${reverse ? " reverse" : ""}`,
          willChange: "transform",
        }}
      >
        <svg className="w-full h-full" viewBox={`0 0 ${W} 400`} preserveAspectRatio="none">
          <path d={fill} fill={color} />
          <path d={d} fill="none" stroke="white" strokeOpacity={foam} strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

/* ───────────────────────── the sky ───────────────────────── */

export default function SkyBackdrop() {
  const scroller = useScroller();
  const { scrollYProgress: p, scrollY } = useScroll({ container: scroller });

  // Sun / moon path: rise left → peak → descend right → sink into the sea.
  const bodyX = useTransform(p, [0, 0.45, T.toMoon[1], 1], ["6vw", "40vw", "68vw", "78vw"]);
  const bodyY = useTransform(p, [0, 0.45, T.toMoon[1], 1], ["30vh", "6vh", "40vh", "86vh"]);
  const sunO = useFade(p, T.toMoon, [1, 0]);
  const moonO = useFade(p, T.toMoon, [0, 1]);
  const bodyScale = useTransform(p, [T.toMoon[0], T.set[1]], [1, 0.9]);

  const dayO = useFade(p, [T.dayEnd - 0.06, T.dayEnd + 0.1], [1, 0]); // birds, balloon, rays
  const starsO = useFade(p, [0.78, 0.95], [0, 1]);
  const seaY = useTransform(p, T.seaIn, ["105%", "0%"]);
  const shipX = useTransform(p, T.ship, ["-16vw", "64vw"]);
  const glintO = useFade(p, [0.84, 0.93, 1], [0, 0.9, 0.35]);
  const glintX = useTransform(p, [T.toMoon[1], 1], ["68vw", "78vw"]);
  const balloonY = useTransform(scrollY, [0, 5000], [0, -420]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {SKIES.map((c, i) => (
        <SkyLayer key={i} colors={c} index={i} progress={p} />
      ))}

      {/* Stars (night) */}
      <motion.div className="absolute inset-0" style={{ opacity: starsO }}>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              boxShadow: "0 0 6px 1px rgba(255,255,255,0.9)",
              animation: `mc-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Sun ↔ Moon (one body that changes) */}
      <motion.div className="absolute" style={{ x: bodyX, y: bodyY, scale: bodyScale, willChange: "transform" }}>
        <div className="relative w-40 h-40">
          {/* warm sun */}
          <motion.div className="absolute inset-0" style={{ opacity: sunO }}>
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
            <div
              className="absolute inset-6 rounded-full"
              style={{ background: "radial-gradient(circle at 40% 40%, #fffdf0, #ffe7a8 70%)", boxShadow: "0 0 60px 20px rgba(255,236,180,0.6)" }}
            />
          </motion.div>
          {/* cool moon */}
          <motion.div className="absolute inset-0" style={{ opacity: moonO }}>
            <div
              className="absolute -inset-24 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(245,246,255,0) 64%)" }}
            />
            <div
              className="absolute inset-7 rounded-full overflow-hidden"
              style={{
                background: "radial-gradient(circle at 38% 35%, #ffffff, #f1f2ff 70%)",
                boxShadow: "0 0 0 3px rgba(255,255,255,0.9), 0 0 40px 14px rgba(255,255,255,0.95), 0 0 120px 40px rgba(236,238,255,0.8)",
              }}
            >
              <span className="absolute left-[22%] top-[28%] w-5 h-5 rounded-full bg-[#dfe3fb]" />
              <span className="absolute left-[56%] top-[54%] w-7 h-7 rounded-full bg-[#dfe3fb]" />
              <span className="absolute left-[40%] top-[70%] w-3 h-3 rounded-full bg-[#dfe3fb]" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Daylight: light shafts, birds, balloon */}
      <motion.div data-layer="day" className="absolute inset-0" style={{ opacity: dayO }}>
        <div className="absolute inset-0 opacity-40">
          {[12, 28, 46].map((l, i) => (
            <div
              key={l}
              className="absolute -top-1/4 h-[150%] bg-gradient-to-b from-white/70 via-white/10 to-transparent"
              style={{ left: `${l}%`, width: 60 + i * 30, transform: "rotate(-28deg)", filter: "blur(18px)" }}
            />
          ))}
        </div>
        {FLOCKS.map((f, i) => (
          <Flock key={i} {...f} />
        ))}
        <motion.div className="absolute left-[78%] top-[58%]" style={{ y: balloonY }}>
          <div style={{ animation: "mc-glide 7s ease-in-out infinite" }}>
            <Balloon />
          </div>
        </motion.div>
      </motion.div>

      {CLOUDS.map((c, i) => (
        <ParallaxCloud key={i} {...c} />
      ))}

      {/* Sea: rises near the end; the moon sinks behind it */}
      <motion.div className="absolute inset-x-0 bottom-0 h-[30vh]" style={{ y: seaY, willChange: "transform" }}>
        <div className="absolute -top-4 inset-x-0 h-8 bg-gradient-to-b from-transparent to-white/60 blur-md" />
        <WaveStrip top="0%" color="#c9e9fc" foam={0.7} dur={22} amp={14} />
        {/* moon glint on the water */}
        <motion.div className="absolute top-[6%] h-[70%] w-24 -ml-12" style={{ x: glintX, opacity: glintO }}>
          <div
            className="w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.95) 0 5px, transparent 5px 14px)",
              maskImage: "linear-gradient(180deg, black, transparent)",
              WebkitMaskImage: "linear-gradient(180deg, black, transparent)",
              animation: "mc-shimmer 2.4s ease-in-out infinite",
            }}
          />
        </motion.div>
        {/* ship rides between the back and front waves */}
        <motion.div className="absolute top-[-6%] left-0" style={{ x: shipX, willChange: "transform" }}>
          <div style={{ animation: "mc-bob 3.2s ease-in-out infinite", transformOrigin: "50% 90%" }}>
            <Ship />
          </div>
        </motion.div>
        <WaveStrip top="34%" color="#addcf7" foam={0.6} dur={15} amp={18} reverse />
        <WaveStrip top="62%" color="#98d1f4" foam={0.55} dur={11} amp={12} />
      </motion.div>

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
    </div>
  );
}

function ParallaxCloud({ top, left, w, o, speed, dur }: (typeof CLOUDS)[number]) {
  const scroller = useScroller();
  const { scrollY } = useScroll({ container: scroller });
  const y = useTransform(scrollY, [0, 4000], [0, speed * 6]);
  return (
    <motion.div className="absolute" style={{ top, left, y, willChange: "transform" }}>
      <div style={{ animation: `mc-drift ${dur}s ease-in-out infinite alternate` }}>
        <Cloud width={w} opacity={o} />
      </div>
    </motion.div>
  );
}
