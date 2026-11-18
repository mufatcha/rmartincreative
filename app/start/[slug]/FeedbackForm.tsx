"use client";

import { useState } from "react";

type Post = (body: Record<string, unknown>) => Promise<{ error?: string }>;

const LABELS = ["", "Frustrating", "Could be better", "Okay", "Good", "Great"];

const Star = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-9 w-9">
    <path
      d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Onboarding feedback. What the client sends goes to Ryan only: once it's sent,
 * the form clears and their page doesn't show it again.
 */
export default function FeedbackForm({ first, adminName, readOnly, post }: { first: string; adminName: string; readOnly: boolean; post: Post }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const shown = hover || rating;

  if (sent) {
    return (
      <div className="rounded-2xl bg-emerald-50 px-5 py-6 text-center ring-1 ring-emerald-200">
        <p className="text-lg font-bold text-emerald-900">Thank you, {first}!</p>
        <p className="mt-1 text-sm text-emerald-900/80">Your feedback went straight to {adminName}. It really does help.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-violet-700 hover:text-violet-800">
          Add more feedback
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSending(true);
        setError(null);
        const res = await post({ action: "feedback", rating: rating || null, body });
        setSending(false);
        if (res.error) return setError(res.error);
        setRating(0);
        setBody("");
        setSent(true);
      }}
      className="space-y-5"
    >
      <fieldset>
        <legend className="text-sm font-semibold">How&rsquo;s the onboarding going so far?</legend>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="flex text-amber-400" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                disabled={readOnly}
                onClick={() => setRating(n === rating ? 0 : n)}
                onMouseEnter={() => setHover(n)}
                aria-label={`${n} star${n === 1 ? "" : "s"}: ${LABELS[n]}`}
                aria-pressed={rating === n}
                className="rounded-lg p-0.5 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-violet-500 disabled:hover:scale-100"
              >
                <Star filled={n <= shown} />
              </button>
            ))}
          </div>
          <span className="text-sm font-medium text-ink-soft" aria-live="polite">
            {shown ? LABELS[shown] : "Tap a star"}
          </span>
        </div>
      </fieldset>
      <div>
        <label htmlFor="feedback-body" className="block text-sm font-semibold">
          Tell me more about this session or your overall experience <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id="feedback-body"
          rows={5}
          value={body}
          disabled={readOnly}
          onChange={(e) => setBody(e.target.value)}
          className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-[15px] text-ink outline-none field-sizing-content min-h-32 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:bg-paper-tint/40"
        />
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <button
          disabled={readOnly || sending || (!rating && !body.trim())}
          className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40"
        >
          {sending ? "Sending…" : "Send feedback"}
        </button>
        <span className="text-xs text-ink-soft">This is not a public or Google review. Your feedback is kept confidential and used internally to improve our onboarding process.</span>
      </div>
    </form>
  );
}
