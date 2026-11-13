"use client";

import { useEffect, useRef, useState } from "react";
import type { AnswerValue, Item } from "../../lib/onboarding/types";

const TEXT_DELAY = 700;

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] text-ink shadow-sm outline-none transition placeholder:text-ink-soft/60 focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

/**
 * One question, saved as you go: text fields save shortly after you stop typing
 * (and right away when you leave the field or the page); choices save on click.
 */
export default function QuestionField({
  item,
  value,
  onSave,
  disabled = false,
}: {
  item: Item;
  value: AnswerValue | undefined;
  onSave: (value: AnswerValue, opts?: { keepalive?: boolean }) => void;
  disabled?: boolean;
}) {
  const isMulti = item.fieldType === "checkboxes";
  const [draft, setDraft] = useState<AnswerValue>(value ?? (isMulti ? [] : ""));
  const [focused, setFocused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unsaved = useRef<AnswerValue | null>(null);
  const onSaveRef = useRef(onSave);
  useEffect(() => {
    onSaveRef.current = onSave;
  });

  // Take changes from elsewhere (the other person, another tab) unless you're
  // in the middle of editing this field.
  const incoming = JSON.stringify(value ?? (isMulti ? [] : ""));
  const [lastIncoming, setLastIncoming] = useState(incoming);
  if (incoming !== lastIncoming && !focused) {
    setLastIncoming(incoming);
    setDraft(JSON.parse(incoming) as AnswerValue);
  }

  const flush = (opts?: { keepalive?: boolean }) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (unsaved.current !== null) {
      onSaveRef.current(unsaved.current, opts);
      unsaved.current = null;
    }
  };

  // Don't lose the last few keystrokes when the tab closes or the phone locks.
  useEffect(() => {
    const onHide = () => flush({ keepalive: true });
    const onVisibility = () => document.visibilityState === "hidden" && onHide();
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
      flush({ keepalive: true });
    };
  }, []);

  const typed = (next: string) => {
    setDraft(next);
    unsaved.current = next;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => flush(), TEXT_DELAY);
  };

  const picked = (next: AnswerValue) => {
    setDraft(next);
    unsaved.current = next;
    flush();
  };

  const id = `q-${item.id}`;
  const textProps = {
    id,
    disabled,
    value: typeof draft === "string" ? draft : "",
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false);
      flush();
    },
  };

  switch (item.fieldType) {
    case "textarea":
      return (
        <textarea
          {...textProps}
          rows={3}
          onChange={(e) => typed(e.target.value)}
          className={`${inputClass} field-sizing-content min-h-24 resize-y`}
        />
      );
    case "select":
      return (
        <select {...textProps} onChange={(e) => picked(e.target.value)} className={inputClass}>
          <option value="">Choose…</option>
          {item.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case "radio":
    case "checkboxes": {
      const selected = Array.isArray(draft) ? draft : draft ? [draft] : [];
      return (
        <div role={isMulti ? "group" : "radiogroup"} aria-labelledby={`${id}-label`} className="flex flex-wrap gap-2">
          {item.options.map((o) => {
            const on = selected.includes(o);
            return (
              <button
                key={o}
                type="button"
                role={isMulti ? "checkbox" : "radio"}
                aria-checked={on}
                disabled={disabled}
                onClick={() => {
                  if (isMulti) picked(on ? selected.filter((s) => s !== o) : [...selected, o]);
                  else picked(on ? "" : o);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                  on
                    ? "border-violet-600 bg-violet-600 text-white shadow-sm"
                    : "border-ink/15 bg-white text-ink hover:border-violet-400"
                }`}
              >
                {isMulti && (
                  <span
                    aria-hidden
                    className={`flex h-4 w-4 items-center justify-center rounded border ${on ? "border-white bg-white text-violet-600" : "border-ink/30"}`}
                  >
                    {on && (
                      <svg viewBox="0 0 16 16" className="h-3 w-3">
                        <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                )}
                {o}
              </button>
            );
          })}
        </div>
      );
    }
    case "date":
      return <input {...textProps} type="date" onChange={(e) => picked(e.target.value)} className={`${inputClass} max-w-56`} />;
    default: {
      const type = item.fieldType === "phone" ? "tel" : item.fieldType === "url" ? "url" : item.fieldType === "email" ? "email" : "text";
      return (
        <input
          {...textProps}
          type={type}
          inputMode={type === "tel" ? "tel" : type === "url" ? "url" : type === "email" ? "email" : undefined}
          placeholder={type === "url" ? "https://" : undefined}
          autoComplete="off"
          onChange={(e) => typed(e.target.value)}
          className={inputClass}
        />
      );
    }
  }
}
