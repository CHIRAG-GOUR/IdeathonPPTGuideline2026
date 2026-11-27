"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";
import "./masterclass.css";
import { display, sans } from "./fonts";
import { ScrollerCtx, type Pager } from "./Scroll";
import { NotesProvider } from "./Notes";
import SkyBackdrop from "./SkyBackdrop";
import Chrome from "./Chrome";
import Hero from "./sections/Hero";
import Agenda from "./sections/Agenda";
import Think from "./sections/Think";
import ProblemCard from "./sections/ProblemCard";
import Build3D from "./sections/Build3D";
import BuildCircuit from "./sections/BuildCircuit";
import Brand from "./sections/Brand";
import Money from "./sections/Money";
import Pitch from "./sections/Pitch";
import ResponsibleAI from "./sections/ResponsibleAI";
import ExitTicket from "./sections/ExitTicket";

const EASE = [0.65, 0, 0.35, 1] as const; // smooth in-out glide

/**
 * The whole AI Masterclass deck. Drop <Deck /> on any page.
 * `homeHref` adds a "back" link in the top bar (e.g. to the Level 2 start screen).
 */
export default function Deck({ homeHref }: { homeHref?: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const animating = useRef(false);
  const animEnd = useRef(0);

  const sections = () => Array.from(scroller.current?.querySelectorAll<HTMLElement>("[data-section]") ?? []);

  const currentIndex = useCallback(() => {
    const el = scroller.current;
    if (!el) return 0;
    const probe = el.scrollTop + el.clientHeight * 0.4;
    let idx = 0;
    sections().forEach((s, k) => {
      if (s.offsetTop <= probe) idx = k;
    });
    return idx;
  }, []);

  const glideTo = useCallback((target: number) => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const to = Math.max(0, Math.min(max, target));
    const dist = Math.abs(to - el.scrollTop);
    if (dist < 2) return;
    anim.current?.stop();
    animating.current = true;
    anim.current = animate(el.scrollTop, to, {
      duration: Math.min(1.15, 0.55 + dist / 2600),
      ease: EASE,
      onUpdate: (v) => {
        el.scrollTop = v;
      },
      onComplete: () => {
        animating.current = false;
        animEnd.current = performance.now();
      },
    });
  }, []);

  const goTo = useCallback(
    (id: string) => {
      const s = scroller.current?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (s) glideTo(s.offsetTop);
    },
    [glideTo]
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      const list = sections();
      const el = scroller.current;
      if (!el || !list.length) return;
      const i = currentIndex();
      const cur = list[i];
      // Inside a page taller than the screen: move by most of a screen first.
      if (dir > 0 && el.scrollTop + el.clientHeight < cur.offsetTop + cur.offsetHeight - 8) {
        return glideTo(Math.min(el.scrollTop + el.clientHeight * 0.85, cur.offsetTop + cur.offsetHeight - el.clientHeight));
      }
      if (dir < 0 && el.scrollTop > cur.offsetTop + 8) {
        return glideTo(Math.max(cur.offsetTop, el.scrollTop - el.clientHeight * 0.85));
      }
      const next = list[Math.max(0, Math.min(list.length - 1, i + dir))];
      glideTo(dir < 0 && next.offsetHeight > el.clientHeight ? next.offsetTop + next.offsetHeight - el.clientHeight : next.offsetTop);
    },
    [currentIndex, glideTo]
  );

  // Wheel → one page per gesture on laptop/desktop. Phones/tablets keep native touch scrolling.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)");
    let lastWheel = 0;

    const onWheel = (e: WheelEvent) => {
      if (!fine.matches || e.ctrlKey) return; // ctrl+wheel = browser zoom
      if ((e.target as HTMLElement).closest("iframe, [data-native-scroll]")) return;
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      e.preventDefault();
      if (animating.current) return;
      if (Math.abs(e.deltaY) < 4) return;
      // Ignore trackpad momentum: only a fresh gesture (or one well after the last glide) pages.
      if (gap < 120 && now - animEnd.current < 650) return;
      step(e.deltaY > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [step]);

  // Keep the current page aligned when the window is resized.
  useEffect(() => {
    const onResize = () => {
      const s = sections()[currentIndex()];
      if (s && scroller.current && !animating.current) scroller.current.scrollTop = s.offsetTop;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [currentIndex]);

  const pager = useMemo<Pager>(() => ({ ref: scroller, goTo, step }), [goTo, step]);

  return (
    <ScrollerCtx.Provider value={pager}>
      <NotesProvider>
        <div className={`mc-root ${display.variable} ${sans.variable}`}>
          <SkyBackdrop />
          <Chrome homeHref={homeHref} />
          <div ref={scroller} className="mc-scroller fixed inset-0 overflow-y-auto overflow-x-hidden z-10">
            <main>
              <Hero />
              <Agenda />
              <Think />
              <ProblemCard />
              <Build3D />
              <BuildCircuit />
              <Brand />
              <Money />
              <Pitch />
              <ResponsibleAI />
              <ExitTicket />
            </main>
          </div>
        </div>
      </NotesProvider>
    </ScrollerCtx.Provider>
  );
}
