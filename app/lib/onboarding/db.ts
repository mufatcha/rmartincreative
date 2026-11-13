// Server-only: the onboarding pages' database (Cloudflare D1, binding ONBOARDING_DB
// in wrangler.jsonc; tables in migrations/). On Cloudflare the binding comes from
// the Worker; under `next dev`, getCloudflareContext({ async: true }) starts a local
// D1 through wrangler (stored in .wrangler/state).
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { progress } from "./progress";
import type {
  ActivityEvent,
  AdminPortalState,
  AnswerValue,
  ClientSummary,
  FieldType,
  Item,
  ItemKind,
  Message,
  PlanItem,
  PlanStage,
  PortalFile,
  PortalState,
  Section,
  TaskState,
  Viewer,
} from "./types";
import { FIELD_TYPES, ITEM_KINDS, PLAN_STAGES } from "./types";

// The parts of the D1 API used here (avoids depending on @cloudflare/workers-types).
type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<{ meta: { last_row_id: number; changes: number } }>;
};
export type D1 = { prepare(sql: string): D1Statement; batch(statements: D1Statement[]): Promise<unknown[]> };

export async function getDb(): Promise<D1 | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env as unknown as { ONBOARDING_DB?: D1 }).ONBOARDING_DB ?? null;
  } catch (err) {
    console.error("Onboarding database unavailable", err);
    return null;
  }
}

export type ClientRow = {
  id: number;
  slug: string;
  name: string;
  email: string;
  intro: string;
  created_at: number;
  invited_at: number | null;
  last_seen_at: number | null;
  client_read_at: number | null;
  admin_read_at: number | null;
  plan_seen_at: number | null;
  archived: number;
};

type ItemRow = {
  id: number;
  section_id: number;
  kind: string;
  title: string;
  help: string;
  field_type: string;
  options_json: string;
  sort: number;
  created_at: number;
};

type FileRow = {
  id: number;
  item_id: number | null;
  uploaded_by: string;
  r2_key: string;
  name: string;
  size: number;
  type: string;
  created_at: number;
};

const now = () => Date.now();

function parseJson<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

/** Lowercase name plus a random suffix: "Chris Melby" → "chrismelby-7x42k". */
export function makeSlug(name: string): string {
  const base =
    name
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 24) || "client";
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789"; // no look-alikes (l, 1, o, 0)
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `${base}-${suffix}`;
}

export const fileUrl = (slug: string, fileId: number) => `/api/start/${slug}/files/${fileId}`;

// ── Reading ────────────────────────────────────────────────────────────────

export async function getClientBySlug(db: D1, slug: string): Promise<ClientRow | null> {
  if (!/^[a-z0-9-]{3,64}$/.test(slug)) return null;
  return db.prepare("SELECT * FROM clients WHERE slug = ?").bind(slug).first<ClientRow>();
}

function toItem(row: ItemRow): Item {
  return {
    id: row.id,
    sectionId: row.section_id,
    kind: row.kind as ItemKind,
    title: row.title,
    help: row.help,
    fieldType: row.field_type as FieldType,
    options: parseJson<string[]>(row.options_json, []),
    sort: row.sort,
    createdAt: row.created_at,
  };
}

function toFile(slug: string, row: FileRow): PortalFile {
  return {
    id: row.id,
    itemId: row.item_id,
    name: row.name,
    size: row.size,
    type: row.type,
    uploadedBy: row.uploaded_by as Viewer,
    createdAt: row.created_at,
    url: fileUrl(slug, row.id),
  };
}

