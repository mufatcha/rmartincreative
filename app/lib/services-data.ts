import type { ComponentType } from "react";
import {
  IconBanner,
  IconBook,
  IconBriefcase,
  IconCanvas,
  IconCard,
  IconCart,
  IconCode,
  IconCloud,
  IconGift,
  IconGlobe,
  IconLayers,
  IconMail,
  IconPassport,
  IconPostcard,
  IconPhoto,
  IconPoster,
  IconPresentation,
  IconRefresh,
  IconSearch,
  IconShieldCheck,
  IconShirt,
  IconSignpost,
  IconSparkle,
} from "../components/icons";
import { BUSINESS_PHONE_DISPLAY, SERVICE_HOME_CITY } from "./business";
import { PASSPORT_PREP_SUMMARY } from "./data/passport-prep";
import { passportCommonFaqs } from "./data/passport-faqs";
import { MOBILE_APP, PASSPORT_PAPERWORK, WEB_APP, cardPriceAnswer, priceAnswer, startsAt, usd } from "./data/pricing";

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

/** A multi-page sample shown on a service page, like an example report. */
export type ServiceSample = {
  eyebrow: string;
  title: string;
  description: string;
  pages: { src: string; thumb: string; title: string; alt: string }[];
  /** The whole sample as a downloadable PDF. */
  pdf?: { href: string; fileName: string; details: string };
};

