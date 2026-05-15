import { AnimatePresence, motion } from "motion/react";
import type { DashboardView, TablesData } from "@/@types/dashboar.types";
import { StaggerItem } from "@/components/ui/Motion/StaggerAnimation";

interface TableSectionProps {
  view: DashboardView;
  tables: TablesData[];
}

export function TableSection({ tables, view }: TableSectionProps) {
  return (
    <StaggerItem
      fadeDirection="up"
      className="w-full h-full pointer-events-auto"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full h-full flex gap-4 flex-center-column lg:grid lg:grid-cols-3 pointer-events-none"
        >
          {tables
            .filter((table) => table.view === view)
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
