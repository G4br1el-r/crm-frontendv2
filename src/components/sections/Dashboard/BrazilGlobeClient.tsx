"use client";

import { useIsMobile } from "@/hook/useIsMobile";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BrazilGlobe = dynamic(
  () =>
    import("@/components/sections/Dashboard/BrazilGlobe").then(
      (m) => m.BrazilGlobe,
    ),
  {
    ssr: false,
  },
);

interface StateData {
  id: string;
  name: string;
  value: number;
}

interface Props {
  data: StateData[];
  mountDelayMs?: number;
  onReady?: () => void;
}

export function BrazilGlobeClient({
  data,
  mountDelayMs = 2000,
  onReady,
}: Props) {
  const [shouldMount, setShouldMount] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleMount = () => {
      timeoutId = setTimeout(() => {
        if (!cancelled) setShouldMount(true);
      }, mountDelayMs);
    };

    if (document.readyState === "complete") {
      scheduleMount();
      return () => {
        cancelled = true;
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    const onLoad = () => scheduleMount();
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [mountDelayMs]);

  useEffect(() => {
    if (isMobile) onReady?.();
  }, [isMobile, onReady]);

  if (isMobile) return null;
  if (!shouldMount) return null;

  return <BrazilGlobe data={data} onReady={onReady} />;
}
