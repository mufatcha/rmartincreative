"use client";

import { useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import { Feature } from "../../notes";
import { useHydrated } from "./hooks";
import { HomePanel, HoursPanel, MediaPanel, MenuPanel, SettingsPanel, SpecialsPanel, type PanelProps } from "./panels";
import Preview from "./Preview";
import { INITIAL_STATE, clearSaved, describeChanges, freshInitialState, loadSaved, reducer, save, type Content, type StudioState } from "./store";

type Section = "home" | "menu" | "specials" | "hours" | "media" | "settings" | "history";

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Home page", icon: "⌂" },
  { id: "menu", label: "Menu", icon: "☰" },
  { id: "specials", label: "Specials", icon: "★" },
  { id: "hours", label: "Hours", icon: "◷" },
  { id: "media", label: "Media", icon: "▣" },
  { id: "settings", label: "Settings", icon: "⚙" },
  { id: "history", label: "History", icon: "↺" },
];

const PANELS: Record<Exclude<Section, "history">, (props: PanelProps) => ReactNode> = {
  home: HomePanel,
  menu: MenuPanel,
  specials: SpecialsPanel,
  hours: HoursPanel,
  media: MediaPanel,
  settings: SettingsPanel,
};

const DEVICES = [
  { id: "phone", label: "Phone", width: 390 },
  { id: "tablet", label: "Tablet", width: 820 },
  { id: "desktop", label: "Desktop", width: 1280 },
] as const;
type Device = (typeof DEVICES)[number]["id"];

/** Attribution for the Freepik free-license photos in the media library. */
const PHOTO_CREDITS = [
  { name: "muhammad.abdullah", href: "https://www.freepik.com/free-photo/freshly-baked-artisan-sourdough-loaves-dusted-with-flour-wooden-board_427367682.htm" },
  { name: "rawpixel.com", href: "https://www.freepik.com/free-photo/fresh-baked-butter-croissants-display-cafe_16463716.htm" },
  { name: "pvproductions", href: "https://www.freepik.com/free-photo/large-loaves-bread-counter-bakery_24526564.htm" },
  { name: "Freepik", href: "https://www.freepik.com/free-photo/delicious-products-arrangement-bakery_39913037.htm" },
  { name: "Freepik", href: "https://www.freepik.com/free-photo/top-view-cinnamon-roll-coffee-cup_13248795.htm" },
  { name: "Freepik", href: "https://www.freepik.com/free-photo/baked-apple-pie-wooden-table-with-fruit_5035472.htm" },
];

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-US", { timeZone: "America/Chicago", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/**
 * The demo CMS. The server and hydration render the fixed starting content; right
 * after, it remounts with whatever this browser saved, so a demo survives a refresh.
 */
export default function Studio() {
  const hydrated = useHydrated();
  return <StudioApp key={hydrated ? "client" : "server"} hydrated={hydrated} />;
}

