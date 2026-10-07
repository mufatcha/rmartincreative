import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/business";
import { ABOUT } from "./lib/data/about";
import { getPassportTownPages } from "./lib/data/passport-towns";
import { getChristmasTownPages } from "./lib/data/christmas-towns";
import { SERVICE_CATEGORIES } from "./lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const servicePages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.flatMap((category) => [
    {
      url: `${SITE_URL}/services/${category.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...category.children.map((leaf) => ({
      url: `${SITE_URL}/services/${category.slug}/${leaf.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...(ABOUT.published
      ? [{ url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly" as const, priority: 0.6 }]
      : []),
    {
      url: `${SITE_URL}/service-area`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/new-business`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cards-and-photos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...servicePages,
    {
      url: `${SITE_URL}/christmas-cards`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getChristmasTownPages().map((p) => ({
      url: `${SITE_URL}/christmas-cards/${p.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/payment`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/passport-photos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getPassportTownPages().map((p) => ({
      url: `${SITE_URL}/passport-photos/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
