// Content for the /new-business launch guide. Each phase is one stop on the
// vertical timeline: what to do (tagged digital or print), the questions to
// answer, and which services help.

export type LaunchItemKind = "digital" | "print" | "both";

export type LaunchItem = { label: string; kind: LaunchItemKind; note?: string };

export type LaunchPhase = {
  id: string;
  timeframe: string;
  title: string;
  summary: string;
  items: LaunchItem[];
  questions: string[];
  help: { label: string; href?: string }[];
};

export const LAUNCH_PHASES: LaunchPhase[] = [
  {
    id: "foundation",
    timeframe: "12+ weeks out",
    title: "Lay the foundation",
    summary:
      "Before anything gets designed, get clear on who you're for and make sure your name is actually available everywhere you'll need it.",
    items: [
      { label: "Define your ideal customer and what sets you apart", kind: "both" },
      { label: "Check your business name with your state and for trademarks", kind: "both" },
      { label: "Check that the matching domain name is available", kind: "digital" },
      { label: "Check social media handles on the platforms your customers use", kind: "digital" },
      { label: "Set a rough marketing budget and a target launch date", kind: "both" },
    ],
    questions: [
      "Who is your ideal customer, and where do they look for businesses like yours?",
      "What do you want people to say about you after their first visit?",
      "Who are your closest competitors, and how will you look different from them?",
      "Is the .com (or a close match) available for your name?",
      "Is your launch date fixed — a lease, an event, a season — or flexible?",
    ],
    help: [{ label: "A launch planning conversation — free, no obligation" }],
  },
  {
    id: "identity",
    timeframe: "8–12 weeks out",
    title: "Build your brand identity",
    summary:
      "Your logo, colors, and fonts will show up on everything from your website to your storefront, so they're worth getting right before anything else gets made.",
    items: [
      { label: "Logo, with versions for light and dark backgrounds", kind: "both" },
      { label: "Brand colors, with exact codes for screen and print", kind: "both", note: "Screens and printers mix color differently, so you need both." },
      { label: "Fonts for headlines and body text", kind: "both" },
      { label: "Logo files in every format: vector for print, PNG and SVG for web, a small icon for browser tabs", kind: "both" },
      { label: "A one-page brand guide so anyone can use your brand correctly", kind: "both" },
      { label: "Your voice: a short description, tagline, and how you talk to customers", kind: "both" },
    ],
    questions: [
      "What three words should people feel when they see your brand?",
      "Are there brands — in any industry — whose look you admire?",
      "Where will your logo appear most: a sign, a shirt, a phone screen, a van?",
      "Will anyone else (staff, printers, partners) need your logo files?",
    ],
    help: [{ label: "Logo and brand identity design" }],
  },
  {
    id: "online",
    timeframe: "6–8 weeks out",
    title: "Claim your online presence",
    summary:
      "Lock down the accounts and listings customers will use to find you, even before the website is finished.",
    items: [
      { label: "Register your domain name", kind: "digital" },
      { label: "Business email on your own domain (you@yourbusiness.com)", kind: "digital" },
      { label: "Create and verify your Google Business Profile", kind: "digital", note: "Verification can take a couple of weeks — start early." },
      { label: "Claim your social media handles and add your logo and bio", kind: "digital" },
      { label: "Plan your website: pages, content, photos, and whether you'll sell online", kind: "digital" },
      { label: "Schedule photos of your space, products, and team", kind: "both" },
    ],
    questions: [
      "Do customers need to book, buy, call, or visit? That decides what the site needs to do.",
      "Will you sell products online? How many, and how will you ship?",
      "Who will update the website after launch — you, your team, or someone else?",
      "Do you have photos, or do they need to be taken?",
    ],
    help: [
      { label: "Website planning", href: "/services/website-design-development" },
      { label: "Google Business Profile setup", href: "/services/search-ai-discovery/search-ai-update" },
    ],
  },
  {
    id: "website",
    timeframe: "4–6 weeks out",
    title: "Build your website",
    summary:
      "Design and build the site, ready for search engines and AI assistants from day one — not bolted on after launch.",
    items: [
      { label: "Website design and build", kind: "digital" },
      { label: "Online store setup, if you're selling (Shopify, BigCommerce, or Wix)", kind: "digital" },
      { label: "Titles, descriptions, and structured data for search and AI", kind: "digital" },
      { label: "Contact or quote form that sends to your inbox", kind: "digital" },
      { label: "Privacy policy and any required legal pages", kind: "digital" },
      { label: "Test on phones, tablets, and computers before launch", kind: "digital" },
    ],
    questions: [
      "What's the one action you most want visitors to take?",
      "Which services or products should be easiest to find?",
      "Do you need online booking, payments, or a customer login?",
      "What questions do customers ask most? Those make great website content.",
    ],
    help: [
      { label: "Website Design & Development", href: "/services/website-design-development" },
      { label: "E-Commerce Websites", href: "/services/website-design-development/e-commerce-websites" },
      { label: "Traditional Search + AI Discovery", href: "/services/search-ai-discovery" },
    ],
  },
  {
    id: "print",
    timeframe: "3–5 weeks out",
    title: "Get your print essentials ready",
    summary:
      "Printing and shipping take time, so order these well before opening day. Most need a proof round before they go to press.",
    items: [
      { label: "Business cards for you and your team", kind: "print" },
      { label: "Brochures, menus, rate sheets, or one-pagers", kind: "print" },
      { label: "Invoices, letterhead, and proposal or pitch templates", kind: "both" },
      { label: "Storefront, window, and yard signs or banners", kind: "print", note: "Check sign rules with your landlord and city before ordering." },
      { label: "Staff shirts and branded apparel", kind: "print" },
      { label: "Stickers, labels, or packaging, if you sell products", kind: "print" },
    ],
    questions: [
      "Where will people first see your business in person — a storefront, an event, a job site?",
      "How many business cards do you realistically need to start?",
      "Do you need signs for a building, a vehicle, or events?",
      "Will your team wear anything branded?",
    ],
    help: [
      { label: "Business Cards", href: "/services/business-printing/business-cards" },
      { label: "Brochures & Collateral", href: "/services/business-printing/brochures-collateral" },
      { label: "Yard Signs & Posters", href: "/services/signs-posters" },
      { label: "T-Shirts & Apparel", href: "/services/apparel" },
    ],
  },
  {
    id: "announce",
    timeframe: "2–4 weeks out",
    title: "Plan your launch marketing",
    summary: "Let people know you're coming, so opening day isn't the first time they hear about you.",
    items: [
      { label: "Grand-opening flyers, postcards, or posters", kind: "print" },
      { label: "Launch graphics for social media", kind: "digital" },
      { label: "An announcement email to friends, family, and early customers", kind: "digital" },
      { label: "A grand-opening offer or event", kind: "both" },
      { label: "List your business in local directories and your chamber of commerce", kind: "digital" },
      { label: "A plan for asking your first customers for reviews", kind: "digital" },
    ],
    questions: [
      "Is there a grand-opening event, offer, or giveaway?",
      "Who already knows you're opening, and how will you reach them?",
      "Are there neighbors, partners, or local groups who could help spread the word?",
    ],
    help: [
      { label: "Posters", href: "/services/signs-posters/posters" },
      { label: "Brochures & Collateral", href: "/services/business-printing/brochures-collateral" },
    ],
  },
  {
    id: "launch",
    timeframe: "Launch week",
    title: "Open the doors",
    summary: "A final check that everything is live, printed, and in place.",
    items: [
      { label: "Website live, with forms tested", kind: "digital" },
      { label: "Google Business Profile verified, with hours and photos", kind: "digital" },
      { label: "Signs up, business cards and brochures on hand", kind: "print" },
      { label: "Social posts scheduled for launch day", kind: "digital" },
      { label: "Staff in branded shirts", kind: "print" },
    ],
    questions: [
      "If a customer searches for you today, what do they find?",
      "Does everything — sign, site, cards, profile — show the same name, hours, and phone number?",
    ],
    help: [{ label: "A pre-launch check of your site and listings" }],
  },
  {
    id: "after",
    timeframe: "After launch",
    title: "Keep the momentum going",
    summary:
      "The first few months set the tone. Consistent upkeep is what keeps new customers finding you.",
    items: [
      { label: "Website updates as your business grows", kind: "digital" },
      { label: "Ongoing search and AI visibility work", kind: "digital" },
      { label: "Ask for reviews and respond to them", kind: "digital" },
      { label: "Seasonal promotions and corporate holiday cards", kind: "both" },
      { label: "Reorders of cards, brochures, and signage as details change", kind: "print" },
    ],
    questions: [
      "Who will keep your website, listings, and marketing current each month?",
      "What's working after 90 days, and what isn't?",
    ],
    help: [
      { label: "Marketing Partner Plan", href: "/#partner-plan" },
      { label: "Website Updates", href: "/services/website-design-development/website-updates" },
      { label: "Search + AI Monthly Retainer", href: "/services/search-ai-discovery/monthly-retainer" },
    ],
  },
];
