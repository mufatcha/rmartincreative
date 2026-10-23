import Image from "next/image";
import Link from "next/link";
import HealthCheckForm, { ClaimButton, HEALTH_CHECK_FORM_ID } from "./HealthCheckForm";
import Reveal from "./Reveal";
import SampleReport from "./SampleReport";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import ServiceFaqs from "./ServiceFaqs";
import ServiceJsonLd from "./ServiceJsonLd";
import { LeafPricing } from "./ServicePricing";
import {
  IconArrowRight,
  IconCloud,
  IconMail,
  IconRocket,
  IconSearch,
  IconShieldCheck,
  IconSparkle,
} from "./icons";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL, SERVICE_HOME_CITY } from "../lib/business";
import type { ServiceCategory, ServiceLeaf } from "../lib/services-data";

// The Free Website + Search Health Check page has its own layout: a hero, the hidden
// problems it finds, what it covers, the sample report, and a request form. Its title,
// description, FAQs, price, and sample come from services-data.ts like every other page.

/** The page's call-to-action color: the brand gradient, not the black used site-wide. */
const CTA =
  "btn-shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105";

const HIDDEN_ISSUES = [
  {
    icon: IconMail,
    title: "Leads lost in silence",
    body: "Contact forms and tap-to-call buttons that quietly stop working after an update. Nobody tells you; they just call someone else.",
  },
  {
    icon: IconCloud,
    title: "Overpaying for hosting",
    body: "Paying $30 to $100 or more a month for slow, outdated hosting, when a custom website speed optimization service can move your site to fast, modern cloud hosting for a fraction of that cost.",
  },
  {
    icon: IconSparkle,
    title: "Missing from AI answers",
    body: "What ChatGPT, Claude, and Google's AI Overviews tell people about your business, if they mention you at all, and whether your site has the structured data that AI search engine optimization and discovery depend on.",
  },
  {
    icon: IconShieldCheck,
    title: "Security and reputation risks",
    body: "Expired security certificates, outdated plugins, and missing backups that leave your site open to malware and downtime.",
  },
];

const COVERAGE = [
  {
    icon: IconRocket,
    title: "Performance & mobile",
    body: "Load speed, Core Web Vitals optimization opportunities, and how every key page looks and works on phones and tablets.",
  },
  {
    icon: IconMail,
    title: "Lead flow & forms",
    body: "Contact forms, quote and booking links, and tap-to-call numbers, actually tested by hand.",
  },
  {
    icon: IconShieldCheck,
    title: "Security & health",
    body: "Security certificates, software and plugin updates, spam exposure, and whether backups exist and work.",
  },
  {
    icon: IconSearch,
    title: "Search & AI visibility",
    body: (
      <>
        Page titles, meta descriptions, your Google Business Profile, and your{" "}
        <Link href="/extras/schema-markup-json-ld-seo-ai" className="font-medium text-violet-600 hover:underline">
          schema markup (JSON-LD) implementation
        </Link>
        , so search engines and AI models understand your services accurately.
      </>
    ),
  },
  {
    icon: IconCloud,
    title: "Hosting & costs",
    body: "Your domain, email, and hosting setup, including hidden fees and anything you're paying for that you don't need.",
  },
];

export default function HealthCheckPage({ category, leaf }: { category: ServiceCategory; leaf: ServiceLeaf }) {
  const claim = (
    <ClaimButton className={CTA}>
      Claim Your Free Audit
      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </ClaimButton>
  );

  return (
    <section className="relative pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <ServiceBreadcrumb
            crumbs={[
              { label: "Services", href: "/services" },
              { label: category.title, href: `/services/${category.slug}` },
              { label: leaf.title },
            ]}
          />
        </Reveal>

        {/* Hero */}
        <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal delay={60}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">{leaf.title}</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Is your website quietly losing you customers?
              </h1>
              <p className="mt-4 text-lg font-medium text-ink">No cost, and no sales pressure.</p>
              <p className="mt-4 text-lg text-ink-soft">
                Get an expert review of your website through the eyes of a customer, a developer, and a search engine.
                I&rsquo;ll perform a manual website audit and technical SEO checkup, testing your site&rsquo;s speed,
                security, lead forms, and AI visibility by hand, then send you a clear, plain-English action plan.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {claim}
                <a href={BUSINESS_PHONE_TEL} className="text-sm font-semibold text-ink hover:text-violet-600">
                  Or call {BUSINESS_PHONE_DISPLAY}
                </a>
              </div>
              <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-medium text-ink shadow-sm ring-1 ring-ink/10">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" />
                  Based in {SERVICE_HOME_CITY}, IL
                </span>
                Serving Northern Illinois &amp; Southeast Wisconsin. Checked by a real person, not an automated scanner.
              </p>
            </div>
          </Reveal>
          {leaf.image && (
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-ink/10">
                <Image
                  src={leaf.image.src}
                  alt={leaf.image.alt}
                  width={1275}
                  height={956}
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          )}
        </div>

        {/* Risk callout */}
        <Reveal>
          <div className="mt-20 rounded-3xl bg-rose-50 p-8 ring-1 ring-rose-200 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">What most owners never see</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              The hidden issues costing local businesses customers
            </h2>
            <p className="mt-3 max-w-3xl text-ink-soft">
              Most website problems stay hidden from the owner until a customer complains, or quietly goes to a
              competitor instead.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {HIDDEN_ISSUES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* What it covers */}
        <Reveal>
          <div className="mt-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">What I uncover</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Five areas, checked by hand</h2>
            <p className="mt-3 max-w-3xl text-ink-soft">
              This isn&rsquo;t an automated scan with your logo slapped on it. As a local web developer, I examine your
              site the way your customers, Google, and AI assistants do, testing the exact bottlenecks that affect local
              lead generation.
            </p>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COVERAGE.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white ${category.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={COVERAGE.length * 60}>
            <div className="flex h-full flex-col justify-center rounded-2xl bg-ink p-6 text-paper shadow-sm">
              <h3 className="font-semibold">You get the full report</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">
                Every suggested edit, change, and explanation, listed in priority order, with an honest assessment of
                whether you need a few local website updates and fixes, or whether a complete site rebuild makes more
                sense.
              </p>
            </div>
          </Reveal>
        </div>

        <LeafPricing category={category} leafSlug={leaf.slug} />

        {leaf.sample && <SampleReport sample={leaf.sample} />}

        {/* Request form */}
        <div id={HEALTH_CHECK_FORM_ID} className="mt-20 scroll-mt-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Claim your free audit</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Get your free health check</h2>
              <p className="mt-4 text-ink-soft">
                No sales pitch and no credit card. Just a straightforward report showing what&rsquo;s working,
                what&rsquo;s broken, and how to fix it.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink">
                {[
                  "Checked by hand by a local developer",
                  "The full report, with every fix explained",
                  "No passwords or admin access needed",
                  "No follow-up calls unless you ask",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-soft">
                Prefer to talk?{" "}
                <a href={BUSINESS_PHONE_TEL} className="font-semibold text-ink hover:text-violet-600">
                  Call {BUSINESS_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <HealthCheckForm ctaClassName={CTA} />
          </Reveal>
        </div>

        <ServiceFaqs faqs={leaf.faqs} />
        <ServiceJsonLd category={category} leaf={leaf} />

        <div className="mt-6 flex flex-wrap gap-3">
          {category.children
            .filter((child) => child.slug !== leaf.slug)
            .map((child) => (
              <Link
                key={child.slug}
                href={`/services/${category.slug}/${child.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm ring-1 ring-ink/10 transition-colors hover:text-violet-600"
              >
                {child.title}
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
