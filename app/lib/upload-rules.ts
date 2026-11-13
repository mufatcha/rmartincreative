// Upload limits shared by the file picker (client) and the upload routes (server),
// so both sides reject the same files with the same messages. The quote form uses
// QUOTE_RULES; client onboarding pages (app/start) use ONBOARDING_RULES.

export type UploadRules = {
  maxFiles: number;
  maxFileBytes: number;
  maxTotalBytes: number;
  /** Checked by extension: browsers often report an empty or generic type for
   *  HEIC, AI, EPS, PSD, and some video files. */
  extensions: readonly string[];
  /** Shown under the drop zone, e.g. "Photos, PDFs, design files, or ZIPs". */
  kinds: string;
  /** The message for a file of the wrong type. */
  unsupported: string;
};

const DOCUMENT_EXTENSIONS = [
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

const VIDEO_EXTENSIONS = ["mp4", "mov", "m4v", "webm", "avi", "mkv", "3gp"] as const;

const MB = 1024 * 1024;

export const QUOTE_RULES: UploadRules = {
  maxFiles: 20,
  maxFileBytes: 100 * MB,
  maxTotalBytes: 500 * MB,
  extensions: DOCUMENT_EXTENSIONS,
  kinds: "Photos, PDFs, design files, or ZIPs",
  unsupported: "This file type isn't supported. Try a photo, PDF, design file, or ZIP.",
};

// A presigned PUT can take up to 5 GB; 2 GB covers a long phone video.
export const ONBOARDING_RULES: UploadRules = {
  maxFiles: 50,
  maxFileBytes: 2048 * MB,
  maxTotalBytes: 10 * 1024 * MB,
  extensions: [...DOCUMENT_EXTENSIONS, ...VIDEO_EXTENSIONS, "xls", "xlsx", "csv", "txt", "ppt", "pptx", "mp3", "m4a", "wav"],
  kinds: "Photos, videos, PDFs, documents, or ZIPs",
  unsupported: "This file type isn't supported. Try a photo, video, PDF, document, or ZIP.",
};

// Earlier names, still used by the quote form.
export const MAX_FILES = QUOTE_RULES.maxFiles;
export const MAX_FILE_BYTES = QUOTE_RULES.maxFileBytes;
export const MAX_TOTAL_BYTES = QUOTE_RULES.maxTotalBytes;
export const ALLOWED_EXTENSIONS = DOCUMENT_EXTENSIONS;

export type UploadRequestFile = { name: string; type: string; size: number };

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

/** Returns a customer-friendly reason the file can't be uploaded, or null if it's fine. */
export function checkFile(file: UploadRequestFile, rules: UploadRules = QUOTE_RULES): string | null {
  if (!rules.extensions.includes(fileExtension(file.name))) {
    return rules.unsupported;
  }
  if (file.size > rules.maxFileBytes) return `This file is over ${formatBytes(rules.maxFileBytes)}.`;
  if (file.size === 0) return "This file is empty.";
  return null;
}

/** Checks a whole batch on the server: count, total size, then each file. */
export function checkBatch(files: UploadRequestFile[], rules: UploadRules): string | null {
  if (files.length === 0 || files.length > rules.maxFiles) {
    return `You can upload up to ${rules.maxFiles} files at a time.`;
  }
  if (files.reduce((sum, f) => sum + f.size, 0) > rules.maxTotalBytes) {
    return `Those files add up to more than ${formatBytes(rules.maxTotalBytes)}.`;
  }
  for (const file of files) {
    const problem = checkFile(file, rules);
    if (problem) return `${file.name}: ${problem}`;
  }
  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  if (bytes >= 1024 * 1024 * 1024) {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${Number.isInteger(gb) ? gb : gb.toFixed(1)} GB`;
  }
  const mb = bytes / (1024 * 1024);
  return Number.isInteger(mb) ? `${mb} MB` : `${mb.toFixed(1)} MB`;
}
