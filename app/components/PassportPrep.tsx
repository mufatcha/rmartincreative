import Reveal from "./Reveal";
import { PASSPORT_PREP } from "../lib/data/passport-prep";

/** "Before your photo" checklist on the Passport Photos page. */
export default function PassportPrep() {
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
      </div>
    </Reveal>
  );
}
