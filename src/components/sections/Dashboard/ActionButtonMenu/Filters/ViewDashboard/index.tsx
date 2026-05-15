import { cn } from "@/lib/utils";
import { useDashboardFilterStore } from "@/store/useDashboardFilter.store";

const VIEWS = [
  { value: "overview" as const, label: "Geral" },
  { value: "by-state" as const, label: "Estados" },
];

export function ViewDashboard() {
  const viewDashboard = useDashboardFilterStore(
    (state) => state.filtersActive.viewDashboard,
  );
  const setViewDashboard = useDashboardFilterStore(
    (state) => state.setViewDashboard,
  );

  return (
    <div className="flex flex-col gap-2">
      <span className="text-white/40 text-[10px] uppercase tracking-widest">
        Visualização
      </span>
      <div className="flex gap-2">
        {VIEWS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setViewDashboard(value)}
            className={cn(
              "flex-1 cursor-pointer px-3 py-2 rounded-xs text-xs font-semibold tracking-widest uppercase transition-all duration-200",
              viewDashboard === value
                ? "bg-secondary-blue text-background-main"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
