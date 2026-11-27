"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Maximize, Minimize, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { deck } from "@/content/masterclass";
import { useNotes } from "./Notes";
import { useScroller, usePager } from "./Scroll";

const ids = deck.nav.map((n) => n.id);

/** On-screen controls: brand mark (top-left, no bar), fullscreen (top-right corner),
 *  progress line, side dots, ▲▼ buttons and keyboard paging. */
export default function Chrome({ homeHref }: { homeHref?: string }) {
  const [active, setActive] = useState(ids[0]);
  const [full, setFull] = useState(false);
  const { toggle } = useNotes(); // mentor notes stay available on the N key
  const scroller = useScroller();
  const { goTo, step } = usePager();
  const { scrollYProgress } = useScroll({ container: scroller });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  // Track which page is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.55, root: scroller.current }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [scroller]);

  // Keyboard: arrows / PageUp / PageDown / Space / Home / End, F fullscreen, N notes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable=true], select")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === " " && t.closest("button, a")) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(e.shiftKey && e.key === " " ? -1 : 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(ids[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(ids[ids.length - 1]);
      } else if (e.key.toLowerCase() === "n") {
        toggle();
      } else if (e.key.toLowerCase() === "f") {
        toggleFull();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, toggle, goTo]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const onHero = active === ids[0];
  const activeIndex = ids.indexOf(active);

  return (
    <>
      {/* Progress line */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-coral origin-left z-50" style={{ scaleX: progress }} />

      {/* Brand mark, directly on the screen (no bar) */}
      <div className="fixed top-4 left-4 sm:left-6 z-40 flex items-center gap-2.5">
        {homeHref && (
          <a
            href={homeHref}
            title="Back to Level 2"
            className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-sm transition-colors ${
              onHero ? "bg-white/25 text-white border-white/50 hover:bg-white/40" : "bg-white/90 text-ink border-line hover:border-coral"
            }`}
          >
            <ArrowLeft size={16} />
          </a>
        )}
        <button onClick={() => goTo(ids[0])} className="flex items-center gap-2.5 cursor-pointer" aria-label="Back to start">
          <span className="relative w-9 h-9 rounded-full bg-coral overflow-hidden shadow-md">
            <span className="absolute -right-2 top-2 w-5 h-5 rounded-full bg-white/90" />
          </span>
          <span className="text-left leading-none" style={{ textShadow: onHero ? "0 2px 12px rgba(70,60,170,0.35)" : "0 1px 8px rgba(255,255,255,0.35)" }}>
            <span className={`block font-display font-extrabold text-[15px] tracking-wide transition-colors ${onHero ? "text-white" : "text-[color:var(--mc-head)]"}`}>
              {deck.meta.brand}
            </span>
            <span className={`block font-mono text-[10.5px] tracking-[0.22em] uppercase mt-0.5 transition-colors ${onHero ? "text-white/90" : "text-[color:var(--mc-sub)]"}`}>
              {deck.meta.product}
            </span>
          </span>
        </button>
      </div>

      {/* Fullscreen: top-right corner */}
      <button
        onClick={toggleFull}
        title={full ? "Exit fullscreen (F)" : "Fullscreen (F)"}
        aria-label={full ? "Exit fullscreen" : "Fullscreen"}
        className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center border shadow-md cursor-pointer transition-colors ${
          onHero ? "bg-white/25 text-white border-white/50 hover:bg-white/40" : "bg-white/90 text-ink border-line hover:border-coral hover:text-coral"
        }`}
      >
        {full ? <Minimize size={17} /> : <Maximize size={17} />}
      </button>

      {/* Side dots */}
      <nav className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-2.5" aria-label="Pages">
        {deck.nav.map((n) => {
          const on = n.id === active;
          return (
            <button key={n.id} onClick={() => goTo(n.id)} className="group relative flex items-center justify-end cursor-pointer" aria-label={n.label}>
              <span className="absolute right-6 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold text-ink shadow-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
                {n.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  on ? "w-2.5 h-7 bg-coral" : "w-2.5 h-2.5 bg-white border border-ink/20 group-hover:bg-coral-soft"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Prev / next */}
      <div className="fixed bottom-5 right-4 lg:right-6 z-40 flex flex-col gap-2">
        <button
          onClick={() => step(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous page"
          className="w-10 h-10 rounded-full bg-white/85 border border-line text-ink shadow-md flex items-center justify-center hover:bg-coral hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={() => step(1)}
          disabled={activeIndex === ids.length - 1}
          aria-label="Next page"
          className="w-10 h-10 rounded-full bg-coral text-white shadow-md flex items-center justify-center hover:bg-coral-deep transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </>
  );
}

function toggleFull() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else document.documentElement.requestFullscreen().catch(() => {});
}
