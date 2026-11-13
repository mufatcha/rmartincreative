"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Demo pages (app/demos) are fictitious companies' sites, so they hide the site's
 *  own header and footer and show a slim demo bar instead. */
export function isDemoPath(pathname: string) {
  return pathname === "/demos" || pathname.startsWith("/demos/");
}

/** Client onboarding pages (app/start) are private working pages: no footer or
 *  "get a quote" bar, so the chat button has the bottom of the screen. */
export function isPortalPath(pathname: string) {
  return pathname === "/start" || pathname.startsWith("/start/");
}

export default function HideOnDemos({ children, alsoPortal = false }: { children: ReactNode; alsoPortal?: boolean }) {
  const pathname = usePathname();
  return isDemoPath(pathname) || (alsoPortal && isPortalPath(pathname)) ? null : children;
}
