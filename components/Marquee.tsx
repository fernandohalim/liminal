"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "BETWEEN STATES",
  "NOTHING IS FINISHED HERE",
  "AT THE EDGE OF FAMILIAR",
  "EVERYTHING IS BECOMING",
];

export default function Marquee() {
  // duplicate enough times for a seamless loop
  const row = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-bone/10 bg-ashen py-5 md:py-7"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 26 }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 font-struct text-2xl tracking-wide text-bone/70 md:text-4xl"
          >
            {t}
            <span className="text-copper">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
