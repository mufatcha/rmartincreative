import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import Reveal from "../../components/Reveal";
import { pageMetadata } from "../../lib/seo";
import { Feature } from "../notes";
import AgentRun from "./_components/AgentRun";
import Chat from "./_components/Chat";
import Integrations from "./_components/Integrations";
import LiveStats, { LiveStatsSkeleton } from "./_components/LiveStats";
import Nav, { VantorLogo } from "./_components/Nav";
import Pricing from "./_components/Pricing";
import ProductTabs from "./_components/ProductTabs";
import Typewriter from "./_components/Typewriter";
import VantorShell from "./_components/VantorShell";
import Waitlist from "./_components/Waitlist";
import "./vantor.css";

// Demo site for a fictitious AI startup, showing what Next.js and React can do for
// a site's experience. Every section is a real working feature; switch on "How it's
// built" in the demo bar to see each one explained.

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-vantor" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-vantor-mono" });

export const metadata = pageMetadata({
  title: "Vantor AI: Next.js & React Demo Site",
  description:
    "A demo website for a fictitious AI company, built with Next.js and React: streaming chat, live data, instant search, a command palette, and more.",
  path: "/demos/vantor-ai",
  noindex: true,
});

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="v-mono text-xs font-medium uppercase tracking-[0.25em] text-[var(--v-accent-2)]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-[var(--v-muted)]">{children}</p>}
    </div>
  );
}

