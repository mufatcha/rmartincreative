import type { Metadata } from "next";
import { pageTitle } from "../../lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaSection from "../../components/CtaSection";
import PassportPrep from "../../components/PassportPrep";
import QuoteModal from "../../components/QuoteModal";
import Reveal from "../../components/Reveal";
import ServiceBreadcrumb from "../../components/ServiceBreadcrumb";
import ServiceFaqs from "../../components/ServiceFaqs";
import { IconArrowRight, IconExternalLink, IconPassport } from "../../components/icons";
import { BUSINESS_NAME, SITE_URL, STATE_NAMES } from "../../lib/business";
import {
  PASSPORT_OFFICES_CHECKED,
  getPassportOffice,
  mapsUrl,
  type PassportOffice,
} from "../../lib/data/passport-offices";
import { getPassportTownByKey, getPassportTownBySlug, getPassportTownPages } from "../../lib/data/passport-towns";
import { PASSPORT_PAPERWORK, PASSPORT_VISIT, priceAnswer, usd } from "../../lib/data/pricing";

// Only towns with written content get a page; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getPassportTownPages().map((p) => ({ town: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ town: string }> }): Promise<Metadata> {
  const { town: slug } = await params;
  const page = getPassportTownBySlug(slug);
  if (!page) notFound();
  const place = `${page.name}, ${page.town.state}`;
  return {
    title: pageTitle(`Passport Photos in ${place}`),
    description: `At-home and on-site passport photos in ${place}: compliant photos with unlimited retakes, same-day digital files, printed copies mailed free, and where to turn in your application nearby.`,
    alternates: { canonical: `/passport-photos/${slug}` },
  };
}

const KIND_LABEL: Record<PassportOffice["kind"], string> = {
  usps: "Post office",
  county: "County office",
  state: "U.S. Department of State",
};

function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "").replace(/^1/, "")}`;
}

function OfficeCard({ office }: { office: PassportOffice }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-700 via-blue-700 to-slate-800" />
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">{KIND_LABEL[office.kind]}</p>
      <h3 className="mt-1.5 font-semibold">{office.name}</h3>
      <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
        <a href={mapsUrl(office)} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          {office.street}
          <br />
          {office.city}, {office.state} {office.zip}
        </a>
      </address>
      <a href={telHref(office.phone)} className="mt-2 text-sm font-semibold text-ink hover:text-blue-700">
        {office.phone}
      </a>
      {office.notes && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{office.notes}</p>}
      <a
        href={office.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-blue-700 hover:text-blue-800"
      >
        Hours & appointments
        <IconExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

export default async function PassportTownPage({ params }: { params: Promise<{ town: string }> }) {
  const { town: slug } = await params;
  const page = getPassportTownBySlug(slug);
  if (!page) notFound();

  const { town, content, name } = page;
  const place = `${name}, ${town.state}`;
  const offices = content.offices.map((id) => getPassportOffice(id));
  const agency = getPassportOffice("chicago-passport-agency");
  const nearby = content.nearby.map((key) => getPassportTownByKey(key)).filter((p) => p !== undefined);

  const faqs = [
    ...content.faqs,
    {
      question: `How much do at-home passport photos cost in ${name}?`,
      answer: priceAnswer("passport-photos"),
    },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Passport photos in ${place}`,
    serviceType: "Passport photos",
    provider: { "@type": "LocalBusiness", "@id": `${SITE_URL}/#business`, name: BUSINESS_NAME, url: SITE_URL },
    areaServed: {
      "@type": "City",
      name: town.name,
      containedInPlace: { "@type": "State", name: STATE_NAMES[town.state] ?? town.state },
    },
    offers: { "@type": "Offer", price: PASSPORT_VISIT, priceCurrency: "USD" },
    url: `${SITE_URL}/passport-photos/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-blue-300 via-indigo-200 to-transparent opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <ServiceBreadcrumb
            crumbs={[
              { label: "Passport Photos", href: "/passport-photos" },
              { label: name },
            ]}
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur">
                <IconPassport className="h-3.5 w-3.5 text-blue-700" />
                Passport photos · {place}
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{content.headline}</h1>
              {content.intro.map((p) => (
                <p key={p} className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <QuoteModal
                  initialServiceId="passport"
                  triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
                >
                  Book a passport photo visit
                </QuoteModal>
                <a href="#where-to-apply" className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800">
                  Where to apply near {name}
                  <IconArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/5">
              <Image
                src="/webp-assets/passport-photo.webp"
                alt={`An at-home passport photo setup with a portable white backdrop, with finished printed 2×2 passport photos — the same service in ${name}`}
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The visit, in brief */}
      <section className="pb-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
          {[
            {
              title: "We come to you",
              body: `${content.visitNote} By appointment, at your home or business.`,
            },
            {
              title: "Right the first time",
              body: "Unlimited retakes until the photo meets U.S. State Department requirements, checked before I leave.",
            },
            {
              title: "Same-day copies",
              body: "Digital file by email or text the same day; two printed 2×2 copies mailed free (3–4 business days), or same-day hand delivery.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-6xl px-6 text-sm text-ink-soft">
          <span className="font-semibold text-ink">{usd(PASSPORT_VISIT)}</span> for the visit and one person&rsquo;s
          photo, with each additional person, infant, and extra print pair priced on the{" "}
          <Link href="/services/passport-photos" className="font-semibold text-blue-700 hover:text-blue-800">
            passport photos page
          </Link>
          . First-time or renewal-by-mail application filled out and printed: {usd(PASSPORT_PAPERWORK)}.
          {content.alsoServes && ` Also serving ${content.alsoServes.join(", ")}.`}
        </p>
      </section>

      {/* Where to turn in the application */}
      <section id="where-to-apply" className="scroll-mt-28 bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Where to turn in your application near {name}</h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            First-time applicants turn in their application in person at a passport acceptance facility, with ID and
            proof of citizenship — and sign it there, in front of the agent. These government offices are the closest
            to {name}. Renewing by mail? You mail it yourself; no visit needed.
          </p>
          <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${offices.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {offices.map((office, i) => (
              <Reveal key={office.name} delay={i * 80}>
                <OfficeCard office={office} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:flex sm:items-start sm:gap-6">
              <div className="sm:flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">Traveling in less than 2 weeks?</p>
                <h3 className="mt-1.5 font-semibold">{agency.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{agency.notes}</p>
              </div>
              <div className="mt-4 text-sm sm:mt-0 sm:w-64">
                <a href={mapsUrl(agency)} target="_blank" rel="noopener noreferrer" className="block leading-relaxed text-ink-soft hover:text-ink">
                  {agency.street}
                  <br />
                  {agency.city}, {agency.state} {agency.zip}
                </a>
                <a href={telHref(agency.phone)} className="mt-2 block font-semibold text-ink hover:text-blue-700">
                  {agency.phone}
                </a>
              </div>
            </div>
          </Reveal>

          <p className="mt-6 text-xs text-ink-soft">
            Office details checked {PASSPORT_OFFICES_CHECKED} from official USPS, county, and State Department sources.
            Hours and appointment rules change — please call ahead.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <PassportPrep />
          <ServiceFaqs faqs={faqs} />

          {nearby.length > 0 && (
            <div className="mt-14 border-t border-ink/10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Passport photos nearby</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {nearby.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/passport-photos/${p.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm ring-1 ring-ink/10 transition-colors hover:text-blue-700"
                  >
                    {p.name}
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaSection
        heading={`Passport photos in ${name}, done right the first time.`}
        body="Tell me how many people need photos and whether anyone is an infant or needs their application filled out, and I'll get you a time."
      />
    </>
  );
}
