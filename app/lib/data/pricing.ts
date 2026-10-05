// Every price on the site comes from this file. Change a number here and it
// updates the pricing boxes on the service pages, the "How much…" FAQs (and
// their search markup), the local Christmas card pages, and /llms.txt.
//
// Keys are "category" or "category/leaf" slugs from app/lib/services-data.ts.
// Services not listed here stay "quoted per project".

import { CARD_EXTRAS_NOTE } from "./card-extras";

/** Card design is priced per side; the card examples below are built from these. */
export const CARD_PRICES = {
  /** A side with a photo, artwork, or full design. */
  designedSide: 40,
  /** Your photo in a simple frame, on an inside page or the back. An add-on:
   *  every card has at least one designed side, so designedSide is the minimum. */
  framedPhotoSide: 20,
  /** A side with a text-only layout, like a message inside. */
  textSide: 10,
  /** Redrafts included: a fresh take on the design. */
  includedRedrafts: 1,
  /** Rounds of edits included. */
  includedEdits: 2,
  /** Each edit after the included ones. */
  extraEdit: 20,
};

export type PriceLine = {
  label: string;
  /** null = quoted per project. */
  price: number | null;
  /** Show as "From $X". */
  from?: boolean;
  /** An add-on to the line above: show as "+$X". */
  add?: boolean;
  /** Upper end of a price range: shows as "$price–$maxPrice". */
  maxPrice?: number;
};

/** Passport photo visit (1 person) and the extra per infant (more time and care). */
export const PASSPORT_VISIT = 135;
export const PASSPORT_INFANT_EXTRA = 20;
/** Passport application filled out and printed (first-time DS-11 or renewal by mail DS-82), sent with the photos. */
export const PASSPORT_PAPERWORK = 55;

export type ServicePricing = {
  lines: PriceLine[];
  /** Adds "plus printing" — printing is quoted by quantity, size, and finish. */
  plusPrinting?: boolean;
  /** Lowest price to lead with in summaries. Defaults to the lowest line. */
  startsAt?: number;
  note?: string;
};

const { designedSide, framedPhotoSide, textSide } = CARD_PRICES;

/** Card design is priced side by side, in any combination: a folded card has
 *  4 sides (front, inside left, inside right, back) and a flat card has 2. */
export function cardDesignPrice(designedSides: number, textSides = 0, framedPhotoSides = 0): number {
  return designedSides * designedSide + textSides * textSide + framedPhotoSides * framedPhotoSide;
}

/** Worked examples, shown on the card pages. Edit or add freely — prices are calculated. */
export const CARD_EXAMPLES = [
  { label: "One-sided flat card", designedSides: 1, price: cardDesignPrice(1) },
  { label: "Folded card designed front, message inside", designedSides: 1, price: cardDesignPrice(1, 1) },
  { label: "Folded card designed front, framed photo and message inside", designedSides: 1, price: cardDesignPrice(1, 1, 1) },
  { label: "Flat card designed front and back", designedSides: 2, price: cardDesignPrice(2) },
  { label: "Folded card designed on all 4 sides", designedSides: 4, price: cardDesignPrice(4) },
];

/** Early-bird Christmas card special. It shows on the Christmas card pages
 *  until `endsAt`, then disappears on its own — no need to remove it by hand.
 *  To run it again next year, update the dates. */
export const CHRISTMAS_SPECIAL = {
  /** Last day, as written on the site. */
  lastDay: "November 6",
  /** When it disappears: 12:00 am on Nov 7, Central time (CST is UTC−6). */
  endsAt: "2026-11-07T00:00:00-06:00",
  /** Off cards with two or more designed sides. */
  twoOrMoreSidesOff: 20,
  /** Off cards with one designed side. */
  oneSideOff: 10,
};

export function christmasSpecialActive(now: Date = new Date()): boolean {
  return now < new Date(CHRISTMAS_SPECIAL.endsAt);
}

