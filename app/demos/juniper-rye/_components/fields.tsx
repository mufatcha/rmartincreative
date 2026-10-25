"use client";

import { useId, type ReactNode } from "react";

export function LockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M10 2a4 4 0 0 0-4 4v2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4Zm2 6V6a2 2 0 1 0-4 0v2h4Z" clipRule="evenodd" />
    </svg>
  );
}

export function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10">
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && <p className="mt-1 text-xs leading-relaxed text-ink-soft">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

const INPUT =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-paper-tint disabled:text-ink-soft";

export function TextField({
  label,
  value,
  onChange,
  max,
  multiline = false,
  hint,
  locked = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Shows a live character counter that turns amber near the limit and red past it. */
  max?: number;
  multiline?: boolean;
  hint?: string;
  locked?: boolean;
  placeholder?: string;
}) {
  const id = useId();
  const over = max !== undefined && value.length > max;
  const near = max !== undefined && !over && value.length > max * 0.9;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold text-ink">
          {label}
          {locked && <LockIcon className="h-3 w-3 text-ink-soft" />}
        </label>
        {max !== undefined && (
          <span className={`text-[11px] tabular-nums ${over ? "font-semibold text-rose-600" : near ? "text-amber-600" : "text-ink-soft"}`}>
            {value.length}/{max}
          </span>
        )}
      </div>
      {multiline ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={3} disabled={locked} placeholder={placeholder} className={`mt-1.5 resize-y ${INPUT}`} />
      ) : (
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} disabled={locked} placeholder={placeholder} className={`mt-1.5 ${INPUT}`} />
      )}
      {(hint || over) && <p className={`mt-1 text-[11px] ${over ? "text-rose-600" : "text-ink-soft"}`}>{over ? `Google will cut this off after about ${max} characters.` : hint}</p>}
    </div>
  );
}

export function Toggle({ label, checked, onChange, disabled = false }: { label: string; checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 text-xs font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-violet-600" : "bg-ink/20"}`} aria-hidden>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${checked ? "left-[1.125rem]" : "left-0.5"}`} />
      </span>
      {label}
    </button>
  );
}

export { INPUT };
