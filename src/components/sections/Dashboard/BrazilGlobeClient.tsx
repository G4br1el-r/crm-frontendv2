"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useIsMobile } from "@/hook/useIsMobile";

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
  active: boolean;
  onReady: () => void;
  onStateClick?: (state: StateData | null) => void;
  selectedStateId?: string | null;
}

export function BrazilGlobeClient({
  data,
  active,
  onReady,
  onStateClick,
  selectedStateId,
}: Props) {
  const isMobile = useIsMobile();

  // Mobile não monta o globo — libera o loading na hora
  useEffect(() => {
    if (isMobile) onReady();
  }, [isMobile, onReady]);

  if (isMobile) return null;

  return (
    <BrazilGlobe
      data={data}
      active={active}
      onReady={onReady}
      onStateClick={onStateClick}
      selectedStateId={selectedStateId}
    />
  );
}
