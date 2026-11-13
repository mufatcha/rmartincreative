"use client";

import { useState } from "react";
import { noteNeedsAck, type Note } from "../../lib/onboarding/types";
import { NoteBody, noteDate } from "../components/NotesAccordion";

type Act = (body: Record<string, unknown>) => Promise<{ error?: string }>;

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

/** Today as YYYY-MM-DD in local time. */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function NoteForm({
  note,
  onSave,
  onCancel,
}: {
  note?: Note;
  onSave: (d: { title: string; body: string; date: string }) => Promise<{ error?: string }>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [date, setDate] = useState(() => note?.date ?? today());
  const [body, setBody] = useState(note?.body ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        const res = await onSave({ title, body, date });
        setSaving(false);
        if (res.error) setError(res.error);
      }}
      className="space-y-3 rounded-2xl border border-violet-200 bg-violet-50/60 p-4"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_11rem]">
        <div>
          <label htmlFor="note-title" className="mb-1 block text-xs font-semibold text-ink-soft">
            Title
          </label>
          <input id="note-title" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} className={input} />
        </div>
        <div>
          <label htmlFor="note-date" className="mb-1 block text-xs font-semibold text-ink-soft">
            Date
          </label>
          <input id="note-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="note-body" className="mb-1 block text-xs font-semibold text-ink-soft">
          Note
        </label>
        <textarea id="note-body" rows={8} value={body} onChange={(e) => setBody(e.target.value)} className={`${input} field-sizing-content min-h-40`} />
        <p className="mt-1 text-xs text-ink-soft">Line breaks are kept. Paste a link to make it clickable, or write [link text](https://…) to show your own text.</p>
      </div>
      {note && noteNeedsAck(note) === false && (
        <p className="text-xs text-amber-800">Changing the title or text marks it unread again, so they&rsquo;ll be asked to read it again. Changing only the date doesn&rsquo;t.</p>
      )}
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex gap-2">
        <button disabled={saving} className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50">
          {saving ? "Saving…" : note ? "Save note" : "Add note"}
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
          Cancel
        </button>
      </div>
    </form>
  );
}

/** Notes on the admin page: add, edit, delete, and see whether each was read. */
export default function NotesEditor({
  notes,
  clientFirst,
  act,
  ago,
}: {
  notes: Note[];
  clientFirst: string;
  act: Act;
  ago: (t: number | null) => string;
}) {
  const [editing, setEditing] = useState<number | "add" | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="rounded-3xl border border-ink/10 bg-white px-5 py-6 shadow-sm sm:px-7">
      <h2 className="text-xl font-bold tracking-tight">Notes</h2>
      <p className="mt-1 text-sm text-ink-soft">
        For anything too long for a chat message. They show as a list near the top of {clientFirst}&rsquo;s page. Unread notes open with a &ldquo;Got
        it&rdquo; button that closes them, and {clientFirst} can reopen any note later.
      </p>

      <div className="mt-4">
        {editing === "add" ? (
          <NoteForm
            onSave={async (d) => {
              const res = await act({ action: "addNote", ...d });
              if (!res.error) setEditing(null);
              return res;
            }}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <button type="button" onClick={() => setEditing("add")} className="text-sm font-semibold text-violet-700 hover:text-violet-800">
            + Write a note
          </button>
        )}
      </div>

      {notes.length > 0 && (
        <ul className="mt-4 divide-y divide-ink/10">
          {notes.map((n) =>
            editing === n.id ? (
              <li key={n.id} className="py-3">
                <NoteForm
                  note={n}
                  onSave={async (d) => {
                    const res = await act({ action: "updateNote", id: n.id, ...d });
                    if (!res.error) setEditing(null);
                    return res;
                  }}
                  onCancel={() => setEditing(null)}
                />
              </li>
            ) : (
              <li key={n.id} className="py-3">
                <div className="flex items-start gap-3">
                  <button type="button" onClick={() => setExpanded(expanded === n.id ? null : n.id)} aria-expanded={expanded === n.id} className="min-w-0 flex-1 text-left">
                    <span className="block font-semibold">{n.title}</span>
                    <span className="mt-0.5 block text-xs text-ink-soft">
                      {noteDate(n.date)} ·{" "}
                      {n.acknowledgedAt === null ? (
                        <span className="font-medium text-amber-700">Not read yet</span>
                      ) : noteNeedsAck(n) ? (
                        <span className="font-medium text-amber-700">Changed since {clientFirst} read it</span>
                      ) : (
                        <span className="font-medium text-emerald-700">
                          Read by {clientFirst} {ago(n.acknowledgedAt)}
                        </span>
                      )}
                    </span>
                  </button>
                  <button type="button" onClick={() => setEditing(n.id)} className="text-xs font-semibold text-violet-700 hover:text-violet-800">
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete the note “${n.title}”?`)) void act({ action: "updateNote", id: n.id, archived: true });
                    }}
                    className="text-xs font-semibold text-ink-soft hover:text-rose-600"
                  >
                    Delete
                  </button>
                </div>
                {expanded === n.id && (
                  <div className="mt-3 rounded-2xl bg-paper-tint/50 px-4 py-4">
                    <NoteBody text={n.body} />
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
}
