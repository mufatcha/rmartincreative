"use client";

import { useCallback, useSyncExternalStore } from "react";

// Tiny stores for demo state that lives outside React: a URL search param (so a
// view can be shared as a link) or a localStorage value (so it survives a reload).
// Both read as their default on the server and during hydration, then switch to
// the real value, so the prerendered HTML always matches.

const URL_EVENT = "demo-url-change";
const STORAGE_EVENT = "demo-storage-change";

function subscribeTo(event: string) {
  return (onChange: () => void) => {
    window.addEventListener(event, onChange);
    window.addEventListener("popstate", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(event, onChange);
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("storage", onChange);
    };
  };
}
const subscribeUrl = subscribeTo(URL_EVENT);
const subscribeStorage = subscribeTo(STORAGE_EVENT);

/** A URL search param as state. Setting it to the fallback removes it from the URL. */
export function useUrlParam(key: string, fallback = ""): [string, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribeUrl,
    () => new URLSearchParams(window.location.search).get(key) ?? fallback,
    () => fallback
  );

  const set = useCallback(
    (next: string) => {
      const url = new URL(window.location.href);
      if (next === fallback) url.searchParams.delete(key);
      else url.searchParams.set(key, next);
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new Event(URL_EVENT));
    },
    [key, fallback]
  );

  return [value, set];
}

/** Used when localStorage is blocked (some private windows), so the value still works for the visit. */
const memory = new Map<string, string>();

/** A localStorage string as state. */
export function useStoredValue(key: string, fallback: string): [string, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        return localStorage.getItem(key) ?? memory.get(key) ?? fallback;
      } catch {
        return memory.get(key) ?? fallback;
      }
    },
    () => fallback
  );

  const set = useCallback(
    (next: string) => {
      memory.set(key, next);
      try {
        localStorage.setItem(key, next);
      } catch {}
      window.dispatchEvent(new Event(STORAGE_EVENT));
    },
    [key]
  );

  return [value, set];
}