export type ServiceLeaf = {
  slug: string;
  title: string;
  /** Search title, when it should say more than the on-page title. */
  seoTitle?: string;
  metaDescription: string;
  tagline: string;
  /** Text for this service's card on its category page, when it should differ from `tagline`. */
  cardSummary?: string;
  description: string;
  details: string;
  features: string[];
  faqs: ServiceFaq[];
  icon: IconComponent;
  /** Set once a real photo exists — omit to show the branded placeholder. */
  image?: ServiceImage;
  /** Shows an interactive before/after slider in place of `image`. */
  beforeAfter?: ServiceBeforeAfter;
  /** A multi-page sample shown below the pricing box. */
  sample?: ServiceSample;
  /** A 1200×630 image for Facebook/X/LinkedIn previews; defaults to the site-wide one. */
  shareImage?: { url: string; width: number; height: number; alt: string };
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
  /** Search-result title, when it should say more than `title` (still kept within 60 characters). */
  seoTitle?: string;
  /** Named platforms and tools, shown as a "Platforms & tools" block so search engines
   *  and AI assistants connect the service with them. Items may use "[text](/path)". */
  stack?: { title: string; items: string[] }[];
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
      "Custom website design and development in Richmond, IL and Northern Illinois: Next.js, WordPress, headless CMS, and Shopify stores, ready for search and AI.",
    tagline: "Custom sites, built and maintained end-to-end.",
    description:
      "Whether you need a brand-new custom site, an online store, or an existing site that needs attention, I design and build every site myself. Every build is clean, fast, mobile-friendly, and ready for search engines and AI from launch, with real metadata and structured data (schema markup) baked in instead of bolted on afterward. As a freelance Next.js developer in the Chicago area, I build high-performance custom web applications, mobile apps for iPhone and Android with React Native, editable sites on WordPress and headless CMS platforms like Strapi and Prismic, and online stores on Shopify, BigCommerce, and Wix. More than 20 years of hand-coding websites, combined with AI-assisted development, gets new sites built faster than ever without cutting corners.",
    details:
      "Based in Richmond, IL, I'm a freelance web designer for B2B companies across Northern Illinois and a reliable local web developer for small businesses in Southeast Wisconsin. I work directly with business owners, organizations, and startups across the region, from McHenry and Gurnee to Lake Geneva and Kenosha. Local clients get face-to-face planning when it helps, and everyone gets clear communication with no agency middle managers. Not sure whether you need a full overhaul or just an update? Most of the time it's obvious once we talk through what's not working. Want to see what's possible first? Click through two demo sites I built for made-up companies: [Vantor](/demos/vantor-ai), an AI startup site with streaming chat and instant search, and [Juniper & Rye](/demos/juniper-rye), a bakery whose owner updates the menu and hours in a headless CMS.",
    features: [],
    stack: [
      {
        title: "Custom sites & web apps",
        items: ["[Next.js](/extras/benefits-of-a-nextjs-website)", "React", "Nuxt.js", "Vue", "TypeScript", "JavaScript", "Python", "SQL", "Tailwind CSS"],
      },
      { title: "Mobile apps", items: ["React Native", "Expo", "iOS", "Android"] },
      {
        title: "Content management",
        items: ["WordPress", "[Strapi](/extras/headless-cms-vs-wordpress)", "[Prismic](/extras/headless-cms-vs-wordpress)"],
      },
      { title: "Online stores", items: ["Shopify", "BigCommerce", "Wix"] },
      {
        title: "Hosting & backups",
        items: [
          "[Cloudflare](/extras/nextjs-cloudflare-github-hosting)",
          "[GitHub](/extras/nextjs-cloudflare-github-hosting)",
          "Vercel",
          "GoDaddy",
          "Bluehost",
          "HostGator",
          "SiteGround",
          "Hostinger",
          "DreamHost",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a website cost?",
        answer:
          `A starter website — a single page or up to 5 pages — is ${startsAt("website-design-development")}, including a contact form, hosting, [email forwarding](/extras/free-domain-email-gmail-cloudflare-resend), and your domain for the first year. Bigger sites, online stores, overhauls, and update plans are quoted after a short conversation about what you need.`,
      },
      {
        question: "How much does a custom web app cost?",
        answer:
          `Custom web apps start at ${usd(WEB_APP)}. That covers one type of user, a login, a database, and up to 5 screens, like a customer portal, an order or booking form with an admin view, or an internal tool. AI-assisted development keeps the build fast and affordable, with every step reviewed by an experienced developer. Bigger apps are quoted after a free consultation.`,
      },
      {
        question: "Do you build mobile apps for iPhone and Android?",
        answer:
          `Yes. Mobile apps start at ${usd(MOBILE_APP)}, built with React Native so one codebase runs on both iPhone and Android. That covers one type of user, a login, a database, push notifications, and up to 5 screens, plus submitting the app to the App Store and Google Play. Apple charges $99 a year and Google a one-time $25 for developer accounts, paid directly. Features like in-app payments, chat, or maps are quoted separately. Not sure you need the app stores? A [custom web app](#pricing) people can add to their home screen starts at ${usd(WEB_APP)}.`,
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
          `Send a message through the quote form or call ${BUSINESS_PHONE_DISPLAY}. I'll ask a few questions about your goals and current site, then follow up with a scope, timeline, and price.`,
      },
      {
        question: "Which one do I need — an overhaul or an update?",
        answer:
          "If the design and structure feel outdated or don't support what you need anymore, that's an overhaul. If the site mostly works and just needs changes, that's an update — happy to help you figure out which fits. To check your own site first, try this free [modern design check](/extras/modern-design-without-the-gimmicks).",
      },
      {
        question: "Will my new site be ready for search engines and AI?",
        answer:
          "Yes, right out of the box. Every site launches with clean page structure, unique titles and meta descriptions, structured data ([schema markup](/extras/schema-markup-json-ld-seo-ai)), an XML sitemap, fast load times, and a mobile-friendly layout — the same foundations Google and AI assistants rely on to understand and recommend a business. If you want to go further, the Search + AI Discovery services build on that foundation.",
      },
      {
        question: "Do you handle hosting and domains too?",
        answer:
          "Yes, I can help set up or transfer hosting and domain registration as part of either service. Most sites I build are hosted on Cloudflare, often for free, and backed up on GitHub. Here's [how that setup works](/extras/nextjs-cloudflare-github-hosting).",
      },
      {
        question: "Can I review changes before they go live?",
        answer:
          "Yes. As an add-on, I can set up a private preview site: a second copy of your site that runs alongside the live one. It's locked behind a login and hidden from search engines and AI crawlers, so you can click through new pages and changes, share them with your team, and approve everything before it goes public. Once you sign off, the same changes are published to your live site. It's sometimes called a staging site, and it's quoted per project.",
      },
      {
        question: "Can I see examples of what you build?",
        answer:
          "Yes. Two demo sites for made-up companies show what's possible: [Vantor](/demos/vantor-ai), an AI startup site with streaming chat, live data, and instant search built on Next.js and React, and [Juniper & Rye](/demos/juniper-rye), a bakery whose owner edits the menu, hours, and specials in a headless CMS and watches the site update live. Switch on “How it’s built” at the bottom of either one for a plain-English tour.",
      },
      {
        question: "Which platforms do you work with?",
        answer:
          "Custom-coded sites (usually built with [Next.js](/extras/benefits-of-a-nextjs-website) and React), WordPress, [headless CMS](/extras/headless-cms-vs-wordpress) platforms like Strapi and Prismic, and e-commerce on Shopify, BigCommerce, and Wix. I can also update most sites built on other platforms. The right choice depends on what the site needs to do and who will be updating it — I'll recommend one after we talk.",
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
        seoTitle: "Website Redesign Services for Small Businesses",
        metaDescription:
          "Website overhauls in Richmond, IL and Northern Illinois: a full custom redesign and rebuild, mobile-first and fast, with 301 redirects to protect rankings.",
        tagline: "A full redesign and rebuild, from first sketch to launch.",
        cardSummary:
          "As a freelance web designer, I deliver custom website redesigns for local service businesses: a complete rebuild from first sketch to launch.",
        description:
          "For established businesses whose current site no longer reflects who they are or what they sell. I start from your goals and your content, design a layout custom to your brand — not a recycled template — and build it into a fast, mobile-first site built to win calls and leads, ready for Google and AI search from launch.",
        details:
          "Most redesigns start with the same problem: the current site doesn't reflect the business anymore, or it was never built with a real strategy in mind. I start by figuring out what the site actually needs to do — win more calls, sell online, make a strong first impression — then design and build around that, instead of starting from a template and hoping it fits. Because AI-assisted development shortens the build itself, more of the timeline goes where it matters: getting the design, content, and details right. For a feel of what a rebuild can add, try two demo sites for made-up companies: [Vantor](/demos/vantor-ai) shows fast, app-like features built with Next.js, and [Juniper & Rye](/demos/juniper-rye) shows a site the owner can edit themselves. Based in Richmond, IL, I work directly with business owners across Northern Illinois and Southeast Wisconsin, with clear communication and no agency account managers in between.",
        features: [
          "Custom design, not a drag-and-drop template",
          "Mobile-first layout, tested on phones, tablets, and desktops",
          "Fresh copy structure and page layout, not just a reskin",
          "Search- and AI-ready at launch: page titles, meta descriptions, [schema markup](/extras/schema-markup-json-ld-seo-ai), and an XML sitemap",
          "Every old page address mapped with 301 redirects, so existing links and rankings carry over",
          "Built on the platform that fits — custom code with [Next.js](/extras/benefits-of-a-nextjs-website), WordPress, or an online store",
          "AI-assisted build for a faster launch, guided by hands-on web experience",
          "Optional private preview site that stays in place after launch for proofing future changes",
        ],
        faqs: [
          {
            question: "How much does a website overhaul cost?",
            answer:
              `Every overhaul is quoted as a flat rate based on page count, features like e-commerce or booking, and content needs — you'll get a clear, itemized quote before any work starts. Working with a smaller budget, or only need a few pages? A [starter website](/services/website-design-development#pricing), a single page or up to 5 pages, is ${startsAt("website-design-development")}.`,
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
              "Not when the move is handled properly. Before launch, I inventory every page on your current site and map each old address to its new one with permanent (301) redirects, so visitors, bookmarks, and links from other sites all land in the right place — and the ranking value those links have built up carries over to the new site. After launch, I check for broken links and fix anything that slipped through. To keep growing from there, [Search + AI Discovery](/services/search-ai-discovery) picks up where the build leaves off, starting with a [free health check](/services/search-ai-discovery/search-health-check).",
          },
          {
            question: "What happens after the site launches?",
            answer:
              "You get full ownership of the site and files. If you'd like ongoing updates or maintenance afterward, that's available separately as a Website Updates engagement.",
          },
          {
            question: "How do I get started?",
            answer:
              `Send a message through the quote form or call ${BUSINESS_PHONE_DISPLAY}. We'll talk through what isn't working on your current site and what the new one needs to do, then I'll follow up with a clear scope, timeline, and quote.`,
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
        seoTitle: "E-Commerce Website Design & Development",
        metaDescription:
          "E-commerce website design in Richmond, IL and Northern Illinois: custom Shopify, BigCommerce, and Wix stores with payments and shipping set up, ready to sell.",
        tagline: "A storefront that looks like your brand and is ready to sell.",
        cardSummary:
          "A storefront on Shopify, BigCommerce, or Wix that looks like your brand, with payments, shipping, and orders ready on day one.",
        description:
          "Whether you're opening your first online store or outgrowing the one you have, I design and build storefronts on Shopify, BigCommerce, and Wix — customized to your brand instead of looking like every other theme, and set up to take payments, calculate shipping, and process orders from day one.",
        details:
          "The right platform depends on what you sell and how you want to run the store day to day. Shopify is a strong all-around choice for most product businesses, BigCommerce handles larger catalogs and more complex selling well, and Wix works nicely for smaller shops that want everything in one easy-to-edit place. I'll help you choose, then handle the design, product setup, payments, shipping, and the search and AI groundwork so the store is ready to be found. Based in Richmond, IL, I work directly with product businesses across Northern Illinois and Southeast Wisconsin, with no agency account managers in between.",
        features: [
          "Storefronts on Shopify, BigCommerce, or Wix",
          "Custom theme design that matches your brand, not an off-the-shelf theme left as-is",
          "Products, collections, variants like size and color, and inventory set up",
          "Payments (like Shopify Payments, PayPal, or Stripe), shipping rates, and tax settings configured",
          "Product [schema markup](/extras/schema-markup-json-ld-seo-ai), so prices and availability show up cleanly in Google and AI answers",
          "Mobile-first shopping and checkout",
          "Migration from an existing store, with 301 redirects so rankings carry over",
          "A walkthrough on adding products, updating prices, and fulfilling orders",
          "Turn shipping addresses into new customers with [Location Smart Postcards](/services/location-smart-postcards) mailed to their neighbors",
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
              "It's quoted as a flat rate based on the number of products, the amount of custom design, and any apps or integrations you need. Keep in mind the platform itself also charges a monthly subscription, which I'll walk you through before we start.",
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
          {
            question: "How can I find more customers once the store is live?",
            answer:
              "Every order you ship has an address, and the neighbors around it are often looking for the same thing. [Location Smart Postcards](/services/location-smart-postcards) mails a postcard to the households around your customers, with a message written for your offer. For getting found online, [Search + AI Discovery](/services/search-ai-discovery) starts with a [free health check](/services/search-ai-discovery/search-health-check).",
          },
          {
            question: "How do I get started?",
            answer:
              `Send a message through the quote form or call ${BUSINESS_PHONE_DISPLAY}. We'll talk through what you sell and how you run the store, compare platforms, and then I'll follow up with a clear scope, timeline, and quote.`,
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
        seoTitle: "WordPress & Headless CMS Development",
        metaDescription:
          "Custom WordPress sites and headless CMS builds on Strapi and Prismic in Richmond, IL and Northern Illinois: easy team editing and fast Next.js front ends.",
        tagline: "Content you can edit yourself, on a site built to last.",
        cardSummary:
          "Update pages, posts, and photos yourself on a clean WordPress site or a headless CMS, with no plugin clutter and no code required.",
        description:
          "When your team needs to publish blog posts, update service pages, or add new team members on its own, I build on a content management system set up around how you work. That can mean a custom WordPress site with an editor you'll recognize, or a headless CMS like Strapi or Prismic paired with a fast, modern front end for sites and web apps that need more flexibility.",
        details:
          "WordPress is still a great choice for content-heavy sites — blogs, news, resources, and service pages your team updates often — as long as it's built cleanly, with a custom theme and no pile of plugins slowing it down. For projects that outgrow a traditional site, a headless CMS keeps the easy editing experience but separates it from the front end, so the same content can power a website, a web app, or both, with the speed and flexibility of custom code. Try it in the [Juniper & Rye demo](/demos/juniper-rye), a made-up bakery whose owner edits the menu, hours, and specials and watches the site update live, or see what a custom front end can do on the [Vantor demo site](/demos/vantor-ai). Based in Richmond, IL, I work directly with business owners, marketing teams, and organizations across Northern Illinois and Southeast Wisconsin, with no agency account managers in between.",
        features: [
          "Custom WordPress themes, not bloated page builders like Elementor or Divi",
          "Editing screens and custom fields set up around your actual content",
          "Headless CMS builds on Strapi or Prismic, with fast, modern [Next.js](/extras/benefits-of-a-nextjs-website) front ends",
          "Web apps, like member portals or resource libraries, powered by the same content as your site",
          "Search- and AI-ready at launch: page titles, meta descriptions, [schema markup](/extras/schema-markup-json-ld-seo-ai), and an XML sitemap",
          "301 redirects when moving from an old WordPress or legacy site, so rankings carry over",
          "A walkthrough for your team on editing and publishing before launch",
          "Not sure which fits? Read [Headless CMS vs. WordPress, Explained](/extras/headless-cms-vs-wordpress)",
          "Try it yourself in a [sample headless CMS editor](/demos/juniper-rye), built for a made-up bakery",
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
              "WordPress is a great fit for most content-driven business sites and is familiar to a lot of teams. A headless CMS makes more sense when you need top performance, a custom web app, or the same content shown in more than one place. I'll recommend the right fit after learning how you'll use the site. I compare the two side by side in [Headless CMS vs. WordPress, Explained](/extras/headless-cms-vs-wordpress).",
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
              "Yes — I can clean up, speed up, and update an existing WordPress site, or rebuild it from the ground up with a custom theme if it's slow or hard to manage, with permanent (301) redirects in place so no links or rankings are lost. For a full redesign, see [Website Overhaul](/services/website-design-development/website-overhaul).",
          },
          {
            question: "Can you build a web app, not just a website?",
            answer:
              `Yes — headless CMS platforms work well as the content back end for custom web apps, like member portals, resource libraries, or product catalogs. Simple web apps start at ${usd(WEB_APP)}, and we'll scope the features together before any build starts.`,
          },
          {
            question: "How do I get started?",
            answer:
              `Send a message through the quote form or call ${BUSINESS_PHONE_DISPLAY}. We'll go over how your team publishes today, compare the platform options, and then I'll follow up with a clear scope, timeline, and quote.`,
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
        seoTitle: "Website Maintenance & Update Services",
        metaDescription:
          "Ongoing website updates and maintenance — content changes, new pages, security updates, and performance tune-ups for an existing site.",
        tagline: "Keep an existing site current without a full rebuild.",
        cardSummary:
          "Fresh photos, new pages, faster load times, and fixes for what's broken, so your current site keeps working without a full rebuild.",
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
        cardSummary:
          "Fast, secure hosting on Cloudflare with every change backed up on GitHub, often with no monthly host bill.",
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
              "GitHub stores a complete history of every version of your site's code. If an update ever breaks something, I can roll back to the exact version that worked instead of rebuilding from scratch. See [how Next.js, GitHub, and Cloudflare work together](/extras/nextjs-cloudflare-github-hosting).",
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
    title: "Search + AI Discovery",
    seoTitle: "SEO & AI Search Optimization for Small Businesses",
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
          `The health check is free. A one-time Search + AI Update starts at ${startsAt("search-ai-discovery/search-ai-update")} as a flat project fee, and the Monthly Retainer starts at ${startsAt("search-ai-discovery/monthly-retainer")} a month, month-to-month. I'll recommend the right tier based on where your site stands.`,
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
        title: "Free Website + Search Health Check",
        seoTitle: "Free Website & SEO Health Check for Small Businesses",
        metaDescription:
          "A free website and search health check: speed, mobile layout, security, forms, hosting, and how you show up on Google and in AI answers, in plain English.",
        tagline: "Find out what's wrong with your site before your customers do.",
        description:
          "No cost, no obligation. In this manual website audit and technical SEO checkup, I'll look over your website the way a customer, a developer, and a search engine would — speed, mobile layout, security, broken links and forms, hosting, backups, and how you show up on Google and in AI answers like ChatGPT — and send back a full, plain-English report on what's working, what's at risk, and what to fix first.",
        details:
          "Most website problems are invisible to the owner: a contact form that quietly stopped sending, an expired security certificate, plugins two years out of date, or hosting that costs three times what it should. The health check finds those before they cost you customers, and checks whether Google and AI assistants describe your business correctly, and tells you honestly whether your site needs a few updates or a full overhaul.",
        features: [
          "Page speed and Core Web Vitals",
          "Mobile layout on phones and tablets",
          "Security: certificate, software, and plugin updates",
          "Broken links, images, and contact forms",
          "Hosting, domain, and email setup, including what you pay",
          "Backups: whether they exist and can be restored",
          "Page titles, headings, and metadata",
          "Schema markup (JSON-LD) and structured data",
          "Google Business Profile review",
          "AI spot check: what ChatGPT and Google's AI Overviews say about you",
          "A full written report with every suggested fix explained",
          "No obligation to book anything after",
        ],
        faqs: [
          {
            question: "Is the health check really free?",
            answer:
              "Yes, completely. There's nothing to buy, book, or sign up for, and no pushy sales calls or follow-up pressure afterward. You get the full report with all suggested edits, changes, and explanations. What you do with it is entirely up to you.",
          },
          {
            question: "What do I get at the end?",
            answer:
              "A full written report in plain English: what's working, what's at risk, and every suggested fix explained in priority order, with a recommendation on whether [website updates](/services/website-design-development/website-updates) or a [full overhaul](/services/website-design-development/website-overhaul) makes more sense.",
          },
          {
            question: "What do you need from me to get started?",
            answer: "Just your website address. I'll take it from there.",
          },
          {
            question: "Do you need my passwords or admin access?",
            answer:
              "No. Everything is checked from the outside, the way a visitor, search engine, or AI assistant sees your site. If you'd like a deeper look at hosting or backups later, we can talk about access then.",
          },
          {
            question: "What platforms do you check?",
            answer:
              "Any of them: WordPress, Wix, Squarespace, Shopify, GoDaddy and other site builders, or a custom-built site. Just send your website address.",
          },
          {
            question: "How long does it take?",
            answer: "Most health checks are completed and sent back within a few business days.",
          },
        ],
        sample: {
          eyebrow: "Example report",
          title: "See a real health check report",
          pdf: {
            href: "/downloads/sample-website-health-check-report.pdf",
            fileName: "Sample-Website-Health-Check-Report.pdf",
            details: "PDF · 18 pages · 3.7 MB",
          },
          description:
            "This is a real report from a local business's website, with their details blurred. Click any page to read it full size. Yours covers the same ground for your site: what's working, what's costing you customers, every suggested fix explained, and a step-by-step plan.",
          pages: [
          {
            src: "/webp-assets/website-report-example/page-01.webp",
            thumb: "/webp-assets/website-report-example/page-01-thumb.webp",
            title: "Cover: the goal and the site today",
            alt: "Example website review, page 1: the cover, with the goal and the site today",
          },
          {
            src: "/webp-assets/website-report-example/page-02.webp",
            thumb: "/webp-assets/website-report-example/page-02-thumb.webp",
            title: "What this plan covers",
            alt: "Example website review, page 2: what this plan covers",
          },
          {
            src: "/webp-assets/website-report-example/page-03.webp",
            thumb: "/webp-assets/website-report-example/page-03-thumb.webp",
            title: "The biggest issue: built for desktop",
            alt: "Example website review, page 3: the biggest issue: built for desktop",
          },
          {
            src: "/webp-assets/website-report-example/page-04.webp",
            thumb: "/webp-assets/website-report-example/page-04-thumb.webp",
            title: "The full checkup",
            alt: "Example website review, page 4: the full checkup",
          },
          {
            src: "/webp-assets/website-report-example/page-05.webp",
            thumb: "/webp-assets/website-report-example/page-05-thumb.webp",
            title: "Four errors to fix first",
            alt: "Example website review, page 5: four errors to fix first",
          },
          {
            src: "/webp-assets/website-report-example/page-06.webp",
            thumb: "/webp-assets/website-report-example/page-06-thumb.webp",
            title: "What each key page should say",
            alt: "Example website review, page 6: what each key page should say",
          },
          {
            src: "/webp-assets/website-report-example/page-07.webp",
            thumb: "/webp-assets/website-report-example/page-07-thumb.webp",
            title: "Hundreds of near-copy pages",
            alt: "Example website review, page 7: hundreds of near-copy pages",
          },
          {
            src: "/webp-assets/website-report-example/page-08.webp",
            thumb: "/webp-assets/website-report-example/page-08-thumb.webp",
            title: "Real pages for nearby towns",
            alt: "Example website review, page 8: real pages for nearby towns",
          },
          {
            src: "/webp-assets/website-report-example/page-09.webp",
            thumb: "/webp-assets/website-report-example/page-09-thumb.webp",
            title: "How Google and AI decide who to trust (AI discovery foundations)",
            alt: "Example website review, page 9: how Google and AI decide who to trust, the foundations of AI discovery",
          },
          {
            src: "/webp-assets/website-report-example/page-10.webp",
            thumb: "/webp-assets/website-report-example/page-10-thumb.webp",
            title: "Adding questions and answers",
            alt: "Example website review, page 10: adding questions and answers",
          },
          {
            src: "/webp-assets/website-report-example/page-11.webp",
            thumb: "/webp-assets/website-report-example/page-11-thumb.webp",
            title: "Titles, headings, and descriptions",
            alt: "Example website review, page 11: titles, headings, and descriptions",
          },
          {
            src: "/webp-assets/website-report-example/page-12.webp",
            thumb: "/webp-assets/website-report-example/page-12-thumb.webp",
            title: "Missing pages to add",
            alt: "Example website review, page 12: missing pages to add",
          },
          {
            src: "/webp-assets/website-report-example/page-13.webp",
            thumb: "/webp-assets/website-report-example/page-13-thumb.webp",
            title: "Fixing indexation and structured data to match the page",
            alt: "Example website review, page 13: fixing indexation and structured data to match the page",
          },
          {
            src: "/webp-assets/website-report-example/page-14.webp",
            thumb: "/webp-assets/website-report-example/page-14-thumb.webp",
            title: "Extra features Google can show",
            alt: "Example website review, page 14: extra features google can show",
          },
          {
            src: "/webp-assets/website-report-example/page-15.webp",
            thumb: "/webp-assets/website-report-example/page-15-thumb.webp",
            title: "Editing today's site vs. building new",
            alt: "Example website review, page 15: editing today's site vs. building new",
          },
          {
            src: "/webp-assets/website-report-example/page-16.webp",
            thumb: "/webp-assets/website-report-example/page-16-thumb.webp",
            title: "Time estimate and upkeep",
            alt: "Example website review, page 16: time estimate and upkeep",
          },
          {
            src: "/webp-assets/website-report-example/page-17.webp",
            thumb: "/webp-assets/website-report-example/page-17-thumb.webp",
            title: "Adding a new phone model, start to finish",
            alt: "Example website review, page 17: adding a new phone model, start to finish",
          },
          {
            src: "/webp-assets/website-report-example/page-18.webp",
            thumb: "/webp-assets/website-report-example/page-18-thumb.webp",
            title: "The step-by-step plan",
            alt: "Example website review, page 18: the step-by-step plan",
          },
          ],
        },
        shareImage: {
          url: "/social-media-posts/free-website-search-health-check.jpg",
          width: 1200,
          height: 630,
          alt: "Free Website + Search Health Check: Is your website quietly losing you customers? A hand-checked review of speed, security, lead forms, and Google and AI visibility, with pages from a sample report. No cost, no sales pressure.",
        },
        icon: IconShieldCheck,
        image: {
          src: "/webp-assets/free-website-health-check-report.webp",
          alt: "Sample website review and plan, with client details blurred: a headline about a website that works on customers' phones and gets found in search, beside panels showing the site on a phone today and in Google today",
        },
      },
      {
        slug: "search-ai-update",
        title: "Search + AI Update",
        seoTitle: "One-Time SEO & AI Search Optimization",
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
              `It starts at ${startsAt("search-ai-discovery/search-ai-update")}, as a flat project fee based on site size and how much needs fixing. I'll give you the exact price after reviewing your site.`,
          },
          {
            question: "How long does it take?",
            answer: "Most sites are fully updated within one to two weeks.",
          },
          {
            question: "Do I need the free health check first?",
            answer:
              "Every update starts with my own [free health check](/services/search-ai-discovery/search-health-check), even if you already have an audit or a list of fixes. Send those over too: they're a helpful head start. A fresh, hands-on review just makes sure nothing gets missed, and that the update covers everything holding your site back, not only what someone happened to flag.",
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
        seoTitle: "Monthly SEO & AI Search Services, Month-to-Month",
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
              `It starts at ${startsAt("search-ai-discovery/monthly-retainer")} a month, as a flat monthly rate based on the size and needs of your site. I'll recommend a starting scope after an initial review.`,
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
    seoTitle: "Email Marketing & Newsletter Design for Small Business",
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
          `Platform setup or a custom email template starts at ${startsAt("email-marketing")}. Monthly newsletter plans are quoted by how often you send and how much content each email needs. Tell me what you have and what you'd like to send, and I'll quote it.`,
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
    image: {
      src: "/webp-assets/email-marketing.webp",
      alt: "A branded \"Stay in touch!\" newsletter for a local Richmond shop being built in Mailchimp's campaign editor, with a store photo and a Visit Our Shop button",
    },
    children: [],
    related: ["website-design-development", "search-ai-discovery"],
  },
  {
    slug: "location-smart-postcards",
    audience: "business",
    title: "Location Smart Postcards",
    seoTitle: "Location Smart Postcards: Big-Data Neighbor Mailings",
    metaDescription:
      "Neighbor postcard mailings for home services, auto, and real estate anywhere in the U.S.: targeted postcards to customers' neighbors, on soft-touch stock.",
    tagline: "Neighbor postcard mailings, fueled by big data.",
    description: `People pay attention to what's happening on their own street. When you sell a car, install solar panels, or finish a new roof, I send a postcard to the neighbors around that address, with a message written for your business and your offer — for a solar installer, "Your neighbor on Oak Street just went solar. Isn't it time you did too?" Design, targeted list, soft-touch printing, and mailing, handled start to finish — from ${SERVICE_HOME_CITY}, Illinois, for businesses anywhere in the United States.`,
    details:
      "It's the oldest marketing there is — keeping up with the Joneses — aimed precisely. Starting from your customer's address, I use neighborhood data and aerial map views to pick the households most likely to care: the same kind of home, the same street, the same need. Then the postcard does the rest: printed on a soft-feel stock that people notice the moment they pull it from the mailbox, with one clear offer and a reason to act now.",
    features: [
      "Postcards mailed to the neighbors of your recent customers",
      "Fueled by big data: lists built from neighborhood data and aerial map views",
      "Skips homes that already have what you sell, like a pool, solar panels, or a new deck",
      "A custom message and design for every business and every offer",
      "Soft-touch stock that stands out in the mailbox",
      "Printing, postage, and mailing packaged together",
      "Neighbor messages kept anonymous, or named only with your customer's written permission",
      "Built for home services, auto sales and repair, real estate, and insurance",
      "Available anywhere in the United States",
    ],
    faqs: [
      {
        question: "What is neighbor postcard marketing?",
        answer:
          "It's direct mail sent to the households around one of your recent customers. When someone on the street just bought a new car, added solar, or got a new roof, their neighbors are far more likely to consider the same thing — the postcard puts your offer in front of them at exactly that moment.",
      },
      {
        question: "Which businesses is this for?",
        answer:
          "Any business whose work neighbors can see or hear about. Home services: renovations, deck builders, roofing and siding, window replacement, window cleaning, painters, handymen, HVAC, plumbers, electricians, septic systems, solar panels, lawn care, pool services, and backyard playgrounds. Auto and boats: car sales, mechanics, and boat cleaning and maintenance. Plus real estate agents and car insurance agents.",
      },
      {
        question: "Will postcards go to neighbors who already have what I'm selling?",
        answer:
          "No. Lists are checked against neighborhood data and aerial map views, so homes that already have it are left off. If you're advertising pool installation because a neighbor just got a pool, the postcards skip every nearby house that already has a pool — you only pay to reach the homes that could actually buy.",
      },
      {
        question: "Do you only mail in Illinois?",
        answer:
          "No — neighbor postcard mailings are available anywhere in the United States. I'm based in Richmond, Illinois, but the lists, printing, and mailing work the same whether your customers are down the road or across the country.",
      },
      {
        question: "Will the postcard name my customer?",
        answer:
          "Not unless they agree to it. By default the message stays anonymous — \"your neighbor on Oak Street\" — which keeps the neighborly effect without naming anyone. If your customer gives written permission to be named, the postcard can say so, which makes it even more personal.",
      },
      {
        question: "Who receives the postcards?",
        answer:
          "Households around your customer's address, chosen with neighborhood data and aerial map views — for example, homes on the same street, homes with similar roofs or yards, or homes in the same subdivision. We decide the area and number of postcards together for each campaign.",
      },
      {
        question: "What does soft-touch mean?",
        answer:
          "It's a print finish with a smooth, velvety feel, so the postcard feels different from everything else in the mailbox. People tend to hold it a second longer, which is the whole point.",
      },
      {
        question: "What's included?",
        answer:
          "Everything: the postcard design and offer, the targeted mailing list, printing on soft-touch stock, and mailing — postage is packaged in with the printing.",
      },
      {
        question: "How much does a neighbor postcard mailing cost?",
        answer:
          "Each campaign is quoted based on how many postcards go out and how often you mail. Tell me your business, your offer, and how many recent jobs you'd like to mail around, and I'll put together a quote.",
      },
    ],
    icon: IconPostcard,
    accent: "from-cyan-500 via-sky-600 to-indigo-700",
    image: {
      src: "/webp-assets/smart-postcard.webp",
      alt: "A \"Just Sold\" real estate postcard with gold-foil lettering, a photo of the sold home, and the line \"The home down the street just sold! Looking to sell?\"",
    },
    children: [],
    related: ["business-printing", "email-marketing"],
  },
  {
    slug: "greeting-cards",
    audience: "personal",
    title: "Greeting Cards",
    seoTitle: "Custom Christmas & Greeting Cards",
    metaDescription:
      "Custom greeting card design — Christmas and holiday cards, plus everyday cards for birthdays, thank-yous, and every occasion in between.",
    tagline: "A card for every moment worth marking.",
    description:
      "From the biggest holiday mailer of the year to a single birthday card, every card gets the same care with layout, type, and color. Printed cards come in two 5×7 formats: folded (10×7 paper folded in half) or flat and printed on both sides, with options like gold foil, embossing, and heavyweight or recycled cardstock.",
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
        seoTitle: "Custom Photo & Business Christmas Cards",
        metaDescription:
          "Custom family photo Christmas cards and corporate cards with your logo, with gold foil, embossing, and premium cardstock. Rush printing available.",
        tagline: "My favorite project of the year.",
        description:
          "Custom family photo cards, corporate Christmas cards with your logo, and everything in between — designed early enough to beat the December rush, with rush printing when you're running late. Choose a folded 5×7 card or a flat 5×7 card printed on both sides, then finish it your way: matte or glossy, gold foil stamping, or embossing, on heavyweight, recycled, or kraft cardstock.",
        details:
          "Christmas cards are the single busiest thing I do every year, and the reason clients keep coming back is simple: I treat a photo card the same way I'd treat any other design project — real layout choices, real color decisions, not a template with your photo dropped in. Minimalist and modern, vintage, rustic, or a funny photo card that makes everyone laugh — the style is up to you. Corporate clients get the same care for a mailer as a family does for their holiday photo.",
        features: [
          "Custom family photo cards, with one photo or several",
          "Dog and cat photo cards — pets are family, too",
          "Your own message printed inside",
          "Folded 5×7 cards (10×7 paper folded in half)",
          "Flat 5×7 cards, printed on both sides, with optional rounded corners",
          "Corporate Christmas cards with your logo",
          "Each card personalized with the recipient's name",
          "Matte or glossy finishes, gold foil stamping & embossing",
          "Heavyweight, recycled, or kraft cardstock",
          "Early booking gets first pick of finishes",
          "Guaranteed delivery before the holidays when booked in time",
          "Rush printing for last-minute orders",
          "Addressing & mailing to your full list, postage handled",
          "Hand-pressed wax seals, single or two-tone, or Christmas-themed",
          "Custom printed envelopes & liners, or Christmas-themed envelopes",
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
            question: "What finishes and paper are available?",
            answer:
              "Matte or glossy, plus gold foil stamping and embossing for a raised, premium touch. Cards can be printed on heavyweight cardstock for a thick, substantial feel, recycled cardstock for an eco-friendly card, or kraft paper for a rustic look. I'll help you choose based on the design and your budget.",
          },
          {
            question: "Matte or glossy: which is better for photo Christmas cards?",
            answer:
              "Both print photos beautifully. Glossy makes colors pop and gives photos a vivid, polished shine. Matte has a softer, more elegant look with no glare, and it's easier to write on if you like adding a handwritten note. If you're not sure, I'll recommend one for your photo.",
          },
          {
            question: "What card formats do you offer?",
            answer:
              "Two 5×7 formats. A folded card is printed on 10×7 paper and folded in half into a 5×7 card, with room for a message or photos inside. A flat card is a single 5×7 card printed on both sides — great for photo cards, with a design or message on the back — and can have rounded corners for a softer, finished look.",
          },
          {
            question: "Can you design corporate Christmas cards, not just family cards?",
            answer:
              "Yes — corporate and business holiday cards are just as common as family photo cards. I design them around your logo and brand colors, can print each card with the recipient's name, and can match the envelopes to your brand. Real estate agents, insurance agents, and other businesses use them to thank clients every year, and I can address and mail the whole list for you.",
          },
          {
            question: "How many photos can I include?",
            answer:
              "Most designs work well with one to three photos, though layouts can be adjusted to fit more. A folded card has room for extra photos inside, too.",
          },
          {
            question: "Can I add a custom message inside the card?",
            answer:
              "Yes. A folded card has two inside pages for your own message, a family update, or a favorite verse, designed to match the front.",
          },
          {
            question: "Can you put our dog or cat on the card?",
            answer:
              "Of course — pets are part of the family. They can be the star of the card or pose with everyone else.",
          },
          {
            question: "What styles of Christmas cards can you design?",
            answer:
              "Anything from minimalist and modern to vintage, rustic kraft, elegant gold foil, or a funny photo card. If you'd like a non-denominational greeting, a “Happy Holidays” or “Season's Greetings” card works for everyone on your list.",
          },
          {
            question: "Can you do rush Christmas cards for a last-minute order?",
            answer:
              "Yes — rush printing is available. Tell me your deadline and I'll let you know what's possible and quote the rush. Booking early is still the best way to get your first choice of finishes.",
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
              "Yes — each seal is poured and pressed by hand, so every one is unique. Choose one color or two-tone in any color combination, with your initials or monogram — or a Christmas-themed stamp. Wax seals are quoted per job.",
          },
          {
            question: "Can you make personalized gift tags from Santa?",
            answer:
              "Yes — custom “From Santa” gift tags personalized with each child's name, designed to match your cards or in their own North Pole style. They're their own product, so you can order them with or without Christmas cards. They're quoted per job.",
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
        seoTitle: "Custom Birthday, Thank-You & Greeting Cards",
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
          "Gold foil, embossing & heavyweight, recycled, or kraft cardstock",
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
              "Yes — every seal is poured and pressed by hand, so no two are exactly alike. Choose one color or two-tone in any color combination — like your wedding colors — with your initials or monogram. Wax seals are quoted per job.",
          },
        ],
        icon: IconGift,
        image: {
          src: "/webp-assets/wedding.webp",
          alt: "Wedding invitation suite on deckled paper with sage green botanical accents: invitation, RSVP card, menu, place card, and a floral-lined sage envelope, with a gold wax seal, white flowers, and silk ribbon",
        },
      },
      {
        slug: "programs",
        title: "Event & Memorial Programs",
        seoTitle: "Funeral, Wedding & Event Program Design",
        metaDescription:
          "Funeral and memorial programs, wedding, church, and graduation programs designed and printed in Richmond, IL, with rush turnaround when time is short.",
        tagline: "Programs that honor the day, ready when you need them.",
        description:
          "Funeral and memorial programs, wedding ceremony programs, church bulletins, and graduation and recital programs, designed around your photos and order of events and printed on quality stock.",
        details:
          "Programs are often needed on short notice, especially for a memorial service, so I keep the process simple: send the photos, the order of service, and any readings or tributes, and I'll lay it out with care and send a proof quickly. Single-sheet programs work for most services, and booklets leave room for more photos, a full obituary, or song lyrics.",
        features: [
          "Funeral & memorial programs",
          "Wedding ceremony programs",
          "Church, graduation & recital programs",
          "Single-sheet or booklet layouts",
          "Rush turnaround for memorial services",
        ],
        faqs: [
          {
            question: "How much do programs cost?",
            answer: `${priceAnswer("greeting-cards/programs")} Printing is quoted by quantity and paper.`,
          },
          {
            question: "How quickly can you make a memorial program?",
            answer:
              "Rush turnaround is available. Send the photos, the order of service, and any text as soon as you have them, and I'll get a proof back to you as fast as possible.",
          },
          {
            question: "What do I need to send?",
            answer:
              "A few photos, the order of service or events, and any text you'd like included, such as an obituary, readings, song lyrics, or a thank-you note. I'll handle the layout.",
          },
          {
            question: "Can the program match my wedding invitations?",
            answer:
              "Yes. Programs can be designed to match your [wedding invitation suite](/services/greeting-cards/wedding-invitations), using the same colors, fonts, and details.",
          },
        ],
        icon: IconBook,
        image: {
          src: "/webp-assets/event-and-memorial-programs.webp",
          alt: "Printed memorial programs on a wooden desk: “In Loving Memory” celebration of life programs with soft watercolor leaves, a stack of copies, and a folded order of service",
        },
      },
    ],
  },
  {
    slug: "business-printing",
    audience: "business",
    title: "Business Printing",
    seoTitle: "Business Printing & Design | McHenry & Lake County",
    metaDescription:
      "Business printing and design: logos, business cards and letterhead, flyers, brochures, menus, postcards, labels, magazines, and catalogs, all one brand.",
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
          `Logo design starts at ${startsAt("business-printing/logo-design")}. Business card design is ${startsAt("business-printing/business-cards")}, flyers and brochures start at ${startsAt("business-printing/brochures-collateral")}, and catalogs and magazines start at ${startsAt("business-printing/magazines-catalogs")}, plus printing, which is quoted by quantity and stock. Pitch decks and other documents are quoted per project.`,
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
        slug: "logo-design",
        title: "Logo Design",
        seoTitle: "Logo Design for Small Businesses",
        metaDescription:
          "Affordable logo design in Richmond, IL: an original logo for your business, or a cleanup of the one you have, with files ready for print, web, and social.",
        tagline: "A mark that looks right on a sign, a shirt, and a phone screen.",
        description:
          "A new logo for a new business, or a cleanup of one that's been redrawn, stretched, and screenshotted too many times. Every logo is designed to work everywhere it'll appear: business cards, signs, shirts, your website, and social media.",
        details:
          "I start with a short conversation about your business, your customers, and the feel you want, then design two concepts. You pick a direction, we refine it together, and you get the finished logo in every format you'll need. A logo is the start of everything else you print, so it pairs naturally with matching business cards, letterhead, and a website.",
        features: [
          "2 original concepts to choose from",
          "2 rounds of edits on your favorite",
          "Color, black, and white versions",
          "Vector files for print plus PNGs for web and social",
          "Cleanup and redraws of existing logos",
          "Optional brand style sheet with your colors and fonts",
        ],
        faqs: [
          {
            question: "How much does a logo cost?",
            answer: `${priceAnswer("business-printing/logo-design")} Matching [business cards and letterhead](/services/business-printing/business-cards) can be added once the logo is final.`,
          },
          {
            question: "What files will I get?",
            answer:
              "Vector files (like SVG and PDF) that stay sharp at any size for printing and signs, plus PNG files for your website and social media, in color, black, and white versions.",
          },
          {
            question: "Can you fix my existing logo instead of starting over?",
            answer:
              "Yes. If your logo only exists as a blurry image or an old file, I can redraw it cleanly so it prints sharp again, without changing how it looks.",
          },
          {
            question: "Do I own the logo?",
            answer: "Yes. Once it's paid for, the final logo is yours to use anywhere.",
          },
          {
            question: "Starting a new business?",
            answer:
              "The [new business launch guide](/new-business) walks through what to put in place first, from the logo and business cards to the website.",
          },
        ],
        icon: IconSparkle,
        image: {
          src: "/webp-assets/logo-design.webp",
          alt: "Logo design in progress on a desk: geometric “Substratum Protocol” logo concepts on a laptop and a pen tablet, pencil sketches in a notebook, a brand identity guide, Pantone swatches, and finished business cards",
        },
      },
      {
        slug: "business-cards",
        title: "Business Cards & Letterhead",
        seoTitle: "Business Card & Letterhead Design",
        metaDescription:
          "Custom business card, letterhead, and envelope design and printing in Richmond, IL: foil, matte, or textured stock, and matching stationery sets.",
        tagline: "Clean, memorable layouts that hold up in a stack of a hundred.",
        description:
          "Business cards are a small canvas that still has to do a lot of work. I design layouts that stay legible and memorable at that size, with matching letterhead and envelopes when you want a full set, then print them on the stock and finish that fits your brand.",
        details:
          "A business card gets handed over in seconds, so it has to say something fast: legible, memorable, and consistent with everything else you hand someone. I design the layout first, then help you pick a stock and finish — foil, matte, or textured — that actually fits how you'll use it.",
        features: [
          "Foil, matte, or textured stock",
          "Double-sided layouts",
          "QR & digital contact options",
          "Consistent with your other printed pieces",
          "Matching letterhead & #10 envelopes",
          "Editable Word or Google Docs letterhead for everyday letters",
          "Presentation folders to match",
          "Gift certificates, coupons & loyalty punch cards",
        ],
        faqs: [
          {
            question: "How much do business cards and letterhead cost?",
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
          {
            question: "Do you design letterhead and envelopes too?",
            answer:
              "Yes. Letterhead and #10 envelopes are designed to match your business cards, or as a full stationery set with all three. Letterhead comes as a print-ready file plus an editable Word or Google Docs version, so you can type everyday letters and invoices on it yourself.",
          },
          {
            question: "Do you make gift certificates and punch cards?",
            answer:
              "Yes. Gift certificates, coupons, and loyalty punch cards are designed to match your business cards, and can be numbered so you can track which ones come back.",
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
        seoTitle: "Flyer & Brochure Design and Printing | Northern Illinois",
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
          "Door hangers & rack cards",
          "Menus & counter cards",
          "Print-ready files, sized correctly",
        ],
        faqs: [
          {
            question: "How much do flyers, brochures, and menus cost?",
            answer:
              `${priceAnswer("business-printing/brochures-collateral")} Each includes 2 rounds of edits and print-ready files. Larger multi-page menus are quoted by page count, and printing by quantity, size, and paper.`,
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
        slug: "magazines-catalogs",
        title: "Magazines & Catalogs",
        seoTitle: "Magazine & Catalog Design",
        metaDescription:
          "Magazine and catalog design in Richmond, IL: community and company magazines, product catalogs, line cards, and price books, print-ready with a PDF version.",
        tagline: "Pages people actually flip through.",
        description:
          "Community and company magazines, newsletters with real heft, product catalogs, line cards, and price books — laid out so every page is easy to read and easy to find your way around, then delivered print-ready with a PDF for email and your website.",
        details:
          "A magazine or catalog is a system, not a single page: the same fonts, grids, and page styles carry from the cover to the back, so readers always know where they are and products are easy to compare. I set up that system first, then flow in your articles, photos, products, and prices. Many businesses refresh a catalog every year or publish a magazine every season, so the files are kept on hand and updates only cost the pages that change.",
        features: [
          "Community, company & member magazines",
          "Product catalogs, line cards & price books",
          "Cover design and consistent page styles",
          "Product photo cleanup and background removal",
          "Print-ready files for stapled or bound printing",
          "A PDF version for email and your website",
        ],
        faqs: [
          {
            question: "How much does magazine or catalog design cost?",
            answer:
              `${priceAnswer("business-printing/magazines-catalogs")} Printing is quoted by quantity, size, and paper once the page count is set.`,
          },
          {
            question: "Why do page counts come in multiples of 4?",
            answer:
              "Stapled and folded publications are printed on sheets that each hold 4 pages, so the total is always 8, 12, 16, 20, and so on. If your content lands in between, I'll suggest how to fill or trim it.",
          },
          {
            question: "Can you update my catalog or magazine for the next issue?",
            answer:
              "Yes. The design files are kept on hand, so the next issue or a yearly price update reuses the same layout, and you only pay for the pages that change.",
          },
          {
            question: "Do I need to provide the photos and writing?",
            answer:
              "You provide the articles, product details, and photos, and I handle the layout. Phone photos are fine for products: I can clean them up, remove backgrounds, and even out the color. Help tightening the copy is available too.",
          },
          {
            question: "Can I get a digital version too?",
            answer:
              "Yes. Every magazine and catalog comes with a PDF sized for email and your website, alongside the print-ready files.",
          },
        ],
        icon: IconBook,
        image: {
          src: "/webp-assets/magazines-and-catalogs.webp",
          alt: "Printed magazines and catalogs open on a wooden desk: a magazine spread of feature stories with food photography, a fashion article, and a product catalog with a clean grid of items and prices, beside a stack of magazine covers",
        },
      },
      {
        slug: "postcards-direct-mail",
        title: "Postcards & Direct Mail",
        seoTitle: "Postcard & Direct Mail Design",
        metaDescription:
          "Postcard and direct mail design in Richmond, IL: promotions, announcements, and Every Door Direct Mail (EDDM) campaigns, designed, printed, and mailed.",
        tagline: "Mail that gets read on the walk back from the mailbox.",
        description:
          "Promotions, grand openings, announcements, and seasonal reminders, designed to be read in the few seconds between the mailbox and the kitchen counter. Send them to your own customer list, or blanket whole neighborhoods with USPS Every Door Direct Mail (EDDM).",
        details:
          "A postcard has one job: get someone to act. That means one clear offer, a headline you can read at arm's length, and an easy next step. I design both sides, help you pick a size, and can handle the EDDM route planning and USPS paperwork, so your postcards reach every home on the routes you choose without needing a mailing list. Want to mail the neighbors of your recent customers instead? That's what [Location Smart Postcards](/services/location-smart-postcards) are for.",
        features: [
          "One- and two-sided postcard designs",
          "Promotions, announcements & seasonal reminders",
          "Every Door Direct Mail (EDDM) route planning",
          "Mail to your own customer list",
          "Printed and mailed for you",
        ],
        faqs: [
          {
            question: "How much does postcard design cost?",
            answer: `${priceAnswer("business-printing/postcards-direct-mail")} Printing is quoted by size and quantity, and postage is billed at USPS rates.`,
          },
          {
            question: "What is Every Door Direct Mail (EDDM)?",
            answer:
              "It's a USPS service that delivers your postcard to every address on the mail routes you choose, with no mailing list needed. It's one of the most affordable ways to reach a whole neighborhood or town.",
          },
          {
            question: "Can you mail to my own customer list instead?",
            answer: "Yes. Send me your list, and I'll have the postcards addressed and mailed.",
          },
          {
            question: "How is this different from Location Smart Postcards?",
            answer:
              "EDDM reaches every home on a route. [Location Smart Postcards](/services/location-smart-postcards) target only the neighbors around your recent customers' addresses, with a message written about that job, which makes them more personal and more likely to get a response.",
          },
        ],
        icon: IconPostcard,
        image: {
          src: "/webp-assets/postcards-and-direct-mail.webp",
          alt: "Direct mail pieces on a wooden desk: colorful promotional postcards with sale offers and address panels, a folded mailer, and stamped window envelopes ready to send",
        },
      },
      {
        slug: "stickers-labels",
        title: "Stickers & Labels",
        seoTitle: "Sticker & Product Label Design",
        metaDescription:
          "Sticker and product label design in Richmond, IL: logo stickers, jar and bottle labels, and packaging labels, printed on paper, vinyl, or waterproof stock.",
        tagline: "Small labels that make a product look ready for the shelf.",
        description:
          "Logo stickers, product labels for jars, bottles, candles, and baked goods, and packaging seals, designed to fit your container exactly and printed on the material that suits it.",
        details:
          "A label has to fit a curved jar, survive a fridge or a shower, and still make your product stand out on a crowded shelf. I design to your container's exact size, keep the required details like ingredients and net weight easy to read, and set up matching versions for every flavor or scent so your whole line looks like a family.",
        features: [
          "Logo & promotional stickers",
          "Jar, bottle, candle & bakery labels",
          "Matching versions for each flavor or scent",
          "Sized to your container",
          "Paper, vinyl, or waterproof stock",
        ],
        faqs: [
          {
            question: "How much does label design cost?",
            answer: `${priceAnswer("business-printing/stickers-labels")} Printing is quoted by size, material, and quantity.`,
          },
          {
            question: "Can you design labels for a whole product line?",
            answer:
              "Yes. Once the main label is designed, each additional flavor, scent, or version reuses the same layout with its own color and text, which keeps the line consistent and the cost low.",
          },
          {
            question: "Will the labels hold up to water or the fridge?",
            answer:
              "Yes, with the right material. Waterproof vinyl and coated stocks hold up to moisture, condensation, and handling. Tell me where the product will live and I'll recommend one.",
          },
          {
            question: "What information has to go on a food label?",
            answer:
              "It depends on what you sell and where, so check your state's requirements. I'll lay out whatever you need, like ingredients, net weight, and allergens, so it's clear and easy to read.",
          },
        ],
        icon: IconCard,
        image: {
          src: "/webp-assets/stickers-and-labels.webp",
          alt: "Custom stickers and product labels on a wooden desk: sticker sheets, die-cut logo stickers, holographic craft labels, and rolls of round organic product labels",
        },
      },
      {
        slug: "business-documents",
        title: "Business Documents",
        seoTitle: "Pitch Deck, Presentation & Business Form Design",
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
          "Invoices & carbonless (NCR) forms",
        ],
        faqs: [
          {
            question: "How much does a pitch deck or business document cost?",
            answer:
              `${priceAnswer("business-printing/business-documents")} Decks depend on slide count and how much content structuring is involved, so I'll quote after a quick look at your goals and existing material.`,
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
    seoTitle: "Yard Signs & Posters | McHenry & Lake County, IL",
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
        seoTitle: "Custom Yard Signs | McHenry & Lake County, IL",
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
        seoTitle: "Custom Poster Design & Printing | McHenry & Lake County",
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
          "Sizes from 11×17 to 24×36 and larger",
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
              "The most common sizes are 11×17 inches (counters and bulletin boards), 18×24 (windows and walls), and 24×36 (storefronts and events), with larger formats available. I'll recommend a size based on where it'll hang and how far away people will be reading it.",
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
      {
        slug: "decals-magnets",
        title: "Decals & Vehicle Magnets",
        seoTitle: "Window Decal & Vehicle Magnet Design",
        metaDescription:
          "Window decals, storefront hours, and vehicle door magnets designed and printed in Richmond, IL, so your business is advertised wherever it's parked.",
        tagline: "Turn your windows and your truck into advertising.",
        description:
          "Store hours and logo decals for the front door, sale and seasonal window graphics, and magnetic signs for your car or truck doors, designed to read clearly from the sidewalk or the road.",
        details:
          "A vehicle magnet works for you every time you park, and a clean window decal tells people you're open before they reach the door. I design for the distance they'll be read from: big, simple type, your logo, and a phone number or website people can remember at a glance. Magnets come off for the weekend, and window decals peel off cleanly when the season changes.",
        features: [
          "Store hours & logo window decals",
          "Sale & seasonal window graphics",
          "Vehicle door magnets (sold in pairs)",
          "Designed to read from the road",
          "Removable, without damaging glass or paint",
        ],
        faqs: [
          {
            question: "How much do decals and vehicle magnets cost?",
            answer: `${priceAnswer("signs-posters/decals-magnets")} Printing is quoted by size, material, and quantity.`,
          },
          {
            question: "Will a vehicle magnet damage my paint?",
            answer:
              "Not when it's cared for. Take magnets off now and then to clean and dry the surface underneath, and don't put them on freshly painted or curved areas.",
          },
          {
            question: "Can window decals be removed?",
            answer:
              "Yes. Removable vinyl peels off cleanly, which makes it ideal for seasonal or sale graphics. Long-term store hours and logos can use a more permanent vinyl.",
          },
          {
            question: "What should go on a vehicle magnet?",
            answer:
              "Keep it short: your logo or business name, what you do, and one way to reach you, like a phone number or website. People read it in a few seconds, often from another car.",
          },
        ],
        icon: IconSignpost,
        image: {
          src: "/webp-assets/decals-and-vehicle-magnets.webp",
          alt: "Navy pickup truck parked in a driveway with a white magnetic door sign for Blue Oak Landscaping & Design, showing an oak tree logo and a phone number",
        },
      },
    ],
  },
  {
    slug: "banners-canvas",
    audience: "shared",
    title: "Banners & Canvas Prints",
    seoTitle: "Custom Banners & Canvas Prints | Northern Illinois",
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
        seoTitle: "Custom Banners & Vinyl Signs | McHenry & Lake County",
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
          "Retractable pull-up banners & trade show backdrops",
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
            question: "Do you design retractable banners and trade show displays?",
            answer:
              "Yes. Pull-up banners and trade show backdrops are designed to the exact size of your stand, with the important message up high where people can see it over a crowd.",
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
        seoTitle: "Custom Canvas Photo Prints | McHenry & Lake County",
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
    seoTitle: "Custom T-Shirts & Team Apparel | Northern Illinois",
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
    seoTitle: "Photo Scanning, Restoration & Color Correction",
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
        seoTitle: "Photo Scanning: Old Prints to Digital Files",
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
        seoTitle: "Old Photo Restoration & Colorization",
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
              `${priceAnswer("photos/photo-restoration")} Each photo is priced by how much damage there is: send a phone snapshot and I'll tell you the price before any work starts.`,
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
              "Yes. Colorization is a $25 add-on. If you know details like eye color or the color of a dress, share them and I'll match them.",
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
        seoTitle: "Faded Photo Color Correction",
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
    seoTitle: "At-Home Passport Photos | McHenry & Lake County",
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
      ...passportCommonFaqs(),
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
        question: "How can I look good in my passport photo?",
        answer:
          "Wear a solid, darker top with a crew neck, V-neck, or collar; keep makeup natural with a little powder to cut shine; and wear contacts instead of glasses. Sit up tall with your chin slightly forward and down, blink just before the shot, and give a relaxed, closed-mouth smile — it's allowed. I handle soft, even lighting and retake as many times as you like.",
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
