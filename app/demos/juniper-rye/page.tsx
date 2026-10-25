import { Caveat, Fraunces } from "next/font/google";
import { pageMetadata } from "../../lib/seo";
import Studio from "./_components/Studio";

// Demo of a headless CMS editor for a fictitious bakery: edit content on the left,
// watch the bakery's site change on the right. There's no real CMS behind it; switch
// on "How it's built" in the demo bar to see each part explained.

const serif = Fraunces({ subsets: ["latin"], variable: "--font-jr-serif" });
const script = Caveat({ subsets: ["latin"], variable: "--font-jr-script" });

export const metadata = pageMetadata({
  title: "Juniper & Rye: Headless CMS Demo",
  description:
    "A demo content editor for a fictitious bakery: edit the menu, hours, specials, and branding, and watch the website update live before publishing.",
  path: "/demos/juniper-rye",
  noindex: true,
});

export default function JuniperRyePage() {
  return (
    <div className={`${serif.variable} ${script.variable}`}>
      <Studio />
    </div>
  );
}
