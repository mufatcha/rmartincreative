# Developer Notes

Reminders for keeping the site running smoothly: steps that are easy to forget, and where things live.

## Commands

| Command | When |
|---|---|
| `bun run dev` | Local dev server at http://localhost:3000 |
| `bun run social-images` | After adding or changing a Notes & Freebies featured image |
| `bun run indexnow:changed` | After a deploy, to ask Bing and others to recrawl changed pages |
| `bun run indexnow` | After a deploy, to resubmit every page in the sitemap |
| `bun run pdf:checklist` | Rebuild the new business launch checklist PDF |
| `bun run deploy` | Build and deploy to Cloudflare |

Run `bun run` with nothing after it to list every script.

## Adding a Notes & Freebies post

1. Add an entry to `EXTRAS_LIST` in `app/lib/data/extras.ts`. The hub, sitemap, and llms.txt pick it up automatically.
2. Create `app/extras/<slug>/page.tsx`. Copy an existing article; the layout comes from `app/components/ExtraArticle.tsx`. Block types: `numbered`, `steps`, `bullets`, `text`, `code`, `table`.
3. Keep the title under ~45 characters so "| R. Martin Creative" fits in the page title (60 max), and the description at 160 characters or fewer.
4. Add the featured image to `public/webp-assets/` (see Images below) and set `image` on the entry.
5. **Run `bun run social-images`** and commit the new JPG in `public/social-media-posts/`. Without it, the post shares with no preview image.
6. Link to the new post from related service pages and articles.
7. After it's live, paste the link into [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/) to refresh the preview.

## Nextdoor group content

