"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QUOTE_RULES, checkFile, formatBytes, type UploadRules } from "../lib/upload-rules";

export type UploadStatus = "uploading" | "done" | "error";

export type UploadItem = {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number; // 0–100
  key?: string;
  error?: string;
};

export type UploadOptions = {
  /** Route that hands out presigned PUT URLs. */
  endpoint?: string;
  rules?: UploadRules;
  /** Called once a file has finished uploading to R2. */
  onUploaded?: (item: UploadItem & { key: string }) => void;
};

/**
 * Uploads files straight to R2 as soon as they're picked. Lives in the quote
 * form (not the file step) so uploads keep going while the customer moves on.
 * Client onboarding pages pass their own endpoint and rules.
 */
export function useFileUploads({ endpoint = "/api/uploads", rules = QUOTE_RULES, onUploaded }: UploadOptions = {}) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const requests = useRef(new Map<string, XMLHttpRequest>());
  const onUploadedRef = useRef(onUploaded);
  useEffect(() => {
    onUploadedRef.current = onUploaded;
  });

  const update = useCallback((id: string, patch: Partial<UploadItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const putFile = useCallback(
    (item: UploadItem, url: string, key: string) => {
      const xhr = new XMLHttpRequest();
      requests.current.set(item.id, xhr);
      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", item.file.type || "application/octet-stream");
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) update(item.id, { progress: Math.round((e.loaded / e.total) * 100) });
      };
      xhr.onload = () => {
        requests.current.delete(item.id);
        if (xhr.status >= 200 && xhr.status < 300) {
          update(item.id, { status: "done", progress: 100, key });
          onUploadedRef.current?.({ ...item, status: "done", progress: 100, key });
        } else update(item.id, { status: "error", error: "Upload failed. Try again." });
      };
      xhr.onerror = () => {
        requests.current.delete(item.id);
        update(item.id, { status: "error", error: "Upload failed. Check your connection and try again." });
      };
      xhr.send(item.file);
    },
    [update]
  );

  const start = useCallback(
    async (batch: UploadItem[]) => {
      if (batch.length === 0) return;
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            files: batch.map((i) => ({ name: i.file.name, type: i.file.type, size: i.file.size })),
          }),
        });
        const data = (await res.json()) as { uploads?: { key: string; url: string }[]; error?: string };
        if (!res.ok || !data.uploads) throw new Error(data.error || "Upload failed. Try again.");
        batch.forEach((item, i) => putFile(item, data.uploads![i].url, data.uploads![i].key));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed. Try again.";
        batch.forEach((item) => update(item.id, { status: "error", error: message }));
      }
    },
    [endpoint, putFile, update]
  );

  const addFiles = useCallback(
    (files: File[]) => {
      let count = items.length;
      let bytes = items.reduce((sum, i) => sum + i.file.size, 0);
      const added: UploadItem[] = files.map((file) => {
        const base = { id: crypto.randomUUID(), file, progress: 0 };
        const problem =
          checkFile({ name: file.name, type: file.type, size: file.size }, rules) ??
          (count + 1 > rules.maxFiles
            ? `You can add up to ${rules.maxFiles} files.`
            : bytes + file.size > rules.maxTotalBytes
              ? `That would go over the ${formatBytes(rules.maxTotalBytes)} total.`
              : null);
        if (problem) return { ...base, status: "error" as const, error: problem };
        count += 1;
        bytes += file.size;
        return { ...base, status: "uploading" as const };
      });
      setItems((prev) => [...prev, ...added]);
      void start(added.filter((i) => i.status === "uploading"));
    },
    [items, rules, start]
  );

  const retry = useCallback(
    (id: string) => {
      const item = items.find((i) => i.id === id);
      // Only retry upload failures, not files that break the rules.
      if (!item || checkFile({ name: item.file.name, type: item.file.type, size: item.file.size }, rules)) return;
      const next = { ...item, status: "uploading" as const, progress: 0, error: undefined };
      update(id, next);
      void start([next]);
    },
    [items, rules, start, update]
  );

  const remove = useCallback((id: string) => {
    requests.current.get(id)?.abort();
    requests.current.delete(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const reset = useCallback(() => {
    requests.current.forEach((xhr) => xhr.abort());
    requests.current.clear();
    setItems([]);
  }, []);

  return {
    items,
    addFiles,
    retry,
    remove,
    reset,
    uploading: items.some((i) => i.status === "uploading"),
    uploaded: items.filter((i) => i.status === "done" && i.key),
  };
}
