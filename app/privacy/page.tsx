import type { Metadata } from "next";
import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";
import { pageTitle } from "../lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Privacy Policy"),
  description: `How ${BUSINESS_NAME} handles information from quote requests, uploads, and website analytics.`,
  alternates: { canonical: "/privacy" },
};

const UPDATED = "October 7, 2026";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What I collect when you ask for a quote",
    body: (
      <>
        <p>
          When you send a quote request, I receive what you enter — your name, email, phone number, and your answers
          — plus any files you upload, like photos or a logo. Your request is emailed to me, and uploaded files are
          stored privately with Cloudflare so I can open them; they&rsquo;re never public.
        </p>
        <p>
          I use this only to reply, quote, and do the work you ask for. I don&rsquo;t sell or rent your information,
          and I don&rsquo;t add you to a mailing list unless you ask.
        </p>
      </>
    ),
  },
  {
    heading: "Spam protection",
    body: (
      <p>
        The quote form uses Cloudflare Turnstile to tell real people from bots. It checks your browser without
        tracking you across other sites.
      </p>
    ),
  },
  {
    heading: "Website analytics",
    body: (
      <>
        <p>
          To see how the site is used and improve it, I use <strong>Google Analytics</strong> (visits, pages, and how
          people found the site) and <strong>Microsoft Clarity</strong> (heatmaps and recordings of how pages are
          scrolled and clicked). Both use cookies. They see things like the pages you visit, your device and browser,
          and roughly where you are — not your name or contact details.
        </p>
        <p>
          Clarity is set to hide what you type, and the quote form is never recorded. You can block these cookies in
          your browser settings, or opt out of Google Analytics with Google&rsquo;s{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            browser add-on
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "Hosting",
    body: (
      <p>
        The site is hosted on Cloudflare, which keeps standard server logs (like IP addresses and pages requested) to
        run the site securely.
      </p>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask me to see, correct, or delete the information you&rsquo;ve sent — including uploaded files — at
        any time. Email{" "}
        <a href={`mailto:${BUSINESS_EMAIL}`} className="font-semibold text-violet-600 hover:text-violet-700">
          {BUSINESS_EMAIL}
        </a>{" "}
        or call{" "}
        <a href={BUSINESS_PHONE_TEL} className="font-semibold text-violet-600 hover:text-violet-700">
          {BUSINESS_PHONE_DISPLAY}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Privacy</span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-soft">Last updated {UPDATED}</p>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          {BUSINESS_NAME} is a small, local business. This page explains, in plain language, what information the
          site collects and what happens to it.
        </p>
        {SECTIONS.map((s) => (
          <div key={s.heading} className="mt-10">
            <h2 className="text-xl font-bold tracking-tight">{s.heading}</h2>
            <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
