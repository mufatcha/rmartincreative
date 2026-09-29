import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/business";
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
    {
      url: `${SITE_URL}/cards-and-photos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...servicePages,
  ];
}
