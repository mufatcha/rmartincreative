import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";
import { GOOGLE_REVIEW_URL } from "../../lib/business";
import type { ServiceFaq } from "../../lib/services-data";

const SLUG = "free-website-for-a-local-business";
const SEARCH = "/services/search-ai-discovery";

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

// The same offer is posted on Nextdoor, Facebook, and X, so keep the terms here
// in step with those posts if the offer changes.
const FREE_MEANS_FREE = [
  "**No hidden charges or fees.** The design, build, hosting, and setup cost you nothing, now or later. The only required cost is your domain name, which you buy and own yourself, and every optional cost is listed below.",
  "**No sales calls.** I won't call you to pitch other services.",
  "**No email blasts.** You won't be added to any mailing list. If you ever want to hear about other services, that's up to you, and you can ask anytime.",
  "**No catch.** All I ask in return is listed below: an honest review, if you feel I've earned one, and a look at your website analytics for 6 months.",
];

const INCLUDED = [
  {
    title: "A custom website, designed and built by me",
    body: "Brand new, or a full rebuild of your current site. No templates or drag-and-drop page builders: a fast, modern site written in code, built for your business and your customers. Here's [why a modern Next.js website](/extras/benefits-of-a-nextjs-website) is worth it.",
  },
  {
    title: "Help planning the content for every page",
    body: "We'll work out together what each page needs to say and in what order, so visitors find their answers and know how to reach you.",
  },
  {
    title: "Free hosting on Cloudflare",
    body: "Your site runs on Cloudflare's global network at no monthly cost. Here's [how free Next.js hosting on Cloudflare works](/extras/nextjs-cloudflare-github-hosting).",
  },
  {
    title: "One professional email address",
    body: "A `you@yourbusiness.com` address, forwarded to your Gmail or similar inbox, so you keep using the inbox you already know. Here's [how the forwarding works](/extras/free-domain-email-gmail-cloudflare-resend).",
  },
  {
    title: "My full Search + AI Discovery service",
    body: `So your business shows up on Google and in AI answers like ChatGPT. See everything [Search + AI Discovery](${SEARCH}) covers.`,
  },
  {
    title: "My Core Search & Maps service",
    body: `I set up and optimize your listings on Google, Apple Maps, Bing, Facebook, and Instagram, so customers find the right details wherever they look you up. It's the first package of [Local Presence Management](${SEARCH}/local-presence-management).`,
  },
];

const COSTS = [
  "**A domain name**, about $12 a year. I recommend [Namecheap](https://www.namecheap.com).",
  "**Optional: a content editor.** If you want a blog, or plan to update your site more than twice a month, I'll set you up with an easy content editor (Next.js + Strapi). That needs paid hosting at about $7 a month. Here's [what a headless CMS is](/extras/headless-cms-vs-wordpress).",
  "**Optional: more email addresses**, at your cost.",
];

const IN_RETURN = [
  `**An honest Google review** of my work, if you feel I've earned one. [Leave a review on Google](${GOOGLE_REVIEW_URL})`,
  "**Access to your website analytics for 6 months**, so I can share the results as a case study.",
];

const FAQS: ServiceFaq[] = [
  {
    question: "Is the website really free?",
    answer:
      "Yes. The design, the build, the content planning, the hosting, one email address, and the search and listings setup are all free. Your only required cost is a domain name, about $12 a year, which you buy and own yourself.",
  },
  {
    question: "Do I have to be nearby?",
    answer:
      "No. The offer is open to any family-friendly business in the US. Everything can be done over phone, email, and video calls.",
  },
  {
    question: "How many businesses will you pick?",
    answer:
      "One, and maybe more if the right projects come along. I'll pick the right project and get started right away.",
  },
  {
    question: "Why do you need my analytics?",
    answer:
      "To measure what the new site does for your business, like visitors and searches, and share those results as a case study. Access is for 6 months.",
  },
];

const CONTENT: ArticleContent = {
  intro: [
    "I'm giving away a custom website to a small business, **completely free**. It's designed and built from scratch, with free hosting, a professional email address, and setup on Google, AI answers, and the major map and listing sites. Your only required cost is a domain name, about $12 a year.",
    "Why free? I'm Ryan, a web designer and local search specialist who moved from Florida to be close to my kids. I'm building my portfolio here, and I'd rather show you what I can do than tell you. So I'll build one great website (maybe more, if the right projects come along) and let the results speak for themselves.",
  ],
  blocks: [
    { type: "bullets", heading: "Free means free", items: FREE_MEANS_FREE },
    { type: "numbered", heading: "What you get, free", items: INCLUDED },
    { type: "bullets", heading: "Your only costs", items: COSTS },
    { type: "bullets", heading: "What I ask in return", items: IN_RETURN },
    {
      type: "text",
      heading: "Who it's for",
      paragraphs: [
        "Any business in the US that needs a new website, or a better one, as long as it's family-friendly.",
        "**Know a business owner who could use this?** Please share this page with friends, family, and anyone who runs a small business. The more people who see it, the better the project I can find.",
      ],
      share: true,
    },
  ],
  cta: {
    heading: "Want the free website?",
    body: "Tell me about your business and your current website, if you have one. I'll pick the right project and get started right away.",
    serviceId: "website",
    button: "Tell me about your business",
    link: { href: "/services/website-design-development", label: "See my website services" },
  },
  faqs: FAQS,
  share: {
    text: "A free custom website for a small business, with free hosting and Google + AI search setup. Know someone who could use one?",
    prompt: "**Know someone who needs a new site?** Share this page with them.",
    apply: { prompt: "**Run a business that needs a new site?** Tell me about it.", label: "Submit your business", serviceId: "website" },
  },
};

export default function FreeWebsitePage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
