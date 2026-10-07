import type { ComponentType } from "react";
import {
  IconBanner,
  IconBriefcase,
  IconCanvas,
  IconCart,
  IconCode,
  IconCloud,
  IconGift,
  IconGlobe,
  IconLayers,
  IconMail,
  IconPassport,
  IconPhoto,
  IconPoster,
  IconPresentation,
  IconRefresh,
  IconSearch,
  IconShirt,
  IconSignpost,
} from "../components/icons";
import { BUSINESS_PHONE_DISPLAY, SERVICE_HOME_CITY } from "./business";
import { PASSPORT_PREP_SUMMARY } from "./data/passport-prep";
import { PASSPORT_INFANT_EXTRA, PASSPORT_PAPERWORK, PASSPORT_VISIT, cardPriceAnswer, priceAnswer, startsAt, usd } from "./data/pricing";

export type IconComponent = ComponentType<{ className?: string }>;

export type ServiceFaq = { question: string; answer: string };
export type ServiceImage = {
  src: string;
  alt: string;
  /** "contain" shows the whole image unframed — for mockups with transparent or floating edges.
   *  "expand" crops it to the frame, then shows the full image over the page on hover (needs width and height). */
  fit?: "cover" | "contain" | "expand";
  /** Wraps the image in a border in the page's accent colors — for images whose background blends into the page. */
  framed?: boolean;
  /** The image's real pixel size — required for "expand". */
  width?: number;
  height?: number;
};
export type ServiceBeforeAfter = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
};

export type ServiceLeaf = {
  slug: string;
  title: string;
  metaDescription: string;
  tagline: string;
  description: string;
  details: string;
  features: string[];
  faqs: ServiceFaq[];
  icon: IconComponent;
  /** Set once a real photo exists — omit to show the branded placeholder. */
  image?: ServiceImage;
  /** Shows an interactive before/after slider in place of `image`. */
  beforeAfter?: ServiceBeforeAfter;
};

export type ServiceAudience = "business" | "personal" | "shared";

