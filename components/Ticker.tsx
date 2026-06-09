"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";

const LINE =
  "BETWEEN STATES — NOTHING IS FINISHED HERE — AT THE EDGE OF FAMILIAR — EVERYTHING IS BECOMING — ";

export default function Ticker() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 0, 2500], [8, 0, -8]), {
    stiffness: 200,
    damping: 40,
  });

  const run = LINE.repeat(6);
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-bone/10 bg-ashen/50 py-3.5"
    >
      <motion.div
        style={{ skewX: skew }}
        className="flex w-max whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.4em] text-dust"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 450 }}
      >
        <span>{run}</span>
        <span>{run}</span>
      </motion.div>
    </div>
  );
}
