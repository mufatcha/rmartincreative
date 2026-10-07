import type { Metadata } from "next";
import { pageTitle } from "../lib/seo";
import CtaSection from "../components/CtaSection";
import QuoteModal from "../components/QuoteModal";
import Reveal from "../components/Reveal";
import { SERVICE_HOME_CITY } from "../lib/business";
import { TOWNS, type Town } from "../lib/data/towns";

export const metadata: Metadata = {
  title: pageTitle("Service Area: Local Pickup, Drop-off & Delivery"),
  description:
    "Based in Richmond, IL, with local pickup, drop-off, and hand delivery across McHenry and Lake counties, the Fox River Valley, Chicago and its northern suburbs, and southeast Wisconsin.",
  alternates: { canonical: "/service-area" },
};

// Everything below reads from app/lib/data/towns.ts, so editing that file
// updates this page automatically.
const LEG_LABELS: Record<number, string> = {
  1: "Chicago to Woodstock",
  2: "Woodstock to Lake Geneva",
  3: "Lake Geneva to Kenosha",
  4: "Kenosha to Chicago",
};

type Group = { title: string; note?: string; towns: Town[] };

function buildGroups(): Group[] {
  const by = (fn: (t: Town) => boolean) => TOWNS.filter(fn);
  const groups: Group[] = [
    {
      title: "Richmond to Gurnee",
      note: "Home turf — closest to the studio.",
      towns: by((t) => t.category === "Richmond to Gurnee Corridor"),
    },
    {
      title: "Richmond to the Dundees",
      note: "South through McHenry and the Fox River Valley.",
      towns: by((t) => t.category === "Richmond to West Dundee Corridor"),
    },
  ];
  for (const leg of [1, 2, 3, 4]) {
    groups.push({ title: LEG_LABELS[leg], towns: by((t) => t.category === "Loop Drive" && t.leg === leg) });
  }
  groups.push({
    title: "Chicago",
    note: "Neighborhoods across the city.",
    towns: by((t) => t.category === "Chicago Metro Area" && t.type === "chicago_neighborhood"),
  });
  return groups.filter((g) => g.towns.length > 0);
}

const STEPS = [
  {
    title: "Pickup & drop-off",
    body: "Hand off photos, artwork, or prints to be scanned, and pick up finished orders, at a time and place that works for you.",
  },
  {
    title: "Hand delivery",
    body: "Finished cards, printing, and apparel can be delivered right to your door or business.",
  },
  {
    title: "Anywhere else",
    body: "Outside these towns, everything works by mail, shipping, and email, from proofs to final files.",
  },
];

export default function ServiceAreaPage() {
  const groups = buildGroups();
  const townCount = TOWNS.filter((t) => t.type !== "chicago_neighborhood").length;

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-violet-300 via-fuchsia-200 to-transparent opacity-40 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Service area</span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Local pickup, drop-off, and delivery across {townCount}+ towns.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              I&rsquo;m based in {SERVICE_HOME_CITY}, IL, and travel these routes regularly, from the
              Wisconsin state line down through the Fox River Valley to Chicago and its northern
              suburbs. If your town is listed here, we can meet in person.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                  <h2 className="font-semibold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Locations I Serve</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, i) => (
              <Reveal key={group.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-violet-600">{group.title}</h3>
                  {group.note && <p className="mt-1 text-xs text-ink-soft">{group.note}</p>}
                  <ul className="mt-4 space-y-1.5 text-sm text-ink">
                    {group.towns.map((t) => (
                      <li key={`${t.name}-${t.state}`}>
                        {t.name}
                        {t.type !== "chicago_neighborhood" && <span className="text-ink-soft">, {t.state}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <QuoteModal triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105">
              Arrange a pickup or quote
            </QuoteModal>
            <p className="text-sm text-ink-soft">Don&rsquo;t see your town? Ask — I may still be nearby.</p>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Close by? Let’s meet in person."
        body="Tell me what you need and where you are, and I’ll set up a pickup, drop-off, or delivery that fits your schedule."
      />
    </>
  );
}
