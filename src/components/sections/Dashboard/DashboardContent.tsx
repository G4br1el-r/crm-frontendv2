"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/Motion/StaggerAnimation";
import { Kpi } from "./ChartsComponents/kpi";
import { BarChartDashboard } from "./ChartsComponents/barChartDashboard";
import { DonutChartDashboard } from "./ChartsComponents/donnutChartDashboard";
import { RecentSales } from "./ChartsComponents/recentSales";
import { TopProducts } from "./ChartsComponents/topProducts";
import { BestCustomers } from "./ChartsComponents/bestCustomers";
import { cn } from "@/lib/utils/twMerge";

export function DashboardContent() {
  const [globeExpanded, setGlobeExpanded] = useState(false);

  return (
    <div
      className={cn(
        "w-full h-full relative p-2 pt-20 xl:pl-20 xl:py-3 xl:pr-5 z-10",
        globeExpanded ? "pointer-events-none" : "bg-background-main/50",
      )}
    >
      <AnimatePresence mode="wait">
        {!globeExpanded && (
          <motion.div
            className="w-full h-full"
            key="dashboard-content"
            initial={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <StaggerContainer
              staggerDelay={0.12}
              delayChildren={0.2}
              className="flex gap-4 w-full h-full relative flex-col pointer-events-none"
            >
              <div className="flex-center gap-4 flex-center-column sm:grid sm:grid-cols-2 lg:grid-cols-4 pointer-events-none">
                <StaggerItem
                  fadeDirection="up"
                  className="w-full pointer-events-auto"
                >
                  <Kpi
                    title="Receita Total"
                    percent={58.32}
                    value={48321.49}
                    successDisplay
                    isMoney
                  />
                </StaggerItem>
                <StaggerItem
                  fadeDirection="up"
                  className="w-full pointer-events-auto"
                >
                  <Kpi
                    title="Descontos Concedidos"
                    percent={-67.7}
                    value={12808.42}
                    successDisplay
                    isMoney
                  />
                </StaggerItem>
                <StaggerItem
                  fadeDirection="up"
                  className="w-full pointer-events-auto"
                >
                  <Kpi
                    title="Ticket Médio"
                    percent={-108.7}
                    value={1184.63}
                    isMoney
                  />
                </StaggerItem>
                <StaggerItem
                  fadeDirection="up"
                  className="w-full pointer-events-auto"
                >
                  <Kpi
                    title="Total de Clientes"
                    percent={7.7}
                    value={35}
                    successDisplay
                  />
                </StaggerItem>
              </div>

              <div className="w-full flex gap-4 flex-center-column flex-1 min-h-180 md:min-h-100 overflow-hidden pointer-events-none md:grid md:grid-cols-2 extraxl:grid-cols-3">
                <StaggerItem
                  fadeDirection="up"
                  className="w-full h-full pointer-events-auto extraxl:col-span-2"
                >
                  <BarChartDashboard
                    onGlobeExpand={() => setGlobeExpanded(true)}
                  />
                </StaggerItem>
                <StaggerItem
                  fadeDirection="up"
                  className="w-full h-full pointer-events-auto"
                >
                  <DonutChartDashboard />
                </StaggerItem>
              </div>

              <div className="w-full h-full flex gap-4 flex-center-column lg:grid lg:grid-cols-3 pointer-events-none">
                <StaggerItem
                  fadeDirection="up"
                  className="w-full h-full pointer-events-auto"
                >
                  <RecentSales />
                </StaggerItem>
                <StaggerItem
                  fadeDirection="up"
                  className="w-full h-full pointer-events-auto"
                >
                  <TopProducts />
                </StaggerItem>
                <StaggerItem
                  fadeDirection="up"
                  className="w-full h-full pointer-events-auto"
                >
                  <BestCustomers />
                </StaggerItem>
              </div>
            </StaggerContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {globeExpanded && (
          <motion.button
            key="close-globe"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={() => setGlobeExpanded(false)}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-90 flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-neon/10 border border-blue-neon/40 text-blue-neon text-sm backdrop-blur-sm hover:bg-blue-neon/20 transition-colors cursor-pointer pointer-events-auto"
          >
            ← Voltar ao dashboard
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
