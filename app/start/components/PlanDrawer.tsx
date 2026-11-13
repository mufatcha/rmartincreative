"use client";

import { useEffect, useRef } from "react";
import type { PlanItem } from "../../lib/onboarding/types";
import PlanView from "./PlanView";

/**
 * The project plan, flying in from the left. Stays mounted so it can slide both
 * ways; `inert` keeps it out of the tab order and screen readers while closed.
 */
export default function PlanDrawer({
  open,
  onClose,
  plan,
  seen,
  changes,
}: {
  open: boolean;
  onClose: () => void;
  plan: PlanItem[];
  /** The client's previous look (labels are relative to it). */
  seen: number | null;
  changes: number;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        aria-hidden
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-title"
        className={`absolute inset-y-0 left-0 flex w-[min(92vw,30rem)] flex-col bg-paper shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start gap-3 bg-gradient-to-br from-violet-700 to-indigo-700 px-6 pb-6 pt-7 text-white">
          <div className="flex-1">
            <h2 id="plan-title" className="text-2xl font-bold tracking-tight">
              Project plan
            </h2>
            <p className="mt-1 text-sm text-violet-100">What I&rsquo;m working on, what&rsquo;s next, and what you&rsquo;ll get.</p>
            {changes > 0 && (
              <p className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {changes} change{changes === 1 ? "" : "s"} since you last looked
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close the plan"
            className="-mr-2 -mt-1 flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5">
              <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <PlanView plan={plan} seen={seen} empty="The plan will show up here soon." />
        </div>
      </aside>
    </div>
  );
}
