"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during the server render and hydration, true after: for reading the browser only once it's safe. */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}

function subscribeMinute(onChange: () => void) {
  const timer = setInterval(onChange, 30_000);
  return () => clearInterval(timer);
}

/** The current minute (as a number) once hydrated, or null on the server. Updates every 30 seconds. */
export function useMinute(): number | null {
  return useSyncExternalStore(subscribeMinute, () => Math.floor(Date.now() / 60_000), () => null);
}

/** Weekday name and "HH:MM" in the bakery's time zone (Central). */
export function bakeryClock(minute: number) {
  const date = new Date(minute * 60_000);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: get("weekday"), time: `${get("hour")}:${get("minute")}` };
}
