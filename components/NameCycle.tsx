"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAMES = [
  "VESSEL",
  "ADJACENT",
  "PENULT",
  "LACUNA",
  "VERGE",
  "PREMISE",
  "RIFT",
  "ERRANT",
  "HOLLOW",
  "NOUGHT",
  "BETWEEN",
  "PRAGMA",
  "LIMINAL",
];

export default function NameCycle() {
  const [i, setI] = useState(0);
  const settled = i >= NAMES.length - 1;

  useEffect(() => {
    if (settled) return;
    // decelerate: each step a little slower than the last
    const delay = 90 + i * 26;
    const t = setTimeout(() => setI((p) => p + 1), delay);
    return () => clearTimeout(t);
  }, [i, settled]);

  return (
    <span className="relative inline-block min-w-[7ch] align-baseline">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={i}
          initial={{ y: "0.5em", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.5em", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className={settled ? "text-copper" : "text-dust"}
        >
          {NAMES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
