/** The client's test and permanent site addresses as a bright card of links.
 *  Only the addresses that are filled in are shown; with none, nothing renders. */

export const Globe = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="10" cy="10" r="7.5" />
    <path d="M2.5 10h15M10 2.5c2 2.2 3 4.7 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.7-3-7.5s1-5.3 3-7.5Z" />
  </svg>
);

export const siteCard =
  "rounded-3xl bg-linear-to-br from-violet-600 via-fuchsia-500 to-orange-400 px-5 py-6 text-white shadow-lg shadow-fuchsia-500/25 sm:px-7";

const pretty = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function SiteAddresses({ testUrl, liveUrl, className = "" }: { testUrl: string; liveUrl: string; className?: string }) {
  const sites = [
    { label: "Test site", note: "Work in progress: have a look around", url: testUrl },
    { label: "Your website", note: "The permanent address", url: liveUrl },
  ].filter((s) => s.url);
  if (sites.length === 0) return null;

  return (
    <section aria-labelledby="site-addresses-title" className={`${siteCard} ${className}`}>
      <h2 id="site-addresses-title" className="flex items-center gap-2 text-xl font-bold tracking-tight">
        <Globe />
        {sites.length > 1 ? "Your site addresses" : "Your site address"}
      </h2>
      <ul className={`mt-4 grid gap-3 ${sites.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {sites.map((s) => (
          <li key={s.label}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-white/15 px-4 py-3 ring-1 ring-white/25 transition hover:bg-white/25"
            >
              <span className="block text-xs font-semibold uppercase tracking-wide text-white/85">{s.label}</span>
              <span className="mt-0.5 block truncate text-lg font-semibold underline-offset-2 group-hover:underline">
                {pretty(s.url)} <span aria-hidden>&#8599;</span>
              </span>
              <span className="block text-xs text-white/80">{s.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
