"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AnswerValue, PortalState } from "../../lib/onboarding/types";

export type SaveStatus = "idle" | "saving" | "saved" | "retrying" | "error";

type Result = { ok?: boolean; error?: string; [k: string]: unknown };

/** Local changes win over polled data for this long, so a poll that was already
 *  in flight when you typed can't put the old answer back. */
const LOCAL_WINS_MS = 20_000;

/**
 * Page state for an onboarding page (client or admin): polls the server, posts
 * changes with retries, and reports one save status for the whole page.
 */
export function usePortal<S extends PortalState>(
  initial: S,
  { stateUrl, postUrl, extra = {} }: { stateUrl: string; postUrl: string; extra?: Record<string, unknown> }
) {
  const [server, setServer] = useState<S>(initial);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastError, setLastError] = useState<string | null>(null);
  const pending = useRef(0);
  const [localResponses, setLocalResponses] = useState<Record<number, { value: AnswerValue; at: number }>>({});
  const [localTasks, setLocalTasks] = useState<Record<number, { done: boolean; at: number }>>({});
  const extraRef = useRef(extra);
  const versionRef = useRef(initial.version);
  useEffect(() => {
    extraRef.current = extra;
  });

  const refresh = useCallback(async () => {
    try {
      const visible = typeof document !== "undefined" && document.visibilityState === "visible";
      const sep = stateUrl.includes("?") ? "&" : "?";
      const res = await fetch(`${stateUrl}${sep}visible=${visible ? 1 : 0}&v=${versionRef.current}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as S | { unchanged: true };
      const cutoff = Date.now() - LOCAL_WINS_MS;
      const prune = <T extends { at: number }>(map: Record<number, T>) => {
        const kept = Object.entries(map).filter(([, v]) => v.at > cutoff);
        return kept.length === Object.keys(map).length ? map : Object.fromEntries(kept);
      };
      if (!("unchanged" in data)) {
        versionRef.current = data.version;
        setServer(data);
      }
      setLocalResponses(prune);
      setLocalTasks(prune);
    } catch {
      // Offline for a moment; the next poll will catch up.
    }
  }, [stateUrl]);

  // Poll: every 10s while the tab is visible, every 60s in the background, and
  // right away when it comes back into view.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(
        async () => {
          await refresh();
          schedule();
        },
        document.visibilityState === "visible" ? 10_000 : 60_000
      );
    };
    const onVisibility = () => {
      clearTimeout(timer);
      if (document.visibilityState === "visible") void refresh();
      schedule();
    };
    // (No fetch on mount: the page is server-rendered with fresh state.)
    schedule();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  /** Posts one change. Retries network and server errors with backoff; a 400
   *  (the change itself was refused) isn't retried. */
  const post = useCallback(
    async (body: Record<string, unknown>, { keepalive = false }: { keepalive?: boolean } = {}): Promise<Result> => {
      pending.current += 1;
      setStatus("saving");
      let attempt = 0;
      let result: Result = { error: "Couldn't save." };
      while (attempt < 6) {
        try {
          const res = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...extraRef.current, ...body }),
            keepalive,
          });
          result = (await res.json().catch(() => ({ error: "Couldn't save." }))) as Result;
          if (res.ok || (res.status >= 400 && res.status < 500)) break;
        } catch {
          result = { error: "You seem to be offline." };
        }
        attempt += 1;
        setStatus("retrying");
        await new Promise((r) => setTimeout(r, Math.min(30_000, 1000 * 2 ** attempt)));
      }
      pending.current -= 1;
      if (result.error) {
        setLastError(result.error);
        setStatus("error");
      } else if (pending.current === 0) {
        setLastError(null);
        setStatus("saved");
      }
      return result;
    },
    [postUrl]
  );

  const saveAnswer = useCallback(
    (itemId: number, value: AnswerValue, opts?: { keepalive?: boolean }) => {
      setLocalResponses((m) => ({ ...m, [itemId]: { value, at: Date.now() } }));
      return post({ action: "answer", itemId, value }, opts);
    },
    [post]
  );

  const setTask = useCallback(
    (itemId: number, done: boolean) => {
      setLocalTasks((m) => ({ ...m, [itemId]: { done, at: Date.now() } }));
      return post({ action: "task", itemId, done });
    },
    [post]
  );

  // The server state with recent local changes laid on top (refresh() drops
  // them once they're old enough that the server has caught up).
  const state = useMemo(() => {
    const r = Object.entries(localResponses);
    const t = Object.entries(localTasks);
    if (!r.length && !t.length) return server;
    const merged: S = { ...server, responses: { ...server.responses }, tasks: { ...server.tasks } };
    for (const [id, v] of r) merged.responses[Number(id)] = { value: v.value, updatedAt: v.at };
    for (const [id, v] of t) {
      merged.tasks[Number(id)] = { done: v.done, doneBy: server.tasks[Number(id)]?.doneBy ?? "client", updatedAt: v.at };
    }
    return merged;
  }, [server, localResponses, localTasks]);

  return { state, setServer, refresh, post, saveAnswer, setTask, status, lastError };
}
