"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const clamp = (n: number) => Math.min(100, Math.max(0, n));

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  initial = 50,
  className = "",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  initial?: number;
  className?: string;
}) {
  const [pos, setPos] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);

  const moveTo = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e.clientX);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? pos - 5
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? pos + 5
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    setPos(clamp(next));
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className={`relative aspect-[75/56] cursor-ew-resize touch-none select-none overflow-hidden rounded-xl ${className}`}
    >
      {/* Old photo — visible to the right of the divider */}
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes="(max-width: 1024px) 90vw, 520px"
        className="object-cover"
        draggable={false}
      />

      {/* Colorized photo — clipped to the left of the divider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 1024px) 90vw, 520px"
          className="object-cover"
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-amber-100/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
        Restored
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-zinc-200/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
        Original
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_6px_rgba(0,0,0,0.35)]"
        style={{ left: `${pos}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Drag to compare original and restored photo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg ring-1 ring-ink/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
