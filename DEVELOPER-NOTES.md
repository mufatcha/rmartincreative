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

## Images

- New images in `public/webp-assets/` get re-encoded before pushing: WebP quality 80, no wider than 1600px. Skip it if the file is already smaller.
- When you replace an image, update its `width`, `height`, and `alt` wherever it's used (for articles, in `extras.ts`).
- Social share images (1200×630 JPGs) live in `public/social-media-posts/`. They're generated, so don't edit them by hand; rerun `bun run social-images`.
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

Service page text can carry links using `[text](/path)` in FAQ answers, feature bullets, and the "Platforms & tools" items, but not in descriptions or taglines.

## Yearly and occasional updates

- **Christmas card special:** update `lastDay` and `endsAt` in `CHRISTMAS_SPECIAL` (`app/lib/data/pricing.ts`) each year. It disappears on its own after `endsAt`.
- **Seasonal messages:** review `app/lib/season.ts` once a year so each month's badge and nav link still fit.
- **New social profile:** add it to `SOCIAL_PROFILES` in `app/lib/business.ts`. It flows into the schema.org `sameAs` field and the footer. A new network also needs an icon in `app/components/icons.tsx` and an entry in `SOCIAL_STYLES` in `app/components/SiteFooter.tsx`.
- **Facebook link:** if the page gets a username, swap the `profile.php?id=…` link for `facebook.com/<username>`.

## Rules

- The business is **R. Martin Creative**. Never put it in the same sentence, title, description, or alt text as **Ryan Martin**. Example code uses made-up names, like "Example Co."
- Commit or push only when you're ready. There's no GitHub CLI, so open pull requests with the compare link: `https://github.com/mufatcha/rmartincreative/compare/main...<branch>`

## Open to-dos

- [ ] **Schema article links:** link `/extras/schema-markup-json-ld-seo-ai` from the Search + AI Update "Schema markup added where it's missing" bullet, the Free Search + AI Health Check and Search + AI Discovery FAQs, and the Next.js benefits article.
