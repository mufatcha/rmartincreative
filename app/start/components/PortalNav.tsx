"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { useMediaQuery } from "./useMediaQuery";

export type NavView = {
  key: string;
  label: string;
  icon: ReactNode;
  /** New from Ryan since the client last opened this view. */
  fresh: number;
  /** Things the client still needs to do here. */
  todo: number;
};

// Desktop menu: expanded or icons only, remembered in this browser.
const STORE = "onboarding-nav-open";
let memoryPinned = true; // when storage is blocked
const pinnedListeners = new Set<() => void>();
function readPinned() {
  try {
    const v = localStorage.getItem(STORE);
    return v === null ? memoryPinned : v !== "0";
  } catch {
    return memoryPinned;
  }
}
function setPinned(v: boolean) {
  memoryPinned = v;
  try {
    localStorage.setItem(STORE, v ? "1" : "0");
  } catch {}
  pinnedListeners.forEach((l) => l());
}
function subscribePinned(l: () => void) {
  pinnedListeners.add(l);
  return () => void pinnedListeners.delete(l);
}

function Badges({ fresh, todo, compact }: { fresh: number; todo: number; compact: boolean }) {
  const pill = "flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-bold leading-none text-white ring-2";
  if (compact) {
    return (
      // Both on the icon's top-right corner, slightly overlapping (red in front).
      <span className="absolute -right-2.5 -top-2 flex -space-x-0.5">
        {fresh > 0 && <span className={`${pill} bg-emerald-500 ring-white`}>{fresh}</span>}
        {todo > 0 && <span className={`${pill} bg-rose-500 ring-white`}>{todo}</span>}
      </span>
    );
  }
  return (
    <span className="ml-auto flex shrink-0 gap-1">
      {fresh > 0 && <span className={`${pill} bg-emerald-500 ring-transparent`}>{fresh}</span>}
      {todo > 0 && <span className={`${pill} bg-rose-500 ring-transparent`}>{todo}</span>}
    </span>
  );
}

function describe(v: NavView) {
  const parts = [v.fresh > 0 && `${v.fresh} new`, v.todo > 0 && `${v.todo} to do`].filter(Boolean);
  return parts.length ? `${v.label} (${parts.join(", ")})` : v.label;
}

function List({ views, current, expanded, onPick }: { views: NavView[]; current: string; expanded: boolean; onPick: (key: string) => void }) {
  return (
    <ul className={expanded ? "space-y-1.5" : "space-y-3.5"}>
      {views.map((v) => {
        const active = v.key === current;
        return (
          <li key={v.key}>
            <button
              type="button"
              onClick={() => onPick(v.key)}
              aria-current={active ? "page" : undefined}
              aria-label={expanded ? undefined : describe(v)}
              title={expanded ? undefined : v.label}
              className={
                expanded
                  ? `group flex w-full items-center gap-3 rounded-2xl p-1.5 text-left text-sm font-semibold transition ${
                      active ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30" : "text-ink hover:bg-violet-50"
                    }`
                  : // Icons only: the icon square itself shows which view is open.
                    "group flex w-full justify-center rounded-xl text-sm font-semibold"
              }
            >
              <span
                className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  expanded
                    ? active
                      ? "bg-white/15"
                      : "bg-paper-tint text-violet-700 group-hover:bg-white"
                    : active
                      ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                      : "bg-paper-tint text-violet-700 group-hover:bg-violet-100"
                }`}
              >
                {v.icon}
                {!expanded && <Badges fresh={v.fresh} todo={v.todo} compact />}
              </span>
              {expanded && (
                <>
                  <span className="min-w-0 flex-1 leading-snug">{v.label}</span>
                  <Badges fresh={v.fresh} todo={v.todo} compact={false} />
                  {(v.fresh > 0 || v.todo > 0) && <span className="sr-only">{describe(v).slice(v.label.length)}</span>}
                </>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const Legend = () => (
  <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-ink/10 px-2 pt-3 text-xs text-ink-soft">
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> New from Ryan
    </span>
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-rose-500" /> For you to do
    </span>
  </p>
);

const Chevron = ({ left }: { left: boolean }) => (
  <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
    <path d={left ? "m12 5-5 5 5 5" : "m8 5 5 5-5 5"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * The page's menu on the left. Desktop: a sidebar that collapses to icons
 * (remembered per browser). Phones: always an icon rail; the expand button flies
 * the full menu out over the page.
 */
export default function PortalNav({ views, current, onPick }: { views: NavView[]; current: string; onPick: (key: string) => void }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const pinned = useSyncExternalStore(subscribePinned, readPinned, () => true); // desktop: expanded or icons only
  const [flyout, setFlyout] = useState(false); // phones: full menu open over the page

  useEffect(() => {
    if (!flyout) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFlyout(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [flyout]);

  const expanded = desktop && pinned;
  const toggle = () => {
    if (!desktop) return setFlyout(true);
    setPinned(!pinned);
  };
  const pick = (key: string) => {
    setFlyout(false);
    onPick(key);
  };

  const toggleButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={expanded ? "Collapse the menu" : "Expand the menu"}
      aria-expanded={desktop ? expanded : flyout}
      className="mb-2 flex h-9 w-full items-center gap-2 rounded-xl px-2.5 text-xs font-semibold text-ink-soft hover:bg-violet-50 hover:text-ink"
    >
      {expanded ? (
        <>
          <Chevron left />
          Collapse
        </>
      ) : (
        <span className="mx-auto">
          <Chevron left={false} />
        </span>
      )}
    </button>
  );

  return (
    <>
      <nav
        aria-label="Your page"
        className={`sticky top-28 z-30 shrink-0 self-start rounded-3xl border border-ink/10 bg-white shadow-sm transition-[width] duration-200 motion-reduce:transition-none sm:top-32 ${
          expanded ? "w-60 p-2.5" : "w-16 px-1.5 py-2"
        }`}
      >
        {toggleButton}
        <List views={views} current={current} expanded={expanded} onPick={pick} />
        {expanded && <Legend />}
      </nav>

      {!desktop && (
        <div className={`fixed inset-0 z-[60] ${flyout ? "" : "pointer-events-none"}`} inert={!flyout}>
          <div
            aria-hidden
            onClick={() => setFlyout(false)}
            className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${flyout ? "opacity-100" : "opacity-0"}`}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={`absolute inset-y-0 left-0 w-[min(85vw,18rem)] overflow-y-auto bg-white p-3 pt-6 shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
              flyout ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              type="button"
              onClick={() => setFlyout(false)}
              className="mb-3 flex h-9 w-full items-center gap-2 rounded-xl px-2.5 text-xs font-semibold text-ink-soft hover:bg-violet-50 hover:text-ink"
            >
              <Chevron left />
              Close menu
            </button>
            <List views={views} current={current} expanded onPick={pick} />
            <Legend />
          </div>
        </div>
      )}
    </>
  );
}
