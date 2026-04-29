import { motion } from "framer-motion";

export function ActivePageAnimation() {
  return (
    <>
      <motion.div layoutId="active-bar" className="absolute h-full w-1 top-0 left-0 bg-blue-neon rounded-r-2xl" />
      <motion.div
        layoutId="active-bg"
        className="absolute inset-0 bg-linear-to-r from-blue-neon/30 to-primary-blue-light"
      />
    </>
  );
}
