"use client";

import { motion } from "framer-motion";

import { faqItems } from "@/data/content";
import { fadeUpSmall, staggerContainer, VIEWPORT } from "@/lib/motion";

export function Faq() {
  return (
    <motion.div
      className="border-t border-paper/15"
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {faqItems.map((item) => (
        <motion.details
          className="group border-b border-paper/15"
          name="perguntas-frequentes"
          key={item.question}
          variants={fadeUpSmall}
        >
          <summary className="flex min-h-[60px] cursor-pointer list-none items-start justify-between gap-6 py-[24px] font-heading text-[clamp(17px,1.8vw,20px)] leading-[1.4] font-normal text-paper transition-colors marker:hidden hover:text-gold-bright [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              className="shrink-0 font-body text-[26px] leading-[0.9] font-normal text-gold-bright transition-transform duration-300 ease-fluid group-open:rotate-135"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="pr-8 pb-7 text-[16.5px] leading-[1.74] text-paper/75">
            {item.answer}
          </p>
        </motion.details>
      ))}
    </motion.div>
  );
}
