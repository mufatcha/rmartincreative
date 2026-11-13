// Server-only: emails for the onboarding pages.
//  - A client's chat message emails Ryan straight away (notifyAdminOfMessage).
//  - Everything else is batched by runNotifications(), which the Worker's cron
//    calls every 5 minutes (custom-worker.ts → /api/start/admin/cron):
//      · Ryan gets one digest of answers, uploads, and ticked tasks once the
//        client has been idle for ADMIN_IDLE_MS.
//      · The client gets one email about new messages and requests from Ryan,
//        unless they've had the page open since (they've seen it already).
import { BUSINESS_EMAIL, BUSINESS_NAME, SITE_URL } from "../business";
import { escapeHtml, sendEmail } from "../email";
import { formatBytes } from "../upload-rules";
import { clientsWithPending, loadState, markNotified, pendingEvents, type ClientRow, type D1 } from "./db";
import { answerText } from "./progress";

const ADMIN_IDLE_MS = 10 * 60 * 1000;
/** Waits this long after Ryan's last change so a burst of edits is one email. */
const CLIENT_SETTLE_MS = 3 * 60 * 1000;

const FROM = () => process.env.ONBOARDING_FROM_EMAIL || `${BUSINESS_NAME} <hello@rmartincreative.com>`;
const ADMIN_TO = () => process.env.ADMIN_NOTIFY_EMAIL || BUSINESS_EMAIL;

export const clientUrl = (slug: string) => `${SITE_URL}/start/${slug}`;
export const adminUrl = (slug: string) => `${SITE_URL}/start/admin/${slug}`;

function button(href: string, label: string) {
  return `<p style="margin:24px 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:#6d28d9;color:#fff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:999px">${escapeHtml(label)}</a></p>`;
}

function shell(body: string) {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#1c1530;max-width:560px">${body}<p style="margin-top:32px;font-size:12px;color:#8a83a0">${escapeHtml(BUSINESS_NAME)}</p></div>`;
}

const quote = (text: string) =>
  `<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #c4b5fd;background:#f5f3ff;white-space:pre-wrap">${escapeHtml(text)}</blockquote>`;

// ── To Ryan ────────────────────────────────────────────────────────────────

export async function notifyAdminOfMessage(client: ClientRow, text: string) {
  const link = adminUrl(client.slug);
  return sendEmail({
    from: FROM(),
    to: [ADMIN_TO()],
    replyTo: client.email || undefined,
    subject: `New message from ${client.name}`,
    html: shell(`<p><strong>${escapeHtml(client.name)}</strong> sent a message:</p>${quote(text)}${button(link, "Reply")}`),
    text: `${client.name} sent a message:\n\n${text}\n\nReply: ${link}`,
  });
}

async function sendAdminDigest(db: D1, client: ClientRow) {
  const events = (await pendingEvents(db, client.id, "client")).results;
  if (!events.length) return;
  const state = await loadState(db, client, "admin");
  const items = new Map(state.items.map((i) => [i.id, i]));
  const files = new Map(state.files.map((f) => [f.id, f]));

  const answers: [string, string][] = [];
  const uploads: { name: string; size: number; url: string; request: string }[] = [];
  const tasks: string[] = [];
  for (const e of events) {
    if (e.type === "answer" && e.ref_id !== null) {
      const item = items.get(e.ref_id);
      if (item) answers.push([item.title, answerText(state.responses[item.id]?.value) || "(cleared)"]);
    } else if (e.type === "file" && e.ref_id !== null) {
      const f = files.get(e.ref_id);
      if (f) uploads.push({ name: f.name, size: f.size, url: `${SITE_URL}${f.url}?download=1`, request: f.itemId ? (items.get(f.itemId)?.title ?? "") : "General files" });
    } else if (e.type === "task" || e.type === "contact") {
      tasks.push(e.summary);
    }
  }

  if (answers.length || uploads.length || tasks.length) {
    const link = adminUrl(client.slug);
    const parts: string[] = [];
    const lines: string[] = [];
    if (answers.length) {
      parts.push(
        `<h3 style="margin:24px 0 8px">Answers (${answers.length})</h3><table cellpadding="6" style="border-collapse:collapse;font-size:14px">${answers
          .map(([q, a]) => `<tr><td style="vertical-align:top;color:#5a5270;padding-right:16px"><strong>${escapeHtml(q)}</strong></td><td style="white-space:pre-wrap">${escapeHtml(a)}</td></tr>`)
          .join("")}</table>`
      );
      lines.push("Answers:", ...answers.map(([q, a]) => `- ${q}: ${a}`), "");
    }
    if (uploads.length) {
      parts.push(
        `<h3 style="margin:24px 0 8px">Files (${uploads.length})</h3><ul style="font-size:14px;padding-left:18px">${uploads
          .map((u) => `<li><a href="${escapeHtml(u.url)}">${escapeHtml(u.name)}</a> (${formatBytes(u.size)}) · ${escapeHtml(u.request)}</li>`)
          .join("")}</ul>`
      );
      lines.push("Files:", ...uploads.map((u) => `- ${u.name} (${formatBytes(u.size)}) · ${u.request}\n  ${u.url}`), "");
    }
    if (tasks.length) {
      parts.push(`<h3 style="margin:24px 0 8px">Checklist & details</h3><ul style="font-size:14px;padding-left:18px">${tasks.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`);
      lines.push("Checklist & details:", ...tasks.map((t) => `- ${t}`), "");
    }
    const count = answers.length + uploads.length + tasks.length;
    const sent = await sendEmail({
      from: FROM(),
      to: [ADMIN_TO()],
      replyTo: client.email || undefined,
      subject: `${client.name} updated their onboarding page (${count} change${count === 1 ? "" : "s"})`,
      html: shell(`<p><strong>${escapeHtml(client.name)}</strong> made changes to their onboarding page.</p>${parts.join("")}${button(link, "Open their page")}`),
      text: `${client.name} made changes to their onboarding page.\n\n${lines.join("\n")}\n${link}`,
    });
    if (!sent) return; // try again next run
  }
  await markNotified(db, events.map((e) => e.id));
}

