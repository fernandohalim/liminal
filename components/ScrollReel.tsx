"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export default function ScrollReel() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPct(Math.round(v * 100)),
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-7 top-1/2 z-[96] hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] text-bone/40">
        00
      </span>
      <div className="relative h-44 w-px bg-bone/15">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0 bg-copper"
        />
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-copper">
        {pct.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
