import Link from "next/link";
import ChristmasSpecial from "./ChristmasSpecial";
import Reveal from "./Reveal";
import {
  PRINTING_NOTE,
  christmasSpecialActive,
  formatPrice,
  getPricing,
  startingPrice,
  usd,
  type PriceLine,
  type ServicePricing as Pricing,
} from "../lib/data/pricing";
import type { ServiceCategory } from "../lib/services-data";

type Row = { label: string; price: string; href?: string };

function PricingBox({ rows, plusPrinting, note }: { rows: Row[]; plusPrinting?: boolean; note?: string }) {
  return (
    <Reveal>
      <div className="mt-14 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-600">Pricing</h2>
        <dl className="mt-4 divide-y divide-ink/10">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-6 py-3 text-sm">
              <dt className="text-ink">
                {row.href ? (
                  <Link href={row.href} className="hover:text-violet-600">
                    {row.label}
                  </Link>
                ) : (
                  row.label
                )}
              </dt>
              <dd className="shrink-0 font-semibold text-ink">{row.price}</dd>
            </div>
          ))}
        </dl>
        {(plusPrinting || note) && (
          <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink-soft">
            {plusPrinting && <p>{PRINTING_NOTE}</p>}
            {note && <p>{note}</p>}
          </div>
        )}
      </div>
    </Reveal>
  );
}

const toRow = (line: PriceLine): Row => ({ label: line.label, price: formatPrice(line) });

/** Pricing for a single service page. Renders nothing for quoted-only services. */
export function LeafPricing({ category, leafSlug }: { category: ServiceCategory; leafSlug: string }) {
  const pricing = getPricing(category.slug, leafSlug);
  if (!pricing) return null;
  const special = category.slug === "greeting-cards" && leafSlug === "christmas-cards" && christmasSpecialActive();
  return (
    <>
      <PricingBox rows={pricing.lines.map(toRow)} plusPrinting={pricing.plusPrinting} note={pricing.note} />
      {special && <ChristmasSpecial showExamples className="mt-6" />}
    </>
  );
}

/** Pricing for a category page: its own prices, or a "from" price for each priced service in it. */
export function CategoryPricing({ category }: { category: ServiceCategory }) {
  const own: Pricing | undefined = getPricing(category.slug);
  if (own) return <PricingBox rows={own.lines.map(toRow)} plusPrinting={own.plusPrinting} note={own.note} />;

  const rows = category.children.flatMap((leaf): Row[] => {
    const pricing = getPricing(category.slug, leaf.slug);
    const price = pricing && startingPrice(pricing);
    if (price === undefined) return [];
    return [{ label: leaf.title, price: `From ${usd(price)}`, href: `/services/${category.slug}/${leaf.slug}` }];
  });
  if (rows.length === 0) return null;

  const plusPrinting = category.children.some((leaf) => getPricing(category.slug, leaf.slug)?.plusPrinting);
  const quoted = category.children.length > rows.length;
  return (
    <PricingBox
      rows={rows}
      plusPrinting={plusPrinting}
      note={quoted ? "Other services in this category are quoted per project." : undefined}
    />
  );
}
