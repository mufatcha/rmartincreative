import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { parse } from "node-html-parser";

// Markdown for Agents: when an AI agent asks for a page with
// `Accept: text/markdown`, next.config.ts rewrites the request here. This fetches
// the normal HTML page, keeps the main content, and returns it as Markdown, with
// the page's structured data (JSON-LD) attached. Browsers and search engines
// never ask for Markdown, so they always get the regular page.
export const dynamic = "force-dynamic";

// Signals how AI systems may use the content (see contentsignals.org).
const CONTENT_SIGNAL = "ai-train=yes, search=yes, ai-input=yes";

/** Fetch a page of this site as HTML. On Cloudflare a Worker can't call its own
 *  domain, so it goes through the WORKER_SELF_REFERENCE binding; in dev, plain fetch. */
async function fetchOwnPage(url: URL): Promise<Response> {
  const request = new Request(url, { headers: { accept: "text/html" } });
  try {
    const { env } = getCloudflareContext();
    const self = (env as { WORKER_SELF_REFERENCE?: { fetch: typeof fetch } }).WORKER_SELF_REFERENCE;
    if (self) return self.fetch(request);
  } catch {
    // Not running on Cloudflare (e.g. `next dev`).
  }
  return fetch(request);
}

function toMarkdown(html: string, pageUrl: URL): string {
  const root = parse(html);
  const title = root.querySelector("title")?.text.trim() ?? "";
  const description = root.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? pageUrl.href;
  const jsonLd = root
    .querySelectorAll('script[type="application/ld+json"]')
    .map((s) => s.textContent.trim())
    .filter(Boolean);

  // Only the page content: no header, footer, scripts, icons, or decorative markup.
  const main = root.querySelector("main") ?? root.querySelector("body") ?? root;
  main
    .querySelectorAll("script, style, noscript, svg, template, dialog, [aria-hidden=true], [hidden]")
    .forEach((el) => el.remove());
  // Make links and images absolute, so they work outside the site.
  main.querySelectorAll("a[href], img[src]").forEach((el) => {
    const attr = el.tagName === "A" ? "href" : "src";
    let value = el.getAttribute(attr);
    // next/image serves resized copies from /_next/image?url=…; point at the original file.
    if (value?.startsWith("/_next/image?")) value = new URLSearchParams(value.split("?")[1]).get("url") ?? value;
    if (value && !value.startsWith("#") && !value.startsWith("data:")) {
      try {
        el.setAttribute(attr, new URL(value, pageUrl).href);
      } catch {}
    }
  });

  const body = NodeHtmlMarkdown.translate(main.innerHTML, { ignore: ["button"] })
    // Links sitting side by side (buttons, tag lists) otherwise run together.
    .replace(/\)\[/g, ") · [")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const parts = [
    `# ${title}`,
    description && `> ${description}`,
    `Source: ${canonical}`,
    body,
    jsonLd.length > 0 && ["## Structured data", ...jsonLd.map((j) => "```json\n" + j + "\n```")].join("\n\n"),
  ];
  return parts.filter(Boolean).join("\n\n") + "\n";
}

export async function GET(request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const incoming = new URL(request.url);
  const pageUrl = new URL(`/${path.map(encodeURIComponent).join("/")}${incoming.search}`, incoming.origin);

  const page = await fetchOwnPage(pageUrl);
  const type = page.headers.get("content-type") ?? "";
  // Not a page (llms.txt, sitemap, images, a redirect or error): pass it through unchanged.
  if (!page.ok || !type.includes("text/html")) return page;

  const markdown = toMarkdown(await page.text(), pageUrl);
  return new Response(markdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "accept",
      "x-markdown-tokens": String(Math.ceil(markdown.length / 4)),
      "content-signal": CONTENT_SIGNAL,
      // Agents get this through content negotiation on the real URL; keep the
      // internal /agent-markdown address out of search results.
      "x-robots-tag": "noindex",
      "cache-control": "public, max-age=3600",
    },
  });
}
