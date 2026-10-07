// Screenshots the homepage mockups for the proposal's design pages.
//   bun run proposal:shots <client-slug>
// Reads proposals/<slug>/mockups/concept-a.html and concept-b.html and writes
// shots/a-desktop.jpg, a-mobile.jpg, b-desktop.jpg, b-mobile.jpg (plus -full.jpg
// full-length versions to send the client).
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launch } from "./browser.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: bun run proposal:shots <client-slug>");
  process.exit(1);
}
const dir = resolve(here, "../../proposals", slug);

const browser = await launch();
for (const concept of ["a", "b"]) {
  const file = join(dir, "mockups", `concept-${concept}.html`);
  if (!existsSync(file)) {
    console.warn(`Skipped: ${file} not found`);
    continue;
  }
  for (const [size, viewport] of [
    ["desktop", { width: 1280, height: 900 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
    await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const out = join(dir, "shots", `${concept}-${size}`);
    await page.screenshot({ path: `${out}.jpg`, type: "jpeg", quality: 86 });
    await page.screenshot({ path: `${out}-full.jpg`, type: "jpeg", quality: 86, fullPage: true });
    await page.close();
    console.log(`shots/${concept}-${size}.jpg`);
  }
}
await browser.close();
