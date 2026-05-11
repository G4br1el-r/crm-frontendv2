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
import { ImageComponent } from "@/components/ui/Image";

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
const AXIS_TICK_COLOR = "#ffffff99";

type Props = {
  onGlobeExpand: () => void;
};

export function BarChartDashboard({ onGlobeExpand }: Props) {
  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] p-5 extraxl:px-5 extraxl:pt-5 extraxl:pb-0 pointer-events-auto flex flex-col gap-4 justify-between">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
            <Activity size={20} className="text-blue-neon" />
          </div>
          <span className="text-white font-medium text-lg tracking-wide">
            Evolução Financeira
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
