"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import NameCycle from "./NameCycle";

const WORD = "LIMINAL".split("");

// each letter enters from an alternating offset — "broken lettering" settling
const letterVariants = {
  hidden: (i: number) => ({
    y: i % 2 === 0 ? "0.7em" : "-0.7em",
    x: (i - 3) * 6,
    opacity: 0,
    rotate: i % 2 === 0 ? 6 : -6,
    filter: "blur(10px)",
  }),
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    rotate: 0,
    filter: "blur(0px)",
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const slow = useTransform(sx, (v) => v * 0.6);
  const slowY = useTransform(sy, (v) => v * 0.6);
  const fast = useTransform(sx, (v) => v * -1.4);
  const fastY = useTransform(sy, (v) => v * -1.4);

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 40);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 40);
  };

  // scroll-driven exit
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pt-32"
    >
      {/* breathing copper aura, parallaxed */}
      <motion.div
        aria-hidden
        style={{ x: slow, y: slowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.22),transparent_65%)] blur-2xl"
      />

      {/* faint vertical guide lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="absolute left-[18%] top-0 h-full w-px bg-bone/[0.04]" />
        <div className="absolute left-[82%] top-0 h-full w-px bg-bone/[0.04]" />
      </div>

      {/* TOP: overline + index */}
      <motion.div
        style={{ opacity: heroFade }}
        className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-dust"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="text-copper">(01)</span> Design · Motion · UI/UX
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-right leading-relaxed"
        >
          EST. MMXXVI
          <br />
          <span className="text-bone/60">N 00.00 — W 00.00</span>
        </motion.div>
      </motion.div>

      {/* CENTER STACK */}
      <motion.div
        style={{ y: heroY, opacity: heroFade }}
        className="relative flex flex-1 flex-col justify-center"
      >
        {/* working-name cycle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-4 pl-1 font-mono text-xs uppercase tracking-[0.3em] text-dust md:mb-6"
        >
          <span className="text-bone/40">from a shortlist of thirteen — </span>
          <NameCycle />
        </motion.p>

        {/* GIANT WORDMARK */}
        <motion.h1
          aria-label="LIMINAL"
          initial="hidden"
          animate="show"
          transition={{ delayChildren: 1.1, staggerChildren: 0.06 }}
          style={{ x: fast, y: fastY }}
          className="font-struct leading-[0.8] tracking-tight text-bone"
        >
          <span className="flex flex-wrap">
            {WORD.map((ch, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className={`inline-block text-[24vw] leading-[0.78] md:text-[20vw] lg:text-[18vw] ${
                  i === 3 ? "text-copper" : ""
                }`}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* threshold line that draws across */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="my-6 h-px w-full origin-left bg-gradient-to-r from-copper via-rust to-transparent md:my-8"
        />

        {/* cormorant statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1 }}
          className="max-w-2xl self-end text-right font-display text-3xl font-light italic leading-tight text-bone/90 md:text-5xl"
        >
          Some things don’t have a name yet.
          <span className="mt-2 block text-copper">We work there.</span>
        </motion.p>
      </motion.div>

      {/* BOTTOM: tagline + scroll cue */}
      <motion.div
        style={{ opacity: heroFade }}
        className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-dust"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          Nothing is finished here.
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-8 w-px bg-gradient-to-b from-copper to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
