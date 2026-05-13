"use client";

import { motion } from "framer-motion";
import { Activity, Globe } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface StateRevenue {
  id: string;
  name: string;
  value: number;
}

const DATA: StateRevenue[] = [
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

const BAR_COLOR_START = "#00329e";
const BAR_COLOR_END = "#05193c";
const AXIS_TICK_COLOR = "#ffffff99";

type Props = {
  onGlobeExpand: () => void;
};

export function BarChartStatesDashboard({ onGlobeExpand }: Props) {
  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] p-5 extraxl:px-5 extraxl:pt-5 extraxl:pb-0 pointer-events-auto flex flex-col gap-4 justify-between">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
            <Activity size={20} className="text-blue-neon" />
          </div>
          <span className="text-white font-medium text-lg tracking-wide">
            Faturamento por Estado
          </span>
        </div>

        <motion.button
          type="button"
          onClick={onGlobeExpand}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden extraxl:flex items-center gap-4 px-3 py-1.5 rounded-full border border-secondary-blue/40 bg-secondary-blue/10 text-secondary-blue text-sm backdrop-blur-sm hover:bg-secondary-blue/20 transition-colors cursor-pointer group"
        >
          <span className="animate-globe-wiggle inline-block">
            <Globe size={15} className="text-secondary-blue" />
          </span>
          <span>Ver no Globo</span>
          <span className="text-secondary-blue/60 text-xs animate-arrow-nudge inline-block">
            →
          </span>
        </motion.button>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            barCategoryGap="30%"
            style={{ outline: "none" }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BAR_COLOR_START} stopOpacity={1} />
                <stop offset="100%" stopColor={BAR_COLOR_END} stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="id"
              axisLine={false}
              tickLine={false}
              tick={{ fill: AXIS_TICK_COLOR, fontSize: 13 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: AXIS_TICK_COLOR, fontSize: 13 }}
              tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`}
            />

            <Tooltip
              formatter={(value) => [
                `R$ ${Number(value).toLocaleString("pt-BR")}`,
                "Faturamento",
              ]}
              labelFormatter={(label) => {
                const state = DATA.find((d) => d.id === label);
                return state?.name ?? label;
              }}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              animationBegin={200}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
