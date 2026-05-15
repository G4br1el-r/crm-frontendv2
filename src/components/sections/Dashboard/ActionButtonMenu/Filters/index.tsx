"use client";

import { motion } from "motion/react";
import { ViewDashboard } from "./ViewDashboard";
import { IntervalPeriodDashboard } from "./IntervalPeriodDashboard";
import { CalendarDashboard } from "./CalendarDashboard";

export function FiltersDashboard() {
  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, delay: 0.15 }}
      className="flex flex-col w-full h-full py-6 px-4 gap-6"
    >
      <ViewDashboard />
      <IntervalPeriodDashboard />
      <CalendarDashboard />
    </motion.div>
  );
}
