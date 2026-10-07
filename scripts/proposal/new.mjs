// Starts a new website review in proposals/<client-slug>/ from the template.
//   bun run proposal:new pams-appliance-express
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: bun run proposal:new <client-slug>   (lowercase letters, numbers and dashes)");
  process.exit(1);
}

const dir = resolve(here, "../../proposals", slug);
if (existsSync(join(dir, "proposal.html"))) {
  console.error(`${dir}/proposal.html already exists. Pick another slug or edit that file.`);
  process.exit(1);
}
for (const sub of ["", "shots", "mockups", "mockups/img"]) mkdirSync(join(dir, sub), { recursive: true });
copyFileSync(join(here, "template.html"), join(dir, "proposal.html"));

console.log(`Created proposals/${slug}/
  proposal.html   fill in every [PLACEHOLDER]
  mockups/        concept-a.html and concept-b.html (photos in mockups/img/)
  shots/          screenshots land here

Next:
  bun run proposal:audit ${slug} https://client-site.com
  bun run proposal:shots ${slug}
  bun run proposal:pdf ${slug}`);
