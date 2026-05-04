"use client";

import { motion } from "motion/react";

type FadeDirection = "down" | "up" | "left" | "right" | "none";

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number; // delay entre cada filho
  delayChildren?: number; // delay antes de começar a sequência
  className?: string;
}

interface StaggerItemProps {
  children: React.ReactNode;
  fadeDirection?: FadeDirection;
  fadeValue?: number;
  className?: string;
}

// Variants do container — não anima nada, só orquestra
const containerVariants = (staggerDelay: number, delayChildren: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// Variants do item — animate via herança do parent
const itemVariants = (direction: FadeDirection, fadeValue: number) => {
  const directionMap: Record<FadeDirection, { x?: number; y?: number }> = {
    down: { y: -fadeValue },
    up: { y: fadeValue },
    left: { x: fadeValue },
    right: { x: -fadeValue },
    none: {},
  };

  return {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay, delayChildren)}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, fadeDirection = "up", fadeValue = 20, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants(fadeDirection, fadeValue)}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
