// Hero badge headline + header nav link that rotate through the year.
// Edit the text, icon, nav label, or nav href for any month here — the site
// picks it up automatically everywhere (hero badge and header nav both read
// from this one file, so they can never drift out of sync).

export type SeasonIcon = "globe" | "shirt" | "presentation" | "card" | "snowflake" | "sign";

export type SeasonalBadge = { text: string; icon: SeasonIcon };
export type SeasonalNavLink = { label: string; href: string };

type SeasonalContent = { badge: SeasonalBadge; nav: SeasonalNavLink };

// Index 0 = January … 11 = December (December is split below).
const MONTHLY: SeasonalContent[] = [
  {
    badge: { text: "Start the Year with a New Website", icon: "globe" },
    nav: { label: "New Websites", href: "/services/website-design-development" },
  },
  {
    badge: { text: "Book Spring Yard Signs", icon: "sign" },
    nav: { label: "Yard Signs", href: "/services/signs-posters/yard-signs" },
  },
  {
    badge: { text: "Custom Pitch Decks & Business Docs", icon: "presentation" },
    nav: { label: "Pitch Decks", href: "/services/business-printing/business-documents" },
  },
  {
    badge: { text: "Order Custom T-Shirts & Apparel", icon: "shirt" },
    nav: { label: "T-Shirts & Apparel", href: "/services/apparel" },
  },
  {
    badge: { text: "Custom Wedding Invitations & Signs", icon: "card" },
    nav: { label: "Wedding Invitations", href: "/services/greeting-cards/wedding-invitations" },
  },
  {
    badge: { text: "Now booking graduation & event cards", icon: "card" },
    nav: { label: "Graduation Cards", href: "/services/greeting-cards/everyday-cards" },
  },
  {
    badge: { text: "Now booking graduation & event cards", icon: "card" },
    nav: { label: "Graduation Cards", href: "/services/greeting-cards/everyday-cards" },
  },
  {
    badge: { text: "Custom Spirit Wear", icon: "shirt" },
    nav: { label: "Spirit Wear", href: "/services/apparel" },
  },
  {
    badge: { text: "Now Booking Christmas Cards", icon: "snowflake" },
    nav: { label: "Christmas Cards", href: "/services/greeting-cards/christmas-cards" },
  },
  {
    badge: { text: "Now Booking Christmas Cards", icon: "snowflake" },
    nav: { label: "Christmas Cards", href: "/services/greeting-cards/christmas-cards" },
  },
  {
    badge: { text: "Now Booking Christmas Cards", icon: "snowflake" },
    nav: { label: "Christmas Cards", href: "/services/greeting-cards/christmas-cards" },
  },
  {
    // Dec 1–20
    badge: { text: "Last Call for Christmas Cards", icon: "snowflake" },
    nav: { label: "Christmas Cards", href: "/services/greeting-cards/christmas-cards" },
  },
];

const DECEMBER_LATE: SeasonalContent = {
  // Dec 21–31
  badge: { text: "Year-End Search + AI Health Checks", icon: "globe" },
  nav: { label: "Search + AI Check", href: "/services/search-ai-discovery/search-health-check" },
};

// The business is in Northern Illinois, so switch over on local (Central) time.
const TIME_ZONE = "America/Chicago";

function resolveSeasonalContent(now: Date): SeasonalContent {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const month = Number(parts.find((p) => p.type === "month")?.value) - 1;
  const day = Number(parts.find((p) => p.type === "day")?.value);

  if (month === 11 && day >= 21) return DECEMBER_LATE;
  return MONTHLY[month];
}

export function getSeasonalBadge(now: Date = new Date()): SeasonalBadge {
  return resolveSeasonalContent(now).badge;
}

export function getSeasonalNavLink(now: Date = new Date()): SeasonalNavLink {
  return resolveSeasonalContent(now).nav;
}
