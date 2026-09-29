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
