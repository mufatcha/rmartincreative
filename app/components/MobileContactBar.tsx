import QuoteModal from "./QuoteModal";
import { BUSINESS_PHONE_TEL } from "../lib/business";

/**
 * Phones only: Call and Get a Quote, pinned to the bottom of the screen so they're
 * always one tap away. The spacer keeps the bar from covering the end of the footer.
 */
export default function MobileContactBar() {
  return (
    <>
      <div aria-hidden className="h-20 sm:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(32,26,46,0.08)] backdrop-blur sm:hidden">
        <div className="flex gap-3">
          <a
            href={BUSINESS_PHONE_TEL}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white py-3 text-sm font-semibold text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.15a1.5 1.5 0 0 1 1.47 1.2l.5 2.5a1.5 1.5 0 0 1-.79 1.63l-.9.45a11 11 0 0 0 6.29 6.29l.45-.9a1.5 1.5 0 0 1 1.63-.79l2.5.5A1.5 1.5 0 0 1 18 15.35v1.15a1.5 1.5 0 0 1-1.5 1.5H15C8.1 18 2 11.9 2 5V3.5Z" />
            </svg>
            Call
          </a>
          <QuoteModal triggerClassName="flex-1 rounded-full bg-ink py-3 text-sm font-semibold text-paper">Get a Quote</QuoteModal>
        </div>
      </div>
    </>
  );
}
