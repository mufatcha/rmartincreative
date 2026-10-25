"use client";

import Link from "next/link";
import QuoteModal from "../components/QuoteModal";
import { BUSINESS_NAME } from "../lib/business";
import { useNotes } from "./notes";

/** The slim bar on every demo page: who built it, the notes switch, and a quote button. */
export default function DemoBar() {
  const { on, toggle } = useNotes();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[60] flex justify-center px-3 font-sans">
      <div className="pointer-events-auto flex max-w-full items-center gap-2 rounded-full bg-[#201a2e]/95 py-1.5 pl-4 pr-1.5 text-xs text-white shadow-2xl ring-1 ring-white/15 backdrop-blur sm:gap-4 sm:text-sm">
        <Link href="/services/website-design-development" className="min-w-0 truncate hover:text-violet-300">
          <span className="hidden sm:inline">Demo site · built by </span>
          <span className="font-semibold">{BUSINESS_NAME}</span>
        </Link>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={toggle}
          className="flex shrink-0 items-center gap-2 rounded-full px-2 py-1 hover:bg-white/10"
        >
          <span
            className={`relative h-4 w-7 rounded-full transition-colors ${on ? "bg-violet-500" : "bg-white/25"}`}
            aria-hidden
          >
            <span
              className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${on ? "left-3.5" : "left-0.5"}`}
            />
          </span>
          How it&rsquo;s built
        </button>
        <QuoteModal
          initialServiceId="website"
          triggerClassName="shrink-0 rounded-full bg-white px-3.5 py-1.5 font-semibold text-[#201a2e] transition-transform hover:scale-105"
        >
          Get a quote
        </QuoteModal>
      </div>
    </div>
  );
}
