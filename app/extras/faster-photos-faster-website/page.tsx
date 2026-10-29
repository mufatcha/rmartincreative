import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";
import type { ServiceFaq } from "../../lib/services-data";

const SLUG = "faster-photos-faster-website";
const WEB = "/services/website-design-development";

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

// The article body follows the downloadable PDF (public/downloads/Faster-Photos-Faster-Website.pdf),
// so the two stay in step. Plain strings, so inline "[text](/link)" links work.
const PART_1 = [
  {
    title: "Find your heaviest images (5 min)",
    body: "Go to [PageSpeed Insights](https://pagespeed.web.dev), enter your homepage address, and run the test. Scroll to the suggestions and look for items like “Improve image delivery” or “Properly size images.” Each one lists the images that need work and how much file size you could save. Start with the big photo at the top of your homepage (often called the hero image): it loads first and is usually the largest file on the page.",
  },
  {
    title: "Know your size targets (5 min)",
    body: "Use the table below as your guide. Don't upload a 6,000 px, 7 MB phone photo and let the website shrink it on screen; resize it to 1920 px and save it as WebP at about 200 KB **before** you upload.",
  },
];

const SIMPLE_RULE = [
  "Use **WebP** for almost everything. It's small, sharp, and works everywhere.",
  "Try **AVIF** for your largest photos if your website platform accepts it. If the upload is refused or the image looks off, go back to WebP.",
  "Keep **logos and icons** as SVG so edges stay crisp (more on that next).",
  "Always **keep your original** full-size photo in a folder. Shrinking is a one-way street: you can't add detail back later.",
];

const SVG_USES = [
  "Your **logo**, especially in the header of your site",
  "**Icons**, like phone, email, map pin, and social media icons",
  "Simple **graphics** with flat colors and clean edges, like badges, diagrams, or a service area map",
];

const TOOLS = [
  {
    title: "Squoosh: best for one image at a time",
    body: "A free tool from Google that runs in your web browser at [squoosh.app](https://squoosh.app). Drop in a photo, pick WebP or AVIF, and drag the quality slider while you compare before and after side by side. Nothing to install, and your images stay on your computer. Set the width under **Resize**, choose WebP, and start the quality around 75. Lower it until you can see a difference, then nudge it back up.",
  },
  {
    title: "TinyPNG: best for a quick batch",
    body: "Drag a handful of images onto [TinyPNG](https://tinypng.com) and it shrinks them automatically, with an option to convert to WebP or AVIF. The free version limits how many and how large, which is plenty for a homepage cleanup. Use it for a batch of photos that are already the right width.",
  },
  {
    title: "PhotoCraft by ArtCraft: best if you also want a photo editor",
    body: "A free, open source photo editor from [getartcraft.com](https://getartcraft.com) for Windows, Mac, Linux, or right in your web browser, with no account needed. It's a good fit if you want to crop, straighten, or brighten a photo and export a web-ready copy in the same place. Use **Image Size** to set the width, then **Export As** to choose WebP, set the quality, and see the estimated file size before you save. PhotoCraft doesn't export AVIF, so use Squoosh or TinyPNG for that. Its makers label it “early alpha,” so expect the odd rough edge and save a copy of your originals first.",
  },
  {
    title: "PageSpeed Insights: check your work",
    body: "After you re-upload your new images, run your homepage through [PageSpeed Insights](https://pagespeed.web.dev) again and compare the score and load time with your first test.",
  },
];

const CHECKLIST = [
  "Run PageSpeed Insights and note your score (5 min)",
  "Back up your original photos in one folder (2 min)",
  "Resize your hero image to 1920 px wide (3 min)",
  "Save it as WebP (or AVIF) under 250 KB (3 min)",
  "Shrink the other large images flagged by the test (10 min)",
  "Swap your logo for an SVG version (5 min)",
  "Re-upload and replace the old files on your site (5 min)",
  "Re-run PageSpeed Insights and compare (2 min)",
  "Make it a habit: resize every new photo before uploading",
];

const FAQS: ServiceFaq[] = [
  {
    question: "Should I use WebP or AVIF?",
    answer:
      "WebP, for almost everything. AVIF files can be a little smaller, but WebP works in every browser, website builder, and free tool, so there's nothing to troubleshoot. Try AVIF for your largest photos if your platform accepts it.",
  },
  {
    question: "Will smaller photos look worse?",
    answer:
      "Not if you resize to the width the page actually shows and keep the quality around 75. Compare before and after in Squoosh: most people can't tell the difference, but they will notice a page that loads in one second instead of five.",
  },
  {
    question: "My website builder already optimizes images. Do I still need this?",
    answer:
      "It still helps. Wix and Shopify convert images to modern formats behind the scenes, but they start from whatever you upload, so a resized photo gives them a smaller file to work with. WordPress has accepted WebP and AVIF uploads since version 6.5, as long as your hosting supports them.",
  },
  {
    question: "Can I turn a photo into an SVG?",
    answer:
      "No. A photo of your team, shop, or work is too detailed to turn into drawing instructions. Use WebP for photos and save SVG for logos, icons, and simple flat graphics.",
  },
  {
    question: "What if I get stuck?",
    answer: `Ask in our free Nextdoor group. If you'd rather hand it off, the [Next.js sites I build](/extras/benefits-of-a-nextjs-website) resize and convert photos automatically, so you can upload straight from your phone.`,
  },
];

