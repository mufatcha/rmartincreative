import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientBySlug, getDb, loadState, touchSeen } from "../../lib/onboarding/db";
import { pageMetadata } from "../../lib/seo";
import OnboardingPortal from "./OnboardingPortal";

// A client's private onboarding page. The slug is the key (no sign-in). Unlisted:
// noindex (also an X-Robots-Tag header in next.config.ts), not in the sitemap.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/start/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata({
    title: "Your onboarding page",
    description: "Questions, uploads, and a checklist to get your project started.",
    path: `/start/${slug}`,
    noindex: true,
  });
}

export default async function StartPage({ params }: PageProps<"/start/[slug]">) {
  const { slug } = await params;
  const db = await getDb();
  if (!db) throw new Error("Onboarding database unavailable");
  const client = await getClientBySlug(db, slug);
  if (!client || client.archived) notFound();
  const [state] = await Promise.all([loadState(db, client, "client"), touchSeen(db, client)]);
  return <OnboardingPortal initial={state} />;
}
