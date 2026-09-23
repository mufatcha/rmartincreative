import Reveal from "./Reveal";
import { IconArrowRight } from "./icons";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";

const MAILTO =
  "mailto:mufatcha@gmail.com?subject=Design%20%26%20Print%20Inquiry&body=Hi%20Ryan%2C%0D%0A%0D%0AI%27d%20like%20a%20quote%20for%3A%0D%0A-%20Project%20type%3A%20%0D%0A-%20Quantity%3A%20%0D%0A-%20Deadline%3A%20%0D%0A";

export default function CtaSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-fuchsia-600 to-amber-500 px-8 py-16 text-center text-white shadow-2xl sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl"
            />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to make your brand unforgettable?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
              Whether it&rsquo;s five hundred Christmas cards or one pitch
              deck due Friday — tell me what you need and I&rsquo;ll reply
              with a quote and timeline.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={MAILTO}
                className="btn-shine relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-105"
              >
                Email Ryan
              </a>
              <a
                href={BUSINESS_PHONE_TEL}
                className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call {BUSINESS_PHONE_DISPLAY}
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="relative mt-6 text-sm text-white/70">
              {BUSINESS_PHONE_DISPLAY} &middot; mufatcha@gmail.com &middot;
              usually replies within a day
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
