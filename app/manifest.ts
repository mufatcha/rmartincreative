import type { MetadataRoute } from "next";
import { BUSINESS_NAME } from "./lib/business";

// Web app manifest: the name and icons Android and installed web apps use.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_NAME,
    short_name: "R. Martin",
    description: "Websites, logos, printing, and marketing for small businesses in Northern Illinois and Southeast Wisconsin.",
    start_url: "/",
    display: "browser",
    background_color: "#fffaf2",
    theme_color: "#7c3aed",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
