import Reveal from "./Reveal";
import { IconArrowRight } from "./icons";
import {
  SERVICE_AREA_BOUNDS,
  SERVICE_AREA_CITIES,
  SERVICE_HOME_CITY,
} from "../lib/business";

const CITY_LIST = SERVICE_AREA_CITIES.map(
  (city) => `${city.name}, ${city.state}`
).join(", ");

const FAQS = [
  {
    question: "How far does your service area reach?",
    answer: `My service area runs north to ${SERVICE_AREA_BOUNDS.north}, south to ${SERVICE_AREA_BOUNDS.south}, west to ${SERVICE_AREA_BOUNDS.west}, and east to ${SERVICE_AREA_BOUNDS.east} — with ${SERVICE_HOME_CITY}, IL as home base.`,
  },
  {
    question: "What towns do you cover?",
    answer: `Towns across that area include ${CITY_LIST}, and everywhere in between.`,
  },
  {
    question: "Do you serve Lake Geneva, Wisconsin?",
    answer:
      "Yes — Lake Geneva is the northern edge of my service area. I regularly work with clients just across the Illinois–Wisconsin border for cards, business printing, and photo restoration.",
  },
  {
    question: "How far will you travel for a print job?",
    answer:
      "Within the service area, I can arrange in-person meetings, drop-offs, and pickups. Outside that range, everything — from design proofs to final files — works just as well over email and mail.",
  },
  {
    question: "How far in advance should I book for Christmas cards?",
    answer:
      "As early as possible in the fall. Christmas cards are my busiest season, and clients across the service area who book early get first pick of finishes and guaranteed delivery before the holidays.",
  },
  {
    question: "Do I need to mail in photos for digitizing, or can we meet locally?",
    answer:
      "Both work. If you're within the service area, we can arrange a local drop-off and pickup. If you're farther out, prints, slides, and negatives can be mailed in and returned with your digital files.",
  },
];

export default function ServiceAreaSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="service-area" className="relative bg-paper-tint py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              Service Area
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Based in {SERVICE_HOME_CITY}, IL — serving from{" "}
              {SERVICE_AREA_BOUNDS.north} to {SERVICE_AREA_BOUNDS.south}.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Local drop-offs, pickups, and in-person proofing across
              Northern Illinois and into southern Wisconsin — as far west as{" "}
              {SERVICE_AREA_BOUNDS.west} and as far east as{" "}
              {SERVICE_AREA_BOUNDS.east}. Everything else works just as well
              by mail and email, wherever you are.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-2">
            {SERVICE_AREA_CITIES.map((city) => (
              <span
                key={city.name}
                className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10"
              >
                {city.name}, {city.state}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 80}>
              <div>
                <h3 className="text-base font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {faq.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={FAQS.length * 80}>
          <a
            href="#contact"
            className="group mt-14 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            Get a quote for your area
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
