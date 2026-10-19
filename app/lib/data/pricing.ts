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

/** The entry-level website, also offered as the budget option on the overhaul page. */
export const STARTER_WEBSITE = 350;
/** A simple custom web app: one type of user, login, a database, and up to 5 screens. */
export const WEB_APP = 1500;
/** A simple mobile app for iPhone and Android (React Native): one type of user, login,
 *  a database, push notifications, up to 5 screens, and app store submission. */
export const MOBILE_APP = 3000;

export type ServicePricing = {
  lines: PriceLine[];
  /** Adds "plus printing" — printing is quoted by quantity, size, and finish. */
  plusPrinting?: boolean;
  /** Lowest price to lead with in summaries. Defaults to the lowest line. */
  startsAt?: number;
  note?: string;
  /** Related services linked under the pricing box ("Also consider"), to point clients toward what pairs well. */
  links?: { label: string; href: string; note?: string }[];
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
    lines: [
      { label: "Starter website (a single page or up to 5 pages)", price: STARTER_WEBSITE },
      { label: "Custom web app (login, database, up to 5 screens)", price: WEB_APP, from: true },
      { label: "Mobile app for iPhone & Android (up to 5 screens, app store setup)", price: MOBILE_APP, from: true },
    ],
    note: "Includes a contact form, hosting, and email forwarding (you@yourdomain.com to your Gmail) for the life of the site, plus your domain for the first year — renewal after that is billed separately. Hosting stays included as long as Cloudflare's free plan allows. Web and mobile apps start with one type of user, login, a database, and up to 5 screens; mobile apps add push notifications and App Store and Google Play submission (Apple's $99/year and Google's one-time $25 developer fees are paid directly). Bigger apps, larger sites, and online stores are quoted per project.",
    links: [
      {
        label: "Search + AI Discovery",
        href: "/services/search-ai-discovery",
        note: "get found on Google and in AI answers, starting with a free health check",
      },
      {
        label: "Marketing Partner Plan",
        href: "/#partner-plan",
        note: "keep your site, search, and marketing going for one flat monthly rate",
      },
    ],
  },
  "search-ai-discovery/search-health-check": {
    lines: [{ label: "Search + AI Health Check", price: 0 }],
    note: "No cost and no obligation to book anything afterward.",
  },
  "search-ai-discovery/search-ai-update": {
    lines: [{ label: "One-time Search + AI Update", price: 300, from: true }],
    note: "A flat project fee, set by your site's size and how much needs fixing. You'll get the exact price after a quick review of your site.",
  },
  "search-ai-discovery/monthly-retainer": {
    lines: [{ label: "Monthly Retainer, per month", price: 200, from: true }],
    note: "Month-to-month, with no long-term contract. The monthly rate is set by your site's size and how much ongoing work it needs.",
  },
  "email-marketing": {
    lines: [
      { label: "Email platform setup or template design", price: 150, from: true },
      { label: "Monthly newsletter plan", price: null },
    ],
    note: "Monthly plans are quoted by how often you send and how much content each email needs.",
  },
  "website-design-development/website-overhaul": {
    lines: [{ label: "Full website overhaul", price: null }],
    note: "Quoted as a flat rate based on page count, features like e-commerce or booking, and content needs, with a clear, itemized quote before any work starts.",
    links: [
      {
        label: `Starter Website (${usd(STARTER_WEBSITE)})`,
        href: "/services/website-design-development#pricing",
        note: "a fresh single page web app or up to 5 page website, when a full overhaul is more than you need",
      },
      {
        label: "Search + AI Discovery",
        href: "/services/search-ai-discovery",
        note: "build on your new site's rankings and AI visibility after launch",
      },
    ],
  },
  "business-printing/business-cards": {
    lines: [
      { label: "Business card design", price: 30 },
      { label: "Letterhead design", price: 40 },
      { label: "Envelope design (#10)", price: 25 },
      { label: "Stationery set: business card, letterhead & envelope", price: 80 },
      { label: "Gift certificate, coupon, or loyalty punch card", price: 30 },
      { label: "Presentation folder design", price: 100 },
    ],
    plusPrinting: true,
    // Lead with business cards (the envelope alone is lower, but rarely ordered on its own).
    startsAt: 30,
    note: "Letterhead comes print-ready, plus an editable Word or Google Docs version for everyday letters.",
  },
  "business-printing/brochures-collateral": {
    lines: [
      { label: "Flyer or one-pager, one-sided", price: 40 },
      { label: "Flyer, two-sided", price: 60 },
      { label: "Bi-fold brochure design", price: 150 },
      { label: "Tri-fold brochure design", price: 200 },
      { label: "Door hanger or rack card", price: 40 },
      { label: "Menu, single page", price: 60 },
      { label: "Menu, folded", price: 150 },
    ],
    note: "Includes 2 rounds of edits and print-ready files. Larger multi-page menus are quoted by page count.",
    plusPrinting: true,
  },
  "business-printing/magazines-catalogs": {
    lines: [
      { label: "Magazine design, 16 pages (cover + 15 inside pages)", price: 600 },
      { label: "Catalog design, 8 pages (cover + 7 inside pages)", price: 300 },
      { label: "Each additional page", price: 35, add: true },
      { label: "Product photo cleanup (background removal, color), per photo", price: 5, add: true },
    ],
    plusPrinting: true,
    // Lead with the smallest full job, not the per-photo cleanup add-on.
    startsAt: 300,
    note: "Page counts come in multiples of 4 for folded and stapled printing. Updates to an existing magazine or catalog are quoted by the pages that change. Product photo cleanup is per photo.",
  },
  "business-printing/logo-design": {
    lines: [
      { label: "Logo design (2 concepts, 2 rounds of edits)", price: 150 },
      { label: "Logo cleanup or redraw of an existing logo", price: 75 },
      { label: "Brand style sheet: colors, fonts & logo versions", price: 50, add: true },
    ],
    // Lead with a new logo; the $75 cleanup is listed separately.
    startsAt: 150,
    note: "You get the final logo in color, black, and white, as print-ready vector files plus PNGs for the web and social media.",
  },
  "business-printing/postcards-direct-mail": {
    lines: [
      { label: "Postcard design, one-sided", price: 40 },
      { label: "Postcard design, two-sided", price: 60 },
      { label: "Every Door Direct Mail (EDDM) route planning & USPS paperwork", price: 50, add: true },
    ],
    plusPrinting: true,
    startsAt: 40,
    note: "Postage is billed at USPS rates.",
  },
  "business-printing/stickers-labels": {
    lines: [
      { label: "Sticker or label design", price: 30, from: true },
      { label: "Each additional flavor, scent, or version", price: 15, add: true },
    ],
    plusPrinting: true,
    startsAt: 30,
  },
  "business-printing/business-documents": {
    lines: [
      { label: "Invoice or carbonless (NCR) form design", price: 40 },
      { label: "Pitch deck or presentation", price: null },
    ],
    plusPrinting: true,
    note: "Decks are quoted by slide count and how much content structuring is involved.",
  },
  "greeting-cards/programs": {
    lines: [
      { label: "Program design, single sheet (flat or folded)", price: 50 },
      { label: "Booklet program, 8 pages", price: 150 },
    ],
    plusPrinting: true,
    note: "Rush turnaround is available for memorial and funeral programs.",
  },
  "signs-posters/decals-magnets": {
    lines: [
      { label: "Window decal design (hours, logo, or sale)", price: 50, from: true },
      { label: "Vehicle door magnet design (pair)", price: 50 },
      { label: "Storefront window lettering", price: null },
    ],
    plusPrinting: true,
    startsAt: 50,
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
      { label: "Sale or promotion poster", price: 75, from: true },
      { label: "Event poster design", price: 200, from: true },
    ],
    plusPrinting: true,
    note: "Common sizes are 11×17, 18×24, and 24×36 inches, with larger formats for storefronts and events.",
  },
  "banners-canvas/banners": {
    lines: [
      { label: "Text-only banner", price: 100, from: true },
      { label: "Banner with photos & design", price: 220, from: true },
      { label: "Retractable (pull-up) banner design", price: 100, from: true },
      { label: "Trade show backdrop design", price: 250, from: true },
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
  "photos/photo-restoration": {
    lines: [
      { label: "Light: dust, spots, small scratches, fading", price: 25 },
      { label: "Moderate: creases, small tears, stains, minor missing areas", price: 50 },
      { label: "Heavy: large tears, water damage, missing pieces, faces to rebuild", price: 100, from: true },
      { label: "Colorization (black and white to color)", price: 25, add: true },
    ],
    startsAt: 25,
    note: "Per photo, including the restored digital file. You'll get a price before any work starts. Prints in standard frame sizes are extra.",
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
  // Lowercase only the first letter, so names like "iPhone" keep their capitals.
  const lower = (label: string) => label.charAt(0).toLowerCase() + label.slice(1);
  const parts = pricing.lines.map((l) =>
    l.price === null
      ? `${lower(l.label)}: quoted per project`
      : l.price === 0
        ? `${lower(l.label)}: free`
        : l.maxPrice !== undefined
          ? `${lower(l.label)}: ${usd(l.price)}–${usd(l.maxPrice)}`
          : `${lower(l.label)}: ${l.add ? "+" : l.from ? "from " : ""}${usd(l.price)}`
  );
  const sentence = parts.join("; ");
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}${pricing.plusPrinting ? ", plus printing" : ""}.`;
}

// The helpers below are for FAQ answers in services-data.ts. They throw on a
// missing key, so a typo fails the build instead of printing a blank price.
/** schema.org Offer objects for a service's price lines (quoted lines are left out). */
export function schemaOffers(pricing: ServicePricing): Record<string, unknown>[] {
  return pricing.lines.flatMap((l) => {
    if (l.price === null) return [];
    const offer: Record<string, unknown> = {
      "@type": "Offer",
      name: l.add ? `Add-on: ${l.label}` : l.label,
      priceCurrency: "USD",
      ...(pricing.plusPrinting ? { description: PRINTING_NOTE } : {}),
    };
    if (l.from || l.maxPrice !== undefined) {
      offer.priceSpecification = {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: l.price,
        ...(l.maxPrice !== undefined ? { maxPrice: l.maxPrice } : {}),
      };
    } else {
      offer.price = l.price;
    }
    return [offer];
  });
}

/** The business's overall price range for schema.org priceRange: the lowest service
 *  starting price (free services aside) to the highest standalone price. */
export function priceRange(): string {
  const starts = Object.values(PRICING).flatMap((p) => {
    const price = startingPrice(p);
    return price === undefined || price === 0 ? [] : [price];
  });
  const highs = Object.values(PRICING).flatMap((p) =>
    p.lines.flatMap((l) => (l.price === null || l.add ? [] : [l.maxPrice ?? l.price]))
  );
  return `${usd(Math.min(...starts))}–${usd(Math.max(...highs))}`;
}

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
