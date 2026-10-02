"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconArrowRight, IconClose } from "./icons";
import type { ExtraExample } from "../lib/data/card-extras";

/** "See examples" link plus the pop-up of example photos for one card extra.
 *  Uses a native <dialog>: Escape closes it, focus stays inside, and the page
 *  behind is dimmed. Photos only render while it's open, so they don't load
 *  with the page. */
export default function ExtraExamples({ title, examples }: { title: string; examples: ExtraExample[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const current = examples[index] ?? examples[0];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className="group mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-semibold text-violet-600 hover:text-violet-700"
      >
        See {examples.length === 1 ? "an example" : "examples"}
        <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${title} examples`}
        onClose={() => setOpen(false)}
        // A click on the dimmed backdrop lands on the <dialog> itself, not its panel.
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="m-auto w-[min(48rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        {open && current && (
          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Examples</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight">{title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 text-ink-soft transition-colors hover:bg-paper-tint hover:text-ink"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-tint">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-contain"
              />
            </div>

            {examples.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {examples.map((example, i) => (
                  <button
                    key={example.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show example ${i + 1} of ${examples.length}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`relative h-16 w-20 overflow-hidden rounded-lg ring-2 transition ${
                      i === index ? "ring-violet-500" : "ring-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={example.src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
