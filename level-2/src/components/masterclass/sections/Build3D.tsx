"use client";

import { BadgeInfo, Lightbulb } from "lucide-react";
import { deck } from "@/content/masterclass";
import { build3dTools } from "@/content/tools";
import { Section, Card, Reveal, Label } from "../ui";
import ImageSlot from "../ImageSlot";
import ToolPlayer from "../ToolPlayer";
import { Cube3D } from "../Illustrations";

export default function Build3D() {
  const d = deck.build3d;
  return (
    <Section id="build-3d" eyebrow={d.eyebrow} title={d.title} notes={d.notes} art={<Cube3D />}>
      <div className="grid lg:grid-cols-[0.95fr_1.15fr] gap-5">
        {/* Left: workflow, 3 angles, credit */}
        <div className="flex flex-col gap-4">
          <Reveal delay={0.1}>
            <Card className="p-5">
              <Label>Workflow</Label>
              <ol className="mt-3 relative">
                <span className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-coral via-coral/40 to-transparent" />
                {d.workflow.map((s, i) => (
                  <li key={s} className="relative flex items-center gap-3 py-1">
                    <span className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-white border-2 border-coral text-coral font-mono text-[12px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[15px] font-semibold text-ink">{s}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-3">
              {d.angles.map((a) => (
                <div key={a.label} className="flex flex-col gap-1.5">
                  <ImageSlot src={a.src} label={`${a.label} view`} className="w-full aspect-[4/3]" rounded="rounded-2xl" />
                  <span className="text-center font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{a.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex gap-2.5 items-start rounded-2xl bg-white/85 border border-line px-4 py-3">
                <BadgeInfo size={18} className="text-coral shrink-0 mt-0.5" />
                <p className="text-[13px] leading-snug text-ink">
                  <span className="font-bold">Credit line: </span>&ldquo;{d.credit}&rdquo;
                </p>
              </div>
              <div className="flex gap-2.5 items-start rounded-2xl bg-white/85 border border-line px-4 py-3">
                <Lightbulb size={18} className="text-coral shrink-0 mt-0.5" />
                <p className="text-[13px] leading-snug text-ink">{d.tip}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: one video window for all the 3D tools */}
        <Reveal delay={0.2}>
          <ToolPlayer tools={build3dTools} label="Free 3D tools" />
        </Reveal>
      </div>
    </Section>
  );
}
