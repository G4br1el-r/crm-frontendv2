import { MonthInterval } from "@/components/sections/Dashboard/ActionButtonMenu/Filters/IntervalPeriodDashboard";
import { getDateRangeByMonthsBack } from "@/lib/utils/getDateRangeByMonthsBack";
import { useDashboardFilterStore } from "@/store/useDashboardFilter.store";

export function useIntervalPeriodDashboard() {
  const setDatePeriodDropdown = useDashboardFilterStore(
    (state) => state.setDatePeriodDropdown,
  );
  const setIntervalLabelDropdown = useDashboardFilterStore(
    (state) => state.setIntervalLabelDropdown,
  );
  const intervalLabelDropdown = useDashboardFilterStore(
    (state) => state.filtersActive.intervalLabelDropdown,
  );

  const tooltipLabel =
    intervalLabelDropdown === "-"
      ? "Últimos X meses (até a data atual)"
      : `Últimos ${intervalLabelDropdown} (até a data atual)`;

  function handleSelectInterval(months: MonthInterval) {
    setIntervalLabelDropdown(months.label);
    const dateRange = getDateRangeByMonthsBack(months.value);
    setDatePeriodDropdown(dateRange);
    //TO-DO PASSAR PARA API
  }

  return {
    tooltipLabel,
    intervalLabelDropdown,
    handleSelectInterval,
  };
}
