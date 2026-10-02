import ChristmasSpecial from "./ChristmasSpecial";
import Reveal from "./Reveal";
import { CARD_EXTRAS_NOTE, getCardExtras } from "../lib/data/card-extras";
import { CARD_PRICES, cardDesignPrice, cardRevisionPolicy, christmasSpecialActive, startsAt, usd } from "../lib/data/pricing";

// Shared details for every local Christmas card page. Kept below each page's
// unique local content, so the shared text stays secondary.
const FORMATS = [
  {
    title: "Folded 5×7",
    body: "Printed on 10×7 paper and folded in half, with room inside for a message, a family letter, or more photos.",
  },
  {
    title: "Flat 5×7",
    body: "A single card printed on both sides, ideal for photo cards. Rounded corners are optional.",
  },
];

const STEPS = [
  { title: "Share your photos & ideas", body: "Send your favorite photos, colors, and the message you'd like." },
  { title: "Review your proof", body: "You'll see a proof and we'll revise until it feels just right." },
  { title: "Printed & finished", body: "Matte, glossy, or foil, printed on the format you chose." },
  { title: "Delivered", body: "Hand delivered or shipped, plus digital files to share by text or email." },
];

export default function ChristmasCardEssentials() {
  return (
    <section className="relative bg-paper-tint py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Every card, the details</h2>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <li>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-rose-600 shadow-sm ring-1 ring-ink/10">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12">
          <h3 className="text-lg font-semibold">Finishing touches</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {getCardExtras("greeting-cards/christmas-cards").map((extra) => (
              <li key={extra.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                <p className="text-sm font-semibold">{extra.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{extra.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-soft">{CARD_EXTRAS_NOTE}</p>
        </div>

        {christmasSpecialActive() && <ChristmasSpecial showExamples className="mt-10 max-w-2xl" />}

        <p className="mt-10 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Pricing:</span> design starts at{" "}
          {startsAt("greeting-cards/christmas-cards")}: {usd(CARD_PRICES.designedSide)} per designed side,{" "}
          {usd(CARD_PRICES.framedPhotoSide)} to add a framed photo inside or on the back, and {usd(CARD_PRICES.textSide)} per text-only side, in any combination — so a folded card with a designed front and a
          message inside is {usd(cardDesignPrice(1, 1))}, and a folded card designed on all 4 sides is{" "}
          {usd(cardDesignPrice(4))}. Plus printing by quantity and finish. {cardRevisionPolicy()}
        </p>

        <p className="mt-3 text-sm text-ink-soft">
          <span className="font-semibold text-ink">Book early:</span> finishes and print slots fill up
          by late November, so October and early November orders get the most choice.
        </p>
      </div>
    </section>
  );
}
