"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Radar, Cpu, Lightbulb, BatteryCharging } from "lucide-react";
import { deck } from "@/content/masterclass";
import { circuitTools } from "@/content/tools";
import { Section, Card, Reveal, Label } from "../ui";
import ToolPlayer from "../ToolPlayer";
import ImageSlot from "../ImageSlot";
import { ChipPulse } from "../Illustrations";

const nodeIcons = [Radar, Cpu, Lightbulb];

/** Sensor → Brain → Output, with Power feeding the brain. Current "flows" along the wires. */
function BlockDiagram() {
  const d = deck.circuit;
  return (
    <div className="relative">
      <svg viewBox="0 0 600 190" className="w-full h-auto" aria-hidden>
        {["M150 60 H225", "M375 60 H450", "M300 150 V100"].map((p) => (
          <g key={p}>
            <path d={p} stroke="#26245c" strokeOpacity="0.15" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d={p} stroke="#f0547a" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round" style={{ animation: "mc-dash 0.8s linear infinite" }} />
          </g>
        ))}
      </svg>
      {d.diagram.map((n, i) => {
        const Icon = nodeIcons[i];
        const left = ["0%", "37.5%", "75%"][i];
        return (
          <motion.div
            key={n.key}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ delay: 0.2 + i * 0.15, type: "spring", bounce: 0.4 }}
            className="absolute top-[5%] w-[25%] h-[53%] rounded-2xl bg-white border border-line shadow-md flex flex-col items-center justify-center text-center"
            style={{ left }}
          >
            <motion.span animate={i === 1 ? { scale: [1, 1.15, 1] } : {}} transition={{ repeat: Infinity, duration: 1.4 }}>
              <Icon size={20} className={i === 1 ? "text-coral" : "text-ink"} />
            </motion.span>
            <span className="font-display text-[12px] sm:text-[13px] font-extrabold uppercase text-ink mt-1">{n.label}</span>
            <span className="text-[10.5px] sm:text-[11.5px] font-medium text-ink-soft leading-tight px-1">{n.eg}</span>
          </motion.div>
        );
      })}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ delay: 0.7 }}
        className="absolute left-[37.5%] w-[25%] top-[79%] h-[21%] rounded-xl bg-coral-soft border border-coral/30 flex items-center justify-center gap-1.5"
      >
        <BatteryCharging size={16} className="text-coral-deep" />
        <span className="font-display text-[11px] sm:text-[12px] font-extrabold uppercase text-ink">{d.power}</span>
      </motion.div>
    </div>
  );
}

export default function BuildCircuit() {
  const d = deck.circuit;
  return (
    <Section id="build-circuit" eyebrow={d.eyebrow} title={d.title} notes={d.notes} art={<ChipPulse />}>
      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-4">
        <div className="flex flex-col gap-4">
          <Reveal delay={0.1}>
            <Card className="p-5">
              <Label>Block diagram</Label>
              <div className="mt-3">
                <BlockDiagram />
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.2}>
            <Card className="p-5">
              <Label>Workflow</Label>
              <ol className="mt-2.5 grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
                {d.workflow.map((s, i) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-coral text-white font-mono text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[14px] font-semibold text-ink leading-snug">{s}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
          <Reveal delay={0.3}>
            <ImageSlot src={d.image.src} label={d.image.label} className="w-full h-[150px]" />
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          <Reveal delay={0.15}>
            <ToolPlayer tools={circuitTools} label="Free circuit tools" />
          </Reveal>
          <Reveal delay={0.3}>
            <div className="rounded-3xl bg-coral-soft/80 border border-coral/30 px-5 py-3">
              <p className="flex items-center gap-2 font-display text-[12.5px] font-extrabold uppercase text-coral-deep">
                <ShieldAlert size={16} /> Safety first
              </p>
              <ul className="mt-1.5 grid gap-1">
                {d.safety.map((s) => (
                  <li key={s} className="text-[13.5px] font-semibold text-ink leading-snug flex gap-2">
                    <span className="text-coral">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
