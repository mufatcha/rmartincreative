import Link from "next/link";
import Reveal from "./Reveal";
import { getPassportTownPages } from "../lib/data/passport-towns";

/** "Find your town" links to every local passport photo page. */
export default function PassportTownLinks() {
  const pages = getPassportTownPages();

  return (
    <Reveal>
      <div className="mt-14 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight">Passport photos in your town</h2>
        <p className="mt-1.5 text-sm text-ink-soft">
          Local details for each area I serve, including the nearest places to turn in your application.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={`/passport-photos/${p.slug}`}
              className="inline-block rounded-full bg-paper-tint px-3.5 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:text-blue-700 hover:ring-blue-300"
            >
              {p.name}
            </Link>
          ))}
          <Link href="/passport-photos" className="inline-block px-3.5 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800">
            See all areas →
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
