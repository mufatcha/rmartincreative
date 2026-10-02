"use client";

import { useEffect, useState } from "react";
import { IconSnowflake } from "./icons";
import {
  CARD_EXAMPLES,
  CHRISTMAS_SPECIAL,
  christmasSpecialActive,
  christmasSpecialDiscount,
  usd,
} from "../lib/data/pricing";

// The early-bird special banner. Pages only render it while the special is
// running (and rebuild hourly), and this component also checks the clock in
// the browser, so a visitor never sees it after it ends — even on a cached page.
export default function ChristmasSpecial({
  tone = "light",
  showExamples = false,
  className = "",
}: {
  tone?: "light" | "dark";
  showExamples?: boolean;
  className?: string;
}) {
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    // Hide it at the deadline — immediately if that's already passed (a cached
    // page), or later if the page is still open when the special ends.
    const msLeft = christmasSpecialActive() ? new Date(CHRISTMAS_SPECIAL.endsAt).getTime() - Date.now() : 0;
    if (msLeft >= 2 ** 31) return; // more than ~24 days away; the hourly rebuild handles it
    const timer = setTimeout(() => setEnded(true), msLeft);
    return () => clearTimeout(timer);
  }, []);

  if (ended) return null;

  const dark = tone === "dark";
  const { lastDay, twoOrMoreSidesOff, oneSideOff } = CHRISTMAS_SPECIAL;

  return (
    <div
      className={`rounded-2xl p-6 ring-1 ${
        dark ? "bg-white/10 text-white ring-white/15" : "bg-rose-50 text-ink ring-rose-200"
      } ${className}`}
    >
      <p
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-amber-300" : "text-rose-600"
        }`}
      >
        <IconSnowflake className="h-3.5 w-3.5" />
        Early-bird Christmas special
      </p>
      <p className={`mt-2 leading-relaxed ${dark ? "text-white/85" : "text-ink"}`}>
        Book your Christmas cards by {lastDay} and save on design:{" "}
        <strong>{usd(twoOrMoreSidesOff)} off</strong> cards with two or more designed sides, or{" "}
        <strong>{usd(oneSideOff)} off</strong> cards with one, folded or flat.
      </p>

      {showExamples && (
        <ul className={`mt-4 space-y-1.5 text-sm ${dark ? "text-white/80" : "text-ink-soft"}`}>
          {CARD_EXAMPLES.map((e) => {
            const off = christmasSpecialDiscount(e.designedSides);
            if (off === 0) return null;
            return (
              <li key={e.label} className="flex items-baseline justify-between gap-6">
                <span>{e.label}</span>
                <span className="shrink-0">
                  <s className="opacity-60">{usd(e.price)}</s>{" "}
                  <span className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{usd(e.price - off)}</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <p className={`mt-3 text-xs ${dark ? "text-white/60" : "text-ink-soft"}`}>
        Design prices; printing is extra. Ends {lastDay}.
      </p>
    </div>
  );
}
