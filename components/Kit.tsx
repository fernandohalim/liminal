"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const child = { hidden: { y: "110%" }, show: { y: "0%" } };

export function Words({
  text,
  className = "",
  accent,
}: {
  text: string;
  className?: string;
  accent?: string;
}) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={child}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block ${accent && w === accent ? "text-copper" : ""}`}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
