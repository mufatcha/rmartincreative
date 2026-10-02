import ExtraExamples from "./ExtraExamples";
import Reveal from "./Reveal";
import { CARD_EXTRAS_ANCHOR, CARD_EXTRAS_NOTE, getCardExtras } from "../lib/data/card-extras";
import type { ServiceCategory } from "../lib/services-data";

/** "Finishing touches" extras for card pages. Renders nothing on other pages. */
export default function CardExtras({ category, leafSlug }: { category: ServiceCategory; leafSlug: string }) {
  const extras = getCardExtras(`${category.slug}/${leafSlug}`);
  if (extras.length === 0) return null;

  return (
    <Reveal>
      <div id={CARD_EXTRAS_ANCHOR} className="mt-14 scroll-mt-32">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Finishing touches</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Sealed, stamped, and in the mail</h2>
        <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${extras.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {extras.map((extra) => (
            <div key={extra.title} className="relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
              <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${category.accent}`} />
              <h3 className="font-semibold">{extra.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{extra.body}</p>
              {extra.examples.length > 0 && <ExtraExamples title={extra.title} examples={extra.examples} />}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-soft">{CARD_EXTRAS_NOTE}</p>
      </div>
    </Reveal>
  );
}
