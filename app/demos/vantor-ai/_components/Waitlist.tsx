"use client";

import { useActionState, useOptimistic, startTransition } from "react";
import { joinWaitlist, type WaitlistState } from "../actions";

const BASE_COUNT = 12408;
const INITIAL: WaitlistState = { status: "idle", message: "" };

/** Waitlist form: a Server Action with validation, plus a counter that ticks up the instant you submit. */
export default function Waitlist() {
  const [state, formAction, pending] = useActionState(joinWaitlist, INITIAL);
  const confirmed = BASE_COUNT + (state.status === "success" ? 1 : 0);
  // Optimistic UI: show the new count right away; React rolls it back if the action fails.
  const [count, addOne] = useOptimistic<number, void>(confirmed, (n) => n + 1);

  function submit(formData: FormData) {
    startTransition(() => {
      const email = String(formData.get("email") ?? "");
      const company = String(formData.get("company") ?? "");
      if (email.includes("@") && company.trim().length >= 2) addOne();
      formAction(formData);
    });
  }

  if (state.status === "success") {
    return (
      <div className="v-panel v-fade-in rounded-3xl p-8 text-center">
        <p className="text-4xl" aria-hidden>
          🎉
        </p>
        <h3 className="mt-3 text-2xl font-bold">You&rsquo;re #{state.position?.toLocaleString("en-US")} in line</h3>
        <p className="mt-2 text-[var(--v-muted)]">{state.message}</p>
        <p className="v-mono mt-6 text-xs text-[var(--v-muted)]">{count.toLocaleString("en-US")} teams on the waitlist</p>
        <p className="mt-4 text-xs text-[var(--v-muted)]">Demo only: nothing was saved or sent.</p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={submit} noValidate className="v-panel rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-semibold">Work email</span>
          <input
            name="email"
            type="email"
            autoComplete="off"
            defaultValue={state.values?.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "vantor-email-error" : undefined}
            placeholder="dana@company.com"
            className={`mt-1.5 w-full rounded-xl border bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:text-[var(--v-muted)] focus:border-[var(--v-accent)] ${
              errors.email ? "border-rose-400" : "border-[var(--v-line)]"
            }`}
          />
          {errors.email && (
            <span id="vantor-email-error" className="mt-1 block text-xs text-rose-400">
              {errors.email}
            </span>
          )}
        </label>
        <label className="block text-sm">
          <span className="font-semibold">Company</span>
          <input
            name="company"
            autoComplete="off"
            defaultValue={state.values?.company}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "vantor-company-error" : undefined}
            placeholder="Example Co."
            className={`mt-1.5 w-full rounded-xl border bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:text-[var(--v-muted)] focus:border-[var(--v-accent)] ${
              errors.company ? "border-rose-400" : "border-[var(--v-line)]"
            }`}
          />
          {errors.company && (
            <span id="vantor-company-error" className="mt-1 block text-xs text-rose-400">
              {errors.company}
            </span>
          )}
        </label>
      </div>
      {state.status === "error" && (
        <p className="mt-4 text-sm text-rose-400" role="alert">
          {state.message}
        </p>
      )}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="v-mono text-xs text-[var(--v-muted)]" aria-live="polite">
          <span className="font-bold text-[var(--v-text)]">{count.toLocaleString("en-US")}</span> teams on the waitlist
        </p>
        <button type="submit" disabled={pending} className="v-button w-full rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-70 sm:w-auto">
          {pending ? "Reserving your spot…" : "Get early access"}
        </button>
      </div>
    </form>
  );
}
