"use client";

import { createContext, useContext, RefObject } from "react";

/** The deck scrolls inside its own full-screen container (not the page body), so it
 *  works even inside a site that locks body scrolling. `goTo` / `step` glide
 *  between pages with an eased animation. */
export type Pager = {
  ref: RefObject<HTMLDivElement | null>;
  goTo: (id: string) => void;
  step: (dir: 1 | -1) => void;
};

export const ScrollerCtx = createContext<Pager | null>(null);

function usePagerCtx() {
  const ctx = useContext(ScrollerCtx);
  if (!ctx) throw new Error("Masterclass hooks must be used inside <Deck>");
  return ctx;
}

/** Ref to the scroll container (for framer-motion `useScroll({ container })`). */
export const useScroller = () => usePagerCtx().ref;
/** Page navigation: `goTo(sectionId)` and `step(+1 | -1)`. */
export const usePager = () => usePagerCtx();
