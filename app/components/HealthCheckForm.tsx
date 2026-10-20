"use client";

import { useState } from "react";
import { trackQuoteSubmitted } from "./Analytics";
import Turnstile, { turnstileEnabled } from "./Turnstile";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";

// The free health check request form. Sends through the same /api/quote route as the
// quote form (filed under Search + AI Discovery), so requests land in the same inbox.

export const HEALTH_CHECK_FORM_ID = "claim";

/** Scrolls to the request form and puts the cursor in its first field. */
export function ClaimButton({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <a
      href={`#${HEALTH_CHECK_FORM_ID}`}
      className={className}
      onClick={(e) => {
        const form = document.getElementById(HEALTH_CHECK_FORM_ID);
        if (!form) return; // Fall back to the plain anchor link.
        e.preventDefault();
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${HEALTH_CHECK_FORM_ID}`);
        form.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}

const input =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20";

export default function HealthCheckForm({ ctaClassName }: { ctaClassName: string }) {
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [reach, setReach] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const [tokenKey, setTokenKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const isEmail = reach.includes("@");
    if (!isEmail && reach.replace(/\D/g, "").length < 10) {
      setError("Please enter an email address or a phone number with area code.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: "search-ai",
          answers: { siteUrl: site, goal: "Free Website + Search Health Check" },
          contact: isEmail ? { name, email: reach } : { name, phone: reach },
          turnstileToken: token,
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Your request couldn't be sent.");
      setSent(true);
      trackQuoteSubmitted("health-check");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your request couldn't be sent.");
      setToken("");
      setTokenKey((k) => k + 1);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-ink/10" role="status">
        <p className="text-2xl font-bold tracking-tight">Got it, thank you!</p>
        <p className="mt-3 text-ink-soft">
          I&rsquo;ll review your website and send your free report within a few business days. No sales calls, just the
          report.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/10 sm:p-8">
      <div className="space-y-5">
        <label className="block text-sm font-semibold text-ink">
          Your name
          <input className={input} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Your website
          <input
            className={input}
            value={site}
            onChange={(e) => setSite(e.target.value)}
            required
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
          />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Email or phone
          <input
            className={input}
            value={reach}
            onChange={(e) => setReach(e.target.value)}
            required
            autoComplete="email"
            placeholder="Where should I send your report?"
          />
        </label>
        {/* Honeypot: hidden from people, filled in by bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <Turnstile key={tokenKey} onToken={setToken} />
      </div>

      {error && (
        <p className="mt-4 text-sm text-rose-600" role="alert">
          {error} Or call{" "}
          <a href={BUSINESS_PHONE_TEL} className="font-semibold underline">
            {BUSINESS_PHONE_DISPLAY}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={sending || (turnstileEnabled && !token)}
        className={`mt-6 w-full justify-center disabled:opacity-60 ${ctaClassName}`}
      >
        {sending ? "Sending…" : "Send Me My Free Report"}
      </button>
      <p className="mt-4 text-center text-xs text-ink-soft">
        Your information is only used to send your report. You&rsquo;ll get it within a few business days, with zero
        follow-up pressure.
      </p>
    </form>
  );
}
