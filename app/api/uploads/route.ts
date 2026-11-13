import { getR2, presignPut, sanitizeFileName } from "../../lib/r2";
import { QUOTE_RULES, checkBatch, type UploadRequestFile } from "../../lib/upload-rules";

// Hands the browser short-lived URLs to upload straight to R2, so large files
// never pass through this server (and its request-size limits).
export async function POST(request: Request) {
  const r2 = getR2();
  if (!r2) {
    return Response.json({ error: "File uploads aren't set up yet." }, { status: 503 });
  }

  let files: UploadRequestFile[];
  try {
    const body = (await request.json()) as { files?: unknown };
    if (!Array.isArray(body.files)) throw new Error("files must be an array");
    files = body.files.map((f) => ({
      name: String(f?.name ?? ""),
      type: String(f?.type ?? ""),
      size: Number(f?.size ?? 0),
    }));
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const problem = checkBatch(files, QUOTE_RULES);
  if (problem) return Response.json({ error: problem }, { status: 400 });

  const date = new Date().toISOString().slice(0, 10);
  const batch = crypto.randomUUID();
  const uploads = await Promise.all(
    files.map(async (file, i) => {
      const key = `quotes/${date}/${batch}/${i + 1}-${sanitizeFileName(file.name)}`;
      return { key, url: await presignPut(r2, key) };
    })
  );

  return Response.json({ uploads });
}
