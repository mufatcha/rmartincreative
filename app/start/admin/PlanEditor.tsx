"use client";

import { useState } from "react";
import { PLAN_STAGES, PLAN_STAGE_LABELS, type PlanItem, type PlanStage } from "../../lib/onboarding/types";
import PlanView, { countPlanChanges } from "../components/PlanView";

type Act = (body: Record<string, unknown>) => Promise<{ error?: string }>;

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

function PlanForm({
  item,
  stage: initialStage = "now",
  onSave,
  onCancel,
}: {
  item?: PlanItem;
  stage?: PlanStage;
  onSave: (d: { stage: PlanStage; title: string; detail: string }) => Promise<{ error?: string }>;
  onCancel: () => void;
}) {
  const [stage, setStage] = useState<PlanStage>(item?.stage ?? initialStage);
  const [title, setTitle] = useState(item?.title ?? "");
  const [detail, setDetail] = useState(item?.detail ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        const res = await onSave({ stage, title, detail });
        setSaving(false);
        if (res.error) setError(res.error);
      }}
      className="space-y-3 rounded-2xl border border-violet-200 bg-violet-50/60 p-4"
    >
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Stage">
        {PLAN_STAGES.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={stage === s}
            onClick={() => setStage(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${stage === s ? "bg-violet-600 text-white" : "bg-white text-ink hover:bg-violet-100"}`}
          >
            {PLAN_STAGE_LABELS[s].title}
          </button>
        ))}
      </div>
      <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title, e.g. Homepage design" aria-label="Title" className={input} />
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        rows={2}
        placeholder="Details (optional). Paste a link, or write [link text](https://…)"
        aria-label="Details"
        className={`${input} field-sizing-content min-h-16`}
      />
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex gap-2">
        <button disabled={saving} className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50">
          {saving ? "Saving…" : item ? "Save" : "Add to plan"}
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
          Cancel
        </button>
      </div>
    </form>
  );
}

/** The project plan on the admin page: add, edit, restage, reorder, remove. */
export default function PlanEditor({
  plan,
  planSeenAt,
  clientFirst,
  act,
  ago,
}: {
  plan: PlanItem[];
  planSeenAt: number | null;
  clientFirst: string;
  act: Act;
  ago: (t: number | null) => string;
}) {
  const [editing, setEditing] = useState<number | "add" | null>(null);
  const [showRemoved, setShowRemoved] = useState(false);
  const live = plan.filter((p) => p.removedAt === null);
  const removed = plan.filter((p) => p.removedAt !== null);
  const pending = countPlanChanges(plan, planSeenAt);

  const iconBtn = "flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition hover:bg-paper-tint hover:text-ink";

  return (
    <section className="rounded-3xl border border-ink/10 bg-white px-5 py-6 shadow-sm sm:px-7">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="flex-1 text-xl font-bold tracking-tight">Project plan</h2>
        <span className="text-xs text-ink-soft">
          {clientFirst} last viewed it: <strong className="text-ink">{ago(planSeenAt)}</strong>
          {planSeenAt !== null && pending > 0 && ` · ${pending} change${pending === 1 ? "" : "s"} they haven't seen`}
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        Shown in a panel on their page. After their first look, anything you add, change, or remove is labeled New, Updated, or Removed until they open it again.
      </p>

      <div className="mt-5">
        {editing === "add" ? (
          <PlanForm
            onSave={async (d) => {
              const res = await act({ action: "addPlan", ...d });
              if (!res.error) setEditing(null);
              return res;
            }}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <button type="button" onClick={() => setEditing("add")} className="text-sm font-semibold text-violet-700 hover:text-violet-800">
            + Add to the plan
          </button>
        )}
      </div>

      {live.length > 0 && (
        <div className="mt-5">
          <PlanView
            plan={live}
            // Preview with the labels the client will see next time.
            seen={planSeenAt}
            tools={(item) =>
              editing === item.id ? null : (
                <div className="flex shrink-0 items-center">
                  <label className="sr-only" htmlFor={`stage-${item.id}`}>
                    Stage
                  </label>
                  <select
                    id={`stage-${item.id}`}
                    value={item.stage}
                    onChange={(e) => void act({ action: "updatePlan", id: item.id, stage: e.target.value })}
                    className="mr-1 rounded-lg border border-ink/10 bg-white px-1.5 py-1 text-xs"
                  >
                    {PLAN_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {PLAN_STAGE_LABELS[s].title}
                      </option>
                    ))}
                  </select>
                  <button type="button" aria-label="Move up" title="Move up" className={iconBtn} onClick={() => void act({ action: "movePlan", id: item.id, dir: -1 })}>
                    <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 15V5m0 0-4 4m4-4 4 4" />
                    </svg>
                  </button>
                  <button type="button" aria-label="Move down" title="Move down" className={iconBtn} onClick={() => void act({ action: "movePlan", id: item.id, dir: 1 })}>
                    <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 5v10m0 0-4-4m4 4 4-4" />
                    </svg>
                  </button>
                  <button type="button" aria-label="Edit" title="Edit" className={iconBtn} onClick={() => setEditing(item.id)}>
                    <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 16h3l8.5-8.5a2.1 2.1 0 0 0-3-3L4 13v3Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Remove"
                    title="Remove (the client sees it as Removed)"
                    className={`${iconBtn} hover:text-rose-600`}
                    onClick={() => void act({ action: "updatePlan", id: item.id, removed: true })}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 6h10M8 6V4.5h4V6m-6 0 .6 9.5h6.8L14 6" />
                    </svg>
                  </button>
                </div>
              )
            }
          />
          {typeof editing === "number" && live.some((p) => p.id === editing) && (
            <div className="mt-4">
              <PlanForm
                item={live.find((p) => p.id === editing)}
                onSave={async (d) => {
                  const res = await act({ action: "updatePlan", id: editing, ...d });
                  if (!res.error) setEditing(null);
                  return res;
                }}
                onCancel={() => setEditing(null)}
              />
            </div>
          )}
        </div>
      )}

      {removed.length > 0 && (
        <div className="mt-6 border-t border-ink/10 pt-4">
          <button type="button" onClick={() => setShowRemoved((s) => !s)} className="text-sm font-medium text-ink-soft hover:text-ink">
            {showRemoved ? "Hide" : "Show"} removed ({removed.length})
          </button>
          {showRemoved && (
            <ul className="mt-3 space-y-2">
              {removed.map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-xl bg-paper-tint/50 px-4 py-2.5 text-sm">
                  <span className="min-w-0 flex-1 text-ink-soft line-through">{p.title}</span>
                  <span className="text-xs text-ink-soft">removed {ago(p.removedAt)}</span>
                  <button type="button" onClick={() => void act({ action: "updatePlan", id: p.id, removed: false })} className="text-xs font-semibold text-violet-700 hover:text-violet-800">
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
