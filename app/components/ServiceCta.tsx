import QuoteModal from "./QuoteModal";
import { IconArrowRight } from "./icons";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";

/** Inline quote/call buttons shown beside service intro copy, so visitors don't have to scroll to the footer CTA. */
export default function ServiceCta() {
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
    </div>
  );
}
