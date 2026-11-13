"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import type { Review, ReviewComment, Viewer } from "../../lib/onboarding/types";
import { linkSite } from "../../lib/onboarding/links";
import { fileExtension, formatBytes } from "../../lib/upload-rules";
import LinkText from "./LinkText";

type Result = { error?: string };

const IMAGE = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif"];
const VIDEO = ["mp4", "mov", "m4v", "webm"];

const when = (t: number) =>
  new Date(t).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }) +
  ", " +
  new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const STATUS: Record<Review["status"], { label: string; cls: string }> = {
  waiting: { label: "Needs approval", cls: "bg-violet-100 text-violet-800" },
  changes: { label: "Changes requested", cls: "bg-amber-100 text-amber-800" },
  approved: { label: "Approved", cls: "bg-emerald-100 text-emerald-800" },
  shared: { label: "Shared with you", cls: "bg-paper-tint text-ink-soft" },
};

function Pin({ n, active = false, pending = false }: { n: number | string; active?: boolean; pending?: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-lg ${
        pending ? "animate-pulse bg-amber-500" : active ? "bg-violet-700 ring-4 ring-violet-300" : "bg-violet-600"
      }`}
    >
      {n}
    </span>
  );
}

/**
 * A file shared on the onboarding page: preview (images, PDFs, videos),
 * versions, a comment thread with click-to-pin comments on images, and —
 * when it needs approval — Approve (typed name) or Request changes.
 * Used on the client's page and on the admin page.
 */
export default function ReviewCard({
  review,
  viewer,
  names,
  readOnly = false,
  onComment,
  onDecide,
  onResolve,
  adminTools,
}: {
  review: Review;
  viewer: Viewer;
  /** Display names: { client: "Chris", admin: "Ryan" }. */
  names: Record<Viewer, string>;
  /** Admin preview of the client page: look only. */
  readOnly?: boolean;
  onComment: (body: { versionId: number; body: string; pinX: number | null; pinY: number | null }) => Promise<Result>;
  onDecide?: (body: { versionId: number; decision: "approved" | "changes"; name: string; note: string }) => Promise<Result>;
  onResolve?: (comment: ReviewComment) => void;
  adminTools?: ReactNode;
}) {
  const latest = review.versions[review.versions.length - 1];
  // The version being looked at; follows the latest unless one was picked.
  const [picked, setPicked] = useState<{ id: number; latestId: number } | null>(null);
  const version = review.versions.find((v) => v.id === (picked && picked.latestId === latest.id ? picked.id : latest.id)) ?? latest;
  const isLatest = version.id === latest.id;

  const [draft, setDraft] = useState("");
  const [pinMode, setPinMode] = useState(false);
  const [pending, setPending] = useState<{ x: number; y: number } | null>(null);
  const [activePin, setActivePin] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decide, setDecide] = useState<"approved" | "changes" | null>(null);
  const [signName, setSignName] = useState("");
  const [changeNote, setChangeNote] = useState("");

  const ext = version.link ? "" : fileExtension(version.name);
  const isLink = version.link !== null;
  const isImage = !isLink && IMAGE.includes(ext) || (version.type.startsWith("image/") && !["heic", "heif", "tif", "tiff", "psd"].includes(ext));
  const isPdf = !isLink && ext === "pdf" || version.type === "application/pdf";
  const isVideo = !isLink && VIDEO.includes(ext) || version.type.startsWith("video/");

  const comments = review.comments.filter((c) => c.versionId === version.id);
  const pinned = comments.filter((c) => c.pinX !== null && c.pinY !== null);
  const pinNumber = new Map(pinned.map((c, i) => [c.id, i + 1]));
  const decisions = review.decisions.filter((d) => d.versionId === version.id);
  const lastDecision = decisions[decisions.length - 1];
  const canWrite = !readOnly;

  const placePin = (e: MouseEvent<HTMLDivElement>) => {
    if (!pinMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPending({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
    setPinMode(false);
  };

  async function sendComment() {
    const body = draft.trim();
    if (!body || busy) return;
    setBusy(true);
    setError(null);
    const res = await onComment({ versionId: version.id, body, pinX: pending?.x ?? null, pinY: pending?.y ?? null });
    setBusy(false);
    if (res.error) setError(res.error);
    else {
      setDraft("");
      setPending(null);
    }
  }

  async function sendDecision() {
    if (!onDecide || !decide || busy) return;
    setBusy(true);
    setError(null);
    const res = await onDecide({ versionId: latest.id, decision: decide, name: signName.trim(), note: changeNote.trim() });
    setBusy(false);
    if (res.error) setError(res.error);
    else {
      setDecide(null);
      setSignName("");
      setChangeNote("");
    }
  }

  const author = (c: { author: Viewer }) => (c.author === viewer ? "You" : names[c.author]);

  return (
    <article id={`review-${review.id}`} className="scroll-mt-28 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
      <header className="px-5 pt-5 sm:px-7 sm:pt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="text-lg font-bold tracking-tight">{review.title}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS[review.status].cls}`}>
            {review.status === "shared" && viewer === "admin" ? "No approval needed" : STATUS[review.status].label}
          </span>
        </div>
        {review.note && (
          <p className="mt-1.5 whitespace-pre-wrap text-[15px] text-ink-soft">
            <LinkText text={review.note} />
          </p>
        )}

        {review.versions.length > 1 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Versions">
            {review.versions.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={v.id === version.id}
                onClick={() => {
                  setPicked({ id: v.id, latestId: latest.id });
                  setPending(null);
                  setPinMode(false);
                }}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  v.id === version.id ? "bg-ink text-white" : "bg-paper-tint text-ink hover:bg-ink/10"
                }`}
              >
                v{v.number}
                {v.id === latest.id && " · latest"}
              </button>
            ))}
          </div>
        )}
        {!isLatest && <p className="mt-2 text-xs font-medium text-amber-700">You&rsquo;re looking at an older version.</p>}
        {version.note && (
          <p className="mt-2 text-sm text-ink-soft">
            <span className="font-semibold text-ink">What changed in v{version.number}:</span> {version.note}
          </p>
        )}
      </header>

      {/* Preview */}
      <div className="mt-4 bg-paper-tint/40 px-3 py-3 sm:px-5">
        {isLink && version.embed ? (
          <iframe
            src={version.embed}
            title={review.title}
            allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[75vh] w-full rounded-lg border border-ink/10 bg-white"
          />
        ) : isLink ? (
          <a
            href={version.link!}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 rounded-lg bg-white px-4 py-4 hover:bg-violet-50"
          >
            <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-bold uppercase text-violet-700">Link</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{version.name}</span>
            <span className="text-sm font-semibold text-violet-700">Open &rarr;</span>
          </a>
        ) : isImage ? (
          <div className="relative mx-auto w-fit max-w-full">
            <div onClick={placePin} className={`relative ${pinMode ? "cursor-crosshair" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- private R2 files, not optimizable */}
              <img src={version.url} alt={review.title} className="block max-h-[75vh] max-w-full select-none rounded-lg" draggable={false} />
              {pinned.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePin(activePin === c.id ? null : c.id);
                  }}
                  aria-label={`Comment ${pinNumber.get(c.id)}`}
                  className={`absolute ${c.resolved ? "opacity-50" : ""}`}
                  style={{ left: `${c.pinX! * 100}%`, top: `${c.pinY! * 100}%` }}
                >
                  <Pin n={pinNumber.get(c.id)!} active={activePin === c.id} />
                </button>
              ))}
              {pending && (
                <span className="pointer-events-none absolute" style={{ left: `${pending.x * 100}%`, top: `${pending.y * 100}%` }}>
                  <Pin n="+" pending />
                </span>
              )}
            </div>
            {pinMode && (
              <p className="absolute inset-x-0 top-2 mx-auto w-fit rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
                Click the spot your comment is about
              </p>
            )}
          </div>
        ) : isPdf ? (
          <iframe src={version.url} title={review.title} className="h-[75vh] w-full rounded-lg border border-ink/10 bg-white" />
        ) : isVideo ? (
          <video src={version.url} controls preload="metadata" playsInline className="mx-auto max-h-[75vh] w-full rounded-lg bg-black" />
        ) : (
          <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-4">
            <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-bold uppercase text-violet-700">{ext || "file"}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{version.name}</span>
          </div>
        )}
        {isLink ? (
          <p className="mt-2 flex flex-wrap items-center gap-x-3 text-xs text-ink-soft">
            <span>
              {version.name} · {when(version.createdAt)}
            </span>
            <a href={version.link!} target="_blank" rel="noopener" className="font-semibold text-violet-700 hover:text-violet-800">
              Open in {linkSite(version.link!)}
            </a>
          </p>
        ) : (
        <p className="mt-2 flex flex-wrap items-center gap-x-3 text-xs text-ink-soft">
          <span>
            {version.name} · {formatBytes(version.size)} · {when(version.createdAt)}
          </span>
          <a href={`${version.url}?download=1`} className="font-semibold text-violet-700 hover:text-violet-800">
            Download
          </a>
          <a href={version.url} target="_blank" rel="noopener" className="font-semibold text-violet-700 hover:text-violet-800">
            Open full size
          </a>
        </p>
        )}
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-7">
        {/* Approval */}
        {review.needsApproval && isLatest && (
          <div
            className={`mb-5 rounded-2xl px-4 py-3.5 ${
              review.status === "approved" ? "bg-emerald-50" : review.status === "changes" ? "bg-amber-50" : "bg-violet-50"
            }`}
          >
            {review.status === "approved" && lastDecision ? (
              <p className="text-sm text-emerald-900">
                <strong>Approved</strong> (v{version.number}) by <strong>{lastDecision.name}</strong> on {when(lastDecision.createdAt)}.
              </p>
            ) : review.status === "changes" && lastDecision ? (
              <div className="text-sm text-amber-900">
                <p>
                  <strong>{viewer === "client" ? "You asked" : `${names.client} asked`} for changes</strong> on {when(lastDecision.createdAt)}
                  {viewer === "client" ? ". I'll post a new version here." : "."}
                </p>
                {lastDecision.note && <p className="mt-1 whitespace-pre-wrap italic">&ldquo;{lastDecision.note}&rdquo;</p>}
              </div>
            ) : (
              <p className="text-sm text-violet-900">
                {viewer === "client" ? (
                  <>
                    <strong>This needs your approval.</strong> Have a look, then approve it or tell me what to change.
                  </>
                ) : (
                  <>
                    <strong>Waiting for {names.client}&rsquo;s approval</strong> of v{version.number}.
                  </>
                )}
              </p>
            )}

            {viewer === "client" && onDecide && canWrite && review.status !== "approved" && (
              <div className="mt-3">
                {decide === null && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDecide("approved")}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecide("changes")}
                      className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold hover:border-amber-400"
                    >
                      Request changes
                    </button>
                  </div>
                )}
                {decide === "approved" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void sendDecision();
                    }}
                    className="space-y-2"
                  >
                    <label htmlFor={`sign-${review.id}`} className="block text-sm font-medium">
                      Type your full name to approve version {latest.number}
                    </label>
                    <input
                      id={`sign-${review.id}`}
                      value={signName}
                      onChange={(e) => setSignName(e.target.value)}
                      autoComplete="name"
                      autoFocus
                      className="w-full max-w-sm rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                    <p className="text-xs text-ink-soft">Typing your name confirms you approve this version as shown.</p>
                    <div className="flex gap-2">
                      <button
                        disabled={busy || signName.trim().length < 2}
                        className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40"
                      >
                        {busy ? "Saving…" : "Approve"}
                      </button>
                      <button type="button" onClick={() => setDecide(null)} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                {decide === "changes" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void sendDecision();
                    }}
                    className="space-y-2"
                  >
                    <label htmlFor={`changes-${review.id}`} className="block text-sm font-medium">
                      What would you like changed?
                    </label>
                    <textarea
                      id={`changes-${review.id}`}
                      value={changeNote}
                      onChange={(e) => setChangeNote(e.target.value)}
                      rows={3}
                      autoFocus
                      className="field-sizing-content min-h-20 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    />
                    {isImage && <p className="text-xs text-ink-soft">Tip: for something in a specific spot, add a pinned comment below too.</p>}
                    <div className="flex gap-2">
                      <button
                        disabled={busy || !changeNote.trim()}
                        className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-40"
                      >
                        {busy ? "Sending…" : "Send"}
                      </button>
                      <button type="button" onClick={() => setDecide(null)} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* Comments */}
        <h4 className="text-sm font-bold">
          Comments{review.versions.length > 1 ? ` on v${version.number}` : ""}
          {comments.length > 0 && <span className="ml-1.5 font-medium text-ink-soft">({comments.length})</span>}
        </h4>
        {comments.length === 0 && <p className="mt-1 text-sm text-ink-soft">No comments yet.</p>}
        <ul className="mt-2 space-y-2.5">
          {comments.map((c) => {
            const n = pinNumber.get(c.id);
            return (
              <li
                key={c.id}
                onMouseEnter={() => n && setActivePin(c.id)}
                onMouseLeave={() => n && setActivePin(null)}
                className={`flex gap-3 rounded-2xl px-3.5 py-2.5 ${activePin === c.id ? "bg-violet-50" : "bg-paper-tint/50"} ${c.resolved ? "opacity-60" : ""}`}
              >
                {n ? (
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white">{n}</span>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-ink-soft">
                    <strong className="text-ink">{author(c)}</strong> · {when(c.createdAt)}
                    {c.resolved && " · Resolved"}
                  </p>
                  <p className={`mt-0.5 whitespace-pre-wrap break-words text-[15px] ${c.resolved ? "line-through decoration-ink/30" : ""}`}>
                    <LinkText text={c.body} />
                  </p>
                </div>
                {onResolve && (
                  <button type="button" onClick={() => onResolve(c)} className="self-start text-xs font-semibold text-violet-700 hover:text-violet-800">
                    {c.resolved ? "Reopen" : "Resolve"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {canWrite && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendComment();
            }}
            className="mt-3"
          >
            <label htmlFor={`comment-${review.id}`} className="sr-only">
              Add a comment
            </label>
            <textarea
              id={`comment-${review.id}`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              placeholder={isImage ? "Add a comment, or pin it to a spot on the image…" : "Add a comment…"}
              className="field-sizing-content min-h-16 w-full rounded-2xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {isImage && (
                <button
                  type="button"
                  onClick={() => {
                    if (pending) setPending(null);
                    else setPinMode((m) => !m);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    pinMode || pending ? "border-amber-400 bg-amber-50 text-amber-900" : "border-ink/15 hover:border-violet-400"
                  }`}
                >
                  <svg viewBox="0 0 20 20" aria-hidden className="h-3.5 w-3.5">
                    <path d="M10 18s5-5.2 5-9a5 5 0 0 0-10 0c0 3.8 5 9 5 9Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="10" cy="9" r="1.8" fill="currentColor" />
                  </svg>
                  {pending ? "Remove pin" : pinMode ? "Cancel pin" : "Pin to a spot"}
                </button>
              )}
              <button
                disabled={busy || !draft.trim()}
                className="ml-auto rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40"
              >
                {busy ? "Sending…" : "Comment"}
              </button>
            </div>
          </form>
        )}
        {readOnly && <p className="mt-3 text-xs text-ink-soft">Preview: comment from your admin page.</p>}
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

        {/* Decision history (older decisions, on this version) */}
        {decisions.length > 1 && (
          <details className="mt-4 text-xs text-ink-soft">
            <summary className="cursor-pointer font-semibold">History for v{version.number}</summary>
            <ul className="mt-1.5 space-y-1">
              {decisions.map((d) => (
                <li key={d.id}>
                  {when(d.createdAt)}: {d.decision === "approved" ? `Approved by ${d.name}` : `Changes requested${d.note ? `: “${d.note}”` : ""}`}
                </li>
              ))}
            </ul>
          </details>
        )}

        {adminTools && <div className="mt-5 border-t border-ink/10 pt-4">{adminTools}</div>}
      </div>
    </article>
  );
}