export async function loadState(db: D1, client: ClientRow, viewer: Viewer): Promise<PortalState> {
  const id = client.id;
  const [sections, items, responses, tasks, files, messages, plan] = await Promise.all([
    db.prepare("SELECT id, title, sort FROM sections WHERE client_id = ? AND archived = 0 ORDER BY sort, id").bind(id).all<Section>(),
    db
      .prepare(
        `SELECT i.id, i.section_id, i.kind, i.title, i.help, i.field_type, i.options_json, i.sort, i.created_at
         FROM items i JOIN sections s ON s.id = i.section_id
         WHERE i.client_id = ? AND i.archived = 0 AND s.archived = 0 ORDER BY i.sort, i.id`
      )
      .bind(id)
      .all<ItemRow>(),
    db.prepare("SELECT item_id, value_json, updated_at FROM responses WHERE client_id = ?").bind(id).all<{ item_id: number; value_json: string; updated_at: number }>(),
    db.prepare("SELECT item_id, done, done_by, updated_at FROM task_status WHERE client_id = ?").bind(id).all<{ item_id: number; done: number; done_by: string; updated_at: number }>(),
    db.prepare("SELECT * FROM files WHERE client_id = ? AND deleted = 0 ORDER BY created_at").bind(id).all<FileRow>(),
    db.prepare("SELECT id, sender, body, created_at FROM messages WHERE client_id = ? ORDER BY created_at, id").bind(id).all<{ id: number; sender: string; body: string; created_at: number }>(),
    db
      .prepare("SELECT id, stage, title, detail, sort, created_at, updated_at, removed_at FROM plan_items WHERE client_id = ? ORDER BY sort, id")
      .bind(id)
      .all<{ id: number; stage: string; title: string; detail: string; sort: number; created_at: number; updated_at: number; removed_at: number | null }>(),
  ]);

  const readAt = (viewer === "client" ? client.client_read_at : client.admin_read_at) ?? 0;
  const msgs: Message[] = messages.results.map((m) => ({ id: m.id, sender: m.sender as Viewer, body: m.body, createdAt: m.created_at }));

  return {
    client: { slug: client.slug, name: client.name, intro: client.intro, email: client.email },
    sections: sections.results,
    items: items.results.map(toItem),
    responses: Object.fromEntries(
      responses.results.map((r) => [r.item_id, { value: parseJson<AnswerValue>(r.value_json, ""), updatedAt: r.updated_at }])
    ),
    tasks: Object.fromEntries(
      tasks.results.map((t): [number, TaskState] => [t.item_id, { done: t.done === 1, doneBy: t.done_by as Viewer, updatedAt: t.updated_at }])
    ),
    files: files.results.map((f) => toFile(client.slug, f)),
    messages: msgs,
    unread: msgs.filter((m) => m.sender !== viewer && m.createdAt > readAt).length,
    plan: plan.results.map(
      (p): PlanItem => ({
        id: p.id,
        stage: p.stage as PlanStage,
        title: p.title,
        detail: p.detail,
        sort: p.sort,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        removedAt: p.removed_at,
      })
    ),
    planSeenAt: client.plan_seen_at,
  };
}

export async function loadAdminState(db: D1, client: ClientRow): Promise<AdminPortalState> {
  const [state, events] = await Promise.all([
    loadState(db, client, "admin"),
    db
      .prepare("SELECT id, actor, type, summary, created_at FROM events WHERE client_id = ? ORDER BY created_at DESC, id DESC LIMIT 60")
      .bind(client.id)
      .all<{ id: number; actor: string; type: string; summary: string; created_at: number }>(),
  ]);
  return {
    ...state,
    admin: {
      email: client.email,
      archived: client.archived === 1,
      createdAt: client.created_at,
      invitedAt: client.invited_at,
      lastSeenAt: client.last_seen_at,
      events: events.results.map(
        (e): ActivityEvent => ({ id: e.id, actor: e.actor as Viewer, type: e.type, summary: e.summary, createdAt: e.created_at })
      ),
    },
  };
}

export async function listClients(db: D1): Promise<ClientSummary[]> {
  const clients = await db.prepare("SELECT * FROM clients ORDER BY archived, created_at DESC").all<ClientRow>();
  return Promise.all(
    clients.results.map(async (c) => {
      const [state, last] = await Promise.all([
        loadState(db, c, "admin"),
        db.prepare("SELECT MAX(created_at) AS t FROM events WHERE client_id = ? AND actor = 'client'").bind(c.id).first<{ t: number | null }>(),
      ]);
      const { done, total } = progress(state.items, state);
      return {
        slug: c.slug,
        name: c.name,
        email: c.email,
        archived: c.archived === 1,
        createdAt: c.created_at,
        lastSeenAt: c.last_seen_at,
        done,
        total,
        unread: state.unread,
        lastActivity: last?.t ?? null,
      };
    })
  );
}

// ── Events ─────────────────────────────────────────────────────────────────

/** Records activity for the notification emails. Repeated autosaves of the same
 *  answer refresh one pending event instead of adding one per keystroke. */
