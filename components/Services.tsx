"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const SERVICES = [
  {
    n: "01",
    name: "UI/UX",
    outcome: "Interfaces that feel inevitable.",
    desc: "Research, flows, and systems for products people actually trust.",
    img: "https://picsum.photos/seed/liminal-uiux/1000/1250?grayscale",
  },
  {
    n: "02",
    name: "Web",
    outcome: "Sites that hold the room.",
    desc: "Designed and built — fast, tactile, unmistakably yours.",
    img: "https://picsum.photos/seed/liminal-web/1000/1250?grayscale",
  },
  {
    n: "03",
    name: "Illustration",
    outcome: "A visual language of your own.",
    desc: "Marks, characters, and worlds that carry a brand.",
    img: "https://picsum.photos/seed/liminal-illustration/1000/1250?grayscale",
  },
  {
    n: "04",
    name: "Motion",
    outcome: "Movement that means something.",
    desc: "Identity in motion — interfaces, brand films, micro-interactions.",
    img: "https://picsum.photos/seed/liminal-motion/1000/1250?grayscale",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const px = useSpring(mvx, { stiffness: 60, damping: 18 });
  const py = useSpring(mvy, { stiffness: 60, damping: 18 });
  const ix = useTransform(px, (v) => v * 40);
  const iy = useTransform(py, (v) => v * 40);

  return (
    <section
      id="services"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mvx.set((e.clientX - r.left) / r.width - 0.5);
        mvy.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative flex min-h-screen flex-col justify-center px-7 py-8 md:px-14 md:py-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-dust md:mb-8"
      >
        <span className="text-copper">(III)</span>
        <span className="h-px w-16 bg-bone/20" />
        What we make
      </motion.div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
        {/* left — services + descriptions */}
        <div className="flex flex-col md:col-span-7">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(i)}
              data-cursor="hover"
              className="group border-b border-bone/10 py-4 md:py-6"
            >
              <div className="flex items-baseline gap-5">
                <span
                  className={`font-mono text-[11px] tracking-[0.3em] transition-colors duration-500 ${
                    active === i ? "text-copper" : "text-dust"
                  }`}
                >
                  {s.n}
                </span>
                <h3
                  className={`font-display text-4xl font-light italic transition-all duration-500 group-hover:translate-x-2 md:text-6xl ${
                    active === i ? "text-copper" : "text-bone"
                  }`}
                >
                  {s.name}
                </h3>
              </div>
              <p className="mt-3 max-w-md pl-[2.4rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-dust">
                {s.outcome}
                <span className="mt-1 block normal-case tracking-normal text-dust/70">
                  {s.desc}
                </span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* right — fixed parallax image */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-28">
            <div className="relative h-[80vh] w-full overflow-hidden bg-ashen">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ x: ix, y: iy, scale: 1.1 }}
                  className="absolute inset-0"
                >
                  <img
                    src={SERVICES[active].img}
                    alt=""
                    className="h-full w-full object-cover grayscale"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-copper/15 mix-blend-overlay" />
              <div className="pointer-events-none absolute inset-0 bg-void/20" />
              <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
                {SERVICES[active].n} — {SERVICES[active].name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
