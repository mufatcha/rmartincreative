// A stable address for an uploaded file: redirects to a short-lived R2 link.
// Pages and emails use this instead of R2 links, which expire and change every
// time they're signed (so images would re-download on every poll).
import { getClientBySlug, getDb, getFile } from "../../../../../lib/onboarding/db";
import { getR2, presignGet } from "../../../../../lib/r2";

export async function GET(request: Request, ctx: { params: Promise<{ slug: string; id: string }> }) {
  const r2 = getR2();
  const db = await getDb();
  if (!r2 || !db) return new Response("Not available right now.", { status: 503 });

  const { slug, id } = await ctx.params;
  const client = await getClientBySlug(db, slug);
  const file = client ? await getFile(db, client, Number(id)) : null;
  if (!file) return new Response("Not found.", { status: 404 });

  const download = new URL(request.url).searchParams.get("download") === "1";
  const url = await presignGet(r2, file.r2_key, 60 * 60, download ? file.name : undefined);
  return new Response(null, {
    status: 302,
    // The browser can reuse the redirect for a while, matching the link's life.
    headers: { Location: url, "Cache-Control": "private, max-age=3000" },
  });
}
