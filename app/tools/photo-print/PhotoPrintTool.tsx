"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

/* Print geometry, all at 300 DPI. The sheet is 6" × 4" landscape with the two
   2" photos side by side, half an inch apart, centred. */
const DPI = 300;
const PHOTO_PX = 2 * DPI; // 600
const SHEET_W = 6 * DPI; // 1800
const SHEET_H = 4 * DPI; // 1200
const GAP_PX = DPI / 2; // 150
const PHOTO_Y = (SHEET_H - PHOTO_PX) / 2;
const PHOTO_XS = [
  (SHEET_W - 2 * PHOTO_PX - GAP_PX) / 2,
  (SHEET_W - 2 * PHOTO_PX - GAP_PX) / 2 + PHOTO_PX + GAP_PX,
];
const JPEG_QUALITY = 0.95;
/** Printed photos run 1/32" past the 2" cut line on every side, so a cut that
 *  drifts slightly lands on more photo instead of white paper. */
const BLEED_PX = Math.round(DPI / 32); // 9
const BLEED_FRAC = BLEED_PX / PHOTO_PX; // bleed as a share of the frame width
const EDITOR_SCALE = 1 + 2 * BLEED_FRAC; // editor canvas width ÷ frame width

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 8;

/** Where the photo sits in the frame. `x`/`y` move the image centre, in frame
 *  widths from the frame centre, so the same view renders at any pixel size.
 *  `zoom` 1 = the photo just covers the frame. */
type View = { zoom: number; x: number; y: number; quarter: number; fine: number };
const START_VIEW: View = { zoom: 1, x: 0, y: 0, quarter: 0, fine: 0 };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Zoom by `f` around a point (mx, my), given in frame widths from the centre,
 *  so whatever is under the cursor or fingers stays put. */
function zoomAt(v: View, f: number, mx = 0, my = 0): View {
  const zoom = clamp(v.zoom * f, MIN_ZOOM, MAX_ZOOM);
  const k = zoom / v.zoom;
  return { ...v, zoom, x: mx + (v.x - mx) * k, y: my + (v.y - my) * k };
}

/** Draw the framed photo into a `size` × `size` square at the current origin,
 *  plus `bleed` px of the surrounding photo on every side. */
function drawPhoto(ctx: CanvasRenderingContext2D, size: number, img: HTMLImageElement, v: View, bleed = 0) {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const sideways = v.quarter % 2 !== 0;
  const cover = Math.max(size / (sideways ? h : w), size / (sideways ? w : h));
  const s = cover * v.zoom;

  ctx.save();
  ctx.beginPath();
  ctx.rect(-bleed, -bleed, size + 2 * bleed, size + 2 * bleed);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-bleed, -bleed, size + 2 * bleed, size + 2 * bleed);
  ctx.translate(size / 2 + v.x * size, size / 2 + v.y * size);
  ctx.rotate(((v.quarter * 90 + v.fine) * Math.PI) / 180);
  ctx.scale(s, s);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, -w / 2, -h / 2);
  ctx.restore();
}

/** The full 4 × 6 sheet: two photos plus light cut marks at each corner. */
function drawSheet(ctx: CanvasRenderingContext2D, scale: number, img: HTMLImageElement, v: View) {
  ctx.save();
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, SHEET_W, SHEET_H);

  for (const px of PHOTO_XS) {
    ctx.save();
    ctx.translate(px, PHOTO_Y);
    drawPhoto(ctx, PHOTO_PX, img, v, BLEED_PX);
    ctx.restore();
  }

  // Cut marks: short lines on the true 2" cut lines, starting just past the bleed
  // so they never print on the photo. Kept short so the marks between the two
  // photos don't meet.
  const off = BLEED_PX + 12;
  const len = 30;
  ctx.strokeStyle = "#9a9a9a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (const px of PHOTO_XS) {
    for (const cx of [px, px + PHOTO_PX]) {
      for (const cy of [PHOTO_Y, PHOTO_Y + PHOTO_PX]) {
        const dx = cx === px ? -1 : 1;
        const dy = cy === PHOTO_Y ? -1 : 1;
        // horizontal mark, level with the edge
        ctx.moveTo(cx + dx * off, cy);
        ctx.lineTo(cx + dx * (off + len), cy);
        // vertical mark
        ctx.moveTo(cx, cy + dy * off);
        ctx.lineTo(cx, cy + dy * (off + len));
      }
    }
  }
  ctx.stroke();
  ctx.restore();
}

