// Make the link-share image for every Notes & Freebies post:
//
//   bun run social-images
//
// Each post with a featured image (app/lib/data/extras.ts) gets a 1200×630 JPG at
// public/social-media-posts/<slug>.jpg, the size Facebook, X, and LinkedIn use for
// link previews. The post's share tags point there (extraShareMetadata), so run this
// after adding or changing a featured image, then commit the new file.
//
// Landscape images are cropped to fit, keeping the middle (where the title art
// sits). Tall images, like the Santa tags sheet, are shown whole over a blurred
// copy of themselves. Every image gets a small "rmartincreative.com" tag.

import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { EXTRAS, SOCIAL_IMAGE_SIZE, socialImagePath } from "../app/lib/data/extras";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const { width: W, height: H } = SOCIAL_IMAGE_SIZE;

sharp.cache(false);

/** The "rmartincreative.com" pill in the bottom-right corner. */
const URL_TAG = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${W - 330}" y="${H - 74}" width="300" height="46" rx="23" fill="#0b1026" fill-opacity="0.82" stroke="#ffffff" stroke-opacity="0.25"/>
  <text x="${W - 180}" y="${H - 44}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#ffffff">rmartincreative.com</text>
</svg>`);

async function render(src: string): Promise<ReturnType<typeof sharp>> {
  const { width = W, height = H } = await sharp(src).metadata();

  // Landscape: crop to fit, centered.
  if (width / height >= 1.2) return sharp(src).resize(W, H, { fit: "cover", position: "centre" });

  // Tall: the whole image, centered over a blurred, darkened copy.
  const backdrop = await sharp(src).resize(W, H, { fit: "cover" }).blur(30).modulate({ brightness: 0.55 }).toBuffer();
  const pad = 40;
  const front = await sharp(src).resize({ height: H - pad * 2, fit: "inside" }).toBuffer();
  const { width: fw = 0 } = await sharp(front).metadata();
  return sharp(backdrop).composite([{ input: front, left: Math.round((W - fw) / 2), top: pad }]);
}

const posts = EXTRAS.filter((e) => e.image);
mkdirSync(join(PUBLIC, "social-media-posts"), { recursive: true });

for (const post of posts) {
  const src = join(PUBLIC, post.image!.src);
  const out = join(PUBLIC, socialImagePath(post.slug));
  // Flatten the first pass so the tag goes on top of the finished crop.
  const base = await (await render(src)).png().toBuffer();
  await sharp(base).composite([{ input: URL_TAG }]).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
  console.log(`${socialImagePath(post.slug)}  ${Math.round(statSync(out).size / 1024)} KB`);
}

console.log(`\n${posts.length} share images written.`);
