import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaSection from "../components/CtaSection";
import QuoteModal from "../components/QuoteModal";
import Reveal from "../components/Reveal";
import { IconArrowRight } from "../components/icons";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE_TEL,
  SERVICE_HOME_CITY,
  SERVICE_STATE_ABBR,
  SITE_URL,
  STATS,
} from "../lib/business";
import { ABOUT, aboutHasTodos } from "../lib/data/about";
import { SERVICE_AUDIENCES, getCategoriesFor } from "../lib/services-data";

// Draft until ABOUT.published is true: visible on the dev server only.
const isLive = ABOUT.published || process.env.NODE_ENV === "development";

export const metadata: Metadata = {
  title: "About Ryan Martin",
  description: ABOUT.intro.startsWith("TODO")
    ? `Ryan Martin is a designer, developer, and print partner for small businesses, based in ${SERVICE_HOME_CITY}, ${SERVICE_STATE_ABBR}.`
    : ABOUT.intro,
  alternates: { canonical: "/about" },
  robots: ABOUT.published ? undefined : { index: false, follow: false },
};

export default function AboutPage() {
  if (!isLive) notFound();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Martin",
    jobTitle: ABOUT.role.startsWith("TODO") ? undefined : ABOUT.role,
    worksFor: { "@type": "LocalBusiness", name: BUSINESS_NAME, url: SITE_URL },
    address: { "@type": "PostalAddress", addressLocality: SERVICE_HOME_CITY, addressRegion: SERVICE_STATE_ABBR },
    email: `mailto:${BUSINESS_EMAIL}`,
    telephone: BUSINESS_PHONE_TEL,
    url: `${SITE_URL}/about`,
    ...(ABOUT.photo ? { image: `${SITE_URL}${ABOUT.photo.src}` } : {}),
  };

  return (
    <>
      {ABOUT.published && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      )}

      {!ABOUT.published && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-amber-300 px-6 py-2 text-center text-sm font-semibold text-ink">
          Draft — only visible on the dev server.{" "}
          {aboutHasTodos() ? "Fill in the TODOs in app/lib/data/about.ts, then" : "When you're happy,"} set{" "}
          <code>published: true</code>.
        </div>
      )}

      {/* Intro */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-300 to-transparent opacity-40 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">About</span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">Hi, I&rsquo;m Ryan Martin.</h1>
            <p className="mt-3 text-lg font-medium text-violet-600">{ABOUT.role}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{ABOUT.intro}</p>
            <p className="mt-3 text-sm text-ink-soft">
              Based in {SERVICE_HOME_CITY}, {SERVICE_STATE_ABBR} ·{" "}
              <Link href="/service-area" className="font-medium text-violet-600 hover:text-violet-700">
                serving Northern Illinois &amp; Southeast Wisconsin
              </Link>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xs">
            {ABOUT.photo ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-ink/5">
                <Image src={ABOUT.photo.src} alt={ABOUT.photo.alt} fill sizes="320px" className="object-cover" priority />
              </div>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-5xl font-bold text-white shadow-2xl">
                RM
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story + highlights */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How I got here</h2>
              {ABOUT.story.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-ink">Experience at a glance</h2>
              <ul className="mt-4 space-y-3">
                {ABOUT.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-5">
                {STATS.slice(0, 4).map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-violet-600">
                      {s.value.toLocaleString()}
                      {s.suffix}
                    </p>
                    <p className="text-xs text-ink-soft">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How I work</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {ABOUT.approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What I do (from the real service list) + personal note */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What I do</h2>
            {SERVICE_AUDIENCES.map((audience) => (
              <div key={audience.id} className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">{audience.label}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {getCategoriesFor(audience.id).map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/services/${c.slug}`}
                        className="inline-block rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:text-violet-600"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {ABOUT.personal && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Outside of work</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{ABOUT.personal}</p>
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center gap-4 px-6">
          <QuoteModal triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105">
            Work with me
          </QuoteModal>
          <Link href="/#clients" className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700">
            Clients I&rsquo;ve worked with
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
