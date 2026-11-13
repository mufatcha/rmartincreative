"use client";

import type { ReactNode } from "react";
import { PLAN_STAGES, PLAN_STAGE_LABELS, type PlanItem, type PlanStage } from "../../lib/onboarding/types";

export type PlanLabel = "new" | "updated" | "removed" | null;

/**
 * What changed since the client last opened the plan. Nothing is labeled on
 * their first look (seen === null): everything would be "new".
 */
export function planLabel(item: PlanItem, seen: number | null): PlanLabel {
  if (seen === null) return null;
  if (item.removedAt !== null) {
    // Added and removed between two visits: they never saw it, so don't show it.
    return item.removedAt > seen && item.createdAt <= seen ? "removed" : null;
  }
  if (item.createdAt > seen) return "new";
  if (item.updatedAt > seen) return "updated";
  return null;
}

/** Items the client sees: everything on the plan, plus what came off since their last look. */
export function visiblePlan(plan: PlanItem[], seen: number | null) {
  return plan.filter((p) => p.removedAt === null || planLabel(p, seen) === "removed");
}

export function countPlanChanges(plan: PlanItem[], seen: number | null) {
  return plan.filter((p) => planLabel(p, seen) !== null).length;
}

const LABEL_STYLES: Record<Exclude<PlanLabel, null>, string> = {
  new: "bg-emerald-100 text-emerald-800",
  updated: "bg-amber-100 text-amber-800",
  removed: "bg-rose-100 text-rose-700",
};

const STAGE_MARK: Record<PlanStage, ReactNode> = {
  now: (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60 motion-reduce:animate-none" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-600" />
    </span>
  ),
  next: <span className="h-2.5 w-2.5 rounded-full border-2 border-indigo-500" />,
  feature: (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-emerald-600" aria-hidden>
      <path d="M10 2.5 11.8 8.2 17.5 10l-5.7 1.8L10 17.5l-1.8-5.7L2.5 10l5.7-1.8Z" fill="currentColor" />
    </svg>
  ),
  done: (
    <svg viewBox="0 0 16 16" className="h-4 w-4 text-ink-soft" aria-hidden>
      <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function LabelChip({ label }: { label: Exclude<PlanLabel, null> }) {
  return (
    <span className={`ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide ${LABEL_STYLES[label]}`}>
      {label}
    </span>
  );
}

/** The plan grouped by stage. `tools` adds the admin's controls to each item. */
export default function PlanView({
  plan,
  seen,
  tools,
  empty = "Nothing on the plan yet.",
}: {
  plan: PlanItem[];
  /** The client's previous look at the plan, for New / Updated / Removed labels. */
  seen: number | null;
  tools?: (item: PlanItem) => ReactNode;
  empty?: string;
}) {
  const shown = visiblePlan(plan, seen);
  if (!shown.length) return <p className="text-sm text-ink-soft">{empty}</p>;

  return (
    <div className="space-y-7">
      {PLAN_STAGES.map((stage) => {
        const items = shown.filter((p) => p.stage === stage);
        if (!items.length) return null;
        return (
          <section key={stage} aria-labelledby={`plan-${stage}`}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-4 w-4 items-center justify-center">{STAGE_MARK[stage]}</span>
              <h3 id={`plan-${stage}`} className="text-sm font-bold uppercase tracking-wide text-ink">
                {PLAN_STAGE_LABELS[stage].title}
              </h3>
              <span className="text-xs font-medium text-ink-soft">{items.filter((i) => i.removedAt === null).length}</span>
            </div>
            <ul className="mt-3 space-y-2">
              {items.map((item) => {
                const label = planLabel(item, seen);
                const removed = item.removedAt !== null;
                return (
                  <li
                    key={item.id}
                    className={`rounded-2xl border px-4 py-3 ${
                      removed
                        ? "border-dashed border-rose-200 bg-rose-50/40"
                        : label === "new"
                          ? "border-emerald-200 bg-emerald-50/50"
                          : stage === "done"
                            ? "border-ink/5 bg-paper-tint/40"
                            : "border-ink/10 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className={`font-semibold leading-snug ${removed ? "text-ink-soft line-through decoration-rose-300" : stage === "done" ? "text-ink-soft" : "text-ink"}`}>
                          {item.title}
                          {label && <LabelChip label={label} />}
                        </p>
                        {item.detail && <p className={`mt-1 whitespace-pre-wrap text-sm text-ink-soft ${removed ? "line-through decoration-rose-200" : ""}`}>{item.detail}</p>}
                      </div>
                      {tools?.(item)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
