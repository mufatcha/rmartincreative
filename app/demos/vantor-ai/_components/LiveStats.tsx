import { connection } from "next/server";
import RefreshButton from "./RefreshButton";

// A server component that "fetches" live numbers. The delay stands in for a slow
// database or API call: the rest of the page streams to the browser right away,
// a skeleton holds this spot, and the real numbers stream in when they're ready.

const REGIONS = ["Chicago", "Frankfurt", "Singapore", "São Paulo", "Sydney"];

function sparkline(points: number[]) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 28 - ((p - min) / (max - min || 1)) * 24;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const rand = (min: number, max: number) => Math.round(min + Math.random() * (max - min));

/** Stand-in for a slow database or API call. */
async function fetchLiveNumbers() {
  await new Promise((r) => setTimeout(r, 1400));
  const stats = [
    { label: "Agents running now", value: rand(1800, 2400).toLocaleString("en-US") },
    { label: "Tasks completed today", value: rand(310000, 360000).toLocaleString("en-US") },
    { label: "Median response", value: `${rand(180, 260)} ms` },
    { label: "Hours saved this week", value: rand(41000, 48000).toLocaleString("en-US") },
  ];
  const trend = Array.from({ length: 24 }, (_, i) => 40 + i * 2 + rand(-8, 8));
  const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", timeZone: "America/Chicago" });
  const latency = REGIONS.map((region) => ({ region, ms: rand(18, 95) }));
  return { stats, trend, time, latency };
}

export default async function LiveStats() {
  await connection(); // Render on every visit, not once at build time.
  const { stats, trend, time, latency } = await fetchLiveNumbers();

  return (
    <div className="v-panel v-fade-in rounded-3xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <span className="v-live-dot h-2 w-2 rounded-full bg-emerald-400" />
          All systems normal
        </p>
        <div className="flex items-center gap-3">
          <span className="v-mono text-xs text-[var(--v-muted)]">Updated {time} CT</span>
          <RefreshButton />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-[var(--v-panel-strong)] p-4">
            <p className="text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-[var(--v-muted)]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl bg-[var(--v-panel-strong)] p-4">
          <p className="text-xs text-[var(--v-muted)]">Tasks per minute, last 24 hours</p>
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-3 h-24 w-full" aria-hidden>
            <defs>
              <linearGradient id="vantor-spark" x1="0" x2="1">
                <stop offset="0" stopColor="#22d3ee" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
            </defs>
            <path d={sparkline(trend)} fill="none" stroke="url(#vantor-spark)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <ul className="space-y-2.5 rounded-2xl bg-[var(--v-panel-strong)] p-4 text-sm">
          {latency.map(({ region, ms }) => (
            <li key={region} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {region}
              </span>
              <span className="v-mono text-xs text-[var(--v-muted)]">{ms} ms</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LiveStatsSkeleton() {
  return (
    <div className="v-panel rounded-3xl p-5 sm:p-7" aria-label="Loading live status" role="status">
      <div className="flex items-center justify-between">
        <div className="v-skeleton h-5 w-40 rounded-lg" />
        <div className="v-skeleton h-5 w-32 rounded-lg" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="v-skeleton h-[5.25rem] rounded-2xl" />
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="v-skeleton h-36 rounded-2xl" />
        <div className="v-skeleton h-36 rounded-2xl" />
      </div>
    </div>
  );
}
