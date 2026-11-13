import { BUSINESS_EMAIL } from "../business";

// Step-by-step guides for clients, at /start/onboarding-tasks/<slug>. Unlisted
// and noindex like the rest of /start. Listed on the onboarding admin page so
// Ryan can copy a link into a note or task. Add new guides here.

export type Guide = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
  /** The guide fills in the client's domain from ?domain=example.com. */
  takesDomain?: boolean;
  /** Parts that can be linked on their own: /start/onboarding-tasks/<slug>#<id>.
   *  `group` puts them under a heading in the page's contents. */
  sections?: { id: string; title: string; group?: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "cloudflare-domain",
    title: "Move your domain to Cloudflare",
    description:
      "Create a free Cloudflare account, add your domain, switch its nameservers at Namecheap, and invite me so I can set up email and DNS.",
    minutes: 10,
    takesDomain: true,
  },
  {
    slug: "access-sharing",
    title: "How to share account access",
    description: "Simple steps for sharing your accounts with me, so I can help without needing your password. Link one service on its own, e.g. …/access-sharing#namecheap.",
    minutes: 3,
    takesDomain: true,
    sections: [
      { id: "namecheap", title: "Namecheap", group: "Domain & DNS" },
      { id: "godaddy", title: "GoDaddy", group: "Domain & DNS" },
      { id: "squarespace-domains", title: "Squarespace Domains", group: "Domain & DNS" },
      { id: "cloudflare", title: "Cloudflare", group: "Domain & DNS" },
      { id: "google-business-profile", title: "Google Business Profile", group: "Google & Bing" },
      { id: "google-analytics", title: "Google Analytics", group: "Google & Bing" },
      { id: "google-search-console", title: "Google Search Console", group: "Google & Bing" },
      { id: "bing-places", title: "Bing Places", group: "Google & Bing" },
      { id: "facebook-instagram", title: "Facebook & Instagram", group: "Social media" },
      { id: "wordpress", title: "WordPress", group: "Website" },
      { id: "wix", title: "Wix", group: "Website" },
      { id: "squarespace", title: "Squarespace website", group: "Website" },
      { id: "mailchimp", title: "Mailchimp", group: "Email marketing" },
    ],
  },
  {
    slug: "google-bing-listings",
    title: "Setting up your Google & Bing listings",
    description:
      "Create your Google Business Profile, copy it to Bing Places, and keep Bing up to date automatically when you make changes on Google.",
    minutes: 20,
    sections: [
      { id: "google-business-profile", title: "Create your Google Business Profile" },
      { id: "bing-places", title: "Add it to Bing Places" },
      { id: "keep-bing-in-sync", title: "Keep Bing in sync" },
    ],
  },
  {
    slug: "yelp",
    title: "Setting up your Yelp page",
    description: "Claim your business on Yelp (or add it if it isn't there yet). It's free.",
    minutes: 10,
  },
  {
    slug: "facebook-page",
    title: "Setting up your Facebook Page",
    description: "Create a Facebook Page for your business, separate from your personal profile.",
    minutes: 10,
  },
  {
    slug: "nextdoor",
    title: "Setting up your Nextdoor business page",
    description: "Claim or create your free Nextdoor business page so neighbors can find and recommend you.",
    minutes: 10,
  },
  {
    slug: "apple-maps",
    title: "Setting up your Apple Maps listing",
    description: "Claim your place on Apple Maps with Apple Business, so you show up correctly on iPhones, Siri, and Apple Maps.",
    minutes: 15,
  },
];

export const guidePath = (slug: string) => `/start/onboarding-tasks/${slug}`;

/** The addresses clients add when giving Ryan access. Each must be the email
 *  (or, for Namecheap, the username) of Ryan's own account on that service. */
/** The Gmail account Ryan signs in to client services with (not the business
 *  inbox, BUSINESS_EMAIL). */
const SERVICES_EMAIL = "rmartincreative@gmail.com";

export const ACCESS_EMAILS = {
  cloudflare: SERVICES_EMAIL,
  namecheap: SERVICES_EMAIL,
  godaddy: SERVICES_EMAIL,
  squarespace: SERVICES_EMAIL,
  /** Google Business Profile, Analytics, Search Console: must be a Google account. */
  google: SERVICES_EMAIL,
  /** Must be the email on Ryan's Facebook account (the business inbox, not the Gmail). */
  meta: BUSINESS_EMAIL,
  wordpress: SERVICES_EMAIL,
  wix: SERVICES_EMAIL,
  mailchimp: SERVICES_EMAIL,
};

/** The username to create on a client's WordPress site. */
export const WORDPRESS_USERNAME = "rmartincreative";

export const CLOUDFLARE_INVITE_EMAIL = ACCESS_EMAILS.cloudflare;

/** A domain from the address bar, or null if it doesn't look like one. */
export function cleanDomain(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const d = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
  return /^(?=.{3,253}$)[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d) ? d : null;
}
