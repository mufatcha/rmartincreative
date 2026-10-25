"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

/** Asks the server for fresh numbers without reloading the page. */
export default function RefreshButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      className="flex items-center gap-1.5 rounded-lg border border-[var(--v-line)] px-2.5 py-1 text-xs font-medium transition-colors hover:border-[var(--v-accent)] disabled:opacity-60"
    >
      <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M16 10a6 6 0 1 1-1.8-4.3M16 3v4h-4" />
      </svg>
      {pending ? "Updating…" : "Refresh"}
    </button>
  );
}
