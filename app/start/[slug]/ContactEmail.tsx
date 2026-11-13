"use client";

import { useState } from "react";

/**
 * Where the client's notification emails go. When Ryan started the page without
 * an address, this asks for one up front; otherwise it's a small "change" line.
 */
export default function ContactEmail({
  email,
  onSave,
}: {
  email: string;
  onSave: (email: string) => Promise<{ error?: string }>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(email);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setError(null);
    const res = await onSave(draft.trim());
    setSaving(false);
    if (res.error) setError(res.error);
    else setEditing(false);
  }

  const form = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="contact-email" className="sr-only">
        Email address
      </label>
      <input
        id="contact-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="you@example.com"
        className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      />
      <button
        type="submit"
        disabled={saving || !draft.trim()}
        className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save email"}
      </button>
      {email && (
        <button type="button" onClick={() => setEditing(false)} className="px-3 py-2.5 text-sm font-medium text-ink-soft hover:text-ink">
          Cancel
        </button>
      )}
    </form>
  );

  if (!email) {
    return (
      <section className="mt-5 rounded-3xl border-2 border-violet-200 bg-violet-50 px-5 py-5 sm:px-7">
        <h2 className="text-lg font-bold tracking-tight">Where should updates go?</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Add the email you&rsquo;d like to hear from me at. You&rsquo;ll get a note when I reply or add something new here.
        </p>
        <div className="mt-4">{form}</div>
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      </section>
    );
  }

  if (editing) {
    return (
      <div className="mt-4 rounded-2xl bg-white/10 p-3">
        {form}
        {error && <p className="mt-2 text-sm text-rose-200">{error}</p>}
      </div>
    );
  }

  return (
    <p className="mt-4 text-sm text-violet-200">
      Updates go to <span className="font-medium text-white">{email}</span> ·{" "}
      <button
        type="button"
        onClick={() => {
          setDraft(email);
          setEditing(true);
        }}
        className="font-medium text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
      >
        Change
      </button>
    </p>
  );
}
