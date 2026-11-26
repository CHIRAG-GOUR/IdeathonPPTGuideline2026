"use client";

import { useRef } from "react";
import "./masterclass.css";
import { display, sans } from "./fonts";
import { ScrollerCtx } from "./Scroll";
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

/**
 * The whole AI Masterclass deck. Drop <Deck /> on any page.
 * `homeHref` adds a "back" link in the top bar (e.g. to the Level 2 start screen).
 */
export default function Deck({ homeHref }: { homeHref?: string }) {
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <ScrollerCtx.Provider value={scroller}>
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
