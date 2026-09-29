import Image from "next/image";
import Reveal from "./Reveal";
import { IconArrowRight, IconGlobe } from "./icons";

const FEATURES = [
  "Custom-designed, not a drag-and-drop template",
  "Mobile-friendly & fast-loading on any device",
  "Built for search — real metadata, not an afterthought",
  "Online stores on Shopify, BigCommerce, or Wix",
  "WordPress and headless CMS builds your team can edit",
  "Easy to hand off, update, or grow later",
];

export default function WebDesignSection() {
  return (
    <section
      id="web-design"
      className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-blue-200/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <Reveal>
          <div className="group relative mx-auto w-full max-w-md rotate-[-2deg] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink/5 transition-transform duration-500 hover:rotate-0">
            <div className="flex items-center gap-1.5 border-b border-ink/5 bg-paper-tint px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 h-4 w-32 rounded-full bg-ink/10" />
            </div>
            {/* Full-page screenshot: shows the top, then scrolls to the bottom on hover. */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0f1020]">
              <Image
                src="/webp-assets/website-design.webp"
                alt="Example website design: a dark, modern product landing page with a hero, feature highlights, and a call to action"
                fill
                sizes="(max-width: 1024px) 90vw, 448px"
                className="object-cover object-top transition-[object-position] duration-[4000ms] ease-in-out group-hover:object-bottom"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700">
              <IconGlobe className="h-3.5 w-3.5" />
              Website Design &amp; Development
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Websites that load fast and look sharp everywhere.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Same design eye that goes into your cards and print work,
              built into sites of every size — from a focused landing page
              to a full online store — designed and developed
              end-to-end, from first sketch to a live site your customers
              can actually find.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-soft">
              {FEATURES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-shine relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Start my website
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
