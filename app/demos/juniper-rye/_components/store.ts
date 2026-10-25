// Content and editing state for the Juniper & Rye CMS demo. There's no real CMS
// behind it: one reducer holds the draft, the published version, and the version
// history, the way a headless CMS separates editing from what's live.

export type ImageId = string;

export type MediaItem = { id: ImageId; src: string; thumb: string; alt: string; width: number; height: number; uploaded?: boolean };

export type MenuCategory = "Bread" | "Pastry" | "Seasonal";
export const MENU_CATEGORIES: MenuCategory[] = ["Bread", "Pastry", "Seasonal"];

export type MenuItem = { id: string; name: string; description: string; price: number; category: MenuCategory; soldOut: boolean };

export type DayHours = { day: string; open: string; close: string; closed: boolean };

export type FontChoice = "serif" | "sans" | "script";

export type Content = {
  home: { headline: string; subhead: string; cta: string; heroImage: ImageId; seoTitle: string; seoDescription: string };
  menu: MenuItem[];
  special: { enabled: boolean; title: string; body: string; starts: string; ends: string; image: ImageId };
  hours: DayHours[];
  settings: { brandColor: string; font: FontChoice; announcementOn: boolean; announcement: string };
  media: MediaItem[];
};

export type Version = { id: string; label: string; at: string; author: string; content: Content };

export type Role = "owner" | "staff";

export type StudioState = {
  draft: Content;
  published: Content;
  history: Version[];
  role: Role;
};

const IMG = "/webp-assets/demos/juniper-rye";

export const INITIAL_MEDIA: MediaItem[] = [
  { id: "sourdough", src: `${IMG}/sourdough.webp`, thumb: `${IMG}/sourdough-thumb.webp`, alt: "Sourdough loaves dusted with flour on a wooden board", width: 1600, height: 897 },
  { id: "croissants", src: `${IMG}/croissants.webp`, thumb: `${IMG}/croissants-thumb.webp`, alt: "Golden butter croissants on the bakery counter", width: 1600, height: 1068 },
  { id: "shop", src: `${IMG}/shop.webp`, thumb: `${IMG}/shop-thumb.webp`, alt: "Pastry cases and shelves of fresh bread inside the bakery", width: 1600, height: 1065 },
  { id: "cinnamon-rolls", src: `${IMG}/cinnamon-rolls.webp`, thumb: `${IMG}/cinnamon-rolls-thumb.webp`, alt: "Glazed cinnamon rolls beside a cup of black coffee", width: 1600, height: 1068 },
  { id: "apple-pie", src: `${IMG}/apple-pie.webp`, thumb: `${IMG}/apple-pie-thumb.webp`, alt: "Lattice-top apple pie with fresh apples", width: 1600, height: 1087 },
  { id: "loaves", src: `${IMG}/loaves.webp`, thumb: `${IMG}/loaves-thumb.webp`, alt: "Crusty round loaves stacked on the bakery counter", width: 1600, height: 1144 },
];

export const INITIAL_CONTENT: Content = {
  home: {
    headline: "Baked before sunrise. Gone by noon.",
    subhead: "Naturally leavened bread, laminated pastries, and seasonal pies, made from scratch every morning on Main Street.",
    cta: "See today's menu",
    heroImage: "sourdough",
    seoTitle: "Juniper & Rye Bakery | Sourdough & Pastries on Main Street",
    seoDescription: "Small-batch sourdough, butter croissants, and seasonal pies baked fresh every morning. Order ahead for pickup or stop in. Open Tuesday through Sunday.",
  },
  menu: [
    { id: "m1", name: "Country Sourdough", description: "Our 36-hour naturally leavened loaf with a crackling crust.", price: 9, category: "Bread", soldOut: false },
    { id: "m2", name: "Seeded Rye", description: "Dark rye with sunflower, flax, and caraway.", price: 10, category: "Bread", soldOut: false },
    { id: "m3", name: "Butter Croissant", description: "Three days of lamination, 27 flaky layers.", price: 4.5, category: "Pastry", soldOut: false },
    { id: "m4", name: "Cardamom Cinnamon Roll", description: "Brown butter, cardamom sugar, cream cheese glaze.", price: 5, category: "Pastry", soldOut: true },
    { id: "m5", name: "Lattice Apple Pie", description: "Local orchard apples in an all-butter crust. Whole pies only.", price: 32, category: "Seasonal", soldOut: false },
  ],
  special: {
    enabled: true,
    title: "Holiday pie pre-orders are open",
    body: "Reserve apple, pumpkin, or bourbon pecan pies for holiday pickup. Limited to 120 pies, so order early.",
    starts: "2026-10-15",
    ends: "2026-12-24",
    image: "apple-pie",
  },
  hours: [
    { day: "Monday", open: "07:00", close: "14:00", closed: true },
    { day: "Tuesday", open: "07:00", close: "14:00", closed: false },
    { day: "Wednesday", open: "07:00", close: "14:00", closed: false },
    { day: "Thursday", open: "07:00", close: "14:00", closed: false },
    { day: "Friday", open: "07:00", close: "16:00", closed: false },
    { day: "Saturday", open: "07:00", close: "16:00", closed: false },
    { day: "Sunday", open: "08:00", close: "13:00", closed: false },
  ],
  settings: { brandColor: "#9a3412", font: "serif", announcementOn: true, announcement: "Now taking holiday cookie box orders · Free local delivery over $40" },
  media: INITIAL_MEDIA,
};

