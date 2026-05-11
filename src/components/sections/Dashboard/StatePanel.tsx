"use client";

import { motion } from "motion/react";
import { FadeAnimation } from "@/components/ui/Motion/FadeAnimation";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion/StaggerAnimation";
import { cn } from "@/lib/utils/twMerge";

interface StateData {
  id: string;
  name: string;
  value: number;
}

interface Props {
  state: StateData;
  allData: StateData[];
  onClose: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export function StatePanel({ state, allData, onClose }: Props) {
  const sorted = [...allData].sort((a, b) => b.value - a.value);
  const rank = sorted.findIndex((s) => s.id === state.id) + 1;
  const total = allData.reduce((sum, s) => sum + s.value, 0);
  const pct = total > 0 ? ((state.value / total) * 100).toFixed(1) : "0.0";
  const isTop3 = rank <= 3;

  return (
    <motion.div
      className="absolute inset-0 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <button
        type="button"
        aria-label="Fechar painel"
        className="absolute inset-0 w-full h-full bg-background-main/40 cursor-pointer"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 bottom-20 z-10 flex flex-col items-center gap-3 px-6 pointer-events-none">
        <FadeAnimation fadeDirection="up" fadeValue={8} transitionDuration={0.22}>
          <span className="text-white/40 text-sm font-mono tracking-widest uppercase">
            Estado selecionado
          </span>
        </FadeAnimation>

        <FadeAnimation fadeDirection="up" fadeValue={12} transitionDuration={0.26}>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">{state.name}</h2>
            <span className="px-3 py-1 rounded-full bg-secondary-blue/15 border border-secondary-blue/40 text-secondary-blue text-sm font-mono font-bold">
              {state.id}
            </span>
          </div>
        </FadeAnimation>

        <StaggerContainer
          staggerDelay={0.07}
          delayChildren={0.05}
          className="flex gap-3 flex-wrap justify-center"
        >
          <StaggerItem fadeDirection="up" fadeValue={14}>
            <MetricCard
              label="Vendas no período"
              value={formatCurrency(state.value)}
              accent="blue"
            />
          </StaggerItem>

          <StaggerItem fadeDirection="up" fadeValue={14}>
            <MetricCard
              label="Ranking nacional"
              value={`#${rank} de ${allData.length}`}
              accent={isTop3 ? "neon" : "default"}
              badge={isTop3 ? "Top 3" : undefined}
            />
          </StaggerItem>

          <StaggerItem fadeDirection="up" fadeValue={14}>
            <MetricCard
              label="% do total nacional"
              value={`${pct}%`}
              accent="default"
              bar={{ value: Number(pct), max: 100 }}
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </motion.div>
  );
}

// ─── MetricCard ────────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
  accent?: "default" | "blue" | "neon";
  badge?: string;
  bar?: { value: number; max: number };
}

function MetricCard({ label, value, accent = "default", badge, bar }: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-5 py-4 rounded-2xl border backdrop-blur-md min-w-36",
        accent === "neon" && "bg-secondary-blue/10 border-secondary-blue/40",
        accent === "blue" && "bg-blue-neon/10 border-blue-neon/30",
        accent === "default" && "bg-background-main/70 border-white/10",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-white/40 leading-tight">{label}</span>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-blue/20 text-secondary-blue font-semibold">
            {badge}
          </span>
        )}
      </div>

      <span
        className={cn(
          "text-xl font-bold leading-none",
          accent === "neon" && "text-secondary-blue",
          (accent === "blue" || accent === "default") && "text-white",
        )}
      >
        {value}
      </span>

      {bar && (
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-secondary-blue/60"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((bar.value / bar.max) * 100, 100)}%` }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          />
        </div>
      )}
    </div>
  );
}
