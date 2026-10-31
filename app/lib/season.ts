// Hero badge headline + header nav link that rotate through the year.
// Edit the text, icon, nav label, or nav href for any month here — the site
// picks it up automatically everywhere (hero badge and header nav both read
// from this one file, so they can never drift out of sync).

export type SeasonIcon = "globe" | "shirt" | "presentation" | "card" | "snowflake" | "sign" | "passport";

export type SeasonalBadge = { text: string; icon: SeasonIcon };
/** The badge plus where it links: the same page as that month's nav link. */
export type SeasonalBadgeLink = SeasonalBadge & { href: string };
export type SeasonalNavLink = { label: string; href: string };

type SeasonalContent = { badge: SeasonalBadge; nav: SeasonalNavLink };

// Index 0 = January … 11 = December (December is split below).
/**
 * The last day for guaranteed Christmas card printing and shipping, shown in the hero
 * badge from September until it passes. Cards can still be ordered after it. Update both fields each year (see DEVELOPER-NOTES.md).
 */
export const HOLIDAY_CARD_DEADLINE = {
  label: "Nov 27",
  /** When the badge switches to last call: 12:00 am the day after, Central time. */
  endsAt: "2026-11-28T00:00:00-06:00",
};

const HOLIDAY_CARDS: SeasonalContent = {
  badge: { text: `Christmas cards: guaranteed if ordered by ${HOLIDAY_CARD_DEADLINE.label}`, icon: "snowflake" },
  nav: { label: "Holiday Cards", href: "/services/greeting-cards/christmas-cards" },
};

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
    badge: { text: "At-Home Passport Photos for Summer Travel", icon: "passport" },
    nav: { label: "Passport Photos", href: "/services/passport-photos" },
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
  HOLIDAY_CARDS, // September
  HOLIDAY_CARDS, // October
  HOLIDAY_CARDS, // November (until the guarantee ends; then December's last call)
  {
    // Dec 1–20 (and the end of November, once the guarantee ends)
    badge: { text: "Last Call for Holiday Cards", icon: "snowflake" },
    nav: { label: "Christmas Cards", href: "/services/greeting-cards/christmas-cards" },
  },
];

const DECEMBER_LATE: SeasonalContent = {
  // Dec 21–31
  badge: { text: "Year-End Website + Search Health Checks", icon: "globe" },
  nav: { label: "Free Health Check", href: "/services/search-ai-discovery/search-health-check" },
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
  if (month === 10 && now >= new Date(HOLIDAY_CARD_DEADLINE.endsAt)) return MONTHLY[11];
  return MONTHLY[month];
}

export function getSeasonalBadge(now: Date = new Date()): SeasonalBadgeLink {
  const { badge, nav } = resolveSeasonalContent(now);
  return { ...badge, href: nav.href };
}

export function getSeasonalNavLink(now: Date = new Date()): SeasonalNavLink {
  return resolveSeasonalContent(now).nav;
}
