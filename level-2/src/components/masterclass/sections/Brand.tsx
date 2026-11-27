"use client";

import { motion } from "framer-motion";
import { Quote, CheckCircle2 } from "lucide-react";
import { deck } from "@/content/masterclass";
import { Section, Card, Reveal, Label } from "../ui";
import ToolPlayer from "../ToolPlayer";
import ImageSlot from "../ImageSlot";
import { SwatchFan } from "../Illustrations";
import { brandTools } from "@/content/tools";

/** Positioning statement with [blanks] drawn as fill-in slots. */
function Positioning({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  let blank = 0;
  return (
    <p className="font-display text-[clamp(17px,2vw,24px)] font-semibold leading-[1.6] text-ink">
      {parts.map((p, i) => {
        if (!p.startsWith("[")) return <span key={i}>{p}</span>;
        const n = blank++;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ delay: 0.3 + n * 0.12 }}
            className="inline-block mx-0.5 rounded-lg bg-coral-soft px-2 text-coral-deep border-b-2 border-dashed border-coral"
          >
            {p.slice(1, -1)}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function Brand() {
  const d = deck.brand;
  return (
    <Section id="brand" eyebrow={d.eyebrow} title={d.title} notes={d.notes} art={<SwatchFan />}>
      <Reveal delay={0.1}>
        <Card className="p-6 sm:p-8">
          <Label className="flex items-center gap-2">
            <Quote size={14} className="text-coral" /> {d.sayLabel}
          </Label>
          <div className="mt-3">
            <Positioning text={d.positioning} />
          </div>
        </Card>
      </Reveal>

      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-[0.8fr_0.8fr_1.25fr] gap-4">
        <Reveal delay={0.2}>
          <Card className="h-full p-5">
            <Label>Rules</Label>
            <ul className="mt-3 space-y-2.5">
              {d.rules.map((r) => (
                <li key={r} className="flex gap-2.5 text-[15px] font-semibold text-ink leading-snug">
                  <CheckCircle2 size={18} className="text-coral shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-1.5">
              {d.aida.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex-1 rounded-2xl bg-[#e5e3ff] py-2.5 text-center"
                >
                  <span className="block font-display text-[22px] font-extrabold text-ink leading-none">{a.k}</span>
                  <span className="block mt-1 text-[10.5px] font-bold uppercase tracking-wide text-ink-soft">{a.w}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.3}>
          <Card className="h-full p-5">
            <Label>Make the kit</Label>
            <ImageSlot src={d.image.src} label={d.image.label} className="mt-3 w-full h-20" rounded="rounded-2xl" />
            <ul className="mt-2.5 space-y-1.5">
              {d.kit.map((k, i) => (
                <li key={k.item} className="flex items-center gap-3 rounded-2xl bg-white/80 border border-line px-3 py-2.5">
                  <span className="w-7 h-7 rounded-full bg-coral text-white font-mono text-[12px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold text-ink leading-tight">{k.item}</span>
                    {k.tool && <span className="block text-[12.5px] font-medium text-ink-soft">{k.tool}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.4} className="md:col-span-2 lg:col-span-1">
          <ToolPlayer tools={brandTools} label="Brand-kit tools" />
        </Reveal>
      </div>
    </Section>
  );
}
