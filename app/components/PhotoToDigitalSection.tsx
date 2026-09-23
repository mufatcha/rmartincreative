import Reveal from "./Reveal";
import { IconArrowRight, IconPhoto } from "./icons";

const FEATURES = [
  "Prints, slides & negatives scanned",
  "Color correction & retouching",
  "High-resolution digital files",
  "Organized, labeled & backed up",
];

export default function PhotoToDigitalSection() {
  return (
    <section
      id="photo-to-digital"
      className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <Reveal>
          <div className="relative mx-auto flex h-64 w-full max-w-sm items-center justify-center sm:h-72">
            <div className="relative w-full max-w-xs rotate-[-3deg] overflow-hidden rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-ink/5">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-zinc-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                  Before
                </span>
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                  After
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-zinc-300 to-zinc-400 opacity-70" />
                <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400" />
              </div>
              <p className="mt-4 text-center text-xs text-ink-soft">
                Scanned, cleaned up, restored
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
              <IconPhoto className="h-3.5 w-3.5" />
              Photo-to-Digital
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Don&rsquo;t let old photos fade away.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Boxes of prints, slides, and negatives get scanned, color
              corrected, and touched up into crisp digital files — so the
              memories outlast the paper they&rsquo;re printed on.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-soft">
              {FEATURES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-shine relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Digitize my photos
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
