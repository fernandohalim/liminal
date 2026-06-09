"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Project = {
  n: string;
  title: string; // PLACEHOLDER — rename to real project names
  tag: string;
  note: string;
  img: string; // PLACEHOLDER — replace later
  side: "left" | "right";
};

const PROJECTS: Project[] = [
  {
    n: "01",
    title: "Split-bill",
    tag: "Webapp · product design",
    note: "Playful · bouncy · social",
    img: "https://picsum.photos/seed/liminal-split/1600/1100?grayscale",
    side: "left",
  },
  {
    n: "02",
    title: "Notetaking",
    tag: "App · editorial UI",
    note: "Monospace · calm · precise",
    img: "https://picsum.photos/seed/liminal-notes/1600/1100?grayscale",
    side: "right",
  },
  {
    n: "03",
    title: "Expense tracker",
    tag: "Webapp · motion + system",
    note: "Gamey · tactile · rewarding",
    img: "https://picsum.photos/seed/liminal-expense/1600/1100?grayscale",
    side: "left",
  },
];

function ProjectCard({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const right = p.side === "right";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${right ? "md:justify-end" : "md:justify-start"}`}
    >
      <div data-cursor="hover" className="group w-full md:w-[78%]">
        {/* image: clip-wipe in, parallax, hover scale */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
            <img
              src={p.img}
              alt=""
              className="h-full w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-copper/15 mix-blend-overlay" />
          <div className="absolute inset-0 bg-void/35 transition-opacity duration-500 group-hover:bg-void/10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-bone">
              View case — soon
            </span>
          </div>
        </div>

        {/* meta */}
        <div className="mt-5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] tracking-[0.3em] text-dust">
              {p.n}
            </span>
            <h3 className="font-display text-3xl font-light italic text-bone transition-colors duration-500 group-hover:text-copper md:text-5xl">
              {p.title}
            </h3>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-dust md:block">
            {p.note}
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-dust md:ml-[3.4rem]">
          {p.tag}
        </p>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative px-7 py-28 md:px-14 md:py-44">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-16 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-dust md:mb-24"
      >
        <span className="text-copper">(IV)</span>
        <span className="h-px w-16 bg-bone/20" />
        Selected work
      </motion.div>

      <div className="flex flex-col gap-24 md:gap-40">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-28 flex items-center justify-between border-t border-bone/10 pt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-dust md:mt-40"
      >
        <span>Case studies in progress</span>
        <span className="text-copper">becoming —</span>
      </motion.div>
    </section>
  );
}
