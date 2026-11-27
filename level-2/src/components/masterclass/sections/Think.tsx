"use client";

import { HelpCircle, UserRound, MessagesSquare, Target, Wand2 } from "lucide-react";
import { deck } from "@/content/masterclass";
import { thinkTools } from "@/content/tools";
import { Section, Card, Reveal, Label, CopyButton } from "../ui";
import ToolPlayer from "../ToolPlayer";
import { RootWhy } from "../Illustrations";

const icons = [HelpCircle, UserRound, MessagesSquare, Target];

/** Renders [placeholders] inside the prompt as coral fill-in blanks. */
function PromptText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        part.startsWith("[") ? (
          <span key={i} className="rounded-md bg-coral-soft px-1.5 text-coral-deep font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function Think() {
  const d = deck.think;
  return (
    <Section id="think" eyebrow={d.eyebrow} title={d.title} notes={d.notes} art={<RootWhy />}>
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {d.concepts.map((c, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={c.title} delay={0.1 + i * 0.08}>
                  <Card className="h-full p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-2xl bg-[#e5e3ff] text-ink flex items-center justify-center">
                        <Icon size={19} />
                      </span>
                      <span className="font-mono text-[12px] font-bold text-coral">0{i + 1}</span>
                    </div>
                    <p className="mt-3 font-display text-[16px] font-extrabold uppercase text-ink">{c.title}</p>
                    <p className="mt-1 text-[14.5px] font-medium text-ink-soft leading-snug">{c.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.4}>
            <Card className="p-5 border-coral/30">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Label className="!text-coral-deep flex items-center gap-2">
                  <Wand2 size={14} /> {d.promptLabel}
                </Label>
                <CopyButton text={d.prompt} />
              </div>
              <p className="mt-3 font-mono text-[14px] sm:text-[15px] leading-relaxed text-ink">
                &ldquo;<PromptText text={d.prompt} />&rdquo;
              </p>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <ToolPlayer tools={thinkTools} label="AI tools (free tiers)" />
        </Reveal>
      </div>
    </Section>
  );
}
