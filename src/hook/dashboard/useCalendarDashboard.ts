import { formatDateRangeForDashboardFilter } from "@/lib/utils/formatDateRangeForDashboardFilter";
import { useDashboardFilterStore } from "@/store/useDashboardFilter.store";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function useCalendarDashboard() {
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>();

  const datePeriodDropdown = useDashboardFilterStore(
    (state) => state.filtersActive.datePeriodDropdown,
  );
  const setDatePeriodDropdown = useDashboardFilterStore(
    (state) => state.setDatePeriodDropdown,
  );
  const setIntervalLabelDropdown = useDashboardFilterStore(
    (state) => state.setIntervalLabelDropdown,
  );

  const clearFilters = useDashboardFilterStore((state) => state.clearFilters);

  const activeRange = datePeriodDropdown ?? rangeDate;
  console.log(activeRange);

  const { startDateDisplay, endDateDisplay } =
    formatDateRangeForDashboardFilter(activeRange);

  function handleCalendarSelect(dateRange: DateRange | undefined) {
    setRangeDate(dateRange);
    setDatePeriodDropdown(null);
    setIntervalLabelDropdown("-");
  }

  function handleClearDates() {
    clearFilters();
    setRangeDate(undefined);
  }

  return {
    activeRange,
    startDateDisplay,
    endDateDisplay,
    handleCalendarSelect,
    handleClearDates,
  };
}
