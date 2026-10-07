// Prints a proposal to a US Letter PDF.
//   bun run proposal:pdf <client-slug>
// Reads proposals/<slug>/proposal.html and writes the PDF next to it, named from
// the page <title> (e.g. "Pams-Appliance-Express-Website-Proposal.pdf").
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launch } from "./browser.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: bun run proposal:pdf <client-slug>");
  process.exit(1);
}
const dir = resolve(here, "../../proposals", slug);
const html = join(dir, "proposal.html");
if (!existsSync(html)) {
  console.error(`${html} not found. Start one with: bun run proposal:new ${slug}`);
  process.exit(1);
}

const left = readFileSync(html, "utf8").match(/\[[A-Z][A-Z0-9 ,.'’:\/&-]*\]/g);
if (left) console.warn(`Warning: ${left.length} placeholder(s) still in proposal.html, e.g. ${left.slice(0, 3).join(" ")}`);

const title = readFileSync(html, "utf8").match(/<title>([^<]*)<\/title>/)?.[1] ?? slug;
const fileName =
  title
    .replace(/&amp;/g, "&")
    .replace(/['’]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") + ".pdf";

const browser = await launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const out = join(dir, fileName);
await page.pdf({ path: out, format: "Letter", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`Saved proposals/${slug}/${fileName}`);
