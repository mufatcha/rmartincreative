"use client";

import { useState } from "react";

/**
 * "Share updates with <client>": the only way new questions, tasks, file
 * requests, and plan changes reach the client by email. Lists what hasn't been
 * shared yet; one press sends it all in one email, with an optional note.
 */
export default function ShareBox({
  first,
  hasEmail,
  unshared,
  share,
}: {
  first: string;
  hasEmail: boolean;
  unshared: string[];
  share: (note: string) => Promise<{ error?: string; shared?: unknown }>;
}) {
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const count = unshared.length;

  return (
    <div id="share-updates" className="scroll-mt-32 rounded-2xl border border-violet-200 bg-violet-50/60 p-4">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <h3 className="font-bold">Share updates with {first}</h3>
        <span className="text-sm text-ink-soft">
          {count ? `${count} update${count === 1 ? "" : "s"} not shared yet` : "Everything's been shared"}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-soft">
        {first} is only emailed when you send a chat message or press this button. Adding questions or changing the plan doesn&rsquo;t email them on its own.
      </p>

      {count > 0 && (
        <ul className="mt-3 max-h-40 list-disc space-y-0.5 overflow-y-auto pl-5 text-sm">
          {unshared.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      )}

      <label htmlFor="share-note" className="mt-3 block text-xs font-semibold text-ink-soft">
        Note to include (optional)
      </label>
      <textarea
        id="share-note"
        rows={2}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={`e.g. Added a few questions about your service area. No rush!`}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none field-sizing-content min-h-16 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={sending || !hasEmail || (!count && !note.trim())}
          onClick={async () => {
            setSending(true);
            setResult(null);
            const res = await share(note);
            setSending(false);
            if (res.error) setResult({ ok: false, text: res.error });
            else {
              setNote("");
              setResult({ ok: true, text: `Sent to ${first}.` });
            }
          }}
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40"
        >
          {sending ? "Sending…" : count ? `Share ${count} update${count === 1 ? "" : "s"}` : "Send note"}
        </button>
        {!hasEmail && <span className="text-xs text-ink-soft">Needs {first}&rsquo;s email first.</span>}
        {result && <span className={`text-sm ${result.ok ? "text-emerald-700" : "text-rose-600"}`}>{result.text}</span>}
      </div>
    </div>
  );
}
