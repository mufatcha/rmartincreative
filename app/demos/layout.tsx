import type { ReactNode } from "react";
import DemoBar from "./DemoBar";
import { NotesProvider } from "./notes";

// Demo sites for made-up companies, used as sales examples. The site header and
// footer hide themselves here (components/HideOnDemos.tsx); each page is noindex
// and left out of the sitemap, but linked from the service pages.
export default function DemosLayout({ children }: { children: ReactNode }) {
  return (
    <NotesProvider>
      {children}
      <DemoBar />
    </NotesProvider>
  );
}
