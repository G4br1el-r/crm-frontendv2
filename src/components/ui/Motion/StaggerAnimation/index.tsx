"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

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

const buildContainerVariants = (
  staggerDelay: number,
  delayChildren: number,
) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

const DIRECTION_MAP: Record<FadeDirection, { x?: number; y?: number }> = {
  down: { y: -1 },
  up: { y: 1 },
  left: { x: 1 },
  right: { x: -1 },
  none: {},
};

const buildItemVariants = (direction: FadeDirection, fadeValue: number) => {
  const offset = DIRECTION_MAP[direction];
  return {
    hidden: {
      opacity: 0,
      ...(offset.x != null ? { x: offset.x * fadeValue } : {}),
      ...(offset.y != null ? { y: offset.y * fadeValue } : {}),
    },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

const ITEM_TRANSITION = { duration: 0.4, ease: "easeOut" } as const;

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className,
}: StaggerContainerProps) {
  const variants = useMemo(
    () => buildContainerVariants(staggerDelay, delayChildren),
    [staggerDelay, delayChildren],
  );
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  fadeDirection = "up",
  fadeValue = 20,
  className,
}: StaggerItemProps) {
  const variants = useMemo(
    () => buildItemVariants(fadeDirection, fadeValue),
    [fadeDirection, fadeValue],
  );
  return (
    <motion.div
      variants={variants}
      transition={ITEM_TRANSITION}
      className={className}
    >
      {children}
    </motion.div>
  );
}
