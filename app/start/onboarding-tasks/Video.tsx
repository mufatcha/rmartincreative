/** A YouTube how-to, embedded without tracking cookies (youtube-nocookie). */
export default function Video({ id, title, source }: { id: string; title: string; source: string }) {
  return (
    <figure className="mt-5">
      <div className="aspect-video overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 shadow-sm">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <figcaption className="mt-2 text-xs text-ink-soft">
        Video: &ldquo;{title}&rdquo; by {source}. Screens may look a little different today; the written steps are up to date.
      </figcaption>
    </figure>
  );
}
