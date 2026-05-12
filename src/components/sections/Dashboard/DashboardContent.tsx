"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/Motion/StaggerAnimation";
import { cn } from "@/lib/utils/twMerge";
import { BarChartStatesDashboard } from "./ChartsComponents/barChartStatesDashboard";
import { DonutChartDashboard } from "./ChartsComponents/donnutChartDashboard";
import { BarChartDashboard } from "./ChartsComponents/barChartDashboard";
import { RegionBarChartDashboard } from "./ChartsComponents/regionBarChartsDashboard";

interface Props {
  globeExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  kpis: React.ReactNode[];
  tables: React.ReactNode[];
}

export function DashboardContent({
  globeExpanded,
  onExpand,
  onCollapse,
  kpis,
  tables,
}: Props) {
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
              {/* KPI */}
              <div className="flex-center gap-4 flex-center-column sm:grid sm:grid-cols-2 lg:grid-cols-4 pointer-events-none">
                {kpis.map((kpi, i) => (
                  <StaggerItem
                    // biome-ignore lint/suspicious/noArrayIndexKey: lista estática de tamanho fixo
                    key={i}
                    fadeDirection="up"
                    className="w-full pointer-events-auto"
                  >
                    {kpi}
                  </StaggerItem>
                ))}
              </div>

              {/* GRÁFICOS */}
              <div className="w-full flex gap-4 flex-center-column flex-1 min-h-180 md:min-h-95 overflow-hidden pointer-events-none md:grid md:grid-cols-2 extraxl:grid-cols-3">
                <StaggerItem
                  fadeDirection="up"
                  className="w-full h-full pointer-events-auto extraxl:col-span-2"
                >
                  {/* <BarChartDashboard  /> */}
                  <BarChartStatesDashboard onGlobeExpand={onExpand} />
                </StaggerItem>
                <StaggerItem
                  fadeDirection="up"
                  className="w-full h-full pointer-events-auto"
                >
                  {/* <DonutChartDashboard /> */}
                  <RegionBarChartDashboard />
                </StaggerItem>
              </div>

              {/* TABELAS */}
              <div className="w-full h-full flex gap-4 flex-center-column lg:grid lg:grid-cols-3 pointer-events-none">
                {tables.map((table, i) => (
                  <StaggerItem
                    // biome-ignore lint/suspicious/noArrayIndexKey: lista estática de tamanho fixo
                    key={i}
                    fadeDirection="up"
                    className="w-full h-full pointer-events-auto"
                  >
                    {table}
                  </StaggerItem>
                ))}
              </div>
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
