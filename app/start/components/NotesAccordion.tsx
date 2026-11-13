"use client";

import { useState } from "react";
import LinkText from "./LinkText";
import { noteNeedsAck, type Note } from "../../lib/onboarding/types";

/** "2026-11-13" → "Nov 13, 2026" (read as a calendar date, not UTC midnight). */
export function noteDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

/** A note's text: line breaks kept, links clickable. */
export function NoteBody({ text }: { text: string }) {
  return (
    <div className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-ink">
      <LinkText text={text} />
    </div>
  );
}

/**
 * Notes from Ryan, one accordion panel each. Unread notes start open with a
 * "Got it" button; acknowledging one closes it. Any note can be reopened.
 */
export default function NotesAccordion({
  notes,
  from,
  onAcknowledge,
  readOnly = false,
}: {
  notes: Note[];
  from: string;
  onAcknowledge: (id: number) => Promise<unknown>;
  /** Admin preview: no "Got it" button. */
  readOnly?: boolean;
}) {
  // Notes you've opened or closed yourself, per version (an edited note
  // follows its read state again); the rest follow their read state.
  const [toggled, setToggled] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<number | null>(null);
  if (!notes.length) return null;
  const unread = notes.filter(noteNeedsAck).length;

  return (
    <section aria-labelledby="notes-title" className="mt-5 rounded-3xl border border-ink/10 bg-white px-5 py-5 shadow-sm sm:px-7">
      <div className="flex items-baseline gap-3">
        <h2 id="notes-title" className="flex-1 text-xl font-bold tracking-tight">
          Notes from {from}
        </h2>
        {unread > 0 && <span className="rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-bold text-white">{unread} unread</span>}
      </div>

      <ul className="mt-3 divide-y divide-ink/10">
        {notes.map((note) => {
          const needsAck = noteNeedsAck(note);
          const key = `${note.id}:${note.updatedAt}`;
          const open = toggled[key] ?? needsAck;
          const panelId = `note-${note.id}`;
          return (
            <li key={note.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setToggled((t) => ({ ...t, [key]: !open }))}
                  className="flex w-full items-center gap-3 py-4 text-left"
                >
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${needsAck ? "bg-violet-600" : "bg-transparent ring-1 ring-inset ring-ink/20"}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className={`block font-semibold leading-snug ${needsAck ? "text-ink" : "text-ink/80"}`}>
                      {note.title}
                      {needsAck && note.acknowledgedAt !== null && (
                        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-amber-800">Updated</span>
                      )}
                      {needsAck && note.acknowledgedAt === null && (
                        <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-emerald-800">New</span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-soft">
                      {noteDate(note.date)}
                      {!needsAck && " · Read"}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden
                    className={`h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                  >
                    <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-label={note.title}
                inert={!open}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="pb-5 pl-5.5">
                    <div className="rounded-2xl bg-paper-tint/50 px-4 py-4 sm:px-5">
                      <NoteBody text={note.body} />
                    </div>
                    {needsAck && !readOnly && (
                      <button
                        type="button"
                        disabled={busy === note.id}
                        onClick={async () => {
                          setBusy(note.id);
                          await onAcknowledge(note.id);
                          setBusy(null);
                          setToggled((t) => ({ ...t, [key]: false }));
                        }}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
                      >
                        <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4">
                          <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {busy === note.id ? "Saving…" : "Got it"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
