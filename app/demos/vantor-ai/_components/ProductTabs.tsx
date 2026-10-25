"use client";

import { useState } from "react";
import { flushSync } from "react-dom";

const TABS = [
  {
    id: "plan",
    label: "Plan",
    title: "Describe the outcome. Vantor plans the steps.",
    body: "Tell it what you want done in plain English. Vantor breaks the job into steps, picks the right tools, and shows you the plan before anything runs.",
    lines: ["goal: close out October invoices", "→ read inbox: ap@company.com", "→ match against open POs", "→ flag differences > 2%", "→ draft vendor follow-ups"],
  },
  {
    id: "act",
    label: "Act",
    title: "Agents work across every tool you use.",
    body: "Each step runs in your connected apps: email, spreadsheets, your CRM, your help desk. Watch it live, pause it, or take over at any point.",
    lines: ["✓ read 42 invoices (1.2s)", "✓ matched 39 purchase orders", "! 3 price differences found", "… drafting 3 emails", "… waiting for approval"],
  },
  {
    id: "verify",
    label: "Verify",
    title: "Every result is checked, logged, and reversible.",
    body: "Vantor double-checks its own work, asks for approval on sensitive steps, and writes every action to an audit log you can export or undo.",
    lines: ["check: totals match ledger ✓", "check: no duplicate payments ✓", "approval: sent to Dana R.", "log: 14 actions recorded", "status: ready for review"],
  },
];

/** Tabs that cross-fade with the View Transitions API, or switch instantly where it isn't supported. */
export default function ProductTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  function select(i: number) {
    if (i === active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      setActive(i);
      return;
    }
    document.startViewTransition(() => flushSync(() => setActive(i)));
  }

  return (
    <div>
      <div role="tablist" aria-label="How Vantor works" className="v-panel mx-auto flex w-fit gap-1 rounded-2xl p-1">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`vantor-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="vantor-tabpanel"
            onClick={() => select(i)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-colors ${
              i === active ? "v-button text-white" : "text-[var(--v-muted)] hover:text-[var(--v-text)]"
            }`}
          >
            <span className="v-mono mr-1.5 text-xs opacity-70">0{i + 1}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div
        id="vantor-tabpanel"
        role="tabpanel"
        aria-labelledby={`vantor-tab-${tab.id}`}
        style={{ viewTransitionName: "vantor-tab" }}
        className="mt-8 grid items-center gap-8 lg:grid-cols-2"
      >
        <div>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{tab.title}</h3>
          <p className="mt-4 text-[var(--v-muted)]">{tab.body}</p>
        </div>
        <div className="v-panel v-mono rounded-2xl p-5 text-sm leading-7">
          {tab.lines.map((line) => (
            <p key={line} className={line.startsWith("!") ? "text-amber-400" : line.includes("✓") ? "text-emerald-400" : ""}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
