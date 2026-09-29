import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import QuoteModal from "./QuoteModal";
import { IconArrowRight, IconGift } from "./icons";

type FloatStyle = CSSProperties & { "--rot"?: string };

const JUMP_LINKS = [
  { label: "Christmas Cards", href: "#christmas" },
  { label: "Birthday & Greeting Cards", href: "#greeting-cards" },
  { label: "Wedding Invitations", href: "/services/greeting-cards/wedding-invitations" },
  { label: "Photo Scanning & Restoration", href: "#photos" },
];

// Aimed at people who've tried the drugstore kiosk or a template site and
// given up — lead with the frustration, then the done-for-you alternative.
const PROMISES = [
  { title: "A real designer", body: "No templates to wrestle or photos cropped at the neck." },
  { title: "A proof first", body: "You see and approve it before anything prints." },
  { title: "Printed right", body: "Quality card stock, ready to pick up or mail." },
];

export default function PersonalHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-rose-300 via-red-200 to-transparent opacity-50 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-24 top-16 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-emerald-200 via-teal-100 to-transparent opacity-60 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-gradient-to-br from-amber-200 via-orange-200 to-transparent opacity-40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur">
            <IconGift className="h-3.5 w-3.5 text-rose-500" />
            Cards, invitations &amp; photo restoration
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Skip the{" "}
            <span className="animate-hue bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
              photo-kiosk struggle.
            </span>{" "}
            Get cards you&rsquo;re{" "}
            <span className="animate-hue bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
              proud to send.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Tired of fighting templates, blurry prints, and awkward crops at
            the drugstore counter? Send me your photos and your idea &mdash;
            I&rsquo;ll design it, send you a proof, and have it printed and
            ready to pick up or mail.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <QuoteModal
              initialServiceId="cards"
              triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Start my cards
            </QuoteModal>
            <QuoteModal
              initialServiceId="photos"
              triggerClassName="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Restore old photos
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </QuoteModal>
          </div>

          <dl className="mt-10 grid gap-5 sm:grid-cols-3">
            {PROMISES.map((p) => (
              <div key={p.title} className="border-l-2 border-rose-300 pl-3">
                <dt className="text-sm font-semibold text-ink">{p.title}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-ink-soft">{p.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {JUMP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-block rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:bg-white hover:text-ink hover:ring-ink/20"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div aria-hidden className="relative mx-auto h-[26rem] w-full max-w-sm sm:h-[32rem]">
          <div
            className="animate-card-float absolute left-2 top-0 w-48 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-ink/5 sm:w-56"
            style={{ "--rot": "-7deg", transform: "rotate(-7deg)" } as FloatStyle}
          >
            <Image
              src="/webp-assets/christmas-card-portrait.webp"
              alt=""
              width={800}
              height={1200}
              sizes="224px"
              className="h-auto w-full rounded-xl"
            />
          </div>

          <div
            className="animate-card-float absolute right-0 top-24 w-52 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-ink/5 [animation-delay:1.2s] sm:w-60"
            style={{ "--rot": "6deg", transform: "rotate(6deg)" } as FloatStyle}
          >
            <Image
              src="/webp-assets/birthday-card-2.webp"
              alt=""
              width={1710}
              height={1140}
              sizes="240px"
              className="h-auto w-full rounded-xl"
            />
          </div>

          <div
            className="animate-card-float absolute bottom-0 left-8 w-64 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-ink/5 [animation-delay:2.4s] sm:w-72"
            style={{ "--rot": "-3deg", transform: "rotate(-3deg)" } as FloatStyle}
          >
            <Image
              src="/webp-assets/photo-restoration.webp"
              alt=""
              width={2816}
              height={1536}
              sizes="288px"
              className="h-auto w-full rounded-xl"
            />
            <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink shadow">
              Restored
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
