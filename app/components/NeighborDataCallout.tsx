import Reveal from "./Reveal";

const EXAMPLES = [
  { pitch: "Pool installation", skip: "homes that already have a pool" },
  { pitch: "Solar panels", skip: "roofs that already have solar" },
  { pitch: "New deck", skip: "backyards that already have one" },
  { pitch: "Backyard playground", skip: "yards with a play set already" },
];

/** "Fueled by big data" panel on the Location Smart Postcards page. */
export default function NeighborDataCallout() {
  return (
    <Reveal>
      <div className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-950 p-8 text-white shadow-xl sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <p className="relative text-xs font-semibold uppercase tracking-widest text-cyan-300">Fueled by big data</p>
        <h2 className="relative mt-2 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
          Every postcard goes to someone who could actually buy.
        </h2>
        <p className="relative mt-4 max-w-3xl leading-relaxed text-white/75">
          Mailing lists are built from neighborhood data and checked against aerial map views, so you never pay to
          mail a home that already has what you&rsquo;re selling. If a neighbor just had a pool installed, the
          postcards about pools skip every nearby house that already has one — and go only to the homes that
          don&rsquo;t.
        </p>
        <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
          {EXAMPLES.map((e) => (
            <div key={e.pitch} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-sm font-semibold">Advertising {e.pitch.toLowerCase()}?</p>
              <p className="mt-1 text-sm text-white/70">We skip {e.skip}.</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
