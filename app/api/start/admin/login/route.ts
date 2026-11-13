// Signs in to the onboarding admin. GET /api/start/admin/login?key=… (a bookmark)
// or POST the sign-in form. Sets a year-long httpOnly cookie, then goes to the
// admin page so the key doesn't stay in the address bar or history.
import { ADMIN_COOKIE, adminToken, keyMatches } from "../../../../lib/onboarding/admin-auth";

async function signIn(request: Request, key: string, next: string) {
  const target = new URL(next.startsWith("/start/admin") ? next : "/start/admin", request.url);
  if (!(await keyMatches(key))) {
    target.pathname = "/start/admin";
    target.search = "?error=1";
    return Response.redirect(target, 303);
  }
  const token = (await adminToken())!;
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return new Response(null, {
    status: 303,
    headers: {
      Location: target.toString(),
      "Set-Cookie": `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${secure}`,
    },
  });
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  return signIn(request, params.get("key") ?? "", params.get("next") ?? "");
}

export async function POST(request: Request) {
  const form = await request.formData();
  return signIn(request, String(form.get("key") ?? ""), String(form.get("next") ?? ""));
}
