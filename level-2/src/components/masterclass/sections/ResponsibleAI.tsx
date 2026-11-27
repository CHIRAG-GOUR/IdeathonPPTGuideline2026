"use client";

import { motion } from "framer-motion";
import { SearchCheck, Tag, Hand, ShieldCheck, Copyright } from "lucide-react";
import { deck } from "@/content/masterclass";
import { ShieldTick } from "../Illustrations";
import { Section, Card } from "../ui";

const icons = [SearchCheck, Tag, Hand, ShieldCheck, Copyright];

export default function ResponsibleAI() {
  const d = deck.responsible;
  return (
    <Section id="responsible-ai" eyebrow={d.eyebrow} title={d.title} notes={d.notes} art={<ShieldTick />}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {d.rules.map((r, i) => {
          const Icon = icons[i];
          const own = i === 2; // "Own it" is the rule judges test
          return (
            <motion.div
              key={r.k}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", bounce: 0.35 }}
              whileHover={{ y: -6 }}
            >
              <Card className={`relative h-full p-5 overflow-hidden ${own ? "!bg-coral-soft/90 !border-coral/30" : ""}`}>
                <span className="absolute -right-2 -top-6 font-display text-[110px] font-extrabold text-ink/[0.05] leading-none select-none">
                  {i + 1}
                </span>
                <span className={`relative w-11 h-11 rounded-2xl flex items-center justify-center ${own ? "bg-coral text-white" : "bg-[#e5e3ff] text-ink"}`}>
                  <Icon size={21} />
                </span>
                <p className="relative mt-5 font-display text-[16px] font-extrabold uppercase text-ink leading-tight">{r.k}</p>
                <p className="relative mt-2 text-[14.5px] font-medium text-ink-soft leading-snug">{r.d}</p>
                {own && (
                  <p className="relative mt-3 font-mono text-[11px] font-bold uppercase tracking-wider text-coral-deep">
                    Judges will test this
                  </p>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
