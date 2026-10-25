"use client";

import Image from "next/image";
import { useRef } from "react";
import { Feature } from "../../notes";
import { Card, INPUT, LockIcon, TextField, Toggle } from "./fields";
import { MENU_CATEGORIES, type Content, type ImageId, type MenuCategory, type MenuItem, type Role } from "./store";

export type PanelProps = {
  content: Content;
  edit: (update: (draft: Content) => Content) => void;
  role: Role;
};

function StaffNote({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-amber-200">
      <LockIcon />
      {children}
    </p>
  );
}

/** A row of media thumbnails to pick one from. */
function ImagePicker({ content, value, onChange, locked = false }: { content: Content; value: ImageId; onChange: (id: ImageId) => void; locked?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Choose a photo">
      {content.media.map((m) => (
        <button
          key={m.id}
          type="button"
          role="radio"
          aria-checked={m.id === value}
          aria-label={m.alt}
          disabled={locked}
          onClick={() => onChange(m.id)}
          className={`relative aspect-[4/3] overflow-hidden rounded-lg ring-2 transition disabled:cursor-not-allowed ${
            m.id === value ? "ring-violet-600" : "ring-transparent hover:ring-ink/20"
          }`}
        >
          <Image src={m.thumb} alt="" fill sizes="120px" className="object-cover" unoptimized={m.uploaded} />
        </button>
      ))}
    </div>
  );
}

// ---------- Home page ----------

