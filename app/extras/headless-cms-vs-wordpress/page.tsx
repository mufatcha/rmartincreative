import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";

const SLUG = "headless-cms-vs-wordpress";
const WEB = "/services/website-design-development";
const CMS = `${WEB}/wordpress-headless-cms`;

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

const CONTENT: ArticleContent = {
  intro: [
    "WordPress runs a huge share of the websites on the internet, and for good reason: it's familiar, flexible, and lets anyone update their own site. But a traditional WordPress site does two very different jobs at once. It's the place your team writes and edits content, and it's also the engine that builds every page, from scratch, each time someone visits.",
    "A headless CMS splits those two jobs apart. Your team still gets an easy place to edit content, while the website itself is built separately to be as fast and secure as possible. Here's what that means, in plain English, and when it's the better choice.",
  ],
  blocks: [
    {
      type: "numbered",
      heading: "What is a headless CMS, and how does it work?",
      items: [
        {
          title: "The body: where your team edits",
          body: "The CMS (content management system) is where you log in to write pages, upload photos, and update prices or hours. With a headless CMS like Strapi or Prismic, that's all it does: it's the backend that holds your content.",
        },
        {
          title: "The head: the website visitors see",
          body: "The website is built separately, usually as a custom [Next.js](/extras/benefits-of-a-nextjs-website) website, and designed exactly the way your business needs, without being boxed in by a theme.",
        },
        {
          title: "The connection between them",
          body: "When you publish something in the editor, the website pulls in the new content and updates itself. Think of a restaurant: your team works in the kitchen, and guests only ever see the dining room.",
        },
      ],
    },
    {
      type: "bullets",
      heading: "How a headless CMS compares with traditional WordPress",
      items: [
        "**Faster pages.** Performance is the biggest difference between the two. Instead of assembling each page from a database on every visit, the website's pages are built ahead of time and ready the moment someone clicks.",
        "**Better security.** The editor lives apart from the public website, so there's no login page on your site for bots to hammer, and no plugins on the public site for hackers to exploit.",
        "**Far less to learn.** Really running a WordPress site means learning the dashboard, themes, page builders, plugin settings, and how they all affect each other. A headless CMS gives your team a handful of simple, clearly labeled fields to fill in, and that's it.",
        "**No plugin bloat.** Getting a WordPress site to look and work the way you want usually means adding plugin after plugin: one for forms, one for speed, one for search, one for security, one for the layout. Each adds code that slows the site down, needs its own updates, and can clash with the others after a future update. With a headless CMS, the site is customized directly in its own code, so there are no plugins to pile up and no version conflicts waiting down the road.",
        "**Total design freedom.** The website isn't limited by what a theme or page builder allows. It can look and work exactly the way you want.",
        "**Write once, use everywhere.** The same content can power your website, a mobile app, a customer portal, or an in-store screen, all from one editor.",
        "**Lower hosting costs.** The finished website can run on Cloudflare's global network, often for free, instead of on a server running WordPress around the clock. See [how that works](/extras/nextjs-cloudflare-github-hosting).",
        "**Built for search and AI.** Fast pages, clean structure, and structured data are part of the build from day one, not added later with plugins.",
      ],
    },
    {
      type: "text",
      heading: "What editing actually looks like",
      paragraphs: [
        "In WordPress, even a simple change can mean finding the right menu, the right block, and the right plugin setting, and there's a real learning curve before anyone feels confident. In a headless CMS, your team fills in simple fields set up around your actual content: a headline, a photo, a price, a description. There's no page builder where one wrong drag can wreck a layout, and the design stays consistent no matter who's editing.",
        "Click **Publish**, and the website updates on its own, usually within a few minutes. Drafts can be previewed before they go live.",
        "Want to try it? The [Juniper & Rye demo editor](/demos/juniper-rye) is a sample site for a made-up bakery. Change the menu, hours, or brand color and watch the site update as you type.",
      ],
    },
    {
      type: "text",
      heading: "Where WordPress still wins",
      paragraphs: [
        "Traditional WordPress is still a good choice in some cases. If your team already knows it well, publishes new content every day, or relies on a specific plugin, like a membership system or online courses, it can be the simpler path. It just needs to be built cleanly, with a custom theme and no pile of plugins slowing it down.",
        "There's also a middle ground: **headless WordPress**. Your team keeps the WordPress editor it already knows, while visitors get a fast, modern website built separately.",
        "So how does headless WordPress compare with a native headless CMS like Strapi or Prismic? Headless WordPress makes sense when you have years of content and a team that knows WordPress well. Strapi and Prismic were designed to be headless from the start, so their editors are simpler, and there's no WordPress core or plugins to keep updated behind the scenes.",
      ],
    },
    {
      type: "bullets",
      heading: "Which one is right for you?",
      items: [
        "**Go headless** if speed, security, a custom design, or a future app matter to you, and you'd rather not babysit plugin updates.",
        "**Stick with WordPress** if your team lives in it every day or depends on a plugin that has no good substitute.",
        "**Not sure?** That's normal. A short conversation about how your team works usually makes the answer obvious.",
      ],
    },
  ],
  cta: {
    heading: "Let's find the right fit for your site",
    body: "I build custom Next.js websites with a Strapi or Prismic CMS backend, and clean WordPress sites when that's the better fit. Tell me how your team updates the website today and what's frustrating about it, and I'll recommend whatever actually fits.",
    serviceId: "website",
    button: "Talk about your website",
    link: { href: CMS, label: "Next.js & headless CMS development" },
  },
  faqs: [
    {
      question: "What is a headless CMS, in simple terms?",
      answer:
        "It's a content editor that's separate from your website. Your team writes and updates content in the editor, and a separately built website displays it. Separating the two usually makes the website faster, safer, and more flexible.",
    },
    {
      question: "Is a headless CMS harder to use than WordPress?",
      answer:
        "Usually it's easier. WordPress has a real learning curve: the dashboard, themes, blocks, and plugin settings all work a little differently. A headless CMS just shows simple fields set up around your actual content, so there's far less to learn and less to accidentally break. Adding a brand-new kind of page or feature does need a developer, while everyday updates don't.",
    },
    {
      question: "What's the easiest headless CMS for non-technical content editors?",
      answer:
        "The easiest one is the one set up around your content, showing your team only the fields they need. I mostly build with Strapi and Prismic, and both can be set up that simply. Prismic's visual page builder suits teams that like arranging page sections themselves, while Strapi is open source and gives you full control over where your content lives. WordPress itself can also be used as a headless CMS if your team already knows it.",
    },
    {
      question: "Is a headless CMS better for website security than WordPress?",
      answer:
        "Usually, yes. The public website is just ready-made pages, with no login page, database, or plugins exposed for attackers to target, and the editor sits behind its own secure login somewhere else. A WordPress site can be secure too, but it takes constant updates to stay that way.",
    },
    {
      question: "Is a headless CMS better than WordPress for SEO and site speed?",
      answer:
        "For site speed, a headless site usually comes out ahead, because its pages are built in advance instead of on every visit. Speed is part of how Google ranks pages, and the clean structure and structured data built into a headless site help search engines and AI understand it. WordPress can rank well too, but it often takes several plugins to get there, and each one can slow the site down.",
    },
    {
      question: "Can I migrate from WordPress to a headless CMS without losing SEO?",
      answer: `Yes. Your content is moved over, your page addresses are kept or redirected to their new locations, and your titles, descriptions, and structured data come along too, so search engines can carry your rankings over to the new site. See [website overhauls](${WEB}/website-overhaul).`,
    },
    {
      question: "Can I preview changes before they go live?",
      answer:
        "Yes. Drafts can be previewed on the real design before you publish, so you know exactly how a page will look.",
    },
    {
      question: "How much does it cost to convert a WordPress site to a headless CMS?",
      answer:
        "It depends on how many pages and types of content you have and what the site needs to do, so converting a WordPress site to a headless setup is quoted per project after a short conversation. Ongoing costs are often lower than WordPress: many headless CMSs have free plans for small sites, and the website itself can often be hosted free on Cloudflare.",
    },
  ],
};

export default function HeadlessCmsPage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
