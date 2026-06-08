"use client";

import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-5 py-5 md:px-10">
        <a
          href="#top"
          className="font-struct text-xl tracking-brand text-bone transition-opacity hover:opacity-60"
        >
          LIMINAL
        </a>

        <div className="hidden gap-8 font-mono text-[11px] uppercase tracking-[0.25em] text-bone md:flex">
          <a href="#about" className="transition-colors hover:text-copper">
            About
          </a>
          <span className="text-bone/30">Work — soon</span>
          <a
            href="#about"
            className="transition-colors hover:text-copper"
            data-cursor="hover"
          >
            Let’s talk →
          </a>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone md:hidden">
          ☰
        </span>
      </nav>
    </motion.header>
  );
}
