// Every price on the site comes from this file. Change a number here and it
// updates the pricing boxes on the service pages, the "How much…" FAQs (and
// their search markup), the local Christmas card pages, and /llms.txt.
//
// Keys are "category" or "category/leaf" slugs from app/lib/services-data.ts.
// Services not listed here stay "quoted per project".

/** Card design is priced per side; the card examples below are built from these. */
export const CARD_PRICES = {
  /** A side with a photo, artwork, or full design. */
  designedSide: 40,
  /** A side with just your photo in a frame or border. */
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
};

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
    { label: "Framed photo only", price: framedPhotoSide },
    { label: "Each text-only side (like a message inside)", price: textSide },
  ],
  plusPrinting: true,
  startsAt: cardDesignPrice(1),
  note: `Mix and match across the card's sides: a folded card has 4 (front, inside left, inside right, back) and a flat card has 2. For example: ${CARD_EXAMPLES.map((e) => `${e.label.charAt(0).toLowerCase()}${e.label.slice(1)}: ${usd(e.price)}`).join("; ")}. ${cardRevisionPolicy()}`,
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
      : `${l.label.toLowerCase()}: ${l.from ? "from " : ""}${usd(l.price)}`
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
  return `Card design is priced per side, in any combination: ${usd(designedSide)} for each designed side, ${usd(framedPhotoSide)} for a side with just your photo in a frame, and ${usd(textSide)} for each text-only side, plus printing. A folded card has 4 sides (front, inside left, inside right, back) and a flat card has 2. For example — ${examples}. ${cardRevisionPolicy()} Printing is quoted by quantity and finish.`;
}
