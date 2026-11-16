"use client";

import { Globe, siteCard } from "../components/SiteAddresses";

type Act = (body: Record<string, unknown>) => Promise<{ error?: string }>;

const input =
  "w-full min-w-0 rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-white focus:ring-4 focus:ring-white/40";

/** "example.com" → "https://example.com"; blank stays blank. */
function normalize(v: string) {
  const t = v.trim();
  if (!t) return "";
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `https://${t}`;
}

function Field({ id, label, hint, value, onSave }: { id: string; label: string; hint: string; value: string; onSave: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/85">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          key={`${id}-${value}`}
          type="text"
          inputMode="url"
          defaultValue={value}
          placeholder={hint}
          onBlur={(e) => {
            const next = normalize(e.target.value);
            e.target.value = next;
            if (next !== value) onSave(next);
          }}
          className={input}
        />
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm hover:bg-violet-50"
          >
            Open
          </a>
        )}
      </div>
    </div>
  );
}

/** Admin side of the site addresses: both fields, saved when you leave a field.
 *  The client's page shows only the ones filled in (components/SiteAddresses). */
export default function SiteLinks({ testUrl, liveUrl, clientFirst, act }: { testUrl: string; liveUrl: string; clientFirst: string; act: Act }) {
  return (
    <section className={siteCard}>
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
        <Globe />
        Site addresses
      </h2>
      <p className="mt-1 text-sm text-white/85">
        Filled-in addresses show on {clientFirst}&rsquo;s page as links, below your notes. Leave one blank to hide it.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="site-test" label="Test site" hint="e.g. client-name.pages.dev" value={testUrl} onSave={(v) => void act({ action: "updateClient", testUrl: v })} />
        <Field id="site-live" label="Permanent site" hint="e.g. clientname.com" value={liveUrl} onSave={(v) => void act({ action: "updateClient", liveUrl: v })} />
      </div>
    </section>
  );
}
