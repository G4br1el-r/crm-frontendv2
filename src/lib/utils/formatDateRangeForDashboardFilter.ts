import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

export function formatDateRangeForDashboardFilter(
  dateRange: DateRange | undefined,
) {
  return {
    startDate: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : null,
    endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : null,
    startDateDisplay: dateRange?.from
      ? format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
      : null,
    endDateDisplay: dateRange?.to
      ? format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })
      : null,
  };
}
