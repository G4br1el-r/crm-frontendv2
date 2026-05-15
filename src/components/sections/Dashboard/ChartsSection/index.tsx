import { AnimatePresence, motion } from "motion/react";
import { StaggerItem } from "@/components/ui/Motion/StaggerAnimation";
import { BarChartDashboard } from "../ChartsComponents/barChartDashboard";
import { BarChartStatesDashboard } from "../ChartsComponents/barChartStatesDashboard";
import { DonutChartDashboard } from "../ChartsComponents/donnutChartDashboard";
import { RegionBarChartDashboard } from "../ChartsComponents/regionBarChartsDashboard";
import type { DashboardView } from "@/@types/dashboar.types";

interface ChartsSectionProps {
  onExpand: () => void;
  view: DashboardView;
}

export function ChartsSection({ onExpand, view }: ChartsSectionProps) {
  const isOverview = view === "overview";
  return (
    <div className="w-full flex gap-4 flex-center-column flex-1 min-h-180 md:min-h-95 overflow-hidden pointer-events-none md:grid md:grid-cols-2 extraxl:grid-cols-3">
      <StaggerItem
        fadeDirection="up"
        className="w-full h-full pointer-events-auto extraxl:col-span-2"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOverview ? "bar-overview" : "bar-by-state"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full"
          >
            {isOverview ? (
              <BarChartDashboard />
            ) : (
              <BarChartStatesDashboard onGlobeExpand={onExpand} />
            )}
          </motion.div>
        </AnimatePresence>
      </StaggerItem>
      <StaggerItem
        fadeDirection="up"
        className="w-full h-full pointer-events-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOverview ? "donut-overview" : "region-by-state"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full"
          >
            {isOverview ? <DonutChartDashboard /> : <RegionBarChartDashboard />}
          </motion.div>
        </AnimatePresence>
      </StaggerItem>
    </div>
  );
}
