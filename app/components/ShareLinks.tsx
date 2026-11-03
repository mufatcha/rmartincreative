"use client";

import { useState } from "react";
import { IconFacebook, IconMail, IconNextdoor, IconX } from "./icons";

// Share buttons for a page: each opens that site's own share box, so there are no
// third-party scripts or trackers. "Text" only shows on phones, where sms: links work.

export default function ShareLinks({ url, text, className = "" }: { url: string; text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);

  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: IconFacebook, hover: "hover:bg-[#0866FF] hover:text-white hover:ring-[#0866FF]" },
    { label: "X", href: `https://x.com/intent/tweet?text=${t}&url=${u}`, icon: IconX, hover: "hover:bg-black hover:text-white hover:ring-black" },
    { label: "Nextdoor", href: `https://nextdoor.com/sharekit/?source=${u}&body=${t}`, icon: IconNextdoor, hover: "hover:bg-[#1B8851] hover:text-white hover:ring-[#1B8851]" },
    { label: "Email", href: `mailto:?subject=${t}&body=${encodeURIComponent(`${text}\n\n${url}`)}`, icon: IconMail, hover: "hover:bg-ink hover:text-paper hover:ring-ink" },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: leave the button as is.
    }
  }

  const pill = "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/10 transition-colors";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map(({ label, href, icon: Icon, hover }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={`${pill} ${hover}`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
      <a href={`sms:?&body=${encodeURIComponent(`${text} ${url}`)}`} className={`${pill} hover:bg-ink hover:text-paper sm:hidden`}>
        Text
      </a>
      <button type="button" onClick={copy} className={`${pill} hover:bg-ink hover:text-paper`}>
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </div>
  );
}
