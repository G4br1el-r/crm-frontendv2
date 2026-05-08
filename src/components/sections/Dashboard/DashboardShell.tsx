"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { BrazilGlobeClient } from "./BrazilGlobeClient";
import { DashboardContent } from "./DashboardContent";

interface StateData {
  id: string;
  name: string;
  value: number;
}

interface Props {
  data: StateData[];
}

export function DashboardShell({ data }: Props) {
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const handleReady = useCallback(() => setIsGlobeReady(true), []);

  useEffect(() => {
    const fallback = setTimeout(() => setIsGlobeReady(true), 15000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      <BrazilGlobeClient data={data} onReady={handleReady} />
      {isGlobeReady && <DashboardContent />}

      <AnimatePresence>
        {!isGlobeReady && (
          <motion.div
            key="globe-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-y-0 right-0 left-0 xl:left-13 z-10 flex flex-col items-center justify-center bg-background-main/85 backdrop-blur-sm pointer-events-auto"
            aria-busy="true"
            aria-live="polite"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-full border-2 border-blue-neon/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-neon animate-spin" />
              </div>
              <span className="text-blue-neon text-sm tracking-wider uppercase">
                Carregando dashboard
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
