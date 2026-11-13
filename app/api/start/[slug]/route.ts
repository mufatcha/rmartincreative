// The client's side of an onboarding page (app/start/[slug]): GET returns the
// whole page state (polled every few seconds), POST saves one change. The slug
// itself is the key, so there's no sign-in.
import {
  addFile,
  addMessage,
  deleteFile,
  getClientBySlug,
  getDb,
  loadState,
  markPlanSeen,
  markRead,
  saveAnswer,
  setClientEmail,
  setTask,
  touchSeen,
} from "../../../lib/onboarding/db";
import { notifyAdminOfMessage } from "../../../lib/onboarding/notify";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

const noStore = { "Cache-Control": "no-store" };

async function load(ctx: Ctx) {
  const db = await getDb();
  if (!db) return { error: Response.json({ error: "Not available right now." }, { status: 503 }) };
  const client = await getClientBySlug(db, (await ctx.params).slug);
  if (!client || client.archived) return { error: Response.json({ error: "Not found." }, { status: 404 }) };
  return { db, client };
}

export async function GET(request: Request, ctx: Ctx) {
  const { db, client, error } = await load(ctx);
  if (error) return error;
  // Only a visible tab counts as "seen", so emails still go out when the page is
  // open in a background tab.
  if (new URL(request.url).searchParams.get("visible") === "1") await touchSeen(db, client);
  return Response.json(await loadState(db, client, "client"), { headers: noStore });
}

export async function POST(request: Request, ctx: Ctx) {
  const { db, client, error } = await load(ctx);
  if (error) return error;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  let result: { ok?: boolean; error?: string; [k: string]: unknown };
  switch (body.action) {
    case "answer":
      result = await saveAnswer(db, client, Number(body.itemId), body.value);
      break;
    case "task":
      result = await setTask(db, client, Number(body.itemId), Boolean(body.done), "client");
      break;
    case "file":
      result = await addFile(db, client, {
        itemId: body.itemId === null || body.itemId === undefined ? null : Number(body.itemId),
        key: String(body.key ?? ""),
        name: String(body.name ?? ""),
        size: Number(body.size ?? 0),
        type: String(body.type ?? ""),
      });
      break;
    case "deleteFile":
      result = await deleteFile(db, client, Number(body.fileId));
      break;
    case "message": {
      const res = await addMessage(db, client, "client", String(body.body ?? ""));
      if ("text" in res && res.text) await notifyAdminOfMessage(client, res.text);
      result = res;
      break;
    }
    case "email":
      result = await setClientEmail(db, client, body.email);
      break;
    case "planSeen":
      await markPlanSeen(db, client);
      result = { ok: true };
      break;
    case "read":
      await markRead(db, client, "client");
      result = { ok: true };
      break;
    default:
      return Response.json({ error: "Unknown action." }, { status: 400 });
  }

  if (result.error) return Response.json(result, { status: 400 });
  return Response.json(result, { headers: noStore });
}
