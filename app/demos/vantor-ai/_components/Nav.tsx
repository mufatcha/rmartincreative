"use client";

import { useEffect, useState } from "react";
import { useShell } from "./VantorShell";

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#chat", label: "Try it" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
];

export function VantorLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="vantor-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <path d="M4 6h7l5 13 5-13h7L19 27h-6z" fill="url(#vantor-logo)" />
    </svg>
  );
}

export default function Nav() {
  const { theme, toggleTheme, openPalette } = useShell();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled ? "v-panel shadow-lg" : "border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <VantorLogo className="h-7 w-7" />
          Vantor
          <span className="v-mono rounded-md border border-[var(--v-line)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--v-muted)]">
            BETA
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-[var(--v-muted)] md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[var(--v-text)]">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="v-mono flex items-center gap-2 rounded-lg border border-[var(--v-line)] px-2.5 py-1.5 text-xs text-[var(--v-muted)] transition-colors hover:text-[var(--v-text)]"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 4 4" />
            </svg>
            <span className="hidden sm:inline">⌘K</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--v-line)] text-[var(--v-muted)] transition-colors hover:text-[var(--v-text)]"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M10 3.5a1 1 0 0 1 1 1V5a1 1 0 1 1-2 0v-.5a1 1 0 0 1 1-1Zm0 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm5.3-8.8a1 1 0 0 1 0 1.4l-.36.36a1 1 0 1 1-1.41-1.41l.36-.36a1 1 0 0 1 1.41 0ZM16.5 10a1 1 0 0 1-1 1H15a1 1 0 1 1 0-2h.5a1 1 0 0 1 1 1ZM10 14a1 1 0 0 1 1 1v.5a1 1 0 1 1-2 0V15a1 1 0 0 1 1-1Zm-4.94-.94a1 1 0 0 1 0 1.41l-.36.36a1 1 0 1 1-1.41-1.41l.36-.36a1 1 0 0 1 1.41 0ZM5 10a1 1 0 0 1-1 1h-.5a1 1 0 1 1 0-2H4a1 1 0 0 1 1 1Zm.06-4.94a1 1 0 0 1-1.41 0l-.36-.36A1 1 0 1 1 4.7 3.3l.36.36a1 1 0 0 1 0 1.41Zm9.88 9.88-.36-.36a1 1 0 0 1 1.41-1.41l.36.36a1 1 0 0 1-1.41 1.41Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M15.5 12.6A6.5 6.5 0 0 1 7.4 4.5a6.5 6.5 0 1 0 8.1 8.1Z" />
              </svg>
            )}
          </button>
          <a href="#waitlist" className="v-button rounded-lg px-3.5 py-1.5 text-sm font-semibold text-white">
            Join waitlist
          </a>
        </div>
      </nav>
    </header>
  );
}
