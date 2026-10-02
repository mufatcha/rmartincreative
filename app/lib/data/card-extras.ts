// Finishing-touch extras for cards: addressing and mailing, wax seals,
// envelopes, and (at Christmas) "From Santa" tags. Edit them here and the card
// service pages, their FAQs, the local Christmas pages, the quote form, and
// /llms.txt all update. Extras are quoted per job — card starting prices don't
// include them.

export type ExtraExample = { src: string; alt: string };

export type CardExtra = {
  id: string;
  title: string;
  body: string;
  /** Example photos shown in a pop-up. The "See examples" link appears once this has photos. */
  examples?: ExtraExample[];
  /** Example photos for Christmas pages, used there instead of `examples`. */
  christmasExamples?: ExtraExample[];
  /** Wording for Christmas pages, when it differs. */
  christmasBody?: string;
  /** Only offered on Christmas pages. */
  christmasOnly?: boolean;
};

export const CARD_EXTRAS: CardExtra[] = [
  {
    id: "mailing",
    title: "Addressing & mailing",
    body: "Send me your mailing list and I'll address every envelope, add postage, and drop the whole batch off at the post office — your full list, handled.",
    christmasExamples: [
      {
        src: "/webp-assets/pre-addressed-christmas-envelope.webp",
        alt: "A red Christmas envelope addressed in navy script with a return address and a wreath Christmas stamp, beside a gold-foil Merry Christmas card with a handwritten note inside",
      },
    ],
  },
  {
    id: "wax-seals",
    title: "Hand-pressed wax seals",
    body: "Every seal is poured and pressed by hand, so no two are exactly alike. Choose one color or two-tone with an accent color, in any color, with any letters or monogram.",
    christmasBody:
      "Every seal is poured and pressed by hand, so no two are exactly alike. Choose one color or two-tone with an accent color, in any color, with any letters or monogram — or a Christmas-themed stamp.",
    christmasExamples: [
      {
        src: "/webp-assets/wax-stamp-christmas-envelope.webp",
        alt: "Cream envelope sealed with a two-tone wax seal, deep red with a gold pine sprig design, on a wooden table in front of a lit Christmas tree",
      },
    ],
  },
  {
    id: "envelopes",
    title: "Custom envelopes & liners",
    body: "Envelopes and patterned liners custom-designed to match your cards, so the first thing people see when they open it already feels like part of the set.",
    christmasBody: "Envelopes and patterned liners custom-designed to match your cards, or festive Christmas-themed envelopes.",
    christmasExamples: [
      {
        src: "/webp-assets/custom-christmas-envelope.webp",
        alt: "Open red envelope with a custom black-and-white liner patterned with reindeer, Christmas trees, and snowflakes, in front of a lit Christmas tree",
      },
    ],
  },
  {
    id: "santa-tags",
    title: "Personalized “From Santa” tags",
    body: "Custom gift tags from Santa himself, personalized with each child's name, ready for the presents under the tree.",
    christmasOnly: true,
    examples: [
      {
        src: "/webp-assets/santa-tags.webp",
        alt: "Vintage-style kraft gift tags reading “For Lily,” “For Noah,” “For Chloe,” and “For Hana,” each marked “From Santa” with a red sleigh, beside wrapped presents in front of a Christmas tree",
      },
    ],
  },
];

/** Anchor id of the extras section, for the "Make Them One of a Kind" button. */
export const CARD_EXTRAS_ANCHOR = "finishing-touches";

export const CARD_EXTRAS_NOTE = "Extras are quoted per job and aren't included in card design starting prices.";

/** Card service pages that offer extras, keyed "category/leaf". */
const EXTRAS_PAGES: Record<string, "christmas" | "standard"> = {
  "greeting-cards/christmas-cards": "christmas",
  "greeting-cards/everyday-cards": "standard",
  "greeting-cards/wedding-invitations": "standard",
};

/** The extras for a page, with the right wording — empty if the page has none. */
export function getCardExtras(key: string): { title: string; body: string; examples: ExtraExample[] }[] {
  const kind = EXTRAS_PAGES[key];
  if (!kind) return [];
  return CARD_EXTRAS.filter((e) => kind === "christmas" || !e.christmasOnly).map((e) => ({
    title: e.title,
    body: kind === "christmas" ? e.christmasBody ?? e.body : e.body,
    examples: (kind === "christmas" ? e.christmasExamples ?? e.examples : e.examples) ?? [],
  }));
}

/** Short names, e.g. for lists: "addressing & mailing, hand-pressed wax seals, …". */
export function cardExtrasList(christmas: boolean): string {
  return CARD_EXTRAS.filter((e) => christmas || !e.christmasOnly)
    .map((e) => e.title.charAt(0).toLowerCase() + e.title.slice(1))
    .join(", ");
}
