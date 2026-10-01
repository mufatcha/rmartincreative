import { TOWNS, type Town } from "./data/towns";

export const BUSINESS_NAME = "Ryan Martin Design & Print";
export const BUSINESS_PHONE_DISPLAY = "(312) 866-2762";
export const BUSINESS_PHONE_TEL = "tel:+13128662762";
export const BUSINESS_EMAIL = "rmartincreative@gmail.com";

export const PRODUCTION_URL = "https://rmartincreative.com";

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

export const SERVICE_AREA_BOUNDS = {
  north: "Lake Geneva, WI",
  south: "Chicago, IL",
  west: "Woodstock, IL",
  east: "Lake Michigan",
} as const;

export const SERVICE_HOME_CITY = "Richmond";
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
