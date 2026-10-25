"use client";

import { useDeferredValue } from "react";
import { useUrlParam } from "../../client-store";

const CATEGORIES = ["All", "Communication", "Data", "Sales", "Support", "Finance"] as const;
type Category = (typeof CATEGORIES)[number];

const ITEMS: { name: string; category: Exclude<Category, "All">; blurb: string; color: string }[] = [
  { name: "Team Chat", category: "Communication", blurb: "Post updates and take requests in channels.", color: "from-violet-500 to-fuchsia-500" },
  { name: "Email", category: "Communication", blurb: "Read, sort, and draft replies from shared inboxes.", color: "from-sky-500 to-cyan-400" },
  { name: "Calendar", category: "Communication", blurb: "Find times, book meetings, send reminders.", color: "from-emerald-500 to-teal-400" },
  { name: "Video Calls", category: "Communication", blurb: "Join, record, and summarize meetings.", color: "from-indigo-500 to-blue-500" },
  { name: "SMS", category: "Communication", blurb: "Text customers updates and confirmations.", color: "from-pink-500 to-rose-400" },
  { name: "Spreadsheets", category: "Data", blurb: "Read and update rows, build reports.", color: "from-green-500 to-emerald-400" },
  { name: "Docs", category: "Data", blurb: "Draft, edit, and file documents.", color: "from-blue-500 to-indigo-400" },
  { name: "Cloud Storage", category: "Data", blurb: "Find, organize, and share files.", color: "from-amber-500 to-orange-400" },
  { name: "SQL Database", category: "Data", blurb: "Query your data in plain English.", color: "from-slate-500 to-slate-400" },
  { name: "Data Warehouse", category: "Data", blurb: "Run scheduled analysis across sources.", color: "from-cyan-500 to-sky-400" },
  { name: "CRM", category: "Sales", blurb: "Log calls, update deals, enrich contacts.", color: "from-orange-500 to-amber-400" },
  { name: "Proposals", category: "Sales", blurb: "Generate quotes and proposals from templates.", color: "from-fuchsia-500 to-pink-400" },
  { name: "E-signature", category: "Sales", blurb: "Send contracts and track signatures.", color: "from-yellow-500 to-amber-400" },
  { name: "Lead Forms", category: "Sales", blurb: "Qualify and route new leads instantly.", color: "from-lime-500 to-green-400" },
  { name: "Help Desk", category: "Support", blurb: "Triage, tag, and answer tickets.", color: "from-teal-500 to-cyan-400" },
  { name: "Live Chat", category: "Support", blurb: "Answer website visitors around the clock.", color: "from-violet-500 to-indigo-400" },
  { name: "Knowledge Base", category: "Support", blurb: "Keep help articles accurate and current.", color: "from-sky-500 to-blue-400" },
  { name: "Reviews", category: "Support", blurb: "Monitor and respond to customer reviews.", color: "from-rose-500 to-pink-400" },
  { name: "Accounting", category: "Finance", blurb: "Reconcile transactions and close the books.", color: "from-emerald-500 to-green-400" },
  { name: "Payments", category: "Finance", blurb: "Track payouts, refunds, and disputes.", color: "from-indigo-500 to-violet-400" },
  { name: "Invoicing", category: "Finance", blurb: "Send invoices and chase late payments.", color: "from-blue-500 to-cyan-400" },
  { name: "Payroll", category: "Finance", blurb: "Prepare payroll runs for approval.", color: "from-amber-500 to-yellow-400" },
  { name: "Expenses", category: "Finance", blurb: "Match receipts to card charges.", color: "from-pink-500 to-fuchsia-400" },
  { name: "Banking", category: "Finance", blurb: "Watch balances and flag unusual activity.", color: "from-cyan-500 to-teal-400" },
];

/** Instant search: filters on every keystroke, and the filter is saved in the URL so a view can be shared. */
export default function Integrations() {
  // The search lives in the URL (?q=…&cat=…), so a filtered view can be shared as a link.
  const [query, setQuery] = useUrlParam("q");
  const [catParam, setCategory] = useUrlParam("cat", "All");
  const category: Category = (CATEGORIES as readonly string[]).includes(catParam) ? (catParam as Category) : "All";
  // The input updates immediately; the (heavier) results list catches up a beat later.
  const deferredQuery = useDeferredValue(query);

  const q = deferredQuery.trim().toLowerCase();
  const results = ITEMS.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      (!q || item.name.toLowerCase().includes(q) || item.blurb.toLowerCase().includes(q))
  );
  const stale = query !== deferredQuery;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="v-panel flex w-full items-center gap-2 rounded-xl px-3 sm:max-w-xs">
          <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[var(--v-muted)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" />
          </svg>
          <span className="sr-only">Search integrations</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 24 integrations…"
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-[var(--v-muted)]"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                category === c ? "v-button text-white" : "border border-[var(--v-line)] text-[var(--v-muted)] hover:text-[var(--v-text)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="v-mono mt-4 text-xs text-[var(--v-muted)]" aria-live="polite">
        Showing {results.length} of {ITEMS.length}
      </p>
      <ul className={`mt-4 grid gap-3 transition-opacity sm:grid-cols-2 lg:grid-cols-4 ${stale ? "opacity-60" : ""}`}>
        {results.map((item) => (
          <li key={item.name} className="v-panel v-fade-in rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className={`h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br ${item.color}`} aria-hidden />
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="v-mono text-[10px] uppercase tracking-widest text-[var(--v-muted)]">{item.category}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[var(--v-muted)]">{item.blurb}</p>
          </li>
        ))}
        {results.length === 0 && (
          <li className="col-span-full rounded-2xl border border-dashed border-[var(--v-line)] p-8 text-center text-sm text-[var(--v-muted)]">
            No integrations match &ldquo;{query}&rdquo;.{" "}
            <button type="button" className="font-semibold text-[var(--v-text)] underline" onClick={() => { setQuery(""); setCategory("All"); }}>
              Clear filters
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
