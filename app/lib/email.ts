// Server-only: sends email through Resend's HTTP API (no SDK, so it runs the same
// in `next dev` and on Cloudflare Workers). Used by the quote form and the client
// onboarding pages. rmartincreative.com is verified in Resend.

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type Email = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/** True when Resend is set up (RESEND_API_KEY). */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Sends one email. Returns false (and logs why) when it couldn't be sent. */
export async function sendEmail(email: Email): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("sendEmail: RESEND_API_KEY isn't set");
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: email.from,
      to: email.to,
      ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return false;
  }
  return true;
}
