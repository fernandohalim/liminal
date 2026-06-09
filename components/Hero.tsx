"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// PLACEHOLDER — replace later. Wide, atmospheric, threshold-like.
const HERO_IMG =
  "https://picsum.photos/seed/liminal-threshold/2400/1500?grayscale";

const TITLE = "liminal".split("");

const letterVar = {
  hidden: { y: "0.85em", opacity: 0, filter: "blur(18px)", skewY: 7 },
  show: { y: 0, opacity: 1, filter: "blur(0px)", skewY: 0 },
};

function Letter({
  char,
  index,
  total,
  spread,
}: {
  char: string;
  index: number;
  total: number;
  spread: MotionValue<number>;
}) {
  const center = (total - 1) / 2;
  const factor = index - center;
  const x = useTransform(spread, [0, 1], [0, factor * 48]); // letters fly apart on scroll

  return (
    <motion.span
      variants={letterVar}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ x, display: "inline-block" }}
    >
      <motion.span
        className="inline-block"
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: index * 0.28,
        }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // pointer → springed normalized values
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const px = useSpring(mvx, { stiffness: 50, damping: 18 });
  const py = useSpring(mvy, { stiffness: 50, damping: 18 });

  const gx = useTransform(px, (v) => v * 40);
  const gy = useTransform(py, (v) => v * 26);
  const tiltY = useTransform(px, (v) => v * -10);
  const tiltX = useTransform(py, (v) => v * 8);
  const credX = useTransform(px, (v) => v * -22);
  const imgPX = useTransform(px, (v) => v * -16);

  // scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const spread = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const overlayFade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const titleBlur = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["blur(0px)", "blur(7px)"],
  );

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mvx.set((e.clientX - r.left) / r.width - 0.5);
    mvy.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mvx.set(0);
    mvy.set(0);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* BACKGROUND IMAGE — Ken Burns + parallax + duotone + light sweep */}
      <motion.div
        style={{ x: imgPX }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.img
          src={HERO_IMG}
          alt=""
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1.14, opacity: 1 }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imgY }}
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-copper/15 mix-blend-overlay" />
        <div className="absolute inset-0 bg-rust/10 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-transparent to-void/30" />
        <motion.div
          className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-bone/10 to-transparent"
          animate={{ x: ["0vw", "175vw"] }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            repeatDelay: 5,
          }}
        />
      </motion.div>

      {/* TOP CREDITS */}
      <motion.div
        style={{ opacity: overlayFade, x: credX }}
        className="pointer-events-none absolute inset-x-0 top-16 flex items-start justify-center px-7 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/70 md:top-0 md:p-14"
      >
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center gap-4 leading-relaxed"
        >
          Design studio
          <span className="text-bone/25">·</span>
          <span>Est. MMXXVI</span>
        </motion.span>
      </motion.div>

      {/* TITLE BLOCK */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 px-7 pb-12 md:px-14 md:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.45em] text-copper"
        >
          A studio between states
        </motion.p>

        <div style={{ perspective: 900 }}>
          <motion.h1
            aria-label="liminal"
            initial="hidden"
            animate="show"
            transition={{ delayChildren: 0.7, staggerChildren: 0.08 }}
            style={{
              x: gx,
              y: gy,
              rotateX: tiltX,
              rotateY: tiltY,
              filter: titleBlur,
              transformStyle: "preserve-3d",
            }}
            className="flex font-display text-[20vw] font-light italic leading-[0.82] tracking-tight text-bone md:text-[15vw] lg:text-[13vw]"
          >
            {TITLE.map((c, i) => (
              <Letter
                key={i}
                char={c}
                index={i}
                total={TITLE.length}
                spread={spread}
              />
            ))}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-9 flex flex-col gap-4 border-t border-bone/15 pt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/55 md:flex-row md:items-end md:justify-between"
        >
          <span className="max-w-sm leading-relaxed">
            UI/UX · Web · Illustration · Motion — for the space between the
            expected and the unimagined.
          </span>
          <span className="text-bone/40">Nothing is finished here.</span>
        </motion.div>
      </motion.div>

      {/* SCROLL CUE */}
      <motion.div
        style={{ opacity: overlayFade }}
        className="pointer-events-none absolute bottom-7 right-7 hidden flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 md:flex md:right-14"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-copper to-transparent"
        />
      </motion.div>
    </section>
  );
}
