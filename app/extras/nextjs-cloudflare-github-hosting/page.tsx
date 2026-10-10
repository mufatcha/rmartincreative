import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";

const SLUG = "nextjs-cloudflare-github-hosting";
const WEB = "/services/website-design-development";
const HOSTING = `${WEB}/website-hosting`;

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

const CONTENT: ArticleContent = {
  intro: [
    "Every website needs three things: a way to build it, a safe place to keep it, and a place to run it so people can visit. The setup I use for most sites gives each of those jobs to a tool that's among the best at it. Next.js builds the site, GitHub keeps it safe, and Cloudflare delivers it to your visitors.",
    "This website runs on exactly this setup. Here's how the pieces fit together, and what it means for your business, in plain English.",
  ],
  blocks: [
    {
      type: "numbered",
      heading: "The three pieces",
      items: [
        {
          title: "Next.js: the builder",
          body: "Next.js turns your pages into fast, ready-made pages that are easy for Google and AI to read. More on that in [Benefits of a Modern Next.js Website](/extras/benefits-of-a-nextjs-website).",
        },
        {
          title: "GitHub: the safe",
          body: "GitHub stores your website's code along with a complete, dated history of every change ever made to it. Think of it as an off-site backup and a time machine in one: any earlier version of your site can be brought back.",
        },
        {
          title: "Cloudflare: the delivery network",
          body: "Cloudflare runs one of the largest networks in the world, with data centers in hundreds of cities. Your site is served from whichever one is closest to each visitor, so it loads quickly whether they're down the street or across the country.",
        },
      ],
    },
    {
      type: "steps",
      heading: "How an update goes live",
      items: [
        "You ask for a change: a new photo, an updated price, a whole new page.",
        "I make the change and save it to GitHub, with a note about what changed and when.",
        "Cloudflare sees the new version, builds the site, and publishes it automatically, usually within a few minutes.",
        "If anything ever looks wrong, the previous version can be restored in minutes.",
      ],
      note: "Want to approve changes before anyone else sees them? A private preview site, hidden from the public and search engines, can be added. See [hosting & management](" + HOSTING + ").",
    },
    {
      type: "bullets",
      heading: "What it means for your business",
      items: [
        "**Lower costs.** Cloudflare's free plan covers most small business sites, and it's meant for commercial use. Hosting can drop to $0, so you'd typically pay only for your domain name. Busier sites may need Cloudflare's low-cost paid plan, and I'll tell you upfront if yours does.",
        "**Fast everywhere.** Pages come from a data center near each visitor instead of from one server in one place.",
        "**Security built in.** The secure padlock (HTTPS) is included and renews itself, and Cloudflare filters out attacks and bad bots before they ever reach your site.",
        "**Ready for busy days.** A big sale, a news mention, or a viral post won't overwhelm a single small server, because there isn't one.",
        "**Nothing is ever lost.** Every version of your site is saved on GitHub, separate from where it's hosted.",
        "**No server to babysit.** There's no server software or plugins to keep updated, and no monthly hosting plan to remember to renew.",
      ],
    },
    {
      type: "text",
      heading: "How it compares with traditional hosting",
      paragraphs: [
        "Traditional shared hosting puts your website on one server in one location, shared with many other sites, and bills you every month whether anyone visits or not. Backups are often an extra fee, or something you have to remember to do yourself.",
        "With Cloudflare and GitHub, your site lives on a global network, every change is saved automatically, and the hosting bill is often zero.",
        "One caveat: a traditional WordPress site needs a server with a database, so it can't move to this setup as-is. I can [rebuild it in Next.js](" + WEB + "/website-overhaul), keeping your content and page addresses, and pair it with an [easy content editor](" + WEB + "/wordpress-headless-cms) if your team likes making its own updates.",
      ],
    },
  ],
  cta: {
    heading: "Tired of paying for hosting?",
    body: "Tell me where your website lives now and what you pay. I'll let you know what moving it would take, and what you could save.",
    serviceId: "website",
    button: "Ask about hosting",
    link: { href: HOSTING, label: "Website hosting & management" },
  },
  faqs: [
    {
      question: "Is free hosting on Cloudflare really reliable for a business website?",
      answer:
        "Yes. Cloudflare's free plan runs on the same global network that much larger companies rely on, and it's meant for commercial sites. It's a different pricing model than a traditional host, not a downgrade in reliability.",
    },
    {
      question: "What does GitHub actually do for my website?",
      answer:
        "It keeps the code for your website safe, along with a dated record of every change. If an update ever causes a problem, or you want something back the way it was, an earlier version can be restored in minutes.",
    },
    {
      question: "How long does it take for a change to show up on my website?",
      answer:
        "Usually just a few minutes. Once a change is saved to GitHub, Cloudflare builds and publishes the new version automatically.",
    },
    {
      question: "Do I need to understand Cloudflare or GitHub?",
      answer:
        "No. I set everything up and take care of it. You just tell me what you'd like changed, and it shows up on your site.",
    },
    {
      question: "Can you move my existing website to Cloudflare?",
      answer: `Usually, yes. Many sites can be moved as-is, while WordPress and some other platforms need to be rebuilt first, often as a faster [Next.js site](/extras/benefits-of-a-nextjs-website). See [website overhauls](${WEB}/website-overhaul), or ask and I'll take a look.`,
    },
  ],
};

export default function CloudflareGithubHostingPage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
