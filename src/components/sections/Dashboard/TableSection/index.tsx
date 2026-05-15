import { AnimatePresence, motion } from "motion/react";
import type { DashboardView, TablesData } from "@/@types/dashboar.types";
import { StaggerItem } from "@/components/shared/Motion/StaggerAnimation";
import { useDashboardFilterStore } from "@/store/useDashboardFilter.store";

interface TableSectionProps {
  tables: TablesData[];
}

export function TableSection({ tables }: TableSectionProps) {
  const viewDashboard = useDashboardFilterStore(
    (state) => state.filtersActive.viewDashboard,
  );
  return (
    <StaggerItem
      fadeDirection="up"
      className="w-full h-full pointer-events-auto"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={viewDashboard}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full h-full flex gap-4 flex-center-column lg:grid lg:grid-cols-3 pointer-events-none"
        >
          {tables
            .filter((table) => table.view === viewDashboard)
            .map((table, i) => (
              <div key={i} className="w-full h-full pointer-events-auto">
                {table.component}
              </div>
            ))}
        </motion.div>
      </AnimatePresence>
    </StaggerItem>
  );
}
