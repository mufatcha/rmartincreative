import Script from "next/script";

// Google Analytics 4 and Microsoft Clarity. Both load with `lazyOnload` — during
// browser idle time, after everything else on the page — so they don't slow the
// first paint or the main content. They only run on the live domain, so local
// testing and preview builds don't skew the numbers.
//
// Clarity: set masking to "Strict" in the Clarity dashboard (Settings → Masking);
// the quote form is also marked data-clarity-mask so it's never recorded.

export const GA_MEASUREMENT_ID = "G-BH6R3L18SE";
export const CLARITY_PROJECT_ID = "ytv3utge7a";
const LIVE_HOST = "rmartincreative.com";

const loader = `
(function () {
  var host = location.hostname;
  if (host !== "${LIVE_HOST}" && host !== "www.${LIVE_HOST}") return;

  // Google Analytics 4
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", "${GA_MEASUREMENT_ID}");
  var ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}";
  document.head.appendChild(ga);

  // Microsoft Clarity
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
})();
`;

export default function Analytics() {
  return (
    <Script id="analytics" strategy="lazyOnload">
      {loader}
    </Script>
  );
}

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

/** Records a completed quote request as a conversion (GA4 "generate_lead") and a Clarity event. */
export function trackQuoteSubmitted(serviceId: string) {
  const w = window as AnalyticsWindow;
  w.gtag?.("event", "generate_lead", { service: serviceId });
  w.clarity?.("event", "quote_submitted");
}
