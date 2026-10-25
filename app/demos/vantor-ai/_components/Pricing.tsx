"use client";

import { useEffect, useRef, useState } from "react";

const PLANS = [
  { name: "Starter", monthly: 0, yearly: 0, blurb: "For trying Vantor on one workflow.", features: ["1 agent", "500 tasks / month", "5 integrations", "Community support"] },
  { name: "Team", monthly: 49, yearly: 39, blurb: "For teams putting agents to work daily.", features: ["Unlimited agents", "25,000 tasks / month", "All integrations", "Approval steps", "Priority support"], featured: true },
  { name: "Scale", monthly: 199, yearly: 159, blurb: "For companies running agents everywhere.", features: ["Everything in Team", "Unlimited tasks", "Single sign-on", "Audit log export", "Dedicated engineer"] },
];

/** Tweens from the old number to the new one whenever the value changes. */
function AnimatedNumber({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    if (start === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      setShown(value);
      return;
    }
    const began = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / 450);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(start + (value - start) * eased);
      from.current = next;
      setShown(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className="tabular-nums">{shown}</span>;
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      <div className="flex justify-center">
        <div className="v-panel flex items-center gap-1 rounded-full p-1 text-sm font-semibold" role="radiogroup" aria-label="Billing period">
          {[
            { label: "Monthly", value: false },
            { label: "Yearly", value: true },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              role="radio"
              aria-checked={yearly === opt.value}
              onClick={() => setYearly(opt.value)}
              className={`rounded-full px-4 py-1.5 transition-colors ${yearly === opt.value ? "v-button text-white" : "text-[var(--v-muted)]"}`}
            >
              {opt.label}
              {opt.value && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    yearly ? "bg-white text-emerald-700" : "bg-emerald-500 text-white"
                  }`}
                >
                  −20%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`v-panel relative flex flex-col rounded-3xl p-6 ${plan.featured ? "shadow-[0_0_0_1px_var(--v-accent),0_30px_80px_-30px_var(--v-glow-a)]" : ""}`}
          >
            {plan.featured && (
              <span className="v-button absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <p className="mt-1 text-sm text-[var(--v-muted)]">{plan.blurb}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">
                $<AnimatedNumber value={yearly ? plan.yearly : plan.monthly} />
              </span>
              <span className="text-sm text-[var(--v-muted)]">/ user / month</span>
            </p>
            <p className="v-mono mt-1 h-4 text-[11px] text-[var(--v-muted)]">
              {plan.monthly > 0 && (yearly ? `Billed $${plan.yearly * 12} yearly` : "Billed monthly")}
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-[var(--v-accent-2)]">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className={`mt-8 rounded-xl px-4 py-2.5 text-center text-sm font-semibold ${plan.featured ? "v-button text-white" : "border border-[var(--v-line)] hover:border-[var(--v-accent)]"}`}
            >
              {plan.monthly === 0 ? "Start free" : "Join the waitlist"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
