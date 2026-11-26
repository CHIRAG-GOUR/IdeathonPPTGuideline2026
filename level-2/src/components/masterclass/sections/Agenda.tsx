"use client";

import { motion } from "framer-motion";
import { Flag, Lightbulb, Box, Palette, Mic, Ticket, ArrowRight } from "lucide-react";
import { deck } from "@/content/masterclass";
import { Section, Card, Reveal, Label } from "../ui";

const icons: Record<string, typeof Flag> = { hook: Flag, think: Lightbulb, build: Box, brand: Palette, pitch: Mic, wrap: Ticket };
// Soft tints along the day, all light.
const tints = ["#ffe3ea", "#e5e3ff", "#d9efff", "#dcf6ee", "#ffe9d6", "#f6e1f7"];

export default function Agenda() {
  const d = deck.agenda;
  const total = d.blocks.reduce((s, b) => s + b.minutes, 0);

  return (
    <Section id="agenda" eyebrow={d.eyebrow} title={d.title} notes={d.notes}>
      <Reveal delay={0.1}>
        <p className="text-[17px] sm:text-[19px] font-semibold text-ink-soft -mt-4 mb-8">{d.lead}</p>
      </Reveal>

      {/* Time bar: widths are proportional to minutes */}
      <Reveal delay={0.15}>
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <Label>The 2-hour route</Label>
            <span className="font-mono text-[12px] font-bold text-ink">{total} min</span>
          </div>
          <div className="flex h-12 rounded-2xl overflow-hidden bg-ink/5">
            {d.blocks.map((b, i) => (
              <motion.div
                key={b.key}
                initial={{ width: 0 }}
                whileInView={{ width: `${(b.minutes / total) * 100}%` }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full flex items-center justify-center border-r-2 border-white last:border-r-0 overflow-hidden"
                style={{ background: tints[i] }}
              >
                <span className="font-display text-[11px] sm:text-[12px] font-semibold uppercase text-ink whitespace-nowrap px-1">
                  {b.minutes >= 15 ? `${b.label} · ${b.minutes}m` : b.minutes}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </Reveal>

      {/* Block cards */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {d.blocks.map((b, i) => {
          const Icon = icons[b.key];
          return (
            <Reveal key={b.key} delay={0.25 + i * 0.08}>
              <button
                onClick={() => document.getElementById(b.target)?.scrollIntoView({ behavior: "smooth" })}
                className="group text-left w-full h-full cursor-pointer"
              >
                <Card className="h-full p-4 transition-transform group-hover:-translate-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-ink" style={{ background: tints[i] }}>
                      <Icon size={19} />
                    </span>
                    <span className="font-mono text-[13px] font-bold text-coral">{b.minutes} min</span>
                  </div>
                  <p className="mt-4 font-display text-[16px] font-extrabold uppercase text-ink">{b.label}</p>
                  <p className="mt-1.5 text-[13.5px] leading-snug font-medium text-ink-soft">
                    <span className="font-semibold text-ink">You leave with: </span>
                    {b.output}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-coral opacity-0 group-hover:opacity-100 transition-opacity">
                    Go <ArrowRight size={13} />
                  </span>
                </Card>
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
