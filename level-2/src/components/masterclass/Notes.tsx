"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/** Mentor notes (the PowerPoint speaker notes). Hidden by default; toggle with the
 *  "Notes" button or the N key. */
const NotesCtx = createContext<{ show: boolean; toggle: () => void }>({ show: false, toggle: () => {} });

export function NotesProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  return <NotesCtx.Provider value={{ show, toggle: () => setShow((s) => !s) }}>{children}</NotesCtx.Provider>;
}

export const useNotes = () => useContext(NotesCtx);
