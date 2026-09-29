import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// Pages cached in R2 and refreshed through a Durable Object queue, so
// `revalidate = 3600` (the seasonal badge and nav in app/lib/season.ts)
// actually refreshes hourly on Cloudflare. See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
});
