import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES, guidePath } from "../../lib/onboarding/guides";
import { pageMetadata } from "../../lib/seo";

// Index of client onboarding guides. Unlisted and noindex like the rest of /start.
export const metadata: Metadata = pageMetadata({
  title: "Onboarding guides",
  description: "Step-by-step guides for getting your project set up.",
  path: "/start/onboarding-tasks",
  noindex: true,
});

export default function OnboardingGuides() {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Onboarding guides</h1>
        <p className="mt-2 text-ink-soft">Step-by-step help for the setup tasks on your onboarding page.</p>
        <ul className="mt-6 space-y-3">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link
                href={guidePath(g.slug)}
                className="block rounded-3xl border border-ink/10 bg-white p-5 shadow-sm transition hover:border-violet-300 sm:p-6"
              >
                <span className="text-lg font-bold">{g.title}</span>
                <span className="ml-2 text-sm text-ink-soft">about {g.minutes} minutes</span>
                <span className="mt-1 block text-[15px] text-ink-soft">{g.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
