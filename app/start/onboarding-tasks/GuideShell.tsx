import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../../lib/business";

/** The page frame for a client guide: purple header (with the phone number),
 *  optional contents, the parts, and a link back to all guides. */
export default function GuideShell({
  eyebrow,
  title,
  intro,
  contents,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  /** Jump links to the guide's parts: [id, label]. */
  contents?: [string, string][];
  children: ReactNode;
}) {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-700 px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10">
          <p className="text-sm font-medium text-violet-200">{eyebrow}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <div className="mt-3 max-w-2xl text-violet-100">{intro}</div>
          <p className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl bg-white/10 px-4 py-3 text-base text-violet-50 sm:text-lg">
            Stuck, or something doesn&rsquo;t match? Call or text{" "}
            <a
              href={BUSINESS_PHONE_TEL}
              className="whitespace-nowrap text-lg font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white sm:text-xl"
            >
              {BUSINESS_PHONE_DISPLAY}
            </a>
          </p>
        </header>

        {contents && contents.length > 1 && (
          <nav aria-label="Contents" className="mt-5 flex flex-wrap gap-2 text-sm">
            {contents.map(([id, label], i) => (
              <a key={id} href={`#${id}`} className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 font-medium hover:border-violet-400">
                {i + 1}. {label}
              </a>
            ))}
          </nav>
        )}

        <div className="mt-5 space-y-5">
          {children}
          <p className="text-center text-sm text-ink-soft">
            <Link href="/start/onboarding-tasks" className="font-medium text-violet-700 hover:text-violet-800">
              All onboarding guides
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
