// Upload limits shared by the file picker (client) and /api/uploads (server),
// so both sides reject the same files with the same messages.

export const MAX_FILES = 20;
export const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB
export const MAX_TOTAL_BYTES = 500 * 1024 * 1024; // 500 MB

// Checked by extension: browsers often report an empty or generic type for
// HEIC, AI, EPS, and PSD files.
export const ALLOWED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "heic",
  "heif",
  "tif",
  "tiff",
  "bmp",
  "pdf",
  "ai",
  "eps",
  "psd",
  "svg",
  "doc",
  "docx",
  "zip",
] as const;

export type UploadRequestFile = { name: string; type: string; size: number };

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

/** Returns a customer-friendly reason the file can't be uploaded, or null if it's fine. */
export function checkFile(file: UploadRequestFile): string | null {
  if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(file.name))) {
    return "This file type isn't supported. Try a photo, PDF, design file, or ZIP.";
  }
  if (file.size > MAX_FILE_BYTES) return "This file is over 100 MB.";
  if (file.size === 0) return "This file is empty.";
  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
