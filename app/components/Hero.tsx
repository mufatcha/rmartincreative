import type { CSSProperties } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import heroImg from "@/public/webp-assets/ryan-martin-desktop.webp";
import QuoteModal from "./QuoteModal";
import { BUSINESS_CTA } from "../lib/cta";
import { getSeasonalBadge, type SeasonIcon } from "../lib/season";
import {
  IconArrowRight,
  IconCard,
  IconGlobe,
  IconPassport,
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
  passport: IconPassport,
};

type FloatStyle = CSSProperties & { "--rot"?: string };

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
      className="relative overflow-x-clip pt-48 pb-24 sm:pt-56 sm:pb-32"
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
          <Link
            href={badge.href}
            className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-ink"
          >
            <BadgeIcon className="h-3.5 w-3.5 text-rose-500" />
            {badge.text}
            <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Smarter Websites.{" "}
            <span className="animate-hue bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
              Measured Results.
            </span>{" "}
            <span className="animate-hue bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Real Growth.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            I&rsquo;m Ryan, and I turn local search and performance data into custom websites, top
            Google and AI search rankings, and print materials that convert. I research what your
            competitors are missing, build on proven search data, and continuously refine your
            presence so you stay ahead. Serving Northern Illinois and Southeast Wisconsin from
            Richmond, IL.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <QuoteModal triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105">
              Get a Quote
            </QuoteModal>
            <Link
              href={BUSINESS_CTA.href}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Free Website Health Check
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
