import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";
import type { ServiceFaq } from "../../lib/services-data";

const SLUG = "schema-markup-json-ld-seo-ai";
const SEARCH = "/services/search-ai-discovery";
const WEB = "/services/website-design-development";

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

// A made-up business, so the sample can be copied and edited freely.
const EXAMPLE_JSON_LD = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Example Plumbing Co.",
  "url": "https://www.exampleplumbing.com",
  "telephone": "+1-815-555-0123",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Richmond",
    "addressRegion": "IL",
    "postalCode": "60071",
    "addressCountry": "US"
  },
  "openingHours": "Mo-Fr 07:00-17:00",
  "areaServed": ["McHenry County, IL", "Lake County, IL"],
  "priceRange": "$$"
}
</script>`;

// The article body. Plain strings, so inline "[text](/link)" links work.
const SCHEMA_TYPES = [
  {
    title: "LocalBusiness (or a more specific type)",
    body: "The most important one for a local business. It states your name, address, phone number, hours, and service area. Use the most specific type that fits, like **Plumber**, **Bakery**, **Dentist**, or **AutoRepair**, so there's no doubt about what you do.",
  },
  {
    title: "Organization and WebSite",
    body: "Ties your website to your business: your official name, logo, and social profiles. It helps search engines connect your site, your Google Business Profile, and your listings elsewhere as the same company.",
  },
  {
    title: "Service and Offer",
    body: "Describes what you sell and, when you want to share it, what it costs. This gives search engines and AI assistants clear facts to work with when someone asks “how much does a website cost near me?”",
  },
  {
    title: "Product (for online stores)",
    body: "Price, availability, brand, and reviews for each product. It's what makes prices and “In stock” show up right in Google results. Most Shopify themes include it, but it's worth checking that it's complete. See [e-commerce websites](" + WEB + "/e-commerce-websites).",
  },
  {
    title: "BreadcrumbList",
    body: "Shows where a page sits on your site, like Home › Services › Website Overhaul. Google often displays that path in place of a long web address.",
  },
  {
    title: "FAQPage, Article, and Event",
    body: "Labels question-and-answer sections, blog posts and guides, and dated events. Even where Google no longer shows a special result for them, they make the content easier for machines to take apart and quote accurately.",
  },
];

const RULES = [
  "**Only mark up what's on the page.** Structured data has to match what visitors can see. Hidden claims, made-up reviews, or prices that don't match the page can get your markup ignored, or earn a manual penalty from Google.",
  "**Keep it in sync.** When your hours, phone number, or prices change, the markup has to change too. Out-of-date structured data is worse than none, because it tells search engines and AI the wrong thing with confidence.",
  "**Match your Google Business Profile.** Your name, address, and phone number should read the same in your markup, on your site, and on your Google Business Profile and other listings. Consistency is a big part of how search engines decide they can trust the details.",
  "**Use JSON-LD.** It's the format Google recommends, and it sits in its own block, separate from your design, so a redesign doesn't break it.",
  "**Don't review yourself.** Google won't show star ratings for reviews a business publishes about itself on its own site, so marking up your testimonials as star ratings won't get stars.",
  "**Test it.** Google's free [Rich Results Test](https://search.google.com/test/rich-results) shows what Google can read and which special results a page qualifies for, and the [Schema Markup Validator](https://validator.schema.org) checks everything else.",
];

const FAQS: ServiceFaq[] = [
  {
    question: "What's the difference between schema markup, structured data, and JSON-LD?",
    answer:
      "They're three names for nearly the same thing. Structured data is the general idea: information labeled so machines can read it. Schema markup means using the shared vocabulary from Schema.org, the list of labels Google, Bing, and others agreed on. JSON-LD is the format the labels are written in, and it's the one Google recommends.",
  },
  {
    question: "Is schema markup a Google ranking factor?",
    answer:
      "Not directly. Google has said that structured data on its own doesn't move a page up in the rankings. What it does is help Google understand your pages and make them eligible for richer listings, like star ratings, prices, and breadcrumbs, which tend to get more clicks. Clear understanding and more clicks both work in your favor over time.",
  },
  {
    question: "Will schema markup get my business mentioned by ChatGPT or Google's AI Overviews?",
    answer: `Nobody can promise that, and you should be wary of anyone who does. AI assistants decide what to mention question by question. What schema markup does is remove guesswork: your hours, location, services, and prices are stated plainly, so when an AI tool does draw on your site, it's working from the right facts. It's one part of [AI discovery](${SEARCH}), alongside clear content and consistent listings.`,
  },
  {
    question: "Does adding schema guarantee rich results in Google?",
    answer:
      "No. Valid markup makes a page eligible, but Google decides when to show special results, and it has cut back on some types over the years. In 2023, for example, it limited FAQ results to a small set of government and health sites and stopped showing how-to results. The markup is still worth having for what it tells search engines and AI tools.",
  },
  {
    question: "Can I add schema markup to WordPress, Shopify, or Wix?",
    answer: `Yes. On WordPress, SEO plugins like Yoast and Rank Math add the basics, Shopify themes usually include product markup, and Wix adds some automatically. Those defaults are a starting point, though. They often leave out your service area, your specific business type, or your services, and that's the part I fill in during a [Search + AI Update](${SEARCH}/search-ai-update).`,
  },
  {
    question: "How do I check whether my site already has schema markup?",
    answer: `Paste a page address into Google's [Rich Results Test](https://search.google.com/test/rich-results). It lists every type of structured data it finds and flags errors. Or ask for a [free Search + AI Health Check](${SEARCH}/search-health-check), and I'll look at it along with the rest of your site.`,
  },
];

