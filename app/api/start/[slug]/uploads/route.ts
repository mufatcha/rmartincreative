// Presigned R2 upload URLs for an onboarding page, like /api/uploads for the
// quote form but with the onboarding limits (videos, bigger files) and keys under
// clients/<slug>/, which the quote form's 90-day cleanup rule doesn't touch.
import { getClientBySlug, getDb } from "../../../../lib/onboarding/db";
import { getR2, presignPut, sanitizeFileName } from "../../../../lib/r2";
import { ONBOARDING_RULES, checkBatch, type UploadRequestFile } from "../../../../lib/upload-rules";

export async function POST(request: Request, ctx: { params: Promise<{ slug: string }> }) {
  const r2 = getR2();
  const db = await getDb();
  if (!r2 || !db) return Response.json({ error: "File uploads aren't available right now." }, { status: 503 });

  const client = await getClientBySlug(db, (await ctx.params).slug);
  if (!client || client.archived) return Response.json({ error: "Not found." }, { status: 404 });

  let files: UploadRequestFile[];
  try {
    const body = (await request.json()) as { files?: unknown };
    if (!Array.isArray(body.files)) throw new Error("files must be an array");
    files = body.files.map((f) => ({ name: String(f?.name ?? ""), type: String(f?.type ?? ""), size: Number(f?.size ?? 0) }));
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const problem = checkBatch(files, ONBOARDING_RULES);
  if (problem) return Response.json({ error: problem }, { status: 400 });

  const date = new Date().toISOString().slice(0, 10);
  const uploads = await Promise.all(
    files.map(async (file) => {
      const key = `clients/${client.slug}/${date}/${crypto.randomUUID()}/${sanitizeFileName(file.name)}`;
      // Big videos on slow connections need longer than the quote form's 15 minutes.
      return { key, url: await presignPut(r2, key, 6 * 60 * 60) };
    })
  );
  return Response.json({ uploads });
}
