import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import CtaSection from "../components/CtaSection";
import { IconArrowRight } from "../components/icons";
import { SERVICE_AUDIENCES, getCategoriesFor } from "../lib/services-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design & development, traditional search + AI discovery, greeting cards, business printing, photo scanning and restoration, and custom apparel — freelance design and print services in Northern Illinois.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <>
      <section className="relative pb-24 pt-32 sm:pb-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
                Services
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One partner, everything your brand needs to show up.
              </h1>
              <p className="mt-4 text-lg text-ink-soft">
                From the site your customers find you on to the deck for your
                board meeting — plus personal cards and keepsakes for you and
                your family. Pick a category below for details and pricing.
              </p>
            </div>
          </Reveal>

          {SERVICE_AUDIENCES.map((audience) => (
            <div key={audience.id} className="mt-14">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                {audience.label}
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {getCategoriesFor(audience.id).map((category, i) => {
                  const Icon = category.icon;
                  return (
                    <Reveal key={category.slug} delay={i * 60}>
                      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-xl">
                        <span
                          className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${category.accent}`}
                        />
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${category.accent}`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="mt-5 text-lg font-semibold">
                          {category.title}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-violet-600">
                          {category.tagline}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {category.description}
                        </p>

                        <Link
                          href={`/services/${category.slug}`}
                          className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700"
                        >
                          {category.children.length > 0
                            ? `View all ${category.title}`
                            : "Learn more"}
                          <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        {category.children.length > 0 && (
                          <div className="mt-5 border-t border-ink/10 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                              Includes
                            </p>
                            <ul className="mt-2.5 flex flex-wrap gap-2">
                              {category.children.map((leaf) => (
                                <li key={leaf.slug}>
                                  <Link
                                    href={`/services/${category.slug}/${leaf.slug}`}
                                    className="inline-block rounded-full bg-paper-tint px-3 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:text-violet-700 hover:ring-violet-300"
                                  >
                                    {leaf.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
