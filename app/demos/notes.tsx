"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useUrlParam } from "./client-store";

// "How it's built" notes for the demo sites. Off by default so a demo looks like a
// real site; switched on from the demo bar, each <Feature> shows a plain-English
// callout a sales rep can talk through. The state rides in the URL (?notes=1) so a
// link can open with the notes already showing.

const NotesContext = createContext<{ on: boolean; toggle: () => void }>({ on: false, toggle: () => {} });

export function NotesProvider({ children }: { children: ReactNode }) {
  // Read from the URL directly (not useSearchParams) so the pages stay fully
  // prerendered without a Suspense boundary.
  const [param, setParam] = useUrlParam("notes");
  const on = param === "1";
  const toggle = useCallback(() => setParam(on ? "" : "1"), [on, setParam]);

  return <NotesContext.Provider value={{ on, toggle }}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  return useContext(NotesContext);
}

/**
 * Wraps one demo feature. With notes on, it gets an outline and a callout:
 * what it does, why a business owner should care, and the tech behind it.
 */
export function Feature({
  title,
  what,
  why,
  tech,
  children,
  className = "",
  float,
}: {
  title: string;
  what: string;
  why: string;
  tech: string;
  children: ReactNode;
  className?: string;
  /** Show the callout as a popover over the page (anchored to this edge) instead of
   *  below the feature, for small controls in toolbars. */
  float?: "start" | "end";
}) {
  const { on } = useNotes();
  const placement = float
    ? `absolute top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] ${float === "end" ? "right-0" : "left-0"}`
    : "relative z-20 mx-auto mt-4 max-w-2xl";

  return (
    <div className={`relative ${className}`}>
      <div
        className={`rounded-[inherit] transition-shadow duration-300 ${
          on ? "shadow-[0_0_0_2px_#a855f7,0_0_0_6px_rgba(168,85,247,0.25)]" : ""
        }`}
      >
        {children}
      </div>
      {on && (
        <aside className={`${placement} rounded-2xl bg-white p-5 text-left font-sans text-[#201a2e] shadow-2xl ring-1 ring-black/10`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-600">How it&rsquo;s built</p>
          <h3 className="mt-1 text-base font-bold">{title}</h3>
          <dl className="mt-3 space-y-2 text-sm leading-relaxed">
            <div>
              <dt className="inline font-semibold">What it does: </dt>
              <dd className="inline text-[#5a5270]">{what}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Why it matters: </dt>
              <dd className="inline text-[#5a5270]">{why}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Under the hood: </dt>
              <dd className="inline font-mono text-xs text-[#5a5270]">{tech}</dd>
            </div>
          </dl>
        </aside>
      )}
    </div>
  );
}
