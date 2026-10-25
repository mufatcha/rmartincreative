"use client";

import Image from "next/image";
import { MENU_CATEGORIES, formatPrice, formatTime, mediaById, type Content } from "./store";
import { bakeryClock, useMinute } from "./hooks";

const FONTS = {
  serif: "var(--font-jr-serif), Georgia, serif",
  sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  script: "var(--font-jr-script), cursive",
} as const;

function JuniperMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
      <circle cx="16" cy="16" r="15" fill={color} />
      <path d="M16 7c-2 3-2 6 0 9 2-3 2-6 0-9Zm-5 6c0 3 2 5 5 6-1-3-2-5-5-6Zm10 0c-3 1-4 3-5 6 3-1 5-3 5-6Zm-5 6v7" stroke="#fff7ed" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Whether the special shows today: switched on, and today falls inside its start and end dates. */
function specialIsLive(content: Content, minute: number | null) {
  const { enabled, starts, ends } = content.special;
  if (!enabled) return false;
  if (minute === null) return true;
  const today = new Date(minute * 60_000).toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
  return (!starts || today >= starts) && (!ends || today <= ends);
}

/**
 * The bakery's public website, drawn from the CMS content. It uses container queries
 * (@container), so it lays out for the preview frame's width: phone, tablet, or desktop.
 */
export default function Preview({ content }: { content: Content }) {
  const { home, menu, special, hours, settings } = content;
  const brand = settings.brandColor;
  const heading = FONTS[settings.font];
  const hero = mediaById(content, home.heroImage);
  const specialImage = mediaById(content, special.image);
  const minute = useMinute();
  const clock = minute === null ? null : bakeryClock(minute);
  const todayHours = clock ? hours.find((h) => h.day === clock.day) : undefined;
  const openNow = !!(clock && todayHours && !todayHours.closed && clock.time >= todayHours.open && clock.time < todayHours.close);
  const showSpecial = specialIsLive(content, minute);

  return (
    <div className="@container min-h-full bg-[#fffaf3] font-sans text-[#2b1d14]" style={{ ["--jr-brand" as string]: brand }}>
      {settings.announcementOn && settings.announcement && (
        <p className="px-4 py-2 text-center text-xs font-medium text-white" style={{ background: brand }}>
          {settings.announcement}
        </p>
      )}

      <header className="flex items-center justify-between px-5 py-4 @3xl:px-10">
        <span className="flex items-center gap-2.5">
          <JuniperMark color={brand} />
          <span className="text-lg font-semibold leading-none" style={{ fontFamily: heading }}>
            Juniper &amp; Rye
          </span>
        </span>
        <nav className="hidden gap-6 text-sm @2xl:flex">
          <span>Menu</span>
          <span>Order ahead</span>
          <span>Visit</span>
        </nav>
        <span className="rounded-full px-4 py-2 text-xs font-semibold text-white" style={{ background: brand }}>
          Order
        </span>
      </header>

      {/* Hero */}
      <section className="grid items-center gap-6 px-5 pb-10 pt-4 @3xl:grid-cols-2 @3xl:gap-10 @3xl:px-10 @3xl:pb-16">
        <div>
          {clock && todayHours && (
            <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${openNow ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-700"}`}>
              <span className={`h-2 w-2 rounded-full ${openNow ? "bg-emerald-500" : "bg-stone-400"}`} />
              {openNow ? `Open now · until ${formatTime(todayHours.close)}` : todayHours.closed ? "Closed today" : `Closed now · ${clock.day} ${formatTime(todayHours.open)}–${formatTime(todayHours.close)}`}
            </p>
          )}
          <h1 className="mt-4 text-4xl leading-[1.05] @3xl:text-5xl" style={{ fontFamily: heading, fontWeight: settings.font === "sans" ? 700 : 600 }}>
            {home.headline || "Your headline here"}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#5b4636]">{home.subhead}</p>
          {home.cta && (
            <span className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg" style={{ background: brand }}>
              {home.cta}
            </span>
          )}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-200 shadow-xl">
          <Image key={hero.id} src={hero.src} alt={hero.alt} fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" unoptimized={hero.uploaded} />
        </div>
      </section>

      {/* Holiday special */}
      {showSpecial && (
        <section className="px-5 pb-10 @3xl:px-10">
          <div className="grid overflow-hidden rounded-3xl text-white @2xl:grid-cols-[1fr_1.2fr]" style={{ background: brand }}>
            <div className="relative aspect-[16/9] @2xl:aspect-auto">
              <Image key={specialImage.id} src={specialImage.src} alt={specialImage.alt} fill sizes="400px" className="object-cover" unoptimized={specialImage.uploaded} />
            </div>
            <div className="p-6 @3xl:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Limited time</p>
              <h2 className="mt-2 text-2xl leading-tight" style={{ fontFamily: heading }}>
                {special.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{special.body}</p>
              <span className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold" style={{ color: brand }}>
                Reserve a pie
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Menu */}
      <section className="px-5 pb-12 @3xl:px-10">
        <h2 className="text-3xl" style={{ fontFamily: heading }}>
          Today&rsquo;s menu
        </h2>
        <div className="mt-6 grid gap-8 @3xl:grid-cols-3">
          {MENU_CATEGORIES.map((category) => {
            const items = menu.filter((m) => m.category === category);
            if (!items.length) return null;
            return (
              <div key={category}>
                <h3 className="border-b-2 pb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ borderColor: brand, color: brand }}>
                  {category}
                </h3>
                <ul className="mt-3 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className={item.soldOut ? "opacity-50" : ""}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold">{item.name || "Untitled item"}</span>
                        <span className="shrink-0 text-sm font-semibold tabular-nums">{item.soldOut ? "Sold out" : formatPrice(item.price)}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-[#7a6352]">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visit */}
      <section className="grid gap-6 bg-[#f4e9dc] px-5 py-10 @3xl:grid-cols-2 @3xl:px-10">
        <div>
          <h2 className="text-3xl" style={{ fontFamily: heading }}>
            Come say hi
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5b4636]">
            214 Main Street · Pickup at the side window
            <br />
            (555) 014-2290 · hello@juniperrye.example
          </p>
        </div>
        <ul className="space-y-1.5 text-sm">
          {hours.map((h) => (
            <li key={h.day} className={`flex justify-between gap-4 ${clock?.day === h.day ? "font-bold" : ""}`}>
              <span>{h.day}</span>
              <span className="tabular-nums">{h.closed ? "Closed" : `${formatTime(h.open)} – ${formatTime(h.close)}`}</span>
            </li>
          ))}
        </ul>
      </section>
      <footer className="px-5 py-6 text-center text-xs text-[#7a6352]">© Juniper &amp; Rye Bakery · a fictitious bakery for this demo</footer>
    </div>
  );
}
