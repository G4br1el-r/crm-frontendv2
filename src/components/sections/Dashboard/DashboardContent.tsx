"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils/twMerge";
import { ChartsSection } from "./ChartsSection";
import { KpiSection } from "./KpiSection";
import { TableSection } from "./TableSection";
import type { DashboardView, TablesData } from "@/@types/dashboar.types";
import { StaggerContainer } from "@/components/shared/Motion/StaggerAnimation";

interface DashboardContentProps {
  globeExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  kpis: React.ReactNode[];
  tables: TablesData[];
}

export function DashboardContent({
  globeExpanded,
  onExpand,
  onCollapse,
  kpis,
  tables,
}: DashboardContentProps) {
  return (
    <div
      className={cn(
        "w-full h-full relative p-2 pt-20 xl:pl-20 xl:py-3 xl:pr-5 z-10",
        globeExpanded ? "pointer-events-none" : "bg-background-main/50",
      )}
    >
      <AnimatePresence mode="wait">
        {!globeExpanded && (
          <motion.div
            className="w-full h-full relative"
            key="dashboard-content"
            initial={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <StaggerContainer
              staggerDelay={0.12}
              delayChildren={0.2}
              className="flex gap-4 w-full h-full relative flex-col pointer-events-none"
            >
              {/* CONTEUDO */}
              <KpiSection kpis={kpis} />
              <ChartsSection onExpand={onExpand} />
              <TableSection tables={tables} />
            </StaggerContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {globeExpanded && (
          <motion.button
            key="close-globe"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={onCollapse}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-90 flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary-blue/10 border border-secondary-blue/40 text-secondary-blue text-sm backdrop-blur-sm hover:bg-secondary-blue/20 transition-colors cursor-pointer pointer-events-auto"
          >
            ← Voltar ao dashboard
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
