import Link from "next/link";
import Reveal from "./Reveal";
import { startsAt } from "../lib/data/pricing";
import { SERVICE_HOME_CITY } from "../lib/business";
import { IconArrowRight } from "./icons";

// Everything beyond the three main offers, as a compact list of links. Each goes to
// its own service page. `prices` are keys in app/lib/data/pricing.ts ("From $X");
// `priceLabel` is fixed text for services without a price there.
type Service = { title: string; href: string; prices?: string[]; priceLabel?: string };

const GROUPS: { title: string; services: Service[] }[] = [
  {
    title: "Brand & print",
    services: [
      { title: "Logo Design", href: "/services/business-printing/logo-design", prices: ["business-printing/logo-design"] },
      { title: "Business Cards & Letterhead", href: "/services/business-printing/business-cards", prices: ["business-printing/business-cards"] },
      { title: "Brochures & Collateral", href: "/services/business-printing/brochures-collateral", prices: ["business-printing/brochures-collateral"] },
      { title: "Pitch Decks & Documents", href: "/services/business-printing/business-documents", priceLabel: "Quoted" },
      { title: "Yard Signs & Posters", href: "/services/signs-posters", prices: ["signs-posters/yard-signs", "signs-posters/posters"] },
      { title: "Banners", href: "/services/banners-canvas/banners", prices: ["banners-canvas/banners"] },
    ],
  },
  {
    title: "Reach more customers",
    services: [
      { title: "Location Smart Postcards", href: "/services/location-smart-postcards", priceLabel: "From $425" },
      { title: "Email Marketing", href: "/services/email-marketing", priceLabel: "Quoted" },
      { title: "Corporate Holiday Cards", href: "/services/greeting-cards/christmas-cards", prices: ["greeting-cards/christmas-cards"] },
      { title: "T-Shirts & Apparel", href: "/services/apparel", prices: ["apparel"] },
    ],
  },
];

export default function MoreServicesSection() {
  return (
    <section id="more-services" className="relative bg-paper-tint py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">More services</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Print, signs, and the rest of your brand.</h2>
            <p className="mt-4 text-lg text-ink-soft">
              Same designer, same look, so your cards, signs, and shirts match your website.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 100}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">{group.title}</h3>
                <ul className="mt-3 divide-y divide-ink/5">
                  {group.services.map((service) => (
                    <li key={service.title}>
                      <Link href={service.href} className="group flex items-center justify-between gap-4 py-3 text-sm">
                        <span className="font-semibold group-hover:text-violet-700">{service.title}</span>
                        <span className="flex shrink-0 items-center gap-2 text-ink-soft">
                          {(service.prices || service.priceLabel) && (
                            <span className="text-xs">{service.prices ? `From ${startsAt(...service.prices)}` : service.priceLabel}</span>
                          )}
                          <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          {/* Same columns and inner padding as the cards above, so each line sits under its card. */}
          <div className="mt-6 grid gap-3 text-sm leading-relaxed text-ink-soft md:grid-cols-2 md:gap-6">
            <p className="px-6">
              Looking for something personal? Family holiday cards, invitations, photo restoration, and passport photos
              live on{" "}
              <Link href="/cards-and-photos" className="font-semibold text-violet-600 hover:text-violet-700">
                Cards &amp; Photos
              </Link>
              .
            </p>
            <p className="px-6">
              <Link href="/service-area" className="group inline-flex items-center gap-1.5 font-semibold text-violet-600 hover:text-violet-700">
                Based in {SERVICE_HOME_CITY}, IL: see the service area
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
