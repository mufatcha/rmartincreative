// Content for the About page (/about). Fill in the TODO fields, add your photo,
// then set `published: true` — until then the page only shows on the dev
// server (as a draft) and isn't linked, listed in the sitemap, or live.

import type { ServiceFaq } from "../services-data";

export const ABOUT = {
  /** Flip to true once the TODOs below are filled in. */
  published: true,

  /** Your headshot or a photo of you at work. Save it to public/webp-assets/ and set the path, e.g. "/webp-assets/ryan-martin.webp". */
  photo: {
    src: "/webp-assets/ryan-and-elizabeth-martin.webp",
    alt: "Ryan Martin and his wife, Elizabeth, smiling together",
  } as { src: string; alt: string } | null,

  /** Short role line under your name, e.g. "Designer, developer & print partner for small businesses". */
  role: "Designer, developer & print maker for small businesses",

  /** 1–2 sentences: who you are and who you help. This is the first thing people (and AI) read.
   *  Approved exception to the naming rule: this intro may name both Ryan Martin and
   *  R. Martin Creative in one sentence. Keep the rule everywhere else. */
  // intro: "I’m a designer, developer, and print maker who works as the marketing team for small businesses that don’t have one — websites and web apps, branding and business collateral, print, signs, and apparel, all under one roof. I also build custom software for startups and organizations that need both the digital and physical side done right.",
  intro: "I’m Ryan Martin, owner of R. Martin Creative, providing full-service web development, local SEO, custom printing, and brand strategy for small businesses. Operating from Richmond, Illinois, I act as a single-point marketing partner for clients across McHenry County, Lake County, Northern Illinois, and Southeast Wisconsin.",

  /** How you started. 2–3 short paragraphs. Service terms can link with "[text](/path)". Prompts:
   *  - What got you into design (or code, or print) in the first place?
   *  - What was your first real project or job?
   *  - How did it grow into designing, building, and printing for businesses? */
  story: [
    "My journey began at 17 while studying CADD with aspirations of becoming an architect. Everything changed when a friend handed me a copy of Macromedia Flash. In an era when the web was almost entirely static, discovering that I could bring movement, animation, and interactivity to a screen instantly hooked me. I spent my school hours mastering CADD and my nights at home teaching myself web development, obsessed with making digital spaces more dynamic.",

    "In 1999, I landed my first official web role at Eberle & Associates (later Eberle Advertising), a newspaper and magazine advertising agency eager to break into the web space. Working alongside founder Harry Eberle until his retirement gave me a front-row seat to traditional media. That experience expanded my skill set beyond code, immersing me in layout design, print production, and brand messaging.",

    "Combining those agency print foundations with my deep background in web development naturally shaped how I work today. Over time, that duality evolved into a complete end-to-end craft—building full-stack [Next.js web applications](/services/website-design-development) while designing and producing custom physical media, from [apparel](/services/apparel) and [business collateral](/services/business-printing) to [large-format vinyl installations](/services/banners-canvas).",
  ],

  /** Experience at a glance — short, factual, and only what's true. Examples:
   *  "20+ years designing and building websites", "Print work for 1,000+ projects",
   *  "Former in-house designer at …", a degree, certification, or award. */
  highlights: [
    "20+ years of website design & development",
    "Full-stack web development utilizing Next.js, React, Tailwind CSS, TypeScript, WordPress, Shopify, and modern headless CMS platforms.",
    "Print work for 1,000+ projects",
    "Former Creative Director at Eberle Advertising, Naperville, IL",
    "Bachelor’s degree in Marketing, Saint Leo University",
    "Co-owner of Simple Edge, Naperville, IL",
    "Sole proprietor of Pasco Creative, New Port Richey, FL"
  ],

  /** How you work with clients — 3 short points. */
  approach: [
    {
      title: "One point of contact",
      body: "You deal directly with me, the person creating the work—so there are no middle managers, lost details, or mixed messages between project handoffs."
    },
    {
      title: "Reliable business operations",
      body: "My wife, Elizabeth, manages our accounting behind the scenes, keeping your projects organized, supported, and on schedule."
    },
    {
      title: "Digital & physical precision",
      body: "Every web app is thoroughly tested and every print job receives careful proofing before production, guaranteeing exact results from screen to finished product."
    },
  ],

  /** Direct questions and answers, shown as an FAQ (with FAQPage structured data)
   *  so search engines and AI assistants can quote them. Links use "[text](/path)". */
  faqs: [
    {
      question: "What makes R. Martin Creative different from a typical marketing agency?",
      answer:
        "Instead of paying agency overhead for account managers and handoffs between separate teams, you work directly with one experienced partner who handles web design, search visibility, print production, and brand consistency from start to finish.",
    },
    {
      question: "Do you offer both web development and printing?",
      answer:
        "Yes. I build custom, fast-loading [websites](/services/website-design-development) and Next.js web applications, and I design and produce printed pieces too, including [business cards and brochures](/services/business-printing), [yard signs and banners](/services/signs-posters), and [branded apparel](/services/apparel).",
    },
    {
      question: "How does working with R. Martin Creative work?",
      answer:
        "It starts with a quick conversation about your business, your customers, and what is and isn't working. Together we decide where to start (the website, search visibility, print, or all three) so your budget goes where it matters most. You review proofs at every step, and nothing launches, prints, or ships until you've signed off. After that, the same eye stays on every piece, so your site, cards, signs, and shirts always look like one brand.",
    },
    {
      question: "Where are you located, and what areas do you serve?",
      answer:
        "I'm based in Richmond, Illinois (60071), and regularly serve businesses and families across McHenry County, Lake County, Northern Illinois, and Southeast Wisconsin, up through Lake Geneva and Kenosha. See the [full service area](/service-area).",
    },
  ] as ServiceFaq[],

  /** Optional: life outside work — your Richmond roots, family, hobbies. */
  personal: "When I'm not coding or in the shop, my time is spent with my wife and our three middle and high school kids. Most weekends you'll find us out supporting their activities at Dundee-Crown High and Carpentersville Middle School, from Friday night football games and marching band competitions to soccer and flag football.",
};

/** True when any field still contains a TODO — the page shows a draft banner in dev. */
export function aboutHasTodos(): boolean {
  return JSON.stringify(ABOUT).includes("TODO");
}
