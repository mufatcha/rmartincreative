import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrowRight, IconSearch } from "./icons";

const FEATURES = [
  "Free health check: a plain-English look at what's holding your site back",
  "Titles, structured data, and content that search engines and AI understand",
  "Google Business Profile and local listings kept accurate",
  "Old links and rankings protected through every redesign",
];

export default function SearchAiSection() {
  return (
    <section
      id="search-ai"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-teal-200/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              <IconSearch className="h-3.5 w-3.5" />
              Traditional Search + AI Discovery
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Get found on Google, and in the answers AI gives.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              More customers now ask ChatGPT or Google&rsquo;s AI for a
              recommendation instead of scrolling results. Both reward the
              same fundamentals, and I make sure your business has them.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-10 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/services/search-ai-discovery/search-health-check"
              className="btn-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Get a free health check
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services/search-ai-discovery"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              See all search + AI services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
