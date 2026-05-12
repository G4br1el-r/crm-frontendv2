import { ActionButtonMenu } from "@/components/sections/Dashboard/ActionButtonMenu";
import { BestCustomers } from "@/components/sections/Dashboard/ChartsComponents/bestCustomers";
import { Kpi } from "@/components/sections/Dashboard/ChartsComponents/kpi";
import { RecentSales } from "@/components/sections/Dashboard/ChartsComponents/recentSales";
import { TopCustomerByState } from "@/components/sections/Dashboard/ChartsComponents/topCustomerByState";
import { TopProducts } from "@/components/sections/Dashboard/ChartsComponents/topProducts";
import { TopStateOrders } from "@/components/sections/Dashboard/ChartsComponents/topStateOrders";
import { TopStateTicket } from "@/components/sections/Dashboard/ChartsComponents/topStateTicket";
import { DashboardMain } from "@/components/sections/Dashboard/DashboardMain";

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
  const kpis = [
    <Kpi
      key="receita-total"
      title="Receita Total"
      percent={58.32}
      value={48321.49}
      successDisplay
      isMoney
    />,
    <Kpi
      key="descontos-concedidos"
      title="Descontos Concedidos"
      percent={-67.7}
      value={12808.42}
      successDisplay
      isMoney
    />,
    <Kpi
      key="ticket-medio"
      title="Ticket Médio"
      percent={-108.7}
      value={1184.63}
      isMoney
    />,
    <Kpi
      key="total-clientes"
      title="Total de Clientes"
      percent={7.7}
      value={35}
      successDisplay
    />,
  ];

  const tables = [
    // <RecentSales key="recent-sales" />,
    // <TopProducts key="top-products" />,
    // <BestCustomers key="best-customers" />,
    <TopStateOrders key="top-state-orders" />,
    <TopStateTicket key="top-state-ticket" />,
    <TopCustomerByState key="top-customer-by-state" />,
  ];

  return (
    <section className="relative h-full w-full overflow-hidden">
      <DashboardMain data={mockData} kpis={kpis} tables={tables} />
      <ActionButtonMenu />
    </section>
  );
}
