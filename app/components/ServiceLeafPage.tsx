import Link from "next/link";
import Reveal from "./Reveal";
import { renderInlineLinks } from "../lib/inline-links";
import RelatedServices from "./RelatedServices";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import ServiceCta from "./ServiceCta";
import ServiceFaqs from "./ServiceFaqs";
import ServiceVisual from "./ServiceVisual";
import { IconArrowRight } from "./icons";
import type { ServiceCategory, ServiceLeaf } from "../lib/services-data";

export default function ServiceLeafPage({
  category,
  leaf,
}: {
  category: ServiceCategory;
  leaf: ServiceLeaf;
}) {
  const Icon = leaf.icon;
  const siblings = category.children.filter((child) => child.slug !== leaf.slug);

  return (
    <section className="relative pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <ServiceBreadcrumb
            crumbs={[
              { label: "Services", href: "/services" },
              { label: category.title, href: `/services/${category.slug}` },
              { label: leaf.title },
            ]}
          />
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal delay={60}>
            <div>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${category.accent}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{leaf.title}</h1>
              <p className="mt-3 text-lg font-medium text-violet-600">{leaf.tagline}</p>
              <p className="mt-4 text-lg text-ink-soft">{leaf.description}</p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{leaf.details}</p>
              <ServiceCta />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ServiceVisual
              image={leaf.image}
              beforeAfter={leaf.beforeAfter}
              accent={category.accent}
              icon={leaf.icon}
              sizes="(max-width: 1024px) 90vw, 480px"
            />
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ul className="mt-14 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
            {leaf.features.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${category.accent}`} />
                {renderInlineLinks(item)}
              </li>
            ))}
          </ul>
        </Reveal>

        {siblings.length > 0 && (
          <Reveal delay={200}>
            <div className="mt-14 border-t border-ink/10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Other {category.title} services
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/services/${category.slug}/${sibling.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm ring-1 ring-ink/10 transition-colors hover:text-violet-600"
                  >
                    {sibling.title}
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>

              {category.related && (
                <div className="mt-8">
                  <RelatedServices category={category} />
                </div>
              )}
            </div>
          </Reveal>
        )}

        <ServiceFaqs faqs={leaf.faqs} />
      </div>
    </section>
  );
}
