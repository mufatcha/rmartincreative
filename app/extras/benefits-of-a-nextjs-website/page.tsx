import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";
import type { ServiceFaq } from "../../lib/services-data";

const SLUG = "benefits-of-a-nextjs-website";
const WEB = "/services/website-design-development";

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

// The article body. Plain strings, so inline "[text](/link)" links work.
const BENEFITS = [
  {
    title: "Pages load almost instantly",
    body: "Most pages are built ahead of time, before anyone visits. When someone clicks, the finished page is already waiting, so there's no wait while a server pieces it together. Each page also loads only the code it needs, nothing extra.",
  },
  {
    title: "Photos look sharp without slowing things down",
    body: "Photos are automatically resized for each screen and converted to modern, lighter file formats. A phone gets a phone-sized photo, not a huge desktop one, and images further down the page wait to load until someone scrolls to them.",
  },
  {
    title: "Easier for Google and AI to find",
    body: "Every page arrives as complete, readable text, with its own title, description, and [structured data](/extras/schema-markup-json-ld-seo-ai) (labels that tell search engines what your business is, where it is, and what it offers). Google and AI assistants like ChatGPT can read it all right away. See [Search + AI Discovery](/services/search-ai-discovery) for how that pays off.",
  },
  {
    title: "Fewer security headaches",
    body: "A traditional WordPress site depends on plugins that need constant updates, and its login page is a favorite target for hackers' bots. On most Next.js sites I build, there are no plugins to patch and no public login page. Visitors just get ready-made pages.",
  },
  {
    title: "Low (or no) hosting bills",
    body: "Because the pages are built ahead of time, they're cheap to serve. I host sites on Cloudflare's global network, where most small business sites fit in the free plan. Read [how Cloudflare and GitHub work together](/extras/nextjs-cloudflare-github-hosting), or see [hosting & management](/services/website-design-development/website-hosting).",
  },
  {
    title: "Room to grow",
    body: "Start with a few pages. Later, add online booking, a store, a customer portal, or a full web app on the same foundation, without starting over. See what that can look like on the [Vantor demo site](/demos/vantor-ai), with streaming AI chat, live data, and instant search.",
  },
];

const WHY_SPEED = [
  "People leave slow websites. Every extra second of loading gives a visitor time to hit the back button and call someone else.",
  "Google has said page speed and the overall page experience are part of how it ranks websites. A fast site has an edge over a slow competitor.",
  "Most of your visitors are on phones, often on a cellular connection. Speed matters most there. Try the [parking lot test](/extras/modern-design-without-the-gimmicks) to see how your site holds up.",
];

const FAQS: ServiceFaq[] = [
  {
    question: "What is Next.js, in plain English?",
    answer:
      "Next.js is a free, widely used toolkit for building websites, made by the company Vercel and used by businesses from small shops to some of the biggest brands on the web. Think of it as a modern set of power tools for building a site that's fast, secure, and easy for search engines to read.",
  },
  {
    question: "Do I need to know any code to own a Next.js website?",
    answer:
      "No. You just use your website like any other. I handle the building, hosting, and updates, and you send me changes whenever you need them.",
  },
  {
    question: "Can I update my own Next.js website?",
    answer: `Yes, if you want to. A Next.js site can be paired with an easy content editor, called a headless CMS, so your team can change text, photos, and blog posts without touching code. See [WordPress & headless CMS](${WEB}/wordpress-headless-cms). If you'd rather not, I can make updates for you.`,
  },
  {
    question: "Is Next.js only for big companies?",
    answer:
      "Not at all. The same technology that runs large websites works just as well for a five-page small business site, and with free hosting, it's often cheaper to run than a traditional site.",
  },
  {
    question: "Can you move my current website to Next.js?",
    answer: `Yes. I can rebuild your current site in Next.js, keeping your content and your page addresses so you don't lose your place in Google. See [website overhauls](${WEB}/website-overhaul).`,
  },
];

const CONTENT: ArticleContent = {
  intro: [
    "Your website is often the first impression a customer gets, and these days that first look usually happens on a phone, in a hurry. Next.js is a modern way of building websites that makes them faster, safer, and easier for Google and AI to find. It's what this website is built with, too.",
    "You don't need to understand the technology to get the benefits. Here's what it means for your business, in plain English.",
  ],
  blocks: [
    { type: "numbered", heading: "What you get", items: BENEFITS },
    { type: "bullets", heading: "Why speed matters so much", items: WHY_SPEED },
    {
      type: "text",
      heading: "Is it right for every business?",
      paragraphs: [
        "For most small businesses, yes. If your team publishes new content every day and wants a familiar editor, WordPress can still be a good fit, as long as it's built cleanly without a pile of plugins. And if you sell online, a platform like Shopify might be the better starting point. I'll recommend whatever fits your business best, even if it isn't Next.js.",
      ],
    },
  ],
  cta: {
    heading: "Thinking about a new website?",
    body: "Tell me about your business and what your current site isn't doing for you. I'll reply with a plan, a price, and a timeline.",
    serviceId: "website",
    button: "Get a website quote",
    link: { href: WEB, label: "Website design & development" },
  },
  faqs: FAQS,
};

export default function NextjsBenefitsPage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
