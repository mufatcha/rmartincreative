// Server-only: the admin side of the onboarding pages is behind one password,
// the ADMIN_KEY secret. Signing in (/api/start/admin/login) stores a hash of it
// in an httpOnly cookie; the Worker's cron sends the key itself in a header.
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rmc_admin";

async function sha256(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function adminKey(): string | null {
  return process.env.ADMIN_KEY?.trim() || null;
}

/** The cookie value for a signed-in admin. */
export async function adminToken(): Promise<string | null> {
  const key = adminKey();
  return key ? sha256(`rmc-onboarding:${key}`) : null;
}

export async function keyMatches(candidate: string): Promise<boolean> {
  const key = adminKey();
  if (!key || !candidate) return false;
  // Compare hashes so the comparison time doesn't depend on the key.
  return (await sha256(candidate.trim())) === (await sha256(key));
}

export async function isAdmin(request?: Request): Promise<boolean> {
  const token = await adminToken();
  if (!token) return false;
  const header = request?.headers.get("x-admin-key");
  if (header) return keyMatches(header);
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === token;
}
