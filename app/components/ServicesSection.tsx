import Reveal from "./Reveal";
import {
  IconSnowflake,
  IconCard,
  IconBriefcase,
  IconLayers,
  IconPresentation,
  IconPhoto,
} from "./icons";

const SERVICES = [
  {
    icon: IconSnowflake,
    title: "Christmas & Holiday Cards",
    description:
      "My favorite project of the year. Custom family photo cards, corporate holiday mailers, and everything in between — designed early enough to beat the December rush.",
    accent: "from-rose-500 via-red-500 to-emerald-600",
    badge: "bg-rose-50 text-rose-600",
    href: "#christmas",
  },
  {
    icon: IconCard,
    title: "Greeting Cards",
    description:
      "Birthdays, thank-yous, invitations, announcements — one-off designs or full sets, ready for print or digital sharing.",
    accent: "from-fuchsia-500 via-pink-500 to-amber-400",
    badge: "bg-fuchsia-50 text-fuchsia-600",
    href: "#greeting-cards",
  },
  {
    icon: IconBriefcase,
    title: "Business Cards",
    description:
      "Clean, memorable layouts that hold up in a stack of a hundred. Foil, matte, textured stock — I'll help you pick what fits your brand.",
    accent: "from-zinc-800 via-zinc-600 to-amber-500",
    badge: "bg-zinc-100 text-zinc-700",
    href: "#business-printing",
  },
  {
    icon: IconLayers,
    title: "Brochures & Collateral",
    description:
      "Tri-folds, one-pagers, menus and flyers built to be read, not just skimmed. Print-ready files, sized correctly the first time.",
    accent: "from-teal-500 via-cyan-500 to-blue-500",
    badge: "bg-teal-50 text-teal-600",
    href: "#business-printing",
  },
  {
    icon: IconPresentation,
    title: "Business Documents",
    description:
      "Pitch decks, business plan presentations, sales & proposal decks, and internal update / QBR decks — structured to make the point on slide one.",
    accent: "from-violet-600 via-indigo-500 to-sky-500",
    badge: "bg-violet-50 text-violet-600",
    href: "#business-printing",
  },
  {
    icon: IconPhoto,
    title: "Photo-to-Digital",
    description:
      "Old prints, slides, and negatives scanned, cleaned up, and color-corrected into high-resolution digital files you'll actually keep.",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    badge: "bg-amber-50 text-amber-600",
    href: "#photo-to-digital",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              What I make
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One freelancer, every piece of paper your brand needs.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              From a stack of holiday cards to the deck for your board
              meeting — designed, printed, and delivered.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 80}>
                <a
                  href={service.href ?? "#services"}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[-0.5deg] hover:shadow-xl"
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${service.accent}`}
                  />
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.badge}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