Posts for the free Nextdoor group, [Website Help for Local Business Owners](https://nextdoor.com/g/0wgka8voj/), go on the website first, then a short version goes on Nextdoor with a link back. Nextdoor can't embed group posts, and this way the content is public and searchable.

1. **Add it as a Notes & Freebies post** (see above), with `category: "web"` and a `series`:
   - `website-wednesday`: the weekly how-to
   - `before-after`: a real fix, using the `beforeAfter` block (a slider)
   - `group-qa`: answers to members' questions, written as the post's `faqs`
2. Add a 4:3 featured image, then run `bun run social-images`.
3. Push it and wait for it to go live.
4. **Post on Nextdoor:** 2–3 sentences summing it up, then "Full how-to with screenshots:" and the link.

Series posts automatically get a series badge, a "From the Nextdoor group" band on the hub, and a "Join the group" link at the end.

- **Before & after:** get the business owner's OK before publishing their site.
- **Q&As:** leave out names and businesses unless the member agrees.

## Images

- New images in `public/webp-assets/` get re-encoded before pushing: WebP quality 80, no wider than 1600px. Skip it if the file is already smaller.
- When you replace an image, update its `width`, `height`, and `alt` wherever it's used (for articles, in `extras.ts`).
- Social share images (1200×630 JPGs) live in `public/social-media-posts/`. They're generated, so don't edit them by hand; rerun `bun run social-images`.
- The site-wide share image is a static file, `public/social-media-posts/site-share.jpg`, and the favicon, iPhone icon, and manifest icons come from `public/brand/rm-logo.svg`. Static files can't fail for Facebook's or X's crawlers the way generated images can.
- Anything in `public/` goes live with the site. Private working files go in `Local/`, which is git-ignored.

## Content that lives in one place

| What | File |
|---|---|
| Every price on the site | `app/lib/data/pricing.ts` |
| Services, FAQs, feature bullets | `app/lib/services-data.ts` |
| Business name, phone, email, social profiles | `app/lib/business.ts` |
| Hero badge and seasonal nav link, by month | `app/lib/season.ts` |
| Towns in the service area | `app/lib/data/towns.ts` |
| About page | `app/lib/data/about.ts` |

**New pages:** set metadata with `pageMetadata({ title, description, path })` from `app/lib/seo.ts`. It adds the canonical address plus the page's own Facebook/X share tags. Without it, a page shares as the home page.

Service page text can carry links using `[text](/path)` in `details` (the second intro paragraph), FAQ answers, feature bullets, and the "Platforms & tools" items, but not in descriptions or taglines.

## Yearly and occasional updates

- **Christmas card special:** update `lastDay` and `endsAt` in `CHRISTMAS_SPECIAL` (`app/lib/data/pricing.ts`) each year. It disappears on its own after `endsAt`.
- **Christmas card guarantee date:** update `HOLIDAY_CARD_DEADLINE` (`label` and `endsAt`) in `app/lib/season.ts` and `CHRISTMAS_SPECIAL` in `app/lib/data/pricing.ts` each year, plus the "How early should Chicago clients order?" answer in `app/lib/data/christmas-towns.ts`. The hero badge shows the date from September, then switches to last call. Cards can still be ordered after it, just without the guarantee.
- **Seasonal messages:** review `app/lib/season.ts` once a year so each month's badge and nav link still fit.
- **New social profile:** add it to `SOCIAL_PROFILES` in `app/lib/business.ts`. It flows into the schema.org `sameAs` field and the footer. A new network also needs an icon in `app/components/icons.tsx` and an entry in `SOCIAL_STYLES` in `app/components/SiteFooter.tsx`.
- **Facebook link:** if the page gets a username, swap the `profile.php?id=…` link for `facebook.com/<username>`.

## Analytics events

Sent to Google Analytics 4 (and Clarity, where noted) from `app/components/Analytics.tsx`. Mark the GA ones as key events in GA4 (Admin → Events) to count them as conversions.

| Event | When | Details |
|---|---|---|
| `quote_open` | The quote form opens | `service` (or `not_chosen`), `page_path`; Clarity tag `quote_opened` |
| `quote_step` | Each quote form step is shown | `step` 1–4, `step_name` (service, questions, files, contact) |
| `quote_abandon` | The form is closed without sending | the step it stopped on; Clarity tag `quote_abandoned` |
| `generate_lead` | A quote request is sent | `service`; Clarity tag `quote_submitted` |
| `phone_click` / `email_click` | Any tel: or mailto: link is clicked | `link_url`, `page_path` |

In Clarity, filter recordings by the `quote_abandoned` tag to watch where people give up.

## Website health check tools

Free tools for running a Free Website + Search Health Check (or checking this site after a deploy).

| Area | Tool |
|---|---|
| Speed & Core Web Vitals | [PageSpeed Insights](https://pagespeed.web.dev), [WebPageTest](https://www.webpagetest.org), [GTmetrix](https://gtmetrix.com) |
| Google indexing & errors | [Google Search Console](https://search.google.com/search-console), [Bing Webmaster Tools](https://www.bing.com/webmasters) |
| Structured data | [Rich Results Test](https://search.google.com/test/rich-results), [Schema Markup Validator](https://validator.schema.org) |
| Security certificate & headers | [SSL Labs](https://www.ssllabs.com/ssltest/), [Security Headers](https://securityheaders.com) |
| Malware & blacklists | [Sucuri SiteCheck](https://sitecheck.sucuri.net) |
| Broken links | [W3C Link Checker](https://validator.w3.org/checklink) |
| Accessibility | [WAVE](https://wave.webaim.org) |
| Email & DNS (SPF, DKIM, DMARC) | [MxToolbox](https://mxtoolbox.com/SuperTool.aspx), [DNS Checker](https://dnschecker.org) |
| Share previews | [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) |
| Site history | [Wayback Machine](https://web.archive.org) |

Also test by hand: submit the contact form, tap the phone number on a phone, and ask ChatGPT and Google's AI Mode about the business.

## Demo sites

Two sales demos for made-up companies live in `app/demos/`. They hide the site header and footer (`app/components/HideOnDemos.tsx`) and show a slim demo bar instead.

| Demo | URL | Shows |
|---|---|---|
| Vantor (AI startup) | `/demos/vantor-ai` | Next.js and React features: streaming chat (`app/api/demo-chat`), streamed server data, a Server Action form, instant search, ⌘K palette |
| Juniper & Rye (bakery) | `/demos/juniper-rye` | A pretend headless CMS editor with a live preview, draft/publish, version history, and roles |

- Both are `noindex` (`pageMetadata({ noindex: true })`) and left out of the sitemap and the Markdown-for-agents rewrite, but linked from the Website Design & Development page (intro and FAQ), the Website Overhaul and WordPress & Headless CMS pages, and the Next.js and headless CMS articles.
- **Sales links:** add `?notes=1` to open a demo with the "How it's built" notes showing.
- **Juniper & Rye** saves edits in the visitor's browser. **Reset demo** in its top bar starts over between calls. Its photos are Freepik free-license stock in `public/webp-assets/demos/juniper-rye/`.

## Rules

- The business is **R. Martin Creative**. Never put it in the same sentence, title, description, or alt text as **Ryan Martin**. Example code uses made-up names, like "Example Co."
- Commit or push only when you're ready. There's no GitHub CLI, so open pull requests with the compare link: `https://github.com/mufatcha/rmartincreative/compare/main...<branch>`

## Open to-dos

- [ ] **Schema article links:** link `/extras/schema-markup-json-ld-seo-ai` from the Search + AI Update "Schema markup added where it's missing" bullet and the Search + AI Discovery FAQs. (Done: the health check page and the Next.js benefits article.)
