// Ask Bing (and the other IndexNow search engines: Yandex, Seznam, Naver, …)
// to recrawl pages right away. Run after a deploy:
//
//   bun run indexnow                      submit every page in the live sitemap
//   bun run indexnow /passport-photos ... submit only these paths or full URLs
//
// IndexNow checks that the key below is served at https://rmartincreative.com/<key>.txt
// (public/<key>.txt), so that file has to be deployed first. Google doesn't
// use IndexNow; it reads the sitemap on its own.

export {}; // a module, so top-level await works

const SITE = "https://rmartincreative.com";
const KEY = "fb90202879348c56163d4a07ce23c68f";
const ENDPOINT = "https://api.indexnow.org/indexnow";

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

const MEANING: Record<number, string> = {
  200: "OK — URLs submitted.",
  202: "Accepted — the key is still being checked; the URLs will be processed once it's confirmed.",
  400: "Bad request — check the URL list.",
  403: `Key not valid — make sure ${SITE}/${KEY}.txt is live and contains the key.`,
  422: "URLs don't belong to this site, or the key doesn't match.",
  429: "Too many requests — try again later.",
};

const args = process.argv.slice(2);
const urlList = args.length > 0 ? args.map(toUrl) : await sitemapUrls();
const foreign = urlList.filter((u) => !u.startsWith(SITE));
if (foreign.length > 0) throw new Error(`Only ${SITE} URLs can be submitted: ${foreign.join(", ")}`);

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`Submitted ${urlList.length} URL${urlList.length === 1 ? "" : "s"} to IndexNow.`);
console.log(`${res.status}: ${MEANING[res.status] ?? (await res.text())}`);
if (!res.ok) process.exitCode = 1;
