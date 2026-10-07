import Reveal from "./Reveal";
import { IconArrowRight, IconSparkle } from "./icons";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";

const INCLUDED = [
  "Website updates, hosting, and upkeep",
  "Ongoing search + AI discovery work",
  "Design time each month for print, cards, signs, and more",
  "A monthly check-in and plain-English report",
  "Priority turnaround on new requests",
];

export default function PartnerPlanSection() {
  return (
    <section id="partner-plan" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative grid gap-10 overflow-hidden rounded-3xl bg-ink px-8 py-14 text-paper shadow-2xl sm:px-14 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 opacity-30 blur-3xl"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90">
                <IconSparkle className="h-3.5 w-3.5 text-amber-300" />
                Marketing Partner Plan
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                A marketing team on call, for one flat monthly rate.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
                Instead of hiring for every project, keep one partner on hand
                who already knows your brand. Each month is scoped around what
                your business needs most &mdash; month-to-month, no long-term
                contract.
              </p>
              <div className="mt-9">
                {/* A conversation, not a form: the plan usually follows a first project. */}
                <a
                  href={BUSINESS_PHONE_TEL}
                  className="btn-shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-105"
                >
                  Let&rsquo;s talk about a plan: {BUSINESS_PHONE_DISPLAY}
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <ul className="relative space-y-4 rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-amber-300 to-fuchsia-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
