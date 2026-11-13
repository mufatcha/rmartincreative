// Sends the batched onboarding emails (notify.ts). Called every 5 minutes by the
// Worker's cron trigger (custom-worker.ts scheduled(), with the x-admin-key
// header). Signed-in admins can also open it to send anything pending now.
import { isAdmin } from "../../../../lib/onboarding/admin-auth";
import { getDb } from "../../../../lib/onboarding/db";
import { runNotifications } from "../../../../lib/onboarding/notify";

export const dynamic = "force-dynamic";

async function run(request: Request) {
  if (!(await isAdmin(request))) return Response.json({ error: "Not allowed." }, { status: 401 });
  const db = await getDb();
  if (!db) return Response.json({ error: "Database not available." }, { status: 503 });
  return Response.json(await runNotifications(db));
}

export const GET = run;
export const POST = run;
