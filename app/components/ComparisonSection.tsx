import Reveal from "./Reveal";

const ROWS = [
  {
    them: "A salary and benefits, or a monthly agency retainer",
    me: "Pay per project, or one flat monthly rate",
  },
  {
    them: "A designer, a developer, a search specialist, and a print shop",
    me: "One person who handles all of it",
  },
  {
    them: "Your brand looks a little different everywhere it shows up",
    me: "The same look on your site, cards, signs, and shirts",
  },
  {
    them: "Account managers between you and the work",
    me: "You talk directly to the person doing it",
  },
];

export default function ComparisonSection() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              Why work with me
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything a marketing department does, without building one.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Most small businesses don&rsquo;t need a full-time marketing
              hire &mdash; they need the work done well, by someone who already
              knows their brand.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
            <div className="grid grid-cols-2 border-b border-ink/10 text-xs font-semibold uppercase tracking-widest sm:text-sm">
              <p className="px-5 py-4 text-ink-soft sm:px-8">Hiring a team or agency</p>
              <p className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text px-5 py-4 text-transparent sm:px-8">
                Working with me
              </p>
            </div>
            {ROWS.map((row) => (
              <div
                key={row.me}
                className="grid grid-cols-2 border-b border-ink/5 text-sm last:border-b-0 sm:text-base"
              >
                <p className="px-5 py-5 text-ink-soft sm:px-8">{row.them}</p>
                <p className="flex items-start gap-2.5 bg-violet-50/60 px-5 py-5 font-medium text-ink sm:px-8">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500" />
                  {row.me}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
