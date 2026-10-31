import Link from "next/link";
import ChristmasSpecial from "./ChristmasSpecial";
import FreebieDownloadButton from "./FreebieDownloadButton";
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

type Row = { label: string; price: string; href?: string; section?: string; pdf?: PriceLine["pdf"] };

type PricingBoxProps = {
  rows: Row[];
  plusPrinting?: boolean;
  note?: string;
  banner?: string;
  links?: Pricing["links"];
};

function PricingBox({ rows, plusPrinting, note, banner, links }: PricingBoxProps) {
  // A row with a `section` starts a new group under that heading.
  const groups: { heading?: string; rows: Row[] }[] = [];
  for (const row of rows) {
    if (row.section || groups.length === 0) groups.push({ heading: row.section, rows: [] });
    groups[groups.length - 1].rows.push(row);
  }

  return (
    <Reveal>
      <div id="pricing" className="mt-14 scroll-mt-24 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-600">Pricing</h2>
        {groups.map((group, i) => (
          <div key={group.heading ?? i} className={i > 0 ? "mt-6 border-t-2 border-ink/10 pt-6" : undefined}>
            {group.heading && (
              <h3 className="text-xs font-semibold uppercase tracking-widest text-violet-600">{group.heading}</h3>
            )}
            <dl className={`divide-y divide-ink/10 ${i === 0 ? "mt-4" : "mt-2"}`}>
              {group.rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6 py-3 text-sm">
                  <dt className="text-ink">
                    {row.href ? (
                      <Link href={row.href} className="hover:text-violet-600">
                        {row.label}
                      </Link>
                    ) : (
                      row.label
                    )}
                    {row.pdf && (
                      <FreebieDownloadButton
                        slug={row.pdf.fileName.replace(/\.pdf$/, "")}
                        href={row.pdf.href}
                        fileName={row.pdf.fileName}
                        className="mt-1.5 flex w-fit items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
                      >
                        See what&rsquo;s included
                        <span className="font-normal text-ink-soft">(PDF, {row.pdf.pages} pages)</span>
                      </FreebieDownloadButton>
                    )}
                  </dt>
                  <dd className="shrink-0 font-semibold text-ink">{row.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        {banner && (
          <p className="animate-hue mt-3 rounded-xl bg-gradient-to-r from-rose-200 via-orange-100 to-amber-200 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-orange-300">
            {banner}
          </p>
        )}
        {(plusPrinting || note) && (
          <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink-soft">
            {plusPrinting && <p>{PRINTING_NOTE}</p>}
            {note && <p>{noteText(note)}</p>}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="mt-5 border-t border-ink/10 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Also consider</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-violet-600 hover:text-violet-700">
                    {link.label}
                  </Link>
                  {link.note && <> &mdash; {link.note}</>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Reveal>
  );
}

/** A note's "**text**" segments in bold, for package names. */
function noteText(note: string) {
  return note.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

const toRow = (line: PriceLine): Row => ({ label: line.label, price: formatPrice(line), section: line.section, pdf: line.pdf });

/** Pricing for a single service page. Renders nothing for quoted-only services. */
export function LeafPricing({ category, leafSlug }: { category: ServiceCategory; leafSlug: string }) {
  const pricing = getPricing(category.slug, leafSlug);
  if (!pricing) return null;
  const special = category.slug === "greeting-cards" && leafSlug === "christmas-cards" && christmasSpecialActive();
  return (
    <>
      <PricingBox
        rows={pricing.lines.map(toRow)}
        plusPrinting={pricing.plusPrinting}
        note={pricing.note}
        banner={pricing.banner}
        links={pricing.links}
      />
      {special && <ChristmasSpecial showExamples className="mt-6" />}
    </>
  );
}

/** Pricing for a category page: its own prices, or a "from" price for each priced service in it. */
export function CategoryPricing({ category }: { category: ServiceCategory }) {
  const own: Pricing | undefined = getPricing(category.slug);
  if (own)
    return (
      <PricingBox
        rows={own.lines.map(toRow)}
        plusPrinting={own.plusPrinting}
        note={own.note}
        banner={own.banner}
        links={own.links}
      />
    );

  const rows = category.children.flatMap((leaf): Row[] => {
    const pricing = getPricing(category.slug, leaf.slug);
    const price = pricing && startingPrice(pricing);
    if (price === undefined) return [];
    return [{ label: leaf.title, price: price === 0 ? "Free" : `From ${usd(price)}`, href: `/services/${category.slug}/${leaf.slug}` }];
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
