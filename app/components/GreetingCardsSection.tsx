import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { IconArrowRight, IconCard } from "./icons";

type FloatStyle = CSSProperties & { "--rot"?: string };

const OCCASIONS = [
  "Birthdays",
  "Thank-yous",
  "Invitations",
  "Announcements",
  "Get well & sympathy",
  "Just because",
];

export default function GreetingCardsSection() {
  return (
    <section
      id="greeting-cards"
      className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-white to-amber-50 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-amber-200/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-fuchsia-600">
              <IconCard className="h-3.5 w-3.5" />
              Greeting Cards
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              A card for every moment worth marking.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Not every occasion needs a holiday budget. Whether it&rsquo;s a
              single birthday card or a full set for a shop shelf, you get
              the same care with layout, type, and color — sized right for
              print or ready to share digitally.
            </p>
            <ul className="mt-7 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
              {OCCASIONS.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-shine relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Design my card
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto h-64 w-full max-w-xs sm:h-72">
            <div
              className="animate-card-float absolute left-2 top-2 w-40 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-400 p-4 text-white shadow-xl"
              style={{ "--rot": "-7deg", transform: "rotate(-7deg)" } as FloatStyle}
            >
              <p className="mt-4 font-serif text-base italic">Happy Birthday!</p>
              <p className="mt-1 text-[11px] text-white/80">to someone wonderful</p>
            </div>
            <div
              className="animate-card-float absolute right-0 top-16 w-36 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-4 text-white shadow-xl [animation-delay:1s]"
              style={{ "--rot": "6deg", transform: "rotate(6deg)" } as FloatStyle}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide">
                Thank You
              </p>
              <p className="mt-3 text-[11px] text-white/80">for everything</p>
            </div>
            <div
              className="animate-card-float absolute bottom-0 left-8 w-40 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-ink/5 [animation-delay:2s]"
              style={{ "--rot": "-3deg", transform: "rotate(-3deg)" } as FloatStyle}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-fuchsia-600">
                You&rsquo;re Invited
              </p>
              <p className="mt-3 text-[11px] text-ink-soft">Saturday, 6pm</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
