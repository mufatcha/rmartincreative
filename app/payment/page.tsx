import type { Metadata } from "next";
import { pageTitle } from "../lib/seo";
import CtaSection from "../components/CtaSection";
import QuoteModal from "../components/QuoteModal";
import Reveal from "../components/Reveal";
import ServiceFaqs from "../components/ServiceFaqs";
import { IconExternalLink } from "../components/icons";
import { BUSINESS_NAME, SERVICE_HOME_CITY, SERVICE_STATE_ABBR } from "../lib/business";
import { CASH_CRYPTO_DISCOUNT, PAYMENT_METHODS } from "../lib/data/payments";

export const metadata: Metadata = {
  title: pageTitle("Ways to Pay: Goldbacks, Bitcoin, Crypto & Cards"),
  description: `${BUSINESS_NAME} accepts Goldbacks, Bitcoin, Dogecoin, Solana, SUI, cash, and Visa, Mastercard, Discover, and American Express — with 4–8% off for cash and crypto. Based in ${SERVICE_HOME_CITY}, ${SERVICE_STATE_ABBR}.`,
  alternates: { canonical: "/payment" },
};

const ACCENTS: Record<string, string> = {
  goldback: "from-amber-400 via-yellow-500 to-amber-600",
  crypto: "from-orange-500 via-amber-500 to-violet-600",
  cash: "from-emerald-500 via-green-600 to-teal-600",
  cards: "from-sky-500 via-blue-600 to-indigo-600",
};

const FAQS = [
  {
    question: "Do you accept Goldbacks?",
    answer:
      "Yes. Goldbacks are accepted in person, at pickup, delivery, or your appointment, valued at the Goldback exchange rate on the day you pay. Goldback payments aren't discounted.",
  },
  {
    question: "Do you accept Bitcoin and other cryptocurrency?",
    answer:
      "Yes — Bitcoin, Dogecoin, Solana, and SUI. Your invoice includes a QR code with my wallet address, and you send the payment directly, with no third-party processor. Crypto payments are discounted 4–8%.",
  },
  {
    question: "Is there a discount for paying with cash or crypto?",
    answer: CASH_CRYPTO_DISCOUNT,
  },
  {
    question: "Can I pay by credit card?",
    answer:
      "Yes — Visa, Mastercard, Discover, and American Express, online through your invoice or in person.",
  },
];

export default function PaymentPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-amber-300 via-yellow-200 to-transparent opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Ways to pay</span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Goldbacks, crypto, cash, or card.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Pay the way that works for you. I accept Goldbacks in person; Bitcoin, Dogecoin, Solana, and SUI sent
              straight to my wallet; cash; and every major credit card.
            </p>
            <div className="mt-6 inline-flex rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium leading-relaxed text-emerald-900 ring-1 ring-emerald-200">
              {CASH_CRYPTO_DISCOUNT}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2">
          {PAYMENT_METHODS.map((method, i) => (
            <Reveal key={method.id} delay={(i % 2) * 80}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
                <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${ACCENTS[method.id]}`} />
                <h2 className="text-xl font-bold tracking-tight">{method.title}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {method.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-paper-tint px-3 py-1 text-xs font-semibold text-ink ring-1 ring-ink/10"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{method.how}</p>
                {method.terms && <p className="mt-2 text-sm font-semibold text-ink">{method.terms}</p>}
                {method.id === "goldback" && (
                  <a
                    href="https://www.goldback.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800"
                  >
                    New to Goldbacks? Learn more
                    <IconExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-6">
          <QuoteModal triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105">
            Get a Quote
          </QuoteModal>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <ServiceFaqs faqs={FAQS} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
