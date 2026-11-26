"use client";

import { createContext, useContext, RefObject } from "react";

/** The deck scrolls inside its own full-screen container (not the page body), so it
 *  works even inside a site that locks body scrolling. Hooks read this ref. */
export const ScrollerCtx = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useScroller() {
  const ref = useContext(ScrollerCtx);
  if (!ref) throw new Error("useScroller must be used inside <Deck>");
  return ref;
}
