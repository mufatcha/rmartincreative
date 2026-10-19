import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "../components/CtaSection";
import Reveal from "../components/Reveal";
import { IconArrowRight } from "../components/icons";
import { EXTRAS, EXTRAS_HUB, EXTRA_CATEGORIES, type Extra, type ExtraCategory } from "../lib/data/extras";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Website Guides & Free Printables",
    description: EXTRAS_HUB.description,
    path: "/extras",
  }),
};

function ExtraCard({ extra, category, index }: { extra: Extra; category: ExtraCategory; index: number }) {
  return (
    <Reveal delay={index * 80} className="h-full">
      <Link
        href={`/extras/${extra.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-lg"
      >
        {extra.image ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-tint">
            <Image
              src={extra.image.src}
              alt={extra.image.alt}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
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
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${category.badge}`}>
              {category.label}
            </span>
            {extra.download && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                Free download
              </span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-snug">{extra.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{extra.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600">
            {extra.download ? "Get it free" : "Read more"}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function ExtrasPage() {
  // Only categories that have something in them.
  const groups = EXTRA_CATEGORIES.map((category) => ({
    category,
    extras: EXTRAS.filter((e) => e.category === category.id),
  })).filter((g) => g.extras.length > 0);

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
          {groups.length > 1 && (
            <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
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
        </div>
      </section>

      <div className="space-y-16 pb-20 sm:space-y-20 sm:pb-24">
        {groups.map(({ category, extras }) => (
          <section key={category.id} id={category.id} className="scroll-mt-28">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className={`text-xs font-semibold uppercase tracking-widest ${category.text}`}>{category.label}</h2>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {extras.map((extra, i) => (
                  <li key={extra.slug}>
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
