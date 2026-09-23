import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-[11px] font-bold text-white">
            RM
          </span>
          <div>
            <p>
              &copy; {new Date().getFullYear()} Ryan Martin Design &amp; Print
            </p>
            <p>Designed &amp; printed with care, one card at a time.</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a href={BUSINESS_PHONE_TEL} className="hover:text-ink">
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <p>Serving Gurnee, Richmond &amp; Northern Illinois</p>
        </div>
      </div>
    </footer>
  );
}
