"use client";

import { motion } from "motion/react";

type FadeDirection = "down" | "up" | "left" | "right" | "none";

interface FadeAnimationProps {
  children: React.ReactNode;
  fadeDirection: FadeDirection;
  fadeValue: number;
  transitionDuration: number;
  className?: string;
}

export function FadeAnimation({
  children,
  className,
  fadeDirection,
  fadeValue,
  transitionDuration,
}: FadeAnimationProps) {
  const directionMap: Record<FadeDirection, { x?: number; y?: number }> = {
    down: { y: -fadeValue },
    up: { y: fadeValue },
    left: { x: fadeValue },
    right: { x: -fadeValue },
    none: { x: 0 },
  };

  const initial = { opacity: 0, ...directionMap[fadeDirection] };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: transitionDuration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
