import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrowRight } from "./icons";
import { PASSPORT_LOOK_BEST, PASSPORT_PREP } from "../lib/data/passport-prep";

/** "Before your photo" checklist, then "How to look your best": the general tips
 *  on the main Passport Photos page, or one town's own tip on a local page. */
export default function PassportPrep({
  lookBest,
  place,
}: {
  lookBest?: { question: string; answer: string };
  place?: string;
} = {}) {
  return (
    <Reveal>
      <div className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Before your photo</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">How to get a photo that passes the first time</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {PASSPORT_PREP.map((group) => (
            <div key={group.heading} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-700 via-blue-700 to-slate-800" />
              <h3 className="font-semibold">{group.heading}</h3>
              <ul className="mt-3 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {lookBest ? (
          <div className="relative mt-14 overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 sm:p-9">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-700 via-blue-700 to-slate-800" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
              How to look your best{place ? ` · ${place}` : ""}
            </p>
            <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight">{lookBest.question}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">{lookBest.answer}</p>
            <Link
              href="/services/passport-photos"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              More tips for a great passport photo
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <>
            <h2 className="mt-14 text-2xl font-bold tracking-tight">How to look your best</h2>
            <p className="mt-2 max-w-2xl text-ink-soft">
              You&rsquo;ll carry this photo for up to ten years. A few small things make a big difference — all within
              the rules.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PASSPORT_LOOK_BEST.map((tip) => (
                <div key={tip.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                  <h3 className="text-sm font-semibold">{tip.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{tip.body}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Reveal>
  );
}
