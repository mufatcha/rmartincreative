import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import PhotoPrintTool from "./PhotoPrintTool";

// Private helper for passport-photo jobs: frame a photo at 2" × 2" and lay two
// copies on a 4" × 6" print. Unlisted — noindex, not in the sitemap, not linked
// anywhere. Everything runs in the browser; the photo is never uploaded.
export const metadata: Metadata = pageMetadata({
  title: "Photo Print Layout",
  description: "Frame a photo at 2 × 2 inches and lay two copies on a 4 × 6 print.",
  path: "/tools/photo-print",
  noindex: true,
});

export default function PhotoPrintPage() {
  return (
    <section className="pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">2 × 2 photo → 4 × 6 print</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Load a photo, line it up in the 2&Prime; frame, then download a 300 DPI 4&Prime; × 6&Prime; JPEG with two
          copies. The photo stays on this device; nothing is uploaded.
        </p>
        <PhotoPrintTool />
      </div>
    </section>
  );
}
