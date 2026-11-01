import Link from "next/link";
import ApproachDiagram from "./ApproachDiagram";
import Reveal from "./Reveal";
import { BUSINESS_CTA } from "../lib/cta";
import { IconArrowRight, IconChart, IconCode, IconLayers, IconSparkle } from "./icons";

const PILLARS = [
  {
    icon: IconChart,
    badge: "bg-emerald-50 text-emerald-600",
    n: "01",
    title: "Data",
    role: "(The Bedrock)",
    body: "Discovers what your customers are actually searching for before a single line of code is written.",
    without: "You're guessing what customers want and wasting money on pages nobody visits.",
  },
  {
    icon: IconCode,
    badge: "bg-sky-50 text-sky-600",
    n: "02",
    title: "Tech Stack",
    role: "(The Engine)",
    body: "Built directly on search insights using custom Next.js and Shopify setups for maximum speed and indexing.",
    without: "Great ideas load slowly, rank poorly, and stay hidden behind bloated page builders.",
  },
  {
    icon: IconSparkle,
    badge: "bg-fuchsia-50 text-fuchsia-600",
    n: "03",
    title: "Design",
    role: "(The Conversion)",
    body: "Turns validated data and fast tech into a visual experience that drives calls, quote requests, and sales.",
    without: "The right message gets ignored, and visitors leave without taking action.",
  },
];

const BENEFITS = [
  {
    label: "Zero Vendor Friction",
    body: "One direct point of contact. No account managers, no playing game-of-telephone between a developer and a designer, and no explaining your brand twice.",
  },
  {
    label: "Higher ROI on Every Dollar",
    body: "Your budget is directed strictly toward the features and search channels proven to drive calls, leads, and store visits.",
  },
  {
    label: "Built to Outlast Redesigns",
    body: "Clean database structures, proper metadata, and scalable code mean your digital presence grows smoothly alongside your business.",
  },
];

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-amber-50 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-violet-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-amber-200/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700">
              <IconLayers className="h-3.5 w-3.5" />
              Data-First Development
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Great design and fast code mean nothing if you build the wrong thing.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Most agencies start with how a site looks, then fit content into a template, and check SEO at the very
              end. That&rsquo;s building on quicksand.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              I flip the order: Data is the bedrock. Local search demand, competitor blind spots, and user intent set
              the plan. From there, modern technology builds it fast, and targeted design converts visitors into
              customers.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ApproachDiagram />
          </Reveal>
        </div>

        {/* Each card spans two shared rows (grid-rows-subgrid), so the rules line up across cards on desktop. */}
        <div className="mt-14 grid gap-6 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-0">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.n} delay={i * 100} className="md:row-span-2 md:grid md:grid-rows-subgrid">
                <div className="flex h-full flex-col rounded-2xl bg-white px-7 shadow-sm ring-1 ring-ink/5 md:row-span-2 md:grid md:grid-rows-subgrid">
                  <div className="pb-5 pt-7">
                    <div className="flex items-center justify-between">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${pillar.badge}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-ink-soft">{pillar.n}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold tracking-tight">
                      {pillar.title} <span className="font-medium text-ink-soft">{pillar.role}</span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
                  </div>
                  <div className="flex items-center border-t border-ink/10 py-5">
                    <p className="text-sm leading-relaxed text-ink-soft">
                      <strong className="font-semibold text-ink">Without it:</strong> {pillar.without}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-6 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5 sm:p-9">
            <h3 className="text-xl font-bold tracking-tight">What That Means For Your Business</h3>
            <dl className="mt-5 grid gap-6 md:grid-cols-3">
              {BENEFITS.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-semibold text-violet-600">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</dd>
                </div>
              ))}
            </dl>
            <Link
              href={BUSINESS_CTA.href}
              className="btn-shine relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20"
            >
              See what the data says about your site
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
