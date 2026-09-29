import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Get to know your business",
    body: "A quick conversation about who your customers are, what's working, and what isn't — whether you need one project or ongoing help.",
  },
  {
    n: "02",
    title: "Plan what matters most",
    body: "Together we decide where to start — the website, search visibility, print, or all three — so budget goes where it will make the biggest difference.",
  },
  {
    n: "03",
    title: "Design, build & print",
    body: "You get proofs to review at every step, and nothing launches, prints, or ships until you've signed off.",
  },
  {
    n: "04",
    title: "Keep it consistent",
    body: "The same eye on every piece, month after month, so your site, cards, signs, and shirts always look like one brand.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              How it works
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From first project to long-term partner.
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300 lg:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-violet-600 shadow-md ring-1 ring-ink/10">
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
