import { TOWNS, type Town } from "./data/towns";

// The business is "R. Martin Creative" (matches the domain, email, Google Business
// Profile, and a future LLC). Ryan Martin is the person: never put the two in the
// same sentence, title, description, or alt text.
export const BUSINESS_NAME = "R. Martin Creative";
/** Earlier name, kept only as schema.org alternateName so old searches still connect. */
export const BUSINESS_ALT_NAME = "Ryan Martin Design & Print";
export const BUSINESS_PHONE_DISPLAY = "(312) 866-2762";
export const BUSINESS_PHONE_TEL = "tel:+13128662762";
export const BUSINESS_EMAIL = "ryan@rmartincreative.com";
/** Where quote-form emails are delivered (override with QUOTE_TO_EMAIL). */
export const QUOTE_INBOX_EMAIL = BUSINESS_EMAIL;
/** Who quote-form emails come from (override with QUOTE_FROM_EMAIL). Works because
 *  rmartincreative.com is verified in Resend. */
export const QUOTE_FROM = `${BUSINESS_NAME} Quotes <quotes@rmartincreative.com>`;

export const PRODUCTION_URL = "https://rmartincreative.com";

/** The business's X (Twitter) handle, credited on shared links (app/layout.tsx). */
export const X_HANDLE = "@rmartincreative";

/** Official social profiles. Each one is listed in the schema.org `sameAs` field
 *  (LocalBusinessJsonLd), which tells search engines and AI tools these accounts
 *  all belong to this business, and linked in the footer. Add new profiles here. */
export const SOCIAL_PROFILES: { name: string; label: string; url: string }[] = [
  { name: "X", label: `${X_HANDLE} on X`, url: "https://x.com/rmartincreative" },
  { name: "Facebook", label: `${BUSINESS_NAME} on Facebook`, url: "https://www.facebook.com/profile.php?id=61595559686046" },
  // Google Business Profile, by its permanent Maps ID (cid), not a search link.
  { name: "Google", label: `${BUSINESS_NAME} on Google Maps`, url: "https://maps.google.com/?cid=3394983410703261460" },
];

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000");

// The service area comes from app/lib/data/towns.ts — the complete list of towns
// served. Chicago neighborhoods are covered by "Chicago" itself, and the home
// corridors are listed first.
const CATEGORY_ORDER: Town["category"][] = [
  "Richmond to Gurnee Corridor",
  "Richmond to West Dundee Corridor",
  "Loop Drive",
  "Chicago Metro Area",
];

export const SERVICE_AREA_CITIES: { name: string; state: string }[] = CATEGORY_ORDER.flatMap((category) =>
  TOWNS.filter((t) => t.category === category && t.type !== "chicago_neighborhood").map((t) => ({
    name: t.name,
    state: t.state,
  }))
);

export const STATE_NAMES: Record<string, string> = {
  IL: "Illinois",
  WI: "Wisconsin",
};

/** The service area grouped by state, then county (Chicago neighborhoods are
 *  covered by "Chicago"), for the About page's "Service area & local reach". */
export function serviceAreaByCounty(): { state: string; counties: { county: string; towns: string[] }[] }[] {
  const states = ["IL", "WI"];
  return states.map((state) => {
    const towns = TOWNS.filter((t) => t.state === state && t.type !== "chicago_neighborhood");
    // Home county first, then outward.
    const order = ["McHenry", "Lake", "Kane", "Cook", "Kenosha", "Walworth"];
    const counties = [...new Set(towns.map((t) => t.county))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    return {
      state,
      counties: counties.map((county) => ({
        county,
        towns: towns
          .filter((t) => t.county === county)
          .map((t) => t.name)
          .sort((a, b) => a.localeCompare(b)),
      })),
    };
  });
}

export const SERVICE_AREA_BOUNDS = {
  north: "Lake Geneva, WI",
  south: "Chicago, IL",
  west: "Woodstock, IL",
  east: "Lake Michigan",
} as const;

export const SERVICE_HOME_CITY = "Richmond";
export const SERVICE_HOME_ZIP = "60071";
export const SERVICE_STATE = "Illinois";
export const SERVICE_STATE_ABBR = "IL";

// "Trusted by" section (just above Contact). Only list real clients you have
// permission to name. Logo files go in public/company-logos/ — leave `logo` out to
// show the name as text. The section stays hidden while both lists are empty.
export const CLIENTS: { name: string; logo?: string; url?: string }[] = [
  {
    name: "DeBartolo Development",
    logo: "/company-logos/debartolo-development.png",
    url: "https://debartolodevelopment.com/",
  },
  {
    name: "Knutzen Farms",
    logo: "/company-logos/knutzen-farms.png",
    url: "https://www.knutzenfarms.com/",
  },
  {
    name: "Brooks DeBartolo Collegiate High School",
    logo: "/company-logos/brooks-debartolo-collegiate-high-school.png",
    url: "https://www.bdchs.org/",
  },
  {
    name: "Bladerunner Farms",
    logo: "/company-logos/bladerunner-farms.webp",
    url: "https://www.bladerunnerfarms.com/",
  },
  {
    name: "DeBartolo Family Foundation",
    logo: "/company-logos/debartolo-family-foundation.png",
    url: "https://debartolofamilyfoundation.org/",
  },
  {
    name: "Horizon Turf Nursery",
    logo: "/company-logos/horizon-turf-nursery.png",
    url: "https://www.horizonturfnursery.com/",
  },
  {
    name: "Ka Makana Ali‘i",
    logo: "/company-logos/ka-makana-alii.png",
    url: "https://www.kamakanaalii.com/",
  },
];

// Real customer quotes only, shared with their permission.
export const TESTIMONIALS: { quote: string; name: string; location: string }[] = [
  {
    quote:
      "I picked up the photo cards. They were gorgeous. You were an extraordinary help. An angel showed up just in time.",
    name: "Renee P.",
    location: "Gurnee, IL",
  },
  {
    quote:
      "I really appreciate your generosity and for saving me $200. Thank you for all your help.",
    name: "Megan Q.",
    location: "Gurnee, IL",
  },
];

// Real figures only, e.g. { value: 12, suffix: "+", label: "Years designing" }.
export const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 20, suffix: "+", label: "Years of website design & programming" },
  { value: 100, suffix: "+", label: "Web projects delivered" },
  { value: 1000, suffix: "+", label: "Print designs & presentations" },
  { value: 7, label: "Service categories, one point of contact" },
];
