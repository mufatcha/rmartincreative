import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { IconArrowRight, IconExternalLink, IconFlame } from "./icons";

type FloatStyle = CSSProperties & { "--rot"?: string };

const ETSY_URL = "https://feedtheflamegraphics.etsy.com";

const FEATURES = [
  "Custom apparel design from scratch or your concept",
  "Screen printing & DTG, sized S through 3XL",
  "Bulk pricing for teams, events & small businesses",
  "Ready-to-order designs on the FeedTheFlames Etsy shop",
];

export default function TShirtSection() {
  return (
    <section
      id="tshirts"
      className="relative isolate overflow-hidden bg-gradient-to-br from-zinc-950 via-red-950 to-orange-950 py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-red-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-300 ring-1 ring-white/15">
              <IconFlame className="h-3.5 w-3.5" />
              T-Shirt Printing &amp; Design
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Custom apparel, designed and printed under my own brand:{" "}
              <span className="animate-hue bg-gradient-to-r from-orange-400 via-red-400 to-amber-300 bg-clip-text text-transparent">
                FeedTheFlames
              </span>
              .
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              One-off tees, small runs, or bulk orders for a team or event —
              I design the artwork and get it printed on real shirts, not
              just a mockup. Browse ready-to-order designs on the
              FeedTheFlames Etsy shop, or start from scratch with a custom
              order.
            </p>
            <ul className="mt-7 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              {FEATURES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition-transform hover:scale-105"
              >
                Shop FeedTheFlames on Etsy
                <IconExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Get a custom quote
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-center sm:h-80">
            <div className="animate-sparkle absolute h-56 w-56 rounded-full bg-gradient-to-br from-orange-500/40 to-red-500/30 blur-2xl" />

            <div
              className="animate-card-float absolute left-0 top-4 w-40 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-red-700 p-4 text-white shadow-2xl"
              style={{ "--rot": "-6deg", transform: "rotate(-6deg)" } as FloatStyle}
            >
              <IconFlame className="h-6 w-6" />
              <p className="mt-6 text-sm font-semibold">FeedTheFlames</p>
              <p className="mt-1 text-[11px] text-white/75">Original tee design</p>
            </div>

            <div
              className="animate-card-float absolute right-0 top-24 w-36 rounded-2xl bg-white p-4 text-ink shadow-2xl ring-1 ring-ink/5 [animation-delay:1.4s]"
              style={{ "--rot": "5deg", transform: "rotate(5deg)" } as FloatStyle}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">
                Team Order
              </p>
              <p className="mt-3 text-[11px] text-ink-soft">24 shirts &middot; S&ndash;3XL</p>
            </div>

            <div
              className="animate-card-float absolute bottom-0 left-10 w-36 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-4 text-white shadow-2xl [animation-delay:2.6s]"
              style={{ "--rot": "-3deg", transform: "rotate(-3deg)" } as FloatStyle}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide">
                Etsy Shop
              </p>
              <p className="mt-3 text-[11px] text-white/70">Ready-made designs</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
