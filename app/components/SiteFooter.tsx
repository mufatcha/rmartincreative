import Link from "next/link";
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL, NEXTDOOR_GROUP, SOCIAL_PROFILES } from "../lib/business";
import { IconArrowRight, IconFacebook, IconGoogle, IconNextdoor, IconX } from "./icons";
import { BUSINESS_CTA } from "../lib/cta";

/** Icon and brand hover color for each profile in SOCIAL_PROFILES, by name. */
const SOCIAL_STYLES: Record<string, { icon: typeof IconX; hover: string }> = {
  X: { icon: IconX, hover: "hover:bg-black hover:text-white hover:ring-black" },
  Facebook: { icon: IconFacebook, hover: "hover:bg-[#0866FF] hover:text-white hover:ring-[#0866FF]" },
  Google: { icon: IconGoogle, hover: "hover:bg-[#4285F4] hover:text-white hover:ring-[#4285F4]" },
  Nextdoor: { icon: IconNextdoor, hover: "hover:bg-[#1B8851] hover:text-white hover:ring-[#1B8851]" },
};
import { ABOUT } from "../lib/data/about";
import { SERVICE_AUDIENCES, getCategoriesFor } from "../lib/services-data";

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  // The About page appears here automatically once it's published.
  ...(ABOUT.published ? [{ href: "/about", label: "About" }] : []),
  { href: "/services", label: "All services" },
  { href: "/service-area", label: "Service area" },
  { href: "/extras", label: "Notes & Freebies" },
  { href: "/payment", label: "Ways to pay" },
  { href: "/privacy", label: "Privacy" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            {/* "RM" is drawn with CSS, not text, so scrapers don't read "RMR. Martin Creative". */}
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-[11px] font-bold text-white before:content-['RM']"
            />
            <span className="font-semibold text-ink">R. Martin Creative</span>
          </div>
          <p className="mt-3 max-w-xs">Your neighborhood designer for web, print, and everything in between.</p>
          <div className="mt-4 flex flex-col gap-1">
            <a href={BUSINESS_PHONE_TEL} className="hover:text-ink">
              {BUSINESS_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-ink">
              {BUSINESS_EMAIL}
            </a>
            <p>Serving Northern Illinois &amp; Southeast Wisconsin</p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            {SOCIAL_PROFILES.map((profile) => {
              const style = SOCIAL_STYLES[profile.name];
              const Icon = style?.icon;
              return (
                <a
                  key={profile.url}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={profile.label}
                  title={profile.label}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-ink/10 transition-colors ${style?.hover ?? "hover:bg-ink hover:text-paper"}`}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : <span className="text-xs font-semibold">{profile.name}</span>}
                </a>
              );
            })}
          </div>
          <a
            href={NEXTDOOR_GROUP.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-[#1B8851]"
          >
            {NEXTDOOR_GROUP.label}
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {SERVICE_AUDIENCES.map((audience) => (
          <div key={audience.id}>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink">{audience.label}</p>
            <ul className="mt-3 space-y-2">
              {audience.id === "business" && (
                <li>
                  <Link
                    href={BUSINESS_CTA.href}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-paper shadow-sm transition-transform hover:scale-105"
                  >
                    {BUSINESS_CTA.label}
                    <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              )}
              {audience.id === "business" && (
                <li>
                  <Link href="/new-business" className="hover:text-ink">
                    New Business Launch Guide
                  </Link>
                </li>
              )}
              {audience.id === "personal" && (
                <li>
                  <Link href="/cards-and-photos" className="hover:text-ink">
                    Cards &amp; Photos
                  </Link>
                </li>
              )}
              {getCategoriesFor(audience.id).map((category) => (
                <li key={category.slug}>
                  <Link href={`/services/${category.slug}`} className="hover:text-ink">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink">Company</p>
          <ul className="mt-3 space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-6 text-xs text-ink-soft">
        &copy; {new Date().getFullYear()} R. Martin Creative
      </p>
    </footer>
  );
}
