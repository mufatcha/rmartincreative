// Shared links (Figma, YouTube, Google Docs…) as versions of a shared file.
// They're stored as rows in `files` like uploads, with the URL in r2_key and
// one of these types, so comments and approvals work the same way.

/** A pasted URL: embedded when we know how, otherwise shown as a link. */
export const LINK_TYPE = "link/url";
/** A pasted <iframe> embed code: its src is embedded as-is. */
export const EMBED_TYPE = "link/embed";

export const isLinkType = (type: string) => type === LINK_TYPE || type === EMBED_TYPE;

function parse(raw: string): URL | null {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u : null;
  } catch {
    return null;
  }
}

const FIGMA_KINDS = ["design", "file", "proto", "board", "slides", "deck"];

/** Turns a pasted URL or <iframe> code into what we store, or an error. */
export function cleanLink(input: unknown): { url: string; type: string; name: string } | { error: string } {
  const raw = typeof input === "string" ? input.trim() : "";
  if (!raw) return { error: "Paste a link first." };
  let url: URL | null;
  let type = LINK_TYPE;
  if (raw.startsWith("<")) {
    const src = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(raw)?.[1].replace(/&amp;/g, "&");
    url = src ? parse(src) : null;
    if (!url) return { error: "That embed code has no https:// src." };
    type = EMBED_TYPE;
  } else {
    url = parse(raw);
    if (!url) return { error: "Links need to start with https://" };
  }
  if (url.href.length > 2000) return { error: "That link is too long." };
  return { url: url.href, type, name: linkName(url.href) };
}

/** "Logo Concepts (Figma)", "docs.google.com"… */
export function linkName(href: string): string {
  const u = parse(href);
  if (!u) return "Link";
  const host = u.hostname.replace(/^www\./, "");
  if (host.endsWith("figma.com")) {
    // figma.com/design/<key>/<File-Name>
    const parts = u.pathname.split("/").filter(Boolean);
    const name = FIGMA_KINDS.includes(parts[0]) && parts[2] ? decodeURIComponent(parts[2]).replace(/-/g, " ") : "";
    return name ? `${name} (Figma)` : "Figma file";
  }
  return host;
}

/** Where the link opens on Figma, YouTube… (for the "Open in …" button). */
export function linkSite(href: string): string {
  const host = parse(href)?.hostname.replace(/^www\./, "") ?? "";
  if (host.endsWith("figma.com")) return "Figma";
  if (host === "youtu.be" || host.endsWith("youtube.com")) return "YouTube";
  if (host.endsWith("vimeo.com")) return "Vimeo";
  if (host.endsWith("loom.com")) return "Loom";
  if (host === "docs.google.com" || host === "drive.google.com") return "Google";
  return "new tab";
}

/** The iframe address for a link, or null when it can only be opened. */
export function embedUrl(href: string, type: string): string | null {
  const u = parse(href);
  if (!u) return null;
  const host = u.hostname.replace(/^www\./, "");
  const parts = u.pathname.split("/").filter(Boolean);

  if (host === "embed.figma.com" || (host === "figma.com" && parts[0] === "embed")) return u.href;
  if (host === "figma.com" && FIGMA_KINDS.includes(parts[0])) {
    if (parts[0] === "file") return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(u.href)}`;
    const e = new URL(u.href);
    e.hostname = "embed.figma.com";
    e.searchParams.set("embed-host", "share");
    return e.href;
  }
  if (type === EMBED_TYPE) return u.href;

  const yt =
    host === "youtu.be"
      ? parts[0]
      : host.endsWith("youtube.com")
        ? parts[0] === "watch"
          ? u.searchParams.get("v")
          : ["shorts", "embed", "live"].includes(parts[0])
            ? parts[1]
            : null
        : null;
  if (yt) return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(yt)}`;

  if (host === "vimeo.com" && /^\d+$/.test(parts[0] ?? "")) {
    return `https://player.vimeo.com/video/${parts[0]}${parts[1] ? `?h=${encodeURIComponent(parts[1])}` : ""}`;
  }
  if (host === "player.vimeo.com") return u.href;
  if (host.endsWith("loom.com") && (parts[0] === "share" || parts[0] === "embed") && parts[1]) return `https://www.loom.com/embed/${parts[1]}`;

  if (host === "docs.google.com" && ["document", "presentation", "spreadsheets"].includes(parts[0]) && parts[1] === "d" && parts[2]) {
    return `https://docs.google.com/${parts[0]}/d/${parts[2]}/preview`;
  }
  if (host === "drive.google.com" && parts[0] === "file" && parts[1] === "d" && parts[2]) {
    return `https://drive.google.com/file/d/${parts[2]}/preview`;
  }
  return null;
}
