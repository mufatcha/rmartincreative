"use client";

import { useRef, useState } from "react";
import { noteNeedsAck, type Message, type Note } from "../../lib/onboarding/types";
import { NoteBody, noteDate } from "../components/NotesAccordion";

type Act = (body: Record<string, unknown>) => Promise<{ error?: string }>;

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

/** Today as YYYY-MM-DD in local time. */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** "> " in front of every line, plus an optional credit line. */
function asQuote(text: string, credit?: string) {
  const quoted = text
    .trim()
    .split("\n")
    .map((l) => `> ${l}`)
    .join("\n");
  return credit ? `${quoted}\n> — ${credit}` : quoted;
}

const shortDate = (t: number) => new Date(t).toLocaleDateString([], { month: "short", day: "numeric" });

function NoteForm({
  note,
  clientFirst,
  messages,
  onSave,
  onCancel,
}: {
  note?: Note;
  clientFirst: string;
  /** The client's chat messages, newest first, for "Quote a message". */
  messages: Message[];
  onSave: (d: { title: string; body: string; date: string }) => Promise<{ error?: string }>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [date, setDate] = useState(() => note?.date ?? today());
  const [body, setBody] = useState(note?.body ?? "");
  const area = useRef<HTMLTextAreaElement>(null);

  /** Puts `text` in place of the selection (or at the cursor) on lines of its own. */
  const insertBlock = (text: string, replaceSelection: boolean) => {
    const el = area.current;
    const start = el?.selectionStart ?? body.length;
    const end = replaceSelection ? (el?.selectionEnd ?? start) : start;
    const before = body.slice(0, start);
    const after = body.slice(end);
    const lead = before && !before.endsWith("\n\n") ? (before.endsWith("\n") ? "\n" : "\n\n") : "";
    const trail = after.startsWith("\n") ? "\n" : "\n\n";
    const next = `${before}${lead}${text}${trail}${after.replace(/^\n/, "")}`;
    setBody(next);
    const caret = (before + lead + text + trail).length;
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(caret, caret);
    });
  };

  const quoteSelection = () => {
    const el = area.current;
    if (!el) return;
    // Whole lines: expand the selection to the start and end of its lines.
    const s = body.lastIndexOf("\n", el.selectionStart - 1) + 1;
    let e = body.indexOf("\n", Math.max(el.selectionEnd - 1, el.selectionStart));
    if (e === -1) e = body.length;
    const selected = body.slice(s, e);
    if (!selected.trim()) {
      insertBlock("> ", false);
      return;
    }
    const allQuoted = selected.split("\n").every((l) => /^\s*>/.test(l) || !l.trim());
    const next = allQuoted
      ? selected.replace(/^\s*> ?/gm, "") // already a quote: unquote it
      : selected
          .split("\n")
          .map((l) => `> ${l}`)
          .join("\n");
    setBody(body.slice(0, s) + next + body.slice(e));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s, s + next.length);
    });
  };
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
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <label htmlFor="note-body" className="flex-1 text-xs font-semibold text-ink-soft">
            Note
          </label>
          <button
            type="button"
            onClick={quoteSelection}
            title="Quote the selected lines (again to unquote)"
            className="inline-flex items-center gap-1 rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs font-semibold text-ink hover:border-violet-400"
          >
            <svg viewBox="0 0 20 20" aria-hidden className="h-3.5 w-3.5">
              <path d="M4 11.5c0-3 1.5-5 4-6M4 11.5h3.5V15H4Zm7.5 0c0-3 1.5-5 4-6m-4 6H15V15h-3.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Quote
          </button>
          {messages.length > 0 && (
            <select
              aria-label={`Quote a message from ${clientFirst}`}
              value=""
              onChange={(e) => {
                const m = messages.find((x) => String(x.id) === e.target.value);
                if (m) insertBlock(asQuote(m.body, `${clientFirst}, ${shortDate(m.createdAt)}`), false);
              }}
              className="max-w-[16rem] rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs font-semibold text-ink"
            >
              <option value="">Quote {clientFirst}&rsquo;s message…</option>
              {messages.map((m) => (
                <option key={m.id} value={m.id}>
                  {shortDate(m.createdAt)}: {m.body.length > 60 ? `${m.body.slice(0, 60)}…` : m.body}
                </option>
              ))}
            </select>
          )}
        </div>
        <textarea
          id="note-body"
          ref={area}
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`${input} field-sizing-content min-h-40`}
        />
        <p className="mt-1 text-xs text-ink-soft">
          Line breaks are kept. Lines starting with &gt; show as a quote (end it with a &ldquo;&gt; — Name&rdquo; line to credit it). Paste a link to make
          it clickable, or write [link text](https://…).
        </p>
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
  messages,
  clientFirst,
  act,
  ago,
}: {
  notes: Note[];
  /** All chat messages; the client's are offered for quoting. */
  messages: Message[];
  clientFirst: string;
  act: Act;
  ago: (t: number | null) => string;
}) {
  const [editing, setEditing] = useState<number | "add" | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const clientMessages = messages.filter((m) => m.sender === "client").reverse();

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
            clientFirst={clientFirst}
            messages={clientMessages}
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
                  clientFirst={clientFirst}
                  messages={clientMessages}
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
