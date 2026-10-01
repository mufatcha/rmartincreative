import type { Metadata } from "next";
import Link from "next/link";
import ChristmasCardEssentials from "../components/ChristmasCardEssentials";
import CtaSection from "../components/CtaSection";
import QuoteModal from "../components/QuoteModal";
import Reveal from "../components/Reveal";
import { IconArrowRight, IconSnowflake } from "../components/icons";
import { TOWN_GROUPS, getChristmasTownPages } from "../lib/data/christmas-towns";

export const metadata: Metadata = {
  title: "Custom Christmas Cards Near You",
  description:
    "Custom Christmas and holiday cards for Richmond, Lake County, McHenry County, southern Wisconsin, and Chicago — folded or flat 5×7 cards, hand delivered or shipped.",
  alternates: { canonical: "/christmas-cards" },
};

export default function ChristmasCardsHub() {
  const pages = getChristmasTownPages();

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-rose-300 via-red-200 to-transparent opacity-50 blur-3xl"
        />
        <div
          aria-hidden
          className="animate-drift-b pointer-events-none absolute -right-24 top-16 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-emerald-200 via-teal-100 to-transparent opacity-60 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur">
              <IconSnowflake className="h-3.5 w-3.5 text-rose-500" />
              Christmas cards near you
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Custom Christmas cards for your town.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Designed in Richmond, IL, and hand delivered or shipped across Lake and McHenry
              counties, southern Wisconsin, and Chicago. Find your town for local card ideas and
              delivery details.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuoteModal
                initialServiceId="cards"
                triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
              >
                Start my Christmas cards
              </QuoteModal>
              <Link
                href="/services/greeting-cards/christmas-cards"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
              >
                About my Christmas cards
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl space-y-14 px-6">
          {TOWN_GROUPS.map((group) => {
            const groupPages = pages.filter((p) => p.content.group === group.id);
            if (groupPages.length === 0) return null;
            return (
              <div key={group.id}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">{group.label}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {groupPages.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 50}>
                      <Link
                        href={`/christmas-cards/${p.slug}`}
                        className="group relative block h-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-emerald-600" />
                        <h3 className="text-lg font-semibold">
                          {p.name}, {p.town.state}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.content.headline}</p>
                        {p.content.alsoServes && (
                          <p className="mt-2 text-xs text-ink-soft">Also: {p.content.alsoServes.join(", ")}</p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600">
                          See {p.name} cards
                          <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ChristmasCardEssentials />

      <CtaSection
        heading="Don’t see your town? I probably still deliver there."
        body="I work with families and businesses all around northern Illinois and southern Wisconsin, and ship anywhere. Tell me where you are and what you have in mind."
      />
    </>
  );
}
