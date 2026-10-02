import QuoteModal from "./QuoteModal";
import { IconArrowRight } from "./icons";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";

/** Inline quote/call buttons shown beside service intro copy, so visitors don't have to scroll to the footer CTA.
 *  `extrasHref` adds a button that jumps down to a page's card extras. */
export default function ServiceCta({ extrasHref }: { extrasHref?: string } = {}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <QuoteModal triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105">
        Get a Quote
      </QuoteModal>
      <a
        href={BUSINESS_PHONE_TEL}
        className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
      >
        Call {BUSINESS_PHONE_DISPLAY}
        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
      {extrasHref && (
        <a
          href={extrasHref}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-transform hover:scale-105"
        >
          Make Them One of a Kind
          <IconArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
        </a>
      )}
    </div>
  );
}
