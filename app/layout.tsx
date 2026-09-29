import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LocalBusinessJsonLd from "./components/LocalBusinessJsonLd";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { BUSINESS_NAME, SITE_URL } from "./lib/business";
import { getSeasonalNavLink } from "./lib/season";

// Rebuild every route hourly so the header's seasonal nav link (app/lib/season.ts)
// stays in sync with the homepage hero badge, even on statically-generated pages.
export const revalidate = 3600;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE =
  "Ryan Martin | Freelance Designer & Printer — Gurnee & Richmond, IL";
const DESCRIPTION =
  "Ryan Martin — freelance design, print & web serving Northern Illinois and Southern Wisconsin: holiday and greeting cards, business printing, custom apparel, website design, and photo scanning, restoration, and color correction.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SiteHeader seasonalNav={seasonalNav} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
