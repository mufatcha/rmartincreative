// The "Add starter sections" button on the admin page. A general website and
// branding kickoff; edit, reorder, or delete anything per client afterward.
import type { FieldType, ItemKind } from "./types";

type TemplateItem = { kind: ItemKind; title: string; help?: string; fieldType?: FieldType; options?: string[] };

export const STARTER_TEMPLATE: { title: string; items: TemplateItem[] }[] = [
  {
    title: "Business basics",
    items: [
      { kind: "question", title: "Business name, exactly as it should appear", fieldType: "text" },
      { kind: "question", title: "Best phone number for customers", fieldType: "phone" },
      { kind: "question", title: "Best email for customers", fieldType: "email" },
      { kind: "question", title: "Business address or service area", fieldType: "textarea", help: "Leave the street address out if you don't want it shown." },
      { kind: "question", title: "Hours", fieldType: "textarea", help: "For example: Mon–Fri 8am–5pm, Sat by appointment." },
      { kind: "question", title: "In a sentence or two, what do you do and who for?", fieldType: "textarea" },
      { kind: "question", title: "Your main services or products", fieldType: "textarea", help: "One per line is perfect. Add prices if you'd like them shown." },
    ],
  },
  {
    title: "Goals & style",
    items: [
      {
        kind: "question",
        title: "What should the new site do most?",
        fieldType: "checkboxes",
        options: ["Get phone calls", "Get quote or contact requests", "Show my work", "Sell online", "Take bookings", "Look more professional"],
      },
      { kind: "question", title: "Who are your best customers?", fieldType: "textarea" },
      { kind: "question", title: "Websites you like (any industry), and what you like about them", fieldType: "textarea" },
      { kind: "question", title: "Competitors we should know about", fieldType: "textarea" },
      { kind: "question", title: "Anything you definitely don't want?", fieldType: "textarea" },
    ],
  },
  {
    title: "Photos, video & logo",
    items: [
      { kind: "upload", title: "Your logo", help: "The best version you have: a vector file (AI, EPS, SVG, PDF) if possible, otherwise a large PNG." },
      { kind: "upload", title: "Photos of your work", help: "Straight from your phone is fine. More is better; I'll pick the best." },
      { kind: "upload", title: "Photos of you or your team", help: "Optional, but they help people trust a local business." },
      { kind: "upload", title: "Video clips", help: "Short clips of work in progress, before-and-afters, or a quick hello. Any length works." },
    ],
  },
  {
    title: "Accounts & access",
    items: [
      { kind: "question", title: "Do you already own a domain name? Which one, and where is it registered?", fieldType: "textarea" },
      { kind: "question", title: "Current website address, if you have one", fieldType: "url" },
      { kind: "question", title: "Social media pages", fieldType: "textarea", help: "Paste the links, one per line." },
      { kind: "task", title: "Add me as a manager on your Google Business Profile", help: "I'll send instructions in the chat." },
      { kind: "task", title: "Review the first draft of the site" },
    ],
  },
];
