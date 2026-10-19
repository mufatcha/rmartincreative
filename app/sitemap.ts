import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/business";
import { ABOUT } from "./lib/data/about";
import { EXTRAS } from "./lib/data/extras";
import { getPassportTownPages } from "./lib/data/passport-towns";
import { getChristmasTownPages } from "./lib/data/christmas-towns";
import { SERVICE_CATEGORIES } from "./lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified on pages without a real edit date: Google ignores a lastmod that
  // always says "now". Extras posts carry their published date.

  const servicePages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.flatMap((category) => [
    {
      url: `${SITE_URL}/services/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...category.children.map((leaf) => ({
      url: `${SITE_URL}/services/${category.slug}/${leaf.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...(ABOUT.published
      ? [{ url: `${SITE_URL}/about`, changeFrequency: "yearly" as const, priority: 0.6 }]
      : []),
    {
      url: `${SITE_URL}/service-area`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/new-business`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cards-and-photos`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...servicePages,
    {
      url: `${SITE_URL}/christmas-cards`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getChristmasTownPages().map((p) => ({
      url: `${SITE_URL}/christmas-cards/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    {
      url: `${SITE_URL}/extras`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...EXTRAS.map((e) => ({
      url: `${SITE_URL}/extras/${e.slug}`,
      lastModified: new Date(e.published),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/payment`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/passport-photos`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getPassportTownPages().map((p) => ({
      url: `${SITE_URL}/passport-photos/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
