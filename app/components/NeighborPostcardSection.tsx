import type { CSSProperties } from "react";
import Link from "next/link";
import QuoteModal from "./QuoteModal";
import Reveal from "./Reveal";
import { IconArrowRight, IconPostcard } from "./icons";

type FloatStyle = CSSProperties & { "--rot"?: string };

const FEATURES = [
  "Postcards to the neighbors of your recent customers",
  "Fueled by big data: skips homes that already have what you sell",
  "Soft-touch stock that stands out in the mailbox",
  "Design, printing, postage, and mailing in one package",
];

// A tiny neighborhood: the customer's house (highlighted) and the homes around it.
const HOUSES = Array.from({ length: 15 }, (_, i) => i);

export default function NeighborPostcardSection() {
  return (
    <section
      id="neighbor-postcards"
      className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-950 py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300 ring-1 ring-white/15">
              <IconPostcard className="h-3.5 w-3.5" />
              Location Smart Postcards
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Every job you finish becomes{" "}
              <span className="animate-hue bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                your next ad
              </span>
              .
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              When you sell a car, add solar, or finish a new roof, the neighbors notice. I send them a postcard while
              it&rsquo;s fresh, with a message written for your business and your offer — for a solar installer,
              &ldquo;Your neighbor on Oak Street just went solar. Isn&rsquo;t it time you did too?&rdquo; It&rsquo;s
              printed on a soft-feel stock they&rsquo;ll notice the moment it comes out of the mailbox. Available for
              businesses anywhere in the U.S.
            </p>
            <ul className="mt-7 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              {FEATURES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <QuoteModal
                initialServiceId="neighbor"
                triggerClassName="btn-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 transition-transform hover:scale-105"
              >
                Plan a neighbor mailing
              </QuoteModal>
              <Link
                href="/services/location-smart-postcards"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                How it works
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div aria-hidden className="relative mx-auto h-80 w-full max-w-sm sm:h-96">
            {/* The neighborhood: the customer's home lit up, neighbors around it. */}
            <div className="absolute inset-x-6 top-0 grid grid-cols-5 gap-3 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              {HOUSES.map((i) => (
                <span
                  key={i}
                  className={`aspect-square rounded-md ${
                    i === 7
                      ? "animate-sparkle bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg shadow-orange-500/40"
                      : "bg-cyan-300/25 ring-1 ring-cyan-200/30"
                  }`}
                />
              ))}
            </div>

            <div
              className="animate-card-drift absolute bottom-6 left-0 w-60 rounded-xl bg-[#fbf6ec] p-4 text-ink shadow-2xl [animation-delay:-1.2s]"
              style={{ "--rot": "-5deg", transform: "rotate(-5deg)" } as FloatStyle}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-700">Example</p>
              <p className="mt-2 text-sm font-semibold leading-snug">
                Your neighbor on Oak Street just went solar.
              </p>
              <p className="mt-1 text-xs text-ink-soft">Isn&rsquo;t it time you did too?</p>
              <span className="mt-3 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-800">
                Soft-touch finish
              </span>
            </div>

            <div
              className="animate-card-sway absolute bottom-0 right-0 w-36 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-4 text-white shadow-2xl [animation-delay:-2.4s]"
              style={{ "--rot": "6deg", transform: "rotate(6deg)" } as FloatStyle}
            >
              <IconPostcard className="h-5 w-5" />
              <p className="mt-3 text-[11px] font-semibold">Mailed to the homes around every job</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
