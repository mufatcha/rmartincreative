import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "../../../lib/business";
import { isAdmin } from "../../../lib/onboarding/admin-auth";
import { getClientBySlug, getDb, loadAdminState } from "../../../lib/onboarding/db";
import SignIn from "../SignIn";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Onboarding admin", robots: { index: false, follow: false } };

export default async function AdminClientPage({ params }: PageProps<"/start/admin/[slug]">) {
  const { slug } = await params;
  if (!(await isAdmin())) return <SignIn next={`/start/admin/${slug}`} />;
  const db = await getDb();
  if (!db) throw new Error("Onboarding database unavailable");
  const client = await getClientBySlug(db, slug);
  if (!client) notFound();
  return <AdminClient initial={await loadAdminState(db, client)} siteUrl={SITE_URL} />;
}
