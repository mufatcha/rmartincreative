// Server-only helpers for Cloudflare R2 (S3-compatible). Only import from route
// handlers — this reads secret credentials from the environment.
import { AwsClient } from "aws4fetch";

type R2Config = { accountId: string; bucket: string; client: AwsClient };

export function getR2(): R2Config | null {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) return null;
  return {
    accountId: R2_ACCOUNT_ID,
    bucket: R2_BUCKET,
    client: new AwsClient({
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
      service: "s3",
      region: "auto",
    }),
  };
}

function objectUrl(r2: R2Config, key: string): string {
  const path = key.split("/").map(encodeURIComponent).join("/");
  return `https://${r2.accountId}.r2.cloudflarestorage.com/${r2.bucket}/${path}`;
}

/** A URL the browser can PUT the file to directly, valid for `expiresIn` seconds. */
export async function presignPut(r2: R2Config, key: string, expiresIn = 15 * 60): Promise<string> {
  const signed = await r2.client.sign(new Request(`${objectUrl(r2, key)}?X-Amz-Expires=${expiresIn}`, { method: "PUT" }), {
    aws: { signQuery: true },
  });
  return signed.url;
}

/** A download link for the quote email. SigV4 links max out at 7 days. Pass
 *  `downloadAs` to have the browser save the file under that name. */
export async function presignGet(
  r2: R2Config,
  key: string,
  expiresIn = 7 * 24 * 60 * 60,
  downloadAs?: string
): Promise<string> {
  const url = new URL(objectUrl(r2, key));
  url.searchParams.set("X-Amz-Expires", String(expiresIn));
  if (downloadAs) {
    const ascii = downloadAs.replace(/[^ -~]/g, "_").replace(/"/g, "");
    url.searchParams.set(
      "response-content-disposition",
      `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(downloadAs)}`
    );
  }
  const signed = await r2.client.sign(new Request(url, { method: "GET" }), {
    aws: { signQuery: true },
  });
  return signed.url;
}

/** Keeps only safe characters so keys stay readable in the R2 dashboard. */
export function sanitizeFileName(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return cleaned.slice(-120) || "file";
}
