import type { Transition, Variants } from "framer-motion";

export const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

export const VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -15% 0px",
} as const;

export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.975 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export const maskUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
