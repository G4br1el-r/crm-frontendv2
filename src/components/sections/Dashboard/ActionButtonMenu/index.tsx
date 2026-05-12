"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils/twMerge";

export function ActionButtonMenu() {
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
        whileHover={!expanded ? { scale: 1.06 } : undefined}
        style={{
          willChange: "width, height",
          borderRadius: expanded ? "1rem" : "50%",
        }}
        className={cn(
          "fixed top-4 right-4 z-20 bg-background-main border-blue-neon/50 border flex items-center justify-center overflow-hidden",
          expanded ? "cursor-auto" : "cursor-pointer",
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
              className="flex flex-col items-center justify-center text-white py-4 px-3 w-full h-full"
            ></motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