function StudioApp({ hydrated }: { hydrated: boolean }) {
  const [state, dispatch] = useReducer(reducer, hydrated, (h): StudioState => (h ? loadSaved() : INITIAL_STATE));
  const [section, setSection] = useState<Section>("home");
  const [device, setDevice] = useState<Device>("desktop");
  const [view, setView] = useState<"draft" | "live">("draft");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const changes = describeChanges(state.published, state.draft);
  const author = state.role === "owner" ? "Maya (Owner)" : "Sam (Staff)";
  const edit = (update: (draft: Content) => Content) => dispatch({ type: "edit", update });

  function publish() {
    if (!changes.length || publishing) return;
    setPublishing(true);
    // Stand-in for the CMS saving and the site rebuilding the changed pages.
    setTimeout(() => {
      const label = changes.length > 2 ? `${changes.slice(0, 2).join(", ")} + ${changes.length - 2} more` : changes.join(", ");
      dispatch({ type: "publish", label, author, at: new Date().toISOString() });
      setPublishing(false);
      setView("draft");
      setToast(`Published ${changes.length} change${changes.length === 1 ? "" : "s"}. The live site is updated.`);
    }, 1200);
  }

  function reset() {
    clearSaved();
    dispatch({ type: "reset", state: freshInitialState() });
    setSection("home");
    setView("draft");
    setToast("Demo reset to the starting content.");
  }

  const Panel = section === "history" ? null : PANELS[section];

  return (
    <div className="min-h-screen bg-[#efece7] pb-24 font-sans text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white">CS</span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Juniper &amp; Rye Bakery</p>
              <p className="text-[11px] text-ink-soft">Content Studio · Demo</p>
            </div>
          </div>

          <Feature
            title="Draft, review, publish"
            what="Edits are saved as a draft and counted here. Nothing changes on the live site until someone presses Publish, and every publish is kept in History."
            why="Owners and staff can make changes without fear: review first, publish when ready, and roll back if needed."
            tech="Separate draft and published versions in the CMS; publishing triggers the site to rebuild only the changed pages"
            className="rounded-xl"
            float="start"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  changes.length ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                }`}
                aria-live="polite"
              >
                <span className={`h-2 w-2 rounded-full ${changes.length ? "bg-amber-500" : "bg-emerald-500"}`} />
                {changes.length ? `Draft · ${changes.length} unpublished change${changes.length === 1 ? "" : "s"}` : "All changes published"}
              </span>
              {changes.length > 0 && (
                <button type="button" onClick={() => dispatch({ type: "discard" })} className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-paper-tint">
                  Discard
                </button>
              )}
              <button
                type="button"
                onClick={publish}
                disabled={!changes.length || publishing}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-paper transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                {publishing && <span className="h-3 w-3 animate-spin rounded-full border-2 border-paper border-t-transparent" />}
                {publishing ? "Publishing…" : "Publish"}
              </button>
            </div>
          </Feature>

          <div className="flex items-center gap-2">
            <Feature
              title="Roles and permissions"
              what="Switch between Owner and Staff. Staff can update specials, hours, and sold-out items, but prices, branding, and the home page lock."
              why="Hand day-to-day updates to your team without worrying about someone changing prices or breaking the design."
              tech="Role-based permissions on CMS fields; locked fields are read-only in the editor"
              className="rounded-xl"
              float="end"
            >
              <label className="flex items-center gap-2 text-xs font-semibold">
                <span className="hidden sm:inline">Signed in as</span>
                <select
                  value={state.role}
                  onChange={(e) => dispatch({ type: "role", role: e.target.value as StudioState["role"] })}
                  className="rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-xs"
                >
                  <option value="owner">Maya · Owner</option>
                  <option value="staff">Sam · Staff</option>
                </select>
              </label>
            </Feature>
            <button type="button" onClick={reset} className="rounded-lg border border-ink/15 px-2.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-paper-tint" title="Start the demo over">
              Reset demo
            </button>
          </div>
        </div>

        {/* Phone: switch between editing and preview */}
        <div className="flex border-t border-ink/10 lg:hidden" role="tablist" aria-label="View">
          {(["edit", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={mobileTab === t}
              onClick={() => setMobileTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold ${mobileTab === t ? "border-b-2 border-violet-600 text-violet-700" : "text-ink-soft"}`}
            >
              {t === "edit" ? "Edit" : "Preview"}
            </button>
          ))}
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[12.5rem_minmax(22rem,26rem)_1fr]">
        {/* Sidebar */}
        <nav aria-label="Content" className={`${mobileTab === "edit" ? "block" : "hidden"} lg:block`}>
          <ul className="flex gap-1 overflow-x-auto px-3 py-3 lg:sticky lg:top-[4.5rem] lg:flex-col lg:overflow-visible">
            {SECTIONS.map((s) => (
              <li key={s.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setSection(s.id)}
                  aria-current={section === s.id ? "page" : undefined}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                    section === s.id ? "bg-white text-ink shadow-sm ring-1 ring-ink/10" : "text-ink-soft hover:bg-white/60"
                  }`}
                >
                  <span className="w-4 text-center" aria-hidden>
                    {s.icon}
                  </span>
                  {s.label}
                  {s.id === "history" && changes.length > 0 && <span className="ml-auto h-2 w-2 rounded-full bg-amber-500" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Editor */}
        <main className={`${mobileTab === "edit" ? "block" : "hidden"} px-3 pb-6 lg:block lg:py-3`}>
          <h2 className="px-1 pb-3 text-lg font-bold">{SECTIONS.find((s) => s.id === section)?.label}</h2>
          {Panel ? (
            <Panel content={state.draft} edit={edit} role={state.role} />
          ) : (
            <HistoryPanel state={state} changes={changes} onRestore={(id) => { dispatch({ type: "restore", versionId: id }); setToast("Version restored as a draft. Publish to make it live."); }} />
          )}
          <p className="mt-4 px-1 text-[11px] leading-relaxed text-ink-soft">
            Demo only. Changes are saved in this browser so they survive a refresh; Reset demo starts over.
          </p>
          <p className="mt-2 px-1 text-[11px] leading-relaxed text-ink-soft">
            Photos via Freepik:{" "}
            {PHOTO_CREDITS.map((c, i) => (
              <span key={c.href}>
                {i > 0 && ", "}
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                  {c.name}
                </a>
              </span>
            ))}
          </p>
        </main>

        {/* Preview */}
        <section aria-label="Live preview" className={`${mobileTab === "preview" ? "block" : "hidden"} px-3 pb-6 lg:block lg:py-3`}>
          <Feature
            title="Live preview on any screen size"
            what="Every keystroke shows up here instantly. Switch between phone, tablet, and desktop, or compare the draft with what's live right now."
            why="Owners see exactly what customers will see before they publish, on the devices customers actually use."
            tech="Shared React state between editor and preview; the preview uses CSS container queries so it lays out for the frame's width"
            className="rounded-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
              <div className="flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-ink/10" role="radiogroup" aria-label="Device">
                {DEVICES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    role="radio"
                    aria-checked={device === d.id}
                    onClick={() => setDevice(d.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${device === d.id ? "bg-ink text-paper" : "text-ink-soft"}`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-ink/10" role="radiogroup" aria-label="Version">
                {(["draft", "live"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={view === v}
                    onClick={() => setView(v)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${view === v ? "bg-violet-600 text-white" : "text-ink-soft"}`}
                  >
                    {v === "draft" ? "Draft" : "Live site"}
                  </button>
                ))}
              </div>
            </div>
            <DeviceFrame width={DEVICES.find((d) => d.id === device)!.width} badge={view === "draft" ? (changes.length ? "Draft preview" : "Up to date") : "Live"}>
              <Preview content={view === "draft" ? state.draft : state.published} />
            </DeviceFrame>
          </Feature>
        </section>
      </div>

      {toast && (
        <div role="status" className="fixed right-4 top-20 z-50 max-w-sm rounded-2xl bg-ink px-4 py-3 text-sm text-paper shadow-2xl">
          <span className="mr-2 text-emerald-400">✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}

/** A browser-window frame at a real device width, scaled down to fit the column. */
function DeviceFrame({ width, badge, children }: { width: number; badge: string; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setBox({ w: entry.contentRect.width, h: entry.contentRect.height }));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = box.w ? Math.min(1, box.w / width) : 1;
  const left = box.w ? Math.max(0, (box.w - width * scale) / 2) : 0;

  return (
    <div ref={outer} className="relative h-[72vh] overflow-hidden lg:h-[calc(100vh-9.5rem)]">
      <div
        className="absolute top-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink/10 transition-[width] duration-300"
        style={{ width, height: box.h ? box.h / scale : "100%", left, transform: `scale(${scale})`, transformOrigin: "top left", visibility: box.w ? "visible" : "hidden" }}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-ink/10 bg-[#f6f4f1] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-rose-300" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-300" />
          </span>
          <span className="flex-1 truncate rounded-lg bg-white px-3 py-1 text-xs text-ink-soft ring-1 ring-ink/10">juniperrye.example</span>
          <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">{badge}</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function HistoryPanel({ state, changes, onRestore }: { state: StudioState; changes: string[]; onRestore: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10">
        <h3 className="text-sm font-semibold">Unpublished changes</h3>
        {changes.length ? (
          <ul className="mt-3 space-y-1.5 text-sm">
            {changes.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ink-soft">Nothing waiting. The live site matches the draft.</p>
        )}
      </section>
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10">
        <h3 className="text-sm font-semibold">Version history</h3>
        <p className="mt-1 text-xs text-ink-soft">Every publish is saved. Restore any version as a draft, then publish it.</p>
        <ol className="mt-4 space-y-3">
          {state.history.map((v, i) => (
            <li key={v.id} className="flex items-start justify-between gap-3 border-l-2 border-ink/10 pl-3">
              <div>
                <p className="text-sm font-medium">
                  {v.label}
                  {i === 0 && <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">Live</span>}
                </p>
                <p className="text-[11px] text-ink-soft">
                  {formatWhen(v.at)} · {v.author}
                </p>
              </div>
              {i > 0 && (
                <button type="button" onClick={() => onRestore(v.id)} className="shrink-0 rounded-lg border border-ink/15 px-2.5 py-1 text-xs font-semibold hover:bg-paper-tint">
                  Restore
                </button>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
