import type { Metadata } from "next";
import { BUSINESS_NAME } from "./business";

/** Search engines cut titles off past about 60 characters (Google ~60, Bing ~70). */
export const MAX_TITLE_LENGTH = 60;

/**
 * A page title with " | R. Martin Creative" added only when the whole thing still
 * fits; otherwise just the descriptive part, which is what people search for.
 * Returned as `absolute` so the layout's title template doesn't add the name again.
 */
export function pageTitle(base: string): Metadata["title"] {
  return { absolute: pageTitleText(base) };
}

/** The title text `pageTitle` resolves to, for share tags. */
export function pageTitleText(base: string): string {
  const branded = `${base} | ${BUSINESS_NAME}`;
  return branded.length <= MAX_TITLE_LENGTH ? branded : base;
}

/** The site-wide share image, used by pages without their own. A static file, not a
 *  generated route, so Facebook and X can always fetch it. */
export type ShareImage = { url: string; width: number; height: number; alt: string };

export const SITE_SHARE_IMAGE: ShareImage = {
  url: "/social-media-posts/site-share.jpg",
  width: 1200,
  height: 630,
  alt: "R. Martin Creative — Marketing, Web & Print in Northern Illinois and Southeast Wisconsin",
};

/** The Markdown copy of a page, served by app/agent-markdown through the `.md`
 *  rewrites in next.config.ts: `/services` → `/services.md`, `/` → `/index.md`. */
export function markdownPath(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? "/index.md" : `${clean}.md`;
}

/** A page's canonical address plus a `<link rel="alternate" type="text/markdown">`
 *  to its Markdown copy (llms.txt v2). Unlisted (noindex) pages get no Markdown link. */
export function pageAlternates(path: string, noindex = false): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    ...(!noindex && { types: { "text/markdown": markdownPath(path) } }),
  };
}

/**
 * A page's title, description, and canonical address, plus matching Open Graph
 * and X tags. Without its own share tags, a page inherits the layout's, and
 * Facebook would treat it as the home page. Pass `absolute` to use the title as-is.
 */
export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
  image = SITE_SHARE_IMAGE,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  /** A 1200×630 share image for this page; defaults to the site-wide one. */
  image?: ShareImage;
  /** Keeps the page out of search results (it can still be linked and followed),
   *  for unlisted pages like the demo sites. Leave it out of the sitemap too. */
  noindex?: boolean;
}): Metadata {
  const text = absolute ? title : pageTitleText(title);
  return {
    title: { absolute: text },
    description,
    alternates: pageAlternates(path, noindex),
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: { title: text, description, url: path, siteName: BUSINESS_NAME, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: text, description, images: [image] },
  };
}
