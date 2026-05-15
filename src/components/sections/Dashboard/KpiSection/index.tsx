import { StaggerItem } from "@/components/ui/Motion/StaggerAnimation";

interface KpiSectionProps {
  kpis: React.ReactNode[];
}

export function KpiSection({ kpis }: KpiSectionProps) {
  return (
    <div className="flex-center gap-4 flex-center-column sm:grid sm:grid-cols-2 lg:grid-cols-4 pointer-events-none">
      {kpis.map((kpi, i) => (
        <StaggerItem
          key={i}
          fadeDirection="up"
          className="w-full pointer-events-auto"
        >
          {kpi}
        </StaggerItem>
      ))}
    </div>
  );
}
