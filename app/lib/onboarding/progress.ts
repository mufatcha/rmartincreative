// What counts as "done" on an onboarding page. Shared by the page, the admin
// pages, and the server, so every checklist agrees.
import type { AnswerValue, Item, PortalState } from "./types";

export function hasAnswer(value: AnswerValue | undefined): boolean {
  if (value === undefined) return false;
  return Array.isArray(value) ? value.length > 0 : value.trim() !== "";
}

/** null for notes, which aren't something to complete. */
export function itemDone(item: Item, state: Pick<PortalState, "responses" | "tasks" | "files">): boolean | null {
  switch (item.kind) {
    case "question":
      return hasAnswer(state.responses[item.id]?.value);
    case "task":
      return state.tasks[item.id]?.done ?? false;
    case "upload":
      return state.files.some((f) => f.itemId === item.id);
    default:
      return null;
  }
}

export function progress(items: Item[], state: Pick<PortalState, "responses" | "tasks" | "files">) {
  let done = 0;
  let total = 0;
  for (const item of items) {
    const d = itemDone(item, state);
    if (d === null) continue;
    total += 1;
    if (d) done += 1;
  }
  return { done, total };
}

/** An answer as one line of text (emails and the admin view). */
export function answerText(value: AnswerValue | undefined): string {
  if (value === undefined) return "";
  return Array.isArray(value) ? value.join(", ") : value;
}
