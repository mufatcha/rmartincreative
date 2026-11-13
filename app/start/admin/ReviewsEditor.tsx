"use client";

import { useState } from "react";
import FileDropzone from "../../components/FileDropzone";
import { useFileUploads } from "../../components/useFileUploads";
import type { Review } from "../../lib/onboarding/types";
import { ONBOARDING_RULES } from "../../lib/upload-rules";
import ReviewCard from "../components/ReviewCard";

type Act = (body: Record<string, unknown>) => Promise<{ error?: string }>;
type Uploaded = { key: string; name: string; size: number; type: string };

const ONE_FILE = { ...ONBOARDING_RULES, maxFiles: 1 };
const input =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

/** Uploads one file to R2 and reports it once it's there. */
function useOneUpload(slug: string) {
  const [file, setFile] = useState<Uploaded | null>(null);
  const uploads = useFileUploads({
    endpoint: `/api/start/${slug}/uploads`,
    rules: ONE_FILE,
    onUploaded: (item) => setFile({ key: item.key, name: item.file.name, size: item.file.size, type: item.file.type }),
  });
  const reset = () => {
    uploads.reset();
    setFile(null);
  };
  return { uploads, file, reset };
}

function NewReviewForm({ slug, act, onDone }: { slug: string; act: Act; onDone: () => void }) {
  const { uploads, file, reset } = useOneUpload(slug);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [needsApproval, setNeedsApproval] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!file) return;
        setSaving(true);
        const res = await act({ action: "addReview", title, note, needsApproval, file });
        setSaving(false);
        if (res.error) setError(res.error);
        else {
          reset();
          onDone();
        }
      }}
      className="space-y-3 rounded-2xl border border-violet-200 bg-violet-50/60 p-4"
    >
      <FileDropzone
        items={uploads.items}
        hint=""
        rules={ONE_FILE}
        pickLabel="Choose a file to share"
        onAdd={(files) => uploads.addFiles(files.slice(0, 1))}
        onRemove={(id) => {
          uploads.remove(id);
          reset();
        }}
        onRetry={uploads.retry}
      />
      <div>
        <label htmlFor="review-title" className="mb-1 block text-xs font-semibold text-ink-soft">
          Title
        </label>
        <input id="review-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Logo concepts" className={input} />
      </div>
      <div>
        <label htmlFor="review-note" className="mb-1 block text-xs font-semibold text-ink-soft">
          Note (optional)
        </label>
        <textarea
          id="review-note"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What to look at, or what you'd like feedback on"
          className={`${input} field-sizing-content min-h-16`}
        />
      </div>
      <label className="flex items-start gap-2.5 text-sm">
        <input type="checkbox" checked={needsApproval} onChange={(e) => setNeedsApproval(e.target.checked)} className="mt-0.5 h-4 w-4 accent-violet-600" />
        <span>
          <strong>Needs approval</strong>
          <span className="block text-xs text-ink-soft">The client can Approve (by typing their name) or Request changes. Leave off for files that are just to view.</span>
        </span>
      </label>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex items-center gap-2">
        <button
          disabled={saving || !file || !title.trim()}
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40"
        >
          {saving ? "Sharing…" : uploads.uploading ? "Uploading…" : "Share file"}
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            onDone();
          }}
          className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink"
        >
          Cancel
        </button>
      </div>
      <p className="text-xs text-ink-soft">The client isn&rsquo;t emailed until you press &ldquo;Share updates&rdquo;.</p>
    </form>
  );
}

