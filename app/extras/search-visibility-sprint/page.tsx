import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";
import type { ServiceFaq } from "../../lib/services-data";

const SLUG = "search-visibility-sprint";
const SEARCH = "/services/search-ai-discovery";

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

// The article body follows the downloadable PDF (public/downloads/Search-Visibility-Sprint.pdf),
// so the two stay in step. Plain strings, so inline "[text](/link)" links work.
const HOUR_1 = [
  {
    title: "Claim and verify Google Search Console (20 min)",
    body: "Go to [Google Search Console](https://search.google.com/search-console) and verify your domain through your domain registrar or website builder settings. Search Console is your direct line to Google: it shows which pages are indexed, which searches bring people to your site, and any technical errors stopping your pages from ranking.",
  },
  {
    title: "Submit your XML sitemap (10 min)",
    body: "Find your sitemap address, usually `yourdomain.com/sitemap.xml` or `sitemap_index.xml`, and paste it into the Sitemaps tab in Search Console. On WordPress, an SEO plugin like Rank Math or Yoast SEO creates it; Wix, Squarespace, and Shopify create one automatically. A sitemap hands Google a list of every page, so new and updated pages get found in days instead of weeks.",
  },
  {
    title: "Run a mobile and speed audit (30 min)",
    body: "Run your homepage and main service page through [PageSpeed Insights](https://pagespeed.web.dev), then make two quick fixes: compress oversized header images with a free tool like [TinyPNG](https://tinypng.com) before re-uploading them, and make your phone number and email tappable links, so phone visitors can reach you in one tap.",
  },
];

const HOUR_2 = [
  {
    title: "Claim and fully fill in your Google Business Profile (30 min)",
    body: "Sign in to [Google Business Profile](https://business.google.com) and make sure your name, address or service area, and phone number match your website footer **word for word**. Choose your primary category carefully, since it carries a lot of weight in map rankings, and fill in your hours, holiday schedule, and service attributes completely. For many local businesses, this profile is the first thing customers see on a phone, above the regular results.",
  },
  {
    title: "Write your business description (15 min)",
    body: "You get up to 750 characters. In the first two sentences, cover three things: your core offer in plain words, the towns or region you serve, and why customers should choose you. For example: “Providing custom web development and digital marketing services for small businesses across Northern Illinois and Southeast Wisconsin.”",
  },
  {
    title: "Send 3 review requests (15 min)",
    body: "Copy the review link from your Business Profile dashboard and send it to 3 recent, happy clients, asking for an honest review. Invite them to mention the service and their town, since reviews that name both can help your local map rankings. Ask everyone the same way, and never offer anything in return: Google's rules forbid incentives and asking only for 5-star reviews.",
  },
];

const HOUR_3 = [
  {
    title: "Audit your H1 headings (20 min)",
    body: "Open your top 3 pages: homepage, main service page, and About page. Each needs exactly one main heading (H1) at the top that says what you do and where. “Welcome to Our Agency” tells Google nothing; “Custom Web Design & Local SEO in Richmond, IL” tells it everything.",
  },
  {
    title: "Rewrite your meta descriptions (20 min)",
    body: "Update the search description for each core page: 140 to 155 characters with your main service, your location, and a call to action with your phone number. This is the snippet people read under your link in Google before they decide to click.",
  },
  {
    title: "Pass the AI plain-text test (20 min)",
    body: "Read the first two paragraphs of your homepage. In plain, jargon-free words, do they say **who you are**, **what you offer**, **who you help**, and **how to hire you**? If not, move those facts out of graphic banners and collapsed dropdowns and into the body text, where search engines and AI tools like ChatGPT can read them.",
  },
];

const CHECKLIST = [
  "Domain verified in Google Search Console",
  "Sitemap submitted",
  "Large images compressed, and phone numbers made tappable",
  "Business Profile name, address, and phone match the website footer",
  "Primary category set, and 750-character description added",
  "3 review requests sent to recent clients",
  "One H1 confirmed on each of your top 3 pages",
  "Meta descriptions updated with your service, town, and phone number",
  "First 2 homepage paragraphs pass the AI plain-text test",
  "Bonus: 3 long-tail FAQ questions on your main service page",
];

const FAQS: ServiceFaq[] = [
  {
    question: "Do I need any technical skills for this?",
    answer:
      "No. Every task is done in free tools with point-and-click settings, or by editing text you already have on your website. If you can update your site's text, you can do this whole plan.",
  },
  {
    question: "Does any of it cost money?",
    answer:
      "No. Google Search Console, Google Business Profile, PageSpeed Insights, and TinyPNG are all free. The only cost is about three and a half hours of your time.",
  },
  {
    question: "How soon will I see results?",
    answer:
      "Some changes show up within days, like your Business Profile updates and newly indexed pages. Rankings usually take a few weeks to move, since Google needs time to recrawl your pages. Search Console will show you the progress.",
  },
  {
    question: "What if I get stuck?",
    answer: `Ask in our free Nextdoor group, or request a [free website + search health check](${SEARCH}/search-health-check), and I'll look over your site and send you a full written report.`,
  },
];

const CONTENT: ArticleContent = {
  intro: [
    "Most small business websites aren't invisible because they're bad. They're invisible because nobody ever finished the basic setup that tells Google and AI assistants what the business does and where.",
    "This plan fixes that in one afternoon: 10 timed tasks, about three and a half hours, and every tool is free. Download the printable PDF with a checklist, or follow along below.",
  ],
  blocks: [
    {
      type: "table",
      heading: "How the afternoon breaks down",
      paragraphs: ["Three focused hours, plus an optional 30-minute bonus. Do them in order: each hour builds on the one before."],
      columns: ["", "Tasks", "Time"],
      rows: [
        ["Hour 1", "Google Search Console, sitemap, mobile and speed audit", "60 min"],
        ["Hour 2", "Google Business Profile, business description, review requests", "60 min"],
        ["Hour 3", "H1 headings, meta descriptions, AI plain-text test", "60 min"],
        ["Bonus", "A long-tail FAQ for AI search", "30 min"],
      ],
    },
    { type: "numbered", heading: "Hour 1: Technical foundation and faster indexing", items: HOUR_1 },
    { type: "numbered", heading: "Hour 2: Local search and your Google Business Profile", items: HOUR_2 },
    { type: "numbered", heading: "Hour 3: On-page fixes and the AI plain-text test", items: HOUR_3 },
    {
      type: "text",
      heading: "Bonus: A long-tail FAQ for AI search (30 min)",
      paragraphs: [
        "Near the bottom of your main service page, add three questions a ready-to-buy customer would ask, each answered directly in the first sentence. For example: “How long does it take to launch a new website?” or “Do you serve businesses in Southeast Wisconsin?”",
        "Full-sentence questions match the way people ask AI assistants, which makes your page an easy source for them to quote. Going further, [schema markup](/extras/schema-markup-json-ld-seo-ai) labels those questions so machines can't miss them.",
      ],
    },
    { type: "bullets", heading: "Your progress checklist", items: CHECKLIST },
  ],
  cta: {
    heading: "Want a second set of eyes on it?",
    body: "Send me your website address, and I'll check it by hand, from speed and lead forms to Google and AI visibility, then send you a full written report. Free, with no sales pressure.",
    serviceId: "search-ai",
    button: "Get a free health check",
    // Straight to the request form on the health check page.
    buttonHref: `${SEARCH}/search-health-check#claim`,
    link: { href: `${SEARCH}/search-health-check`, label: "Free Website + Search Health Check" },
  },
  faqs: FAQS,
};

export default function SearchVisibilitySprintPage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
