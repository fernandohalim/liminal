"use client";

import { motion } from "framer-motion";
import { Magnetic, Words } from "./Kit";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Read.cv", href: "#" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-between px-7 py-24 md:px-14 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-dust"
      >
        <span className="text-copper">(V)</span>
        <span className="h-px w-16 bg-bone/20" />
        Contact
      </motion.div>

      <div className="flex flex-col gap-12 py-16">
        <h2 className="font-display text-4xl font-light italic leading-[1.05] text-bone md:text-7xl lg:text-8xl">
          <Words text="Tell us what doesn’t" />
          <br />
          <Words text="have a name yet." accent="yet." />
        </h2>

        <Magnetic strength={0.3} className="w-fit">
          <a
            href="mailto:hello@liminal.studio"
            data-cursor="hover"
            className="group inline-flex items-baseline gap-4 font-display text-3xl font-light italic text-bone transition-colors duration-500 hover:text-copper md:text-5xl"
          >
            hello@liminal.studio
            <span className="font-mono text-base not-italic text-copper transition-transform duration-500 group-hover:translate-x-2">
              &rarr;
            </span>
          </a>
        </Magnetic>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-8 border-t border-bone/10 pt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dust md:flex-row md:items-end md:justify-between"
      >
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg italic tracking-normal text-bone">
            liminal
          </span>
          <span>Between states — est. MMXXVI</span>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {SOCIALS.map((s) => (
            <Magnetic key={s.label} strength={0.4} className="inline-block">
              <a
                href={s.href}
                data-cursor="hover"
                className="block transition-colors duration-300 hover:text-copper"
              >
                {s.label}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <span className="text-dust/60">&copy; MMXXVI</span>
          <a
            href="#top"
            data-cursor="hover"
            className="transition-colors duration-300 hover:text-copper"
          >
            Back to top &uarr;
          </a>
        </div>
      </motion.div>
    </section>
  );
}
