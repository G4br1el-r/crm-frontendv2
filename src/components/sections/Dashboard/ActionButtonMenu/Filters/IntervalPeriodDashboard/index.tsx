import { TooltipComponent } from "@/components/shared/TooltipComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIntervalPeriodDashboard } from "@/hook/dashboard/useIntervalPeriodDashboard";
import { getDateRangeByMonthsBack } from "@/lib/utils/getDateRangeByMonthsBack";
import { useDashboardFilterStore } from "@/store/useDashboardFilter.store";

export type MonthInterval = {
  label: string;
  value: number;
};

const MONTHS: MonthInterval[] = [
  { label: "1 Mês", value: 1 },
  { label: "2 Meses", value: 2 },
  { label: "3 Meses", value: 3 },
  { label: "6 Meses", value: 6 },
  { label: "12 Meses", value: 12 },
];

export function IntervalPeriodDashboard() {
  const { tooltipLabel, handleSelectInterval, intervalLabelDropdown } =
    useIntervalPeriodDashboard();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-[10px] uppercase tracking-widest">
          Intervalo
        </span>
        <TooltipComponent
          iconName="info"
          iconClassName="text-white/40"
          textTooltip={tooltipLabel}
        />
      </div>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 w-full flex-1 cursor-pointer px-3 py-2 rounded-xs text-xs font-semibold tracking-widest uppercase transition-all duration-200 outline-0"
            >
              {intervalLabelDropdown}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit min-w-0 text-white/60 bg-background-content">
            {MONTHS.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() => handleSelectInterval(item)}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