const CONTENT: ArticleContent = {
  intro: [
    "When Google or an AI assistant like ChatGPT looks at your website, it sees what your visitors see: headings, paragraphs, and photos. It has to work out for itself which number is your phone, which text is your address, and whether “7 to 5” means your hours. Usually it guesses right. Sometimes it doesn't.",
    "Schema markup removes the guessing. It's a short, hidden label on your page that states the facts plainly: this is a plumber, here's the address, here are the hours, these are the services. Here's what it is, what it really does for search rankings and AI answers, and what your site should have.",
  ],
  blocks: [
    {
      type: "text",
      heading: "What schema markup actually is",
      paragraphs: [
        "Schema markup is a shared vocabulary, kept at Schema.org and backed by Google, Microsoft, and other search companies, for describing things on the web: businesses, products, services, events, articles, and people. When your page uses it, search engines don't have to interpret your content. They can read the facts directly.",
        "The most common way to add it is **JSON-LD**, a small block of code in the page that visitors never see. It doesn't change your design at all. It sits quietly alongside your content and tells machines what that content means.",
      ],
    },
    {
      type: "code",
      heading: "What it looks like",
      paragraphs: [
        "Here's a basic JSON-LD block for a made-up local plumber. Even without knowing any code, you can probably read it: the type of business, its name, phone number, address, hours, and where it works.",
      ],
      code: EXAMPLE_JSON_LD,
      note: "A real site usually has several of these working together: one for the business, one for each service or product, and others for breadcrumbs, articles, and questions and answers.",
    },
    {
      type: "text",
      heading: "How it affects your Google rankings",
      paragraphs: [
        "Let's be straight about this one: Google has said structured data isn't a direct ranking factor. Adding it won't jump you up the results on its own. Anyone who sells schema markup as a ranking trick is overselling it.",
        "What it does do is still worth a lot. It helps Google understand exactly what your business is and where it works, which matters when someone searches for a service “near me.” It also makes your pages eligible for **rich results**, the listings with star ratings, prices, availability, or a breadcrumb trail in place of a long web address. Those stand out on a crowded results page and tend to earn more clicks than plain blue links.",
      ],
    },
    {
      type: "text",
      heading: "How it shapes AI answers",
      paragraphs: [
        "More people now ask AI tools like ChatGPT, Google's AI Overviews, Perplexity, and Microsoft Copilot for recommendations instead of scrolling search results. Those tools lean heavily on search engines' indexes and on the pages they find there, and they need to pull out facts quickly and get them right.",
        "Schema markup hands them those facts in a form that's hard to misread. When an assistant answers “Is there a plumber open Saturday near Richmond?”, a page that states its hours and service area in structured data leaves far less room for error than one where the hours are buried in a photo or a footer. It can't force an AI to mention you. But when one does, it's much more likely to get your details right.",
        "It also helps your facts agree with each other. AI tools compare what your site says with your Google Business Profile, directories, and reviews. When all of them match, your business is easier to trust, and easier to recommend.",
      ],
    },
    { type: "numbered", heading: "The schema types most small businesses need", items: SCHEMA_TYPES },
    { type: "bullets", heading: "Rules for getting it right", items: RULES },
    {
      type: "text",
      heading: "How I handle it",
      paragraphs: [
        `Every site I build includes schema markup from launch, generated from the same information as the visible page. When a price or an answer changes on the page, the markup changes with it, so the two never drift apart. See [website design & development](${WEB}).`,
        `Already have a site? A [Search + AI Update](${SEARCH}/search-ai-update) adds what's missing and fixes what's wrong, or start with a [free Search + AI Health Check](${SEARCH}/search-health-check) to see where you stand.`,
      ],
    },
  ],
  cta: {
    heading: "Want to know what Google and AI see on your site?",
    body: "Send me your website address. I'll check your structured data along with the rest of your search basics, and reply in plain English with what's working and what to fix first.",
    serviceId: "search-ai",
    button: "Get a free health check",
    link: { href: SEARCH, label: "Search + AI Discovery" },
  },
  faqs: FAQS,
};

export default function SchemaMarkupPage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
