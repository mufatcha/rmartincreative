import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "../components/CtaSection";
import Reveal from "../components/Reveal";
import { IconArrowRight } from "../components/icons";
import { COMMUNITY_GROUPS } from "../lib/business";
import {
  EXTRAS,
  EXTRAS_HUB,
  EXTRA_CATEGORIES,
  EXTRA_SERIES,
  getExtraCategory,
  getExtraSeries,
  type Extra,
  type ExtraCategory,
} from "../lib/data/extras";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Website Guides & Free Printables",
    description: EXTRAS_HUB.description,
    path: "/extras",
  }),
};

function ExtraCard({
  extra,
  category,
  index,
  featured = false,
}: {
  extra: Extra;
  category: ExtraCategory;
  index: number;
  /** The newest post, full width at the top of the hub: image beside the text on larger screens. */
  featured?: boolean;
}) {
  const card = (
      <Link
        href={`/extras/${extra.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-lg ${featured ? "md:flex-row" : ""}`}
      >
        {extra.image ? (
          <div className={`relative aspect-[4/3] overflow-hidden bg-paper-tint ${featured ? "md:w-1/2 md:shrink-0" : ""}`}>
            {featured ? (
              <Image
                src={extra.image.src}
                alt={extra.image.alt}
                width={extra.image.width}
                height={extra.image.height}
                sizes="(min-width: 768px) 560px, 100vw"
                preload
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={extra.image.src}
                alt={extra.image.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
        ) : (
          // Text-only notes: the title, set large on a gradient, stands in for a photo.
          <div
            aria-hidden
            className="flex aspect-[4/3] items-end bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-6"
          >
            <p className="text-2xl font-bold leading-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
              {extra.title}
            </p>
          </div>
        )}
        <div className={`flex flex-1 flex-col p-6 ${featured ? "md:justify-center md:p-10" : ""}`}>
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${category.badge}`}>
              {category.label}
            </span>
            {extra.series && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${getExtraSeries(extra.series).badge}`}
              >
                {getExtraSeries(extra.series).label}
              </span>
            )}
            {extra.download && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                Free download
              </span>
            )}
          </div>
          <h3 className={`mt-3 font-semibold leading-snug ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>{extra.title}</h3>
          <p className={`mt-2 leading-relaxed text-ink-soft ${featured ? "md:text-lg" : "flex-1 text-sm"}`}>
            {extra.description}
          </p>
          <span className={`inline-flex items-center gap-2 text-sm font-semibold text-violet-600 ${featured ? "mt-6" : "mt-4"}`}>
            {extra.download ? "Get it free" : "Read more"}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
  );
  // The featured card is at the top of the page, so it shows right away instead of fading in.
  if (featured) return card;
  return (
    <Reveal delay={index * 80} className="h-full">
      {card}
    </Reveal>
  );
}

export default function ExtrasPage() {
  // Only categories that have something in them.
  const groups = EXTRA_CATEGORIES.map((category) => ({
    category,
    extras: EXTRAS.filter((e) => e.category === category.id),
  })).filter((g) => g.extras.length > 0);
  // Posts from the community groups (any series). /extras#community shows only these;
  // the CSS for that filter is in globals.css under "Notes & Freebies hub".
  const groupPosts = EXTRAS.filter((e) => e.series || e.community);
  // The pinned post (or else the newest) sits full width at the top. Its spots in the grid stay hidden
  // until a tag link filters or jumps to a section (CSS in globals.css), so it's
  // never listed twice.
  const newest = EXTRAS.find((e) => e.pinned) ?? EXTRAS[0];
  const gridItemProps = (extra: Extra) => (extra.slug === newest?.slug ? { "data-newest-copy": "" } : {});
  const hasGroupPosts = groupPosts.length > 0;
  const groupSeries = EXTRA_SERIES.filter((series) => series.groups.length > 0);

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-32 sm:pb-12 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-transparent opacity-40 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Extras</span>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{EXTRAS_HUB.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Free printables and helpful notes, added whenever there&rsquo;s something worth sharing. No sign-up and
            no email required — just download and enjoy.
          </p>
          {(groups.length > 1 || hasGroupPosts) && (
            <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
              {hasGroupPosts && (
                <a
                  href="#community"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-violet-700 ring-1 ring-violet-300 transition-colors hover:bg-violet-50"
                >
                  Community <span className="text-violet-700/60">({groupPosts.length})</span>
                </a>
              )}
              {groups.map(({ category, extras }) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:text-violet-600"
                >
                  {category.label} <span className="text-ink-soft/60">({extras.length})</span>
                </a>
              ))}
            </nav>
          )}
          {newest && (
            <div data-extras-newest className="mt-10">
              <ExtraCard extra={newest} category={getExtraCategory(newest.category)} index={0} featured />
            </div>
          )}
          {hasGroupPosts && (
            <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">From our social groups</p>
              <p className="mt-2 max-w-3xl text-ink-soft">
                Posts from our free website help groups on Nextdoor and Facebook, shared here so everyone can read them.
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {groupSeries.map((series) => {
                  const only = series.groups.length === 1 ? COMMUNITY_GROUPS.find((g) => g.id === series.groups[0]) : undefined;
                  return (
                    <li key={series.id}>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${series.badge}`}
                      >
                        {series.label}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {series.description}
                        {only && <span className="font-medium text-ink"> In the {only.name} group.</span>}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {COMMUNITY_GROUPS.map((group) => (
                  <a
                    key={group.id}
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:underline"
                  >
                    Join the free group on {group.name}
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div id="posts" className="scroll-mt-28 space-y-16 pb-20 sm:space-y-20 sm:pb-24">
        {hasGroupPosts && (
          <section id="community" data-extras-group className="scroll-mt-28">
            {/* Older links shared in the Nextdoor group point to /extras#nextdoor. */}
            <span id="nextdoor" aria-hidden className="block scroll-mt-28" />
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-600">From our social groups</h2>
                <a href="#posts" className="text-sm font-semibold text-violet-600 hover:underline">
                  Show all posts
                </a>
              </div>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupPosts.map((extra, i) => (
                  <li key={extra.slug} {...gridItemProps(extra)}>
                    <ExtraCard extra={extra} category={getExtraCategory(extra.category)} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        {groups.map(({ category, extras }) => (
          <section key={category.id} id={category.id} data-extras-group className="scroll-mt-28">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className={`text-xs font-semibold uppercase tracking-widest ${category.text}`}>{category.label}</h2>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {extras.map((extra, i) => (
                  <li key={extra.slug} {...gridItemProps(extra)}>
                    <ExtraCard extra={extra} category={category} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <CtaSection />
    </>
  );
}
