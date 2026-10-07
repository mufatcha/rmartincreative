import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";
import LocalBusinessJsonLd from "./components/LocalBusinessJsonLd";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { BUSINESS_NAME, SITE_URL } from "./lib/business";
import { getSeasonalNavLink } from "./lib/season";
import { getServicesMenu } from "./lib/services-menu";

// Rebuild every route hourly so the header's seasonal nav link (app/lib/season.ts)
// stays in sync with the homepage hero badge, even on statically-generated pages.
export const revalidate = 3600;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const TITLE =
  "R. Martin Creative | Design, Web & Print in Richmond, IL";
const DESCRIPTION =
  "Your marketing team without the payroll: websites, search and AI visibility, business printing, signs, and apparel for small businesses across Northern Illinois and Southeast Wisconsin, plus custom Christmas cards and photo restoration. Based in Richmond, IL.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: DESCRIPTION,
  // No site-wide canonical here: every page sets its own, and a layout-level
  // one would make any page that forgets mark itself a duplicate of the home page.
  openGraph: {
    type: "website",
    url: "/",
    siteName: BUSINESS_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const seasonalNav = getSeasonalNavLink();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SiteHeader seasonalNav={seasonalNav} servicesMenu={getServicesMenu()} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <LocalBusinessJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
