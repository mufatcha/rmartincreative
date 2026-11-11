import type { NextConfig } from "next";

// Paths that get a Markdown version: everything except Next's own files, the API,
// the Markdown route itself, and the demo sites (fictitious companies, so agents
// never get a Markdown copy of them). The lookahead checks the whole first
// segment, so /demos-something would still match but /demos/x would not.
const FIRST = "(?!(?:_next|api|agent-markdown|demos)(?:/|$))[^/]+";
// A last segment ending in .md (the name without it is captured).
const MD = "[^/]+?";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Markdown copies at their own addresses (llms.txt v2): /services.md,
        // /services/index.md, /index.md for the home page, and page.html.md.
        // app/agent-markdown drops a trailing "index" and ".html". Up to three
        // segments, the deepest the site goes (/services/category/leaf).
        // `__md=1` tells the route the request came by a .md address.
        // (Separate patterns, not one regex: the Cloudflare adapter can't fill a
        // single regex parameter that spans several path segments.)
        { source: `/:a(${FIRST.replace("[^/]+", MD)})\\.md`, destination: "/agent-markdown/:a?__md=1" },
        { source: `/:a(${FIRST})/:b(${MD})\\.md`, destination: "/agent-markdown/:a/:b?__md=1" },
        { source: `/:a(${FIRST})/:b([^/]+)/:c(${MD})\\.md`, destination: "/agent-markdown/:a/:b/:c?__md=1" },

        // Markdown for Agents: a request that asks for Markdown (`Accept: text/markdown`)
        // gets the Markdown version at the page's normal address. Browsers and
        // search engines don't send that header, so they get the normal page.
        {
          source: "/",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/agent-markdown",
        },
        {
          source: `/:first(${FIRST})/:rest*`,
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/agent-markdown/:first/:rest*",
        },
      ],
    };
  },

  async headers() {
    // (Vary: Accept, since pages answer with HTML or Markdown, is added in
    // custom-worker.ts: Next's cached pages replace a Vary set here.)
    // Points agents at the site summary (llms.txt v2: rel="describedby").
    const describedBy = { key: "Link", value: '</llms.txt>; rel="describedby"; type="text/plain"' };
    return [
      { source: "/", headers: [describedBy] },
      { source: `/:first(${FIRST})/:rest*`, headers: [describedBy] },
    ];
  },
};

export default nextConfig;

// Cloudflare bindings (wrangler.jsonc) aren't wired into `next dev`: the app
// reads everything it needs from .env.local. app/agent-markdown calls
// getCloudflareContext() but falls back to a plain fetch when it's unavailable,
// so `next dev` doesn't need `initOpenNextCloudflareForDev()`. To test in the
// real Workers runtime, use `bun run preview`.
