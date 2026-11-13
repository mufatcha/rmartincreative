"use client";

import { useState } from "react";
import { FIELD_TYPES, FIELD_TYPE_LABELS, ITEM_KINDS, KIND_LABELS, type FieldType, type Item, type ItemKind, type Section } from "../../lib/onboarding/types";

const HAS_OPTIONS: FieldType[] = ["select", "radio", "checkboxes"];

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

export type ItemDraft = { kind: ItemKind; title: string; help: string; fieldType: FieldType; options: string[]; sectionId: number };

/** Add or edit one question, task, file request, or note. */
export default function ItemEditor({
  item,
  sectionId,
  sections,
  onSave,
  onCancel,
}: {
  item?: Item;
  sectionId: number;
  sections: Section[];
  onSave: (draft: ItemDraft) => Promise<{ error?: string }>;
  onCancel: () => void;
}) {
  const [kind, setKind] = useState<ItemKind>(item?.kind ?? "question");
  const [title, setTitle] = useState(item?.title ?? "");
  const [help, setHelp] = useState(item?.help ?? "");
  const [fieldType, setFieldType] = useState<FieldType>(item?.fieldType ?? "text");
  const [options, setOptions] = useState((item?.options ?? []).join("\n"));
  const [section, setSection] = useState(item?.sectionId ?? sectionId);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit() {
    setSaving(true);
    setError(null);
    const res = await onSave({
      kind,
      title,
      help,
      fieldType,
      options: options.split("\n").map((o) => o.trim()).filter(Boolean),
      sectionId: section,
    });
    setSaving(false);
    if (res.error) setError(res.error);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="my-3 space-y-3 rounded-2xl border border-violet-200 bg-violet-50/60 p-4"
    >
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Type">
        {ITEM_KINDS.map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={kind === k}
            onClick={() => setKind(k)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${kind === k ? "bg-violet-600 text-white" : "bg-white text-ink hover:bg-violet-100"}`}
          >
            {KIND_LABELS[k]}
          </button>
        ))}
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-ink-soft" htmlFor="item-title">
          {kind === "question" ? "Question" : kind === "task" ? "Task" : kind === "upload" ? "What to upload" : "Heading (optional)"}
        </label>
        <input id="item-title" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} className={input} />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-ink-soft" htmlFor="item-help">
          {kind === "note" ? "Note" : "Help text (optional)"}
        </label>
        <textarea id="item-help" rows={2} value={help} onChange={(e) => setHelp(e.target.value)} className={`${input} field-sizing-content min-h-16`} />
      </div>
      {kind === "question" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-soft" htmlFor="item-field">
              Answer type
            </label>
            <select id="item-field" value={fieldType} onChange={(e) => setFieldType(e.target.value as FieldType)} className={input}>
              {FIELD_TYPES.map((f) => (
                <option key={f} value={f}>
                  {FIELD_TYPE_LABELS[f]}
                </option>
              ))}
            </select>
          </div>
          {HAS_OPTIONS.includes(fieldType) && (
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-soft" htmlFor="item-options">
                Choices (one per line)
              </label>
              <textarea id="item-options" rows={3} value={options} onChange={(e) => setOptions(e.target.value)} className={`${input} field-sizing-content min-h-20`} />
            </div>
          )}
        </div>
      )}
      {item && sections.length > 1 && (
        <div>
          <label className="mb-1 block text-xs font-semibold text-ink-soft" htmlFor="item-section">
            Section
          </label>
          <select id="item-section" value={section} onChange={(e) => setSection(Number(e.target.value))} className={`${input} max-w-xs`}>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      )}
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex items-center gap-2">
        <button type="submit" disabled={saving} className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50">
          {saving ? "Saving…" : item ? "Save changes" : "Add"}
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
          Cancel
        </button>
      </div>
      {!item && kind !== "note" && (
        <p className="text-xs text-ink-soft">The client isn&rsquo;t emailed about this until you press &ldquo;Share updates&rdquo;.</p>
      )}
    </form>
  );
}
