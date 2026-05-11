"use client";

import { HeartPulse } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const CONVERSION_RATE = 93.3;

const STATS = {
  success: { label: "Sucesso", value: 14 },
  cancelled: { label: "Cancelados", value: 1 },
};

const TOKENS = {
  colorSuccess: "#0C9E01",
  colorDanger: "#960000",
} as const;

const TOTAL = STATS.success.value + STATS.cancelled.value;

function DonutLabel({ value }: { value: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <span className="text-3xl font-medium text-white leading-none">
        {value.toFixed(1)}%
      </span>
      <span className="text-[11px] text-zinc-400 mt-1.5 tracking-wider">
        CONVERSÃO
      </span>
    </div>
  );
}

function StatGrid({
  success,
  cancelled,
  total,
}: {
  success: { label: string; value: number };
  cancelled: { label: string; value: number };
  total: number;
}) {
  const items = [
    {
      ...success,
      color: TOKENS.colorSuccess,
      text: "text-green-400",
      dim: "text-green-400/30",
    },
    {
      ...cancelled,
      color: TOKENS.colorDanger,
      text: "text-red-400",
      dim: "text-red-400/30",
    },
  ];

  return (
    <div className="flex-center gap-2 shrink-0 lg:flex-center-column lg:items-start">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-2.5 px-4 py-3 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-0.75 h-3.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[11px] text-white/35 tracking-widest uppercase">
              {item.label}
            </span>
          </div>
          <div className="flex items-baseline gap-2 pl-2.75">
            <span
              className={`text-3xl font-bold leading-none tracking-tight tabular-nums ${item.text}`}
            >
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DonutChartDashboard({
  value = CONVERSION_RATE,
}: {
  value?: number;
}) {
  const data = [
    { name: "Convertido", value },
    { name: "Não convertido", value: 100 - value },
  ];

  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] p-5 pointer-events-auto flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
          <HeartPulse size={20} className="text-blue-neon" />
        </div>
        <span className="text-white font-medium text-lg tracking-wide">
          Saúde das Vendas
        </span>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-0 lg:flex-row">
        <div className="relative flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="85%"
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill={TOKENS.colorSuccess} />
                <Cell fill={TOKENS.colorDanger} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <DonutLabel value={value} />
        </div>

        <StatGrid
          success={STATS.success}
          cancelled={STATS.cancelled}
          total={TOTAL}
        />
      </div>
    </div>
  );
}
