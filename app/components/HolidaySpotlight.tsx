import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { IconArrowRight, IconSnowflake } from "./icons";

type FlakeStyle = CSSProperties & { "--drift"?: string };

const FLAKE_COUNT = 26;

function flakeStyle(i: number): FlakeStyle {
  const left = (i * 37) % 100;
  const size = 3 + (i % 4);
  const duration = 7 + (i % 5) * 1.6;
  const delay = -((i * 0.9) % duration);
  const drift = (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 8);

  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    "--drift": `${drift}px`,
  };
}

export default function HolidaySpotlight() {
  return (
    <section
      id="christmas"
      className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-[#1a1030] to-rose-950 py-24 text-white sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: FLAKE_COUNT }).map((_, i) => (
          <span key={i} className="snowflake" style={flakeStyle(i)} />
        ))}
      </div>

      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-white/15">
              <IconSnowflake className="h-3.5 w-3.5" />
              My favorite season
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Christmas &amp; holiday cards are my favorite to design —
              and where I still go all out.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Family photo cards, corporate holiday mailers, custom
              illustrated designs — every card is laid out by hand, proofed
              with you, and sent to press with enough lead time to actually
              arrive before the 25th.
            </p>
            <ul className="mt-7 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              {[
                "Photo & non-photo layouts",
                "Foil, matte or glossy finishes",
                "Corporate mailing lists welcome",
                "Digital + print delivery",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-shine relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-emerald-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-900/40 transition-transform hover:scale-105"
            >
              Reserve my card design
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center py-6">
            <div className="animate-sparkle absolute h-72 w-72 rounded-full bg-gradient-to-br from-rose-500/40 to-emerald-400/30 blur-2xl" />
            <div className="relative w-full rotate-[-2deg] rounded-2xl bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 p-[3px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8),0_0_45px_-5px_rgba(251,191,36,0.4)] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/jpg-assets/christmas-card.jpg"
                alt="Custom photo Christmas card reading “Merry Christmas from the Miller Family,” with a family and their golden retriever framed by pine, berries and gold stars"
                width={1997}
                height={1331}
                sizes="(max-width: 1024px) 90vw, 512px"
                className="h-auto w-full rounded-[13px]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
