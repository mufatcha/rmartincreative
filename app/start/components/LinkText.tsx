import { Fragment } from "react";

// [label](https://…) or a bare https://… address. Trailing punctuation isn't
// part of a bare link ("see https://x.com." → link to https://x.com).
const LINK = /\[([^\]\n]{1,200})\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g;

/**
 * Text Ryan writes for the client (notes, plan details, help text), with links
 * made clickable. Everything else stays plain text: no HTML is rendered.
 */
export default function LinkText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const start = m.index ?? 0;
    if (start > last) out.push(<Fragment key={`t${last}`}>{text.slice(last, start)}</Fragment>);
    const href = m[2] ?? m[3];
    out.push(
      <a
        key={`a${start}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 [overflow-wrap:anywhere] hover:text-violet-800"
      >
        {m[1] ?? href}
      </a>
    );
    last = start + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={`t${last}`}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
