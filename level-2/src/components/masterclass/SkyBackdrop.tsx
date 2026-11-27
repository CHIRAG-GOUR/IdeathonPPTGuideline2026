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
/** Scroll-linked value with a unit (e.g. "vw"), computed exactly in JS. */
function useLerp(p: MotionValue<number>, input: number[], output: number[], unit: string) {
  return useTransform(p, (v) => `${interp(v, input, output)}${unit}`);
}
/** Scroll-linked opacity that is always exact (function form = no WAAPI acceleration). */
function useFade(p: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(p, (v) => interp(v, input, output));
}

/**
 * The living sky behind the whole deck: one full day, driven by scroll.
 *
 *   top ─────────────────────────────────────────────── end
 *   dawn → morning → noon → afternoon → golden → sunset → starry night
 *   sun rises, arcs over ── sets into the sea ── moon rises from the sea
 *   birds + balloon in daylight ────── sea rises, ship sails, stars appear
 *
 * Everything is a pure function of scroll position, so scrolling back up
 * plays the day in reverse: the moon sinks, the sun rises from the sea and
 * the sky returns to dawn at the top.
 *
 * Performance: sky colours are pre-painted layers cross-faded with opacity,
 * and all motion is transform/opacity (GPU-composited).
 */

const STOPS = [0, 0.15, 0.3, 0.45, 0.6, 0.76, 0.88];
const SKIES = [
  ["#9aa4ff", "#d5d0ff", "#ffe4d6"], // dawn
  ["#a3c9ff", "#d6e8ff", "#eef5ff"], // morning
  ["#b3defd", "#def3ff", "#f6fbff"], // noon
  ["#c8d3ff", "#e9e6ff", "#fff2ea"], // afternoon
  ["#ffcfb3", "#ffe3cf", "#fff3e6"], // golden hour
  ["#f3b7c9", "#f9cfd0", "#ffe6da"], // sunset
  ["#0f1440", "#232a6b", "#4a4f9c"], // night: deep indigo → navy, lighter at the horizon
];