/** The special's discount for a card with this many designed sides. */
export function christmasSpecialDiscount(designedSides: number): number {
  if (designedSides >= 2) return CHRISTMAS_SPECIAL.twoOrMoreSidesOff;
  if (designedSides === 1) return CHRISTMAS_SPECIAL.oneSideOff;
  return 0;
}

const CARD_PRICING: ServicePricing = {
  lines: [
    { label: "Each designed side (photos and artwork)", price: designedSide },
    { label: "Framed photo only (inside or back)", price: framedPhotoSide },
    { label: "Each text-only side (like a message inside)", price: textSide },
  ],
  plusPrinting: true,
  startsAt: cardDesignPrice(1),
  note: `Every card has at least one designed side, so cards start at ${usd(designedSide)}. Mix and match across the rest: a folded card has 4 (front, inside left, inside right, back) and a flat card has 2. For example: ${CARD_EXAMPLES.map((e) => `${e.label.charAt(0).toLowerCase()}${e.label.slice(1)}: ${usd(e.price)}`).join("; ")}. ${cardRevisionPolicy()} ${CARD_EXTRAS_NOTE}`,
};

export const PRICING: Record<string, ServicePricing> = {
  "website-design-development": {
    lines: [{ label: "Starter website (a single page or up to 5 pages)", price: 350 }],
    note: "Includes a contact form, hosting, and email forwarding (you@yourdomain.com to your Gmail) for the life of the site, plus your domain for the first year — renewal after that is billed separately. Hosting stays included as long as Cloudflare's free plan allows. Larger sites and online stores are quoted per project.",
  },
  "business-printing/business-cards": {
    lines: [{ label: "Business card design", price: 30 }],
    plusPrinting: true,
  },
  "business-printing/brochures-collateral": {
    lines: [{ label: "Tri-fold brochure design", price: 200 }],
    plusPrinting: true,
  },
  "signs-posters/yard-signs": {
    lines: [
      { label: "Simple text layout", price: 20 },
      { label: "Graduation, wedding & event signs", price: 50, from: true },
    ],
    plusPrinting: true,
  },
  "signs-posters/posters": {
    lines: [
      { label: "Simple one-photo design", price: 30, from: true },
      { label: "Event poster design", price: 200, from: true },
    ],
    plusPrinting: true,
  },
  "banners-canvas/banners": {
    lines: [
      { label: "Text-only banner", price: 100, from: true },
      { label: "Banner with photos & design", price: 220, from: true },
    ],
    plusPrinting: true,
  },
  "banners-canvas/canvas-prints": {
    lines: [{ label: "Canvas design (photo only)", price: 30 }],
    plusPrinting: true,
  },
  "passport-photos": {
    lines: [
      { label: "Home or business visit: 1 compliant passport photo, 2 printed & cut copies + digital file", price: PASSPORT_VISIT },
      { label: "Each additional person, same visit (same package)", price: 30, add: true },
      { label: "Infants, each (extra time and care)", price: PASSPORT_INFANT_EXTRA, add: true },
      { label: "Your own photo made compliant (background removal, sizing) + 1 printed & cut pair, depending on the background", price: 20, maxPrice: 40 },
      { label: "Each additional printed & cut pair, any service", price: 1, add: true },
      { label: "Application filled out and printed — first-time (DS-11) or renewal by mail (DS-82) — delivered with your photos", price: PASSPORT_PAPERWORK, add: true },
      { label: "USPS mail delivery (3–4 business days)", price: 0 },
      { label: "Same-day hand delivery", price: null },
    ],
    startsAt: PASSPORT_VISIT,
    note: "By appointment. Every visit includes unlimited retakes until each photo meets U.S. State Department requirements. Prints are made off-site the same day the photos are taken and mailed right after printing; digital files are sent the same day by email, text, or both.",
  },
  apparel: {
    lines: [
      { label: "T-shirt layout", price: 20 },
      { label: "Full custom design", price: null },
    ],
    plusPrinting: true,
  },
  "greeting-cards/christmas-cards": CARD_PRICING,
  "greeting-cards/everyday-cards": CARD_PRICING,
};

