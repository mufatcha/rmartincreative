import Image from "next/image";
import Reveal from "./Reveal";

type Tile = {
  label: string;
  className: string;
  pattern: string;
  image?: { src: string; alt: string };
  // Portrait photo — needs extra height on phones so it isn't cropped to a sliver.
  tall?: boolean;
  // Landscape photo — spans two columns instead of two rows.
  wide?: boolean;
};

const TILES: Tile[] = [
  {
    label: "Christmas Card",
    className: "bg-gradient-to-br from-rose-500 via-red-500 to-emerald-600 sm:row-span-2",
    pattern: "flakes",
    image: {
      src: "/webp-assets/christmas-card-portrait.webp",
      alt: "Illustrated Christmas card with a gold “Merry Christmas and a Happy New Year” headline above a cozy fireplace, tree and presents",
    },
    tall: true,
  },
  {
    label: "Business Card Set",
    className: "bg-gradient-to-br from-zinc-900 to-zinc-600",
    pattern: "lines",
    image: {
      src: "/webp-assets/business-card.webp",
      alt: "Stack of charcoal business cards with a silver-foil cube logo reading “Substratum Protocol — Business Systems & Architecture” beside a fountain pen",
    },
  },
  {
    label: "Pitch Deck",
    className: "bg-gradient-to-br from-violet-600 via-indigo-500 to-sky-500",
    pattern: "bars",
    image: {
      src: "/webp-assets/pitch-deck.webp",
      alt: "Bound investor pitch deck titled “Quantum Technologies — Disrupting the Future, Innovation & Growth Pitch, Series A 2024” standing on a boardroom table",
    },
  },
  {
    label: "Brochure",
    className: "bg-gradient-to-br from-teal-500 to-cyan-600",
    pattern: "fold",
    image: {
      src: "/webp-assets/brochure.webp",
      alt: "Tri-fold “Elevate Your Reach” marketing brochure open on a desk, showing digital marketing and branding services alongside a teal, orange and navy “Grow Your Business” cover",
    },
  },
  {
    label: "Birthday Card",
    className: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400",
    pattern: "dots",
    image: {
      src: "/webp-assets/birthday-card-2.webp",
      alt: "Photo birthday card reading “Happy 7th Birthday, Leo!” with a family portrait and “from your family” caption, standing on a kitchen counter",
    },
  },
  {
    label: "Photo Restoration",
    className: "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 sm:col-span-2",
    pattern: "photo",
    image: {
      src: "/webp-assets/photo-restoration.webp",
      alt: "Side-by-side comparison of a torn, sepia-toned 1948 photo of Sarah and Henry in a family album next to the same portrait restored and colorized in a wood frame",
    },
    wide: true,
  },
];

function Pattern({ type }: { type: string }) {
  if (type === "flakes") {
    return (
      <div className="mt-6 flex flex-wrap gap-3 text-white/70">
        {["❄", "✦", "❄"].map((s, i) => (
          <span key={i} className="text-lg">
            {s}
          </span>
        ))}
      </div>
    );
  }
  if (type === "lines") {
    return (
      <div className="mt-6 space-y-2">
        <span className="block h-1.5 w-2/3 rounded-full bg-amber-400" />
        <span className="block h-1.5 w-1/2 rounded-full bg-white/40" />
      </div>
    );
  }
  if (type === "bars") {
    return (
      <div className="mt-6 flex items-end gap-1.5">
        {[6, 10, 7, 12, 5].map((h, i) => (
          <span
            key={i}
            className="w-2.5 rounded-sm bg-white/70"
            style={{ height: `${h * 4}px` }}
          />
        ))}
      </div>
    );
  }
  if (type === "fold") {
    return (
      <div className="mt-6 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-16 rounded-md bg-white/25" />
        ))}
      </div>
    );
  }
  if (type === "photo") {
    return (
      <div className="mt-6 flex items-center gap-2 text-white/80">
        <span className="rounded-md bg-white/20 px-2 py-1 text-[10px] font-semibold uppercase">
          Before
        </span>
        <span>→</span>
        <span className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase text-amber-600">
          After
        </span>
      </div>
    );
  }
  return (
    <div className="mt-6 flex gap-2">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-3 w-3 rounded-full bg-white/60" />
      ))}
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              Style directions
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A taste of the range.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              A few examples of the styles I work in — every project gets
              its own custom look. Samples provided upon request.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3 sm:[grid-template-rows:repeat(2,minmax(0,1fr))]">
          {TILES.map((tile, i) => (
            <Reveal
              key={tile.label}
              delay={i * 70}
              className={`group relative flex ${tile.tall ? "min-h-[28rem] sm:min-h-[13rem]" : "min-h-[13rem]"} flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-lg ${tile.className}`}
            >
              {tile.image && (
                <>
                  <Image
                    src={tile.image.src}
                    alt={tile.image.alt}
                    fill
                    sizes={
                      tile.wide
                        ? "(max-width: 640px) 100vw, 760px"
                        : "(max-width: 640px) 100vw, 370px"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Darken top and bottom so the labels stay readable over the photo */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60"
                  />
                </>
              )}
              <span className="relative text-xs font-semibold uppercase tracking-wide text-white/80">
                Sample
              </span>
              <div className="relative">
                {!tile.image && <Pattern type={tile.pattern} />}
                <p className="mt-6 text-base font-semibold">{tile.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
