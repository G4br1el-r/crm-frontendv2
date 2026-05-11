"use client";

import { motion } from "motion/react";

/**
 * Overlay de carregamento exibido na primeira vez que o globo é aberto.
 * Deve ser renderizado dentro de um <AnimatePresence> com uma `key`.
 */
export function GlobeLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-background-main/90 backdrop-blur-sm pointer-events-auto"
      aria-busy="true"
    >
      <output
        className="relative block h-14 w-14"
        aria-label="Preparando visão geográfica"
      >
        <div className="absolute inset-0 rounded-full bg-secondary-blue/10 blur-lg" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-blue shadow-[0_0_14px_#73feff]" />
        <div className="absolute inset-0 animate-spin">
          <div className="absolute inset-0 rounded-full border border-secondary-blue/25" />
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </output>
      <span className="text-secondary-blue/80 text-sm tracking-[0.2em] uppercase">
        Preparando visão geográfica
      </span>
    </motion.div>
  );
}
