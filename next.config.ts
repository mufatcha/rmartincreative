import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Cloudflare bindings (wrangler.jsonc) aren't wired into `next dev`: the app
// reads everything it needs from .env.local. If code ever calls
// getCloudflareContext(), add `initOpenNextCloudflareForDev()` from
// "@opennextjs/cloudflare" here. To test in the real Workers runtime, use
// `bun run preview`.
