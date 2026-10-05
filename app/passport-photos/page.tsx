import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "../components/CtaSection";
import QuoteModal from "../components/QuoteModal";
import Reveal from "../components/Reveal";
import { IconArrowRight, IconPassport } from "../components/icons";
import { getPassportTownPages } from "../lib/data/passport-towns";
import { PASSPORT_VISIT, usd } from "../lib/data/pricing";

export const metadata: Metadata = {
  title: "Passport Photos Near You",
  description:
    "At-home and on-site passport photos in Richmond, McHenry, Crystal Lake, Woodstock, Algonquin, the Dundees, Lake Villa, Gurnee, and Lake Geneva — plus where to turn in your application in each town.",
  alternates: { canonical: "/passport-photos" },
};

export default function PassportPhotosHub() {
  const pages = getPassportTownPages();

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-blue-300 via-indigo-200 to-transparent opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur">
              <IconPassport className="h-3.5 w-3.5 text-blue-700" />
              Passport photos near you
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Passport photos, taken in your town.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              By appointment, I come to your home or business with everything needed for a compliant U.S. passport
              photo — unlimited retakes, a same-day digital file, and printed copies mailed free. Starting at{" "}
              {usd(PASSPORT_VISIT)}. Pick your town for local details, including where to turn in your application.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuoteModal
                initialServiceId="passport"
                triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
              >
                Book a passport photo visit
              </QuoteModal>
              <Link
                href="/services/passport-photos"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                Pricing & what&rsquo;s included
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <Link
                href={`/passport-photos/${p.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-700 via-blue-700 to-slate-800" />
                <h2 className="text-lg font-semibold">
                  {p.name}, {p.town.state}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.content.headline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                  {p.name} passport photos
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection
        heading="Passport photos, without the trip."
        body="Tell me your town, how many people need photos, and whether anyone is an infant or needs their application filled out, and I'll get you a time."
      />
    </>
  );
}
