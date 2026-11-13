import type { Metadata } from "next";
import { SITE_URL } from "../../lib/business";
import { isAdmin } from "../../lib/onboarding/admin-auth";
import { getDb, listClients } from "../../lib/onboarding/db";
import AdminHome from "./AdminHome";
import SignIn from "./SignIn";

// Ryan's list of client onboarding pages. Bookmark /api/start/admin/login?key=…
// (ADMIN_KEY) to sign in in one tap on a new device.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Onboarding admin", robots: { index: false, follow: false } };

export default async function AdminPage({ searchParams }: PageProps<"/start/admin">) {
  if (!(await isAdmin())) return <SignIn next="/start/admin" error={(await searchParams).error === "1"} />;
  const db = await getDb();
  if (!db) throw new Error("Onboarding database unavailable");
  return <AdminHome initial={await listClients(db)} siteUrl={SITE_URL} />;
}
