"use client";

import { useState } from "react";
import { GUIDES, cleanDomain, guidePath, type Guide } from "../../lib/onboarding/guides";

function GuideRow({ guide, siteUrl }: { guide: Guide; siteUrl: string }) {
  const [domain, setDomain] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const clean = cleanDomain(domain);
  const url = `${siteUrl}${guidePath(guide.slug)}${guide.takesDomain && clean ? `?domain=${encodeURIComponent(clean)}` : ""}`;

  const copy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <li className="py-4">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <a href={url} target="_blank" rel="noopener" className="font-semibold text-ink hover:text-violet-700">
          {guide.title}
        </a>
        <span className="text-xs text-ink-soft">about {guide.minutes} min</span>
      </div>
      <p className="mt-0.5 text-sm text-ink-soft">{guide.description}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        {guide.takesDomain && (
          <>
            <label htmlFor={`domain-${guide.slug}`} className="sr-only">
              Client&rsquo;s domain
            </label>
            <input
              id={`domain-${guide.slug}`}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="client's domain (optional)"
              className={`w-56 rounded-lg border px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 ${
                domain && !clean ? "border-rose-300" : "border-ink/15 focus:border-violet-500"
              }`}
            />
          </>
        )}
        <button type="button" onClick={() => copy("link", url)} className="rounded-full bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-violet-700">
          {copied === "link" ? "Copied" : "Copy link"}
        </button>
        <button
          type="button"
          // A [text](link), shown as a clickable title in notes, plan details, and task help text.
          onClick={() => copy("note", `[${guide.title}](${url})`)}
          title="Copies [title](link), which shows as a clickable title in notes, plan details, and help text"
          className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-semibold hover:border-violet-400"
        >
          {copied === "note" ? "Copied" : "Copy for a note"}
        </button>
        <a href={url} target="_blank" rel="noopener" className="px-1 text-xs font-semibold text-violet-700 hover:text-violet-800">
          Open
        </a>
      </div>
      {guide.sections && (
        <div className="mt-3 rounded-2xl bg-paper-tint/50 p-3">
          <p className="text-xs font-semibold text-ink-soft">Link one section on its own:</p>
          <ul className="mt-1.5 space-y-1.5">
            {guide.sections.map((sec) => {
              const secUrl = `${url}#${sec.id}`;
              return (
                <li key={sec.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <a href={secUrl} target="_blank" rel="noopener" className="min-w-0 flex-1 font-medium text-ink hover:text-violet-700">
                    {sec.title} <span className="text-xs text-ink-soft">#{sec.id}</span>
                  </a>
                  <button type="button" onClick={() => copy(`link-${sec.id}`, secUrl)} className="text-xs font-semibold text-violet-700 hover:text-violet-800">
                    {copied === `link-${sec.id}` ? "Copied" : "Copy link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(`note-${sec.id}`, `[${guide.title}: ${sec.title}](${secUrl})`)}
                    className="text-xs font-semibold text-ink-soft hover:text-ink"
                  >
                    {copied === `note-${sec.id}` ? "Copied" : "Copy for a note"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}

/** The client guides (app/start/onboarding-tasks), with links ready to paste. */
export default function GuideLinks({ siteUrl }: { siteUrl: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
      <h2 className="font-bold">Client guides</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Step-by-step pages to send clients (unlisted, not indexed). &ldquo;Copy for a note&rdquo; pastes as a clickable title in notes, plan items,
        and task help text. All guides:{" "}
        <a href="/start/onboarding-tasks" target="_blank" rel="noopener" className="font-medium text-violet-700 hover:text-violet-800">
          /start/onboarding-tasks
        </a>
      </p>
      <ul className="divide-y divide-ink/10">
        {GUIDES.map((g) => (
          <GuideRow key={g.slug} guide={g} siteUrl={siteUrl} />
        ))}
      </ul>
    </section>
  );
}
