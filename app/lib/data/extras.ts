// "Notes & Freebies" (/extras): occasional helpful notes and free downloads.
// There's no posting schedule, so the hub lists these as a collection (newest
// first), not as a dated blog. Each entry has its own page at /extras/[slug];
// add the entry here and the hub, sitemap, and llms.txt pick it up.
// After adding or changing a featured image, run `bun run social-images` to make
// its link-share image (public/social-media-posts/<slug>.jpg).
//
// Content from the Nextdoor group (Website Wednesday how-tos, before-and-after fixes,
// answers to members' questions) is published here first, with `series` set, then
// shared on Nextdoor as a short summary that links back. See DEVELOPER-NOTES.md.

import type { Metadata } from "next";
import { BUSINESS_NAME } from "../business";

export type ExtraKind = "freebie" | "note";

/** Topics, in the order the hub shows them. Add one here when a post needs it. */
export const EXTRA_CATEGORIES = [
  { id: "web", label: "Web", badge: "bg-sky-100 text-sky-700", text: "text-sky-600" },
  { id: "holidays", label: "Holidays", badge: "bg-rose-100 text-rose-700", text: "text-rose-600" },
] as const;

export type ExtraCategoryId = (typeof EXTRA_CATEGORIES)[number]["id"];

/** Recurring series from the free Nextdoor group. A post can belong to one. */
export const EXTRA_SERIES = [
  {
    id: "website-wednesday",
    label: "Website Wednesday",
    badge: "bg-violet-100 text-violet-700",
    description: "A new how-to every week, with simple steps you can take on your own website.",
  },
  {
    id: "quick-guide",
    label: "Quick Guide",
    badge: "bg-fuchsia-100 text-fuchsia-700",
    description: "Bonus guides for group members, each focused on one fix you can make in under an hour.",
  },
  {
    id: "before-after",
    label: "Before & After",
    badge: "bg-emerald-100 text-emerald-700",
    description: "Real local websites made faster, clearer, and easier to find, shared with the owner's permission.",
  },
  {
    id: "group-qa",
    label: "Ask Anything",
    badge: "bg-amber-100 text-amber-800",
    description: "Answers to real questions from group members, no question too basic.",
  },
] as const;

export type ExtraSeriesId = (typeof EXTRA_SERIES)[number]["id"];
export type ExtraSeries = (typeof EXTRA_SERIES)[number];

export function getExtraSeries(id: ExtraSeriesId): ExtraSeries {
  return EXTRA_SERIES.find((s) => s.id === id)!;
}
export type ExtraCategory = (typeof EXTRA_CATEGORIES)[number];

export function getExtraCategory(id: ExtraCategoryId): ExtraCategory {
  return EXTRA_CATEGORIES.find((c) => c.id === id)!;
}

export type Extra = {
  slug: string;
  kind: ExtraKind;
  category: ExtraCategoryId;
  /** Set for posts from the Nextdoor group: shows a series badge and a link to the group. */
  series?: ExtraSeriesId;
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
    "Plain-English guides to websites, search, and AI for small businesses, plus free printables to download. No sign-up, no email required.",
};

const EXTRAS_LIST: Extra[] = [
  {
    slug: "faster-photos-faster-website",
    kind: "note",
    category: "web",
    series: "quick-guide",
    title: "Faster Photos, Faster Website",
    description:
      "A free quick guide to WebP, AVIF, and SVG: how big your website photos should be, and the free tools that shrink them in a few clicks.",
    published: "2026-10-29",
    image: {
      src: "/webp-assets/faster-photos-faster-website.webp",
      alt: "Quick guide: Faster photos, faster website. A free guide to WebP, AVIF, SVG and the free tools that shrink them: about 35 minutes in one sitting, all free tools, and a printable PDF checklist",
      width: 1200,
      height: 896,
    },
    download: {
      href: "/downloads/Faster-Photos-Faster-Website.pdf",
      fileName: "Faster-Photos-Faster-Website.pdf",
      details: "PDF · 8 pages · printable checklist",
    },
  },
  {
    slug: "modern-design-without-the-gimmicks",
    kind: "note",
    category: "web",
    series: "website-wednesday",
    title: "Keep Your Website Modern, Minus the Gimmicks",
    description:
      "A free 90-minute guide: a 3-question test for any design trend, a phone-first review of your own site, and free Microsoft Clarity to see what visitors do.",
    published: "2026-10-29",
    image: {
      src: "/webp-assets/modern-design-without-the-gimmicks.webp",
      alt: "Website Wednesday: 3 simple questions to test any website design trend. A free guide to modern design without the gimmicks: about 90 minutes in one sitting, all free tools, and a printable PDF checklist",
      width: 1200,
      height: 896,
    },
    download: {
      href: "/downloads/Modern-Design-Without-the-Gimmicks.pdf",
      fileName: "Modern-Design-Without-the-Gimmicks.pdf",
      details: "PDF · 9 pages · printable checklist",
    },
  },
  {
    slug: "search-visibility-sprint",
    kind: "note",
    category: "web",
    series: "website-wednesday",
    title: "10 Simple Tasks to Get Found on Google and AI",
    description:
      "A free half-day plan: 10 timed tasks to set up Google Search Console and your Business Profile and make your pages easy for Google and AI to read.",
    published: "2026-10-21",
    image: {
      src: "/webp-assets/search-visibility-sprint.webp",
      alt: "Website Wednesday: 10 simple tasks to get found on Google and AI. A free search visibility sprint you can finish in one afternoon: about three and a half hours, all free tools, and a printable PDF checklist",
      width: 1200,
      height: 896,
    },
    download: {
      href: "/downloads/Search-Visibility-Sprint.pdf",
      fileName: "Search-Visibility-Sprint.pdf",
      details: "PDF · 5 pages · printable checklist",
    },
  },
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
      url: `/extras/${slug}`,
      siteName: BUSINESS_NAME,
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
