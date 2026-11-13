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

/** The provider's own help article, under a section. */
export function Help({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="mt-3 text-sm text-ink-soft">
      Help article: <Ext href={href}>{children}</Ext>
    </p>
  );
}

/** A short lead-in paragraph at the top of a section. */
export function Intro({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[15px] leading-relaxed text-ink-soft">{children}</p>;
}

/** "Before you start" checklist. */
export function Checklist({ title = "Before you start, have these handy", items }: { title?: string; items: ReactNode[] }) {
  return (
    <div className="mb-5 rounded-2xl bg-paper-tint/50 px-4 py-3.5">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-2 grid gap-1.5 text-sm text-ink-soft sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Shown before any step where the client types their business name: listings
 *  only reinforce each other when the name matches letter for letter. */
export function NameMatch() {
  return (
    <div className="mb-5 rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-4 text-amber-950 sm:px-5">
      <p className="flex items-center gap-2 font-bold">
        <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5 shrink-0 text-amber-600">
          <path d="M10 3.5 17.5 16.5h-15L10 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 8.5v3.5M10 14.2v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Use your business name <span className="underline decoration-amber-400 decoration-2 underline-offset-2">exactly</span> as it&rsquo;s written
        on your onboarding page
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        Google, Bing, Apple, and the rest compare your listings letter by letter. To them, <B>&ldquo;Smith Lawn Services&rdquo;</B> and{" "}
        <B>&ldquo;Smith Lawn Service&rdquo;</B> are two different businesses, which can split up your reviews and make you harder to find.
      </p>
      <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">
        <li>Match the spelling, spacing, capital letters, and punctuation.</li>
        <li>Keep (or leave out) &ldquo;LLC&rdquo;, &ldquo;Inc.&rdquo;, &ldquo;&amp;&rdquo; and &ldquo;and&rdquo; the same way every time.</li>
        <li>Don&rsquo;t add extra words like your town or &ldquo;Best Plumber&rdquo;. It breaks the match, and the sites can penalize it.</li>
        <li>Copy and paste the name from your onboarding page if you can.</li>
      </ul>
    </div>
  );
}
