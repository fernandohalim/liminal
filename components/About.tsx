"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Magnetic, Words } from "./Kit";

// PLACEHOLDER — replace later. Portrait, textural studio/material detail.
const ABOUT_IMG = "https://picsum.photos/seed/liminal-form/1400/1800?grayscale";

const PAIRS = [
  [
    "motion",
    "stillness",
    "https://picsum.photos/seed/liminal-p1/1200/300?grayscale",
  ],
  [
    "the brief",
    "the need",
    "https://picsum.photos/seed/liminal-p2/1200/300?grayscale",
  ],
  [
    "expected",
    "unimagined",
    "https://picsum.photos/seed/liminal-p3/1200/300?grayscale",
  ],
  [
    "finished",
    "becoming",
    "https://picsum.photos/seed/liminal-p4/1200/300?grayscale",
  ],
];

const reveal = {
  hidden: { y: "115%", skewY: 4 },
  show: { y: "0%", skewY: 0 },
};

function Line({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        variants={reveal}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const [hoveredPair, setHoveredPair] = useState<number | null>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ["start 0.8", "end 0.6"],
  });

  return (
    <section id="about" className="relative px-7 py-28 md:px-14 md:py-44">
      {/* chapter index */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-16 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-dust md:mb-28"
      >
        <span className="text-copper">(II)</span>
        <span className="h-px w-16 bg-bone/20" />
        Synopsis
      </motion.div>

      {/* manifesto + inline still */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.16 }}
          className="font-display text-4xl font-light leading-[1.12] text-bone md:col-span-8 md:text-7xl"
        >
          <Line className="italic">Some things don’t</Line>
          <Line className="pl-[8vw] italic">have a name yet.</Line>
          <Line className="mt-6 text-copper">We work there.</Line>
        </motion.div>

        <div ref={imgRef} className="md:col-span-4 md:mt-8">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <motion.img
              src={ABOUT_IMG}
              alt=""
              style={{ y: imgY }}
              className="absolute inset-0 h-[120%] w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-copper/15 mix-blend-overlay" />
            <div className="absolute inset-0 bg-void/25" />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
              fig. 01 — the threshold
            </span>
          </div>
        </div>
      </div>

      {/* clinical mid paragraph — word reveal */}
      <p className="ml-auto mt-24 max-w-xl font-mono text-sm leading-relaxed text-dust md:mt-32">
        <Words
          text="We don’t arrive at answers. We inhabit the questions long enough to make something true. The studio lives in the space between disciplines — design, motion, and the part of a brief no one wrote down."
          accent="true."
        />
      </p>

      {/* core belief — pull quote, line reveal */}
      <motion.blockquote
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.12 }}
        className="mt-32 font-display text-3xl font-light italic leading-tight text-bone md:mt-48 md:text-6xl"
      >
        {[
          "We exist in the space between",
          "the expected & the unimagined —",
          "where nothing is finished,",
          "everything is becoming.",
        ].map((line, li) => (
          <Line
            key={li}
            className={
              li === 1 ? "pl-[10vw] text-dust" : li === 3 ? "pl-[6vw]" : ""
            }
          >
            {line.split(" ").map((word, wi) => {
              const start = (li * 4 + wi) / 20;
              const end = start + 0.08;
              const opacity = useTransform(
                quoteProgress,
                [start, end],
                [0.2, 1],
              );
              return (
                <motion.span
                  key={wi}
                  style={{ opacity }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              );
            })}
          </Line>
        ))}
      </motion.blockquote>

      {/* what we work between — magnetic rows w/ animated underline */}
      <div className="mt-32 md:mt-48">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.35em] text-dust">
          What we work between
        </p>
        <div className="flex flex-col">
          {PAIRS.map(([a, b, img], i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              onMouseEnter={() => setHoveredPair(i)}
              onMouseLeave={() => setHoveredPair(null)}
              className={`group relative isolate flex w-full items-baseline overflow-hidden border-b border-bone/10 px-3 py-7 md:py-10 ${
                i % 2 ? "justify-end text-right" : "justify-start"
              }`}
            >
              {/* image overlay — fades in like Services background */}
              <AnimatePresence>
                {hoveredPair === i && (
                  <motion.span
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 -z-10 font-display text-[8rem] font-light text-bone/[0.04] select-none md:text-[12rem]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                )}
              </AnimatePresence>

              <Magnetic
                strength={0.18}
                className="inline-flex items-baseline gap-4 font-display text-3xl font-light italic md:gap-8 md:text-5xl"
              >
                <span className="text-bone transition-colors duration-500 group-hover:text-copper">
                  {a}
                </span>
                <span className="font-mono text-[10px] not-italic tracking-[0.3em] text-dust transition-all duration-500 group-hover:tracking-[0.5em] group-hover:text-bone/80">
                  between
                </span>
                <span className="text-dust transition-colors duration-500 group-hover:text-bone">
                  {b}
                </span>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>

      {/* closing strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-28 flex items-center justify-between border-t border-bone/10 pt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-dust md:mt-40"
      >
        <span>Services · Work · Contact</span>
      </motion.div>
    </section>
  );
}
