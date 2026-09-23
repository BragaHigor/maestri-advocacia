"use client";

import { motion } from "framer-motion";

import { useSectionEntrance } from "@/hooks/use-section-entrance";

import {
  headingTwoClass,
  introClass,
  kickerClass,
  sectionHeadingClass,
} from "@/styles/classes";
import { fadeUp, maskUp, staggerContainer } from "@/lib/motion";

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  const { modo, entrada } = useSectionEntrance();

  return (
    <motion.div
      className={sectionHeadingClass}
      key={`${modo}-1`} {...entrada(staggerContainer(0.12))}
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