export const PRINTING_NOTE = "Plus printing, quoted by quantity, size, and finish.";

export function usd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatPrice(line: PriceLine): string {
  if (line.price === null) return "Quoted";
  if (line.price === 0) return "Free";
  if (line.maxPrice !== undefined) return `${usd(line.price)}–${usd(line.maxPrice)}`;
  if (line.add) return `+${usd(line.price)}`;
  return line.from ? `From ${usd(line.price)}` : usd(line.price);
}

export function getPricing(categorySlug: string, leafSlug?: string): ServicePricing | undefined {
  return PRICING[leafSlug ? `${categorySlug}/${leafSlug}` : categorySlug];
}

/** The lowest price a service starts at. */
export function startingPrice(pricing: ServicePricing): number | undefined {
  if (pricing.startsAt !== undefined) return pricing.startsAt;
  const prices = pricing.lines.flatMap((l) => (l.price === null ? [] : [l.price]));
  return prices.length > 0 ? Math.min(...prices) : undefined;
}

/** One-sentence plain-language summary, for FAQ answers and llms.txt. */
export function pricingSummary(pricing: ServicePricing): string {
  const parts = pricing.lines.map((l) =>
    l.price === null
      ? `${l.label.toLowerCase()}: quoted per project`
      : l.price === 0
        ? `${l.label.toLowerCase()}: free`
        : l.maxPrice !== undefined
          ? `${l.label.toLowerCase()}: ${usd(l.price)}–${usd(l.maxPrice)}`
          : `${l.label.toLowerCase()}: ${l.add ? "+" : l.from ? "from " : ""}${usd(l.price)}`
  );
  const sentence = parts.join("; ");
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}${pricing.plusPrinting ? ", plus printing" : ""}.`;
}

// The helpers below are for FAQ answers in services-data.ts. They throw on a
// missing key, so a typo fails the build instead of printing a blank price.
function pricingFor(key: string): ServicePricing {
  const pricing = PRICING[key];
  if (!pricing) throw new Error(`No pricing for "${key}" in app/lib/data/pricing.ts`);
  return pricing;
}

/** Full summary for a service, e.g. "Simple text layout $20; … , plus printing." */
export function priceAnswer(key: string): string {
  return pricingSummary(pricingFor(key));
}

/** Starting price as text, e.g. "$30". Given several services, the lowest of them. */
export function startsAt(...keys: string[]): string {
  const prices = keys.map((key) => {
    const price = startingPrice(pricingFor(key));
    if (price === undefined) throw new Error(`"${key}" has no fixed price in app/lib/data/pricing.ts`);
    return price;
  });
  return usd(Math.min(...prices));
}

/** What every card design includes — the one place this wording lives. */
export function cardRevisionPolicy(): string {
  const { includedRedrafts, includedEdits, extraEdit } = CARD_PRICES;
  return `Every card design includes ${includedRedrafts} redraft (a fresh take on the design) and ${includedEdits} rounds of edits; additional edits are ${usd(extraEdit)} each.`;
}

/** Card pricing in a sentence — shared by every card FAQ. */
export function cardPriceAnswer(): string {
  const { designedSide, framedPhotoSide, textSide } = CARD_PRICES;
  const examples = CARD_EXAMPLES.map((e) => `${e.label.toLowerCase()}: ${usd(e.price)}`).join("; ");
  return `Card design is priced per side, in any combination: ${usd(designedSide)} for each designed side, ${usd(framedPhotoSide)} to add a framed photo on an inside page or the back, and ${usd(textSide)} for each text-only side, plus printing. Every card has at least one designed side, so the minimum is ${usd(designedSide)}. A folded card has 4 sides (front, inside left, inside right, back) and a flat card has 2. For example — ${examples}. ${cardRevisionPolicy()} Printing is quoted by quantity and finish.`;
}
