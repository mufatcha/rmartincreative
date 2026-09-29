import { BUSINESS_EMAIL } from "../../lib/business";
import { getQuoteService } from "../../lib/quote-services";
import { getR2, presignGet } from "../../lib/r2";
import { MAX_FILES, formatBytes } from "../../lib/upload-rules";

type QuoteFile = { key: string; name: string; size: number };

type QuoteBody = {
  serviceId?: unknown;
  answers?: unknown;
  contact?: unknown;
  files?: unknown;
  turnstileToken?: unknown;
  website?: unknown; // honeypot — real visitors never see or fill this
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const str = (value: unknown, max = 5000) => (typeof value === "string" ? value.trim().slice(0, max) : "");

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true; // Not configured yet — the honeypot still applies.
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = (await res.json()) as { success?: boolean; hostname?: string; "error-codes"?: string[] };
  if (data.success !== true) {
    // Shows up in the Worker's logs. Common codes: invalid-input-secret (wrong
    // secret key), timeout-or-duplicate (token already used or expired),
    // invalid-input-response (missing or malformed token).
    console.error("Turnstile verification failed", data["error-codes"], "hostname:", data.hostname);
  }
  return data.success === true;
}

export async function POST(request: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return Response.json({ error: "Online requests aren't set up yet." }, { status: 503 });
  }

  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field; quietly accept so they don't retry.
  if (str(body.website)) return Response.json({ ok: true });

  const service = getQuoteService(str(body.serviceId, 50));
  const contact = (body.contact ?? {}) as Record<string, unknown>;
  const name = str(contact.name, 200);
  const email = str(contact.email, 200);
  if (!service || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please include your name and a valid email." }, { status: 400 });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;
  if (!(await verifyTurnstile(str(body.turnstileToken, 4000), ip))) {
    return Response.json({ error: "We couldn't verify the request. Please try again." }, { status: 400 });
  }

  // Answers, labeled with the same question text the customer saw.
  const rawAnswers = (body.answers ?? {}) as Record<string, unknown>;
  const answerRows = service.questions
    .map((q) => {
      const value = rawAnswers[q.id];
      const text = Array.isArray(value) ? value.map((v) => str(v, 200)).filter(Boolean).join(", ") : str(value);
      return text ? { label: q.label, text } : null;
    })
    .filter((row): row is { label: string; text: string } => row !== null);

  // Only accept keys this site's upload route could have issued.
  const files: QuoteFile[] = (Array.isArray(body.files) ? body.files : [])
    .slice(0, MAX_FILES)
    .map((f) => ({ key: str(f?.key, 400), name: str(f?.name, 200), size: Number(f?.size) || 0 }))
    .filter((f) => f.key.startsWith("quotes/") && !f.key.includes(".."));

  const r2 = getR2();
  const fileLinks = r2
    ? await Promise.all(files.map(async (f) => ({ ...f, url: await presignGet(r2, f.key) })))
    : files.map((f) => ({ ...f, url: "" }));

  const phone = str(contact.phone, 50);
  const notes = str(contact.notes);

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ...(phone ? [["Phone", phone] as [string, string]] : []),
    ...answerRows.map((r) => [r.label, r.text] as [string, string]),
    ...(notes ? [["Anything else", notes] as [string, string]] : []),
  ];

  const html = `
    <h2 style="margin:0 0 16px">New quote request: ${escapeHtml(service.label)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="vertical-align:top;color:#5a5270;padding-right:16px"><strong>${escapeHtml(label)}</strong></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>
    ${
      fileLinks.length
        ? `<h3 style="margin:24px 0 8px">Files (${fileLinks.length})</h3>
    <ul style="font-size:14px;padding-left:18px">
      ${fileLinks
        .map(
          (f) =>
            `<li>${f.url ? `<a href="${escapeHtml(f.url)}">${escapeHtml(f.name)}</a>` : escapeHtml(f.name)} (${formatBytes(f.size)})</li>`
        )
        .join("")}
    </ul>
    <p style="font-size:12px;color:#5a5270">Download links work for 7 days. Files stay in your R2 bucket (${escapeHtml(
      fileLinks[0].key.split("/").slice(0, 3).join("/")
    )}) for 90 days.</p>`
        : `<p style="font-size:14px;color:#5a5270">No files attached.</p>`
    }
    <p style="font-size:12px;color:#5a5270">Reply to this email to respond to ${escapeHtml(name)} directly.</p>`;

  const text = [
    `New quote request: ${service.label}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    fileLinks.length
      ? `Files:\n${fileLinks.map((f) => `- ${f.name} (${formatBytes(f.size)})${f.url ? `\n  ${f.url}` : ""}`).join("\n")}`
      : "No files attached.",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL || "Quote Requests <onboarding@resend.dev>",
      to: [process.env.QUOTE_TO_EMAIL || BUSINESS_EMAIL],
      reply_to: email,
      subject: `Quote request: ${service.label} — ${name}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ error: "Your request couldn't be sent. Please try again or call." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
