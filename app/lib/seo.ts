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
  const branded = `${base} | ${BUSINESS_NAME}`;
  return { absolute: branded.length <= MAX_TITLE_LENGTH ? branded : base };
}
