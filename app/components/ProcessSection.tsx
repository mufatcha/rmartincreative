import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Tell me what you need",
    body: "A quick message with your idea, quantity, and deadline — holiday cards booked early get first pick of finishes.",
  },
  {
    n: "02",
    title: "Design & review",
    body: "I send a proof within a few days. We revise together until the colors, copy, and layout feel exactly right.",
  },
  {
    n: "03",
    title: "Approve & print",
    body: "Once you sign off, files go straight to press on the stock and finish you chose — matte, glossy, or foil.",
  },
  {
    n: "04",
    title: "Delivered",
    body: "Printed pieces shipped or ready for pickup, plus high-res digital files so you always have a backup copy.",
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
              Four steps from idea to inbox — or mailbox.
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
