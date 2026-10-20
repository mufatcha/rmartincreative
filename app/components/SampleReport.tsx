"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";
import { IconArrowRight, IconClose } from "./icons";
import type { ServiceSample } from "../lib/services-data";

// A multi-page sample (like an example report) shown as a grid of page previews.
// Clicking a page opens a full-size viewer with next/previous, arrow keys (or A/D), and Esc.

export default function SampleReport({ sample }: { sample: ServiceSample }) {
  const [open, setOpen] = useState<number | null>(null);
  const count = sample.pages.length;
  const go = useCallback((step: number) => setOpen((i) => (i === null ? i : (i + step + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      // Arrow keys, or A and D, flip pages (ignoring shortcuts like Ctrl+D).
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === "arrowright" || key === "d") go(1);
      if (key === "arrowleft" || key === "a") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, go]);

  const page = open === null ? null : sample.pages[open];

  return (
    <section className="mt-14">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">{sample.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">{sample.title}</h2>
        <p className="mt-3 max-w-3xl text-ink-soft">{sample.description}</p>
      </Reveal>

      <ol className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {sample.pages.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left"
              aria-label={`View page ${i + 1} of ${count}: ${p.title}`}
            >
              <span className="block overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-ink/10 transition group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-violet-300">
                <Image
                  src={p.thumb}
                  alt=""
                  width={520}
                  height={673}
                  unoptimized
                  loading="lazy"
                  className="h-auto w-full"
                />
              </span>
              <span className="mt-2 block text-xs text-ink-soft">
                <span className="font-semibold text-ink">{i + 1}.</span> {p.title}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {page &&
        open !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${sample.title}: page ${open + 1} of ${count}`}
            className="fixed inset-0 z-50 flex flex-col bg-ink/90 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 text-paper sm:px-6" onClick={(e) => e.stopPropagation()}>
              <p className="min-w-0 truncate text-sm">
                <span className="font-semibold">
                  Page {open + 1} of {count}
                </span>
                <span className="text-paper/60"> · {page.title}</span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            {/* The page fills the width up to its full size, and scrolls when it's taller than the screen. */}
            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-24 sm:px-6" onClick={() => setOpen(null)}>
              <Image
                key={page.src}
                src={page.src}
                alt={page.alt}
                width={1275}
                height={1650}
                unoptimized
                priority
                onClick={(e) => e.stopPropagation()}
                className="mx-auto h-auto w-full max-w-[1275px] rounded-md shadow-2xl"
              />
            </div>

            <div
              className="pointer-events-none fixed inset-x-0 bottom-5 flex justify-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous page"
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-lg hover:scale-105"
              >
                <IconArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next page"
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-lg hover:scale-105"
              >
                <IconArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Load the neighbors so next/previous feel instant. */}
            <div hidden>
              {[sample.pages[(open + 1) % count], sample.pages[(open - 1 + count) % count]].map((p) => (
                <link key={p.src} rel="preload" as="image" href={p.src} />
              ))}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
