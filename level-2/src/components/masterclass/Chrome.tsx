"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Maximize, Minimize, NotebookPen, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { deck } from "@/content/masterclass";
import { useNotes } from "./Notes";
import { useScroller } from "./Scroll";

const ids = deck.nav.map((n) => n.id);

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Top bar, progress line, side dots, prev/next buttons and keyboard paging. */
export default function Chrome({ homeHref }: { homeHref?: string }) {
  const [active, setActive] = useState(ids[0]);
  const [full, setFull] = useState(false);
  const { show, toggle } = useNotes();
  const scroller = useScroller();
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

  const step = useCallback(
    (dir: 1 | -1) => {
      const i = ids.indexOf(active);
      const next = ids[Math.min(ids.length - 1, Math.max(0, i + dir))];
      goTo(next);
    },
    [active]
  );

  // Keyboard: arrows / PageUp / PageDown / Space / Home / End, N for notes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable=true], select")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Let Space press a focused button/link instead of paging.
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
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, toggle]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  const onHero = active === ids[0];
  const activeIndex = ids.indexOf(active);

  return (
    <>
      {/* Progress line */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-coral origin-left z-50" style={{ scaleX: progress }} />

      {/* Top bar */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          onHero ? "py-5" : "py-3 bg-white/55 backdrop-blur-lg border-b border-white/70 shadow-[0_8px_30px_-20px_rgba(60,50,160,0.5)]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
          {homeHref && (
            <a
              href={homeHref}
              title="Back to Level 2"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                onHero ? "bg-white/20 text-white border-white/40 hover:bg-white/30" : "bg-white text-ink border-line hover:border-coral"
              }`}
            >
              <ArrowLeft size={16} />
            </a>
          )}
          <button onClick={() => goTo(ids[0])} className="flex items-center gap-2.5 cursor-pointer" aria-label="Back to start">
            <span className="relative w-8 h-8 rounded-full bg-coral overflow-hidden shadow-md">
              <span className="absolute -right-2 top-2 w-5 h-5 rounded-full bg-white/90" />
            </span>
            <span className="text-left leading-none">
              <span className={`block font-display font-extrabold text-[13px] tracking-wide ${onHero ? "text-white" : "text-ink"}`}>
                {deck.meta.brand}
              </span>
              <span className={`block font-mono text-[10px] tracking-[0.2em] uppercase ${onHero ? "text-white/85" : "text-ink-soft"}`}>
                {deck.meta.product}
              </span>
            </span>
          </button>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {deck.topLinks.map((l) => {
              const isOn =
                active === l.id ||
                (l.id === "build-3d" && active === "build-circuit") ||
                (l.id === "think" && active === "problem-card") ||
                (l.id === "money" && active === "pitch");
              return (
                <button
                  key={l.id}
                  onClick={() => goTo(l.id)}
                  className={`relative text-[14px] font-semibold cursor-pointer transition-colors ${
                    onHero ? "text-white/90 hover:text-white" : isOn ? "text-coral" : "text-ink hover:text-coral"
                  }`}
                >
                  {l.label}
                  <span className="font-mono">_</span>
                  {isOn && !onHero && (
                    <motion.span layoutId="navline" className="absolute -bottom-1.5 left-0 right-2 h-[2px] rounded bg-coral" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              title="Mentor notes (N)"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold border cursor-pointer transition-colors ${
                show
                  ? "bg-coral text-white border-coral"
                  : onHero
                  ? "bg-white/20 text-white border-white/40 hover:bg-white/30"
                  : "bg-white text-ink border-line hover:border-coral"
              }`}
            >
              <NotebookPen size={15} />
              <span className="hidden sm:inline">Notes</span>
            </button>
            <button
              onClick={toggleFull}
              title="Fullscreen"
              className={`w-9 h-9 rounded-full flex items-center justify-center border cursor-pointer transition-colors ${
                onHero ? "bg-white/20 text-white border-white/40 hover:bg-white/30" : "bg-white text-ink border-line hover:border-coral"
              }`}
            >
              {full ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>
      </header>

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
          className="w-10 h-10 rounded-full bg-white/85 backdrop-blur border border-line text-ink shadow-md flex items-center justify-center hover:bg-coral hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
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
