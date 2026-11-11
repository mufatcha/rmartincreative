// Cloudflare entry point (wrangler.jsonc "main"): wraps the worker OpenNext builds
// so every page response says `Vary: Accept`. Pages answer with HTML or Markdown
// depending on the Accept header (next.config.ts rewrites), so caches must keep
// the two apart. Next's headers() can't do this: prerendered pages come out of
// the cache with Next's own Vary list, which replaces ours.
// See https://opennext.js.org/cloudflare/howtos/custom-worker

// The built worker may not exist yet (it's made at deploy time), so these imports
// use @ts-ignore rather than @ts-expect-error.
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore — built by `opennextjs-cloudflare build`.
import { default as handler } from "./.open-next/worker.js";

type Handler = { fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> };

const worker = {
  async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    const response = await (handler as Handler).fetch(request, env, ctx);
    const type = response.headers.get("content-type") ?? "";
    if (!type.startsWith("text/html") && !type.startsWith("text/markdown")) return response;

    const vary = response.headers.get("vary") ?? "";
    if (vary.split(",").some((v) => v.trim().toLowerCase() === "accept")) return response;

    const headers = new Headers(response.headers);
    headers.set("vary", vary ? `${vary}, Accept` : "Accept");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};

export default worker;

// The Durable Objects OpenNext's caching uses (wrangler.jsonc) must be exported
// from the entry point too.
// @ts-ignore — see above.
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
