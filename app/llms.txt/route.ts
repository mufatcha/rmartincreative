import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE_DISPLAY,
  PRODUCTION_URL,
  SERVICE_HOME_CITY,
} from "../lib/business";
import { ABOUT } from "../lib/data/about";
import { TOWN_GROUPS, getChristmasTownPages } from "../lib/data/christmas-towns";
import { TOWNS } from "../lib/data/towns";
import { SERVICE_AUDIENCES, getCategoriesFor } from "../lib/services-data";

// /llms.txt — a plain-language summary of the business for AI assistants
// (see llmstxt.org). Built from the same data as the site, so it stays current.
export const dynamic = "force-static";

export function GET() {
  const site = PRODUCTION_URL;
  const url = (path: string) => `${site}${path}`;

  const services = SERVICE_AUDIENCES.map((audience) => {
    const lines = getCategoriesFor(audience.id).flatMap((c) => [
      `- [${c.title}](${url(`/services/${c.slug}`)}): ${c.metaDescription}`,
      ...c.children.map((leaf) => `  - [${leaf.title}](${url(`/services/${c.slug}/${leaf.slug}`)}): ${leaf.metaDescription}`),
    ]);
    return [`### ${audience.label}`, ...lines].join("\n");
  }).join("\n\n");

  const towns = TOWNS.filter((t) => t.type !== "chicago_neighborhood").map((t) => `${t.name}, ${t.state}`);

  const christmas = TOWN_GROUPS.map((g) => {
    const pages = getChristmasTownPages().filter((p) => p.content.group === g.id);
    if (pages.length === 0) return "";
    return pages.map((p) => `- [${p.name}, ${p.town.state}](${url(`/christmas-cards/${p.slug}`)})`).join("\n");
  })
    .filter(Boolean)
    .join("\n");

  const body = `# ${BUSINESS_NAME}

> ${BUSINESS_NAME} is Ryan Martin, a one-person design, web, and print studio based in ${SERVICE_HOME_CITY}, Illinois. It works as an outsourced marketing team for small businesses — websites, search and AI visibility, business printing, signs, and apparel — and also makes custom Christmas and greeting cards and does photo scanning, restoration, and color correction for families. It serves Northern Illinois (McHenry, Lake, Cook, and Kane counties, including Chicago) and Southeast Wisconsin.

## Key facts
- Owner: Ryan Martin, designer and developer with 20+ years of website design and programming.
- Location: ${SERVICE_HOME_CITY}, IL (home studio). Local pickup, drop-off, and hand delivery across the service area; everything else by mail, shipping, and email.
- Contact: ${BUSINESS_PHONE_DISPLAY} · ${BUSINESS_EMAIL} · quote form on every page of ${site}
- Christmas cards: folded 5×7 (10×7 paper folded in half) or flat 5×7 printed on both sides, with optional rounded corners; matte, glossy, or foil finishes. Booking in October or early November is recommended.

## Main pages
- [Home](${url("/")}): overview and the Marketing Partner Plan (one flat monthly rate)
- [All services](${url("/services")})
- [New business launch guide](${url("/new-business")}): week-by-week branding, website, print, and marketing timeline, with a downloadable PDF checklist
- [Cards & Photos](${url("/cards-and-photos")}): Christmas and greeting cards, wedding invitations, photo restoration
- [Christmas cards near you](${url("/christmas-cards")}): local pages by town
- [Service area](${url("/service-area")}): every town served, for pickup, drop-off, and delivery${
    ABOUT.published ? `\n- [About Ryan Martin](${url("/about")})` : ""
  }

## Services
${services}

## Local Christmas card pages
${christmas}

## Service area
${towns.join("; ")}; plus Chicago neighborhoods.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
