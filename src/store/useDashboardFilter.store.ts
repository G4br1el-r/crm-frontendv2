import { create } from "zustand";
import { DateRange } from "react-day-picker";
import { DashboardView } from "@/@types/dashboar.types";

interface FiltersActiveType {
  viewDashboard: DashboardView;
  datePeriodDropdown: DateRange | null;
  dateRangeCalendar: DateRange | null;
  intervalLabelDropdown: string;
}

interface DashboardStore {
  filtersActive: FiltersActiveType;
  setViewDashboard: (view: DashboardView) => void;
  setDatePeriodDropdown: (datePeriodDropdown: DateRange | null) => void;
  setDateRangeCalendar: (dateRangeCalendar: DateRange | null) => void;
  setIntervalLabelDropdown: (label: string) => void;
  clearFilters: () => void;
}

const initialFilters: FiltersActiveType = {
  viewDashboard: "overview",
  datePeriodDropdown: null,
  dateRangeCalendar: null,
  intervalLabelDropdown: "-",
};

export const useDashboardFilterStore = create<DashboardStore>()((set) => ({
  filtersActive: initialFilters,

  setViewDashboard: (newViewDashboard) =>
    set((state) => ({
      filtersActive: {
        ...state.filtersActive,
        viewDashboard: newViewDashboard,
      },
    })),

  setDatePeriodDropdown: (newdatePeriodDropdown) =>
    set((state) => ({
      filtersActive: {
        ...state.filtersActive,
        datePeriodDropdown: newdatePeriodDropdown,
      },
    })),

  setDateRangeCalendar: (newDateRangeCalendar) =>
    set((state) => ({
      filtersActive: {
        ...state.filtersActive,
        dateRangeCalendar: newDateRangeCalendar,
      },
    })),

  setIntervalLabelDropdown: (label) =>
    set((state) => ({
      filtersActive: { ...state.filtersActive, intervalLabelDropdown: label },
    })),

  clearFilters: () =>
    set((state) => ({
      filtersActive: {
        ...state.filtersActive,
        datePeriodDropdown: null,
        dateRangeCalendar: null,
        intervalLabelDropdown: "-",
      },
    })),
}));
