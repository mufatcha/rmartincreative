import Image from "next/image";
import type { ComponentType } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import type { ServiceBeforeAfter, ServiceImage } from "../lib/services-data";

export default function ServiceVisual({
  image,
  beforeAfter,
  accent,
  icon: Icon,
  sizes = "(max-width: 1024px) 90vw, 480px",
}: {
  image?: ServiceImage;
  beforeAfter?: ServiceBeforeAfter;
  accent: string;
  icon: ComponentType<{ className?: string }>;
  sizes?: string;
}) {
  if (beforeAfter) {
    return (
      <div className="w-full overflow-hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-ink/5">
        <BeforeAfterSlider
          beforeSrc={beforeAfter.beforeSrc}
          afterSrc={beforeAfter.afterSrc}
          beforeAlt={beforeAfter.beforeAlt}
          afterAlt={beforeAfter.afterAlt}
        />
        {beforeAfter.caption && (
          <p className="mt-4 text-center text-xs text-ink-soft">{beforeAfter.caption}</p>
        )}
      </div>
    );
  }

  if (image?.fit === "expand" && image.width && image.height) {
    const aspectRatio = image.width / image.height;
    return (
      <>
        {/* Phones and tablets: no room to grow, so show the whole image uncropped. */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/5 lg:hidden" style={{ aspectRatio }}>
          <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
        </div>

        {/* Desktop: cropped to the frame; hover or keyboard focus shows the full image over the page. */}
        <div tabIndex={0} className="group relative z-10 hidden aspect-[4/3] w-full rounded-2xl outline-none lg:block">
          <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/5 group-focus-visible:ring-2 group-focus-visible:ring-violet-500">
            <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 z-30 w-[160%] max-w-[90vw] -translate-y-1/2 origin-right scale-[0.65] overflow-hidden rounded-2xl opacity-0 shadow-[0_30px_80px_rgba(32,26,46,0.35)] ring-1 ring-ink/10 transition duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            style={{ aspectRatio }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="800px" className="object-cover" />
          </div>
        </div>
      </>
    );
  }

  if (image?.fit === "contain") {
    return (
      <div className="relative aspect-[4/3] w-full">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-contain drop-shadow-[0_28px_40px_rgba(32,26,46,0.28)]" />
      </div>
    );
  }

  if (image?.framed) {
    return (
      <div className={`w-full rounded-3xl bg-gradient-to-br p-2 shadow-xl ${accent}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/5">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br ${accent} text-white shadow-xl`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]"
      />
      <Icon className="relative h-12 w-12 opacity-90" />
      <span className="relative rounded-full bg-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/85">
        Photo coming soon
      </span>
    </div>
  );
}
