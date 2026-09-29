import Reveal from "./Reveal";
import { IconArrowRight, IconBriefcase, IconLayers, IconPresentation } from "./icons";

const SUB_SERVICES = [
  {
    icon: IconBriefcase,
    title: "Business Cards",
    accent: "bg-amber-500/15 text-amber-400",
    description:
      "Clean, memorable layouts that hold up in a stack of a hundred.",
    items: ["Foil, matte or textured stock", "Double-sided layouts", "QR & digital contact options"],
  },
  {
    icon: IconLayers,
    title: "Brochures & Collateral",
    accent: "bg-cyan-500/15 text-cyan-400",
    description:
      "Tri-folds, one-pagers, menus and flyers built to be read, not skimmed.",
    items: ["Tri-fold & bi-fold layouts", "One-pagers & flyers", "Print-ready, sized correctly"],
  },
  {
    icon: IconPresentation,
    title: "Business Documents",
    accent: "bg-violet-500/15 text-violet-400",
    description:
      "Decks and documents structured to make the point on slide one.",
    items: ["Pitch decks", "Business plan presentations", "Sales & proposal decks", "Internal update / QBR decks"],
  },
];

export default function BusinessPrintingSection() {
  return (
    <section
      id="business-printing"
      className="relative overflow-hidden bg-zinc-950 py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.08),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(139,92,246,0.1),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Business Printing
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything that carries your name into the room.
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Cards for the handshake, collateral for the counter, and
              documents for the boardroom — designed to look like one
              consistent brand.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SUB_SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 100}>
                <div className="h-full rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08]">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.accent}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={220}>
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/60">
              Need more than one piece? Designed together, they look like
              one brand instead of a collection.
            </p>
            <a
              href="#contact"
              className="btn-shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-105"
            >
              Get a business quote
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
