"use client";

import { useRef, useState, type DragEvent } from "react";
import { ALLOWED_EXTENSIONS, MAX_FILES, formatBytes } from "../lib/upload-rules";
import type { UploadItem } from "./useFileUploads";

const ACCEPT = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",");

export default function FileDropzone({
  items,
  hint,
  onAdd,
  onRemove,
  onRetry,
}: {
  items: UploadItem[];
  hint: string;
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) onAdd(Array.from(e.dataTransfer.files));
  }

  return (
    <div>
      <p className="text-sm text-ink-soft">{hint}</p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
          dragging ? "border-violet-500 bg-violet-50" : "border-ink/15 bg-paper-tint/40"
        }`}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 text-violet-600">
          <path
            d="M12 16V4m0 0-4.5 4.5M12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-3 text-sm font-medium text-ink">
          <span className="hidden sm:inline">Drag files here, or </span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-semibold text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-700"
          >
            <span className="sm:hidden">Choose photos or files</span>
            <span className="hidden sm:inline">browse</span>
          </button>
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          Photos, PDFs, design files, or ZIPs &middot; up to {MAX_FILES} files, 100 MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) onAdd(Array.from(e.target.files));
            e.target.value = ""; // allow picking the same file again after removing it
          }}
        />
      </div>

      {items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-ink/10 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{item.file.name}</p>
                  <p className={`text-xs ${item.status === "error" ? "text-rose-600" : "text-ink-soft"}`}>
                    {item.status === "error"
                      ? item.error
                      : item.status === "done"
                        ? `${formatBytes(item.file.size)} · Uploaded`
                        : `${formatBytes(item.file.size)} · Uploading ${item.progress}%`}
                  </p>
                </div>
                {item.status === "error" && item.error?.startsWith("Upload failed") && (
                  <button
                    type="button"
                    onClick={() => onRetry(item.id)}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                  >
                    Retry
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.file.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:bg-paper-tint hover:text-ink"
                >
                  <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
                    <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {item.status !== "error" && (
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className={`h-full rounded-full transition-all ${item.status === "done" ? "bg-emerald-500" : "bg-violet-600"}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
