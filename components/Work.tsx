"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Category = "featured" | "client" | "personal";

type Work = {
  title: string; // PLACEHOLDER — rename to real project names
  year: string;
  type: string;
  category: Category;
  img: string; // PLACEHOLDER — replace later
};

const WORKS: Work[] = [
  {
    title: "Split-bill",
    year: "2025",
    type: "Webapp",
    category: "featured",
    img: "https://picsum.photos/seed/liminal-split/1200/1500?grayscale",
  },
  {
    title: "Notetaking",
    year: "2025",
    type: "App",
    category: "featured",
    img: "https://picsum.photos/seed/liminal-notes/1200/1500?grayscale",
  },
  {
    title: "Expense tracker",
    year: "2024",
    type: "Webapp",
    category: "featured",
    img: "https://picsum.photos/seed/liminal-expense/1200/1500?grayscale",
  },
  {
    title: "Aperture",
    year: "2025",
    type: "Brand",
    category: "featured",
    img: "https://picsum.photos/seed/liminal-aperture/1200/1500?grayscale",
  },
  {
    title: "Studio identity",
    year: "2025",
    type: "Brand",
    category: "client",
    img: "https://picsum.photos/seed/liminal-identity/1200/1500?grayscale",
  },
  {
    title: "Editorial microsite",
    year: "2024",
    type: "Web",
    category: "client",
    img: "https://picsum.photos/seed/liminal-microsite/1200/1500?grayscale",
  },
  {
    title: "Launch film",
    year: "2024",
    type: "Motion",
    category: "client",
    img: "https://picsum.photos/seed/liminal-launchfilm/1200/1500?grayscale",
  },
  {
    title: "Commerce rebuild",
    year: "2023",
    type: "Web",
    category: "client",
    img: "https://picsum.photos/seed/liminal-commerce/1200/1500?grayscale",
  },
  {
    title: "Festival system",
    year: "2023",
    type: "Brand",
    category: "client",
    img: "https://picsum.photos/seed/liminal-festival/1200/1500?grayscale",
  },
  {
    title: "Type experiments",
    year: "2025",
    type: "Illustration",
    category: "personal",
    img: "https://picsum.photos/seed/liminal-type/1200/1500?grayscale",
  },
  {
    title: "Generative posters",
    year: "2024",
    type: "Illustration",
    category: "personal",
    img: "https://picsum.photos/seed/liminal-posters/1200/1500?grayscale",
  },
  {
    title: "Scroll study",
    year: "2023",
    type: "Interaction",
    category: "personal",
    img: "https://picsum.photos/seed/liminal-scroll/1200/1500?grayscale",
  },
  {
    title: "Shader sketches",
    year: "2023",
    type: "Motion",
    category: "personal",
    img: "https://picsum.photos/seed/liminal-shader/1200/1500?grayscale",
  },
  {
    title: "Field notes",
    year: "2022",
    type: "Editorial",
    category: "personal",
    img: "https://picsum.photos/seed/liminal-fieldnotes/1200/1500?grayscale",
  },
];

const FILTERS: Array<"all" | Category> = [
  "all",
  "featured",
  "client",
  "personal",
];
const PER_PAGE = 10;

export default function Work() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [page, setPage] = useState(1);
  const [hovered, setHovered] = useState<Work | null>(null);
  // pointer parallax for the preview image
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const px = useSpring(mvx, { stiffness: 60, damping: 18 });
  const py = useSpring(mvy, { stiffness: 60, damping: 18 });
  const ix = useTransform(px, (v) => v * 40);
  const iy = useTransform(py, (v) => v * 40);

  const filtered =
    filter === "all" ? WORKS : WORKS.filter((w) => w.category === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );

  const changeFilter = (f: "all" | Category) => {
    setFilter(f);
    setPage(1);
    setHovered(null);
  };

  return (
    <section
      id="work"
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
        <span className="text-copper">(IV)</span>
        <span className="h-px w-16 bg-bone/20" />
        Works
      </motion.div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
        {/* list */}
        <div className="md:col-span-7" onMouseLeave={() => setHovered(null)}>
          {/* filters */}
          <div className="mb-8 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em]">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => changeFilter(f)}
                data-cursor="hover"
                className={`transition-colors duration-300 ${
                  filter === f ? "text-copper" : "text-dust hover:text-bone"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-2 text-dust/60 md:flex">
              <span className="text-copper">&#9733;</span> featured
            </span>
          </div>

          {/* rows */}
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {pageItems.map((w) => (
                <motion.div
                  key={w.title}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHovered(w)}
                  data-cursor="hover"
                  className="group flex items-baseline justify-between gap-6 border-b border-bone/10 py-2.5"
                >
                  <span className="flex items-baseline gap-3">
                    {w.category === "featured" && (
                      <span className="text-sm text-copper">&#9733;</span>
                    )}
                    <span className="font-display text-2xl font-light italic text-bone transition-colors duration-300 group-hover:text-copper md:text-3xl">
                      {w.title}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-dust">
                    {w.year} &middot; {w.type}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* pagination */}
          <div className="mt-10 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.3em]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              data-cursor="hover"
              className={`transition-colors duration-300 ${
                safePage === 1 ? "text-dust/25" : "text-dust hover:text-copper"
              }`}
            >
              &larr; Prev
            </button>
            <span className="text-bone/60">
              {String(safePage).padStart(2, "0")} /{" "}
              {String(totalPages).padStart(2, "0")}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              data-cursor="hover"
              className={`transition-colors duration-300 ${
                safePage === totalPages
                  ? "text-dust/25"
                  : "text-dust hover:text-copper"
              }`}
            >
              Next &rarr;
            </button>
          </div>
        </div>

        {/* preview (right) */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-28">
            <div className="relative h-[80vh] w-full overflow-hidden bg-ashen">
              <AnimatePresence>
                {hovered ? (
                  <motion.div
                    key={hovered.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ x: ix, y: iy, scale: 1.1 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={hovered.img}
                      alt=""
                      className="h-full w-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-copper/15 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-void/20" />
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
                      {hovered.year} &middot; {hovered.type}
                    </span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.3em] text-dust"
                  >
                    Hover a work
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
