import {
  BUSINESS_EMAIL,
  BUSINESS_ALT_NAME,
  BUSINESS_NAME,
  BUSINESS_PHONE_SCHEMA,
  SERVICE_AREA_CITIES,
  SERVICE_HOME_CITY,
  SERVICE_HOME_ZIP,
  SERVICE_STATE_ABBR,
  STATE_NAMES,
  SITE_URL,
  SOCIAL_PROFILES,
  FEEDTHEFLAMES_URL,
  BUSINESS_HOURS,
} from "../lib/business";
import { ABOUT } from "../lib/data/about";
import { PAYMENT_ACCEPTED } from "../lib/data/payments";
import { priceRange } from "../lib/data/pricing";

function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_ALT_NAME,
    founder: ABOUT.published
      ? { "@type": "Person", "@id": `${SITE_URL}/about#ryan-martin`, name: "Ryan Martin", url: `${SITE_URL}/about` }
      : { "@type": "Person", name: "Ryan Martin" },
    description:
      "An outsourced marketing team for small businesses: websites, search and AI visibility, logos, business printing, signs, and custom apparel through its FeedTheFlames T-shirt brand, plus custom Christmas and greeting cards and photo restoration for families. Based in Richmond, IL, serving Northern Illinois and Southeast Wisconsin.",
    logo: `${SITE_URL}/brand/rm-logo-1024.png`,
    image: [`${SITE_URL}/social-media-posts/google-business-profile-cover.jpg`, `${SITE_URL}/brand/rm-logo-1024.png`],
    // Richmond's village center, not a street address: the business serves customers where they are.
    geo: { "@type": "GeoCoordinates", latitude: 42.4764, longitude: -88.3058 },
    brand: { "@type": "Brand", name: "FeedTheFlames", url: FEEDTHEFLAMES_URL },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: BUSINESS_HOURS.opens,
      closes: BUSINESS_HOURS.closes,
    },
    slogan: "Smarter websites. Measured results. Real growth.",
    paymentAccepted: PAYMENT_ACCEPTED,
    currenciesAccepted: "USD, BTC, DOGE, SOL, SUI",
    url: SITE_URL,
    sameAs: SOCIAL_PROFILES.filter((profile) => profile.sameAs !== false).map((profile) => profile.url),
    telephone: BUSINESS_PHONE_SCHEMA,
    priceRange: priceRange(),
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: SERVICE_HOME_CITY,
      addressRegion: SERVICE_STATE_ABBR,
      postalCode: SERVICE_HOME_ZIP,
      addressCountry: "US",
    },
    areaServed: SERVICE_AREA_CITIES.map((city) => ({
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: STATE_NAMES[city.state],
      },
    })),
  };
}

/** WebSite markup, which helps Google show "R. Martin Creative" as the site name in results. */
function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_ALT_NAME,
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-US",
  };
}

export default function LocalBusinessJsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteSchema()) }} />
    </>
  );
}
