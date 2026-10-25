"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Demo pages (app/demos) are fictitious companies' sites, so they hide the site's
 *  own header and footer and show a slim demo bar instead. */
export function isDemoPath(pathname: string) {
  return pathname === "/demos" || pathname.startsWith("/demos/");
}

export default function HideOnDemos({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return isDemoPath(pathname) ? null : children;
}
