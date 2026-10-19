// "Notes & Freebies" (/extras): occasional helpful notes and free downloads.
// There's no posting schedule, so the hub lists these as a collection (newest
// first), not as a dated blog. Each entry has its own page at /extras/[slug];
// add the entry here and the hub, sitemap, and llms.txt pick it up.
// After adding or changing a featured image, run `bun run social-images` to make
// its link-share image (public/social-media-posts/<slug>.jpg).

import type { Metadata } from "next";

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
    slug: "future-proof-website-data-beyond-wordpress",
    kind: "note",
    category: "web",
    title: "How to Future-Proof Website Data Beyond Traditional WordPress",
    description:
      "Why WordPress's all-in-one design locks content in, and how headless CMS, structured schemas, and API-first systems keep your website data flexible for years.",
    published: "2026-10-18",
    image: {
      src: "/webp-assets/future-proof-website-data-beyond-wordpress.webp",
      alt: "Future-Proof Website Data Beyond WordPress: WordPress sites connected by API pipelines to a headless CMS data hub, which sends content through GraphQL and JSON to cloud servers, a mobile app, and AI APIs",
      width: 1200,
      height: 896,
    },
  },
  {
    slug: "schema-markup-json-ld-seo-ai",
    kind: "note",
    category: "web",
    title: "Schema Markup & JSON-LD for SEO and AI",
    description:
      "What schema markup and JSON-LD are, how structured data affects Google rankings, rich results, and AI answers, and what every small business site needs.",
    published: "2026-10-12",
    image: {
      src: "/webp-assets/schema-markup-for-seo-and-ai.webp",
      alt: "Schema Markup & JSON-LD for SEO and AI: glowing AI brain chips connected through a data network to rich search results with star ratings, product and video cards, and JSON-LD code panels with rising ranking arrows",
      width: 1600,
      height: 1195,
    },
  },
  {
    slug: "headless-cms-vs-wordpress",
    kind: "note",
    category: "web",
    title: "Headless CMS vs. WordPress, Explained",
    description:
      "What a headless CMS is, and why it can beat traditional WordPress on speed, security, and design freedom while your team still edits content easily.",
    published: "2026-10-09",
    image: {
      src: "/webp-assets/wordpress-vs-cms.webp",
      alt: "Headless CMS vs. WordPress, Explained: an API server and databases connected through a glowing data network to WordPress dashboards, plugin pieces, and website layouts",
      width: 1200,
      height: 896,
    },
  },
  {
    slug: "free-domain-email-gmail-cloudflare-resend",
    kind: "note",
    category: "web",
    title: "Free @YourDomain Email in Gmail with Cloudflare & Resend",
    description:
      "How to set up free custom domain email in your personal Gmail: Cloudflare Email Routing receives, Resend sends. A free Google Workspace alternative.",
    published: "2026-10-09",
    image: {
      src: "/webp-assets/free-yourdomain-email.webp",
      alt: "Free @YourDomain Email in Gmail with Cloudflare & Resend: a Gmail inbox and @ symbol linked by a data pipeline through Cloudflare custom routing and DNS to Resend's sending API",
      width: 1200,
      height: 896,
    },
  },
  {
    slug: "nextjs-cloudflare-github-hosting",
    kind: "note",
    category: "web",
    title: "Next.js Hosting on Cloudflare & GitHub",
    description:
      "How pairing Next.js with GitHub and Cloudflare gives your small business ultra-fast, zero-cost website hosting without server maintenance.",
    published: "2026-10-09",
    image: {
      src: "/webp-assets/nextjs-hosting-cloudflare-github.webp",
      alt: "Next.js Hosting on Cloudflare & GitHub: GitHub code branches flowing through a CI/CD pipeline to the Cloudflare cloud, which serves the deployed React site around the globe",
      width: 1200,
      height: 896,
    },
  },
  {
    slug: "benefits-of-a-nextjs-website",
    kind: "note",
    category: "web",
    title: "Benefits of a Modern Next.js Website",
    description:
      "Why a modern Next.js website loads faster, is easier to find on Google and AI, is safer, and costs less to host — explained in plain English.",
    published: "2026-10-09",
    image: {
      src: "/webp-assets/modern-nextjs-website.webp",
      alt: "Benefits of a Modern Next.js Website: speed gauges and a lightning bolt, rising performance charts, SEO first-page and conversion-rate panels, and a shopping cart along a glowing data path",
      width: 1200,
      height: 896,
    },
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

/** Link-share image size (Facebook, X, LinkedIn). Made by scripts/social-images.ts. */
export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };

export function socialImagePath(slug: string): string {
  return `/social-media-posts/${slug}.jpg`;
}

/** Open Graph and X tags for a post: its own title and description, and its
 *  link-share image when it has a featured image. */
export function extraShareMetadata({ slug, title, description, image }: Extra): Pick<Metadata, "openGraph" | "twitter"> {
  const url = socialImagePath(slug);
  return {
    openGraph: {
      title,
      description,
      type: "article",
      ...(image ? { images: [{ url, ...SOCIAL_IMAGE_SIZE, alt: image.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [{ url, alt: image.alt }] } : {}),
    },
  };
}
