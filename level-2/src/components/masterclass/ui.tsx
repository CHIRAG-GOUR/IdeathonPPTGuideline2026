"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { Check, Copy, NotebookPen } from "lucide-react";
import { useNotes } from "./Notes";
import { deck } from "@/content/masterclass";

/* ── Reveal on scroll (re-plays each time a section comes back into view) ── */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── White glass card ── */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl bg-white/85 border border-white shadow-[0_24px_60px_-30px_rgba(60,50,160,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Small mono label ── */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft ${className}`}>
      {children}
    </p>
  );
}

/* ── One full-screen page of the deck ── */
export function Section({
  id,
  eyebrow,
  title,
  notes,
  art,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  notes?: string;
  art?: ReactNode;
  children: ReactNode;
}) {
  const index = deck.nav.findIndex((n) => n.id === id) + 1;
  const total = deck.nav.length;
  const { show } = useNotes();

  return (
    <section
      id={id}
      data-section
      className="relative snap-start min-h-[100svh] flex flex-col justify-center px-5 sm:px-8 lg:px-20 pt-20 pb-12 lg:pt-[76px] lg:pb-8"
    >
      <div className="w-full max-w-6xl mx-auto">
        {title && (
          <header className="mb-6 lg:mb-7 flex items-end justify-between gap-6">
            <div className="min-w-0">
            <Reveal y={16}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] font-bold text-coral tabular-nums">
                  {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-ink/20" />
                <Label>{eyebrow}</Label>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display font-extrabold uppercase text-ink text-[clamp(26px,3.4vw,46px)] leading-[1.05] tracking-tight max-w-4xl">
                {title}
              </h2>
            </Reveal>
            </div>
            {art && <div className="hidden md:block shrink-0 mr-8 lg:mr-10">{art}</div>}
          </header>
        )}
        {children}
      </div>

      {/* Mentor notes */}
      <AnimatePresence>
        {show && notes && (
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="absolute left-5 sm:left-8 lg:left-20 bottom-4 max-w-xl z-20"
          >
            <div className="flex gap-3 items-start rounded-2xl bg-coral-soft/95 border border-coral/30 px-4 py-3 shadow-lg">
              <NotebookPen size={18} className="text-coral-deep shrink-0 mt-0.5" />
              <p className="text-[14px] leading-snug text-ink">
                <span className="font-bold">Mentor note: </span>
                {notes}
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Copy-to-clipboard button for prompts ── */
export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          },
          () => {}
        );
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white text-[13px] font-semibold px-3.5 py-1.5 hover:bg-coral transition-colors cursor-pointer"
    >
      {done ? <Check size={14} /> : <Copy size={14} />}
      {done ? "Copied" : "Copy prompt"}
    </button>
  );
}

/* ── Tool chip with favicon ── */
export function ToolChip({ name, url }: { name: string; url?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white border border-line px-3 py-1.5 text-[13px] font-semibold text-ink shadow-sm">
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
          alt=""
          className="w-4 h-4 rounded"
        />
      )}
      {name}
    </span>
  );
}
