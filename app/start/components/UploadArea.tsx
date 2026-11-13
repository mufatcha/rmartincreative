"use client";

import { useState } from "react";
import FileDropzone from "../../components/FileDropzone";
import { useFileUploads } from "../../components/useFileUploads";
import type { PortalFile } from "../../lib/onboarding/types";
import { ONBOARDING_RULES, fileExtension, formatBytes } from "../../lib/upload-rules";

const IMAGE = ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif", "bmp", "svg", "tif", "tiff"];
const VIDEO = ["mp4", "mov", "m4v", "webm", "avi", "mkv", "3gp"];

function FileThumb({ file, onRemove }: { file: PortalFile; onRemove?: () => void }) {
  const ext = fileExtension(file.name);
  const [broken, setBroken] = useState(false);
  const isImage = IMAGE.includes(ext) && !broken;
  const isVideo = VIDEO.includes(ext) && !broken;

  return (
    <li className="group relative">
      <a
        href={file.url}
        target="_blank"
        rel="noopener"
        className="block aspect-square overflow-hidden rounded-xl border border-ink/10 bg-paper-tint/60"
        title={`${file.name} · ${formatBytes(file.size)}`}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- private R2 files, not optimizable
          <img src={file.url} alt={file.name} loading="lazy" onError={() => setBroken(true)} className="h-full w-full object-cover" />
        ) : isVideo ? (
          <span className="relative block h-full w-full">
            <video
              src={`${file.url}#t=0.5`}
              preload="metadata"
              muted
              playsInline
              onError={() => setBroken(true)}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white">
                <svg viewBox="0 0 20 20" aria-hidden className="ml-0.5 h-4 w-4">
                  <path d="M6 4.5v11l9-5.5-9-5.5Z" fill="currentColor" />
                </svg>
              </span>
            </span>
          </span>
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
            <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-bold uppercase text-violet-700">{ext || "file"}</span>
            <span className="line-clamp-2 break-all text-[11px] leading-tight text-ink-soft">{file.name}</span>
          </span>
        )}
      </a>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}
          className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 bg-white text-ink-soft shadow-sm transition hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
        >
          <svg viewBox="0 0 20 20" aria-hidden className="h-3.5 w-3.5">
            <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </li>
  );
}

/**
 * Upload photos, videos, and files for one request (or the general files area).
 * Files go straight to R2; once each one lands it's recorded and moves from the
 * progress list into the thumbnail grid.
 */
export default function UploadArea({
  slug,
  itemId,
  files,
  canUpload,
  canRemove,
  register,
  removeFile,
  onChange,
}: {
  slug: string;
  itemId: number | null;
  files: PortalFile[];
  canUpload: boolean;
  /** Whether a file can be removed by this viewer. */
  canRemove: (file: PortalFile) => boolean;
  register: (body: Record<string, unknown>) => Promise<{ error?: string }>;
  removeFile: (fileId: number) => Promise<unknown>;
  onChange: () => void;
}) {
  const uploads = useFileUploads({
    endpoint: `/api/start/${slug}/uploads`,
    rules: ONBOARDING_RULES,
    onUploaded: async (item) => {
      const res = await register({
        action: "file",
        itemId,
        key: item.key,
        name: item.file.name,
        size: item.file.size,
        type: item.file.type,
      });
      if (!res.error) {
        uploads.remove(item.id);
        onChange();
      }
    },
  });

  return (
    <div className="space-y-3">
      {files.length > 0 && (
        <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
          {files.map((f) => (
            <FileThumb
              key={f.id}
              file={f}
              onRemove={
                canRemove(f)
                  ? async () => {
                      if (!window.confirm(`Remove ${f.name}?`)) return;
                      await removeFile(f.id);
                      onChange();
                    }
                  : undefined
              }
            />
          ))}
        </ul>
      )}
      {canUpload && (
        <FileDropzone
          items={uploads.items}
          hint=""
          rules={ONBOARDING_RULES}
          pickLabel={files.length ? "Add more photos or files" : "Choose photos, videos, or files"}
          onAdd={uploads.addFiles}
          onRemove={uploads.remove}
          onRetry={uploads.retry}
        />
      )}
    </div>
  );
}
