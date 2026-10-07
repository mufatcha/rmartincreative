import Link from "next/link";
import Reveal from "./Reveal";
import { startsAt } from "../lib/data/pricing";
import {
  IconArrowRight,
  IconBanner,
  IconBriefcase,
  IconCard,
  IconGlobe,
  IconLayers,
  IconMail,
  IconPostcard,
  IconPresentation,
  IconSearch,
  IconShirt,
  IconSignpost,
  IconSnowflake,
} from "./icons";

// Grouped by what a small business is trying to do, not by product, so the
// full scope reads as one marketing team rather than a list of vendors.
// `prices` are keys in app/lib/data/pricing.ts; the card shows the lowest as "From $X".
type Service = {
  icon: typeof IconGlobe;
  title: string;
  description: string;
  href: string;
  prices?: string[];
};

const GROUPS: { title: string; blurb: string; accent: string; badge: string; services: Service[] }[] = [
  {
    title: "Get found",
    blurb: "Be easy to find on Google, in AI answers, and in your customers' own neighborhoods.",
    accent: "from-sky-500 via-blue-500 to-indigo-600",
    badge: "bg-sky-50 text-sky-600",
    services: [
      {
        icon: IconGlobe,
        title: "Websites & Online Stores",
        description:
          "Custom sites, WordPress, and Shopify, BigCommerce, or Wix stores, ready for search and AI from launch.",
        href: "#web-design",
        prices: ["website-design-development"],
      },
      {
        icon: IconSearch,
        title: "Search + AI Discovery",
        description:
          "Show up on Google and in AI answers, starting with a free health check.",
        href: "#search-ai",
      },
      {
        icon: IconPostcard,
        title: "Location Smart Postcards",
        description: "Soft-touch postcards to the neighbors of every customer you serve.",
        href: "#neighbor-postcards",
      },
    ],
  },
  {
    title: "Look professional",
    blurb: "Materials that make a strong first impression, in person and on paper.",
    accent: "from-zinc-800 via-zinc-600 to-amber-500",
    badge: "bg-zinc-100 text-zinc-700",
    services: [
      {
        icon: IconBriefcase,
        title: "Business Cards",
        description: "Clean, memorable layouts on the stock and finish that fit your brand.",
        href: "#business-printing",
        prices: ["business-printing/business-cards"],
      },
      {
        icon: IconLayers,
        title: "Brochures & Collateral",
        description: "Tri-folds, one-pagers, menus, and flyers built to be read.",
        href: "#business-printing",
        prices: ["business-printing/brochures-collateral"],
      },
      {
        icon: IconPresentation,
        title: "Pitch Decks & Documents",
        description: "Sales, proposal, and business plan decks that make the point on slide one.",
        href: "#business-printing",
      },
      {
        icon: IconSignpost,
        title: "Yard Signs & Posters",
        description: "Signage for events, open houses, and storefronts.",
        href: "/services/signs-posters",
        prices: ["signs-posters/yard-signs", "signs-posters/posters"],
      },
      {
        icon: IconBanner,
        title: "Banners",
        description: "Vinyl, matte paper, or adhesive banners for grand openings, events, and storefronts.",
        href: "/services/banners-canvas/banners",
        prices: ["banners-canvas/banners"],
      },
    ],
  },
  {
    title: "Stay in touch",
    blurb: "Keep customers, clients, and your team thinking of you all year.",
    accent: "from-rose-500 via-red-500 to-emerald-600",
    badge: "bg-rose-50 text-rose-600",
    services: [
      {
        icon: IconMail,
        title: "Email Marketing",
        description: "Newsletters, branded templates, and automated follow-ups in Mailchimp, Constant Contact, or Klaviyo.",
        href: "/services/email-marketing",
      },
      {
        icon: IconSnowflake,
        title: "Corporate Holiday Cards",
        description: "Corporate holiday mailers and client cards, designed early to beat the rush.",
        href: "/services/greeting-cards/christmas-cards",
        prices: ["greeting-cards/christmas-cards"],
      },
      {
        icon: IconCard,
        title: "Greeting Cards",
        description: "Thank-yous, announcements, and invitations, in print or digital.",
        href: "/services/greeting-cards/everyday-cards",
        prices: ["greeting-cards/everyday-cards"],
      },
      {
        icon: IconShirt,
        title: "T-Shirts & Apparel",
        description: "Staff shirts, event tees, and branded apparel under my FeedTheFlames brand.",
        href: "/services/apparel",
        prices: ["apparel"],
      },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              What I do
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One partner, everything your brand needs to show up.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              From the site your customers find you on to the card that
              thanks them afterward &mdash; designed, built, and delivered by
              the same person.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 100}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
                <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${group.accent}`} />
                <h3 className="text-xl font-bold tracking-tight">{group.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{group.blurb}</p>

                <ul className="mt-6 space-y-2">
                  {group.services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.title}>
                        <Link
                          href={service.href}
                          className="group -mx-3 flex gap-4 rounded-xl p-3 transition-colors hover:bg-paper-tint"
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${group.badge}`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold">
                              {service.title}
                              <IconArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </span>
                            <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">
                              {service.description}
                            </span>
                            {service.prices && (
                              <span className="mt-1 block text-xs font-semibold text-ink">
                                From {startsAt(...service.prices)}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-sm text-ink-soft">
            Looking for something personal? Family holiday cards, invitations, and
            photo restoration live on the{" "}
            <Link
              href="/cards-and-photos"
              className="font-semibold text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-700"
            >
              Cards &amp; Photos
            </Link>{" "}
            page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
