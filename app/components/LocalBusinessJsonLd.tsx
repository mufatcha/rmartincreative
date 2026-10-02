import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE_TEL,
  SERVICE_AREA_CITIES,
  SERVICE_HOME_CITY,
  SERVICE_STATE_ABBR,
  STATE_NAMES,
  SITE_URL,
} from "../lib/business";
import { ABOUT } from "../lib/data/about";

function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    founder: ABOUT.published
      ? { "@type": "Person", "@id": `${SITE_URL}/about#ryan-martin`, name: "Ryan Martin", url: `${SITE_URL}/about` }
      : { "@type": "Person", name: "Ryan Martin" },
    description:
      "An outsourced marketing team for small businesses: websites, search and AI visibility, business printing, signs, and apparel (FeedTheFlames), plus custom Christmas and greeting cards and photo restoration for families. Based in Richmond, IL, serving Northern Illinois and Southeast Wisconsin.",
    slogan: "Your marketing team, without the payroll.",
    url: SITE_URL,
    telephone: BUSINESS_PHONE_TEL,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: SERVICE_HOME_CITY,
      addressRegion: SERVICE_STATE_ABBR,
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

export default function LocalBusinessJsonLd() {
  const schema = buildSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
