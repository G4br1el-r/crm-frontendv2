export interface StateData {
  id: string;
  name: string;
  value: number;
}

export type DashboardView = "overview" | "by-state";

export interface TablesData {
  view: DashboardView;
  component: React.ReactNode;
}
