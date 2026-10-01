import Link from "next/link";
import type { ReactNode } from "react";

// Lets plain content strings (FAQ answers, feature lists) carry a link using
// markdown-style syntax: "Local drop-off and [pickup](/service-area) is available".

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders "[text](href)" segments as links; everything else stays plain text. */
export function renderInlineLinks(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const at = match.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    parts.push(
      <Link
        key={at}
        href={href}
        className="font-medium text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-700"
      >
        {label}
      </Link>
    );
    last = at + whole.length;
  }
  if (parts.length === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** The same text with link markup removed — for structured data and meta tags. */
export function stripInlineLinks(text: string): string {
  return text.replace(LINK, "$1");
}
