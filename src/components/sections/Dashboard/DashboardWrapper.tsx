"use client";

import { useState } from "react";
import type {
  DashboardView,
  StateData,
  TablesData,
} from "@/@types/dashboar.types";
import { ActionButtonMenu } from "./ActionButtonMenu";
import { DashboardMain } from "./DashboardMain";

interface DashboardWrapperProps {
  data: StateData[];
  kpis: React.ReactNode[];
  tables: TablesData[];
}

export function DashboardWrapper({
  data,
  kpis,
  tables,
}: DashboardWrapperProps) {
  const [view, setView] = useState<DashboardView>("overview");

  return (
    <>
      <DashboardMain data={data} kpis={kpis} tables={tables} view={view} />
      <ActionButtonMenu view={view} onChange={setView} />
    </>
  );
}
