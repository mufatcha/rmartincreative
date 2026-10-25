"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Read 42 new invoices from the shared inbox", ms: "1.2s" },
  { label: "Matched 39 to open purchase orders", ms: "0.8s" },
  { label: "Flagged 3 with price differences over 2%", ms: "0.4s" },
  { label: "Drafted follow-up emails to 3 vendors", ms: "2.1s" },
  { label: "Posted a summary to #finance", ms: "0.3s" },
];

/** The hero's "agent at work" card: steps tick off one by one, then the run repeats. */
export default function AgentRun() {
  // Server HTML shows the finished run; the animation starts after hydration.
  const [done, setDone] = useState(STEPS.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(
      () => setDone((d) => (d >= STEPS.length ? 0 : d + 1)),
      done >= STEPS.length ? 2600 : 900
    );
    return () => clearTimeout(timer);
  }, [done]);

  const finished = done >= STEPS.length;

  return (
    <div className="v-panel relative rounded-3xl p-5 shadow-2xl sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 v-live-dot" />
          <span className="v-mono text-xs text-[var(--v-muted)]">agent://accounts-payable</span>
        </div>
        <span className="v-mono rounded-full border border-[var(--v-line)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--v-muted)]">
          {finished ? "Complete" : "Running"}
        </span>
      </div>
      <ol className="mt-5 space-y-3">
        {STEPS.map((step, i) => {
          const state = i < done ? "done" : i === done ? "active" : "waiting";
          return (
            <li key={step.label} className={`flex items-start gap-3 text-sm transition-opacity duration-500 ${state === "waiting" ? "opacity-35" : "opacity-100"}`}>
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  state === "done"
                    ? "bg-emerald-400/20 text-emerald-400"
                    : state === "active"
                      ? "border-2 border-[var(--v-accent)] border-t-transparent animate-spin"
                      : "border border-[var(--v-line)]"
                }`}
              >
                {state === "done" ? "✓" : ""}
              </span>
              <span className="flex-1">{step.label}</span>
              {state === "done" && <span className="v-mono text-xs text-[var(--v-muted)]">{step.ms}</span>}
            </li>
          );
        })}
      </ol>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--v-panel-strong)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-400 transition-all duration-700"
          style={{ width: `${(Math.min(done, STEPS.length) / STEPS.length) * 100}%` }}
        />
      </div>
      <p className="v-mono mt-3 text-xs text-[var(--v-muted)]">
        {finished ? "4.8s total · saved ~2 hours of manual work" : `Step ${done + 1} of ${STEPS.length}…`}
      </p>
    </div>
  );
}
