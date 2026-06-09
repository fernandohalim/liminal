"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const SERVICES = [
  {
    n: "01",
    name: "UI/UX",
    outcome: "Interfaces that feel inevitable.",
    desc: "Research, flows, and systems for products people actually trust.",
    img: "https://picsum.photos/seed/liminal-uiux/900/1100?grayscale",
  },
  {
    n: "02",
    name: "Web",
    outcome: "Sites that hold the room.",
    desc: "Designed and built — fast, tactile, unmistakably yours.",
    img: "https://picsum.photos/seed/liminal-web/900/1100?grayscale",
  },
  {
    n: "03",
    name: "Illustration",
    outcome: "A visual language of your own.",
    desc: "Marks, characters, and worlds that carry a brand.",
    img: "https://picsum.photos/seed/liminal-illustration/900/1100?grayscale",
  },
  {
    n: "04",
    name: "Motion",
    outcome: "Movement that means something.",
    desc: "Identity in motion — interfaces, brand films, micro-interactions.",
    img: "https://picsum.photos/seed/liminal-motion/900/1100?grayscale",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 150, damping: 20 });
  const py = useSpring(y, { stiffness: 150, damping: 20 });

  return (
    <section
      id="services"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseLeave={() => setActive(null)}
      className="relative isolate px-7 py-28 md:px-14 md:py-44"
    >
      {/* changing background — active service photo, blurred + washed */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={`bg-${active}`}
            className="pointer-events-none absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={SERVICES[active].img}
              alt=""
              className="h-full w-full scale-110 object-cover opacity-20 blur-2xl grayscale"
            />
            <div className="absolute inset-0 bg-copper/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-void/45" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-16 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-dust md:mb-24"
      >
        <span className="text-copper">(III)</span>
        <span className="h-px w-16 bg-bone/20" />
        What we make
      </motion.div>

      {/* cursor-following preview */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            className="pointer-events-none fixed z-[70] hidden md:block"
            style={{ left: px, top: py, x: "-50%", y: "-50%" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-64 w-48 overflow-hidden lg:h-80 lg:w-60">
              <img
                src={SERVICES[active].img}
                alt=""
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-copper/20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-void/15" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActive(i)}
            data-cursor="hover"
            className="group flex flex-col gap-3 border-b border-bone/10 py-7 md:flex-row md:items-baseline md:gap-8 md:py-9"
          >
            <span className="font-mono text-[11px] tracking-[0.3em] text-dust md:w-16">
              {s.n}
            </span>
            <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-5xl font-light italic text-bone transition-all duration-500 group-hover:translate-x-3 group-hover:text-copper md:text-7xl">
                {s.name}
              </h3>
              <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-dust transition-colors duration-500 group-hover:text-bone/80">
                {s.outcome}
                <span className="mt-1 block normal-case tracking-normal text-dust/70">
                  {s.desc}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
