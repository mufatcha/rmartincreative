import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE_DISPLAY,
  PRODUCTION_URL,
  SERVICE_HOME_CITY,
} from "../lib/business";
import { ABOUT } from "../lib/data/about";
import { PAYMENT_SUMMARY } from "../lib/data/payments";
import { CARD_EXTRAS_NOTE, cardExtrasList } from "../lib/data/card-extras";
import { getPricing, pricingSummary } from "../lib/data/pricing";
import { TOWN_GROUPS, getChristmasTownPages } from "../lib/data/christmas-towns";
import { getPassportTownPages } from "../lib/data/passport-towns";
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

  // Every priced service, in menu order. Prices come from app/lib/data/pricing.ts.
  const prices = SERVICE_AUDIENCES.flatMap((audience) =>
    getCategoriesFor(audience.id).flatMap((c) => {
      const own = getPricing(c.slug);
      const entries = own
        ? [{ title: c.title, path: `/services/${c.slug}`, pricing: own }]
        : c.children.flatMap((leaf) => {
            const pricing = getPricing(c.slug, leaf.slug);
            return pricing ? [{ title: leaf.title, path: `/services/${c.slug}/${leaf.slug}`, pricing }] : [];
          });
      return entries.map(
        (e) => `- [${e.title}](${url(e.path)}): ${pricingSummary(e.pricing)}${e.pricing.note ? ` ${e.pricing.note}` : ""}`
      );
    })
  ).join("\n");

  const towns = TOWNS.filter((t) => t.type !== "chicago_neighborhood").map((t) => `${t.name}, ${t.state}`);

  const christmas = TOWN_GROUPS.map((g) => {
    const pages = getChristmasTownPages().filter((p) => p.content.group === g.id);
    if (pages.length === 0) return "";
    return pages.map((p) => `- [${p.name}, ${p.town.state}](${url(`/christmas-cards/${p.slug}`)})`).join("\n");
  })
    .filter(Boolean)
    .join("\n");

  const body = `# ${BUSINESS_NAME}

> ${BUSINESS_NAME} is a one-person design, web, and print studio based in ${SERVICE_HOME_CITY}, Illinois. It works as an outsourced marketing team for small businesses — websites, search and AI visibility, business printing, signs, and apparel — and also makes custom Christmas and greeting cards and does photo scanning, restoration, and color correction for families. It serves Northern Illinois (McHenry, Lake, Cook, and Kane counties, including Chicago) and Southeast Wisconsin.

## Key facts
- Owner: Ryan Martin, designer and developer with 20+ years of website design and programming.
- Location: ${SERVICE_HOME_CITY}, IL (home studio). Local pickup, drop-off, and hand delivery across the service area; everything else by mail, shipping, and email.
- Contact: ${BUSINESS_PHONE_DISPLAY} · ${BUSINESS_EMAIL} · quote form on every page of ${site}
- Christmas cards: folded 5×7 (10×7 paper folded in half) or flat 5×7 printed on both sides, with optional rounded corners; matte, glossy, or foil finishes. Booking in October or early November is recommended.
- Payment: ${PAYMENT_SUMMARY} Details: ${url("/payment")}
- Websites: optional private preview site (staging site), a password-protected copy that runs alongside the live site, hidden from search engines and AI crawlers, for approving changes before they go live. Quoted per project.
- Card extras for Christmas cards, greeting cards, and wedding invitations: ${cardExtrasList(false)}, plus personalized “From Santa” gift tags at Christmas. Wax seals are poured and pressed by hand in one or two colors, any color and monogram, or a Christmas-themed stamp. ${CARD_EXTRAS_NOTE}

## Starting prices
Design prices in USD. "Plus printing" means printing is quoted separately by quantity, size, and finish. Anything not listed is quoted per project.
${prices}

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

## Local passport photo pages
At-home and on-site passport photos, with the nearest government passport acceptance facilities listed on each page.
${getPassportTownPages()
  .map((p) => `- [${p.name}, ${p.town.state}](${url(`/passport-photos/${p.slug}`)})`)
  .join("\n")}

## Service area
${towns.join("; ")}; plus Chicago neighborhoods.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
