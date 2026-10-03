import type { CSSProperties } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import heroImg from "@/public/webp-assets/ryan-martin-desktop.webp";
import { getSeasonalBadge, type SeasonIcon } from "../lib/season";
import {
  IconArrowRight,
  IconCard,
  IconGlobe,
  IconPresentation,
  IconShirt,
  IconSignpost,
  IconSnowflake,
} from "./icons";

const SEASON_ICONS: Record<SeasonIcon, typeof IconSnowflake> = {
  globe: IconGlobe,
  shirt: IconShirt,
  presentation: IconPresentation,
  card: IconCard,
  snowflake: IconSnowflake,
  sign: IconSignpost,
};

type FloatStyle = CSSProperties & { "--rot"?: string };

// `wide` tags only show from tablet up; mobile keeps the original five.
const TAGS: { label: string; href: string; wide?: boolean }[] = [
  { label: "Websites", href: "/services/website-design-development" },
  { label: "Search + AI Discovery", href: "/services/search-ai-discovery" },
  { label: "Business Cards", href: "/services/business-printing/business-cards" },
  { label: "Brochures", href: "/services/business-printing/brochures-collateral" },
  { label: "Pitch Decks", href: "/services/business-printing/business-documents" },
  { label: "Online Stores", href: "/services/website-design-development/e-commerce-websites", wide: true },
  { label: "WordPress & CMS", href: "/services/website-design-development/wordpress-headless-cms", wide: true },
  { label: "Yard Signs", href: "/services/signs-posters/yard-signs", wide: true },
  { label: "Posters", href: "/services/signs-posters/posters", wide: true },
  { label: "T-Shirts & Apparel", href: "/services/apparel", wide: true },
  { label: "Corporate Holiday Cards", href: "/services/greeting-cards/christmas-cards", wide: true },
]

const HERO_ALT =
  "Ryan Martin's desk: a laptop showing a website wireframe and analytics dashboard, colorful business cards including one for Ryan Martin, an open portfolio and design services brochure, a camera, a sketched design notebook, and an RM-branded coffee mug";