export default function VantorPage() {
  return (
    <VantorShell className={`${display.variable} ${mono.variable}`}>
      <div className="v-aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="v-grid" aria-hidden />

      <div className="relative">
        <Nav />

        {/* Hero */}
        <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <a
              href="#waitlist"
              className="v-panel inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-[var(--v-muted)] transition-colors hover:text-[var(--v-text)]"
            >
              <span className="v-live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Vantor-2 is now in private beta
              <span aria-hidden>→</span>
            </a>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
              AI agents that
              <br />
              <Typewriter phrases={["close the books.", "answer tickets.", "chase invoices.", "write the report."]} />
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--v-muted)]">
              Vantor turns the busywork in your inbox, spreadsheets, and CRM into agents that plan, act, and check their own
              work, while your team gets back to the work only people can do.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#waitlist" className="v-button rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">
                Get early access
              </a>
              <a href="#chat" className="v-panel rounded-xl px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--v-accent)]">
                Talk to Vantor
              </a>
            </div>
            <p className="v-mono mt-8 text-xs text-[var(--v-muted)]">Trusted by 2,000+ teams · SOC 2 Type II · 99.98% uptime</p>
          </div>
          <Feature
            title="Animated hero"
            what="The headline types itself out and the agent card ticks through its steps on a loop."
            why="Movement in the first second grabs attention and shows the product working before anyone scrolls."
            tech="React state + timers, CSS animation; turns off for visitors who prefer reduced motion"
            className="rounded-3xl"
          >
            <AgentRun />
          </Feature>
        </section>

        {/* Product tabs */}
        <section id="product" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Plan. Act. Verify." />
          </Reveal>
          <Reveal className="mt-10">
            <Feature
              title="Smooth tab transitions"
              what="Switching tabs cross-fades and slides the content instead of snapping."
              why="Polished motion makes a site feel like an app and keeps people exploring."
              tech="View Transitions API (document.startViewTransition) with an instant fallback in older browsers"
              className="rounded-3xl"
            >
              <ProductTabs />
            </Feature>
          </Reveal>
        </section>

        {/* Chat */}
        <section id="chat" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="v-mono text-xs font-medium uppercase tracking-[0.25em] text-[var(--v-accent-2)]">Try it</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Ask Vantor anything.</h2>
            <p className="mt-4 text-[var(--v-muted)]">
              Answers stream in as they&rsquo;re written, word by word, so you&rsquo;re reading in a fraction of a second instead of
              staring at a spinner.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Feature
              title="Streaming AI chat"
              what="Answers arrive word by word from the server as they're produced, with a Stop button."
              why="Visitors get an instant response instead of waiting. The same setup connects to a real AI model or a support bot."
              tech="Next.js Route Handler returning a ReadableStream, read in the browser with fetch + getReader()"
              className="rounded-3xl"
            >
              <Chat />
            </Feature>
          </Reveal>
        </section>

        {/* Live stats */}
        <section id="live" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading eyebrow="Live network" title="Running right now.">
              Real-time numbers from across the Vantor network, rendered fresh on every visit.
            </SectionHeading>
          </Reveal>
          <Reveal className="mt-10">
            <Feature
              title="Streaming server data with loading skeletons"
              what="The page appears instantly, a placeholder holds this spot, and live numbers stream in a moment later. Refresh pulls new numbers without reloading."
              why="Slow data (inventory, bookings, prices) never holds up the rest of the page, so visitors don't bounce."
              tech="Async React Server Component inside <Suspense>, streamed HTML; router.refresh() in a transition"
              className="rounded-3xl"
            >
              <Suspense fallback={<LiveStatsSkeleton />}>
                <LiveStats />
              </Suspense>
            </Feature>
          </Reveal>
        </section>

        {/* Integrations */}
        <section id="integrations" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading eyebrow="Integrations" title="Works with your whole stack." />
          </Reveal>
          <Reveal className="mt-10">
            <Feature
              title="Instant search and filters"
              what="Results filter as you type, and the search is saved in the address bar."
              why="People find what they need in seconds, and a filtered view can be shared as a link, which works great for product catalogs, menus, and directories."
              tech="useDeferredValue keeps typing smooth; URL search params via history.replaceState"
              className="rounded-3xl"
            >
              <Integrations />
            </Feature>
          </Reveal>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionHeading eyebrow="Pricing" title="Start free. Scale when it clicks." />
          </Reveal>
          <Reveal className="mt-10">
            <Feature
              title="Interactive pricing"
              what="Toggling monthly and yearly animates every price to its new value."
              why="Clear, interactive pricing answers the #1 question on the page and nudges people toward the better deal."
              tech="React state with a requestAnimationFrame number tween"
              className="rounded-3xl"
            >
              <Pricing />
            </Feature>
          </Reveal>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <SectionHeading eyebrow="Early access" title={<>Be first in line for <span className="v-gradient-text">Vantor-2</span>.</>} />
          </Reveal>
          <Reveal className="mt-10">
            <Feature
              title="Server Action form with instant feedback"
              what="The form checks your entries on the server, highlights mistakes in place, and bumps the waitlist count the moment you submit."
              why="Forms that respond instantly and explain errors clearly get more sign-ups and fewer abandoned leads."
              tech="React Server Action + useActionState for validation, useOptimistic for the instant counter"
              className="rounded-3xl"
            >
              <Waitlist />
            </Feature>
          </Reveal>
        </section>

        <Feature
          title="Command palette"
          what="Press ⌘K (Ctrl+K on Windows) or tap the search button in the menu to jump anywhere or switch light and dark mode."
          why="Power users love keyboard shortcuts, and it makes big sites and web apps feel fast to get around."
          tech="Global keyboard listener, filtered command list with arrow-key navigation, theme saved in localStorage"
          className="mx-auto max-w-3xl px-6"
        >
          <p className="v-mono text-center text-xs text-[var(--v-muted)]">
            Tip: press <kbd className="rounded border border-[var(--v-line)] px-1.5 py-0.5">⌘K</kbd> to get around.
          </p>
        </Feature>

        <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[var(--v-line)] px-6 py-10 text-sm text-[var(--v-muted)] sm:flex-row">
          <span className="flex items-center gap-2 font-semibold text-[var(--v-text)]">
            <VantorLogo className="h-5 w-5" />
            Vantor
          </span>
          <span>Vantor is a fictitious company created for this demo.</span>
        </footer>
      </div>
    </VantorShell>
  );
}
