import Reveal from "./Reveal";

const TILES = [
  {
    label: "Christmas Card",
    className: "bg-gradient-to-br from-rose-500 via-red-500 to-emerald-600 sm:row-span-2",
    pattern: "flakes",
  },
  {
    label: "Business Card Set",
    className: "bg-gradient-to-br from-zinc-900 to-zinc-600",
    pattern: "lines",
  },
  {
    label: "Pitch Deck",
    className: "bg-gradient-to-br from-violet-600 via-indigo-500 to-sky-500",
    pattern: "bars",
  },
  {
    label: "Brochure",
    className: "bg-gradient-to-br from-teal-500 to-cyan-600",
    pattern: "fold",
  },
  {
    label: "Photo Restoration",
    className: "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 sm:row-span-2",
    pattern: "photo",
  },
  {
    label: "Birthday Card",
    className: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400",
    pattern: "dots",
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
              Every project gets its own palette — these are a few of the
              directions I design in. Full samples shared during your quote.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3 sm:[grid-template-rows:repeat(2,minmax(0,1fr))]">
          {TILES.map((tile, i) => (
            <Reveal
              key={tile.label}
              delay={i * 70}
              className={`relative flex min-h-[13rem] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] ${tile.className}`}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Sample
              </span>
              <div>
                <Pattern type={tile.pattern} />
                <p className="mt-6 text-base font-semibold">{tile.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
