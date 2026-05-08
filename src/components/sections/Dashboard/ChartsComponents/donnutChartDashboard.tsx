"use client";

import { CheckCircle, HeartPulse, XCircle } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const CONVERSION_RATE = 93.3;

const STATS = {
  success: { label: "SUCESSO", value: 14 },
  cancelled: { label: "CANCELADOS", value: 1 },
};

const TOKENS = {
  colorSuccess: "#0C9E01",
  colorDanger: "#960000",
} as const;

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

function StatCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "success" | "danger";
}) {
  const isSuccess = variant === "success";
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div
      className={`
        flex flex-1 items-center gap-3 px-4 py-3 rounded-xl border
        ${isSuccess ? "bg-green-950/30 border-green-800/40" : "bg-red-950/30 border-red-800/40"}
      `}
    >
      <Icon
        size={22}
        strokeWidth={1.5}
        className={isSuccess ? "text-green-500" : "text-red-500"}
      />
      <div className="flex flex-col gap-0.5">
        <span
          className={`text-[11px] font-semibold tracking-widest ${isSuccess ? "text-green-500" : "text-red-500"}`}
        >
          {label}
        </span>
        <span
          className={`text-3xl font-semibold leading-none ${isSuccess ? "text-green-500" : "text-red-500"}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export function DonutChartDashboard({
  value = CONVERSION_RATE,
}: {
  value?: number;
}) {
  const data = [
    { name: "Convertido", value: value },
    { name: "Não convertido", value: 100 - value },
  ];

  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] py-2.5 px-5 pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="bg-blue-neon/20 border border-blue-neon w-fit h-fit p-1 rounded-[5px]">
          <HeartPulse className="text-blue-neon p-1" />
        </div>
        <span className="text-white">Saúde das Vendas</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 min-h-0">
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

        <div className="flex gap-3 shrink-0">
          <StatCard
            label={STATS.success.label}
            value={STATS.success.value}
            variant="success"
          />
          <StatCard
            label={STATS.cancelled.label}
            value={STATS.cancelled.value}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
}