export function HomePanel({ content, edit, role }: PanelProps) {
  const { home } = content;
  const locked = role === "staff";
  const set = (patch: Partial<Content["home"]>) => edit((d) => ({ ...d, home: { ...d.home, ...patch } }));

  return (
    <div className="space-y-4">
      {locked && <StaffNote>Only the owner can change the home page. Staff can update specials, hours, and what&rsquo;s sold out.</StaffNote>}
      <Card title="Hero" description="The first thing visitors see. Type here and watch the preview update.">
        <TextField label="Headline" value={home.headline} onChange={(v) => set({ headline: v })} max={60} locked={locked} />
        <TextField label="Intro" value={home.subhead} onChange={(v) => set({ subhead: v })} max={180} multiline locked={locked} />
        <TextField label="Button text" value={home.cta} onChange={(v) => set({ cta: v })} max={28} locked={locked} />
        <div>
          <p className="text-xs font-semibold">Hero photo</p>
          <div className="mt-1.5">
            <ImagePicker content={content} value={home.heroImage} onChange={(id) => set({ heroImage: id })} locked={locked} />
          </div>
        </div>
      </Card>
      <Feature
        title="Search and AI settings per page"
        what="Each page gets its own search title and description, with live character counters and a preview of how it shows up on Google."
        why="Owners can tune how they appear in search without touching code, and the counters keep text from getting cut off."
        tech="Content model fields mapped to the page's <title>, meta description, and structured data at build time"
        className="rounded-2xl"
      >
        <Card title="Search & AI listing" description="How this page appears on Google and in AI answers.">
          <TextField label="Search title" value={home.seoTitle} onChange={(v) => set({ seoTitle: v })} max={60} locked={locked} />
          <TextField label="Search description" value={home.seoDescription} onChange={(v) => set({ seoDescription: v })} max={160} multiline locked={locked} />
          <div className="rounded-xl bg-paper-tint/60 p-4 ring-1 ring-ink/5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Google preview</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-[#202124]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: content.settings.brandColor }}>
                J
              </span>
              <span>
                Juniper &amp; Rye Bakery
                <span className="block text-[11px] text-[#4d5156]">https://juniperrye.example</span>
              </span>
            </p>
            <p className="mt-2 line-clamp-1 text-lg leading-snug text-[#1a0dab]">{home.seoTitle.length > 60 ? `${home.seoTitle.slice(0, 57)}…` : home.seoTitle || "Untitled page"}</p>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-[#4d5156]">
              {home.seoDescription.length > 160 ? `${home.seoDescription.slice(0, 157)}…` : home.seoDescription}
            </p>
          </div>
        </Card>
      </Feature>
    </div>
  );
}

// ---------- Menu ----------

let nextId = 1;

export function MenuPanel({ content, edit, role }: PanelProps) {
  const owner = role === "owner";
  const update = (id: string, patch: Partial<MenuItem>) =>
    edit((d) => ({ ...d, menu: d.menu.map((m) => (m.id === id ? { ...m, ...patch } : m)) }));
  const move = (index: number, by: number) =>
    edit((d) => {
      const menu = [...d.menu];
      const [item] = menu.splice(index, 1);
      menu.splice(index + by, 0, item);
      return { ...d, menu };
    });
  const remove = (id: string) => edit((d) => ({ ...d, menu: d.menu.filter((m) => m.id !== id) }));
  const add = () =>
    edit((d) => ({
      ...d,
      menu: [...d.menu, { id: `new-${Date.now()}-${nextId++}`, name: "New item", description: "", price: 6, category: "Pastry", soldOut: false }],
    }));

  return (
    <Feature
      title="Structured content"
      what="The menu is a list of items with fields (name, price, category, sold out) instead of one big block of text. Add, reorder, or mark items sold out."
      why="Staff can update what's available in seconds from a phone, and the same menu can feed the website, an online ordering page, and Google."
      tech="Headless CMS content model (repeatable entries with typed fields), delivered to the site as JSON"
      className="rounded-2xl"
    >
      <div className="space-y-3">
        {!owner && <StaffNote>Staff can mark items sold out. Prices, names, and adding or removing items are owner-only.</StaffNote>}
        {content.menu.map((item, i) => (
          <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/10">
            <div className="flex items-start gap-2">
              <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_6.5rem]">
                <label className="block">
                  <span className="sr-only">Item name</span>
                  <input value={item.name} disabled={!owner} onChange={(e) => update(item.id, { name: e.target.value })} className={`${INPUT} font-semibold`} />
                </label>
                <label className="relative block">
                  <span className="sr-only">Price</span>
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">$</span>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={item.price}
                    disabled={!owner}
                    onChange={(e) => update(item.id, { price: Math.max(0, Number(e.target.value) || 0) })}
                    className={`${INPUT} pl-6 tabular-nums`}
                  />
                  {!owner && <LockIcon className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-soft" />}
                </label>
              </div>
              <div className="flex flex-col">
                <button type="button" aria-label={`Move ${item.name} up`} disabled={!owner || i === 0} onClick={() => move(i, -1)} className="rounded p-1 text-ink-soft hover:bg-paper-tint disabled:opacity-30">
                  ▲
                </button>
                <button type="button" aria-label={`Move ${item.name} down`} disabled={!owner || i === content.menu.length - 1} onClick={() => move(i, 1)} className="rounded p-1 text-ink-soft hover:bg-paper-tint disabled:opacity-30">
                  ▼
                </button>
              </div>
            </div>
            <label className="mt-2 block">
              <span className="sr-only">Description</span>
              <input value={item.description} disabled={!owner} placeholder="Short description" onChange={(e) => update(item.id, { description: e.target.value })} className={INPUT} />
            </label>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <select
                  aria-label="Category"
                  value={item.category}
                  disabled={!owner}
                  onChange={(e) => update(item.id, { category: e.target.value as MenuCategory })}
                  className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs disabled:bg-paper-tint"
                >
                  {MENU_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <Toggle label="Sold out" checked={item.soldOut} onChange={(v) => update(item.id, { soldOut: v })} />
              </div>
              <button type="button" disabled={!owner} onClick={() => remove(item.id)} className="text-xs font-semibold text-rose-600 hover:underline disabled:opacity-30 disabled:no-underline">
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          disabled={!owner}
          className="w-full rounded-2xl border-2 border-dashed border-ink/15 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-violet-400 hover:text-violet-700 disabled:opacity-40"
        >
          + Add menu item
        </button>
      </div>
    </Feature>
  );
}

// ---------- Specials ----------

export function SpecialsPanel({ content, edit }: PanelProps) {
  const { special } = content;
  const set = (patch: Partial<Content["special"]>) => edit((d) => ({ ...d, special: { ...d.special, ...patch } }));

  return (
    <Feature
      title="Scheduled content"
      what="The holiday banner has start and end dates. It appears on the site on the start date and takes itself down after the end date."
      why="Set up a promotion once, ahead of time, and never forget to remove an expired offer."
      tech="Publish and unpublish dates on a CMS entry, checked when the page renders"
      className="rounded-2xl"
    >
      <Card title="Holiday special" description="A banner on the home page for a limited-time offer.">
        <Toggle label="Show this special" checked={special.enabled} onChange={(v) => set({ enabled: v })} />
        <TextField label="Title" value={special.title} onChange={(v) => set({ title: v })} max={60} />
        <TextField label="Details" value={special.body} onChange={(v) => set({ body: v })} max={200} multiline />
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-semibold">
            Starts
            <input type="date" value={special.starts} onChange={(e) => set({ starts: e.target.value })} className={`mt-1.5 ${INPUT}`} />
          </label>
          <label className="block text-xs font-semibold">
            Ends
            <input type="date" value={special.ends} onChange={(e) => set({ ends: e.target.value })} className={`mt-1.5 ${INPUT}`} />
          </label>
        </div>
        <div>
          <p className="text-xs font-semibold">Photo</p>
          <div className="mt-1.5">
            <ImagePicker content={content} value={special.image} onChange={(id) => set({ image: id })} />
          </div>
        </div>
      </Card>
    </Feature>
  );
}

// ---------- Hours ----------

export function HoursPanel({ content, edit }: PanelProps) {
  const update = (day: string, patch: Partial<Content["hours"][number]>) =>
    edit((d) => ({ ...d, hours: d.hours.map((h) => (h.day === day ? { ...h, ...patch } : h)) }));

  return (
    <Card title="Opening hours" description="The site shows “Open now” or “Closed” automatically, based on the time in Central time.">
      <ul className="space-y-2.5">
        {content.hours.map((h) => (
          <li key={h.day} className="grid grid-cols-[5.5rem_1fr] items-center gap-2 text-sm">
            <span className="font-medium">{h.day}</span>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle label={h.closed ? "Closed" : "Open"} checked={!h.closed} onChange={(open) => update(h.day, { closed: !open })} />
              {!h.closed && (
                <span className="flex items-center gap-1">
                  <input type="time" aria-label={`${h.day} opening time`} value={h.open} onChange={(e) => update(h.day, { open: e.target.value })} className="rounded-lg border border-ink/15 px-2 py-1 text-xs" />
                  <span className="text-ink-soft">–</span>
                  <input type="time" aria-label={`${h.day} closing time`} value={h.close} onChange={(e) => update(h.day, { close: e.target.value })} className="rounded-lg border border-ink/15 px-2 py-1 text-xs" />
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ---------- Media ----------

export function MediaPanel({ content, edit, role }: PanelProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const owner = role === "owner";
  const setAlt = (id: string, alt: string) => edit((d) => ({ ...d, media: d.media.map((m) => (m.id === id ? { ...m, alt } : m)) }));

  function upload(files: FileList | null) {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const src = URL.createObjectURL(file);
    const id = `upload-${Date.now()}`;
    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    edit((d) => ({ ...d, media: [{ id, src, thumb: src, alt, width: 1600, height: 1200, uploaded: true }, ...d.media] }));
  }

  return (
    <Feature
      title="Media library with alt text"
      what="Every photo lives in one library with its own description (alt text). Upload a new photo and use it anywhere on the site."
      why="Photos get optimized automatically, and descriptions help Google Images, AI search, and visitors using screen readers."
      tech="CMS asset library + Next.js <Image>: resized, converted to WebP, and lazy-loaded for each screen size"
      className="rounded-2xl"
    >
      <Card title="Media library" description="Photos used across the site. Uploads stay in this browser tab for the demo.">
        <button
          type="button"
          disabled={!owner}
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-xl border-2 border-dashed border-ink/15 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-violet-400 hover:text-violet-700 disabled:opacity-40"
        >
          + Upload a photo
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files)} />
        <ul className="space-y-3">
          {content.media.map((m) => (
            <li key={m.id} className="flex gap-3">
              <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-paper-tint">
                <Image src={m.thumb} alt="" fill sizes="80px" className="object-cover" unoptimized={m.uploaded} />
              </span>
              <label className="block flex-1">
                <span className="text-[11px] font-semibold text-ink-soft">
                  Description (alt text){" "}
                  {(content.home.heroImage === m.id || content.special.image === m.id) && <span className="ml-1 rounded bg-violet-100 px-1.5 py-0.5 text-violet-700">In use</span>}
                </span>
                <input value={m.alt} disabled={!owner} onChange={(e) => setAlt(m.id, e.target.value)} className={`mt-1 ${INPUT} py-1.5 text-xs`} />
              </label>
            </li>
          ))}
        </ul>
      </Card>
    </Feature>
  );
}

// ---------- Settings ----------

const COLORS = [
  { name: "Terracotta", value: "#9a3412" },
  { name: "Juniper", value: "#2f5d50" },
  { name: "Plum", value: "#6b2d5c" },
  { name: "Navy", value: "#1e3a5f" },
  { name: "Mustard", value: "#a16207" },
];

const FONT_OPTIONS = [
  { value: "serif", label: "Classic", sample: "var(--font-jr-serif), Georgia, serif" },
  { value: "sans", label: "Modern", sample: "var(--font-geist-sans), sans-serif" },
  { value: "script", label: "Handwritten", sample: "var(--font-jr-script), cursive" },
] as const;

export function SettingsPanel({ content, edit, role }: PanelProps) {
  const { settings } = content;
  const owner = role === "owner";
  const set = (patch: Partial<Content["settings"]>) => edit((d) => ({ ...d, settings: { ...d.settings, ...patch } }));

  return (
    <div className="space-y-4">
      {!owner && <StaffNote>Brand settings are owner-only, so the look of the site stays consistent.</StaffNote>}
      <Feature
        title="Brand settings that restyle the whole site"
        what="Pick a brand color or font and every button, heading, and banner on the site updates at once."
        why="Seasonal refreshes or a rebrand take minutes, and nobody can accidentally break the design."
        tech="Design tokens stored in the CMS and applied as CSS variables"
        className="rounded-2xl"
      >
        <Card title="Brand">
          <div>
            <p className="text-xs font-semibold">Brand color</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  disabled={!owner}
                  aria-label={c.name}
                  aria-pressed={settings.brandColor === c.value}
                  onClick={() => set({ brandColor: c.value })}
                  className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition disabled:cursor-not-allowed ${settings.brandColor === c.value ? "ring-ink" : "ring-transparent"}`}
                  style={{ background: c.value }}
                />
              ))}
              <label className="flex items-center gap-2 text-xs text-ink-soft">
                <input type="color" disabled={!owner} value={settings.brandColor} onChange={(e) => set({ brandColor: e.target.value })} className="h-8 w-10 cursor-pointer rounded border border-ink/15 disabled:cursor-not-allowed" />
                Custom
              </label>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold">Heading font</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  disabled={!owner}
                  aria-pressed={settings.font === f.value}
                  onClick={() => set({ font: f.value })}
                  className={`rounded-xl border px-2 py-3 text-center transition disabled:cursor-not-allowed ${settings.font === f.value ? "border-violet-600 bg-violet-50" : "border-ink/15 hover:border-ink/30"}`}
                >
                  <span className="block text-xl leading-none" style={{ fontFamily: f.sample }}>
                    Aa
                  </span>
                  <span className="mt-1 block text-[11px] text-ink-soft">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </Feature>
      <Card title="Announcement bar" description="A thin banner across the top of every page.">
        <Toggle label="Show announcement" checked={settings.announcementOn} onChange={(v) => set({ announcementOn: v })} disabled={!owner} />
        <TextField label="Message" value={settings.announcement} onChange={(v) => set({ announcement: v })} max={90} locked={!owner} />
      </Card>
    </div>
  );
}
