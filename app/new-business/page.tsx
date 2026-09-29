import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "../components/CtaSection";
import QuoteModal from "../components/QuoteModal";
import Reveal from "../components/Reveal";
import { IconArrowRight, IconSparkle } from "../components/icons";
import { LAUNCH_PHASES, type LaunchItemKind } from "../lib/launch-timeline";

export const metadata: Metadata = {
  title: "New Business Launch Guide: Branding & Marketing Timeline",
  description:
    "Launching a new business? A week-by-week timeline of the branding, website, print, and marketing you'll need, with the questions to answer at each step.",
  alternates: { canonical: "/new-business" },
};

const KIND_STYLES: Record<LaunchItemKind, { label: string; className: string }> = {
  digital: { label: "Digital", className: "bg-sky-100 text-sky-700" },
  print: { label: "Print", className: "bg-amber-100 text-amber-800" },
  both: { label: "Digital + Print", className: "bg-violet-100 text-violet-700" },
};

// Generated from the same timeline data by `bun run pdf:checklist`.
const CHECKLIST_PDF = "/downloads/new-business-launch-checklist.pdf";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <path
        d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KindBadge({ kind }: { kind: LaunchItemKind }) {
  const style = KIND_STYLES[kind];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.className}`}
    >
      {style.label}
    </span>
  );
}

export default function NewBusinessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-300 to-transparent opacity-40 blur-3xl"
        />
        <div
          aria-hidden
          className="animate-drift-b pointer-events-none absolute -right-24 top-10 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-sky-300 via-cyan-200 to-transparent opacity-50 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft shadow-sm backdrop-blur">
              <IconSparkle className="h-3.5 w-3.5 text-violet-600" />
              New business launch guide
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Launching a business?{" "}
              <span className="animate-hue bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
                Here&rsquo;s everything your brand needs
              </span>{" "}
              &mdash; and when.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              From choosing a name to opening day and beyond, this timeline
              covers the branding, website, print, and marketing a new
              business needs, plus the questions to answer at each step.
              Use it as a checklist, or hand the whole thing to me.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <QuoteModal
                initialServiceId="launch"
                triggerClassName="btn-shine relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
              >
                Plan my launch
              </QuoteModal>
              <a
                href={CHECKLIST_PDF}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                <DownloadIcon />
                Download the checklist (PDF)
              </a>
              <a
                href="#timeline"
                className="text-sm font-semibold text-violet-600 hover:text-violet-700"
              >
                See the timeline ↓
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
              <span className="font-semibold uppercase tracking-widest">Key:</span>
              <KindBadge kind="digital" />
              <KindBadge kind="print" />
              <KindBadge kind="both" />
            </div>
          </div>
        </div>
      </section>

      {/* Phase jump bar */}
      <nav aria-label="Launch phases" className="border-y border-ink/10 bg-white/60">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
          {LAUNCH_PHASES.map((phase, i) => (
            <a
              key={phase.id}
              href={`#${phase.id}`}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10 transition-colors hover:bg-white hover:text-ink"
            >
              <span className="mr-1 font-bold text-violet-600">{i + 1}</span>
              {phase.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Timeline */}
      <section id="timeline" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <ol className="relative">
            {/* The vertical line running through every phase. */}
            <span
              aria-hidden
              className="absolute bottom-4 left-5 top-4 w-0.5 rounded-full bg-gradient-to-b from-violet-500 via-fuchsia-400 to-amber-400 sm:left-6"
            />

            {LAUNCH_PHASES.map((phase, i) => (
              <li key={phase.id} id={phase.id} className="relative scroll-mt-28 pb-14 pl-14 last:pb-0 sm:pl-20">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-violet-600 shadow-md ring-4 ring-paper sm:h-12 sm:w-12">
                  {i + 1}
                </span>

                <Reveal>
                  <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-violet-600 sm:pt-3">
                    {phase.timeframe}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{phase.title}</h2>
                  <p className="mt-2 max-w-2xl text-ink-soft">{phase.summary}</p>

                  <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">What to do</h3>
                      <ul className="mt-4 space-y-3">
                        {phase.items.map((item) => (
                          <li key={item.label} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                            <KindBadge kind={item.kind} />
                            <span className="text-sm leading-relaxed text-ink">
                              {item.label}
                              {item.note && <span className="mt-0.5 block text-xs text-ink-soft">{item.note}</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-violet-50/70 p-6 ring-1 ring-violet-100">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-violet-700">
                        Questions to answer
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {phase.questions.map((q) => (
                          <li key={q} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                            <span aria-hidden className="font-bold text-violet-500">?</span>
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                      How I can help:
                    </span>
                    {phase.help.map((h) =>
                      h.href ? (
                        <Link
                          key={h.label}
                          href={h.href}
                          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft shadow-sm ring-1 ring-ink/10 transition-colors hover:text-violet-600"
                        >
                          {h.label}
                          <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ) : (
                        <span
                          key={h.label}
                          className="inline-flex rounded-full bg-white/60 px-3.5 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/10"
                        >
                          {h.label}
                        </span>
                      )
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <div className="mt-16 flex flex-col items-start gap-5 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Take this checklist with you</h2>
                <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-soft">
                  A printable PDF of every phase, with boxes to tick and space to jot answers under
                  each question.
                </p>
              </div>
              <a
                href={CHECKLIST_PDF}
                download
                className="btn-shine relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
              >
                <DownloadIcon />
                Download the PDF
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection
        heading="Ready to launch? Let’s build it together."
        body="Tell me your launch date and what you already have, and I’ll put together a plan and quote for the branding, website, print, and marketing you still need — all from one person."
      />
    </>
  );
}
