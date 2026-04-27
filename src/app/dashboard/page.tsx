"use client";

import dynamic from "next/dynamic";

const BrazilGlobe = dynamic(
  () =>
    import("@/components/sections/Dashboard/DashboardLayout").then(
      (m) => m.BrazilGlobe,
    ),
  { ssr: false },
);

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

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#020617]">
      {/* Gradient de fundo (azul muito sutil no centro) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.15)_0%,_transparent_60%)]" />

      <BrazilGlobe data={mockData} />

      {/* Vinheta nas bordas */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(2,6,23,0.6)_75%,_rgba(2,6,23,0.95)_100%)]" />

      {/* Glow azulado sutil sobre o globo */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08)_0%,_transparent_40%)]" />
    </main>
  );
}
