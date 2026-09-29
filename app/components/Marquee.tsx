const ITEMS = [
  "Website Design",
  "Online Stores",
  "Search + AI Discovery",
  "Business Cards",
  "Brochures",
  "Pitch Decks",
  "Proposal Decks",
  "Yard Signs",
  "Posters",
  "T-Shirt Printing",
  "Corporate Holiday Cards",
]

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-ink py-3.5">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-paper/80"
          >
            {item}
            <span className="text-amber-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
