import Link from "next/link";
import Reveal from "./Reveal";
import { getChristmasTownPages } from "../lib/data/christmas-towns";

/** "Find your town" links to every local Christmas card page. */
export default function ChristmasTownLinks() {
  const pages = getChristmasTownPages();

  return (
    <section className="pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight">Find Christmas cards for your town</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              Local card ideas and delivery details for each area I serve.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {pages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/christmas-cards/${p.slug}`}
                  className="inline-block rounded-full bg-paper-tint px-3.5 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:text-rose-600 hover:ring-rose-300"
                >
                  {p.name}
                </Link>
              ))}
              <Link
                href="/christmas-cards"
                className="inline-block px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                See all areas →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