// Timeline (scroll progress 0..1). Pages sit at 0, 0.1, 0.2 … 1.
const T = {
  day: [0.6, 0.74], // birds, balloon, light shafts fade out
  seaIn: [0.58, 0.74], // the sea rises from the bottom
  sunSet: [0.72, 0.84], // the sun goes down behind the sea
  moonRise: [0.84, 1], // the moon comes up from behind the sea
  ship: [0.68, 1],
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

const STAR_TINTS = ["#ffffff", "#ffffff", "#dfe6ff", "#fff1d6", "#e8e0ff"];
const STARS = Array.from({ length: 120 }, (_, i) => ({
  wave: i % 4, // which wave of stars it appears with
  left: round(rnd(i, 11) * 100),
  top: round(rnd(i, 12) * 66),
  size: round(1 + rnd(i, 13) * (i % 9 === 0 ? 3.2 : 1.8)),
  delay: round(rnd(i, 14) * 5),
  dur: round(1.8 + rnd(i, 15) * 3),
  tint: STAR_TINTS[i % STAR_TINTS.length],
}));
// A few bright four-point stars.
const BRIGHT = Array.from({ length: 7 }, (_, i) => ({
  left: round(8 + rnd(i, 21) * 84),
  top: round(4 + rnd(i, 22) * 44),
  size: round(14 + rnd(i, 23) * 12),
  delay: round(rnd(i, 24) * 3),
}));
// Milky Way dust.
const DUST = Array.from({ length: 70 }, (_, i) => ({
  left: round(rnd(i, 31) * 100),
  top: round(35 + (rnd(i, 32) - 0.5) * 40),
  size: round(0.8 + rnd(i, 33) * 1.6),
  o: round(0.3 + rnd(i, 34) * 0.5),
}));
const SHOOTING = [
  { top: "10%", left: "78%", dur: 9, delay: 1 },
  { top: "24%", left: "58%", dur: 13, delay: 6 },
  { top: "6%", left: "40%", dur: 17, delay: 11 },
];

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

function StarWave({ wave, progress }: { wave: number; progress: MotionValue<number> }) {
  const start = 0.8 + wave * 0.03;
  const opacity = useFade(progress, [start, start + 0.04], [0, 1]);
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {STARS.filter((s) => s.wave === wave).map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.tint,
            boxShadow: `0 0 ${3 + s.size * 2}px ${s.size / 2}px ${s.tint}`,
            animation: `mc-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </motion.div>
  );
}

function BrightStar({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden>
      <path d="M10 0 C 10.8 7 13 9.2 20 10 C 13 10.8 10.8 13 10 20 C 9.2 13 7 10.8 0 10 C 7 9.2 9.2 7 10 0 Z" fill="white" />
      <circle cx="10" cy="10" r="2.2" fill="white" />
    </svg>
  );
}

function ShootingStar({ top, left, dur, delay }: (typeof SHOOTING)[number]) {
  return (
    <div className="absolute" style={{ top, left, transform: "rotate(-24deg)", transformOrigin: "0 0" }}>
      <div
        className="h-[2px] w-[150px] rounded-full"
        style={{
          background: "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0))",
          boxShadow: "0 0 8px 1px rgba(255,255,255,0.7)",
          animation: `mc-shoot ${dur}s ease-out ${delay}s infinite`,
        }}
      />
    </div>
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

/** Shimmering reflection column on the water, under a sun/moon at horizontal position `x`. */
function Glint({ x, opacity, color }: { x: MotionValue<string>; opacity: MotionValue<number>; color: string }) {
  return (
    <motion.div className="absolute top-[4%] h-[72%] w-24" style={{ x, opacity, marginLeft: 32 }}>
      <div
        className="w-full h-full"
        style={{
          background: `repeating-linear-gradient(180deg, rgba(${color},0.95) 0 5px, transparent 5px 14px)`,
          maskImage: "linear-gradient(180deg, black, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, black, transparent)",
          animation: "mc-shimmer 2.4s ease-in-out infinite",
        }}
      />
    </motion.div>
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

  // Sun: rise left → peak → descend → set behind the sea.
  const sunX = useLerp(p, [0, 0.45, T.sunSet[0], T.sunSet[1]], [6, 40, 60, 64], "vw");
  const sunY = useLerp(p, [0, 0.45, T.sunSet[0], T.sunSet[1]], [30, 6, 50, 94], "vh");
  // Moon: rises from behind the sea on the other side, climbs into the night sky.
  const moonX = useLerp(p, T.moonRise, [56, 66], "vw");
  const moonY = useLerp(p, T.moonRise, [94, 3], "vh");

  const dayO = useFade(p, T.day, [1, 0]); // birds, balloon, rays
  const starsO = useFade(p, [0.88, 0.93], [0, 1]);
  const nightO = useFade(p, [0.8, 0.9], [0, 1]); // Milky Way, shooting stars, night sea, horizon glow
  const cloudsO = useFade(p, [0.78, 0.9], [1, 0.08]); // clouds thin out to wisps at night
  const seaNightO = useFade(p, [0.78, 0.9], [0, 0.78]);
  const seaY = useLerp(p, T.seaIn, [105, 0], "%");
  const shipX = useLerp(p, T.ship, [-16, 62], "vw");
  const sunGlintO = useFade(p, [0.66, 0.76, 0.84], [0, 0.85, 0]);
  const moonGlintO = useFade(p, [0.86, 0.93, 1], [0, 0.9, 0.55]);
  const balloonY = useTransform(scrollY, [0, 5000], [0, -420]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {SKIES.map((c, i) => (
        <SkyLayer key={i} colors={c} index={i} progress={p} />
      ))}

      {/* ── Night sky ── */}
      <motion.div className="absolute inset-0" style={{ opacity: nightO }}>
        {/* Milky Way: a soft diagonal band of light and dust */}
        <div className="absolute -left-[20%] top-[8%] w-[140%] h-[34vh]" style={{ transform: "rotate(-14deg)" }}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(200,205,255,0.22) 0%, rgba(160,170,255,0.08) 45%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
          {DUST.map((d, k) => (
            <span
              key={k}
              className="absolute rounded-full bg-white"
              style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, opacity: d.o }}
            />
          ))}
        </div>
        {/* Horizon glow above the sea */}
        <div
          className="absolute inset-x-0 bottom-[22vh] h-[24vh]"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(170,175,255,0.38), rgba(170,175,255,0) 70%)" }}
        />
        {SHOOTING.map((st, k) => (
          <ShootingStar key={k} {...st} />
        ))}
      </motion.div>

      {/* Stars arrive in four waves as night falls */}
      {[0, 1, 2, 3].map((w) => (
        <StarWave key={w} wave={w} progress={p} />
      ))}
      <motion.div className="absolute inset-0" style={{ opacity: starsO }}>
        {BRIGHT.map((b, k) => (
          <div
            key={k}
            className="absolute"
            style={{ left: `${b.left}%`, top: `${b.top}%`, animation: `mc-twinkle 3.2s ease-in-out ${b.delay}s infinite`, filter: "drop-shadow(0 0 6px rgba(255,255,255,0.9))" }}
          >
            <BrightStar size={b.size} />
          </div>
        ))}
      </motion.div>

      {/* Moon: rises from behind the sea at night */}
      <motion.div className="absolute" style={{ x: moonX, y: moonY, willChange: "transform" }}>
        <div className="relative w-40 h-40">
          <div
            className="absolute -inset-24 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(245,246,255,0) 64%)" }}
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
        </div>
      </motion.div>

      {/* Sun: arcs over the day, then sets behind the sea */}
      <motion.div className="absolute" style={{ x: sunX, y: sunY, willChange: "transform" }}>
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
          <div
            className="absolute inset-6 rounded-full"
            style={{ background: "radial-gradient(circle at 40% 40%, #fffdf0, #ffd58a 72%)", boxShadow: "0 0 60px 20px rgba(255,220,160,0.65)" }}
          />
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

      <motion.div className="absolute inset-0" style={{ opacity: cloudsO }}>
        {CLOUDS.map((c, i) => (
          <ParallaxCloud key={i} {...c} />
        ))}
      </motion.div>

      {/* Sea: rises near the end; the moon sinks behind it */}
      <motion.div className="absolute inset-x-0 bottom-0 h-[30vh]" style={{ y: seaY, willChange: "transform" }}>
        <div className="absolute -top-4 inset-x-0 h-8 bg-gradient-to-b from-transparent to-white/60 blur-md" />
        <WaveStrip top="0%" color="#c9e9fc" foam={0.7} dur={22} amp={14} />
        {/* ship rides between the back and front waves */}
        <motion.div className="absolute top-[-6%] left-0" style={{ x: shipX, willChange: "transform" }}>
          <div style={{ animation: "mc-bob 3.2s ease-in-out infinite", transformOrigin: "50% 90%" }}>
            <Ship />
          </div>
        </motion.div>
        <WaveStrip top="34%" color="#addcf7" foam={0.6} dur={15} amp={18} reverse />
        <WaveStrip top="62%" color="#98d1f4" foam={0.55} dur={11} amp={12} />
        {/* Night tint: the water turns deep blue under the moon */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: seaNightO, background: "linear-gradient(180deg, #2a3180 0%, #182058 55%, #10164a 100%)" }}
        />
        {/* Sun glint (warm) while it sets, moon glint (silver) while it rises: above the tint */}
        <Glint x={sunX} opacity={sunGlintO} color="255,214,150" />
        <Glint x={moonX} opacity={moonGlintO} color="255,255,255" />
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
