"use client";

import { useMemo, useState } from "react";
import { useNotes } from "../../notes";
import { useShell } from "./VantorShell";

type Command = { id: string; label: string; hint: string; run: () => void };

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** ⌘K / Ctrl+K: type to filter, arrow keys to move, Enter to run. */
export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Mounted only while open, so every opening starts with an empty search.
  return open ? <Palette onClose={onClose} /> : null;
}

function Palette({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useShell();
  const notes = useNotes();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands: Command[] = useMemo(
    () => [
      { id: "chat", label: "Ask Vantor a question", hint: "Jump", run: () => jump("chat") },
      { id: "product", label: "How Vantor works", hint: "Jump", run: () => jump("product") },
      { id: "live", label: "Live network status", hint: "Jump", run: () => jump("live") },
      { id: "integrations", label: "Browse integrations", hint: "Jump", run: () => jump("integrations") },
      { id: "pricing", label: "See pricing", hint: "Jump", run: () => jump("pricing") },
      { id: "waitlist", label: "Join the waitlist", hint: "Jump", run: () => jump("waitlist") },
      {
        id: "theme",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        hint: "Action",
        run: toggleTheme,
      },
      {
        id: "notes",
        label: notes.on ? "Hide “How it’s built” notes" : "Show “How it’s built” notes",
        hint: "Action",
        run: notes.toggle,
      },
      { id: "top", label: "Back to top", hint: "Jump", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    ],
    [theme, toggleTheme, notes.on, notes.toggle]
  );

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  function run(command: Command | undefined) {
    if (!command) return;
    onClose();
    command.run();
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="v-panel v-fade-in w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: "var(--v-bg-2)" }}
      >
        <div className="flex items-center gap-3 border-b border-[var(--v-line)] px-4">
          <span className="v-mono text-xs text-[var(--v-muted)]">⌘K</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              }
              if (e.key === "Enter") run(results[active]);
            }}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            className="w-full bg-transparent py-4 text-base text-[var(--v-text)] outline-none placeholder:text-[var(--v-muted)]"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-[var(--v-muted)]">No matches</li>}
          {results.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => run(c)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${
                  i === active ? "bg-[var(--v-panel-strong)] text-[var(--v-text)]" : "text-[var(--v-muted)]"
                }`}
              >
                {c.label}
                <span className="v-mono text-[10px] uppercase tracking-widest opacity-70">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="v-mono border-t border-[var(--v-line)] px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--v-muted)]">
          ↑↓ to move · Enter to run · Esc to close
        </p>
      </div>
    </div>
  );
}
