"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Words } from "./Kit";

// PLACEHOLDER — replace later. Between-motion-and-stillness imagery.
const QUOTE_IMG =
  "https://picsum.photos/seed/liminal-stillness/2400/1500?grayscale";

export default function QuoteBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
    >
      {/* image wipes up into view, then parallaxes */}
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.img
          src={QUOTE_IMG}
          alt=""
          style={{ y }}
          className="h-full w-full scale-125 object-cover grayscale"
        />
        <div className="absolute inset-0 bg-copper/15 mix-blend-overlay" />
        <div className="absolute inset-0 bg-void/65" />
      </motion.div>

      <blockquote className="max-w-4xl px-8 text-center font-display text-3xl font-light italic leading-[1.2] text-bone md:text-5xl lg:text-6xl">
        <Words
          text="In the threshold between motion and stillness, between what a brief asks and what it actually needs."
          accent="needs."
        />
      </blockquote>
    </section>
  );
}
