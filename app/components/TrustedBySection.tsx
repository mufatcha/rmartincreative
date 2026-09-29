import Image from "next/image";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { CLIENTS, STATS, TESTIMONIALS } from "../lib/business";

export default function TrustedBySection() {
  if (CLIENTS.length === 0 && STATS.length === 0 && TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <section id="clients" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              Trusted by
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From boutique shops to industry giants.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Whether it&rsquo;s a family-run storefront or a national brand,
              every client gets the same thing — clear communication, careful
              proofs, and deadlines met.
            </p>
          </div>
        </Reveal>

        {STATS.length > 0 && (
          <div
            className={`mt-14 grid gap-5 ${
              STATS.length === 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="rounded-2xl bg-white/70 px-6 py-8 text-center shadow-sm ring-1 ring-ink/5">
                  <p className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink-soft">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {TESTIMONIALS.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="relative h-full rounded-2xl bg-white/70 p-8 shadow-sm ring-1 ring-ink/5">
                  <span
                    aria-hidden
                    className="absolute -top-3 left-7 bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text font-serif text-6xl leading-none text-transparent"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="font-serif text-lg italic leading-relaxed text-ink">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span className="text-ink-soft"> · {t.location}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {CLIENTS.length > 0 && (
          <Reveal delay={120}>
            <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {CLIENTS.map((client) => {
                const mark = client.logo ? (
                    // Fixed box + object-contain so wide wordmarks and square
                    // marks read at a similar visual size.
                    <div className="relative h-16 w-40 sm:w-44">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        sizes="176px"
                        className="object-contain opacity-70 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  ) : (
                    <span className="text-lg font-semibold tracking-tight text-ink-soft/70 transition-colors duration-300 hover:text-ink">
                      {client.name}
                    </span>
                  );

                return (
                  <li key={client.name}>
                    {client.url ? (
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${client.name} (opens in a new tab)`}
                        className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
                      >
                        {mark}
                      </a>
                    ) : (
                      mark
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
