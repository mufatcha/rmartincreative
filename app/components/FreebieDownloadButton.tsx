"use client";

import { trackFreebieDownload } from "./Analytics";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <path
        d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A plain download link (works without JavaScript) that also records the download. */
export default function FreebieDownloadButton({
  slug,
  href,
  fileName,
  className,
  children,
}: {
  slug: string;
  href: string;
  fileName: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} download={fileName} className={className} onClick={() => trackFreebieDownload(slug, fileName)}>
      <DownloadIcon />
      {children}
    </a>
  );
}
