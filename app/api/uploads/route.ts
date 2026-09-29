import { getR2, presignPut, sanitizeFileName } from "../../lib/r2";
import { MAX_FILES, MAX_TOTAL_BYTES, checkFile, type UploadRequestFile } from "../../lib/upload-rules";

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

  if (files.length === 0 || files.length > MAX_FILES) {
    return Response.json({ error: `You can upload up to ${MAX_FILES} files at a time.` }, { status: 400 });
  }
  if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) {
    return Response.json({ error: "Those files add up to more than 500 MB." }, { status: 400 });
  }
  for (const file of files) {
    const problem = checkFile(file);
    if (problem) return Response.json({ error: `${file.name}: ${problem}` }, { status: 400 });
  }

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
