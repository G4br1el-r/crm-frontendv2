"use client";

import { Activity, Globe } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";

interface MonthRevenue {
  month: string;
  revenue: number;
}

const DATA: MonthRevenue[] = [
  { month: "Jan", revenue: 48321 },
  { month: "Fev", revenue: 52100 },
  { month: "Mar", revenue: 39800 },
  { month: "Abr", revenue: 61200 },
  { month: "Mai", revenue: 55400 },
  { month: "Jun", revenue: 70100 },
];

const BAR_COLOR_START = "#00329e";
const BAR_COLOR_END = "#05193c";
const AXIS_TICK_COLOR = "#FFF";

type Props = {
  onGlobeExpand: () => void;
};

export function BarChartDashboard({ onGlobeExpand }: Props) {
  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] py-2.5 px-5 pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex-center gap-2">
          <div className="bg-blue-neon/20 border border-blue-neon w-fit h-fit p-1 rounded-[5px]">
            <Activity className="text-blue-neon p-1" />
          </div>
          <span className="text-white">Evolução Financeira</span>
        </div>

        <motion.button
          type="button"
          onClick={onGlobeExpand}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-neon/40 bg-blue-neon/10 text-blue-neon text-sm backdrop-blur-sm hover:bg-blue-neon/20 transition-colors cursor-pointer group"
        >
          <span className="animate-globe-wiggle inline-block">
            <Globe size={15} className="text-blue-neon" />
          </span>
          <span>Ver no Globo</span>
          <span className="text-blue-neon/60 text-xs animate-arrow-nudge inline-block">
            →
          </span>
        </motion.button>
      </div>

      <div className="flex-1 min-h-0">
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
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: AXIS_TICK_COLOR, fontSize: 13 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: AXIS_TICK_COLOR, fontSize: 13 }}
              tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip
              formatter={(value) => [
                `R$ ${Number(value).toLocaleString("pt-BR")}`,
                "Faturamento",
              ]}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="revenue"
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
