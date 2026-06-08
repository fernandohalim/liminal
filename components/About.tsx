"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PAIRS = [
  ["MOTION", "STILLNESS"],
  ["THE BRIEF", "THE NEED"],
  ["EXPECTED", "UNIMAGINED"],
  ["FINISHED", "BECOMING"],
];

const reveal = {
  hidden: { y: "110%" },
  show: { y: "0%" },
};

function Line({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        variants={reveal}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const labelY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-5 py-28 md:px-10 md:py-44"
    >
      {/* vertical drifting side label */}
      <motion.span
        style={{ y: labelY }}
        className="vertical-rl absolute right-5 top-1/2 hidden font-mono text-[11px] uppercase tracking-[0.4em] text-dust lg:block"
      >
        Who we are — the threshold
      </motion.span>

      {/* section index */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-dust md:mb-24"
      >
        <span className="text-copper">(02)</span>
        <span className="h-px w-16 bg-bone/20" />
        Who we are
      </motion.div>

      {/* MANIFESTO — offset, line by line */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.12 }}
        className="font-display text-4xl font-light leading-[1.15] text-bone md:text-7xl"
      >
        <Line className="italic">Some things don’t</Line>
        <Line className="pl-[12vw] italic md:pl-[20vw]">have a name yet.</Line>
        <Line className="mt-6 text-copper md:mt-10">We work there.</Line>
      </motion.div>

      {/* mid paragraph — clinical mono contrast */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
        className="ml-auto mt-20 max-w-xl font-mono text-sm leading-relaxed text-dust md:mt-28"
      >
        In the threshold between motion and stillness, between what a brief
        asks and what it actually needs — that’s where{" "}
        <span className="text-bone">Liminal</span> lives. We don’t arrive at
        answers. We inhabit the questions long enough to make something{" "}
        <span className="text-copper">true</span>.
      </motion.p>

      {/* CORE BELIEF — full-width pull quote */}
      <motion.blockquote
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.1 }}
        className="mt-32 border-l border-copper/40 pl-5 font-display text-3xl font-light italic leading-tight text-bone md:mt-48 md:pl-10 md:text-6xl"
      >
        <Line>We exist in the space between</Line>
        <Line className="text-dust">the expected and the unimagined —</Line>
        <Line>
          where <span className="text-copper not-italic">nothing</span> is
          finished,
        </Line>
        <Line className="italic">everything is becoming.</Line>
      </motion.blockquote>

      {/* BETWEEN PAIRS — wild offset grid */}
      <div className="mt-32 md:mt-48">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-dust">
          What we work between
        </p>
        <div className="flex flex-col gap-8 md:gap-12">
          {PAIRS.map(([a, b], i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex items-center gap-5 font-struct text-5xl leading-none text-bone md:text-8xl ${
                i % 2 === 0 ? "justify-start" : "justify-end text-right"
              }`}
              data-cursor="hover"
            >
              <span className="transition-colors duration-300 group-hover:text-copper">
                {a}
              </span>
              <span className="font-mono text-xs tracking-[0.3em] text-dust">
                ←&nbsp;between&nbsp;→
              </span>
              <span className="text-dust transition-colors duration-300 group-hover:text-bone">
                {b}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* closing line toward future sections */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-32 flex items-center justify-between border-t border-bone/10 pt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dust md:mt-48"
      >
        <span>Services · Work · Contact</span>
        <span className="text-copper animate-pulse">becoming —</span>
      </motion.div>
    </section>
  );
}
