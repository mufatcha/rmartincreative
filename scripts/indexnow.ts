// Ask Bing (and the other IndexNow search engines: Yandex, Seznam, Naver, …)
// to recrawl pages right away. Run after a deploy:
//
//   bun run indexnow                      submit every page in the live sitemap
//   bun run indexnow --changed            submit only pages that are new or changed
//                                         since the last run (see below)
//   bun run indexnow --baseline           record every page's current content
//                                         without submitting anything
//   bun run indexnow /passport-photos ... submit only these paths or full URLs
//
// --changed reads each live page and fingerprints what search engines care about
// (title, description, and main text — not scripts or build file names, which
// change on every deploy). It compares those with the last run, stored in
// .indexnow/state.json (git-ignored), and submits only the differences.
//
// IndexNow checks that the key below is served at https://rmartincreative.com/<key>.txt
// (public/<key>.txt), so that file has to be deployed first. Google doesn't
// use IndexNow; it reads the sitemap on its own.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://rmartincreative.com";
const KEY = "fb90202879348c56163d4a07ce23c68f";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const STATE_FILE = join(dirname(fileURLToPath(import.meta.url)), "..", ".indexnow", "state.json");

type State = { updated: string; pages: Record<string, string> };

async function sitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Couldn't read the sitemap (${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function toUrl(arg: string): string {
  if (arg.startsWith("http")) return arg;
  return `${SITE}${arg.startsWith("/") ? "" : "/"}${arg}`;
}

/** Fingerprint of a page's searchable content: title, description, and main text. */
async function fingerprint(url: string): Promise<string | null> {
  const res = await fetch(url, { headers: { accept: "text/html" } });
  if (!res.ok) return null;
  const html = await res.text();
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html)
    .replace(/<(script|style|template)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return createHash("sha256").update(`${title}\n${description}\n${main}`).digest("hex");
}

/** Fingerprints for many pages, a few at a time. */
async function fingerprintAll(urls: string[]): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (let i = 0; i < urls.length; i += 6) {
    const batch = urls.slice(i, i + 6);
    const prints = await Promise.all(batch.map(fingerprint));
    batch.forEach((u, j) => {
      if (prints[j]) out[u] = prints[j];
    });
  }
  return out;
}

function loadState(): State | null {
  return existsSync(STATE_FILE) ? (JSON.parse(readFileSync(STATE_FILE, "utf8")) as State) : null;
}

function saveState(pages: Record<string, string>) {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify({ updated: new Date().toISOString(), pages }, null, 2));
}

const MEANING: Record<number, string> = {
  200: "OK — URLs submitted.",
  202: "Accepted — the key is still being checked; the URLs will be processed once it's confirmed.",
  400: "Bad request — check the URL list.",
  403: `Key not valid — make sure ${SITE}/${KEY}.txt is live and contains the key.`,
  422: "URLs don't belong to this site, or the key doesn't match.",
  429: "Too many requests — try again later.",
};

async function submit(urlList: string[]): Promise<boolean> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
  });
  console.log(`Submitted ${urlList.length} URL${urlList.length === 1 ? "" : "s"} to IndexNow.`);
  console.log(`${res.status}: ${MEANING[res.status] ?? (await res.text())}`);
  return res.ok;
}

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const paths = args.filter((a) => !a.startsWith("--"));

if (flags.has("--changed") || flags.has("--baseline")) {
  const urls = await sitemapUrls();
  console.log(`Checking ${urls.length} pages on the live site…`);
  const current = await fingerprintAll(urls);

  if (flags.has("--baseline")) {
    saveState(current);
    console.log(`Recorded ${Object.keys(current).length} pages. Nothing submitted.`);
  } else {
    const previous = loadState();
    if (!previous) {
      console.log("No earlier run recorded — submitting every page this time.");
    }
    const changed = urls.filter((u) => current[u] && current[u] !== previous?.pages[u]);
    if (changed.length === 0) {
      console.log("Nothing new or changed since the last run.");
    } else {
      for (const u of changed) console.log(`  ${previous?.pages[u] ? "changed" : "new    "}  ${u.replace(SITE, "") || "/"}`);
      // Only remember the new fingerprints once the submission is accepted.
      if (await submit(changed)) saveState(current);
      else process.exitCode = 1;
    }
  }
} else {
  const urlList = paths.length > 0 ? paths.map(toUrl) : await sitemapUrls();
  const foreign = urlList.filter((u) => !u.startsWith(SITE));
  if (foreign.length > 0) throw new Error(`Only ${SITE} URLs can be submitted: ${foreign.join(", ")}`);
  if (!(await submit(urlList))) process.exitCode = 1;
}
