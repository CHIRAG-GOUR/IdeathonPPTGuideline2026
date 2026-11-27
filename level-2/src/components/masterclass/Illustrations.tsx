"use client";

import { motion } from "framer-motion";

/* Small animated SVG illustrations, one per page (shown beside the page title).
   Palette: coral #f0547a, lavender #e5e3ff, periwinkle #9aa4ff, mint #c4ecdf,
   peach #ffd9c8, ink #26245c. All loop gently. */

const INK = "#26245c";
const CORAL = "#f0547a";
const LAV = "#e5e3ff";
const PERI = "#9aa4ff";
const MINT = "#c4ecdf";
const PEACH = "#ffd9c8";

const loop = { repeat: Infinity, ease: "easeInOut" as const };

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.9 }}
      className="relative w-[150px] h-[120px] rounded-[28px] bg-white/70 border border-white shadow-[0_20px_50px_-25px_rgba(60,50,160,0.5)] flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-coral-soft blur-2xl" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/* Agenda: a sundial clock drawing the day's 6 blocks, with a turning hand. */
export function SunDial() {
  const r = 34;
  const C = 2 * Math.PI * r;
  const mins = [5, 30, 45, 20, 15, 5];
  const cols = ["#ffd0dc", PERI, "#a9d6ff", MINT, PEACH, "#e9c9f2"];
  let acc = 0;
  return (
    <Frame>
      <svg width="110" height="100" viewBox="0 0 110 100">
        <g transform="rotate(-90 55 50)">
          {mins.map((m, i) => {
            const len = (m / 120) * C - 2;
            const off = acc;
            acc += (m / 120) * C;
            return (
              <motion.circle
                key={i}
                cx="55"
                cy="50"
                r={r}
                fill="none"
                stroke={cols[i]}
                strokeWidth="12"
                strokeDasharray={`${len} ${C}`}
                strokeDashoffset={-off}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 + i * 0.15 }}
              />
            );
          })}
        </g>
        <circle cx="55" cy="50" r="20" fill="white" />
        <motion.line
          x1="55" y1="50" x2="55" y2="33"
          stroke={CORAL} strokeWidth="3.5" strokeLinecap="round"
          style={{ originX: 0.5, originY: 1 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <circle cx="55" cy="50" r="3.5" fill={INK} />
      </svg>
    </Frame>
  );
}

/* Think: a plant whose roots draw down through 5 "why?" levels to the root cause. */
export function RootWhy() {
  return (
    <Frame>
      <svg width="120" height="104" viewBox="0 0 120 104">
        <rect x="8" y="36" width="104" height="64" rx="10" fill={PEACH} opacity="0.55" />
        <line x1="8" y1="36" x2="112" y2="36" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />
        {/* stem + leaves */}
        <motion.path d="M60 36 V18" stroke="#4fb38f" strokeWidth="3" strokeLinecap="round" fill="none"
          animate={{ scaleY: [0.9, 1, 0.9] }} style={{ originY: 1 }} transition={{ ...loop, duration: 3 }} />
        <motion.ellipse cx="52" cy="18" rx="8" ry="4.5" fill={MINT} stroke="#4fb38f" strokeWidth="1.5"
          animate={{ rotate: [-18, -10, -18] }} style={{ originX: 1, originY: 0.72 }} transition={{ ...loop, duration: 3 }} />
        <motion.ellipse cx="68" cy="14" rx="8" ry="4.5" fill={MINT} stroke="#4fb38f" strokeWidth="1.5"
          animate={{ rotate: [18, 10, 18] }} style={{ originX: 0, originY: 0.94 }} transition={{ ...loop, duration: 3 }} />
        {/* root drawing down */}
        <motion.path
          d="M60 36 C 58 46, 64 52, 60 60 S 54 74, 60 80 S 64 90, 60 94"
          stroke={INK} strokeOpacity="0.55" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ repeat: Infinity, duration: 5, times: [0, 0.55, 0.85, 1] }}
        />
        {[44, 54, 64, 74, 84].map((y, i) => (
          <motion.g key={y} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 5, times: [0.1 * i, 0.1 * i + 0.08, 0.85, 1] }}>
            <rect x={i % 2 ? 66 : 24} y={y - 6} width="30" height="11" rx="5.5" fill="white" stroke={PERI} strokeWidth="1" />
            <text x={i % 2 ? 81 : 39} y={y + 2} textAnchor="middle" fontSize="7" fontWeight="700" fill={INK}>why?</text>
          </motion.g>
        ))}
        <motion.circle cx="60" cy="95" r="4.5" fill={CORAL}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }} transition={{ ...loop, duration: 1.4 }} />
      </svg>
    </Frame>
  );
}

