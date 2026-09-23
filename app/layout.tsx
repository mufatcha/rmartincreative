import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LocalBusinessJsonLd from "./components/LocalBusinessJsonLd";
import { BUSINESS_NAME, SITE_URL } from "./lib/business";

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
  "Ryan Martin, freelance designer serving Gurnee, Richmond, and Northern Illinois — Christmas and holiday cards, greeting cards, business cards, brochures, pitch decks and business documents, plus photo-to-digital conversion.";

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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
