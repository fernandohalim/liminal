"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";

const WORDS = "between · becoming · liminal · threshold · ";

export default function KineticBand() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(
    useTransform(velocity, [-3000, 0, 3000], [-7, 0, 7]),
    { stiffness: 200, damping: 40 }
  );

  const run = WORDS.repeat(8);

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-bone/10 py-10 md:py-16"
    >
      <motion.div style={{ skewX: skew }} className="flex flex-col gap-1 md:gap-3">
        {/* filled row — drifts left */}
        <motion.div
          className="flex w-max whitespace-nowrap font-display text-6xl font-light italic leading-none text-bone/90 md:text-[8rem]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 38 }}
        >
          <span>{run}</span>
          <span>{run}</span>
        </motion.div>

        {/* outlined row — drifts right */}
        <motion.div
          className="flex w-max whitespace-nowrap font-display text-6xl font-light italic leading-none text-transparent md:text-[8rem]"
          style={{ WebkitTextStroke: "1px rgba(240,235,227,0.3)" }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 46 }}
        >
          <span>{run}</span>
          <span>{run}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
