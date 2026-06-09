"use client";

import { motion } from "framer-motion";
import { Magnetic } from "./Kit";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 1.2 }}
      className="fixed inset-x-0 top-0 z-[95] mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-6 py-5 md:px-12">
        {/* TODO: replace with the real liminal logo (SVG/PNG) */}
        <Magnetic strength={0.25} className="inline-block">
          <a
            href="#top"
            className="font-display text-2xl font-light italic lowercase tracking-wide text-bone transition-opacity hover:opacity-60"
          >
            liminal
          </a>
        </Magnetic>

        <div className="hidden items-center gap-10 font-mono text-[11px] uppercase tracking-[0.3em] text-bone md:flex">
          <Magnetic strength={0.4} className="inline-block">
            <a
              href="#about"
              data-cursor="hover"
              className="block transition-colors hover:text-copper"
            >
              About
            </a>
          </Magnetic>
          <Magnetic strength={0.4} className="inline-block">
            <a
              href="#services"
              data-cursor="hover"
              className="block transition-colors hover:text-copper"
            >
              Services
            </a>
          </Magnetic>
          <Magnetic strength={0.4} className="inline-block">
            <a
              href="#work"
              data-cursor="hover"
              className="block transition-colors hover:text-copper"
            >
              Work
            </a>
          </Magnetic>
          <Magnetic strength={0.4} className="inline-block">
            <a
              href="#contact"
              data-cursor="hover"
              className="block transition-colors hover:text-copper"
            >
              Contact &rarr;
            </a>
          </Magnetic>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone md:hidden">
          Menu
        </span>
      </nav>
    </motion.header>
  );
}
