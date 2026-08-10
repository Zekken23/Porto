"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Progress bar scroll di bagian atas halaman */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-primary-400 via-secondary-400 to-tertiary-400"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
