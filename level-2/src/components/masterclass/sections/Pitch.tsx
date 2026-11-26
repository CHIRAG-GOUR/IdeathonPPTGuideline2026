"use client";

import { motion } from "framer-motion";
import { Timer, ChevronRight } from "lucide-react";
import { deck } from "@/content/masterclass";
import { Section, Card, Reveal, Label } from "../ui";
import ImageSlot from "../ImageSlot";

const tints = ["#ffe3ea", "#e5e3ff", "#d9efff", "#dcf6ee", "#ffe9d6", "#f6e1f7"];

export default function Pitch() {
  const d = deck.pitch;
  const total = d.slides.reduce((s, x) => s + x.sec, 0);

  return (
    <Section id="pitch" eyebrow={d.eyebrow} title={d.title} notes={d.notes}>
      {/* 3-minute bar, proportional to seconds */}
      <Reveal delay={0.1}>
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <Label className="flex items-center gap-2">
              <Timer size={14} className="text-coral" /> Your 3 minutes
            </Label>
            <span className="font-mono text-[12px] font-bold text-ink">{total}s</span>
          </div>
          <div className="flex h-14 rounded-2xl overflow-hidden">
            {d.slides.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ width: 0 }}
                whileInView={{ width: `${(s.sec / total) * 100}%` }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full border-r-2 border-white last:border-r-0 flex flex-col items-center justify-center overflow-hidden"
                style={{ background: tints[i] }}
              >
                <span className="font-display text-[15px] font-extrabold text-ink leading-none">{s.n}</span>
                <span className="font-mono text-[11px] font-bold text-ink-soft">{s.sec}s</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </Reveal>

      <div className="mt-4 grid lg:grid-cols-[1.5fr_1fr] gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {d.slides.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.07}>
              <Card className="h-full p-4">
                <div className="flex items-center justify-between">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-[15px] font-extrabold text-ink"
                    style={{ background: tints[i] }}
                  >
                    {s.n}
                  </span>
                  <span className="font-mono text-[12px] font-bold text-coral">{s.sec}s</span>
                </div>
                <p className="mt-3 text-[15.5px] font-bold text-ink leading-snug">{s.title}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} className="min-h-[200px]">
          <ImageSlot src={d.image.src} label={d.image.label} className="w-full h-full min-h-[200px]" />
        </Reveal>
      </div>

      {/* 60-second chain */}
      <Reveal delay={0.45}>
        <div className="mt-4 rounded-3xl bg-white/60 backdrop-blur border border-white px-4 py-3.5 flex flex-wrap items-center gap-2">
          <Label className="mr-2">{d.sixtyLabel}</Label>
          {d.sixty.map((w, i) => (
            <span key={w} className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", bounce: 0.5 }}
                className={`rounded-full px-3.5 py-1.5 text-[14px] font-bold ${
                  i === d.sixty.length - 1 ? "bg-coral text-white" : "bg-white text-ink border border-line"
                }`}
              >
                {w}
              </motion.span>
              {i < d.sixty.length - 1 && <ChevronRight size={16} className="text-ink/30" />}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
