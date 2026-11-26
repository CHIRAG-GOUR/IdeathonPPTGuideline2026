"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Package, Ticket, ArrowUp } from "lucide-react";
import { deck } from "@/content/masterclass";
import { Section, Card, Reveal, Label } from "../ui";
import ImageSlot from "../ImageSlot";

export default function ExitTicket() {
  const d = deck.exit;
  const [done, setDone] = useState<boolean[]>(d.handIn.map(() => false));
  const count = done.filter(Boolean).length;

  return (
    <Section id="exit" eyebrow={d.eyebrow} title={d.title} notes={d.notes}>
      <div className="grid lg:grid-cols-[1fr_1fr_0.85fr] gap-4">
        {/* Hand-in checklist */}
        <Reveal delay={0.1}>
          <Card className="h-full p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Package size={14} className="text-coral" /> {d.handInLabel}
              </Label>
              <span className="font-mono text-[12px] font-bold text-ink">
                {count}/{d.handIn.length}
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {d.handIn.map((h, i) => (
                <li key={h}>
                  <button
                    onClick={() => setDone((v) => v.map((x, j) => (j === i ? !x : x)))}
                    className={`w-full flex items-center gap-3 rounded-2xl px-3.5 py-2.5 border text-left transition-colors cursor-pointer ${
                      done[i] ? "bg-coral-soft/70 border-coral/30" : "bg-white/80 border-line hover:border-coral/40"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center border-2 transition-colors ${
                        done[i] ? "bg-coral border-coral text-white" : "border-ink/20"
                      }`}
                    >
                      {done[i] && <Check size={14} strokeWidth={3} />}
                    </span>
                    <span className={`text-[15px] font-semibold ${done[i] ? "text-ink-soft line-through" : "text-ink"}`}>{h}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        {/* Exit ticket: styled as a tear-off ticket */}
        <Reveal delay={0.2}>
          <div className="relative h-full rounded-3xl bg-white/85 backdrop-blur border border-white shadow-[0_24px_60px_-30px_rgba(60,50,160,0.45)] p-5 sm:p-6">
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#eef0ff]" />
            <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#eef0ff]" />
            <Label className="flex items-center gap-2">
              <Ticket size={14} className="text-coral" /> {d.ticketLabel}
            </Label>
            <ol className="mt-4 space-y-4">
              {d.ticket.map((t, i) => (
                <li key={t}>
                  <p className="text-[15.5px] font-bold text-ink">
                    <span className="font-mono text-coral mr-2">{i + 1}.</span>
                    {t}
                  </p>
                  <div className="mt-2 h-px border-b-2 border-dashed border-ink/15" />
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="min-h-[240px]">
          <ImageSlot src={d.image.src} label={d.image.label} className="w-full h-full min-h-[240px]" />
        </Reveal>
      </div>

      {/* Closing line */}
      <Reveal delay={0.4}>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <motion.p
            initial={{ letterSpacing: "0.08em", opacity: 0 }}
            whileInView={{ letterSpacing: "-0.01em", opacity: 1 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(20px,2.6vw,34px)] font-extrabold uppercase text-ink leading-tight max-w-3xl"
          >
            {d.closing}
          </motion.p>
          <button
            onClick={() => document.getElementById("start")?.scrollIntoView({ behavior: "smooth" })}
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-coral px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.15em] text-white hover:bg-coral-deep transition-colors cursor-pointer shrink-0"
          >
            Back to start <ArrowUp size={15} />
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
