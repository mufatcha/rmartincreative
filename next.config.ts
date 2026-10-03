import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // Markdown for Agents: a request that asks for Markdown (`Accept: text/markdown`)
      // gets a Markdown version of the page from app/agent-markdown. Browsers and
      // search engines don't send that header, so they get the normal page.
      // (Two simple patterns, not one regex: the Cloudflare adapter can't fill a
      // single regex parameter that spans several path segments.)
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/agent-markdown",
        },
        {
          source: "/:first((?!_next$|api$|agent-markdown$)[^/]+)/:rest*",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/agent-markdown/:first/:rest*",
        },
      ],
    };
  },
};

export default nextConfig;

// Cloudflare bindings (wrangler.jsonc) aren't wired into `next dev`: the app
// reads everything it needs from .env.local. app/agent-markdown calls
// getCloudflareContext() but falls back to a plain fetch when it's unavailable,
// so `next dev` doesn't need `initOpenNextCloudflareForDev()`. To test in the
// real Workers runtime, use `bun run preview`.
