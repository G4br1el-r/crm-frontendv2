import { Calendar } from "@/components/ui/calendar";
import { AnimatePresence, motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ptBR } from "date-fns/locale";
import { Trash } from "lucide-react";
import { useCalendarDashboard } from "@/hook/dashboard/useCalendarDashboard";
import { TooltipComponent } from "@/components/shared/TooltipComponent";

export function CalendarDashboard() {
  // biome-ignore format: keep single line
  const { activeRange, startDateDisplay, endDateDisplay, handleCalendarSelect, handleClearDates } = useCalendarDashboard()

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-[10px] uppercase tracking-widest">
          Período
        </span>
        <TooltipComponent
          iconName="trash"
          textTooltip="Limpar datas"
          iconClassName="text-white/40 hover:text-red-400 cursor-pointer hover:scale-105 transition-all duration-200"
          onIconClick={handleClearDates}
        />
      </div>
      <div className="flex-center-column gap-2">
        <Calendar
          mode="range"
          locale={ptBR}
          captionLayout="dropdown"
          selected={activeRange}
          onSelect={handleCalendarSelect}
          showOutsideDays={false}
          fixedWeeks
          className="w-full bg-background-content rounded-xl [--cell-size:--spacing(7)] [--cell-radius:100px] text-xs [&_button]:rounded-full"
        />
      </div>
      <div className="text-white/40 text-center text-[10px] uppercase tracking-widest flex items-center justify-between gap-2">
        <div className="flex w-full">
          <span>De:</span>
          <span className="w-full flex-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={startDateDisplay ?? "empty-start"}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
              >
                {startDateDisplay ?? "-"}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <div className="flex w-full">
          <span>Até:</span>
          <span className="w-full flex-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={endDateDisplay ?? "empty-end"}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
              >
                {endDateDisplay ?? "-"}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>
    </div>
  );
}
