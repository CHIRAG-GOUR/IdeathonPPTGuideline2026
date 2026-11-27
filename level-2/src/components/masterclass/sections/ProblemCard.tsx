"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ClipboardList } from "lucide-react";
import { deck } from "@/content/masterclass";
import { ClipboardTick } from "../Illustrations";
import { Section, Card, Reveal, Label } from "../ui";
import ImageSlot from "../ImageSlot";

/** A live Problem Card: the mentor can fill it in on screen with a team's answers. */
export default function ProblemCard() {
  const d = deck.problemCard;
  const [values, setValues] = useState<string[]>(d.fields.map(() => ""));
  const filled = values.filter((v) => v.trim()).length;

  return (
    <Section id="problem-card" eyebrow={d.eyebrow} title={d.title} notes={d.notes} art={<ClipboardTick />}>
      <Reveal delay={0.1}>
        <p className="text-[17px] sm:text-[19px] font-semibold text-ink-soft -mt-4 mb-7">{d.lead}</p>
      </Reveal>

      <div className="grid lg:grid-cols-[1.65fr_1fr] gap-5 items-stretch">
      <Reveal delay={0.15}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-coral text-white flex items-center justify-center">
                <ClipboardList size={19} />
              </span>
              <div>
                <p className="font-display text-[16px] font-extrabold uppercase text-ink leading-none">Problem Card</p>
                <p className="font-mono text-[11px] text-ink-soft mt-1">Type a team&apos;s answers live</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {d.fields.map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ backgroundColor: values[i].trim() ? "#f0547a" : "rgba(38,36,92,0.12)" }}
                    className="w-6 h-1.5 rounded-full"
                  />
                ))}
              </div>
              <span className="font-mono text-[12px] font-bold text-ink">{filled}/5</span>
              {filled > 0 && (
                <button
                  onClick={() => setValues(d.fields.map(() => ""))}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-soft hover:text-coral cursor-pointer"
                >
                  <RotateCcw size={13} /> Clear
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-3">
            {d.fields.map((f, i) => {
              const isSuccess = i === d.fields.length - 1;
              return (
                <motion.label
                  key={f.q}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className={`grid sm:grid-cols-[210px_1fr] gap-2 sm:gap-4 items-center rounded-2xl px-4 py-3 border ${
                    isSuccess ? "bg-coral-soft/60 border-coral/30" : "bg-white/70 border-line"
                  }`}
                >
                  <span>
                    <span className="block font-display text-[13.5px] font-extrabold uppercase text-ink">{f.q}</span>
                    <span className="block text-[13px] font-medium text-ink-soft">{f.hint}</span>
                  </span>
                  <input
                    value={values[i]}
                    onChange={(e) => setValues((v) => v.map((x, j) => (j === i ? e.target.value : x)))}
                    placeholder={`e.g. ${f.placeholder}`}
                    className="w-full bg-transparent border-b-2 border-dashed border-ink/15 focus:border-coral outline-none py-1.5 text-[16px] font-semibold text-ink placeholder:text-ink/30 placeholder:font-medium"
                  />
                </motion.label>
              );
            })}
          </div>
          <Label className="mt-4 !normal-case !tracking-normal !text-[12.5px]">
            Not allowed in the Who box: &ldquo;everyone&rdquo; or &ldquo;society&rdquo;.
          </Label>
        </Card>
      </Reveal>
      <Reveal delay={0.3} className="hidden lg:block">
        <ImageSlot src={deck.think.image.src} label={deck.think.image.label} className="w-full h-full min-h-[300px]" />
      </Reveal>
      </div>
    </Section>
  );
}
