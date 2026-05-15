import { subMonths, subYears, format } from "date-fns";
import { DateRange } from "react-day-picker";

export function getDateRangeByMonthsBack(months: number): DateRange {
  const to = new Date();
  const from = months >= 12 ? subYears(to, months / 12) : subMonths(to, months);
  console.log("GET DATE", to, from);
  return { from, to };
}
