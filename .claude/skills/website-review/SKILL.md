---
name: website-review
description: Audit a prospective client's current website and produce an R. Martin Creative website proposal PDF (audit findings, two homepage mockups, build options, savings versus their current host, running costs and plan) from the house template in scripts/proposal. Use when asked to review, scan or audit a business's website, make mockups of how a client's site could look, or write a website proposal or report like the earlier ones.
---

# Website review proposal

Produces the 10-page proposal used for We Repair For You and Pam's Appliance Express:
cover → at a glance → audit table → four problems → Concept A → Concept B →
build options → savings → how it works & running costs → plan.

Everything lives in `scripts/proposal/` (template, styles, fonts, scripts). Client work
goes in `proposals/<client-slug>/`, which is gitignored. Hand the finished files to Ryan
instead of committing them.

## House facts (never change these without being told)

- Business: **R. Martin Creative** · tagline "Marketing, Web & Print". Owner: Ryan Martin.
- Based in **Richmond, Illinois** (the cover's location line is always Ryan's town, not the client's).
- Contact line: `R. Martin Creative · 312-866-2762 · ryan@rmartincreative.com · rmartincreative.com`
- Logo: `scripts/proposal/rm-logo.svg`. Fonts: Geist and Geist Mono (bundled).
- Stack offered: Next.js on Cloudflare (free Workers plan), Resend for form email
  (free 3,000/month), optional Cloudflare Email Routing for an info@ address. Add Strapi
  ($5–10/mo server) only when the client needs to edit lots of content themselves.

## Ryan's rules for the content

- **Domain costs are the owner's responsibility.** Leave them out of every savings figure,
  don't tie the switch timing to the domain's renewal date, and list the domain as
  "owner pays" in the running-costs table.
- **Always state a page count.** The base option lists its pages by name and stays at
  **10 pages or fewer**. Extra pages (for example one page per town served) are a separate,
  higher-priced option with its own page count. Ask Ryan for the prices. Pam's was $200
  for 8 pages and $450 with 30 town pages.
- Don't offer "start small and upgrade later" deals or invent prices or policies. Ask.
- Content updates after launch: say the client sends Ryan the change and small updates
  (hours, closures, photos, text) **take only a few moments**.
- Don't include a desktop speed row in the audit table. Lead with the problems.
- Cover headline: one sentence where the money hook is in the gradient and the closer is
  black, e.g. `A better website for Pam's <span class="grad">for less than one year of
  Squarespace,</span> with no recurring fees.` Gradient text goes in `.grad` spans only.
  grad.js colors it per letter, because CSS background-clip leaves hairlines in the PDF.
- Use the client's own facts and words (About page, form options, photos). Don't invent
  promises such as "same-day", warranties or "family-owned". Mark mockup copy as a draft
  for the client to approve.
- Host prices come from the host's live pricing page (fetch it, cite it in Sources with
  the month). Show yearly and monthly billing, 1/3/5-year totals, five-year savings and
  payback months for each build option. Say which plan the client is on is unknown unless
  you can see it, and tell them where to check.
- Write plainly: short sentences, no jargon without a plain-words gloss, numbers measured
  rather than guessed. Every claim in the audit should come from audit.json or the page source.

## Process

1. **Scaffold:** `bun run proposal:new <client-slug>`
2. **Scan the current site**
   - `bun run proposal:audit <slug> https://client-site.com` measures every page in the sitemap
     (desktop and throttled phone): LCP, layout shift, download size, script weight, words,
     tap-to-call links, h1, meta description, alt text, structured data. It also saves screenshots
     to `shots/current-*.jpg`.
   - Read the pages' text (curl and strip tags), the sitemap `<lastmod>` dates, contact form
     fields and options, address, phone and hours.
   - Identify the host (e.g. `SQUARESPACE_CONTEXT` in the HTML, `wp-content`, Wix, GoDaddy).
     Check DNS with `https://dns.google/resolve?name=<domain>&type=NS|MX|A` and the registrar
     and dates with `https://rdap.verisign.com/com/v1/domain/<domain>`. No MX record means
     no email on the domain, which makes a good optional extra.
   - Pull the client's photos from the sitemap's `<image:loc>` entries into `mockups/img/`.
3. **Two mockups:** write `mockups/concept-a.html` and `concept-b.html`, each a full homepage
   that's responsive down to 390px with a sticky Call / Book bar on phones. Use the client's
   colors, logo lettering and photos, and make the two concepts clearly different (e.g. a
   clean form-first version and a bold brand-first version). Use only local fonts (copy
   woff2 files next to the mockup), then `bun run proposal:shots <slug>`.
4. **Fill `proposal.html`:** replace every `[PLACEHOLDER]` and remove or repeat rows as
   needed. Keep each page on one sheet, adjusting copy length rather than font sizes.
5. **Render:** `bun run proposal:pdf <slug>`. It warns about leftover placeholders.
   Then rasterize the PDF (`pdftoppm -r 80 -png`) and **look at every page** for overflow,
   collisions and stray lines before sending.
6. **Deliver:** the PDF plus `shots/a-desktop-full.jpg`, `a-mobile-full.jpg`, `b-desktop-full.jpg`
   and `b-mobile-full.jpg`. In the summary, list anything Ryan must confirm (current plan,
   prices, claims, low-resolution photos).

## Setup on a new machine

`bun install`, then `bunx playwright install chromium` once (or have Google Chrome
installed; the scripts fall back to it).
