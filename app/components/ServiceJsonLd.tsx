import { SITE_URL } from "../lib/business";
import { getPricing, schemaOffers, startingPrice } from "../lib/data/pricing";
import type { ServiceCategory, ServiceLeaf } from "../lib/services-data";

// schema.org Service markup for a service page, with its prices as Offers, so search
// engines and AI tools can read prices directly instead of parsing page text.

export default function ServiceJsonLd({ category, leaf }: { category: ServiceCategory; leaf?: ServiceLeaf }) {
  const item = leaf ?? category;
  const path = leaf ? `/services/${category.slug}/${leaf.slug}` : `/services/${category.slug}`;
  const pricing = leaf ? getPricing(category.slug, leaf.slug) : getPricing(category.slug);

  // A category without its own prices lists each priced service's starting price.
  const offers = pricing
    ? schemaOffers(pricing)
    : leaf
      ? []
      : category.children.flatMap((child) => {
          const childPricing = getPricing(category.slug, child.slug);
          const price = childPricing && startingPrice(childPricing);
          if (price === undefined) return [];
          return [
            {
              "@type": "Offer",
              name: child.title,
              url: `${SITE_URL}/services/${category.slug}/${child.slug}`,
              priceCurrency: "USD",
              priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: price },
            },
          ];
        });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    serviceType: item.title,
    description: item.metaDescription,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#business` },
    ...(offers.length > 0 ? { offers } : {}),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
