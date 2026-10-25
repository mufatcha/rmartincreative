"use client";

import { useEffect } from "react";
import { trackContactClick } from "./Analytics";

/** One listener for the whole site: reports every tel: and mailto: link click to analytics. */
export default function ContactClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      trackContactClick(href.startsWith("tel:") ? "phone" : "email", href);
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
