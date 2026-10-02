import Link from "next/link";
import Reveal from "./Reveal";
import { renderInlineLinks } from "../lib/inline-links";
import RelatedServices from "./RelatedServices";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import ServiceCta from "./ServiceCta";
import ServiceFaqs from "./ServiceFaqs";
import { CategoryPricing } from "./ServicePricing";
import ServiceVisual from "./ServiceVisual";
import { IconArrowRight } from "./icons";
import type { ServiceCategory } from "../lib/services-data";

export default function ServiceCategoryPage({ category }: { category: ServiceCategory }) {
  const Icon = category.icon;
  const hasChildren = category.children.length > 0;

  return (
    <section className="relative pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <ServiceBreadcrumb
            crumbs={[{ label: "Services", href: "/services" }, { label: category.title }]}
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
              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                {category.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-violet-600">{category.tagline}</p>
              <p className="mt-4 text-lg text-ink-soft">{category.description}</p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{category.details}</p>
              <ServiceCta />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ServiceVisual
              image={category.image}
              accent={category.accent}
              icon={category.icon}
              sizes="(max-width: 1024px) 90vw, 480px"
            />
          </Reveal>
        </div>

        {hasChildren ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.children.map((leaf, i) => {
              const LeafIcon = leaf.icon;
              return (
                <Reveal key={leaf.slug} delay={i * 80}>
                  <Link
                    href={`/services/${category.slug}/${leaf.slug}`}
                    className="group relative block h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[-0.5deg] hover:shadow-xl"
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${category.accent}`}
                    />
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${category.accent}`}
                    >
                      <LeafIcon className="h-6 w-6" />
                    </span>
                    <h2 className="mt-5 text-lg font-semibold">{leaf.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{leaf.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600">
                      Learn more
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <Reveal delay={120}>
            <ul className="mt-16 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
              {category.features.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${category.accent}`} />
                  {renderInlineLinks(item)}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <CategoryPricing category={category} />

        {category.related && (
          <Reveal delay={160}>
            <div className="mt-14 border-t border-ink/10 pt-8">
              <RelatedServices category={category} />
            </div>
          </Reveal>
        )}

        <ServiceFaqs faqs={category.faqs} />
      </div>
    </section>
  );
}
