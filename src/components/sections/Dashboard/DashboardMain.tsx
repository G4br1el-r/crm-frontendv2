"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrazilGlobeClient } from "./BrazilGlobeClient";
import { DashboardContent } from "./DashboardContent";
import { GlobeLoader } from "./GlobeLoader";
import { StatePanel } from "./StatePanel";

interface StateData {
  id: string;
  name: string;
  value: number;
}

interface Props {
  data: StateData[];
}

const DASHBOARD_EXIT_MS = 400;
const MIN_LOADER_MS = 650;

export function DashboardMain({ data }: Props) {
  const [showGlobe, setShowGlobe] = useState(false);
  const [globeMounted, setGlobeMounted] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedState, setSelectedState] = useState<StateData | null>(null);

  const handleStateClick = useCallback((state: StateData | null) => {
    setSelectedState(state);
  }, []);

  const loaderShownAtRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleExpand = () => {
    setShowGlobe(true);
    if (globeMounted) return;
    setGlobeMounted(true);
    clearTimers();
    timersRef.current.push(
      setTimeout(() => {
        if (!globeReady) {
          loaderShownAtRef.current = Date.now();
          setShowLoader(true);
        }
      }, DASHBOARD_EXIT_MS),
    );
  };

  const handleCollapse = () => {
    setShowGlobe(false);
  };

  const handleGlobeReady = () => {
    setGlobeReady(true);
    if (!loaderShownAtRef.current) {
      clearTimers();
      return;
    }
    const elapsed = Date.now() - loaderShownAtRef.current;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
    timersRef.current.push(
      setTimeout(() => {
        loaderShownAtRef.current = 0;
        setShowLoader(false);
      }, remaining),
    );
  };

  return (
    <>
      {globeMounted && (
        <BrazilGlobeClient
          data={data}
          active={showGlobe}
          onReady={handleGlobeReady}
          onStateClick={handleStateClick}
          selectedStateId={selectedState?.id ?? null}
        />
      )}

      <DashboardContent
        globeExpanded={showGlobe}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
      />

      <AnimatePresence>
        {showLoader && <GlobeLoader key="globe-loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedState && showGlobe && (
          <StatePanel
            key="state-panel"
            state={selectedState}
            allData={data}
            onClose={() => setSelectedState(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