async function recordEvent(
  db: D1,
  clientId: number,
  e: { actor: Viewer; type: string; refId?: number | null; summary: string; notified?: boolean }
) {
  const t = now();
  if (e.type === "answer" || e.type === "task") {
    const res = await db
      .prepare(
        "UPDATE events SET created_at = ?, summary = ? WHERE client_id = ? AND actor = ? AND type = ? AND ref_id = ? AND notified_at IS NULL"
      )
      .bind(t, e.summary, clientId, e.actor, e.type, e.refId ?? null)
      .run();
    if (res.meta.changes > 0) return;
  }
  await db
    .prepare("INSERT INTO events (client_id, actor, type, ref_id, summary, created_at, notified_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(clientId, e.actor, e.type, e.refId ?? null, e.summary, t, e.notified ? t : null)
    .run();
}

// ── Client actions ─────────────────────────────────────────────────────────

async function getItem(db: D1, clientId: number, itemId: number) {
  return db
    .prepare("SELECT id, section_id, kind, title, help, field_type, options_json, sort, created_at FROM items WHERE id = ? AND client_id = ? AND archived = 0")
    .bind(itemId, clientId)
    .first<ItemRow>();
}

export async function touchSeen(db: D1, client: ClientRow) {
  await db.prepare("UPDATE clients SET last_seen_at = ? WHERE id = ?").bind(now(), client.id).run();
}

export async function markRead(db: D1, client: ClientRow, viewer: Viewer) {
  const column = viewer === "client" ? "client_read_at" : "admin_read_at";
  await db.prepare(`UPDATE clients SET ${column} = ? WHERE id = ?`).bind(now(), client.id).run();
}

/** Keeps an answer to the shape its field expects, and a sensible size. */
function cleanAnswer(item: ItemRow, value: unknown): AnswerValue | null {
  if (item.field_type === "checkboxes") {
    if (!Array.isArray(value)) return null;
    const options = parseJson<string[]>(item.options_json, []);
    return value.map(String).filter((v) => options.includes(v));
  }
  if (typeof value !== "string") return null;
  return value.slice(0, 20000);
}

export async function saveAnswer(db: D1, client: ClientRow, itemId: number, value: unknown, by: Viewer = "client") {
  const item = await getItem(db, client.id, itemId);
  if (!item || item.kind !== "question") return { error: "That question no longer exists." };
  const clean = cleanAnswer(item, value);
  if (clean === null) return { error: "Invalid answer." };
  await db
    .prepare(
      `INSERT INTO responses (item_id, client_id, value_json, updated_at) VALUES (?, ?, ?, ?)
       ON CONFLICT(item_id) DO UPDATE SET value_json = excluded.value_json, updated_at = excluded.updated_at`
    )
    .bind(item.id, client.id, JSON.stringify(clean), now())
    .run();
  await recordEvent(db, client.id, { actor: by, type: "answer", refId: item.id, summary: `Answered “${item.title}”` });
  return { ok: true };
}

export async function setTask(db: D1, client: ClientRow, itemId: number, done: boolean, by: Viewer) {
  const item = await getItem(db, client.id, itemId);
  if (!item || item.kind !== "task") return { error: "That task no longer exists." };
  await db
    .prepare(
      `INSERT INTO task_status (item_id, client_id, done, done_by, updated_at) VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(item_id) DO UPDATE SET done = excluded.done, done_by = excluded.done_by, updated_at = excluded.updated_at`
    )
    .bind(item.id, client.id, done ? 1 : 0, by, now())
    .run();
  await recordEvent(db, client.id, {
    actor: by,
    type: "task",
    refId: item.id,
    summary: `${done ? "Checked off" : "Unchecked"} “${item.title}”`,
    // Ryan ticking his own checklist isn't news to the client.
    notified: by === "admin",
  });
  return { ok: true };
}

export async function addFile(
  db: D1,
  client: ClientRow,
  f: { itemId: number | null; key: string; name: string; size: number; type: string },
  by: Viewer = "client"
) {
  if (!f.key.startsWith(`clients/${client.slug}/`) || f.key.includes("..")) return { error: "Invalid file." };
  let title = "General files";
  if (f.itemId !== null) {
    const item = await getItem(db, client.id, f.itemId);
    if (!item || item.kind !== "upload") return { error: "That request no longer exists." };
    title = item.title;
  }
  const res = await db
    .prepare("INSERT INTO files (client_id, item_id, uploaded_by, r2_key, name, size, type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(client.id, f.itemId, by, f.key, f.name.slice(0, 200), Math.max(0, Math.round(f.size)), f.type.slice(0, 100), now())
    .run();
  const id = res.meta.last_row_id;
  await recordEvent(db, client.id, { actor: by, type: "file", refId: id, summary: `Uploaded ${f.name} (${title})` });
  return { ok: true, id };
}

export async function deleteFile(db: D1, client: ClientRow, fileId: number, by: Viewer = "client") {
  const file = await db.prepare("SELECT name FROM files WHERE id = ? AND client_id = ? AND deleted = 0").bind(fileId, client.id).first<{ name: string }>();
  if (!file) return { error: "That file was already removed." };
  await db.prepare("UPDATE files SET deleted = 1 WHERE id = ?").bind(fileId).run();
  // Not emailed: removing a file is housekeeping.
  await recordEvent(db, client.id, { actor: by, type: "file_removed", refId: fileId, summary: `Removed ${file.name}`, notified: true });
  return { ok: true };
}

export async function getFile(db: D1, client: ClientRow, fileId: number) {
  return db.prepare("SELECT * FROM files WHERE id = ? AND client_id = ? AND deleted = 0").bind(fileId, client.id).first<FileRow>();
}

export async function addMessage(db: D1, client: ClientRow, sender: Viewer, body: string) {
  const text = body.trim().slice(0, 5000);
  if (!text) return { error: "Message is empty." };
  const t = now();
  const res = await db.prepare("INSERT INTO messages (client_id, sender, body, created_at) VALUES (?, ?, ?, ?)").bind(client.id, sender, text, t).run();
  // The sender has obviously read the thread up to here.
  await markRead(db, client, sender);
  await recordEvent(db, client.id, {
    actor: sender,
    type: "message",
    refId: res.meta.last_row_id,
    summary: text.length > 140 ? `${text.slice(0, 140)}…` : text,
    // Client messages are emailed to Ryan right away by the route, not the digest.
    notified: sender === "client",
  });
  return { ok: true, id: res.meta.last_row_id, text };
}

export const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

/** The client adds (or changes) the address their notifications go to, for
 *  clients Ryan started without one. */
export async function setClientEmail(db: D1, client: ClientRow, email: unknown) {
  const clean = typeof email === "string" ? email.trim().slice(0, 200) : "";
  if (!validEmail(clean)) return { error: "That doesn't look like an email address." };
  if (clean.toLowerCase() === client.email.toLowerCase()) return { ok: true };
  await db.prepare("UPDATE clients SET email = ? WHERE id = ?").bind(clean, client.id).run();
  await recordEvent(db, client.id, {
    actor: "client",
    type: "contact",
    summary: client.email ? `Changed their email to ${clean}` : `Added their email: ${clean}`,
  });
  return { ok: true };
}

// ── Admin actions ──────────────────────────────────────────────────────────

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function createClient(db: D1, name: string, email: string) {
  const cleanName = str(name, 120);
  if (!cleanName) return { error: "Add a name." };
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = makeSlug(cleanName);
    const exists = await db.prepare("SELECT 1 FROM clients WHERE slug = ?").bind(slug).first();
    if (exists) continue;
    await db
      .prepare("INSERT INTO clients (slug, name, email, intro, created_at) VALUES (?, ?, ?, '', ?)")
      .bind(slug, cleanName, str(email, 200), now())
      .run();
    return { ok: true, slug };
  }
  return { error: "Couldn't make a unique link. Try again." };
}

export async function updateClient(db: D1, client: ClientRow, patch: { name?: unknown; email?: unknown; intro?: unknown; archived?: unknown }) {
  await db
    .prepare("UPDATE clients SET name = ?, email = ?, intro = ?, archived = ? WHERE id = ?")
    .bind(
      patch.name !== undefined ? str(patch.name, 120) || client.name : client.name,
      patch.email !== undefined ? str(patch.email, 200) : client.email,
      patch.intro !== undefined ? str(patch.intro, 5000) : client.intro,
      patch.archived !== undefined ? (patch.archived ? 1 : 0) : client.archived,
      client.id
    )
    .run();
  return { ok: true };
}

export async function markInvited(db: D1, client: ClientRow) {
  await db.prepare("UPDATE clients SET invited_at = ? WHERE id = ?").bind(now(), client.id).run();
}

async function nextSort(db: D1, table: "sections" | "items", column: string, id: number) {
  const row = await db.prepare(`SELECT COALESCE(MAX(sort), 0) + 10 AS s FROM ${table} WHERE ${column} = ?`).bind(id).first<{ s: number }>();
  return row?.s ?? 10;
}

export async function addSection(db: D1, client: ClientRow, title: unknown) {
  const t = str(title, 120);
  if (!t) return { error: "Add a section title." };
  const res = await db
    .prepare("INSERT INTO sections (client_id, title, sort) VALUES (?, ?, ?)")
    .bind(client.id, t, await nextSort(db, "sections", "client_id", client.id))
    .run();
  return { ok: true, id: res.meta.last_row_id };
}

export async function updateSection(db: D1, client: ClientRow, id: number, patch: { title?: unknown; archived?: unknown }) {
  if (patch.title !== undefined) {
    const t = str(patch.title, 120);
    if (!t) return { error: "Add a section title." };
    await db.prepare("UPDATE sections SET title = ? WHERE id = ? AND client_id = ?").bind(t, id, client.id).run();
  }
  if (patch.archived) await db.prepare("UPDATE sections SET archived = 1 WHERE id = ? AND client_id = ?").bind(id, client.id).run();
  return { ok: true };
}

/** Swaps a section or item with its neighbour (dir -1 = up, 1 = down). */
export async function move(db: D1, client: ClientRow, table: "sections" | "items", id: number, dir: number) {
  const scope = table === "items" ? "section_id" : "client_id";
  const row = await db.prepare(`SELECT id, sort, ${scope} AS scope FROM ${table} WHERE id = ? AND client_id = ?`).bind(id, client.id).first<{ id: number; sort: number; scope: number }>();
  if (!row) return { error: "Not found." };
  const siblings = await db
    .prepare(`SELECT id, sort FROM ${table} WHERE ${scope} = ? AND client_id = ? AND archived = 0 ORDER BY sort, id`)
    .bind(row.scope, client.id)
    .all<{ id: number; sort: number }>();
  const list = siblings.results;
  const i = list.findIndex((s) => s.id === id);
  const j = i + (dir < 0 ? -1 : 1);
  if (i < 0 || j < 0 || j >= list.length) return { ok: true };
  [list[i], list[j]] = [list[j], list[i]];
  await db.batch(list.map((s, k) => db.prepare(`UPDATE ${table} SET sort = ? WHERE id = ?`).bind((k + 1) * 10, s.id)));
  return { ok: true };
}

type ItemInput = { sectionId?: unknown; kind?: unknown; title?: unknown; help?: unknown; fieldType?: unknown; options?: unknown };

function cleanItem(input: ItemInput) {
  const kind = (ITEM_KINDS as readonly string[]).includes(String(input.kind)) ? (String(input.kind) as ItemKind) : "question";
  const fieldType = (FIELD_TYPES as readonly string[]).includes(String(input.fieldType)) ? (String(input.fieldType) as FieldType) : "text";
  const options = Array.isArray(input.options)
    ? [...new Set(input.options.map((o) => str(o, 200)).filter(Boolean))].slice(0, 50)
    : [];
  return { kind, title: str(input.title, 300), help: str(input.help, 2000), fieldType, options };
}

export async function addItem(db: D1, client: ClientRow, input: ItemInput) {
  const sectionId = Number(input.sectionId);
  const section = await db.prepare("SELECT id FROM sections WHERE id = ? AND client_id = ? AND archived = 0").bind(sectionId, client.id).first();
  if (!section) return { error: "Pick a section." };
  const item = cleanItem(input);
  if (!item.title && !(item.kind === "note" && item.help)) return { error: "Add a title." };
  const res = await db
    .prepare(
      "INSERT INTO items (client_id, section_id, kind, title, help, field_type, options_json, sort, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(client.id, sectionId, item.kind, item.title, item.help, item.fieldType, JSON.stringify(item.options), await nextSort(db, "items", "section_id", sectionId), now())
    .run();
  if (item.kind !== "note") {
    const label = item.kind === "upload" ? "File request" : item.kind === "task" ? "New task" : "New question";
    await recordEvent(db, client.id, { actor: "admin", type: "request", refId: res.meta.last_row_id, summary: `${label}: ${item.title}` });
  }
  return { ok: true, id: res.meta.last_row_id };
}

export async function updateItem(db: D1, client: ClientRow, id: number, input: ItemInput & { archived?: unknown }) {
  const existing = await getItem(db, client.id, id);
  if (!existing) return { error: "Not found." };
  if (input.archived) {
    await db.prepare("UPDATE items SET archived = 1 WHERE id = ?").bind(id).run();
    return { ok: true };
  }
  const item = cleanItem({ kind: existing.kind, fieldType: existing.field_type, ...input });
  if (!item.title && !(item.kind === "note" && item.help)) return { error: "Add a title." };
  let sectionId = existing.section_id;
  if (input.sectionId !== undefined && Number(input.sectionId) !== sectionId) {
    const section = await db.prepare("SELECT id FROM sections WHERE id = ? AND client_id = ? AND archived = 0").bind(Number(input.sectionId), client.id).first();
    if (section) sectionId = Number(input.sectionId);
  }
  await db
    .prepare("UPDATE items SET section_id = ?, kind = ?, title = ?, help = ?, field_type = ?, options_json = ? WHERE id = ?")
    .bind(sectionId, item.kind, item.title, item.help, item.fieldType, JSON.stringify(item.options), id)
    .run();
  return { ok: true };
}

/** Adds sections and items in one go (the starter template). Creating them
 *  doesn't count as "new requests": the invite email introduces the page. */
export async function addTemplate(
  db: D1,
  client: ClientRow,
  template: { title: string; items: (ItemInput & { title: string })[] }[]
) {
  let sort = await nextSort(db, "sections", "client_id", client.id);
  for (const section of template) {
    const res = await db.prepare("INSERT INTO sections (client_id, title, sort) VALUES (?, ?, ?)").bind(client.id, section.title, sort).run();
    sort += 10;
    const sectionId = res.meta.last_row_id;
    await db.batch(
      section.items.map((raw, k) => {
        const item = cleanItem(raw);
        return db
          .prepare(
            "INSERT INTO items (client_id, section_id, kind, title, help, field_type, options_json, sort, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
          )
          .bind(client.id, sectionId, item.kind, item.title, item.help, item.fieldType, JSON.stringify(item.options), (k + 1) * 10, now());
      })
    );
  }
  return { ok: true };
}

// ── Project plan ───────────────────────────────────────────────────────────

/** The client opened the plan: later changes get New / Updated / Removed labels. */
export async function markPlanSeen(db: D1, client: ClientRow) {
  await db.prepare("UPDATE clients SET plan_seen_at = ? WHERE id = ?").bind(now(), client.id).run();
}

const cleanStage = (v: unknown): PlanStage => ((PLAN_STAGES as readonly string[]).includes(String(v)) ? (String(v) as PlanStage) : "next");

async function nextPlanSort(db: D1, clientId: number, stage: PlanStage) {
  const row = await db
    .prepare("SELECT COALESCE(MAX(sort), 0) + 10 AS s FROM plan_items WHERE client_id = ? AND stage = ?")
    .bind(clientId, stage)
    .first<{ s: number }>();
  return row?.s ?? 10;
}

export async function addPlanItem(db: D1, client: ClientRow, input: { stage?: unknown; title?: unknown; detail?: unknown }) {
  const title = str(input.title, 200);
  if (!title) return { error: "Add a title." };
  const stage = cleanStage(input.stage);
  const t = now();
  const res = await db
    .prepare("INSERT INTO plan_items (client_id, stage, title, detail, sort, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(client.id, stage, title, str(input.detail, 2000), await nextPlanSort(db, client.id, stage), t, t)
    .run();
  await recordEvent(db, client.id, { actor: "admin", type: "plan", refId: res.meta.last_row_id, summary: `Added to the plan: ${title}` });
  return { ok: true, id: res.meta.last_row_id };
}

const STAGE_CHANGE: Record<PlanStage, string> = {
  now: "Now working on",
  next: "Moved to up next",
  feature: "Now a planned feature",
  done: "Finished",
};

export async function updatePlanItem(
  db: D1,
  client: ClientRow,
  id: number,
  input: { stage?: unknown; title?: unknown; detail?: unknown; removed?: unknown }
) {
  const row = await db
    .prepare("SELECT stage, title, detail, removed_at FROM plan_items WHERE id = ? AND client_id = ?")
    .bind(id, client.id)
    .first<{ stage: string; title: string; detail: string; removed_at: number | null }>();
  if (!row) return { error: "Not found." };
  const t = now();

  if (input.removed !== undefined) {
    const removed = Boolean(input.removed);
    if (removed === (row.removed_at !== null)) return { ok: true };
    await db.prepare("UPDATE plan_items SET removed_at = ?, updated_at = ? WHERE id = ?").bind(removed ? t : null, t, id).run();
    await recordEvent(db, client.id, {
      actor: "admin",
      type: "plan",
      refId: id,
      summary: removed ? `Removed from the plan: ${row.title}` : `Back on the plan: ${row.title}`,
    });
    return { ok: true };
  }

  const title = input.title !== undefined ? str(input.title, 200) : row.title;
  if (!title) return { error: "Add a title." };
  const detail = input.detail !== undefined ? str(input.detail, 2000) : row.detail;
  const stage = input.stage !== undefined ? cleanStage(input.stage) : (row.stage as PlanStage);
  if (title === row.title && detail === row.detail && stage === row.stage) return { ok: true };

  const sort = stage !== row.stage ? await nextPlanSort(db, client.id, stage) : null;
  await db
    .prepare("UPDATE plan_items SET stage = ?, title = ?, detail = ?, sort = COALESCE(?, sort), updated_at = ? WHERE id = ?")
    .bind(stage, title, detail, sort, t, id)
    .run();
  if (stage !== row.stage) {
    await recordEvent(db, client.id, { actor: "admin", type: "plan", refId: id, summary: `${STAGE_CHANGE[stage]}: ${title}` });
  } else {
    // Wording tweaks get an "Updated" label on the page but aren't worth an email.
    await recordEvent(db, client.id, { actor: "admin", type: "plan_edit", refId: id, summary: `Updated on the plan: ${title}`, notified: true });
  }
  return { ok: true };
}

export async function movePlanItem(db: D1, client: ClientRow, id: number, dir: number) {
  const row = await db.prepare("SELECT stage FROM plan_items WHERE id = ? AND client_id = ?").bind(id, client.id).first<{ stage: string }>();
  if (!row) return { error: "Not found." };
  const list = (
    await db
      .prepare("SELECT id FROM plan_items WHERE client_id = ? AND stage = ? AND removed_at IS NULL ORDER BY sort, id")
      .bind(client.id, row.stage)
      .all<{ id: number }>()
  ).results;
  const i = list.findIndex((p) => p.id === id);
  const j = i + (dir < 0 ? -1 : 1);
  if (i < 0 || j < 0 || j >= list.length) return { ok: true };
  [list[i], list[j]] = [list[j], list[i]];
  await db.batch(list.map((p, k) => db.prepare("UPDATE plan_items SET sort = ? WHERE id = ?").bind((k + 1) * 10, p.id)));
  return { ok: true };
}

// ── Notification queries (app/lib/onboarding/notify.ts) ────────────────────

export type PendingEvent = { id: number; type: string; ref_id: number | null; summary: string; created_at: number };

export async function clientsWithPending(db: D1, actor: Viewer) {
  return db
    .prepare(
      `SELECT c.*, MAX(e.created_at) AS newest FROM clients c JOIN events e ON e.client_id = c.id
       WHERE e.actor = ? AND e.notified_at IS NULL GROUP BY c.id`
    )
    .bind(actor)
    .all<ClientRow & { newest: number }>();
}

export async function pendingEvents(db: D1, clientId: number, actor: Viewer) {
  return db
    .prepare("SELECT id, type, ref_id, summary, created_at FROM events WHERE client_id = ? AND actor = ? AND notified_at IS NULL ORDER BY created_at")
    .bind(clientId, actor)
    .all<PendingEvent>();
}

export async function markNotified(db: D1, ids: number[]) {
  if (!ids.length) return;
  const t = now();
  await db.batch(ids.map((id) => db.prepare("UPDATE events SET notified_at = ? WHERE id = ?").bind(t, id)));
}
