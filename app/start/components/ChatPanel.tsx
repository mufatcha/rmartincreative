"use client";

import { useEffect, useRef, useState } from "react";
import type { Message, Viewer } from "../../lib/onboarding/types";

function when(t: number) {
  const d = new Date(t);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  return sameDay
    ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : d.toLocaleDateString([], { month: "short", day: "numeric" }) + ", " + d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/** The conversation between the client and Ryan. Enter sends, Shift+Enter adds a line. */
export default function ChatPanel({
  messages,
  viewer,
  otherName,
  unread,
  active,
  onSend,
  onRead,
  emptyText,
  className = "",
  readOnly = false,
}: {
  messages: Message[];
  viewer: Viewer;
  otherName: string;
  unread: number;
  /** The panel is on screen (desktop column, or the open mobile drawer). */
  active: boolean;
  onSend: (body: string) => Promise<{ error?: string }>;
  onRead: () => void;
  emptyText: string;
  className?: string;
  /** Hide the message box (admin preview of the client's page). */
  readOnly?: boolean;
}) {
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimistic, setOptimistic] = useState<Message[]>([]);
  const list = useRef<HTMLDivElement>(null);

  // Drop sent messages once the real ones arrive.
  const shown = [...messages, ...optimistic.filter((o) => !messages.some((m) => m.sender === o.sender && m.body === o.body && m.createdAt >= o.createdAt - 60_000))];

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [shown.length, active]);

  useEffect(() => {
    if (active && unread > 0 && document.visibilityState === "visible") onRead();
  }, [active, unread, onRead]);

  async function send() {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setError(null);
    const temp: Message = { id: -Date.now(), sender: viewer, body, createdAt: Date.now() };
    setOptimistic((o) => [...o, temp]);
    setDraft("");
    const res = await onSend(body);
    setSending(false);
    if (res.error) {
      setOptimistic((o) => o.filter((m) => m !== temp));
      setDraft(body);
      setError(res.error);
    }
  }

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div ref={list} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {shown.length === 0 && <p className="px-2 py-8 text-center text-sm text-ink-soft">{emptyText}</p>}
        {shown.map((m) => {
          const mine = m.sender === viewer;
          return (
            <div key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-[15px] leading-snug ${
                  mine ? "rounded-br-md bg-violet-600 text-white" : "rounded-bl-md bg-paper-tint text-ink"
                } ${m.id < 0 ? "opacity-70" : ""}`}
              >
                {m.body}
              </div>
              <span className="mt-1 px-1 text-[11px] text-ink-soft">
                {mine ? "You" : otherName} · {m.id < 0 ? "Sending…" : when(m.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
      {readOnly ? (
        <p className="border-t border-ink/10 p-3 text-center text-xs text-ink-soft">Preview: reply from your admin page.</p>
      ) : (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
        className="border-t border-ink/10 p-3"
      >
        {error && <p className="mb-2 text-xs text-rose-600">{error}</p>}
        <div className="flex items-end gap-2">
          <label htmlFor={`chat-${viewer}`} className="sr-only">
            Message
          </label>
          <textarea
            id={`chat-${viewer}`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void send();
              }
            }}
            rows={1}
            placeholder={`Message ${otherName}…`}
            className="field-sizing-content max-h-40 min-h-11 flex-1 resize-none rounded-2xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending}
            aria-label="Send"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white transition hover:bg-violet-700 disabled:opacity-40"
          >
            <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5">
              <path d="M3.5 10h11m0 0-4.5-4.5M14.5 10 10 14.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