// Desktop: the hero photo is above the fold, so it loads right away at high
// priority. The <picture> only offers it at lg widths; smaller screens get a
// 1×1 transparent placeholder instead, so phones never download this copy.
const desktopHero = getImageProps({
  src: heroImg,
  alt: HERO_ALT,
  sizes: "540px",
  placeholder: "blur",
  loading: "eager",
  fetchPriority: "high",
}).props;
const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export default function Hero() {
  const badge = getSeasonalBadge();
  const BadgeIcon = SEASON_ICONS[badge.icon];

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-48 pb-24 sm:pt-56 sm:pb-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-300 to-transparent opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-24 top-10 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-amber-300 via-orange-300 to-transparent opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-gradient-to-br from-rose-300 via-red-300 to-transparent opacity-30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur">
            <BadgeIcon className="h-3.5 w-3.5 text-rose-500" />
            {badge.text}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your{" "}
            <span className="animate-hue bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
              marketing team
            </span>
            , without the{" "}
            <span className="animate-hue bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              payroll.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Small businesses need a website, search visibility, print, and
            a brand that holds together &mdash; but not a full-time marketing
            department. I&rsquo;m Ryan Martin, one experienced partner based in
            Richmond, IL, who handles all of it for businesses across Gurnee,
            Northern Illinois, and Southeast Wisconsin.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Get a Quote
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              See Services
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className={`${tag.wide ? "hidden sm:inline-block" : "inline-block"} rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:bg-white hover:text-ink hover:ring-ink/20`}
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-paper-tint shadow-2xl shadow-ink/20 ring-1 ring-ink/5">
            {/* Desktop: eager, high priority (see desktopHero above). */}
            <picture className="hidden lg:block">
              <source media="(min-width: 1024px)" srcSet={desktopHero.srcSet} sizes={desktopHero.sizes} />
              <img
                {...desktopHero}
                src={TRANSPARENT_PIXEL}
                srcSet={undefined}
                sizes={undefined}
                alt={HERO_ALT}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            {/* Phones and tablets: below the headline, so it waits until scrolled near. */}
            <Image
              src={heroImg}
              alt={HERO_ALT}
              fill
              sizes="(min-width: 640px) 576px, 100vw"
              placeholder="blur"
              loading="lazy"
              className="object-cover lg:hidden"
            />
          </div>

          {/* One card per corner, each with its own motion, speed, and start
              point (negative delays) so they never move in sync. */}
          <div
            aria-hidden
            className="animate-card-drift absolute -left-5 -top-10 hidden aspect-[5/7] w-32 flex-col justify-between rounded-xl bg-gradient-to-br from-rose-600 via-red-500 to-emerald-600 p-4 text-white shadow-2xl [animation-delay:-2.1s] sm:flex"
            style={{ "--rot": "-9deg", transform: "rotate(-9deg)" } as FloatStyle}
          >
            <IconSnowflake className="h-5 w-5 opacity-90" />
            <div>
              <p className="font-serif text-base italic leading-tight">
                Season&rsquo;s Greetings
              </p>
              <p className="mt-1 text-[10px] leading-snug text-white/80">from our home to yours</p>
            </div>
          </div>

          <div
            aria-hidden
            className="animate-card-float absolute -right-3 -top-8 hidden w-44 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-5 text-white shadow-2xl [animation-delay:-0.7s] sm:block"
            style={{ "--rot": "7deg", transform: "rotate(7deg)" } as FloatStyle}
          >
            <div className="h-2 w-8 rounded-full bg-amber-400" />
            <p className="mt-8 text-sm font-semibold tracking-wide">
              RYAN MARTIN
            </p>
            <p className="text-[11px] text-white/60">Marketing, Web &amp; Print</p>
          </div>

          <div
            aria-hidden
            className="animate-card-wander absolute -bottom-8 -left-5 hidden aspect-video w-52 flex-col rounded-lg bg-white p-3 shadow-2xl ring-1 ring-ink/5 [animation-delay:-4.3s] sm:flex"
            style={{ "--rot": "-4deg", transform: "rotate(-4deg)" } as FloatStyle}
          >
            {/* A 16:9 slide: title bar, chart, caption. */}
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-10 rounded-full bg-violet-600" />
              <span className="h-1.5 w-6 rounded-full bg-ink/15" />
            </div>
            <div className="mt-auto flex items-end gap-1.5">
              <span className="h-5 w-3 rounded-sm bg-violet-400" />
              <span className="h-9 w-3 rounded-sm bg-fuchsia-400" />
              <span className="h-7 w-3 rounded-sm bg-amber-400" />
              <span className="h-11 w-3 rounded-sm bg-violet-600" />
              <div className="ml-auto space-y-1 self-center">
                <span className="block h-1 w-12 rounded-full bg-ink/15" />
                <span className="block h-1 w-9 rounded-full bg-ink/15" />
                <span className="block h-1 w-10 rounded-full bg-ink/15" />
              </div>
            </div>
            <p className="mt-2 text-[10px] font-semibold text-ink-soft">
              Q3 Pitch Deck
            </p>
          </div>

          <div
            aria-hidden
            className="animate-card-sway absolute -bottom-12 -right-4 hidden aspect-[3.67/8.5] w-24 flex-col rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 p-3 text-white shadow-2xl [animation-delay:-1.6s] sm:flex"
            style={{ "--rot": "10deg", transform: "rotate(10deg)" } as FloatStyle}
          >
            <p className="text-[11px] font-semibold">Brochure</p>
            <div className="mt-3 space-y-1.5">
              <span className="block h-1.5 w-full rounded-full bg-white/60" />
              <span className="block h-1.5 w-3/4 rounded-full bg-white/60" />
              <span className="block h-1.5 w-1/2 rounded-full bg-white/60" />
            </div>
            <span className="mt-auto block h-10 w-full rounded-md bg-white/25" />
            <div className="mt-3 space-y-1.5">
              <span className="block h-1 w-full rounded-full bg-white/50" />
              <span className="block h-1 w-2/3 rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
