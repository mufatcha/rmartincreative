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

/** The site-wide share image (app/opengraph-image.tsx), used by pages without their own. */
const SITE_SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "R. Martin Creative — Marketing, Web & Print in Northern Illinois and Southeast Wisconsin",
};

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
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
}): Metadata {
  const text = absolute ? title : pageTitleText(title);
  return {
    title: { absolute: text },
    description,
    alternates: { canonical: path },
    openGraph: { title: text, description, url: path, siteName: BUSINESS_NAME, type: "website", images: [SITE_SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: text, description, images: [SITE_SHARE_IMAGE] },
  };
}
