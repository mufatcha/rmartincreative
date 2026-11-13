// Building blocks shared by the client guides in app/start/onboarding-tasks.
import type { ReactNode } from "react";

/** One part of a guide. `id` makes it linkable (#id), and the part is
 *  highlighted when someone arrives by that link. */
export function Part({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 rounded-3xl border border-ink/10 bg-white px-5 py-6 shadow-sm transition-shadow target:border-violet-300 target:ring-4 target:ring-violet-200 sm:px-8 sm:py-8"
    >
      {eyebrow && <p className="text-xs font-bold uppercase tracking-wider text-violet-700">{eyebrow}</p>}
      <h2 id={`${id}-title`} className="mt-1 text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Numbered steps. Numbers are drawn by <Step>; `start` keeps the list numbering right for screen readers. */
export function Steps({ start = 1, children }: { start?: number; children: ReactNode }) {
  return (
    <ol start={start} className="list-none space-y-4">
      {children}
    </ol>
  );
}

export function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span aria-hidden className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-0.5 text-[15px] leading-relaxed">{children}</div>
    </li>
  );
}

export const B = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-ink">{children}</strong>;

/** A button or menu label as it appears on screen. */
export const UI = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md bg-paper-tint px-1.5 py-0.5 font-medium text-ink ring-1 ring-ink/10">{children}</span>
);

export const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-800">
    {children}
  </a>
);

export function Callout({ tone = "info", children }: { tone?: "info" | "warn"; children: ReactNode }) {
  return (
    <div
      className={`mt-5 rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
        tone === "warn" ? "border border-amber-200 bg-amber-50 text-amber-950" : "border border-violet-200 bg-violet-50 text-ink"
      }`}
    >
      {children}
    </div>
  );
}

/** An address to type exactly, with a little emphasis. */
export const Email = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md bg-violet-100 px-1.5 py-0.5 font-mono text-[14px] font-semibold text-violet-900">{children}</span>
);
