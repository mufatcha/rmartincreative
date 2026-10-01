// Content for the About page (/about). Fill in the TODO fields, add your photo,
// then set `published: true` — until then the page only shows on the dev
// server (as a draft) and isn't linked, listed in the sitemap, or live.

export const ABOUT = {
  /** Flip to true once the TODOs below are filled in. */
  published: false,

  /** Your headshot or a photo of you at work. Save it to public/webp-assets/ and set the path, e.g. "/webp-assets/ryan-martin.webp". */
  photo: null as { src: string; alt: string } | null,

  /** Short role line under your name, e.g. "Designer, developer & print partner for small businesses". */
  role: "TODO: your role in one line",

  /** 1–2 sentences: who you are and who you help. This is the first thing people (and AI) read. */
  intro: "TODO: Who you are and who you help, in one or two sentences.",

  /** How you started. 2–3 short paragraphs. Prompts:
   *  - What got you into design (or code, or print) in the first place?
   *  - What was your first real project or job?
   *  - How did it grow into designing, building, and printing for businesses? */
  story: [
    "TODO: How you got started.",
    "TODO: How it grew into what you do now.",
  ],

  /** Experience at a glance — short, factual, and only what's true. Examples:
   *  "20+ years designing and building websites", "Print work for 1,000+ projects",
   *  "Former in-house designer at …", a degree, certification, or award. */
  highlights: [
    "TODO: e.g. 20+ years of website design & development",
    "TODO: e.g. a past role, credential, or milestone",
    "TODO: e.g. a notable client type or project",
  ],

  /** How you work with clients — 3 short points. Prompts: what clients can always count on, what makes working with you different. */
  approach: [
    { title: "TODO: e.g. One point of contact", body: "TODO: one or two sentences." },
    { title: "TODO: e.g. Proofs before anything prints", body: "TODO: one or two sentences." },
    { title: "TODO: e.g. Local and reachable", body: "TODO: one or two sentences." },
  ],

  /** Optional: life outside work — your Richmond roots, FeedTheFlames, family, hobbies. 1 short paragraph, or "" to hide. */
  personal: "TODO: optional — a little about you outside work, or leave empty.",
};

/** True when any field still contains a TODO — the page shows a draft banner in dev. */
export function aboutHasTodos(): boolean {
  return JSON.stringify(ABOUT).includes("TODO");
}
