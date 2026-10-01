import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChristmasCardEssentials from "../../components/ChristmasCardEssentials";
import CtaSection from "../../components/CtaSection";
import QuoteModal from "../../components/QuoteModal";
import Reveal from "../../components/Reveal";
import ServiceBreadcrumb from "../../components/ServiceBreadcrumb";
import ServiceFaqs from "../../components/ServiceFaqs";
import { IconArrowRight, IconExternalLink, IconSnowflake } from "../../components/icons";
import { BUSINESS_NAME, SITE_URL, STATE_NAMES } from "../../lib/business";
import {
  getChristmasTownByKey,
  getChristmasTownBySlug,
  getChristmasTownPages,
} from "../../lib/data/christmas-towns";

// Only towns with written content get a page; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getChristmasTownPages().map((p) => ({ town: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ town: string }> }): Promise<Metadata> {
  const { town: slug } = await params;
  const page = getChristmasTownBySlug(slug);
  if (!page) notFound();
  const place = `${page.name}, ${page.town.state}`;

  return {
    title: `Custom Christmas Cards in ${place}`,
    description: `${page.content.headline} Folded or flat 5×7 holiday cards designed around your photos, proofed with you, and ${
      page.content.delivery.method === "ship" ? "shipped to your door" : "hand delivered or shipped"
    } in ${place}.`,
    alternates: { canonical: `/christmas-cards/${slug}` },
  };
}

const DELIVERY_LABEL = {
  hand: "Hand delivery or local pickup",
  ship: "Shipped to your door",
  both: "Hand delivery or shipping",
} as const;

export default async function ChristmasTownPage({ params }: { params: Promise<{ town: string }> }) {
  const { town: slug } = await params;
  const page = getChristmasTownBySlug(slug);
  if (!page) notFound();

  const { town, content, name } = page;
  const place = `${name}, ${town.state}`;
  const nearby = content.nearby
    .map((key) => getChristmasTownByKey(key))
    .filter((p) => p !== undefined);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Custom Christmas cards in ${place}`,
    serviceType: "Christmas card design and printing",
    provider: { "@type": "LocalBusiness", name: BUSINESS_NAME, url: SITE_URL },
    areaServed: {
      "@type": "City",
      name: town.name,
      containedInPlace: { "@type": "State", name: STATE_NAMES[town.state] ?? town.state },
    },
    url: `${SITE_URL}/christmas-cards/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
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
          <ServiceBreadcrumb
            crumbs={[
              { label: "Christmas Cards", href: "/christmas-cards" },
              { label: name },
            ]}
          />

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur">
                <IconSnowflake className="h-3.5 w-3.5 text-rose-500" />
                Christmas cards · {place}
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{content.headline}</h1>
              {content.intro.map((p) => (
                <p key={p} className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <QuoteModal
                  initialServiceId="cards"
                  triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
                >
                  Start my {name} cards
                </QuoteModal>
                <a
                  href="#ideas"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
                >
                  {name} design ideas
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xs rotate-[2deg] rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-ink/5">
              <Image
                src="/webp-assets/christmas-card-portrait.webp"
                alt={`Example custom Christmas card design for ${name} families`}
                width={800}
                height={1200}
                sizes="320px"
                className="h-auto w-full rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local holidays + design ideas (the unique, town-specific heart of the page) */}
      <section id="ideas" className="relative scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-600">
                The holidays in {name}
              </span>
              {content.holidays.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-ink">
                  {p}
                </p>
              ))}

              {content.events.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-ink">Local holiday events</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {content.events.map((event) => (
                      <li key={event.url}>
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink-soft shadow-sm ring-1 ring-ink/10 transition-colors hover:text-rose-600 hover:ring-rose-300"
                        >
                          {event.name}
                          <IconExternalLink className="h-3.5 w-3.5 opacity-60" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-ink-soft">Check each event&rsquo;s site for this year&rsquo;s dates.</p>
                </div>
              )}
            </div>
          </Reveal>

          <h2 className="mt-14 text-2xl font-bold tracking-tight sm:text-3xl">
            Card ideas inspired by {name}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {content.designIdeas.map((idea, i) => (
              <Reveal key={idea.title} delay={i * 80}>
                <div className="relative h-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                  <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-emerald-600" />
                  <h3 className="text-lg font-semibold">{idea.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{idea.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Getting your cards */}
          <Reveal>
            <div className="mt-14 grid gap-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-[#1a1030] to-rose-950 p-8 text-white shadow-xl sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  Getting your cards in {name}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{DELIVERY_LABEL[content.delivery.method]}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-white/80">{content.delivery.note}</p>
                {content.alsoServes && (
                  <p className="mt-3 text-sm text-white/70">
                    Also serving: {content.alsoServes.join(", ")}
                  </p>
                )}
              </div>
              <QuoteModal
                initialServiceId="cards"
                triggerClassName="btn-shine relative shrink-0 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-105"
              >
                Get a quote
              </QuoteModal>
            </div>
          </Reveal>

          {/* Chicago: neighborhoods served */}
          {content.neighborhoods && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight">Chicago neighborhoods I work with</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {content.neighborhoods.map((group) => (
                  <div key={group.area}>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-soft">{group.area}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {group.names.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ServiceFaqs faqs={content.faqs} />
        </div>
      </section>

      <ChristmasCardEssentials />

      {/* Nearby towns */}
      {nearby.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Christmas cards near {name}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {nearby.map((p) => (
                <Link
                  key={p.slug}
                  href={`/christmas-cards/${p.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm ring-1 ring-ink/10 transition-colors hover:text-rose-600"
                >
                  {p.name}, {p.town.state}
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
              <Link
                href="/christmas-cards"
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
              >
                All areas
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaSection
        heading={`Let’s make this year’s ${name} card one to keep.`}
        body="Send your photos and a few ideas, and I’ll reply with a design plan, a quote, and a timeline to get your cards out before the holidays."
      />
    </>
  );
}
