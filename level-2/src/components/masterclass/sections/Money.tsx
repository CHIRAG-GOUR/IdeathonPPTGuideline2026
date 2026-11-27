"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Scale, HelpCircle, RotateCcw } from "lucide-react";
import { deck } from "@/content/masterclass";
import { CoinStack } from "../Illustrations";
import { Section, Card, Reveal, Label } from "../ui";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between text-[13.5px] font-semibold text-ink-soft">
        {label}
        <span className="font-mono font-bold text-ink">{inr(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mc-range mt-2 w-full cursor-pointer"
        style={{ "--p": `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties}
      />
    </label>
  );
}

/** Live calculators: start on the deck's worked examples, then a team can try its own numbers. */
export default function Money() {
  const d = deck.money;
  const [cost, setCost] = useState(d.margin.cost);
  const [price, setPrice] = useState(d.margin.price);
  const [fixed, setFixed] = useState(d.breakEven.fixed);
  const [profit, setProfit] = useState(d.breakEven.profit);

  const margin = price > 0 ? ((price - cost) / price) * 100 : 0;
  const units = profit > 0 ? Math.ceil(fixed / profit) : 0;
  const changed =
    cost !== d.margin.cost || price !== d.margin.price || fixed !== d.breakEven.fixed || profit !== d.breakEven.profit;

  const reset = () => {
    setCost(d.margin.cost);
    setPrice(d.margin.price);
    setFixed(d.breakEven.fixed);
    setProfit(d.breakEven.profit);
  };

  return (
    <Section id="money" eyebrow={d.eyebrow} title={d.title} notes={d.notes} art={<CoinStack />}>
      <div className="grid lg:grid-cols-[1fr_1fr_0.95fr] gap-4">
        {/* Margin */}
        <Reveal delay={0.1}>
          <Card className="h-full p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#e5e3ff] flex items-center justify-center text-ink">
                <Percent size={17} />
              </span>
              <p className="font-mono text-[13px] font-bold text-ink">{d.margin.formula}</p>
            </div>
            <div className="mt-5 space-y-4">
              <Slider label="Cost per unit" value={cost} min={50} max={2000} step={10} onChange={setCost} />
              <Slider label="Selling price" value={price} min={50} max={3000} step={10} onChange={setPrice} />
            </div>
            <div className="mt-5 rounded-2xl bg-white/80 border border-line p-4">
              <p className="font-mono text-[13px] text-ink-soft">
                ({inr(price)} − {inr(cost)}) ÷ {inr(price)}
              </p>
              <motion.p
                key={Math.round(margin)}
                initial={{ scale: 0.9, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`font-display text-[40px] font-extrabold leading-none mt-1 ${margin < 0 ? "text-coral-deep" : "text-ink"}`}
              >
                {margin.toFixed(0)}%
              </motion.p>
              <p className="text-[13px] font-semibold text-ink-soft mt-1">
                margin · profit {inr(price - cost)} per unit
              </p>
            </div>
          </Card>
        </Reveal>

        {/* Break-even */}
        <Reveal delay={0.2}>
          <Card className="h-full p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#dcf6ee] flex items-center justify-center text-ink">
                <Scale size={17} />
              </span>
              <p className="font-mono text-[13px] font-bold text-ink">{d.breakEven.formula}</p>
            </div>
            <div className="mt-5 space-y-4">
              <Slider label="Fixed cost" value={fixed} min={1000} max={100000} step={1000} onChange={setFixed} />
              <Slider label="Profit per unit" value={profit} min={10} max={1500} step={10} onChange={setProfit} />
            </div>
            <div className="mt-5 rounded-2xl bg-white/80 border border-line p-4">
              <p className="font-mono text-[13px] text-ink-soft">
                {inr(fixed)} ÷ {inr(profit)}
              </p>
              <motion.p
                key={units}
                initial={{ scale: 0.9, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-[40px] font-extrabold leading-none mt-1 text-ink"
              >
                {units.toLocaleString("en-IN")}
              </motion.p>
              <p className="text-[13px] font-semibold text-ink-soft mt-1">units to break even</p>
            </div>
          </Card>
        </Reveal>

        {/* Questions */}
        <Reveal delay={0.3}>
          <Card className="h-full p-5 sm:p-6">
            <Label className="flex items-center gap-2">
              <HelpCircle size={14} className="text-coral" /> {d.readyLabel}
            </Label>
            <ul className="mt-3 space-y-2.5">
              {d.questions.map((q, i) => (
                <li key={q} className="flex gap-3 rounded-2xl bg-white/80 border border-line px-3.5 py-3">
                  <span className="font-mono text-[12px] font-bold text-coral mt-0.5">Q{i + 1}</span>
                  <span className="text-[14.5px] font-semibold text-ink leading-snug">{q}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>

      {changed && (
        <button
          onClick={reset}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft hover:text-coral cursor-pointer"
        >
          <RotateCcw size={13} /> Back to the worked examples (₹450 / ₹750 and ₹30,000 / ₹300)
        </button>
      )}
    </Section>
  );
}
