"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ClientSummary } from "../../lib/onboarding/types";
import { ProgressBar } from "../components/ItemView";
import { ago } from "./[slug]/AdminClient";
import GuideLinks from "./GuideLinks";

export default function AdminHome({ initial, siteUrl }: { initial: ClientSummary[]; siteUrl: string }) {
  const router = useRouter();
  // Loaded with the page; no polling (creating a client opens its own page).
  const clients = initial;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  async function create() {
    setCreating(true);
    setError(null);
    const res = await fetch("/api/start/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createClient", name, email }),
    });
    const data = (await res.json()) as { slug?: string; error?: string };
    setCreating(false);
    if (data.slug) router.push(`/start/admin/${data.slug}`);
    else setError(data.error ?? "Couldn't create the page.");
  }

  const shown = clients.filter((c) => showArchived || !c.archived);

  return (
    <section className="pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Client onboarding</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void create();
          }}
          className="mt-6 rounded-3xl border border-ink/10 bg-white p-5 shadow-sm"
        >
          <h2 className="font-bold">New client page</h2>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="new-name" className="sr-only">
              Name
            </label>
            <input
              id="new-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client name"
              required
              className="min-w-0 flex-1 rounded-xl border border-ink/15 px-3.5 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
            <label htmlFor="new-email" className="sr-only">
              Email
            </label>
            <input
              id="new-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="min-w-0 flex-1 rounded-xl border border-ink/15 px-3.5 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
            <button disabled={creating} className="rounded-full bg-violet-600 px-5 py-2.5 font-semibold text-white hover:bg-violet-700 disabled:opacity-50">
              {creating ? "Creating…" : "Create"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
          <p className="mt-2 text-xs text-ink-soft">The link is made from the name plus a random code, like /start/chrismelby-7x42k.</p>
        </form>

        <ul className="mt-6 space-y-3">
          {shown.length === 0 && <li className="text-ink-soft">No clients yet.</li>}
          {shown.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/start/admin/${c.slug}`}
                className={`block rounded-3xl border border-ink/10 bg-white p-5 shadow-sm transition hover:border-violet-300 ${c.archived ? "opacity-60" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-lg font-bold">{c.name}</span>
                  {c.unread > 0 && (
                    <span className="rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-bold text-white">
                      {c.unread} new message{c.unread === 1 ? "" : "s"}
                    </span>
                  )}
                  {c.archived && <span className="text-xs font-semibold text-ink-soft">Archived</span>}
                  <span className="ml-auto text-sm text-ink-soft">/start/{c.slug}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar done={c.done} total={c.total} className="flex-1" />
                  <span className="text-sm font-medium text-ink-soft">
                    {c.done}/{c.total}
                  </span>
                </div>
                <p className="mt-2 text-xs text-ink-soft">
                  Opened {ago(c.lastSeenAt)} · last change {ago(c.lastActivity)}
                  {!c.email && " · no email yet"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        {clients.some((c) => c.archived) && (
          <button type="button" onClick={() => setShowArchived((s) => !s)} className="mt-4 text-sm font-medium text-ink-soft hover:text-ink">
            {showArchived ? "Hide archived" : "Show archived"}
          </button>
        )}

        <GuideLinks siteUrl={siteUrl} />
      </div>
    </section>
  );
}
