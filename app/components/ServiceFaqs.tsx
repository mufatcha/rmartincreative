import Reveal from "./Reveal";
import type { ServiceFaq } from "../lib/services-data";

export default function ServiceFaqs({ faqs }: { faqs: ServiceFaq[] }) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="mt-16 border-t border-ink/10 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
        Common questions
      </p>
      {/* CSS columns instead of a grid so each answer stacks directly under the
          one above it, rather than every row stretching to its tallest answer. */}
      <div className="-mb-8 mt-6 sm:columns-2 sm:gap-10">
        {faqs.map((faq, i) => (
          <Reveal key={faq.question} delay={i * 80} className="break-inside-avoid pb-8">
            <div>
              <h3 className="text-base font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
