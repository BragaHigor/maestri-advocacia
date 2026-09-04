"use client";

import { motion } from "framer-motion";

import {
  headingTwoClass,
  introClass,
  kickerClass,
  sectionHeadingClass,
} from "@/styles/classes";
import { fadeUp, maskUp, staggerContainer, VIEWPORT } from "@/lib/motion";

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className={sectionHeadingClass}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.p className={kickerClass} variants={fadeUp}>
        {kicker}
      </motion.p>
      <motion.h2 className={headingTwoClass} variants={maskUp}>
        {title}
      </motion.h2>
      {description ? (
        <motion.p className={introClass} variants={fadeUp}>
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