/** U.S. passport guide over a `size` square frame (2"): eyes 1⅛"–1⅜" from the
 *  bottom, head (chin to top of hair) 1"–1⅜" tall. The ovals assume the eyes sit
 *  about halfway up the head, which is close for most people. */
function drawGuides(ctx: CanvasRenderingContext2D, size: number, dpr: number) {
  const inch = size / 2;
  const eyeTop = (2 - 1.375) * inch;
  const eyeBottom = (2 - 1.125) * inch;
  const eyeMid = (eyeTop + eyeBottom) / 2;
  const cx = size / 2;

  const outlined = (draw: () => void, dash: number[] = []) => {
    ctx.setLineDash(dash.map((d) => d * dpr));
    ctx.strokeStyle = "rgba(0,0,0,0.55)";
    ctx.lineWidth = 3 * dpr;
    ctx.beginPath();
    draw();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 1.25 * dpr;
    ctx.beginPath();
    draw();
    ctx.stroke();
  };

  ctx.save();

  // Eye band
  ctx.fillStyle = "rgba(16,185,129,0.16)";
  ctx.fillRect(0, eyeTop, size, eyeBottom - eyeTop);
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(16,185,129,0.95)";
  ctx.lineWidth = 1.5 * dpr;
  ctx.beginPath();
  ctx.moveTo(0, eyeTop);
  ctx.lineTo(size, eyeTop);
  ctx.moveTo(0, eyeBottom);
  ctx.lineTo(size, eyeBottom);
  ctx.stroke();

  // Centre line
  outlined(() => {
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, size);
  }, [4, 6]);

  // Smallest and largest allowed head
  for (const headIn of [1, 1.375]) {
    const ry = (headIn * inch) / 2;
    outlined(() => ctx.ellipse(cx, eyeMid, ry * 0.74, ry, 0, 0, Math.PI * 2), [7, 5]);
  }

  // Labels
  ctx.setLineDash([]);
  ctx.font = `600 ${11 * dpr}px system-ui, sans-serif`;
  ctx.textBaseline = "bottom";
  const label = (text: string, x: number, y: number) => {
    ctx.lineWidth = 3 * dpr;
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.strokeText(text, x, y);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, x, y);
  };
  label("eyes", 6 * dpr, eyeTop - 3 * dpr);
  ctx.textBaseline = "top";
  label("head 1″–1⅜″", 6 * dpr, 6 * dpr);

  ctx.restore();
}

/** Canvas JPEGs carry no print size. Set the JFIF header to 300 DPI so the file
 *  prints at 4 × 6 / 2 × 2 "actual size" at home; kiosks ignore it either way. */
async function jpegWithDpi(canvas: HTMLCanvasElement, dpi: number): Promise<Blob> {
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not make the JPEG"))), "image/jpeg", JPEG_QUALITY),
  );
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const isJfif =
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff &&
    bytes[3] === 0xe0 &&
    String.fromCharCode(...bytes.slice(6, 11)) === "JFIF\0";
  if (isJfif) {
    bytes[13] = 1; // units: dots per inch
    bytes[14] = dpi >> 8;
    bytes[15] = dpi & 0xff;
    bytes[16] = dpi >> 8;
    bytes[17] = dpi & 0xff;
  }
  return new Blob([bytes], { type: "image/jpeg" });
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function stamp() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

