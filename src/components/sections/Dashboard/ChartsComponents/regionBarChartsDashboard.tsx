"use client";

import { Activity } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RegionRevenue {
  region: string;
  value: number;
}

const DATA: RegionRevenue[] = [
  { region: "Sudeste", value: 3240000 },
  { region: "Sul", value: 1400000 },
  { region: "Nordeste", value: 1009000 },
  { region: "Centro-Oeste", value: 720000 },
  { region: "Norte", value: 362000 },
];

const BAR_COLOR_START = "#00329e";
const BAR_COLOR_END = "#05193c";
const AXIS_TICK_COLOR = "#ffffff99";

export function RegionBarChartDashboard() {
  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] p-5 pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
          <Activity size={20} className="text-blue-neon" />
        </div>
        <span className="text-white font-medium text-lg tracking-wide">
          Faturamento por Região
        </span>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            layout="vertical"
            barCategoryGap="30%"
            style={{ outline: "none" }}
            margin={{ left: 16 }}
          >
            <defs>
              <linearGradient
                id="barGradientRegion"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor={BAR_COLOR_START} stopOpacity={1} />
                <stop offset="100%" stopColor={BAR_COLOR_END} stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: AXIS_TICK_COLOR, fontSize: 13 }}
              tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`}
            />

            <YAxis
              type="category"
              dataKey="region"
              axisLine={false}
              tickLine={false}
              tick={{ fill: AXIS_TICK_COLOR, fontSize: 13 }}
              width={90}
            />

            <Tooltip
              formatter={(value) => [
                `R$ ${Number(value).toLocaleString("pt-BR")}`,
                "Faturamento",
              ]}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="value"
              fill="url(#barGradientRegion)"
              radius={[0, 4, 4, 0]}
              animationBegin={200}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