// ── To the client ──────────────────────────────────────────────────────────

async function sendClientUpdate(db: D1, client: ClientRow & { newest: number }) {
  const events = (await pendingEvents(db, client.id, "admin")).results;
  if (!events.length) return;
  const ids = events.map((e) => e.id);

  // Not invited yet (Ryan is still setting the page up), no email address, or
  // they've had the page open since: nothing to send.
  const notInvited = !client.invited_at && !client.last_seen_at;
  const alreadySeen = (client.last_seen_at ?? 0) >= client.newest;
  if (notInvited || alreadySeen || !client.email) return markNotified(db, ids);

  const messages = events.filter((e) => e.type === "message");
  const requests = events.filter((e) => e.type === "request");
  // Only the latest change per plan item (added, then finished = "Finished: ...").
  const planChanges = [...new Map(events.filter((e) => e.type === "plan").map((e) => [e.ref_id, e])).values()];
  if (!messages.length && !requests.length && !planChanges.length) return markNotified(db, ids);

  const state = await loadState(db, client, "client");
  const messageText = messages
    .map((e) => state.messages.find((m) => m.id === e.ref_id)?.body)
    .filter((b): b is string => Boolean(b));
  const link = clientUrl(client.slug);
  const first = client.name.split(/\s+/)[0];

  const subject = messageText.length && requests.length
    ? `New message and ${requests.length === 1 ? "a new request" : `${requests.length} new requests`} on your onboarding page`
    : messageText.length
      ? "You have a new message on your onboarding page"
      : requests.length === 1
        ? `New request: ${requests[0].summary.replace(/^[^:]+:\s*/, "")}`
        : requests.length
          ? `${requests.length} new requests on your onboarding page`
          : "Your project plan was updated";

  const html = shell(
    `<p>Hi ${escapeHtml(first)},</p>` +
      (messageText.length ? `<p>You have ${messageText.length === 1 ? "a new message" : "new messages"}:</p>${messageText.map(quote).join("")}` : "") +
      (requests.length
        ? `<p>${requests.length === 1 ? "There's something new" : "There are a few new things"} for you on your onboarding page:</p><ul>${requests
            .map((r) => `<li>${escapeHtml(r.summary)}</li>`)
            .join("")}</ul>`
        : "") +
      (planChanges.length
        ? `<p>Project plan updates:</p><ul>${planChanges.map((r) => `<li>${escapeHtml(r.summary)}</li>`).join("")}</ul>`
        : "") +
      button(link, "Open your page") +
      `<p style="font-size:13px;color:#5a5270">Everything saves as you go. You can reply right on the page.</p>`
  );
  const text = [
    `Hi ${first},`,
    "",
    ...(messageText.length ? ["New message:", ...messageText.map((m) => `> ${m.replace(/\n/g, "\n> ")}`), ""] : []),
    ...(requests.length ? ["New on your onboarding page:", ...requests.map((r) => `- ${r.summary}`), ""] : []),
    ...(planChanges.length ? ["Project plan updates:", ...planChanges.map((r) => `- ${r.summary}`), ""] : []),
    `Open your page: ${link}`,
  ].join("\n");

  const sent = await sendEmail({ from: FROM(), to: [client.email], replyTo: ADMIN_TO(), subject, html, text });
  if (sent) await markNotified(db, ids);
}

/** Emails the client their link (the "Send invite" button on the admin page). */
export async function sendInvite(client: ClientRow, note: string) {
  const link = clientUrl(client.slug);
  const first = client.name.split(/\s+/)[0];
  const extra = note.trim();
  return sendEmail({
    from: FROM(),
    to: [client.email],
    replyTo: ADMIN_TO(),
    subject: "Your onboarding page is ready",
    html: shell(
      `<p>Hi ${escapeHtml(first)},</p>${extra ? `<p style="white-space:pre-wrap">${escapeHtml(extra)}</p>` : ""}<p>Your private onboarding page is ready. It has a few questions, a checklist, and a place to upload photos and videos. Everything saves as you go, so you can come back to it any time.</p>${button(link, "Open your page")}<p style="font-size:13px;color:#5a5270"><strong>Please keep this link private.</strong> It works as the passcode to your project information, so don't post it on social media, review sites, or anywhere public. If you have questions, send a message right on the page.</p>`
    ),
    text: `Hi ${first},\n\n${extra ? `${extra}\n\n` : ""}Your private onboarding page is ready. Everything saves as you go, so you can come back to it any time.\n\n${link}\n\nPlease keep this link private: it works as the passcode to your project information, so don't post it anywhere public. If you have questions, send a message right on the page.`,
  });
}

export async function runNotifications(db: D1) {
  const now = Date.now();
  let admin = 0;
  let client = 0;

  for (const c of (await clientsWithPending(db, "client")).results) {
    if (now - c.newest < ADMIN_IDLE_MS) continue; // still working on it
    await sendAdminDigest(db, c);
    admin++;
  }
  for (const c of (await clientsWithPending(db, "admin")).results) {
    if (now - c.newest < CLIENT_SETTLE_MS) continue;
    await sendClientUpdate(db, c);
    client++;
  }
  return { admin, client };
}