export default function PhotoPrintTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState<View>(START_VIEW);
  const [guides, setGuides] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [editorCss, setEditorCss] = useState(0);

  const frameRef = useRef<HTMLCanvasElement>(null);
  const sheetRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const loadFile = useCallback(async (file: File | undefined) => {
    if (!file) return;
    setError("");
    const url = URL.createObjectURL(file);
    const next = new Image();
    next.src = url;
    try {
      await next.decode();
    } catch {
      URL.revokeObjectURL(url);
      setError(
        `Couldn't open “${file.name}”. If it's an iPhone HEIC photo, open this page in Safari or export the photo as JPEG first.`,
      );
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = url;
    setImg(next);
    setFileName(file.name);
    setView(START_VIEW);
  }, []);

  // Track the editor's on-screen size so the canvas stays sharp.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setEditorCss(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [img]);

  // Redraw the frame and the sheet preview.
  useEffect(() => {
    const frame = frameRef.current;
    const sheet = sheetRef.current;
    if (!img || !frame || !sheet || !editorCss) return;
    const dpr = window.devicePixelRatio || 1;

    // The editor shows the 2" frame with the bleed around it, dimmed.
    const total = Math.round(editorCss * dpr);
    if (frame.width !== total) {
      frame.width = total;
      frame.height = total;
    }
    const size = total / EDITOR_SCALE;
    const bleed = size * BLEED_FRAC;
    const fctx = frame.getContext("2d");
    if (fctx) {
      fctx.setTransform(1, 0, 0, 1, bleed, bleed);
      drawPhoto(fctx, size, img, view, bleed);
      fctx.fillStyle = "rgba(32,26,46,0.45)";
      fctx.beginPath();
      fctx.rect(-bleed, -bleed, size + 2 * bleed, size + 2 * bleed);
      fctx.rect(0, 0, size, size);
      fctx.fill("evenodd");
      if (guides) drawGuides(fctx, size, dpr);
    }

    const sheetCss = sheet.getBoundingClientRect().width || 480;
    const sw = Math.round(sheetCss * dpr);
    const sh = Math.round((sw * SHEET_H) / SHEET_W);
    if (sheet.width !== sw) {
      sheet.width = sw;
      sheet.height = sh;
    }
    const sctx = sheet.getContext("2d");
    if (sctx) {
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      drawSheet(sctx, sw / SHEET_W, img, view);
    }
  }, [img, view, guides, editorCss]);

  // Wheel zoom needs a non-passive listener to stop the page scrolling.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width - 0.5) * EDITOR_SCALE;
      const my = ((e.clientY - r.top) / r.height - 0.5) * EDITOR_SCALE;
      const f = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015));
      setView((v) => zoomAt(v, f, mx, my));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [img]);

  // Pointer position in frame widths, with 0–1 spanning the 2" frame (the bleed
  // border sits just outside that range).
  const local = (e: PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * EDITOR_SCALE - BLEED_FRAC,
      y: ((e.clientY - r.top) / r.height) * EDITOR_SCALE - BLEED_FRAC,
    };
  };

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, local(e));
  };

  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    const map = pointers.current;
    const prev = map.get(e.pointerId);
    if (!prev) return;
    const now = local(e);

    if (map.size === 1) {
      setView((v) => ({ ...v, x: v.x + now.x - prev.x, y: v.y + now.y - prev.y }));
    } else if (map.size === 2) {
      const other = [...map.entries()].find(([id]) => id !== e.pointerId)?.[1];
      if (other) {
        const d0 = Math.hypot(prev.x - other.x, prev.y - other.y);
        const d1 = Math.hypot(now.x - other.x, now.y - other.y);
        const m0 = { x: (prev.x + other.x) / 2 - 0.5, y: (prev.y + other.y) / 2 - 0.5 };
        const m1 = { x: (now.x + other.x) / 2 - 0.5, y: (now.y + other.y) / 2 - 0.5 };
        setView((v) => {
          const z = d0 > 0 ? zoomAt(v, d1 / d0, m0.x, m0.y) : v;
          return { ...z, x: z.x + m1.x - m0.x, y: z.y + m1.y - m0.y };
        });
      }
    }
    map.set(e.pointerId, now);
  };

  const onPointerUp = (e: PointerEvent<HTMLCanvasElement>) => {
    pointers.current.delete(e.pointerId);
  };

  // Arrow keys nudge by one printed pixel (Shift = 10); + and − zoom.
  const onKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    const step = (e.shiftKey ? 10 : 1) / PHOTO_PX;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    } else if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      setView((v) => zoomAt(v, e.shiftKey ? 1.1 : 1.01));
    } else if (e.key === "-" || e.key === "_") {
      e.preventDefault();
      setView((v) => zoomAt(v, e.shiftKey ? 1 / 1.1 : 1 / 1.01));
    }
  };

  const save = async (kind: "sheet" | "single") => {
    if (!img) return;
    setBusy(true);
    try {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      if (kind === "sheet") {
        c.width = SHEET_W;
        c.height = SHEET_H;
        drawSheet(ctx, 1, img, view);
      } else {
        c.width = PHOTO_PX;
        c.height = PHOTO_PX;
        drawPhoto(ctx, PHOTO_PX, img, view);
      }
      const blob = await jpegWithDpi(c, DPI);
      const base = fileName.replace(/\.[^.]+$/, "") || "photo";
      download(blob, `${base}-${kind === "sheet" ? "4x6" : "2x2"}-${stamp()}.jpg`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save the file.");
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    loadFile(e.dataTransfer.files[0]);
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    loadFile(e.target.files?.[0]);
    e.target.value = "";
  };

  // Source pixels across the 2" frame; under 600 the print will be soft.
  const framePx = img ? Math.round(Math.min(img.naturalWidth, img.naturalHeight) / view.zoom) : 0;

  const btn =
    "rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-paper-tint disabled:opacity-50";
  const primary =
    "rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50";

  return (
    <div
      className="mt-8"
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />

      {error && (
        <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      {!img ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-20 text-center transition ${
            dragOver ? "border-ink bg-paper-tint" : "border-ink/20 bg-white/60 hover:bg-white"
          }`}
        >
          <span className="text-lg font-semibold">Choose a photo</span>
          <span className="mt-1 text-sm text-ink-soft">or drop one here · JPEG, PNG or WebP</span>
        </button>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          {/* Frame + controls */}
          <div>
            <canvas
              ref={frameRef}
              tabIndex={0}
              aria-label="2 by 2 inch frame. Drag to move, scroll or pinch to zoom, arrow keys to nudge."
              className={`aspect-square w-full max-w-[420px] cursor-grab touch-none rounded-sm shadow-md outline-offset-4 ring-1 ring-ink/20 active:cursor-grabbing ${
                dragOver ? "ring-4 ring-ink" : ""
              }`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
            />
            <p className="mt-2 text-xs text-ink-soft">
              Dimmed edge = 1/32″ bleed past the cut · Drag to move · scroll or pinch to zoom · arrow keys nudge 1 px (Shift = 10)
            </p>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="flex justify-between text-sm font-semibold">
                  Zoom <span className="font-normal text-ink-soft">{view.zoom.toFixed(2)}×</span>
                </span>
                <input
                  type="range"
                  min={Math.log(MIN_ZOOM)}
                  max={Math.log(MAX_ZOOM)}
                  step={0.001}
                  value={Math.log(view.zoom)}
                  onChange={(e) => {
                    const z = Math.exp(Number(e.target.value));
                    setView((v) => zoomAt(v, z / v.zoom));
                  }}
                  className="mt-2 w-full accent-ink"
                />
              </label>

              <label className="block">
                <span className="flex justify-between text-sm font-semibold">
                  Straighten <span className="font-normal text-ink-soft">{view.fine.toFixed(1)}°</span>
                </span>
                <input
                  type="range"
                  min={-15}
                  max={15}
                  step={0.1}
                  value={view.fine}
                  onChange={(e) => setView((v) => ({ ...v, fine: Number(e.target.value) }))}
                  onDoubleClick={() => setView((v) => ({ ...v, fine: 0 }))}
                  className="mt-2 w-full accent-ink"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                <button type="button" className={btn} onClick={() => setView((v) => ({ ...v, quarter: (v.quarter + 1) % 4 }))}>
                  Rotate 90°
                </button>
                <button type="button" className={btn} onClick={() => setView(START_VIEW)}>
                  Reset
                </button>
                <button type="button" className={btn} onClick={() => inputRef.current?.click()}>
                  New photo
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={guides}
                  onChange={(e) => setGuides(e.target.checked)}
                  className="h-4 w-4 accent-ink"
                />
                Show passport guide <span className="text-ink-soft">(never printed)</span>
              </label>
            </div>
          </div>

          {/* Sheet preview + output */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">4 × 6 print preview</h2>
            <canvas
              ref={sheetRef}
              className="mt-3 aspect-[3/2] w-full max-w-[600px] rounded-sm bg-white shadow-md ring-1 ring-ink/10"
            />

            {framePx < PHOTO_PX && (
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Only about {framePx} source pixels across the frame (600 needed for full 300 DPI). The print may look
                soft — zoom out or use a larger photo.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className={primary} disabled={busy} onClick={() => save("sheet")}>
                Download 4 × 6 JPEG
              </button>
              <button type="button" className={btn} disabled={busy} onClick={() => save("single")}>
                Download single 2 × 2
              </button>            </div>

            <div className="mt-8 max-w-xl space-y-2 text-sm leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">Passport guide</p>
              <p>
                <span className="font-semibold text-emerald-700">Green band:</span> eyes go here, 1⅛″–1⅜″ from the
                bottom.
              </p>
              <p>
                <span className="font-semibold text-ink">Ovals:</span> smallest (1″) and largest (1⅜″) allowed head,
                chin to top of hair. Size the head between them, centred on the dashed line.
              </p>
              <p>
                The 4 × 6 file is 1800 × 1200 px at 300 DPI. Print it at 4 × 6 with no borders or &ldquo;fit&rdquo;
                scaling, then cut along the grey marks. Each photo prints 1/32″ past the cut line (the dimmed
                border around the frame), so a slightly off cut won&rsquo;t leave a white edge. The single 2 × 2
                (600 × 600 px, no bleed) is the file for online renewals.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
