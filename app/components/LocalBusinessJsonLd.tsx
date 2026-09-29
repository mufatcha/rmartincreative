import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE_TEL,
  SERVICE_AREA_CITIES,
  SERVICE_HUB_CITY,
  SERVICE_STATE_ABBR,
  STATE_NAMES,
  SITE_URL,
} from "../lib/business";

function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: BUSINESS_NAME,
    founder: { "@type": "Person", name: "Ryan Martin" },
    description:
      "Freelance design, print, and web services covering Christmas & holiday cards, greeting cards, business cards, brochures, business documents, custom apparel (FeedTheFlames), website design & development, and photo scanning, restoration, and color correction across Northern Illinois and southern Wisconsin.",
    url: SITE_URL,
    telephone: BUSINESS_PHONE_TEL,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: SERVICE_HUB_CITY,
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
