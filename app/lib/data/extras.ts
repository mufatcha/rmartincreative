// "Notes & Freebies" (/extras): occasional helpful notes and free downloads.
// There's no posting schedule, so the hub lists these as a collection (newest
// first), not as a dated blog. Each entry has its own page at /extras/[slug];
// add the entry here and the hub, sitemap, and llms.txt pick it up.

export type ExtraKind = "freebie" | "note";

/** Topics, in the order the hub shows them. Add one here when a post needs it. */
export const EXTRA_CATEGORIES = [
  { id: "web", label: "Web", badge: "bg-sky-100 text-sky-700", text: "text-sky-600" },
  { id: "holidays", label: "Holidays", badge: "bg-rose-100 text-rose-700", text: "text-rose-600" },
] as const;

export type ExtraCategoryId = (typeof EXTRA_CATEGORIES)[number]["id"];
export type ExtraCategory = (typeof EXTRA_CATEGORIES)[number];

export function getExtraCategory(id: ExtraCategoryId): ExtraCategory {
  return EXTRA_CATEGORIES.find((c) => c.id === id)!;
}

export type Extra = {
  slug: string;
  kind: ExtraKind;
  category: ExtraCategoryId;
  /** Page title and card heading. Keep it under ~45 characters so the brand fits in the <title>. */
  title: string;
  /** Meta description and card blurb: 160 characters or fewer. */
  description: string;
  /** ISO date: used for ordering and the sitemap, not shown prominently. */
  published: string;
  /** Card and share image. Notes without one get a text-only card on the hub. */
  image?: { src: string; alt: string; width: number; height: number };
  download?: {
    href: string;
    /** The name the file is saved as on the visitor's computer. */
    fileName: string;
    details: string;
  };
};

export const EXTRAS_HUB = {
  title: "Notes & Freebies",
  description:
    "Free printables and helpful notes on design, print, and marketing — no sign-up, no email required. Download, personalize, and print at home.",
};

const EXTRAS_LIST: Extra[] = [
  {
    slug: "headless-cms-vs-wordpress",
    kind: "note",
    category: "web",
    title: "Headless CMS vs. WordPress, Explained",
    description:
      "What a headless CMS is, and why it can beat traditional WordPress on speed, security, and design freedom while your team still edits content easily.",
    published: "2026-10-09",
  },
  {
    slug: "free-domain-email-gmail-cloudflare-resend",
    kind: "note",
    category: "web",
    title: "Free @YourDomain Email Using Gmail",
    description:
      "Step by step: get free you@yourbusiness.com email in Gmail. Cloudflare Email Routing forwards incoming mail, and Resend sends from your domain.",
    published: "2026-10-09",
  },
  {
    slug: "nextjs-cloudflare-github-hosting",
    kind: "note",
    category: "web",
    title: "Next.js Hosting on Cloudflare & GitHub",
    description:
      "How a Next.js site hosted on Cloudflare and backed up on GitHub loads fast, stays secure, never loses a change, and often costs nothing to host.",
    published: "2026-10-09",
  },
  {
    slug: "benefits-of-a-nextjs-website",
    kind: "note",
    category: "web",
    title: "Benefits of a Modern Next.js Website",
    description:
      "Why a modern Next.js website loads faster, is easier to find on Google and AI, is safer, and costs less to host — explained in plain English.",
    published: "2026-10-09",
  },
  {
    slug: "free-santa-gift-tags",
    kind: "freebie",
    category: "holidays",
    title: "Free Printable “From Santa” Gift Tags",
    description:
      "Six festive “From Santa” gift tags in one fillable PDF. Type your child's name once, pick how Santa got in, and print at home — free, no email needed.",
    published: "2026-10-09",
    image: {
      src: "/webp-assets/personalized-santa-tags/full-pdf-image.webp",
      alt: "A printable letter-size sheet of six vintage-style “From Santa” gift tags, each with a blank name line, “Nice” already checked, and Chimney, Window, and Door checkboxes",
      width: 610,
      height: 790,
    },
    download: {
      href: "/downloads/personalized-from-santa-gift-tags.pdf",
      fileName: "From-Santa-Gift-Tags.pdf",
      details: "Fillable PDF · 1 letter-size page (8.5×11) · 6 tags",
    },
  },
];

/** Every extra, newest first. */
export const EXTRAS: Extra[] = [...EXTRAS_LIST].sort((a, b) => b.published.localeCompare(a.published));

export function getExtra(slug: string): Extra | undefined {
  return EXTRAS.find((e) => e.slug === slug);
}
