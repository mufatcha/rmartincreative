import {
  IconBriefcase,
  IconGift,
  IconGlobe,
  IconLayers,
  IconPassport,
  IconPhoto,
  IconRocket,
  IconShirt,
  IconSparkle,
} from "../components/icons";
import { PASSPORT_PAPERWORK, usd } from "./data/pricing";

// Shared by the quote form (client) and /api/quote (server), so the email can
// label every answer with the same question text the customer saw.

export type FieldType = "text" | "url" | "textarea" | "select" | "radio" | "checkboxes";

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
};

export type ServiceOption = {
  id: string;
  label: string;
  icon: typeof IconGlobe;
  questions: Field[];
  /** Helper text on the optional file-upload step. */
  fileHint: string;
};

export const SERVICES: ServiceOption[] = [
  {
    id: "launch",
    fileHint: "Anything you already have: a logo, sketches, a business plan, or examples you like.",
    label: "New Business Launch",
    icon: IconRocket,
    questions: [
      { id: "business", label: "Business name (or working name)", type: "text" },
      { id: "type", label: "What kind of business is it?", type: "text", placeholder: "e.g. bakery, landscaping, consulting" },
      { id: "launchDate", label: "Target launch date", type: "text" },
      {
        id: "have",
        label: "What do you already have?",
        type: "checkboxes",
        options: ["Business name", "Logo", "Domain name", "Website", "Business cards", "Signage", "Nothing yet"],
      },
      {
        id: "need",
        label: "What would you like help with?",
        type: "checkboxes",
        options: [
          "Logo & brand identity",
          "Website or online store",
          "Search + AI visibility",
          "Business cards & print",
          "Signs & posters",
          "Apparel",
          "Launch marketing",
          "All of it",
        ],
      },
    ],
  },
  {
    id: "partner",
    fileHint: "Logo, brand files, or anything that shows how your business looks today.",
    label: "Marketing Partner Plan",
    icon: IconSparkle,
    questions: [
      { id: "business", label: "Business name", type: "text" },
      { id: "currentSite", label: "Current website (if any)", type: "url", placeholder: "www.yourdomain.com" },
      {
        id: "areas",
        label: "Where do you need the most help?",
        type: "checkboxes",
        options: ["Website", "Search + AI visibility", "Print & signage", "Cards & client gifts", "Apparel", "Not sure yet"],
      },
      {
        id: "current",
        label: "Who handles your marketing today?",
        type: "select",
        options: ["I do it myself", "A part-time or full-time employee", "An agency or freelancers", "No one right now"],
      },
      { id: "goals", label: "What would you like marketing to do for your business this year?", type: "textarea" },
    ],
  },
  {
    id: "website",
    fileHint: "Logo, photos, or content for the site — whatever you have is fine.",
    label: "Website or Online Store",
    icon: IconGlobe,
    questions: [
      { id: "currentSite", label: "Current website (if any)", type: "url", placeholder: "www.yourdomain.com" },
      {
        id: "goal",
        label: "Main goal for the new site",
        type: "select",
        options: [
          "More leads or inquiries",
          "Sell products online",
          "Portfolio or showcase",
          "Full rebrand or refresh",
          "Not sure yet",
        ],
      },
      {
        id: "platform",
        label: "Preferred platform",
        type: "select",
        options: [
          "Not sure — recommend one",
          "Custom-built",
          "WordPress",
          "Headless CMS / web app",
          "Shopify",
          "BigCommerce",
          "Wix",
        ],
      },
      { id: "pages", label: "Roughly how many pages?", type: "select", options: ["1–3", "4–7", "8+", "Not sure"] },
      { id: "branding", label: "Do you have an existing logo and brand colors?", type: "radio", options: ["Yes", "No"] },
      { id: "ecommerce", label: "Do you need online selling / e-commerce?", type: "radio", options: ["Yes", "No"] },
      {
        id: "preview",
        label: "Want a private preview site to approve changes before they go live? (quoted add-on)",
        type: "radio",
        options: ["Yes", "No", "Tell me more"],
      },
      { id: "timeline", label: "Target launch date", type: "text" },
    ],
  },
  {
    id: "search-ai",
    fileHint: "Screenshots or reports from past search work, if you have them.",
    label: "Traditional Search + AI Discovery",
    icon: IconLayers,
    questions: [
      { id: "siteUrl", label: "Website URL", type: "url", placeholder: "www.yourdomain.com" },
      {
        id: "goal",
        label: "Main goal",
        type: "select",
        options: ["More phone calls", "More website leads", "Rank higher for specific searches", "Get recommended by AI assistants", "Not sure yet"],
      },
      { id: "keywords", label: "Services, products, or locations you want to be found for", type: "textarea" },
      { id: "ads", label: "Currently running paid ads (Google, Facebook, etc.)?", type: "radio", options: ["Yes", "No"] },
      { id: "timeline", label: "Target timeframe", type: "text" },
    ],
  },
  {
    id: "printing",
    fileHint: "Artwork, logo, or examples of pieces you like.",
    label: "Business Printing",
    icon: IconBriefcase,
    questions: [
      {
        id: "items",
        label: "What do you need printed?",
        type: "checkboxes",
        options: ["Business cards", "Letterhead", "Brochures", "Flyers", "Signage / banners", "Other"],
      },
      { id: "quantity", label: "Quantity needed", type: "text" },
      { id: "artwork", label: "Do you have existing artwork, or need a design created?", type: "radio", options: ["I have artwork", "I need a design"] },
      { id: "deadline", label: "Deadline", type: "text" },
    ],
  },
  {
    id: "cards",
    fileHint: "Photos for your card, or examples of designs you like.",
    label: "Holiday & Greeting Cards",
    icon: IconGift,
    questions: [
      {
        id: "cardType",
        label: "Card type",
        type: "select",
        options: ["Holiday / Christmas", "Birthday", "Photo card", "Other custom card"],
      },
      { id: "quantity", label: "Quantity needed", type: "text" },
      {
        id: "format",
        label: "Card format",
        type: "radio",
        options: ["Folded 5×7 (10×7 folded in half)", "Flat 5×7, printed both sides", "Not sure"],
      },
      {
        id: "corners",
        label: "Rounded corners? (flat cards only)",
        type: "radio",
        options: ["Yes", "No", "Not sure"],
      },
      { id: "photo", label: "Include a family or personal photo?", type: "radio", options: ["Yes", "No"] },
      { id: "style", label: "Design style", type: "select", options: ["Illustrated", "Photo-based", "Minimal / modern", "Not sure"] },
      {
        id: "extras",
        label: "Any finishing touches? (quoted per job)",
        type: "checkboxes",
        options: ["Addressing & mailing", "Wax seals", "Custom envelopes & liners", "“From Santa” gift tags", "None"],
      },
      { id: "deadline", label: "Needed by (mailing date)", type: "text" },
    ],
  },
  {
    id: "photos",
    fileHint: "Add the photos you’d like help with — full-size scans are best, but a quick phone snapshot is fine for a quote.",
    label: "Photo-to-Digital & Restoration",
    icon: IconPhoto,
    questions: [
      {
        id: "media",
        label: "What do you have?",
        type: "checkboxes",
        options: ["Printed photos", "Slides", "Negatives", "Damaged or faded photos", "Other"],
      },
      { id: "quantity", label: "Roughly how many?", type: "text" },
      {
        id: "restore",
        label: "Do any need repair or color restoration?",
        type: "radio",
        options: ["Yes", "No", "Not sure"],
      },
      { id: "deadline", label: "Needed by (if there's a date)", type: "text" },
    ],
  },
  {
    id: "passport",
    fileHint: "If you'd like your own photo made passport-compliant, add it here.",
    label: "Passport Photos",
    icon: IconPassport,
    questions: [
      {
        id: "how",
        label: "How would you like your photos?",
        type: "radio",
        options: ["Visit at my home", "Visit at my business", "Make my own photo compliant"],
      },
      { id: "people", label: "How many people need passport photos?", type: "text" },
      {
        id: "paperwork",
        label: `Want your application filled out and printed? (${usd(PASSPORT_PAPERWORK)})`,
        type: "radio",
        options: ["Yes — first-time application", "Yes — renewal by mail", "No thanks", "Not sure"],
      },
      { id: "town", label: "Town (for a visit)", type: "text" },
      {
        id: "delivery",
        label: "How should your printed photos get to you?",
        type: "radio",
        options: ["Free USPS mail (3–4 business days)", "Same-day hand delivery (quoted)", "Not sure"],
      },
      { id: "deadline", label: "Needed by", type: "text" },
    ],
  },
  {
    id: "apparel",
    fileHint: "Artwork, logo, or a sketch of your idea.",
    label: "Apparel",
    icon: IconShirt,
    questions: [
      { id: "apparelType", label: "Type of apparel", type: "checkboxes", options: ["T-shirts", "Hoodies", "Hats", "Other"] },
      { id: "quantity", label: "Approximate quantity & sizes", type: "textarea" },
      { id: "design", label: "Do you have artwork, or need a design created?", type: "radio", options: ["I have artwork", "I need a design"] },
      { id: "colors", label: "How many colors in the design (if known)?", type: "text" },
      { id: "deadline", label: "Deadline", type: "text" },
    ],
  },
];

export function getQuoteService(id: string): ServiceOption | undefined {
  return SERVICES.find((s) => s.id === id);
}
