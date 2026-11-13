"use client";

import type { PortalState } from "../../lib/onboarding/types";
import ReviewCard from "../components/ReviewCard";

type Post = (body: Record<string, unknown>) => Promise<{ error?: string }>;

/** "Files from Ryan" on the client's page: shared files, some needing approval. */
export default function ReviewsSection({
  state,
  adminName,
  readOnly,
  post,
  refresh,
}: {
  state: PortalState;
  adminName: string;
  readOnly: boolean;
  post: Post;
  refresh: () => Promise<void>;
}) {
  if (!state.reviews.length) return null;
  const waiting = state.reviews.filter((r) => r.status === "waiting").length;
  const first = state.client.name.split(/\s+/)[0];

  const act = async (body: Record<string, unknown>) => {
    const res = await post(body);
    await refresh();
    return res;
  };

  return (
    <section aria-labelledby="reviews-title" className="mt-5 space-y-4">
      <div className="flex flex-wrap items-baseline gap-3 px-1">
        <h2 id="reviews-title" className="text-xl font-bold tracking-tight">
          Files from {adminName}
        </h2>
        {waiting > 0 && (
          <span className="rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-bold text-white">
            {waiting} need{waiting === 1 ? "s" : ""} your approval
          </span>
        )}
      </div>
      {state.reviews.map((r) => (
        <ReviewCard
          key={r.id}
          review={r}
          viewer="client"
          names={{ client: first, admin: adminName }}
          readOnly={readOnly}
          onComment={(b) => act({ action: "reviewComment", reviewId: r.id, ...b })}
          onDecide={(b) => act({ action: "reviewDecision", reviewId: r.id, ...b })}
        />
      ))}
    </section>
  );
}
