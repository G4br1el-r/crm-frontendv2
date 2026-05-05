import { BrazilGlobeClient } from "@/components/sections/Dashboard/BrazilGlobeClient";
import { BarChartDashboard } from "@/components/sections/Dashboard/ChartsComponents/barChartDashboard";
import { BestCustomers } from "@/components/sections/Dashboard/ChartsComponents/bestCustomers";
import { DonutChartDashboard } from "@/components/sections/Dashboard/ChartsComponents/donnutChartDashboard";
import { Kpi } from "@/components/sections/Dashboard/ChartsComponents/kpi";
import { RecentSales } from "@/components/sections/Dashboard/ChartsComponents/recentSales";
import { TopProducts } from "@/components/sections/Dashboard/ChartsComponents/topProducts";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion/StaggerAnimation";

const mockData = [
  { id: "SP", name: "São Paulo", value: 1450000 },
  { id: "RJ", name: "Rio de Janeiro", value: 890000 },
  { id: "MG", name: "Minas Gerais", value: 720000 },
  { id: "RS", name: "Rio Grande do Sul", value: 540000 },
  { id: "PR", name: "Paraná", value: 480000 },
  { id: "BA", name: "Bahia", value: 420000 },
  { id: "SC", name: "Santa Catarina", value: 380000 },
  { id: "PE", name: "Pernambuco", value: 290000 },
  { id: "CE", name: "Ceará", value: 260000 },
  { id: "GO", name: "Goiás", value: 240000 },
  { id: "DF", name: "Distrito Federal", value: 220000 },
  { id: "ES", name: "Espírito Santo", value: 180000 },
  { id: "PA", name: "Pará", value: 160000 },
  { id: "MT", name: "Mato Grosso", value: 140000 },
  { id: "MS", name: "Mato Grosso do Sul", value: 120000 },
  { id: "MA", name: "Maranhão", value: 110000 },
  { id: "PB", name: "Paraíba", value: 95000 },
  { id: "RN", name: "Rio Grande do Norte", value: 88000 },
  { id: "AL", name: "Alagoas", value: 72000 },
  { id: "PI", name: "Piauí", value: 68000 },
  { id: "AM", name: "Amazonas", value: 64000 },
  { id: "SE", name: "Sergipe", value: 58000 },
  { id: "TO", name: "Tocantins", value: 45000 },
  { id: "RO", name: "Rondônia", value: 38000 },
  { id: "AC", name: "Acre", value: 22000 },
  { id: "AP", name: "Amapá", value: 18000 },
  { id: "RR", name: "Roraima", value: 15000 },
];

export default async function Dashboard() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="absolute left-230">
        <BrazilGlobeClient data={mockData} />
      </div>

      <div className="relative pt-20 extraxl:pl-15 extraxl:py-3 extraxl:pr-3 z-10 w-full h-full pointer-events-none">
        <StaggerContainer
          staggerDelay={0.12}
          delayChildren={0.2}
          className="flex gap-4 w-full h-full relative flex-col"
        >
          <div className="flex-center gap-4">
            <StaggerItem fadeDirection="up" className="w-full">
              <Kpi title="Receita Total" percent={58.32} value={48321.49} successDisplay isMoney />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-full">
              <Kpi title="Descontos Concedidos" percent={-67.7} value={12808.42} successDisplay isMoney />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-full">
              <Kpi title="Ticket Médio" percent={-108.7} value={1184.63} isMoney />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-full">
              <Kpi title="Total de Clientes" percent={7.7} value={35} successDisplay />
            </StaggerItem>
          </div>

          <div className="w-9/14 flex-1 h-full flex gap-4">
            <StaggerItem fadeDirection="up" className="w-full h-full">
              <BarChartDashboard />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-2/3 h-full">
              <DonutChartDashboard />
            </StaggerItem>
          </div>

          <div className="w-9/14 flex-1 min-h-0 flex gap-4">
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <RecentSales />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <TopProducts />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <BestCustomers />
            </StaggerItem>
          </div>
          <div className="w-9/14 flex-1 min-h-0 flex gap-4">
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <RecentSales />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <TopProducts />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <BestCustomers />
            </StaggerItem>
          </div>
          <div className="w-9/14 flex-1 min-h-0 flex gap-4">
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <RecentSales />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <TopProducts />
            </StaggerItem>
            <StaggerItem fadeDirection="up" className="w-1/3 h-full">
              <BestCustomers />
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
