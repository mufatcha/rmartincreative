import Link from "next/link";
import QuoteModal from "./QuoteModal";
import Reveal from "./Reveal";
import { startsAt } from "../lib/data/pricing";
import { BUSINESS_CTA } from "../lib/cta";
import { BUSINESS_PHONE_TEL } from "../lib/business";
import { IconArrowRight, IconGlobe, IconSearch, IconSparkle } from "./icons";

// The homepage leads with three offers; everything else is one click away in
// MoreServicesSection. Each card has its own next step, so nobody has to hunt for it.

const CTA =
  "btn-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper shadow-lg shadow-ink/15 transition-transform hover:scale-105";

export default function MainOffersSection() {
  const offers = [
    {
      icon: IconGlobe,
      accent: "from-sky-500 via-blue-500 to-indigo-600",
      badge: "bg-sky-50 text-sky-600",
      title: "Websites & Online Stores",
      body: "Custom sites, online stores, and sites your team can edit, built fast and ready for Google and AI from launch.",
      price: `From ${startsAt("website-design-development")}`,
      cta: (
        <QuoteModal initialServiceId="website" triggerClassName={CTA}>
          Start my website
        </QuoteModal>
      ),
      link: { href: "/services/website-design-development", label: "All website services" },
    },
    {
      icon: IconSearch,
      accent: "from-emerald-500 via-teal-500 to-cyan-600",
      badge: "bg-emerald-50 text-emerald-600",
      title: "Search + AI Discovery",
      body: "Show up on Google, in Maps, and in the answers ChatGPT and Google's AI give when customers ask for a recommendation.",
      price: "Starts with a free health check",
      cta: (
        <Link href={BUSINESS_CTA.href} className={CTA}>
          Get a free health check
        </Link>
      ),
      link: { href: "/services/search-ai-discovery", label: "All search + AI services" },
    },
    {
      icon: IconSparkle,
      accent: "from-violet-600 via-fuchsia-500 to-amber-500",
      badge: "bg-violet-50 text-violet-600",
      title: "Marketing Partner Plan",
      body: "One flat monthly rate for website upkeep, ongoing search work, and design time for print, cards, and signs.",
      price: "Month-to-month, no contract",
      cta: (
        <a href={BUSINESS_PHONE_TEL} className={CTA}>
          Talk about a plan
        </a>
      ),
      link: { href: "#partner-plan", label: "See the plan" },
    },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">What I do</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three ways I help local businesses grow.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <Reveal key={offer.title} delay={i * 100}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
                  <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${offer.accent}`} />
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${offer.badge}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">
                    <Link href={offer.link.href} className="hover:text-violet-700">
                      {offer.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{offer.body}</p>
                  <p className="mt-5 text-sm font-semibold">{offer.price}</p>
                  <div className="mt-5">{offer.cta}</div>
                  <div className="mt-4 text-sm font-semibold">
                    <a href={offer.link.href} className="group inline-flex items-center gap-1 text-violet-600 hover:text-violet-700">
                      {offer.link.label}
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
