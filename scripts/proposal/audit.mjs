// Measures a client's current website for the audit pages of a proposal.
//   bun run proposal:audit <client-slug> https://client-site.com [more page URLs...]
// With one URL, the pages are taken from its sitemap.xml (up to 8). Each page is
// loaded twice: desktop (1366x850) and a throttled mid-range phone, close to
// Google's own speed tests. Writes proposals/<slug>/audit.json and screenshots of
// every page to proposals/<slug>/shots/current-*.jpg, and prints a summary.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { devices } from "playwright";
import { launch } from "./browser.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const [slug, ...urls] = process.argv.slice(2);
if (!slug || urls.length === 0) {
  console.error("Usage: bun run proposal:audit <client-slug> <url> [more urls...]");
  process.exit(1);
}
const outDir = resolve(here, "../../proposals", slug);
mkdirSync(join(outDir, "shots"), { recursive: true });

async function pagesFromSitemap(start) {
  try {
    const res = await fetch(new URL("/sitemap.xml", start));
    if (!res.ok) return [start];
    const locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    const pages = locs.filter((u) => !/\.(xml|jpe?g|png|webp|gif)$/i.test(u));
    return [start, ...pages.filter((u) => u.replace(/\/$/, "") !== start.replace(/\/$/, ""))].slice(0, 8);
  } catch {
    return [start];
  }
}

const name = (u) => new URL(u).pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
// One entry per page name, so "/" and "/home" aren't both measured.
const targets = [
  ...new Map((urls.length === 1 ? await pagesFromSitemap(urls[0]) : urls).reverse().map((u) => [name(u), u])).values(),
].reverse();

const browser = await launch();
const results = [];
for (const mode of ["desktop", "mobile"]) {
  for (const url of targets) {
    const ctx = await browser.newContext(
      mode === "mobile" ? { ...devices["Moto G4"] } : { viewport: { width: 1366, height: 850 } }
    );
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Network.enable");
    if (mode === "mobile") {
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    }
    const types = {};
    const typeOf = {};
    let total = 0;
    cdp.on("Network.responseReceived", (e) => (typeOf[e.requestId] = e.type));
    cdp.on("Network.loadingFinished", (e) => {
      total += e.encodedDataLength;
      const t = typeOf[e.requestId] || "Other";
      types[t] = (types[t] || 0) + e.encodedDataLength;
    });
    await page.addInitScript(() => {
      window.__lcp = 0;
      window.__cls = 0;
      new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__lcp = e.startTime))).observe({
        type: "largest-contentful-paint",
        buffered: true,
      });
      new PerformanceObserver((l) =>
        l.getEntries().forEach((e) => {
          if (!e.hadRecentInput) window.__cls += e.value;
        })
      ).observe({ type: "layout-shift", buffered: true });
    });

    let status = 0;
    try {
      const res = await page.goto(url, { waitUntil: "load", timeout: 90000 });
      status = res?.status() ?? 0;
    } catch (err) {
      results.push({ mode, url, error: err.message });
      await ctx.close();
      continue;
    }
    await page.waitForTimeout(4000);
    const facts = await page.evaluate(() => {
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
        try {
          const j = JSON.parse(s.textContent);
          return (Array.isArray(j) ? j : j["@graph"] || [j]).map((x) => x["@type"]);
        } catch {
          return [];
        }
      });
      return {
        lcpMs: Math.round(window.__lcp),
        cls: Number(window.__cls.toFixed(3)),
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || "",
        h1: [...document.querySelectorAll("h1")].map((h) => h.innerText.trim().slice(0, 80)),
        words: (document.body.innerText.match(/\S+/g) || []).length,
        telLinks: document.querySelectorAll('a[href^="tel:"]').length,
        images: document.images.length,
        imagesWithoutAlt: [...document.images].filter((i) => !i.getAttribute("alt")?.trim()).length,
        structuredData: ld.flat().filter(Boolean),
      };
    });
    const shot = join(outDir, "shots", `current-${mode}-${name(url)}.jpg`);
    await page.screenshot({ path: shot, type: "jpeg", quality: 85 });
    await page.screenshot({ path: shot.replace(/\.jpg$/, "-full.jpg"), type: "jpeg", quality: 80, fullPage: true });
    results.push({
      mode,
      url,
      status,
      ...facts,
      transferKB: Math.round(total / 1024),
      transferByTypeKB: Object.fromEntries(Object.entries(types).map(([k, v]) => [k, Math.round(v / 1024)])),
    });
    await ctx.close();
  }
}
await browser.close();

writeFileSync(join(outDir, "audit.json"), JSON.stringify({ measuredAt: new Date().toISOString(), results }, null, 2));
console.table(
  results.map((r) =>
    r.error
      ? { mode: r.mode, page: name(r.url), error: r.error.slice(0, 60) }
      : {
          mode: r.mode,
          page: name(r.url),
          "LCP s": (r.lcpMs / 1000).toFixed(1),
          CLS: r.cls,
          KB: r.transferKB,
          "script KB": r.transferByTypeKB.Script || 0,
          words: r.words,
          tel: r.telLinks,
          h1: r.h1.length,
          desc: r.description ? "yes" : "no",
          "no alt": `${r.imagesWithoutAlt}/${r.images}`,
          schema: r.structuredData.join(",") || "none",
        }
  )
);
console.log(`Saved proposals/${slug}/audit.json and shots/current-*.jpg
Words counts all visible text (menus and footer included); check the main content by eye.
Targets: LCP <= 2.5 s, CLS <= 0.10 (Google Core Web Vitals).`);
