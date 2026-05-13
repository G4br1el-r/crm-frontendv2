"use client";

import { SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils/twMerge";
import { DashboardView } from "@/@types/dashboar.types";

interface ActionButtonMenuProps {
  view: DashboardView;
  onChange: (view: DashboardView) => void;
}

const VIEWS: { value: DashboardView; label: string }[] = [
  { value: "overview", label: "GERAL" },
  { value: "by-state", label: "ESTADOS" },
];

export function ActionButtonMenu({ view, onChange }: ActionButtonMenuProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-10 bg-background-main/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div
        onClick={() => !expanded && setExpanded(true)}
        animate={{
          width: expanded ? 240 : 48,
          height: expanded ? 320 : 48,
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
          {!expanded ? (
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
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.15 }}
              className="flex flex-col w-full h-full py-6 px-4 justify-center gap-2"
            >
              <div className="flex flex-col gap-2">
                <p className="text-white/60 text-[10px] uppercase tracking-widest px-2 mb-1">
                  Visualização
                </p>
                <div className="flex gap-2">
                  {VIEWS.map(({ value, label }) => {
                    const isActive = view === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => onChange(value)}
                        className={cn(
                          "w-full cursor-pointer text-left px-3 py-3 rounded-xs text-xs font-semibold tracking-widest uppercase transition-all duration-200",
                          isActive
                            ? "bg-secondary-blue text-background-main"
                            : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
