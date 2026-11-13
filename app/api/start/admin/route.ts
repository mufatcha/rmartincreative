// Ryan's side of the onboarding pages (app/start/admin). Signed in with the
// ADMIN_KEY cookie (admin-auth.ts). GET lists clients, or with ?slug= returns one
// client's page; POST makes one change.
import { isAdmin } from "../../../lib/onboarding/admin-auth";
import {
  addItem,
  addNote,
  updateNote,
  addPlanItem,
  movePlanItem,
  updatePlanItem,
  addMessage,
  addSection,
  addTemplate,
  bumpChanged,
  createClient,
  getClientBySlug,
  getDb,
  listClients,
  loadAdminState,
  markInvited,
  markNotified,
  pendingEvents,
  SHARE_TYPES,
  markRead,
  move,
  saveAnswer,
  setTask,
  deleteFile,
  updateClient,
  updateItem,
  updateSection,
} from "../../../lib/onboarding/db";
import { sendInvite, shareUpdates } from "../../../lib/onboarding/notify";
import { STARTER_TEMPLATE } from "../../../lib/onboarding/template";

export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  if (!(await isAdmin(request))) return Response.json({ error: "Sign in first." }, { status: 401 });
  const db = await getDb();
  if (!db) return Response.json({ error: "Database not available." }, { status: 503 });

  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return Response.json({ clients: await listClients(db) }, { headers: noStore });
  const client = await getClientBySlug(db, slug);
  if (!client) return Response.json({ error: "Not found." }, { status: 404 });
  if (new URL(request.url).searchParams.get("v") === String(client.changed_at)) {
    return Response.json({ unchanged: true }, { headers: noStore });
  }
  return Response.json(await loadAdminState(db, client), { headers: noStore });
}

export async function POST(request: Request) {
  if (!(await isAdmin(request))) return Response.json({ error: "Sign in first." }, { status: 401 });
  const db = await getDb();
  if (!db) return Response.json({ error: "Database not available." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.action === "createClient") {
    const res = await createClient(db, String(body.name ?? ""), String(body.email ?? ""));
    return Response.json(res, { status: res.error ? 400 : 200 });
  }

  const client = await getClientBySlug(db, String(body.slug ?? ""));
  if (!client) return Response.json({ error: "Client not found." }, { status: 404 });
  const id = Number(body.id);

  let result: { ok?: boolean; error?: string; [k: string]: unknown };
  switch (body.action) {
    case "updateClient":
      result = await updateClient(db, client, body);
      break;
    case "invite":
      if (!client.email) {
        result = { error: "Add the client's email first." };
        break;
      }
      if (await sendInvite(client, String(body.note ?? ""))) {
        await markInvited(db, client);
        // The invite introduces the whole page, so nothing set up so far needs sharing again.
        const pending = (await pendingEvents(db, client.id, "admin", SHARE_TYPES)).results;
        await markNotified(db, pending.map((e) => e.id));
        result = { ok: true };
      } else {
        result = { error: "The email couldn't be sent. Check RESEND_API_KEY." };
      }
      break;
    case "share":
      result = await shareUpdates(db, client, String(body.note ?? ""));
      break;
    case "template":
      result = await addTemplate(db, client, STARTER_TEMPLATE);
      break;
    case "addSection":
      result = await addSection(db, client, body.title);
      break;
    case "updateSection":
      result = await updateSection(db, client, id, body);
      break;
    case "moveSection":
      result = await move(db, client, "sections", id, Number(body.dir));
      break;
    case "addItem":
      result = await addItem(db, client, body);
      break;
    case "updateItem":
      result = await updateItem(db, client, id, body);
      break;
    case "moveItem":
      result = await move(db, client, "items", id, Number(body.dir));
      break;
    case "addPlan":
      result = await addPlanItem(db, client, body);
      break;
    case "updatePlan":
      result = await updatePlanItem(db, client, id, body);
      break;
    case "addNote":
      result = await addNote(db, client, body);
      break;
    case "updateNote":
      result = await updateNote(db, client, id, body);
      break;
    case "movePlan":
      result = await movePlanItem(db, client, id, Number(body.dir));
      break;
    case "task":
      result = await setTask(db, client, Number(body.itemId), Boolean(body.done), "admin");
      break;
    case "answer":
      // Ryan filling in an answer for the client (e.g. from a phone call).
      result = await saveAnswer(db, client, Number(body.itemId), body.value, "admin");
      break;
    case "deleteFile":
      result = await deleteFile(db, client, Number(body.fileId), "admin");
      break;
    case "message":
      result = await addMessage(db, client, "admin", String(body.body ?? ""));
      break;
    case "read":
      await markRead(db, client, "admin");
      result = { ok: true };
      break;
    default:
      return Response.json({ error: "Unknown action." }, { status: 400 });
  }
  if (result.error) return Response.json(result, { status: 400 });
  await bumpChanged(db, client.id);
  return Response.json(result, { headers: noStore });
}
