This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Quote form setup

The quote form emails each request to you, and customers can attach files without creating an account. Files upload straight from the browser to Cloudflare R2, and Resend sends the email. Both have free tiers. Until the variables below are set, the form shows a "not set up yet" message with your phone number and email.

Copy `.env.example` to `.env.local` and fill it in:

1. **Cloudflare R2** ([dashboard](https://dash.cloudflare.com/?to=/:account/r2)): create a bucket, then set these under the bucket's **Settings**.
   - **CORS policy:**
     ```json
     [
       {
         "AllowedOrigins": ["http://localhost:3000", "https://YOUR-DOMAIN.com"],
         "AllowedMethods": ["PUT"],
         "AllowedHeaders": ["content-type"],
         "MaxAgeSeconds": 3600
       }
     ]
     ```
   - **Object lifecycle rule:** delete objects with the prefix `quotes/` after 90 days. This keeps storage inside the free 10 GB.
   - **R2 → Manage API tokens:** create a token with *Object Read & Write* on this bucket. Copy the Access Key ID, the Secret Access Key, and your account ID into `R2_*`.
2. **Resend** ([dashboard](https://resend.com/api-keys)): create an API key and put it in `RESEND_API_KEY`. Until you verify your domain in Resend, emails can only go to the address you signed up with, so sign up with the inbox that should receive quotes.
3. **Cloudflare Turnstile** ([dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)): add a widget for your domain (and `localhost`). Choose **Invisible** mode, then copy the site key and secret key. It's optional in development, but set it before launch to block spam.

Quote emails include download links that work for 7 days. After that, files stay in the R2 bucket under `quotes/<date>/` until the 90-day lifecycle rule removes them.

## Deploying to Cloudflare

The site runs on Cloudflare Workers through the [OpenNext adapter](https://opennext.js.org/cloudflare). The config lives in `wrangler.jsonc` and `open-next.config.ts`. Every push to `main` deploys to production, and every other branch gets a preview URL.

**Local check in the real Cloudflare runtime:** `bun run preview`. It reads secrets from `.dev.vars`; copy `.env.local` to create it.

### One-time setup

1. **Create the page-cache bucket.** This is separate from `client-uploads`: `bunx wrangler r2 bucket create rmartincreative-cache`, or create it in the R2 dashboard.
2. **Connect GitHub.** In [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages), go to **Create** → **Import a repository** and pick `mufatcha/rmartincreative`.
   - Project name: `rmartincreative` (must match `name` in `wrangler.jsonc`)
   - Build command: `bun run cf:build`
   - Deploy command: `bun run cf:deploy`
   - Under **Build variables**, add `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. It gets baked into the page at build time.
3. **Add runtime secrets.** In the Worker, go to **Settings** → **Variables and Secrets** and add each one as type *Secret*: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`. Optionally also add `QUOTE_TO_EMAIL` and `QUOTE_FROM_EMAIL`.
4. **Attach your domain.** In the Worker, go to **Settings** → **Domains & Routes** → **Add** → **Custom domain**, and add both `yourdomain.com` and `www.yourdomain.com`. Cloudflare creates the DNS records and the HTTPS certificate.
5. **Allow the live domain** in the two places that currently only allow `localhost`:
   - **R2 `client-uploads` → Settings → CORS policy:** add `https://yourdomain.com` and `https://www.yourdomain.com` to `AllowedOrigins`.
   - **Turnstile → your widget → Hostnames:** add `yourdomain.com`.
6. **Recommended:** verify your domain in Resend, then set `QUOTE_FROM_EMAIL` to something like `Ryan Martin Design <quotes@yourdomain.com>`.

The Worker is about 2 MiB compressed, under the free plan's 3 MiB limit.
