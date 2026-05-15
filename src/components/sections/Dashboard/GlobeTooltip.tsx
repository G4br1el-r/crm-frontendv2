"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { formatBRL } from "@/lib/utils/format-currency";

export interface GlobeTooltipHandle {
  show: (data: { id: string; name: string; value: number }) => void;
  hide: () => void;
  move: (x: number, y: number) => void;
}

export const GlobeTooltip = forwardRef<GlobeTooltipHandle>((_, ref) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef<{ x: number; y: number } | null>(null);

  useImperativeHandle(ref, () => ({
    show: ({ id, name, value }) => {
      if (idRef.current) idRef.current.textContent = id;
      if (nameRef.current) nameRef.current.textContent = name;
      if (valueRef.current) valueRef.current.textContent = formatBRL(value);
      if (rootRef.current) rootRef.current.style.display = "block";
    },
    hide: () => {
      if (rootRef.current) rootRef.current.style.display = "none";
    },
    move: (x, y) => {
      pendingPos.current = { x, y };
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const p = pendingPos.current;
        if (p && rootRef.current) {
          rootRef.current.style.transform = `translate3d(${p.x + 16}px, ${p.y + 16}px, 0)`;
        }
      });
    },
  }));

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
      style={{ display: "none" }}
    >
      <div className="rounded-md border border-blue-400/40 bg-slate-950/95 px-4 py-3 shadow-lg backdrop-blur-xs">
        <div
          ref={idRef}
          className="text-[10px] font-medium uppercase tracking-[1.5px] text-blue-400"
        />
        <div
          ref={nameRef}
          className="mt-1 text-sm font-medium text-slate-100"
        />
        <div
          ref={valueRef}
          className="mt-1.5 text-xs tabular-nums text-blue-300"
        />
      </div>
    </div>
  );
});
GlobeTooltip.displayName = "GlobeTooltip";
