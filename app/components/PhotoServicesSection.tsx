import Link from "next/link";
import BeforeAfterSlider from "./BeforeAfterSlider";
import QuoteModal from "./QuoteModal";
import Reveal from "./Reveal";
import { IconArrowRight, IconPhoto } from "./icons";

const SERVICES = [
  {
    title: "Photo-to-Digital",
    body: "Prints, slides, and negatives scanned into high-resolution files.",
    href: "/services/photos/photo-to-digital",
  },
  {
    title: "Photo Restoration",
    body: "Tears, cracks, stains, and fading repaired by hand.",
    href: "/services/photos/photo-restoration",
  },
  {
    title: "Color Correction",
    body: "Faded prints and dull or off-color digital photos, made natural again.",
    href: "/services/photos/color-correction",
  },
];

export default function PhotoServicesSection() {
  return (
    <section
      id="photos"
      className="relative isolate overflow-hidden bg-gradient-to-br from-stone-950 via-[#2a1a10] to-stone-900 py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-amber-500/25 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <Reveal>
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-2xl bg-white p-4 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <BeforeAfterSlider
                beforeSrc="/jpg-assets/chris-curry-original.jpg"
                afterSrc="/jpg-assets/chris-curry-colorized.jpg"
                beforeAlt="Original black-and-white family group photo"
                afterAlt="The same family group photo, restored and colorized"
              />
              <p className="mt-4 text-center text-xs text-ink-soft">
                Drag to compare — scanned, cleaned up, restored
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-300/30">
              <IconPhoto className="h-3.5 w-3.5" />
              Photo Services
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Don&rsquo;t let old photos fade away.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Whether it&rsquo;s a shoebox of prints, a torn portrait of
              your grandparents, or photos that have faded to orange &mdash;
              I&rsquo;ll digitize them, repair the damage, and bring the color
              back, so the memories outlast the paper they&rsquo;re printed on.
            </p>
            <ul className="mt-7 space-y-2">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group -mx-3 flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/10"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                        {service.title}
                        <IconArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </span>
                      <span className="mt-0.5 block text-sm text-white/65">{service.body}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <QuoteModal
                initialServiceId="photos"
                triggerClassName="btn-shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-black/30 transition-transform hover:scale-105"
              >
                Get a photo quote
                <IconArrowRight className="h-4 w-4" />
              </QuoteModal>
              <Link
                href="/services/photos"
                className="text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                See all photo services
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
