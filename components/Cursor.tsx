"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        raf.current = null;
      });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[110]">
      <motion.div
        className="absolute h-1 w-1 rounded-full bg-copper"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* viewfinder: ring that morphs into a rotated square on hover */}
      <motion.div
        className="absolute border border-bone/40 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 50 : 26,
          height: hovering ? 50 : 26,
          borderRadius: hovering ? "1px" : "50%",
          rotate: hovering ? 45 : 0,
          borderColor: hovering ? "#B87333" : "rgba(240,235,227,0.4)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      />
    </div>
  );
}
