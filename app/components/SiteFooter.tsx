import Link from "next/link";
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";
import { ABOUT } from "../lib/data/about";
import { SERVICE_AUDIENCES, getCategoriesFor } from "../lib/services-data";

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  // The About page appears here automatically once it's published.
  ...(ABOUT.published ? [{ href: "/about", label: "About" }] : []),
  { href: "/services", label: "All services" },
  { href: "/#portfolio", label: "Work" },
  { href: "/#process", label: "How it works" },
  { href: "/service-area", label: "Service area" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-[11px] font-bold text-white">
              RM
            </span>
            <span className="font-semibold text-ink">Ryan Martin Design &amp; Print</span>
          </div>
          <p className="mt-3 max-w-xs">Your neighborhood designer for web, print, and everything in between.</p>
          <div className="mt-4 flex flex-col gap-1">
            <a href={BUSINESS_PHONE_TEL} className="hover:text-ink">
              {BUSINESS_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-ink">
              {BUSINESS_EMAIL}
            </a>
            <p>Serving Northern Illinois &amp; Southern Wisconsin</p>
          </div>
        </div>

        {SERVICE_AUDIENCES.map((audience) => (
          <div key={audience.id}>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink">{audience.label}</p>
            <ul className="mt-3 space-y-2">
              {audience.id === "business" && (
                <li>
                  <Link href="/new-business" className="hover:text-ink">
                    New business launch guide
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
        &copy; {new Date().getFullYear()} Ryan Martin Design &amp; Print
      </p>
    </footer>
  );
}
