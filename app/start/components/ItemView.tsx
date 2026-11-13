"use client";

import type { ReactNode } from "react";
import type { SaveStatus } from "./usePortal";
import LinkText from "./LinkText";

/** The circle beside each item: a check once it's done. For tasks it's the checkbox. */
export function DoneMark({
  done,
  onToggle,
  label,
}: {
  done: boolean | null;
  onToggle?: () => void;
  label?: string;
}) {
  if (done === null) {
    return (
      <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-violet-500">
        <svg viewBox="0 0 20 20" className="h-5 w-5">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 9v4.5M10 6.5v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  const circle = (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
        done ? "border-emerald-500 bg-emerald-500 text-white" : "border-ink/25 bg-white text-transparent"
      } ${onToggle ? "group-hover/check:border-emerald-500" : ""}`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
        <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
  if (!onToggle) {
    return (
      <span className="mt-0.5 shrink-0" role="img" aria-label={done ? "Done" : "Not done yet"}>
        {circle}
      </span>
    );
  }
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={done}
      aria-label={label}
      onClick={onToggle}
      className="group/check -m-1.5 mt-[-0.25rem] shrink-0 rounded-full p-1.5"
    >
      {circle}
    </button>
  );
}

export function ItemShell({
  done,
  onToggle,
  title,
  titleId,
  help,
  badge,
  children,
  tools,
}: {
  done: boolean | null;
  onToggle?: () => void;
  title: string;
  titleId: string;
  help?: string;
  badge?: ReactNode;
  children?: ReactNode;
  tools?: ReactNode;
}) {
  return (
    <div className="flex gap-3.5 py-5">
      <DoneMark done={done} onToggle={onToggle} label={title} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <label id={`${titleId}-label`} htmlFor={titleId} className={`block font-semibold leading-snug ${done && onToggle ? "text-ink-soft line-through decoration-ink/30" : "text-ink"}`}>
              {title}
              {badge}
            </label>
            {help && <p className="mt-1 whitespace-pre-wrap text-sm text-ink-soft">
              <LinkText text={help} />
            </p>}
          </div>
          {tools}
        </div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}

export function SaveIndicator({ status, error }: { status: SaveStatus; error: string | null }) {
  const map: Record<SaveStatus, { text: string; dot: string }> = {
    idle: { text: "Saves automatically", dot: "bg-ink/25" },
    saving: { text: "Saving…", dot: "bg-amber-400 animate-pulse" },
    saved: { text: "All changes saved", dot: "bg-emerald-500" },
    retrying: { text: "Connection trouble, retrying…", dot: "bg-amber-500 animate-pulse" },
    error: { text: error ?? "Couldn't save", dot: "bg-rose-500" },
  };
  const s = map[status];
  return (
    <span role="status" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm backdrop-blur">
      <span aria-hidden className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.text}
    </span>
  );
}

/** `tone="light"` is for dark backgrounds: a white fill on a faint track, so the
 *  filled part is the bright part (a violet fill there reads as empty). */
export function ProgressBar({
  done,
  total,
  className = "",
  tone = "default",
}: {
  done: number;
  total: number;
  className?: string;
  tone?: "default" | "light";
}) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const track = tone === "light" ? "bg-white/15" : "bg-ink/10";
  const fill = tone === "light" ? (pct === 100 ? "bg-emerald-300" : "bg-white") : pct === 100 ? "bg-emerald-500" : "bg-violet-600";
  return (
    <div
      className={`h-2 overflow-hidden rounded-full ${track} ${className}`}
      role="progressbar"
      aria-label="Progress"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* At least a sliver once something is done, so 1 of 40 still shows. */}
      <div className={`h-full rounded-full transition-all duration-500 ${fill}`} style={{ width: done > 0 ? `max(${pct}%, 0.5rem)` : "0%" }} />
    </div>
  );
}
