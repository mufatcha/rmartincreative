"use client";

import { useEffect, useState } from "react";

/** Types each phrase out, pauses, deletes it, and moves to the next. */
export default function Typewriter({ phrases }: { phrases: string[] }) {
  // The server HTML shows the first phrase whole, so it reads fine without JS.
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const phrase = phrases[index];
    let delay = deleting ? 28 : 55;
    if (!deleting && length === phrase.length) delay = 1800;
    if (deleting && length === 0) delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && length === phrase.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else setLength((n) => n + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [phrases, index, length, deleting]);

  return (
    <>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span className="v-gradient-text" aria-hidden>
        {phrases[index].slice(0, length)}
        <span className="v-caret text-[var(--v-accent-3)]" />
      </span>
    </>
  );
}
