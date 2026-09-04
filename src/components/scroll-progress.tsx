"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.3,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-90 h-0.5 origin-left"
      data-scroll-progress
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-gold), var(--color-gold-bright))",
      }}
      aria-hidden="true"
    />
  );
}