function ReviewTools({ slug, review, act }: { slug: string; review: Review; act: Act }) {
  const [mode, setMode] = useState<"version" | "edit" | null>(null);
  const { uploads, file, reset } = useOneUpload(slug);
  const [versionNote, setVersionNote] = useState("");
  const [title, setTitle] = useState(review.title);
  const [note, setNote] = useState(review.note);
  const [needsApproval, setNeedsApproval] = useState(review.needsApproval);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const close = () => {
    reset();
    setMode(null);
    setError(null);
  };

  if (mode === "version") {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!file) return;
          setSaving(true);
          const res = await act({ action: "addReviewVersion", id: review.id, note: versionNote, file });
          setSaving(false);
          if (res.error) setError(res.error);
          else {
            setVersionNote("");
            close();
          }
        }}
        className="space-y-3"
      >
        <p className="text-sm font-semibold">Upload version {review.versions.length + 1}</p>
        <FileDropzone
          items={uploads.items}
          hint=""
          rules={ONE_FILE}
          pickLabel="Choose the new version"
          onAdd={(files) => uploads.addFiles(files.slice(0, 1))}
          onRemove={(id) => {
            uploads.remove(id);
            reset();
          }}
          onRetry={uploads.retry}
        />
        <input value={versionNote} onChange={(e) => setVersionNote(e.target.value)} placeholder="What changed? (optional)" aria-label="What changed" className={input} />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <div className="flex gap-2">
          <button disabled={saving || !file} className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40">
            {saving ? "Saving…" : uploads.uploading ? "Uploading…" : "Add version"}
          </button>
          <button type="button" onClick={close} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  if (mode === "edit") {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          const res = await act({ action: "updateReview", id: review.id, title, note, needsApproval });
          setSaving(false);
          if (res.error) setError(res.error);
          else close();
        }}
        className="space-y-3"
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Title" className={input} />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} aria-label="Note" className={`${input} field-sizing-content min-h-16`} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={needsApproval} onChange={(e) => setNeedsApproval(e.target.checked)} className="h-4 w-4 accent-violet-600" />
          Needs approval
        </label>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <div className="flex gap-2">
          <button disabled={saving} className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40">
            Save
          </button>
          <button type="button" onClick={close} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={() => setMode("version")} className="rounded-full bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-violet-700">
        Upload new version
      </button>
      <button type="button" onClick={() => setMode("edit")} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-semibold hover:border-violet-400">
        Edit
      </button>
      <button
        type="button"
        onClick={() => {
          if (window.confirm(`Remove “${review.title}” from the client's page?`)) void act({ action: "updateReview", id: review.id, archived: true });
        }}
        className="ml-auto text-xs font-semibold text-ink-soft hover:text-rose-600"
      >
        Remove
      </button>
    </div>
  );
}

/** "Shared files" on the admin page: share files, upload versions, read and answer feedback. */
export default function ReviewsEditor({ slug, reviews, clientFirst, act }: { slug: string; reviews: Review[]; clientFirst: string; act: Act }) {
  const [adding, setAdding] = useState(false);
  const waiting = reviews.filter((r) => r.status === "waiting").length;
  const changes = reviews.filter((r) => r.status === "changes").length;

  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-ink/10 bg-white px-5 py-6 shadow-sm sm:px-7">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="flex-1 text-xl font-bold tracking-tight">Shared files</h2>
          {(waiting > 0 || changes > 0) && (
            <span className="text-xs text-ink-soft">
              {waiting > 0 && `${waiting} waiting for approval`}
              {waiting > 0 && changes > 0 && " · "}
              {changes > 0 && <span className="font-semibold text-amber-700">{changes} with changes requested</span>}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          Share mockups, proofs, and videos. {clientFirst} can comment (and pin comments on images); turn on &ldquo;Needs approval&rdquo; for files
          they should sign off on. Their comments and decisions email you right away.
        </p>
        <div className="mt-4">
          {adding ? (
            <NewReviewForm slug={slug} act={act} onDone={() => setAdding(false)} />
          ) : (
            <button type="button" onClick={() => setAdding(true)} className="text-sm font-semibold text-violet-700 hover:text-violet-800">
              + Share a file
            </button>
          )}
        </div>
      </div>

      {reviews.map((r) => (
        <ReviewCard
          key={r.id}
          review={r}
          viewer="admin"
          names={{ client: clientFirst, admin: "Ryan" }}
          onComment={(b) => act({ action: "reviewComment", reviewId: r.id, ...b })}
          onResolve={(c) => void act({ action: "resolveComment", id: c.id, resolved: !c.resolved })}
          adminTools={<ReviewTools slug={slug} review={r} act={act} />}
        />
      ))}
    </section>
  );
}