/* Problem Card: a clipboard ticking itself off. */
export function ClipboardTick() {
  return (
    <Frame>
      <svg width="100" height="104" viewBox="0 0 100 104">
        <rect x="18" y="12" width="64" height="86" rx="10" fill="white" stroke={PERI} strokeWidth="2" />
        <rect x="36" y="6" width="28" height="12" rx="5" fill={CORAL} />
        {[32, 48, 64, 80].map((y, i) => (
          <g key={y}>
            <rect x="28" y={y - 5} width="10" height="10" rx="3" fill={LAV} />
            <rect x="44" y={y - 2} width="28" height="4" rx="2" fill={INK} opacity="0.12" />
            <motion.path
              d={`M29.5 ${y} l3 3 l5 -6`}
              stroke={CORAL} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 4, times: [0.12 * i, 0.12 * i + 0.1, 0.9, 1] }}
            />
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* Build 3D: a pastel cube spinning in real 3D. */
export function Cube3D() {
  const s = 46;
  const faces = [
    { t: `translateZ(${s / 2}px)`, c: "#ffd0dc" },
    { t: `rotateY(180deg) translateZ(${s / 2}px)`, c: LAV },
    { t: `rotateY(90deg) translateZ(${s / 2}px)`, c: MINT },
    { t: `rotateY(-90deg) translateZ(${s / 2}px)`, c: PEACH },
    { t: `rotateX(90deg) translateZ(${s / 2}px)`, c: "#ffffff" },
    { t: `rotateX(-90deg) translateZ(${s / 2}px)`, c: PERI },
  ];
  return (
    <Frame>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ ...loop, duration: 3 }} style={{ perspective: 400 }}>
        <motion.div
          className="relative"
          style={{ width: s, height: s, transformStyle: "preserve-3d", rotateX: -24 }}
          animate={{ rotateY: 360 }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
        >
          {faces.map((f, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-[6px] border-2 border-white/90"
              style={{ transform: f.t, background: f.c, boxShadow: "inset 0 0 12px rgba(38,36,92,0.08)" }}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-14 h-2.5 rounded-full bg-ink/10 blur-[2px]"
        animate={{ scaleX: [1, 0.8, 1] }}
        transition={{ ...loop, duration: 3 }}
      />
    </Frame>
  );
}

/* Circuit: a chip with current pulsing along its traces. */
export function ChipPulse() {
  const traces = ["M30 52 H6", "M90 52 H114", "M60 22 V2", "M60 82 V102", "M40 32 L22 14", "M80 72 L98 90"];
  return (
    <Frame>
      <svg width="120" height="104" viewBox="0 0 120 104">
        {traces.map((d) => (
          <g key={d}>
            <path d={d} stroke={INK} strokeOpacity="0.12" strokeWidth="5" strokeLinecap="round" />
            <path d={d} stroke={CORAL} strokeWidth="2.5" strokeDasharray="5 7" strokeLinecap="round" style={{ animation: "mc-dash 0.7s linear infinite" }} />
          </g>
        ))}
        <motion.rect x="34" y="26" width="52" height="52" rx="10" fill="url(#chipg)"
          animate={{ scale: [1, 1.04, 1] }} style={{ originX: 0.5, originY: 0.5 }} transition={{ ...loop, duration: 1.6 }} />
        <rect x="46" y="38" width="28" height="28" rx="6" fill="white" opacity="0.85" />
        <motion.circle cx="60" cy="52" r="5" fill={CORAL} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ ...loop, duration: 1.2 }} />
        <defs>
          <linearGradient id="chipg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={PERI} />
            <stop offset="1" stopColor="#c9b8ff" />
          </linearGradient>
        </defs>
      </svg>
    </Frame>
  );
}

/* Brand: three brand cards fanning out — logo, colour, type. */
export function SwatchFan() {
  const cards = [
    { c: LAV, r: -18 },
    { c: MINT, r: 0 },
    { c: "#ffd0dc", r: 18 },
  ];
  return (
    <Frame>
      <div className="relative w-[90px] h-[84px]">
        {cards.map((k, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 bottom-0 w-[44px] h-[66px] -ml-[22px] rounded-xl border-2 border-white shadow-md"
            style={{ background: k.c, originX: "50%", originY: "100%" }}
            animate={{ rotate: [0, k.r, k.r, 0] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.3, 0.75, 1], ease: "easeInOut" }}
          >
            {i === 2 && (
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-coral overflow-hidden">
                <span className="absolute -right-1.5 top-1 w-3 h-3 rounded-full bg-white/90" />
              </span>
            )}
            {i === 1 && <span className="absolute bottom-3 left-2 right-2 h-1.5 rounded bg-white/80" />}
            {i === 0 && <span className="absolute top-3 left-2 font-display text-[13px] font-extrabold text-ink">Aa</span>}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* Money: coins stacking beside a growing bar chart. */
export function CoinStack() {
  return (
    <Frame>
      <svg width="120" height="100" viewBox="0 0 120 100">
        <line x1="10" y1="88" x2="112" y2="88" stroke={INK} strokeOpacity="0.15" strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (
          <motion.g key={i}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-40, 0, 0, 0] }}
            transition={{ repeat: Infinity, duration: 3.6, delay: i * 0.25, times: [0, 0.18, 0.85, 1], ease: "easeOut" }}>
            <ellipse cx="38" cy={80 - i * 11} rx="20" ry="7" fill="#ffd66b" stroke="#e9a93c" strokeWidth="1.5" />
            <text x="38" y={83 - i * 11} textAnchor="middle" fontSize="8" fontWeight="800" fill="#a8701a">₹</text>
          </motion.g>
        ))}
        {[22, 36, 52].map((h, i) => (
          <motion.rect key={i} x={70 + i * 13} width="9" rx="3" fill={i === 2 ? CORAL : PERI}
            initial={{ height: 0, y: 88 }}
            animate={{ height: [0, h, h, 0], y: [88, 88 - h, 88 - h, 88] }}
            transition={{ repeat: Infinity, duration: 3.6, delay: 0.4 + i * 0.2, times: [0, 0.25, 0.85, 1] }} />
        ))}
      </svg>
    </Frame>
  );
}

/* Pitch: a microphone with pulsing sound waves and a 3-minute ring. */
export function MicWaves() {
  return (
    <Frame>
      <svg width="120" height="104" viewBox="0 0 120 104">
        <circle cx="60" cy="50" r="40" fill="none" stroke={LAV} strokeWidth="5" />
        <motion.circle cx="60" cy="50" r="40" fill="none" stroke={CORAL} strokeWidth="5" strokeLinecap="round"
          transform="rotate(-90 60 50)" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }} />
        <rect x="51" y="26" width="18" height="32" rx="9" fill={PERI} />
        <path d="M44 48 a16 16 0 0 0 32 0" stroke={INK} strokeOpacity="0.5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="60" y1="64" x2="60" y2="74" stroke={INK} strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="52" y1="75" x2="68" y2="75" stroke={INK} strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <motion.path d={`M${36 - i * 7} ${34 - i * 3} q -8 8 0 16`} stroke={CORAL} strokeWidth="2.5" fill="none" strokeLinecap="round"
              animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.25 }} />
            <motion.path d={`M${84 + i * 7} ${34 - i * 3} q 8 8 0 16`} stroke={CORAL} strokeWidth="2.5" fill="none" strokeLinecap="round"
              animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.25 }} />
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* Responsible AI: a shield drawing its check, with an orbiting dot. */
export function ShieldTick() {
  return (
    <Frame>
      <svg width="110" height="104" viewBox="0 0 110 104">
        <motion.g style={{ originX: 0.5, originY: 0.5 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 7, ease: "linear" }}>
          <circle cx="55" cy="52" r="44" fill="none" stroke={LAV} strokeWidth="2" strokeDasharray="3 6" />
          <circle cx="55" cy="8" r="4.5" fill={CORAL} />
        </motion.g>
        <path d="M55 18 L80 28 V50 C80 68 68 80 55 86 C42 80 30 68 30 50 V28 Z" fill={MINT} stroke="#4fb38f" strokeWidth="2.5" strokeLinejoin="round" />
        <motion.path d="M43 52 L52 61 L68 43" stroke="#2f8f6c" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.35, 0.85, 1] }} />
      </svg>
    </Frame>
  );
}

/* Exit: a ticket with a paper plane looping out of it. */
export function PlaneTicket() {
  return (
    <Frame>
      <svg width="130" height="100" viewBox="0 0 130 100">
        <path d="M14 34 h102 a0 0 0 0 1 0 0 v10 a8 8 0 0 0 0 16 v10 h-102 v-10 a8 8 0 0 0 0 -16 z" fill="white" stroke={PERI} strokeWidth="2" />
        <line x1="44" y1="38" x2="44" y2="66" stroke={PERI} strokeWidth="2" strokeDasharray="3 4" />
        <rect x="54" y="44" width="44" height="5" rx="2.5" fill={INK} opacity="0.15" />
        <rect x="54" y="55" width="30" height="5" rx="2.5" fill={CORAL} opacity="0.7" />
        <motion.g
          animate={{ x: [0, 40, 70, 0], y: [0, -20, -6, 0], rotate: [0, -12, 8, 0], opacity: [1, 1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.8, 1], ease: "easeInOut" }}
        >
          <path d="M16 26 L40 14 L26 32 Z" fill={CORAL} />
          <path d="M16 26 L40 14 L30 26 Z" fill="#ffd0dc" />
        </motion.g>
      </svg>
    </Frame>
  );
}
