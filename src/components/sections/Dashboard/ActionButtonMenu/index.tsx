"use client";

import { SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils/twMerge";
import { DashboardView } from "@/@types/dashboar.types";
import { FiltersDashboard } from "./Filters";

export function ActionButtonMenu() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {/* BACKGROUND */}
        {expanded && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-11 bg-background-main/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div
        onClick={() => !expanded && setExpanded(true)}
        animate={{
          width: expanded ? 270 : 48,
          height: expanded ? "auto" : 48,
        }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        whileHover={!expanded ? { scale: 1.1 } : undefined}
        style={{
          willChange: "width, height",
          borderRadius: expanded ? "1rem" : "50%",
        }}
        className={cn(
          "fixed top-4 right-4 z-20 bg-background-content border border-white/10 shadow-lg shadow-black/40 flex items-center justify-center overflow-hidden",
          expanded ? "cursor-auto" : "cursor-pointer ring-1 text-white/10",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            <FiltersDashboard />
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="flex items-center justify-center w-12 h-12 shrink-0"
            >
              <SlidersHorizontal className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
