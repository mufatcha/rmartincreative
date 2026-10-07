import type { ReactNode } from "react";
import { IconSnowflake } from "../components/icons";
import { SERVICE_AUDIENCES, getCategoriesFor, type ServiceAudience } from "./services-data";

// The Services menu, built on the server and passed to the (client) header as plain
// data with the icons already rendered. That keeps services-data.ts — every page's
// copy and FAQs — out of the JavaScript sent to visitors' browsers.

export type ServicesMenuItem = { href: string; title: string; accent: string; icon: ReactNode };
export type ServicesMenuGroup = { id: ServiceAudience; label: string; items: ServicesMenuItem[] };

const ICON_CLASS = "h-4 w-4";

export function getServicesMenu(): ServicesMenuGroup[] {
  return SERVICE_AUDIENCES.map((audience) => ({
    id: audience.id,
    label: audience.label,
    // Christmas Cards gets its own entry above Greeting Cards (its parent category)
    // so it's always one click away, all year.
    items: getCategoriesFor(audience.id).flatMap((category) => {
      const Icon = category.icon;
      const entry = {
        href: `/services/${category.slug}`,
        title: category.title,
        accent: category.accent,
        icon: <Icon className={ICON_CLASS} />,
      };
      if (category.slug !== "greeting-cards") return [entry];
      return [
        {
          href: "/services/greeting-cards/christmas-cards",
          title: "Christmas Cards",
          accent: "from-rose-600 via-red-500 to-emerald-600",
          icon: <IconSnowflake className={ICON_CLASS} />,
        },
        entry,
      ];
    }),
  }));
}