export type ServiceCategory = {
  slug: string;
  /** Business services lead the site; personal ones live on /cards-and-photos;
   *  "shared" (signs, prints & apparel) serve both. */
  audience: ServiceAudience;
  title: string;
  metaDescription: string;
  tagline: string;
  description: string;
  details: string;
  features: string[];
  faqs: ServiceFaq[];
  icon: IconComponent;
  accent: string;
  children: ServiceLeaf[];
  /** Slugs of closely related categories, cross-linked from this category's leaf pages. */
  related?: string[];
  /** Set once a real photo exists — omit to show the branded placeholder. */
  image?: ServiceImage;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "website-design-development",
    audience: "business",
    related: ["search-ai-discovery"],
    title: "Website Design & Development",
    metaDescription:
      "Custom website design and development in Northern Illinois — from full rebuilds and online stores to small ongoing updates, designed and built end-to-end with no drag-and-drop templates, and ready for search engines and AI from day one.",
    tagline: "Custom sites, built and maintained end-to-end.",
    description:
      "Whether you need a brand-new site or your current one just needs some attention, I design and build every site myself — clean, fast, mobile-friendly, and ready for search engines and AI from launch, with real metadata and structured data baked in instead of bolted on afterward. That includes online stores on Shopify, BigCommerce, and Wix, WordPress sites, and headless CMS builds for sites and web apps. AI-assisted development gets new sites built faster than ever, and more than 20 years of hand-coding websites keeps the quality where it belongs.",
    details:
      "Not sure whether you need a full overhaul or just an update? Most of the time it's obvious once we talk through what's not working — an outdated design and structure calls for a rebuild, while content or performance issues can usually be fixed in place.",
    features: [],
    faqs: [
      {
        question: "How much does a website cost?",
        answer:
          `A starter website — a single page or up to 5 pages — is ${startsAt("website-design-development")}, including a contact form, hosting, email forwarding, and your domain for the first year. Bigger sites, online stores, overhauls, and update plans are quoted after a short conversation about what you need.`,
      },
      {
        question: "How long does a website project take?",
        answer:
          "When content, photos, and decisions are ready to go, many sites can be built and launched in about a week. If those pieces are still coming together, a full overhaul more often takes a few weeks. Smaller updates typically turn around in a few days.",
      },
      {
        question: "Do you use AI to build websites?",
        answer:
          "Yes — as a tool, not a shortcut. AI speeds up much of the routine build work, which is a big part of why projects move faster than they used to. Every design decision and line of code still goes through me, backed by more than 20 years of building sites by hand and a solid understanding of how browsers, search engines, and hosting actually work. You get the speed without the generic, template-feel result.",
      },
      {
        question: "How do I get started?",
        answer:
          "Send a message through the quote form or give me a call — I'll ask a few questions about your goals and current site, then follow up with a scope and price.",
      },
      {
        question: "Which one do I need — an overhaul or an update?",
        answer:
          "If the design and structure feel outdated or don't support what you need anymore, that's an overhaul. If the site mostly works and just needs changes, that's an update — happy to help you figure out which fits.",
      },
      {
        question: "Will my new site be ready for search engines and AI?",
        answer:
          "Yes, right out of the box. Every site launches with clean page structure, unique titles and meta descriptions, structured data (schema markup), an XML sitemap, fast load times, and a mobile-friendly layout — the same foundations Google and AI assistants rely on to understand and recommend a business. If you want to go further, the Search + AI Discovery services build on that foundation.",
      },
      {
        question: "Do you handle hosting and domains too?",
        answer:
          "Yes, I can help set up or transfer hosting and domain registration as part of either service.",
      },
      {
        question: "Can I review changes before they go live?",
        answer:
          "Yes. As an add-on, I can set up a private preview site: a second copy of your site that runs alongside the live one. It's locked behind a login and hidden from search engines and AI crawlers, so you can click through new pages and changes, share them with your team, and approve everything before it goes public. Once you sign off, the same changes are published to your live site. It's sometimes called a staging site, and it's quoted per project.",
      },
      {
        question: "Which platforms do you work with?",
        answer:
          "Custom-coded sites, WordPress, headless CMS platforms like Strapi and Prismic, and e-commerce on Shopify, BigCommerce, and Wix. I can also update most sites built on other platforms. The right choice depends on what the site needs to do and who will be updating it — I'll recommend one after we talk.",
      },
    ],
    icon: IconGlobe,
    accent: "from-sky-500 via-blue-500 to-indigo-600",
    image: {
      src: "/webp-assets/liqwid-messaging.webp",
      alt: "Example web app design: a messaging inbox with conversations, chat bubbles, and a voice message",
      fit: "contain",
    },
    children: [
      {
        slug: "website-overhaul",
        title: "Website Overhaul",
        metaDescription:
          "A full website redesign and rebuild — custom design, mobile-first, and built to load fast — from first sketch to a live site.",
        tagline: "A full redesign and rebuild, from first sketch to launch.",
        description:
          "For sites that need more than a patch job. I start from your goals and your content, design a layout custom to your brand — not a recycled template — and build it out into a fast, mobile-friendly site ready to go live.",
        details:
          "Most redesigns start with the same problem: the current site doesn't reflect the business anymore, or it was never built with a real strategy in mind. I start by figuring out what the site actually needs to do — win more calls, sell online, make a strong first impression — then design and build around that, instead of starting from a template and hoping it fits. Because AI-assisted development shortens the build itself, more of the timeline goes where it matters: getting the design, content, and details right.",
        features: [
          "Custom design, not a drag-and-drop template",
          "Mobile-first layout that holds up on any screen",
          "Fresh copy structure and page layout, not just a reskin",
          "Search- and AI-ready at launch: metadata, schema markup, and a sitemap",
          "Old page addresses redirected so existing links and rankings carry over",
          "Built on the platform that fits — custom code, WordPress, or an online store",
          "AI-assisted build for a faster launch, guided by hands-on web experience",
          "Optional private preview site that stays in place after launch for proofing future changes",
        ],
        faqs: [
          {
            question: "How much does a website overhaul cost?",
            answer:
              "Every overhaul is quoted based on page count, features like e-commerce, and content needs — you'll get a clear, itemized quote before any work starts.",
          },
          {
            question: "How long does a website overhaul take?",
            answer:
              "With content, photos, and feedback ready up front, most small sites can launch in about a week. The biggest variable is how quickly those pieces come together — projects still gathering material typically take a few weeks, and larger sites take longer.",
          },
          {
            question: "Do I need to provide the content and photos?",
            answer:
              "You can, or I can help write copy and source stock photography as part of the project. Either way, we'll nail down what's needed before design starts.",
          },
          {
            question: "Will my new site work on mobile?",
            answer:
              "Yes — every site is designed mobile-first and tested across phone, tablet, and desktop before launch.",
          },
          {
            question: "How many rounds of revisions are included?",
            answer:
              "Every project includes structured feedback rounds during design before we move to development, so changes happen before launch, not after.",
          },
          {
            question: "Will a redesign hurt my Google rankings?",
            answer:
              "Not when the move is handled properly. Before launch, I inventory every page on your current site and map each old address to its new one with permanent (301) redirects, so visitors, bookmarks, and links from other sites all land in the right place — and the ranking value those links have built up carries over to the new site. After launch, I check for broken links and fix anything that slipped through.",
          },
          {
            question: "What happens after the site launches?",
            answer:
              "You get full ownership of the site and files. If you'd like ongoing updates or maintenance afterward, that's available separately as a Website Updates engagement.",
          },
        ],
        icon: IconGlobe,
        image: {
          src: "/webp-assets/website-overhaul.webp",
          alt: "A website being rebuilt on a laptop, surrounded by its wireframe blueprint, code panels, a design system of colors, buttons, and type, and the finished responsive layout on phones and tablets",
        },
      },
      {
        slug: "e-commerce-websites",
        title: "E-Commerce Websites",
        metaDescription:
          "E-commerce website design and development on Shopify, BigCommerce, and Wix — custom storefronts, product setup, payments, and shipping, ready to sell from launch.",
        tagline: "A storefront that looks like your brand and is ready to sell.",
        description:
          "Whether you're opening your first online store or outgrowing the one you have, I design and build storefronts on Shopify, BigCommerce, and Wix — customized to your brand instead of looking like every other theme, and set up to take orders from day one.",
        details:
          "The right platform depends on what you sell and how you want to run the store day to day. Shopify is a strong all-around choice for most product businesses, BigCommerce handles larger catalogs and more complex selling well, and Wix works nicely for smaller shops that want everything in one easy-to-edit place. I'll help you choose, then handle the design, product setup, payments, shipping, and the search and AI groundwork so the store is ready to be found.",
        features: [
          "Storefronts on Shopify, BigCommerce, or Wix",
          "Custom theme design that matches your brand",
          "Product, collection, and inventory setup",
          "Payments, shipping, and tax settings configured",
          "Product pages structured for search engines and AI",
          "Migration from an existing store, with redirects in place",
        ],
        faqs: [
          {
            question: "Which e-commerce platform should I use?",
            answer:
              "It depends on your catalog, budget, and how hands-on you want to be. Shopify suits most product businesses, BigCommerce is strong for larger or more complex catalogs, and Wix is a good fit for smaller shops. I'll recommend one after hearing what you sell and how you work.",
          },
          {
            question: "How much does an online store cost?",
            answer:
              "It's quoted based on the number of products, the amount of custom design, and any integrations you need. Keep in mind the platform itself also charges a monthly subscription, which I'll walk you through before we start.",
          },
          {
            question: "Can you move my existing store to a new platform?",
            answer:
              "Yes — products, customers, and order history can usually be migrated, and every old product and page address is redirected to its new home so you don't lose search rankings or break existing links.",
          },
          {
            question: "Will I be able to manage products and orders myself?",
            answer:
              "Yes — all three platforms have straightforward dashboards for adding products, updating prices, and fulfilling orders. I'll show you around at launch so you're comfortable running the store on your own.",
          },
          {
            question: "Can you customize a store I already have?",
            answer:
              "Yes — whether it's a theme redesign, new product pages, or fixing something that isn't working, I can work within an existing Shopify, BigCommerce, or Wix store.",
          },
        ],
        icon: IconCart,
        image: {
          src: "/webp-assets/e-commerce.webp",
          alt: "An online store being built on a laptop, with its shop-grid wireframe, product cards with add-to-cart buttons, a shopping cart, payment options like Visa, PayPal, and Apple Pay, and the finished store on phones and tablets",
        },
      },
      {
        slug: "wordpress-headless-cms",
        title: "WordPress & Headless CMS",
        metaDescription:
          "Custom WordPress websites and headless CMS builds on Strapi and Prismic — easy content editing for your team, paired with fast, modern front ends and web apps.",
        tagline: "Content you can edit yourself, on a site built to last.",
        description:
          "When your team needs to publish and update content on its own, I build on a content management system. That can mean a custom WordPress site with an editor you'll recognize, or a headless CMS like Strapi or Prismic paired with a fast, modern front end for sites and web apps that need more flexibility.",
        details:
          "WordPress is still a great choice for content-heavy sites — blogs, news, resources, and service pages your team updates often — as long as it's built cleanly, with a custom theme and no pile of plugins slowing it down. For projects that outgrow a traditional site, a headless CMS keeps the easy editing experience but separates it from the front end, so the same content can power a website, a web app, or both, with the speed and flexibility of custom code.",
        features: [
          "Custom WordPress themes, not bloated page builders",
          "Editing screens set up around your actual content",
          "Headless CMS builds on Strapi or Prismic, with fast, modern front ends",
          "Web apps powered by the same content as your site",
          "Search- and AI-ready structure from launch",
        ],
        faqs: [
          {
            question: "What is a headless CMS?",
            answer:
              "It's a content management system that stores and edits your content but doesn't control how it's displayed. Your team still gets a friendly editor, while the website or app that shows the content is custom-built — which usually means faster pages and more freedom in design and features.",
          },
          {
            question: "Should I choose WordPress or a headless CMS?",
            answer:
              "WordPress is a great fit for most content-driven business sites and is familiar to a lot of teams. A headless CMS makes more sense when you need top performance, a custom web app, or the same content shown in more than one place. I'll recommend the right fit after learning how you'll use the site.",
          },
          {
            question: "Which headless CMS do you use?",
            answer:
              "Mainly Strapi and Prismic. Strapi is open source and can be self-hosted, which gives full control over your content and data. Prismic is fully hosted, with an especially easy editor for marketing teams that build pages from reusable sections. Which one fits comes down to your budget, your team, and how much control you want.",
          },
          {
            question: "Can my team update the site without calling you?",
            answer:
              "Yes — that's the whole point. Editing screens are set up around your content, and I'll walk your team through publishing and updating before launch.",
          },
          {
            question: "Can you take over or rebuild an existing WordPress site?",
            answer:
              "Yes — I can clean up and update an existing WordPress site, or rebuild it from the ground up if it's slow or hard to manage, with redirects in place so no links or rankings are lost.",
          },
          {
            question: "Can you build a web app, not just a website?",
            answer:
              "Yes — headless CMS platforms work well as the content back end for custom web apps, like member portals, resource libraries, or product catalogs. We'll scope the features together before any build starts.",
          },
        ],
        icon: IconCode,
        image: {
          src: "/webp-assets/wordpress-headless-cms.webp",
          alt: "Bright brick-walled office with a WordPress editor open on a desktop monitor and two laptops showing code and a content dashboard on a wooden worktable",
        },
      },
      {
        slug: "website-updates",
        title: "Website Updates",
        metaDescription:
          "Ongoing website updates and maintenance — content changes, new pages, security updates, and performance tune-ups for an existing site.",
        tagline: "Keep an existing site current without a full rebuild.",
        description:
          "Not every site needs to start over. If yours mostly works but is starting to show its age — outdated photos, a missing page, a sluggish load time — I can update it in place instead of rebuilding it from scratch.",
        details:
          "A full rebuild isn't always the right call. If the bones of your site are solid but it needs new photos, a new page, or just doesn't run as fast as it should, I can work directly in the existing site instead of starting over — which usually means a faster turnaround and a smaller bill. AI-assisted tooling speeds up the routine work, while a hands-on understanding of how websites fit together means changes go in cleanly without breaking what already works.",
        features: [
          "Content, copy, and photo updates",
          "New pages or sections added to an existing site",
          "Security and platform updates",
          "Speed and mobile-usability tune-ups",
          "Seasonal refreshes (holiday hours, new offers, new photos)",
          "Redirects set up whenever a page moves, so no links break",
          "Optional private preview site to approve changes before they go live",
        ],
        faqs: [
          {
            question: "How much do updates cost?",
            answer:
              "Smaller updates are often quoted as a flat fee per request; ongoing needs can be set up as a simple monthly arrangement. I'll quote based on what you need done.",
          },
          {
            question: "How long do updates take?",
            answer:
              "Most single updates — new content, a new page, a speed fix — turn around within a few days.",
          },
          {
            question: "What counts as an update versus an overhaul?",
            answer:
              "If the existing structure and design still work and you just need changes — new content, a new page, fixed bugs, speed improvements — that's an update. If the whole design and structure need to change, that's an overhaul.",
          },
          {
            question: "Can you update a site you didn't originally build?",
            answer:
              "In most cases, yes — including WordPress sites and Shopify, BigCommerce, and Wix stores. I'll take a look at the existing site and let you know upfront if anything about the platform limits what's possible.",
          },
          {
            question: "Can I request updates on an ongoing basis?",
            answer:
              "Yes — some clients send updates as needed, others set up a standing monthly arrangement for regular small changes.",
          },
          {
            question: "Will updates affect how my site shows up in search?",
            answer:
              "Updates are made carefully to protect existing rankings. If a page is renamed, moved, or removed, I set up a permanent (301) redirect so links from search results and other sites still land in the right place, and the authority those links carry isn't lost. If anything, updates tend to help — fresh content and fixed issues are good for both search rankings and AI discovery.",
          },
          {
            question: "Can I review changes before they go live?",
            answer:
              "Yes. As an add-on, I can set up a private preview site: a second copy of your site that runs alongside the live one. It's locked behind a login and hidden from search engines and AI crawlers, so you can click through new pages and changes, share them with your team, and approve everything before it goes public. Once you sign off, the same changes are published to your live site. It's sometimes called a staging site, and it's quoted per project.",
          },
        ],
        icon: IconRefresh,
        image: {
          src: "/webp-assets/website-updates.webp",
          alt: "Developer desk in a brick-walled studio with two monitors, one showing code in an editor and the other a site's content management dashboard, beside a notebook sketching how the docs and code connect",
        },
      },
      {
        slug: "website-hosting",
        title: "Website Hosting & Management",
        metaDescription:
          "Modern website hosting for small businesses on Cloudflare — fast global hosting, built-in security, version-controlled backups on GitHub, and automatic updates, often with no monthly host bill.",
        tagline: "Lower hosting costs, safer backups, and faster load times.",
        description:
          "Most small business sites are still paying monthly for hosting that a modern setup handles for free. I host sites on Cloudflare's global network, keep every version of the code safely backed up on GitHub, and publish updates automatically — no traditional web host bill required.",
        details:
          "The old model — a shared hosting plan billed every month whether or not anyone visits your site — isn't the only option anymore. Cloudflare runs one of the largest networks in the world, serving your site from data centers close to each visitor for fast load times, with security and protection against traffic spikes built in. Its free plan covers most small business sites, and it's built for commercial use. GitHub keeps a complete, dated history of every change to your site, so nothing is ever truly lost: every update is published automatically, and any change can be rolled back in minutes.",
        features: [
          "Free or near-free hosting on Cloudflare instead of a monthly host bill",
          "Fast load times from Cloudflare's global network",
          "Built-in security, HTTPS, and protection from traffic spikes",
          "Every change version-controlled on GitHub — nothing is ever lost",
          "Updates published automatically, with instant rollback if something breaks",
          "Optional private preview site, hidden from the public and search engines",
        ],
        faqs: [
          {
            question: "How much does this actually save compared to traditional hosting?",
            answer:
              "Traditional hosts often charge monthly fees whether your site gets traffic or not. Cloudflare's free plan covers most small business sites entirely, so ongoing hosting costs can drop to $0 — you'd typically only pay for the domain name itself. Larger or busier sites may need Cloudflare's low-cost paid plan, and I'll tell you upfront if yours does.",
          },
          {
            question: "Is free hosting actually reliable for a real business site?",
            answer:
              "Yes — Cloudflare's free plan runs on the same global network that much larger companies rely on, and it's meant for commercial sites. It's a different pricing model than a traditional host, not a downgrade in reliability.",
          },
          {
            question: "What is GitHub, and why does my site need it?",
            answer:
              "GitHub stores a complete history of every version of your site's code. If an update ever breaks something, I can roll back to the exact version that worked instead of rebuilding from scratch.",
          },
          {
            question: "What does Cloudflare actually do for my site?",
            answer:
              "Cloudflare hosts your site on its worldwide network, so pages load quickly for visitors anywhere. It also handles HTTPS, absorbs traffic spikes, and blocks a lot of malicious traffic before it ever reaches your site.",
          },
          {
            question: "Can this be set up for a site I already have?",
            answer:
              "In most cases, yes — existing sites can often be migrated onto this setup without a full rebuild, though the exact steps depend on how the site is currently hosted.",
          },
          {
            question: "Do I need to manage any of this myself?",
            answer:
              "No — I handle the Cloudflare and GitHub setup and can keep managing it going forward, or hand over full access if you'd rather control it yourself.",
          },
          {
            question: "Can I have a private copy of my site for testing changes?",
            answer:
              "Yes, as a quoted add-on. Alongside your live site, I can run a private preview site on the same Cloudflare and GitHub setup. It's protected by a login and kept out of search engines and AI crawlers, so only you and your team see it. Changes go there first for your approval, then publish to the live site, with every version saved on GitHub.",
          },
        ],
        icon: IconCloud,
        image: {
          src: "/webp-assets/website-hosting-management.webp",
          alt: "Two monitors on a wooden desk, one showing a Cloudflare dashboard with web traffic, DDoS protection, and performance stats, and the other a site's code repository on GitHub",
        },
      },
    ],
  },
  {
    slug: "search-ai-discovery",
    audience: "business",
    related: ["website-design-development"],
    title: "Traditional Search + AI Discovery",
    metaDescription:
      "Traditional search and AI discovery for small businesses — a free health check, a one-time optimization pass, or ongoing monthly management to get found on Google and in AI-powered answers.",
    tagline: "Get found on Google, and in the answers AI gives.",
    description:
      "A great site doesn't help if no one finds it — whether they're typing into Google or asking ChatGPT for a recommendation. I offer three ways in, depending on where you're starting from: a free look at what's holding your site back, a one-time pass to fix it, or ongoing monthly management to keep improving.",
    details:
      "Getting found isn't one thing anymore — people still search Google, but more of them now ask AI assistants for recommendations. Both reward the same fundamentals: technical fixes, clear on-page content, structured data, and local presence, and different businesses need different amounts of each. That's why this is offered in three tiers: start with a free look at where you stand, move to a one-time fix if you need a push, or go month-to-month if you want someone keeping an eye on it long-term.",
    features: [],
    faqs: [
      {
        question: "How much does it cost?",
        answer:
          "The free health check costs nothing. A one-time Search + AI Update is quoted as a flat project fee, and the Monthly Retainer is a simple month-to-month rate — I'll recommend the right tier based on where your site stands.",
      },
      {
        question: "Which service is right for me?",
        answer:
          "If you're not sure where you stand, start with the free health check. If you already know what needs fixing, jump to the one-time Update. If you want ongoing improvement and reporting, go with the Monthly Retainer.",
      },
      {
        question: "What is AI discovery?",
        answer:
          "More people now ask tools like ChatGPT, Google's AI Overviews, and Perplexity questions like “who designs business cards near me?” instead of scrolling search results. AI discovery is about making your business easy for those tools to find, understand, and recommend — clear content, structured data, and consistent business information across the web.",
      },
      {
        question: "Is AI discovery different from traditional search?",
        answer:
          "They overlap a lot. AI tools lean on the same signals search engines do — a fast, well-structured site, clear answers to real questions, accurate listings, and good reviews. The work is mostly the same fundamentals, done with both audiences in mind.",
      },
      {
        question: "What are Domain Authority and Domain Rating?",
        answer:
          "They're 1–100 scores from tools like Moz (Domain Authority), Ahrefs (Domain Rating), and Semrush (Authority Score) that estimate how strong a site's backlink profile is — how many reputable sites link to it, and how much trust those links pass along. Google doesn't use these exact scores, but they're a useful gauge of the credibility a site has earned. Part of my job is protecting that credibility, so it isn't quietly lost to broken links or a redesign without proper redirects.",
      },
      {
        question: "Do you guarantee a #1 ranking on Google, or that AI will recommend me?",
        answer:
          "No one legitimately can. Google's algorithm changes constantly, AI answers vary from question to question, and both depend on competition. What I can do is fix the things within your control — technical issues, on-page content, structured data, and local presence — then track and report on the results.",
      },
      {
        question: "How long does it take to show results?",
        answer:
          "Technical and on-page fixes can show small improvements within weeks. Meaningful movement for competitive searches typically takes a few months of consistent work.",
      },
      {
        question: "Do I need a new website for this to work?",
        answer:
          "No — an existing site can usually be improved in place. If the site has deeper technical or structural issues, I'll flag that as part of the process.",
      },
      {
        question: "Do you handle Google Business Profile and local search?",
        answer:
          "Yes — Google Business Profile setup and optimization is included in the Search + AI Update and the Monthly Retainer. Accurate local listings matter for AI answers too, since many assistants pull from them.",
      },
    ],
    icon: IconSearch,
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
    image: {
      src: "/webp-assets/search-vs-ai.webp",
      alt: "Illustration comparing traditional search results, where pages are found and ranked by relevance, with an AI conversational answer that generates a reply and shows its sources",
      fit: "contain",
    },
    children: [
      {
        slug: "search-health-check",
        title: "Free Search + AI Health Check",
        metaDescription:
          "A free, no-obligation search and AI discovery check covering technical basics, page speed, mobile-friendliness, your Google Business Profile, and how AI assistants describe your business.",
        tagline: "A free, plain-English look at what's holding your site back.",
        description:
          "No cost, no obligation. I'll take a look at your current site — and at what AI assistants say when asked about your business — and send back a short, plain-English report: what's working, what's not, and the highest-impact fixes if you decide to move forward.",
        details:
          "This isn't a sales pitch dressed up as an audit. You'll get a real look at where the site stands today and a short list of the highest-impact fixes, whether or not you decide to hire me for the next step.",
        features: [
          "Technical basics (titles, headings, metadata)",
          "Page speed and mobile-friendliness check",
          "Broken link and redirect check",
          "Google Business Profile review",
          "AI spot check: what ChatGPT and Google's AI Overviews say about you",
          "A short written report with prioritized next steps",
          "No obligation to book anything after",
        ],
        faqs: [
          {
            question: "Is the health check really free?",
            answer: "Yes — no cost and no obligation to book anything afterward.",
          },
          {
            question: "What do I get at the end?",
            answer:
              "A short written report covering technical basics, page speed, mobile-friendliness, your Google Business Profile, and how AI assistants currently describe your business, plus a prioritized list of what to fix first.",
          },
          {
            question: "How long does the health check take?",
            answer: "Most health checks are completed and sent back within a few business days.",
          },
          {
            question: "Do I have to book anything else afterward?",
            answer: "No — it's genuinely no-obligation. Plenty of people just want the information.",
          },
          {
            question: "What information do you need from me to get started?",
            answer: "Just your website URL — I'll take it from there.",
          },
          {
            question: "Is this the same as a full audit agencies charge for?",
            answer:
              "It covers the fundamentals that matter most for a small business site. It's intentionally focused and fast rather than an exhaustive enterprise-style audit.",
          },
        ],
        icon: IconSearch,
        image: {
          src: "/webp-assets/free-search-ai-health-check.webp",
          alt: "Free Search + AI Health Check: a tablet showing a Google search performance check, connected to a phone where an AI assistant analyzes the site, with a plain-English health check report marked no cost, no obligation",
          fit: "expand",
          width: 1600,
          height: 873,
        },
      },
      {
        slug: "search-ai-update",
        title: "Search + AI Update",
        metaDescription:
          "A one-time, hands-on search and AI discovery pass: on-page fixes, schema markup, question-and-answer content, internal linking, and Google Business Profile setup.",
        tagline: "A hands-on pass to fix what the health check finds.",
        description:
          "A one-time engagement where I go in and fix it myself — page titles, meta descriptions, headings, alt text, internal linking, and schema markup, plus setting up or cleaning up your Google Business Profile so both search engines and AI assistants get your business right.",
        details:
          "This is the hands-on follow-up to the health check, or a standalone service if you already know what needs fixing. I go into the site directly and make the changes — including structuring key pages so they answer the questions customers actually ask, which is what AI tools look for when choosing who to recommend — then get your Google Business Profile in shape for local search.",
        features: [
          "Page titles, meta descriptions, and headings rewritten",
          "Image alt text added across the site",
          "Internal linking cleaned up, broken links fixed, and missing redirects put in place",
          "Schema markup added where it's missing",
          "Key pages structured to answer real customer questions",
          "Google Business Profile set up or optimized",
        ],
        faqs: [
          {
            question: "How much does a Search + AI Update cost?",
            answer:
              "It's priced as a flat project fee based on site size and how much needs fixing — I'll quote it after reviewing your site.",
          },
          {
            question: "How long does it take?",
            answer: "Most sites are fully updated within one to two weeks.",
          },
          {
            question: "Do I need the free health check first?",
            answer:
              "No — if you already know what needs fixing, or you send over an existing audit, I can go straight into the update.",
          },
          {
            question: "Does this include content writing?",
            answer:
              "Light copy edits for titles, headings, meta descriptions, and question-and-answer sections are included. Larger content additions, like new pages or blog posts, are scoped separately.",
          },
          {
            question: "Will I see improvements right away?",
            answer:
              "Technical and on-page fixes lay the groundwork; meaningful movement in rankings and AI answers usually takes weeks to months to show up.",
          },
          {
            question: "Do you provide before-and-after reporting?",
            answer:
              "Yes — you'll get a summary of what was changed and why, so there's a clear record of the work.",
          },
        ],
        icon: IconSearch,
        image: {
          src: "/webp-assets/search-plus-ai-updates.webp",
          alt: "A small bakery's website on a desktop monitor with its page peeling back to reveal structured business data and schema markup underneath, with SEO optimization, AI recommendations, and a rising analytics chart around it",
        },
      },
      {
        slug: "monthly-retainer",
        title: "Monthly Retainer",
        metaDescription:
          "Ongoing monthly search and AI discovery management — continued on-page work, monthly reporting, local listings, AI visibility checks, and review-generation strategy.",
        tagline: "Ongoing work to keep climbing, month over month.",
        description: `Getting found isn't a one-time fix — it's upkeep. On a monthly retainer, I keep working the site, track what's moving in search and in AI answers, and send a straightforward report so you always know what changed and why, in ${SERVICE_HOME_CITY} and beyond.`,
        details:
          "Visibility compounds — the sites that keep climbing are usually the ones with someone consistently maintaining and improving them, not the ones that did one push and stopped. A monthly retainer keeps that going: ongoing technical upkeep, content tied to what's actually converting, regular checks on how AI assistants describe you, and a clear report every month.",
        features: [
          "Ongoing on-page optimization",
          "Monthly written report in plain English",
          "Local listing and citation upkeep",
          "Monthly check-ins on how AI assistants describe your business",
          "Review-generation strategy",
          "Content updates tied to what's actually ranking",
        ],
        faqs: [
          {
            question: "How much does the monthly retainer cost?",
            answer:
              "Priced as a flat monthly rate based on the size and needs of your site — I'll recommend a starting scope after an initial review.",
          },
          {
            question: "What's included each month?",
            answer:
              "Ongoing on-page optimization, a written report, local listing upkeep, a check on how AI assistants are describing your business, and content updates tied to your goals — the exact mix is set based on what the site needs most.",
          },
          {
            question: "Is there a minimum commitment?",
            answer: "Month-to-month, no long-term contract required.",
          },
          {
            question: "How is progress reported?",
            answer:
              "You'll get a plain-English monthly report covering what changed, what's improving, and what's next.",
          },
          {
            question: "Can I pause or cancel anytime?",
            answer: "Yes — it's month-to-month, so you can pause or stop with notice.",
          },
          {
            question: "Do you work with businesses outside Illinois?",
            answer:
              "Yes — this work can be done remotely for businesses anywhere, though local search strategy is especially effective for businesses serving a specific area.",
          },
        ],
        icon: IconSearch,
        image: {
          src: "/webp-assets/monthly-retainer.webp",
          framed: true,
          alt: "Illustration of a monthly search and AI retainer: a dashboard with a rising trend line, surrounded by search optimization, AI chat insights, and monthly report icons",
        },
      },
    ],
  },
  {
    slug: "email-marketing",
    audience: "business",
    title: "Email Marketing",
    metaDescription:
      "Email marketing for small businesses in Northern Illinois — newsletter design and sending, branded templates, Mailchimp, Constant Contact, and Klaviyo setup, and automated welcome and follow-up emails.",
    tagline: "Stay in front of customers who already know you.",
    description: `Your email list is the one marketing channel you own outright — no algorithm decides who sees it. I design, write, and send newsletters and promotions, build branded templates you can reuse, set up your email platform, and automate the welcome and follow-up emails that run on their own, for small businesses around ${SERVICE_HOME_CITY} and beyond.`,
    details:
      "Most small businesses collect email addresses and then never send anything, or send something that looks nothing like the rest of their brand. I treat email like the rest of your marketing: it matches your website, cards, and signs, says one clear thing, and gives people a reason to click. Whether you want me to handle every send or just set things up so your team can, I work in the platform you already use — or help you pick one.",
    features: [
      "Newsletter and promotion design, writing, and sending",
      "Branded email templates your team can reuse",
      "Platform setup: Mailchimp, Constant Contact, Klaviyo, or whatever you use",
      "Signup forms on your website, connected to your list",
      "List import and cleanup",
      "Automations: welcome series, follow-ups after a purchase or quote, and abandoned-cart emails for online stores",
      "Mobile-friendly design that looks right in every inbox",
      "Simple reports on opens and clicks, in plain English",
    ],
    faqs: [
      {
        question: "How much does email marketing cost?",
        answer:
          "It's quoted per project. A one-time platform setup or template is priced differently than a monthly newsletter plan. Tell me what you have and what you'd like to send, and I'll quote it.",
      },
      {
        question: "Which email platform should I use?",
        answer:
          "It depends on your business. Mailchimp is an easy all-around choice, Constant Contact is popular with local businesses and nonprofits, and Klaviyo is built for online stores, especially on Shopify. If you already have one, I'll work in it.",
      },
      {
        question: "Can you write the emails, or just design them?",
        answer:
          "Both. I can write, design, and send every email, or build templates and a plan so your team can send them on their own.",
      },
      {
        question: "What's an email automation?",
        answer:
          "An email that sends itself when something happens — a welcome series when someone joins your list, a thank-you and review request after a purchase, a follow-up after a quote, or a reminder when an online shopper leaves items in their cart. Set it up once and it keeps working.",
      },
      {
        question: "Do I need a big list to start?",
        answer:
          "No. A small list of real customers is worth more than a big list of strangers. I'll add signup forms to your website and help you grow the list from there.",
      },
      {
        question: "Can my emails match my website and print materials?",
        answer:
          "Yes — that's the point of having one person handle all of it. Your emails use the same colors, fonts, and voice as your website, cards, and signs.",
      },
    ],
    icon: IconMail,
    accent: "from-fuchsia-600 via-pink-500 to-orange-400",
    children: [],
    related: ["website-design-development", "search-ai-discovery"],
  },
  {
    slug: "greeting-cards",
    audience: "personal",
    title: "Greeting Cards",
    metaDescription:
      "Custom greeting card design — Christmas and holiday cards, plus everyday cards for birthdays, thank-yous, and every occasion in between.",
    tagline: "A card for every moment worth marking.",
    description:
      "From the biggest holiday mailer of the year to a single birthday card, every card gets the same care with layout, type, and color. Printed cards come in two 5×7 formats: folded (10×7 paper folded in half) or flat and printed on both sides.",
    details:
      "Whether it's the one mailer everyone in your family looks forward to each December or a single birthday card for someone specific, both get the same design process: real layout and color decisions, not a template with a photo dropped in.",
    features: [],
    faqs: [
      {
        question: "How much do custom cards cost?",
        answer:
          `Custom Christmas and greeting cards start at ${startsAt("greeting-cards/christmas-cards")} for design, plus printing. ${cardPriceAnswer()} Wedding invitations are quoted by the pieces in the suite.`,
      },
      {
        question: "How long does it take to design and print cards?",
        answer:
          "Simple designs can turn around in about a week; larger holiday runs need more lead time, especially in the fall.",
      },
      {
        question: "What card formats do you offer?",
        answer:
          "Two 5×7 formats for every kind of card. A folded card is printed on 10×7 paper and folded in half into a 5×7 card, with room inside for a message or more photos. A flat card is a single 5×7 card printed on both sides, with the option of rounded corners.",
      },
      {
        question: "What's the difference between Christmas Cards and Greeting Cards here?",
        answer:
          "Christmas Cards covers holiday and seasonal mailers specifically, booked heavily in the fall. Greeting Cards covers everything else — birthdays, thank-yous, invitations, and more, available year-round.",
      },
      {
        question: "Can I order cards outside the holiday season?",
        answer:
          "Yes — greeting cards for any occasion are available year-round; only Christmas card season has a hard seasonal deadline.",
      },
      {
        question: "Can I see a proof before printing?",
        answer: "Yes — every card design goes through a proof and revision round before anything goes to print.",
      },
      {
        question: "Do you offer digital-only cards, not just printed ones?",
        answer:
          "Yes — cards can be delivered as print-ready files or as digital-share versions for text or email.",
      },
    ],
    icon: IconGift,
    accent: "from-fuchsia-500 via-pink-500 to-amber-400",
    image: {
      src: "/webp-assets/greeting-card.webp",
      alt: "Folded photo greeting card with a family portrait and soft pink shapes standing on a wooden table, beside a matching chartreuse and cream envelope",
    },
    children: [
      {
        slug: "christmas-cards",
        title: "Christmas Cards",
        metaDescription:
          "Custom Christmas and holiday cards — family photo cards and corporate mailers, designed early to beat the December rush.",
        tagline: "My favorite project of the year.",
        description:
          "Custom family photo cards, corporate holiday mailers, and everything in between — designed early enough to beat the December rush. Choose a folded 5×7 card or a flat 5×7 card printed on both sides, in the finish you want: matte, glossy, or foil.",
        details:
          "Christmas cards are the single busiest thing I do every year, and the reason clients keep coming back is simple: I treat a photo card the same way I'd treat any other design project — real layout choices, real color decisions, not a template with your photo dropped in. Corporate clients get the same care for a mailer as a family does for their holiday photo.",
        features: [
          "Custom family photo cards",
          "Folded 5×7 cards (10×7 paper folded in half)",
          "Flat 5×7 cards, printed on both sides, with optional rounded corners",
          "Corporate & business holiday mailers",
          "Matte, glossy, or foil finishes",
          "Early booking gets first pick of finishes",
          "Guaranteed delivery before the holidays when booked in time",
          "Addressing & mailing to your full list, postage handled",
          "Hand-pressed wax seals, single or two-tone, or Christmas-themed",
          "Custom envelopes & liners, or Christmas-themed envelopes",
          "Personalized “From Santa” gift tags",
        ],
        faqs: [
          {
            question: "How much do Christmas cards cost?",
            answer:
              `Christmas card design starts at ${startsAt("greeting-cards/christmas-cards")}. ${cardPriceAnswer()}`,
          },
          {
            question: "How early should I book my Christmas cards?",
            answer:
              "As early in the fall as possible. Clients who book early get first pick of finishes and guaranteed delivery before the holidays.",
          },
          {
            question: "What finishes are available?",
            answer: "Matte, glossy, or foil, depending on the design and your budget.",
          },
          {
            question: "What card formats do you offer?",
            answer:
              "Two 5×7 formats. A folded card is printed on 10×7 paper and folded in half into a 5×7 card, with room for a message or photos inside. A flat card is a single 5×7 card printed on both sides — great for photo cards, with a design or message on the back — and can have rounded corners for a softer, finished look.",
          },
          {
            question: "Can you design a corporate holiday mailer, not just family cards?",
            answer:
              "Yes — corporate and business holiday mailers are just as common as family photo cards.",
          },
          {
            question: "How many photos can I include?",
            answer:
              "Most designs work well with one to three photos, though layouts can be adjusted to fit more.",
          },
          {
            question: "What if I need to reprint or add addresses later?",
            answer:
              "Reprints and small additions are usually straightforward as long as it's within the same print run window — just let me know as early as possible.",
          },
          {
            question: "Can you address and mail my Christmas cards?",
            answer:
              "Yes. Send me your mailing list and I'll address every envelope, add postage, and drop the whole batch off at the post office. Addressing and mailing are quoted per job, separately from card design.",
          },
          {
            question: "Do you offer wax seals for Christmas cards?",
            answer:
              "Yes — each seal is poured and pressed by hand, so every one is unique. Choose one color or two-tone, any color, with your initials or monogram, or a Christmas-themed stamp. Wax seals are quoted per job.",
          },
          {
            question: "Can you make personalized gift tags from Santa?",
            answer:
              "Yes — custom “From Santa” gift tags personalized with each child's name, designed to match your cards or in their own North Pole style. They're quoted per job.",
          },
        ],
        icon: IconGift,
        image: {
          src: "/webp-assets/christmas-card-red.webp",
          alt: "Folded “Happy Holidays” photo card with a smiling extended-family portrait and gold foil lettering, beside a red envelope with a swirled liner, pinecones, red satin ribbon, and wooden stars",
        },
      },
      {
        slug: "everyday-cards",
        title: "Greeting Cards",
        metaDescription:
          "Custom greeting cards for birthdays, thank-yous, invitations, announcements, and every other occasion — one-off or full sets.",
        tagline: "Not every occasion needs a holiday budget.",
        description:
          "Birthdays, thank-yous, invitations, announcements, sympathy — whether it's a single card or a full set for a shop shelf, you get the same care with layout, type, and color — printed as a folded or flat 5×7 card, or ready to share digitally.",
        details:
          "A greeting card is often the only physical, handmade-feeling thing someone gets all year — it's worth getting right even when the occasion is small. I design each one with the same layout and color care as a bigger project, whether it's a single birthday card or a full set for a shop shelf.",
        features: [
          "Birthdays, thank-yous & invitations",
          "Announcements & sympathy cards",
          "One-off designs or full sets",
          "Folded 5×7 cards (10×7 paper folded in half)",
          "Flat 5×7 cards, printed on both sides, with optional rounded corners",
          "Print-ready or digital-share formats",
          "Addressing & mailing, postage handled",
          "Hand-pressed wax seals, custom envelopes & liners",
        ],
        faqs: [
          {
            question: "How much does a custom greeting card cost?",
            answer:
              `Greeting card design starts at ${startsAt("greeting-cards/everyday-cards")}. ${cardPriceAnswer()}`,
          },
          {
            question: "How long does a card take to design?",
            answer: "Most single-card designs are ready within a few days to a week.",
          },
          {
            question: "Can I order just one card?",
            answer: "Yes — one-off designs are common, not just full sets.",
          },
          {
            question: "What card formats do you offer?",
            answer:
              "Two 5×7 formats. A folded card is printed on 10×7 paper and folded in half into a 5×7 card, with room for a message or photos inside. A flat card is a single 5×7 card printed on both sides — great for photo cards, with a design or message on the back — and can have rounded corners for a softer, finished look.",
          },
          {
            question: "Do you offer digital versions I can text or email?",
            answer: "Yes, cards can be delivered as print-ready files or in a digital-share format.",
          },
          {
            question: "Can you match an existing card style or brand?",
            answer: "Yes — if you have a brand or past card style, I can design to match it.",
          },
          {
            question: "Do you print the cards too, or just design them?",
            answer: "Both — I can hand off print-ready files or handle printing as part of the project.",
          },
          {
            question: "Can you address, seal, and mail the cards for me?",
            answer:
              "Yes. I can address your cards, add postage, and mail them, seal each envelope with a hand-pressed wax seal in any color and monogram, and design envelopes and liners to match. Extras are quoted per job.",
          },
        ],
        icon: IconGift,
        image: {
          src: "/webp-assets/greeting-card.webp",
          alt: "Folded photo greeting card with a family portrait and soft pink shapes standing on a wooden table, beside a matching chartreuse and cream envelope",
        },
      },
      {
        slug: "wedding-invitations",
        title: "Wedding Invitations & Services",
        metaDescription:
          "Wedding invitations, save-the-dates, and RSVP cards designed as a matching set, plus day-of signage, banners, and posters for the ceremony and reception.",
        tagline: "Invitations, signage, and every printed detail of the big day.",
        description:
          "Wedding invitations, save-the-dates, and RSVP cards designed as a matching set, finished with hand-pressed wax seals and addressed and mailed for you — plus the signage, banners, and posters that carry the same look through the ceremony and reception.",
        details:
          "A wedding's printed pieces are one of the first things guests see and one of the last things left over as a keepsake, so they're worth designing as a set rather than one-off pieces. I start with the invitation suite — invitations, save-the-dates, RSVP cards — then extend that same design language to welcome signs, seating charts, menus, and banners, so everything from the mailbox to the reception hall feels like one event. I can also finish the invitations by hand: wax seals poured and pressed one at a time in your colors and monogram, envelopes and liners designed to match, and every invitation addressed, stamped, and mailed to your guest list.",
        features: [
          "Invitations, save-the-dates & RSVP cards",
          "Hand-pressed wax seals in your colors & monogram",
          "Guest addressing, postage & mailing",
          "Custom envelopes & liners to match the suite",
          "Welcome signs & seating charts",
          "Ceremony & reception banners",
          "Programs, menus & table numbers",
          "Matching design across every piece",
        ],
        faqs: [
          {
            question: "How much do wedding invitations cost?",
            answer:
              "Pricing depends on the pieces included — invitations alone versus a full suite — and quantity. I'll quote based on your guest count and what you'd like designed.",
          },
          {
            question: "How far in advance should I order wedding invitations?",
            answer:
              "Ideally four to six months before the wedding, to allow time for design, printing, and mailing before save-the-date and RSVP deadlines.",
          },
          {
            question: "Can you design the full invitation suite, not just invitations?",
            answer:
              "Yes — invitations, save-the-dates, and RSVP cards are typically designed together as a matching set.",
          },
          {
            question: "Do you also design day-of signage like welcome signs and seating charts?",
            answer:
              "Yes — welcome signs, seating charts, menus, and banners can all be designed to match the invitation suite.",
          },
          {
            question: "Can I order a small addition later, like extra thank-you cards?",
            answer:
              "Yes — small additions and reprints are usually straightforward as long as it's within a reasonable window after the original order.",
          },
          {
            question: "Do you handle printing, or just design?",
            answer:
              "Both — I can design print-ready files for your printer of choice, or handle design and printing together.",
          },
          {
            question: "Can you address and mail our wedding invitations?",
            answer:
              "Yes. Send me your guest list and I'll address every invitation, add postage, and drop them off at the post office, so they all go out together. Addressing and mailing are quoted per job.",
          },
          {
            question: "Do you offer wax seals for wedding invitations?",
            answer:
              "Yes — every seal is poured and pressed by hand, so no two are exactly alike. Choose one color or two-tone with an accent color, in your wedding colors, with your initials or monogram. Wax seals are quoted per job.",
          },
        ],
        icon: IconGift,
        image: {
          src: "/webp-assets/wedding.webp",
          alt: "Wedding invitation suite on deckled paper with sage green botanical accents: invitation, RSVP card, menu, place card, and a floral-lined sage envelope, with a gold wax seal, white flowers, and silk ribbon",
        },
      },
    ],
  },
  {
    slug: "business-printing",
    audience: "business",
    title: "Business Printing",
    metaDescription:
      "Business printing services — business cards, brochures and collateral, and business documents like pitch decks, designed to look like one brand.",
    tagline: "Everything that carries your name into the room.",
    description:
      "Cards for the handshake, collateral for the counter, and documents for the boardroom — designed to look like one consistent brand.",
    details:
      "Most businesses need more than one printed piece, and the difference between things that look consistent and things that look thrown together is whether the same person designed all of it with the same brand in mind. When your cards, brochures, and presentations come from one designer, the colors, type, and tone carry through every piece, so customers recognize you no matter which one they pick up first.",
    features: [],
    faqs: [
      {
        question: "How much does business printing cost?",
        answer:
          `Business card design is ${startsAt("business-printing/business-cards")} and tri-fold brochure design is ${startsAt("business-printing/brochures-collateral")}, plus printing, which is quoted by quantity and stock. Pitch decks and other documents are quoted per project.`,
      },
      {
        question: "How long does business printing take?",
        answer:
          "Most single items turn around within a week or two; bundled projects like a card, brochure, and deck together take a bit longer to coordinate.",
      },
      {
        question: "Can I order business cards, brochures, and a deck together?",
        answer:
          "Yes — mixing and matching for one launch or rebrand is common, and keeping them consistent is easier when they're designed together.",
      },
      {
        question: "Do you handle printing, or just design?",
        answer:
          "Both — I can design print-ready files for your printer, or handle design and printing together.",
      },
      {
        question: "Can you match my existing brand?",
        answer:
          "Yes — I'll design around your existing logo, colors, and fonts, or help establish them if you're starting fresh.",
      },
      {
        question: "Do you offer rush turnaround?",
        answer:
          "Rush requests can often be accommodated depending on current workload — let me know your deadline upfront.",
      },
    ],
    icon: IconBriefcase,
    accent: "from-zinc-800 via-zinc-600 to-amber-500",
    image: {
      src: "/webp-assets/business-printing.webp",
      alt: "Matching branded print pieces on a desk: black business cards with a gold foil logo, an open tri-fold brochure, a bound quarterly performance review with charts, and a logo pen and mug",
    },
    children: [
      {
        slug: "business-cards",
        title: "Business Cards",
        metaDescription:
          "Custom business card design and printing — foil, matte, or textured stock, double-sided layouts, and QR or digital contact options.",
        tagline: "Clean, memorable layouts that hold up in a stack of a hundred.",
        description:
          "Business cards are a small canvas that still has to do a lot of work. I design layouts that stay legible and memorable at that size, then print them on the stock and finish that fits your brand.",
        details:
          "A business card gets handed over in seconds, so it has to say something fast: legible, memorable, and consistent with everything else you hand someone. I design the layout first, then help you pick a stock and finish — foil, matte, or textured — that actually fits how you'll use it.",
        features: [
          "Foil, matte, or textured stock",
          "Double-sided layouts",
          "QR & digital contact options",
          "Consistent with your other printed pieces",
        ],
        faqs: [
          {
            question: "How much do business cards cost?",
            answer:
              `${priceAnswer("business-printing/business-cards")} Printing depends on quantity and finish — foil and textured stocks cost more than standard matte — so I'll quote it once I know roughly how many you need.`,
          },
          {
            question: "What's the minimum order quantity?",
            answer:
              "This varies by finish and printer — I'll go over quantity options and pricing once we know what you're looking for.",
          },
          {
            question: "How long does printing take?",
            answer:
              "Standard turnaround is about a week from final approval; rush options may be available.",
          },
          {
            question: "Can you match my existing brand colors?",
            answer:
              "Yes, I'll match your existing logo and brand colors, or help establish them if you don't have them yet.",
          },
          {
            question: "Can I get a digital proof before printing?",
            answer: "Yes — you'll always see and approve a proof before anything goes to print.",
          },
          {
            question: "Do you offer double-sided or specialty finishes?",
            answer: "Yes — double-sided layouts, foil, matte, and textured stock are all options.",
          },
        ],
        icon: IconBriefcase,
        image: {
          src: "/webp-assets/business-card.webp",
          alt: "Black business card with a gold foil “Substratum Protocol” logo for Sarah Jenkins, Consultant, propped against a stack of cards on a wooden desk",
        },
      },
      {
        slug: "brochures-collateral",
        title: "Brochures & Collateral",
        metaDescription:
          "Tri-fold and bi-fold brochures, one-pagers, flyers, and menus — designed to be read, not just skimmed, and sized correctly for print.",
        tagline: "Built to be read, not just skimmed.",
        description:
          "Tri-folds, one-pagers, menus, and flyers — laid out so the important information actually gets read, and sized correctly for print the first time, no last-minute resizing surprises.",
        details:
          "Brochures and flyers get skimmed, not read word for word, so the layout has to guide the eye to what matters — a strong headline, clear sections, and pricing or contact info that's easy to find. I size everything correctly for print from the start, so there's no last-minute resizing surprise before it goes to press.",
        features: [
          "Tri-fold & bi-fold layouts",
          "One-pagers & flyers",
          "Menus & counter cards",
          "Print-ready files, sized correctly",
        ],
        faqs: [
          {
            question: "How much does a brochure cost?",
            answer:
              `${priceAnswer("business-printing/brochures-collateral")} Flyers, menus, and one-pagers are quoted by size, and printing by quantity.`,
          },
          {
            question: "How long does a brochure take to design and print?",
            answer:
              "Design typically takes about a week, plus printing time depending on quantity and finish.",
          },
          {
            question: "What sizes do you design for?",
            answer:
              "Standard tri-fold and bi-fold brochure sizes, one-pagers, and flyers — I'll recommend a size and fold based on how much content you have.",
          },
          {
            question: "Can you print these for me, or just design them?",
            answer:
              "Both — I can design print-ready files for your printer of choice, or handle design and printing together.",
          },
          {
            question: "Can I update the content later and reprint?",
            answer:
              "Yes — the design file is kept on hand so updates and reprints are quick and affordable.",
          },
          {
            question: "Do you write the copy, or do I provide it?",
            answer:
              "You can provide your own copy, or I can help tighten and structure it as part of the design process.",
          },
        ],
        icon: IconLayers,
        image: {
          src: "/webp-assets/brochures-and-collateral.webp",
          alt: "Open tri-fold brochure for “Substratum Protocol” on a wooden desk, with a charcoal and gold “Our Services” panel, service icons, and photos of business professionals",
        },
      },
      {
        slug: "business-documents",
        title: "Business Documents",
        metaDescription:
          "Pitch decks, business plan presentations, sales and proposal decks, and internal update decks — structured to make the point on slide one.",
        tagline: "Structured to make the point on slide one.",
        description:
          "Pitch decks, business plan presentations, sales and proposal decks, and internal update or QBR decks — I focus on structure first, so the story is clear before a single slide gets designed.",
        details:
          "A pitch deck or proposal succeeds or fails on structure, not decoration — if the story doesn't hold up on slide one, no amount of design polish saves it. I work through the structure and content flow with you first, then design around that, so the deck actually makes the case instead of just looking nice.",
        features: [
          "Pitch decks",
          "Business plan presentations",
          "Sales & proposal decks",
          "Internal update / QBR decks",
        ],
        faqs: [
          {
            question: "How much does a pitch deck or business document cost?",
            answer:
              "Pricing depends on slide count and how much content structuring is involved — I'll quote after a quick look at your goals and existing material.",
          },
          {
            question: "How long does a deck take to design?",
            answer:
              "Most decks take one to two weeks depending on length and how many revision rounds are needed.",
          },
          {
            question: "Can you help write the content, or just design around what I have?",
            answer:
              "Both — I can help structure and tighten the narrative, or just design around content you've already written.",
          },
          {
            question: "What format do I get the final deck in?",
            answer:
              "Typically a print-ready PDF and an editable source file, so you can make small updates yourself later.",
          },
          {
            question: "Can you match our existing brand guidelines?",
            answer:
              "Yes — if you have brand guidelines, I'll design within them; if not, I can help establish a consistent look for the deck.",
          },
          {
            question: "Do you design decks for investors specifically, or just internal use?",
            answer:
              "Both — pitch decks for investors and internal update or QBR decks follow the same structured approach, just tailored to the audience.",
          },
        ],
        icon: IconPresentation,
        image: {
          src: "/webp-assets/brochure.webp",
          alt: "Tri-fold “Elevate Your Reach” marketing brochure open on a desk, showing digital marketing and branding services alongside a teal, orange and navy “Grow Your Business” cover",
        },
      },
    ],
  },
  {
    slug: "signs-posters",
    audience: "shared",
    title: "Yard Signs & Posters",
    metaDescription:
      "Custom yard signs and posters for businesses and individuals — real estate and grand-opening signage, event posters, and personal celebration signs.",
    tagline: "Signage that works just as hard for a business as it does for a backyard.",
    description: `From real estate and grand-opening signs to a graduation poster for the front yard, yard signs and posters get noticed by everyone who walks or drives by — I design and print both for personal occasions and business use around ${SERVICE_HOME_CITY} and across Northern Illinois.`,
    details:
      "The line between a business sign and a personal one is thinner than it looks: a real estate agent's open-house sign and a family's “Congratulations, Graduate” yard sign use the same materials and the same design principles — clear at a glance, readable from the street, built to hold up outside. Whether it's for a storefront or a driveway, I design each piece to actually get read at a distance, not just look good up close.",
    features: [],
    faqs: [
      {
        question: "How much does a yard sign or poster cost?",
        answer:
          `Yard sign design starts at ${startsAt("signs-posters/yard-signs")} and poster design at ${startsAt("signs-posters/posters")}, plus printing, which is quoted by size, quantity, and finish.`,
      },
      {
        question: "How long does it take?",
        answer:
          "Most single signs or posters are ready within a few days; larger orders may take a bit longer.",
      },
      {
        question: "Are these for businesses, personal use, or both?",
        answer:
          "Both — real estate and business signage uses the same design and printing as a birthday or graduation yard sign. I work with individuals and businesses equally.",
      },
      {
        question: "Can these hold up outdoors?",
        answer:
          "Yes — yard signs and posters are printed on weather-resistant materials built to hold color and stay legible outside for weeks.",
      },
      {
        question: "Can I order in bulk for a business or event?",
        answer:
          "Yes — bulk pricing is available for real estate offices, businesses, and events.",
      },
      {
        question: "Do you design the artwork, or do I provide it?",
        answer: "Both — bring your own artwork, or I can design the layout from scratch.",
      },
    ],
    icon: IconSignpost,
    accent: "from-lime-500 via-green-600 to-teal-600",
    image: {
      src: "/webp-assets/yard-sign.webp",
      alt: "Real estate “Open House, Saturday 10AM–2PM” yard sign with a lime green design and realty logo, staked in a front lawn on a suburban street",
    },
    children: [
      {
        slug: "yard-signs",
        title: "Yard Signs",
        metaDescription:
          "Custom yard signs for real estate, grand openings, and personal celebrations — weather-resistant, with a stake included.",
        tagline: "Real estate, grand openings, birthdays, and everything in between.",
        description:
          "Custom yard signs for businesses and individuals — open house and real estate signage, grand openings and sales events, or a birthday, graduation, or “welcome home” sign for the front lawn.",
        details:
          "A good yard sign has one job: get read by someone driving or walking past in a few seconds. I keep the layout simple and the type large enough to actually work at that distance, then print on durable corrugated plastic that holds up through wind and rain.",
        features: [
          "Real estate & open house signs",
          "Grand opening & business promotion signs",
          "Birthday, graduation & welcome home signs",
          "Weather-resistant corrugated plastic",
          "H-stake included, ready to place in the yard",
        ],
        faqs: [
          {
            question: "How much do yard signs cost?",
            answer:
              `${priceAnswer("signs-posters/yard-signs")} Printing is quoted by size and quantity, and pricing improves for sets.`,
          },
          {
            question: "How long does it take to get a yard sign made?",
            answer:
              "Most single signs are ready within a few days; larger orders may take a little longer.",
          },
          {
            question: "What sizes are available?",
            answer:
              "Standard yard sign sizes work for most uses, with larger formats available for extra visibility from the road.",
          },
          {
            question: "Do signs come with a stake?",
            answer: "Yes — an H-stake is included and ready to push into the ground.",
          },
          {
            question: "Can I order multiple signs for a business or event?",
            answer:
              "Yes — bulk orders for real estate offices, businesses, or events are common, and pricing improves with quantity.",
          },
          {
            question: "Will the sign hold up outside in bad weather?",
            answer:
              "Yes — signs are printed on corrugated plastic built to resist rain, wind, and sun fading for weeks of outdoor use.",
          },
        ],
        icon: IconSignpost,
        image: {
          src: "/webp-assets/yard-sign.webp",
          alt: "Real estate “Open House, Saturday 10AM–2PM” yard sign with a lime green design and realty logo, staked in a front lawn on a suburban street",
        },
      },
      {
        slug: "posters",
        title: "Posters",
        metaDescription:
          "Custom posters for business promotions, events, and personal celebrations — designed to grab attention and printed to hold up on display.",
        tagline: "Event, retail, and personal posters that actually get noticed.",
        description:
          "Custom posters for business promotions, events, and personal celebrations — from a storefront sale poster to a graduation party or retirement announcement, designed to grab attention and printed to hold up wherever it's displayed.",
        details:
          "A poster has to work from across a room or down a hallway, which means the design decisions are different from a flyer or brochure: bigger type, simpler layout, and a clear focal point. I design each poster with that distance-reading in mind, then print it at a size and finish that fits where it's actually going up.",
        features: [
          "Business promotion & event posters",
          "Graduation, birthday & celebration posters",
          "Retail & storefront signage",
          "Multiple size options",
          "Glossy, matte, or adhesive",
        ],
        faqs: [
          {
            question: "How much do posters cost?",
            answer: `${priceAnswer("signs-posters/posters")} Printing is quoted by size, finish, and quantity.`,
          },
          {
            question: "How long does it take to design and print a poster?",
            answer:
              "Most posters are ready within a few days to a week, depending on design complexity.",
          },
          {
            question: "What sizes are available?",
            answer:
              "Standard poster sizes cover most needs, with larger formats available for storefronts or events.",
          },
          {
            question: "Can I get multiple copies for an event or business?",
            answer: "Yes — bulk printing is available and pricing improves with quantity.",
          },
          {
            question: "Glossy, matte, or adhesive — which should I choose?",
            answer:
              "Glossy makes colors pop and works well indoors; matte reduces glare in bright rooms and under lights; adhesive sticks straight to a wall or window with no frame or tape. I can recommend based on where it'll be displayed.",
          },
          {
            question: "Can you design the poster from scratch?",
            answer:
              "Yes — bring your own content and photos, or I can design the layout and artwork from scratch.",
          },
        ],
        icon: IconPoster,
        image: {
          src: "/webp-assets/poster.webp",
          alt: "Bold black and white “The Biggest Sale of the Year” poster in a metal frame, displayed in a storefront window facing a busy sidewalk",
        },
      },
    ],
  },
  {
    slug: "banners-canvas",
    audience: "shared",
    title: "Banners & Canvas Prints",
    metaDescription:
      "Custom banners in vinyl, matte paper, or adhesive for businesses, events, and celebrations, plus canvas prints of your photos and artwork — designed, proofed, and printed.",
    tagline: "Big prints for storefronts, events, and the walls at home.",
    description: `Banners for grand openings, sales, events, and parties, and canvas prints that turn a favorite photo or piece of artwork into something worth hanging — designed and printed for businesses and families around ${SERVICE_HOME_CITY} and across Northern Illinois.`,
    details:
      "Large prints are unforgiving: a low-resolution photo or a crowded layout that looks fine on a phone falls apart at banner or wall size. I check every file at full size, fix what can be fixed, and tell you up front if an image won't hold up — then send a proof before anything prints.",
    features: [],
    faqs: [
      {
        question: "How much do banners and canvas prints cost?",
        answer: `Banner design starts at ${startsAt("banners-canvas/banners")} and canvas design at ${startsAt("banners-canvas/canvas-prints")}, plus printing, which is quoted by size, material, and quantity.`,
      },
      {
        question: "Are these for businesses or personal use?",
        answer:
          "Both. A grand-opening banner and a graduation-party banner use the same process, and canvas prints work as well in an office lobby as in a living room.",
      },
      {
        question: "Can you use a photo from my phone?",
        answer:
          "Often, yes. I'll check the resolution at the size you want and let you know before printing whether it'll look sharp, or suggest a size that will.",
      },
      {
        question: "Do you design the artwork, or do I provide it?",
        answer: "Either one: bring finished artwork, or I can design the layout from scratch.",
      },
    ],
    icon: IconBanner,
    accent: "from-violet-600 via-purple-500 to-indigo-500",
    image: {
      src: "/webp-assets/banner.webp",
      alt: "Black and yellow “Vintage Innovations” vinyl banner with grommets, hung across a storefront above its glass doors",
    },
    children: [
      {
        slug: "banners",
        title: "Banners",
        metaDescription:
          "Custom banners in vinyl, matte paper, or adhesive for grand openings, sales, events, teams, and celebrations — designed to read from a distance.",
        tagline: "Grand openings, events, teams, and parties.",
        description:
          "Custom banners for businesses and events — grand openings, sales, trade shows, and sponsor banners, plus team, graduation, birthday, and welcome-home banners for the family.",
        details:
          "A banner gets a few seconds of attention from across a parking lot or a gym, so the design has to do its work fast: one clear message, big type, and strong contrast. I design for the distance it'll actually be read from, then print it ready to hang.",
        features: [
          "Grand opening, sale & storefront banners",
          "Event, trade show & sponsor banners",
          "Team, graduation, birthday & welcome-home banners",
          "Vinyl, matte paper, or adhesive",
          "Finished ready to hang",
        ],
        faqs: [
          {
            question: "How much does a custom banner cost?",
            answer: `${priceAnswer("banners-canvas/banners")} Printing is quoted by size, material, and quantity.`,
          },
          {
            question: "Vinyl, matte paper, or adhesive — which should I choose?",
            answer:
              "Vinyl is the tough, reusable choice for outdoors and events. Matte paper is a glare-free option for indoor displays and one-time events. Adhesive sticks straight to a wall, window, or storefront. Tell me where it's going and I'll recommend one.",
          },
          {
            question: "Can a banner be used outside?",
            answer: "Yes. Vinyl is the one to choose for outdoor use, since it holds up to wind, rain, and sun.",
          },
          {
            question: "What size banner do I need?",
            answer:
              "It depends on how far away people will be when they read it. Tell me where it's going and I'll recommend a size that's readable from there.",
          },
          {
            question: "Can I order several banners for an event or multiple locations?",
            answer: "Yes. Multiple banners or versions for an event are common, and pricing improves with quantity.",
          },
        ],
        icon: IconBanner,
        image: {
          src: "/webp-assets/banner.webp",
          alt: "Black and yellow “Vintage Innovations” vinyl banner with grommets, hung across a storefront above its glass doors",
        },
      },
      {
        slug: "canvas-prints",
        title: "Canvas Prints",
        metaDescription:
          "Custom canvas prints of family photos, restored photos, artwork, and brand imagery — checked at full size and proofed before printing.",
        tagline: "Your favorite photo, ready for the wall.",
        description:
          "Canvas prints of family photos, wedding and graduation pictures, restored heirloom photos, or artwork — and branded canvas pieces for offices, lobbies, and waiting rooms.",
        details:
          "A canvas print is a photo blown up far past the size it was taken for, so I check the image at full size first, correct color and exposure, and fix small flaws before it prints. It pairs naturally with photo restoration: bring an old family photo back, then hang it.",
        features: [
          "Family, wedding & graduation photos",
          "Restored heirloom photos",
          "Artwork & illustrations",
          "Branded wall art for offices & lobbies",
          "Color checked and proofed before printing",
        ],
        faqs: [
          {
            question: "How much does a canvas print cost?",
            answer: `${priceAnswer("banners-canvas/canvas-prints")} Printing is quoted by size once I know what you're thinking of.`,
          },
          {
            question: "Will my photo look good on canvas?",
            answer:
              "I'll check it at the size you want before printing. If it won't hold up, I'll tell you and suggest a size that will look sharp.",
          },
          {
            question: "Can you restore an old photo and print it on canvas?",
            answer:
              "Yes. Photo restoration and canvas prints go together well — repair the damage and correct the color first, then print.",
          },
          {
            question: "Do you make canvas prints for businesses?",
            answer: "Yes — branded wall art, team photos, and project photography for offices, lobbies, and waiting rooms.",
          },
        ],
        icon: IconCanvas,
        image: {
          src: "/webp-assets/canvas-print.webp",
          alt: "Close-up of a canvas print of bold abstract art, with a vivid red stripe across swirling purple, blue, and white, showing the canvas texture and wrapped edge",
        },
      },
    ],
  },
  {
    slug: "apparel",
    audience: "shared",
    title: "T-Shirts & Apparel",
    metaDescription:
      "Custom apparel design and printing under the FeedTheFlames brand — screen printing and DTG, one-off tees to bulk team orders, S through 3XL.",
    tagline: "Custom apparel, designed and printed under my own brand.",
    description:
      "One-off tees, small runs, or bulk orders for a team or event — I design the artwork and get it printed on real shirts, not just a mockup, under my own brand: FeedTheFlames.",
    details:
      "Custom apparel only looks good if the design actually translates to fabric — colors shift, small text disappears, and what works on screen doesn't always work on a shirt. Every design I create is built with printing in mind from the start, whether it's screen printing for a bulk team order or direct-to-garment for a one-off tee.",
    features: [
      "Custom apparel design from scratch or your concept",
      "Screen printing & DTG, sized S through 3XL",
      "Bulk pricing for teams, events & small businesses",
      "Ready-to-order designs on the FeedTheFlames Etsy shop",
    ],
    faqs: [
      {
        question: "How much does custom apparel cost?",
        answer:
          `${priceAnswer("apparel")} Printing depends on quantity, number of colors, and printing method — bulk orders bring the per-item cost down — so reach out with your quantity for a quote.`,
      },
      {
        question: "How long does an apparel order take?",
        answer:
          "One-off tees from the Etsy shop ship quickly; custom bulk orders typically take one to two weeks to design and print.",
      },
      {
        question: "What's the minimum order size?",
        answer:
          "One-off tees are available through the FeedTheFlames Etsy shop; bulk pricing kicks in for team and event orders — reach out with your quantity for a quote.",
      },
      { question: "What sizes are available?", answer: "S through 3XL on most styles." },
      {
        question: "Can I use my own logo or design?",
        answer: "Yes — bring your own artwork, or I can design something from scratch.",
      },
      {
        question: "What printing methods do you use?",
        answer:
          "Screen printing for bulk orders and direct-to-garment (DTG) for smaller runs or full-color designs — I'll recommend the right method for your order.",
      },
    ],
    icon: IconShirt,
    accent: "from-orange-600 via-red-600 to-amber-500",
    image: {
      src: "/webp-assets/t-shirt.webp",
      alt: "Smiling teacher at a classroom whiteboard wearing a white T-shirt with a distressed red apple graphic reading “M.Ed. — Non-Refundable, Non-Transferable”",
    },
    children: [],
  },
  {
    slug: "photos",
    audience: "personal",
    title: "Photo Services",
    metaDescription:
      "Photo scanning, restoration, and color correction — old prints, slides, and negatives digitized, damaged photos repaired, and faded colors brought back to life.",
    tagline: "Scan it, repair it, and bring the color back.",
    description:
      "Whether you have a shoebox of prints, a torn portrait of your grandparents, or photos that have faded to orange or came out dull on your phone, I can digitize them, repair the damage, and correct the color — so the memories outlast the paper they're printed on.",
    details:
      "Most old photos need more than one kind of help. Some just need to be scanned before they fade further, some are cracked, torn, or stained, and some have color that's shifted so far they barely look like the moment anymore. Pick the service that fits, or combine them — most projects start with scanning and end with a restored, color-corrected file you can back up, share, or print again.",
    features: [],
    faqs: [
      {
        question: "Which photo service do I need?",
        answer:
          "If the photos are in good shape and you just want digital copies, start with Photo-to-Digital. If they're torn, creased, scratched, or stained, you need Photo Restoration. If the image is intact but the colors look faded, yellowed, or off — including digital photos with poor color — Color Correction is the fit. Not sure? Send a quick photo of what you have and I'll recommend one.",
      },
      {
        question: "Can I combine services?",
        answer:
          "Yes — most projects do. A typical order is scanning a batch of prints, then restoring or color-correcting the ones that need it most.",
      },
      {
        question: "How much does it cost?",
        answer:
          "It depends on how many photos you have and how much work each one needs. Send a rough count, or a few sample photos, and I'll quote it.",
      },
      {
        question: "Will I get my original photos back?",
        answer:
          "Always. Originals are returned along with your digital files, whether you drop them off locally or mail them in.",
      },
    ],
    icon: IconPhoto,
    accent: "from-amber-500 via-orange-500 to-rose-500",
    image: {
      src: "/webp-assets/photo-restoration.webp",
      alt: "A cracked, faded wedding portrait in an old family album beside the same portrait restored, colorized, and framed",
    },
    children: [
      {
        slug: "photo-to-digital",
        title: "Photo-to-Digital",
        metaDescription:
          "Photo scanning and digitizing — old prints, slides, and negatives scanned into high-resolution digital files, cleaned up and organized.",
        tagline: "Old prints, slides, and negatives, made digital.",
        description:
          "Old prints, slides, and negatives scanned into high-resolution digital files you'll actually keep — and can finally back up, share, or print again.",
        details:
          "Photo prints, slides, and negatives degrade a little more every year, and once they're gone, they're gone. Scanning them now preserves them at their best. Every scan gets a basic cleanup for dust and specks, and files come back organized and labeled so you can find what you're looking for.",
        features: [
          "Prints, slides & negatives accepted",
          "High-resolution scans with basic dust cleanup",
          "Files organized and labeled",
          "Digital files delivered, ready to back up and share",
          "Local drop-off & [pickup](/service-area) across my service area, or mail-in",
        ],
        faqs: [
          {
            question: "How much does photo scanning cost?",
            answer:
              "Pricing is based on quantity and format — send a rough count of prints, slides, and negatives and I'll quote it.",
          },
          {
            question: "How long does it take?",
            answer:
              "Turnaround depends on volume, but most batches are completed within one to two weeks.",
          },
          { question: "What can you scan?", answer: "Prints, slides, and negatives of nearly any size or era." },
          {
            question: "Can you fix damaged or faded photos while you're at it?",
            answer:
              "Yes — any photo that needs more than a basic cleanup can be added to Photo Restoration or Color Correction, and I'll point out the ones that would benefit most.",
          },
          {
            question: "Do I need to drop off my photos in person?",
            answer: "Local drop-off and [pickup](/service-area) is available across my service area, or you can mail prints in and get them back along with your digital files.",
          },
          {
            question: "Will I get my original photos back?",
            answer:
              "Yes — originals are always returned along with your digital files, whether dropped off locally or mailed in.",
          },
        ],
        icon: IconPhoto,
        image: {
          src: "/webp-assets/photo-to-digital.webp",
          alt: "Stacks of bundled printed photos beside a photo scanner feeding a portrait print, with the scanned photos shown on a monitor in photo-editing software",
        },
      },
      {
        slug: "photo-restoration",
        title: "Photo Restoration",
        metaDescription:
          "Photo restoration for damaged family photos — tears, creases, scratches, stains, and missing pieces repaired by hand, with optional colorization.",
        tagline: "Torn, creased, and faded photos, repaired by hand.",
        description:
          "Cracked, torn, water-stained, or faded almost to nothing — I repair damaged photos by hand, so the people in them look like themselves again. Black-and-white photos can also be colorized.",
        details:
          "Restoration isn't a filter. Each photo is repaired carefully, one area at a time: filling in cracks and tears, removing stains and scratches, rebuilding missing corners, and bringing back detail that fading has washed out — all while keeping faces true to the original. The result is a clean, high-resolution file ready to frame, share, or print for the whole family.",
        features: [
          "Tears, creases, and cracks repaired",
          "Scratches, spots, and stains removed",
          "Missing corners and edges rebuilt",
          "Faded detail and contrast brought back",
          "Optional colorization of black-and-white photos",
          "Restored prints available, ready to frame",
        ],
        faqs: [
          {
            question: "How much does photo restoration cost?",
            answer:
              "Each photo is quoted individually based on how much damage there is. Send a phone snapshot of the photo and I'll give you a price before any work starts.",
          },
          {
            question: "How damaged is too damaged?",
            answer:
              "Less often than you'd think. Heavy cracks, stains, and even missing pieces can usually be repaired. If a face or detail is completely gone, I'll tell you upfront what's realistic.",
          },
          {
            question: "Do you use AI to restore photos?",
            answer:
              "AI tools can help with some of the groundwork, but every restoration is finished and checked by hand, so faces and details stay true to the original instead of looking artificial.",
          },
          {
            question: "Can you colorize a black-and-white photo?",
            answer:
              "Yes — colorization is available as an add-on. If you know details like eye color or the color of a dress, share them and I'll match them.",
          },
          {
            question: "Can I get a printed copy?",
            answer:
              "Yes — along with the digital file, I can print restored photos in standard frame sizes, ready to hang or give as a gift.",
          },
          {
            question: "Is my original photo safe?",
            answer:
              "Yes — originals are handled carefully, scanned once, and returned to you. All the repair work is done on the digital copy.",
          },
        ],
        icon: IconPhoto,
        beforeAfter: {
          beforeSrc: "/webp-assets/chris-curry-original.webp",
          afterSrc: "/webp-assets/chris-curry-colorized.webp",
          beforeAlt: "Original black-and-white family group photo",
          afterAlt: "The same family group photo, restored and colorized",
          caption: "Drag to compare — scanned, cleaned up, restored",
        },
      },
      {
        slug: "color-correction",
        title: "Color Correction",
        metaDescription:
          "Photo color correction for old prints and digital photos — faded, yellowed, dull, or badly lit photos corrected so skin tones, skies, and colors look natural again.",
        tagline: "Old prints and digital photos, with color that looks right again.",
        description:
          "Old prints that have turned orange, magenta, or washed-out yellow, and digital photos that came out dull, dark, or tinted by bad lighting — corrected so skin tones, skies, and colors look the way they did in person.",
        details:
          "Color film and prints shift as they age: blues fade first, leaving everything orange or pink, and contrast slowly drains away. Color correction rebalances the whole image — white balance, skin tones, exposure, and contrast — so the photo looks natural instead of dated. Digital photos get the same treatment: phone and camera shots that came out too dark, too yellow under indoor lights, washed out by flash, or tinted blue or green can be corrected so the moment looks the way you remember it.",
        features: [
          "Faded, yellowed, and color-shifted prints corrected",
          "Digital photos with dull, dark, or tinted color fixed",
          "Indoor, flash, and low-light color casts removed",
          "Natural skin tones restored",
          "Exposure, brightness, and contrast balanced",
                    "Consistent color across a whole album or batch",
        ],
        faqs: [
          {
            question: "How much does color correction cost?",
            answer:
              "It's priced based on how many photos there are and how much each one needs. Send a rough count and a sample or two and I'll quote it.",
          },
          {
            question: "What's the difference between color correction and restoration?",
            answer:
              "Color correction fixes color, exposure, and contrast across the whole image. Restoration repairs physical damage like tears, cracks, and stains. Many older photos benefit from both.",
          },
          {
            question: "Can you fix digital photos, not just old prints?",
            answer:
              "Yes — phone and camera photos are some of the most common requests. Dim indoor lighting, yellow bulbs, harsh flash, and odd blue or green casts can all be corrected. Just send the original files at full size, not screenshots or copies from social media, so there's as much detail as possible to work with.",
          },
          {
            question: "Can you make a whole album look consistent?",
            answer:
              "Yes — correcting a batch together keeps colors consistent from photo to photo, which is especially nice for albums, slideshows, and memorial displays.",
          },
          {
            question: "How long does it take?",
            answer:
              "Most batches are finished within about a week, depending on how many photos there are.",
          },
        ],
        icon: IconPhoto,
        image: {
          src: "/webp-assets/color-correction.webp",
          alt: "Before and after color correction of a family portrait: the before is dark with a heavy yellow-orange cast, and the after shows natural skin tones and true blues and whites",
        },
      },
    ],
  },
  {
    slug: "passport-photos",
    audience: "personal",
    title: "Passport Photos",
    metaDescription:
      "At-home and on-site passport photos in Northern Illinois and Southeast Wisconsin — compliant photos with unlimited retakes, same-day digital files, two printed copies mailed free, and background removal for your own photos.",
    tagline: "Compliant passport photos, taken wherever you are — by appointment.",
    description: `Skip the drugstore line. Book an appointment and I'll come to your home or business with everything needed for a passport photo that meets U.S. State Department requirements — and retake it as many times as it takes to get it right. Based in ${SERVICE_HOME_CITY}, serving families and businesses across Northern Illinois and Southeast Wisconsin.`,
    details:
      "Passport photos get rejected for small things: a shadow on the background, a head that's a little too big or too small in the frame, glare on glasses, a smile that's too wide. I check every photo against the requirements before I leave, so you know it's right. The same day, I print and cut two 2×2 copies and mail them to you, and send the digital file by email or text. Already have a good photo? I can turn it into a compliant one — background removed, sized, and cropped — and print it for you.",
    features: [
      "By appointment, at your home or business",
      "Unlimited retakes until the photo is compliant",
      "Your own photo made passport-compliant, including background removal",
      "Passport photo printing and cutting to the official 2×2 inch size",
      "Two printed & cut 2×2 copies, printed the same day",
      "Digital file sent the same day by email or text",
      "Free USPS delivery in 3–4 business days, or same-day hand delivery",
      "Extra printed pairs for just $1 each",
      "First-time or renewal-by-mail application filled out, printed, and delivered with your photos",
      "Infant and kids' photos taken at home, where they're comfortable",
    ],
    faqs: [
      {
        question: "How much do at-home passport photos cost?",
        answer: `${priceAnswer("passport-photos")} The visit includes one compliant passport photo with unlimited retakes, two printed and cut copies, and the digital file; each additional person on the same visit gets the same.`,
      },
      {
        question: "Can you take passport photos of babies and infants?",
        answer: `Yes — and doing it at home, where your baby is comfortable, makes it much easier. Infant photos are an extra ${usd(PASSPORT_INFANT_EXTRA)} each — so a home visit just for a baby's photo is ${usd(PASSPORT_VISIT + PASSPORT_INFANT_EXTRA)} — since they take more time and care to get a compliant shot: eyes open, facing the camera, against a plain background, with no hands or toys in the frame.`,
      },
      {
        question: "How do I book a passport photo appointment?",
        answer: `Passport photos are by appointment. Send a request through the quote form or call ${BUSINESS_PHONE_DISPLAY}, and we'll pick a time that works for you — at your home or business. Let me know how many people need photos and whether anyone is an infant or needs their application filled out.`,
      },
      {
        question: "What makes a passport photo compliant?",
        answer:
          "U.S. passport photos must be 2×2 inches, in color, taken within the last six months, against a plain white or off-white background, with your head sized correctly in the frame, a neutral expression or natural smile, and no glasses. I check each photo against the State Department's requirements before it's printed.",
      },
      {
        question: "What should I wear for my passport photo?",
        answer: PASSPORT_PREP_SUMMARY,
      },
      {
        question: "What if the first photo isn't right?",
        answer: "I retake it — as many times as it takes, at no extra charge, until the photo meets the requirements.",
      },
      {
        question: "Can you use a photo I already took?",
        answer:
          "Often, yes. Send me the photo and I'll remove the background, size and crop it to passport standards, and print and cut a pair for you — the printed pair is included. It's a flat price that depends on how much background removal the photo needs. If it can't be made compliant — for example, because of shadows or the wrong head angle — I'll let you know before any work is done.",
      },
      {
        question: "Do you come to businesses and offices?",
        answer:
          "Yes — I can set up at your business for one person or a whole team, which saves everyone a trip.",
      },
      {
        question: "Can you fill out my passport application?",
        answer: `Yes — for first-time applicants and for renewals by mail, it's ${usd(PASSPORT_PAPERWORK)}. I'll fill out the right form with you, print it, and send it along with your printed photos by the delivery method you choose. First-time applications (Form DS-11) have to be turned in in person at a passport acceptance facility, like many post offices: bring the form with your ID and proof of citizenship, and don't sign it ahead of time — you'll sign it in front of the acceptance agent. Renewals by mail (Form DS-82) are for most adults whose last passport is undamaged and was issued within the past 15 years when they were 16 or older: you sign the form yourself and mail it with your most recent passport, the new photo, and the fee.`,
      },
      {
        question: "Can I get more than two printed copies?",
        answer:
          "Yes. Every service includes one printed and cut pair, and each additional pair is just $1 — handy if you're applying for more than one document or want spares.",
      },
      {
        question: "When will I get my passport photos?",
        answer:
          "Your digital file is sent the same day by email, text message, or both. Your two printed and cut copies are printed off-site the same day the photos are taken and mailed right after printing — USPS delivery is free and usually takes 3–4 business days. Need them sooner? Same-day hand delivery can be arranged and is quoted separately.",
      },
    ],
    icon: IconPassport,
    accent: "from-indigo-700 via-blue-700 to-slate-800",
    image: {
      src: "/webp-assets/passport-photo.webp",
      alt: "A man in a navy shirt and tie in front of a portable white backdrop set up in a bright home kitchen, with an inset of his finished, printed 2×2 passport photos",
    },
    children: [],
    related: ["photos"],
  },
];

export const SERVICE_AUDIENCES: { id: ServiceAudience; label: string }[] = [
  { id: "business", label: "For Businesses" },
  { id: "personal", label: "Personal & Family" },
  { id: "shared", label: "Signs, Prints & Apparel" },
];

export function getCategoriesFor(audience: ServiceAudience): ServiceCategory[] {
  return SERVICE_CATEGORIES.filter((category) => category.audience === audience);
}

export function getServiceCategory(slug: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((category) => category.slug === slug);
}

export function getServiceLeaf(
  categorySlug: string,
  leafSlug: string
): { category: ServiceCategory; leaf: ServiceLeaf } | undefined {
  const category = getServiceCategory(categorySlug);
  const leaf = category?.children.find((child) => child.slug === leafSlug);
  if (!category || !leaf) return undefined;
  return { category, leaf };
}