const OLDER_CONTENT: Content = {
  ...INITIAL_CONTENT,
  home: { ...INITIAL_CONTENT.home, headline: "Fresh bread, every single morning.", heroImage: "loaves" },
  special: { ...INITIAL_CONTENT.special, enabled: false },
};

export const INITIAL_STATE: StudioState = {
  draft: INITIAL_CONTENT,
  published: INITIAL_CONTENT,
  role: "owner",
  history: [
    { id: "v2", label: "Fall menu and pie pre-orders", at: "2026-10-30T09:12:00", author: "Maya (Owner)", content: INITIAL_CONTENT },
    { id: "v1", label: "Site launch", at: "2026-09-02T16:40:00", author: "Maya (Owner)", content: OLDER_CONTENT },
  ],
};

/** A date `days` from `now`, as YYYY-MM-DD in the bakery's time zone. */
function isoDay(now: Date, days: number) {
  return new Date(now.getTime() + days * 86_400_000).toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
}

/**
 * The starting state with the special's dates set around today, so it's showing
 * whenever the demo is opened. Called only in the browser (on load and on Reset);
 * the server render uses the fixed INITIAL_STATE.
 */
export function freshInitialState(now = new Date()): StudioState {
  const special = { ...INITIAL_CONTENT.special, starts: isoDay(now, -7), ends: isoDay(now, 30) };
  const content = { ...INITIAL_CONTENT, special };
  return {
    ...INITIAL_STATE,
    draft: content,
    published: content,
    history: INITIAL_STATE.history.map((v) => (v.id === "v2" ? { ...v, content } : v)),
  };
}

export type Action =
  | { type: "edit"; update: (draft: Content) => Content }
  | { type: "publish"; label: string; author: string; at: string }
  | { type: "discard" }
  | { type: "restore"; versionId: string }
  | { type: "role"; role: Role }
  | { type: "reset"; state: StudioState };

export function reducer(state: StudioState, action: Action): StudioState {
  switch (action.type) {
    case "edit":
      return { ...state, draft: action.update(state.draft) };
    case "publish":
      return {
        ...state,
        published: state.draft,
        history: [
          { id: `v${Date.parse(action.at)}`, label: action.label, at: action.at, author: action.author, content: state.draft },
          ...state.history,
        ],
      };
    case "discard":
      return { ...state, draft: state.published };
    case "restore": {
      const version = state.history.find((v) => v.id === action.versionId);
      return version ? { ...state, draft: version.content } : state;
    }
    case "role":
      return { ...state, role: action.role };
    case "reset":
      return action.state;
  }
}

/** Plain-English labels for every changed field between two versions, for "3 unpublished changes". */
export function describeChanges(from: Content, to: Content): string[] {
  const changes: string[] = [];
  const homeLabels: Record<keyof Content["home"], string> = {
    headline: "Home headline",
    subhead: "Home intro",
    cta: "Button text",
    heroImage: "Hero photo",
    seoTitle: "Search title",
    seoDescription: "Search description",
  };
  for (const key of Object.keys(homeLabels) as (keyof Content["home"])[]) {
    if (from.home[key] !== to.home[key]) changes.push(homeLabels[key]);
  }

  const fromMenu = new Map(from.menu.map((m) => [m.id, m]));
  const toIds = new Set(to.menu.map((m) => m.id));
  for (const item of to.menu) {
    const before = fromMenu.get(item.id);
    if (!before) changes.push(`Added “${item.name || "New item"}”`);
    else if (JSON.stringify(before) !== JSON.stringify(item)) changes.push(`Menu: ${item.name}`);
  }
  for (const item of from.menu) if (!toIds.has(item.id)) changes.push(`Removed “${item.name}”`);
  if (from.menu.length === to.menu.length && from.menu.some((m, i) => to.menu[i]?.id !== m.id)) changes.push("Menu order");

  if (JSON.stringify(from.special) !== JSON.stringify(to.special)) changes.push("Holiday special");
  if (JSON.stringify(from.hours) !== JSON.stringify(to.hours)) changes.push("Opening hours");
  if (JSON.stringify(from.settings) !== JSON.stringify(to.settings)) changes.push("Brand settings");
  if (JSON.stringify(from.media.map((m) => [m.id, m.alt])) !== JSON.stringify(to.media.map((m) => [m.id, m.alt]))) changes.push("Media library");
  return changes;
}

export const STORAGE_KEY = "juniper-rye-studio-v1";

/** The saved demo state, minus uploaded images (their blob: links don't survive a reload). */
export function loadSaved(): StudioState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshInitialState();
    const saved = JSON.parse(raw) as StudioState;
    if (!saved?.draft?.home || !saved?.published?.home) return freshInitialState();
    return saved;
  } catch {
    return freshInitialState();
  }
}

function withoutUploads(content: Content): Content {
  const media = content.media.filter((m) => !m.uploaded);
  const fallback = (id: ImageId) => (media.some((m) => m.id === id) ? id : "sourdough");
  return {
    ...content,
    media,
    home: { ...content.home, heroImage: fallback(content.home.heroImage) },
    special: { ...content.special, image: fallback(content.special.image) },
  };
}

export function save(state: StudioState) {
  try {
    const clean: StudioState = {
      ...state,
      draft: withoutUploads(state.draft),
      published: withoutUploads(state.published),
      history: state.history.map((v) => ({ ...v, content: withoutUploads(v.content) })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch {}
}

export function clearSaved() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function mediaById(content: Content, id: ImageId): MediaItem {
  return content.media.find((m) => m.id === id) ?? content.media[0] ?? INITIAL_MEDIA[0];
}

export function formatPrice(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

/** "07:00" → "7 am", "13:30" → "1:30 pm". */
export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}