const CONTENT: ArticleContent = {
  intro: [
    "Big photos are the most common reason small business websites feel slow, especially on phones. A photo straight off your phone or camera is often 3 to 8 MB. Most customers will never notice the extra detail, but they will notice a page that takes several seconds to load on a phone signal in a parking lot. Slow pages lose visitors, and Google uses page speed as one of its signals too.",
    "This quick guide explains WebP, AVIF, and SVG in plain English, how big your images should actually be, and the free tools that shrink them in a few clicks. It takes about 35 minutes to fix the biggest images on your homepage. Download the printable PDF with a checklist, or follow along below.",
  ],
  blocks: [
    { type: "numbered", heading: "Part 1: Why image size matters", items: PART_1 },
    {
      type: "table",
      heading: "Your size targets",
      paragraphs: ["Resize to these widths before you upload, and aim for these file sizes."],
      columns: ["Image type", "Width", "Aim for"],
      rows: [
        ["Full-width banner or hero photo", "1920 px", "Under 250 KB"],
        ["Photo inside a page or blog post", "1200 px", "Under 150 KB"],
        ["Thumbnails, team photos, gallery previews", "600 px", "Under 60 KB"],
        ["Logo or icon", "As displayed (or SVG)", "Under 30 KB"],
      ],
    },
    {
      type: "table",
      heading: "Part 2: WebP vs. AVIF, in plain English",
      paragraphs: ["Both are modern image formats that look the same as a JPG to the eye but take up much less space."],
      columns: ["", "JPG", "WebP", "AVIF"],
      rows: [
        ["Typical file size", "Baseline", "About 25–35% smaller than JPG", "About 20–30% smaller than WebP"],
        ["Works in current browsers", "Everywhere", "Practically everywhere", "Nearly everywhere (Chrome, Edge, Firefox, Safari 16+)"],
        ["Website builder support", "Everywhere", "Very wide", "Growing, but not every builder accepts uploads"],
        ["Transparent backgrounds", "No", "Yes", "Yes"],
        ["Best for", "Fallback only", "**Your safe everyday choice**", "Large photos, when your site accepts it"],
      ],
      note: "Good to know: some platforms, like Wix and Shopify, already convert your images to modern formats behind the scenes. Resizing before you upload still helps, because they start from a smaller file. WordPress has accepted WebP and AVIF uploads since version 6.5, as long as your hosting supports them.",
    },
    { type: "bullets", heading: "The simple rule", items: SIMPLE_RULE },
    {
      type: "text",
      heading: "What I use",
      paragraphs: [
        "AVIF can squeeze out a little more quality at the same file size, but I use WebP for nearly everything, including this website. It works in every browser, every website builder, and every free tool, so there's nothing to troubleshoot.",
      ],
    },
    {
      type: "text",
      heading: "Part 3: SVG, the format for logos and icons",
      paragraphs: [
        "A normal photo (JPG, PNG, WebP) is like a mosaic made of thousands of tiny colored tiles. Blow it up and you start to see the tiles, so edges get blurry and blocky. An SVG is more like a set of drawing instructions: “draw a red circle here, write the word Plumbing there.” Because the browser redraws it fresh every time, it stays perfectly sharp at any size, from a tiny phone screen to a huge monitor, and the file is usually tiny.",
        "At normal size, a PNG logo and an SVG logo look the same. Zoom in and the PNG's edges go soft and fuzzy, while the SVG stays sharp, and the SVG is often the smaller file: in the PDF's example, about 4 KB compared with 33 KB for the PNG.",
      ],
    },
    { type: "bullets", heading: "Always use SVG for", items: SVG_USES },
    {
      type: "steps",
      heading: "Turning a PNG logo into an SVG (5 min)",
      items: [
        "**Best first step:** ask whoever designed your logo for the original vector file (it may be called .svg, .ai, .eps, or .pdf). That's always cleaner than converting.",
        "If you only have a PNG, [SVGcode](https://svgco.de) is free, runs in your browser, and keeps your image on your computer. Drop in a PNG and download the SVG.",
        "Or try **VectorCraft by ArtCraft** at [getartcraft.com](https://getartcraft.com), a free, open source vector app for Windows, Mac, Linux, or the web. Open your PNG, click its layer, press **Image Trace** in the tool palette at the bottom, pick one of 12 presets, then export as SVG. It's still in development.",
        "[Adobe Express](https://www.adobe.com/express) also has a free online PNG-to-SVG converter (it needs a free Adobe account).",
        "Zoom in on the new SVG to check the result. If letters look lumpy or colors are off, the original was too complex or low-resolution to trace well, and it's worth having a designer redraw it.",
      ],
      note: "These tools work best on simple logos with a few solid colors. Don't use SVG for photos: use WebP for those.",
    },
    { type: "numbered", heading: "Part 4: Free tools that do the work", items: TOOLS },
    { type: "bullets", heading: "Your progress checklist", items: CHECKLIST },
  ],
  cta: {
    heading: "Want a hand with any of this?",
    body: "If your site is still slow after a photo cleanup, I can take a look. The Next.js sites I build resize and convert photos automatically, so you never have to think about file sizes again.",
    serviceId: "website",
    button: "Get a free quote",
    link: { href: `${WEB}/website-overhaul`, label: "Website Overhaul" },
  },
  faqs: FAQS,
};

export default function FasterPhotosFasterWebsitePage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
