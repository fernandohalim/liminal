"use client";

const CORNERS = [
  "left-3 top-3 md:left-5 md:top-5",
  "right-3 top-3 md:right-5 md:top-5",
  "left-3 bottom-3 md:left-5 md:bottom-5",
  "right-3 bottom-3 md:right-5 md:bottom-5",
];

export default function Frame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[85]">
      {/* hairline frame */}
      <div className="absolute inset-3 border border-bone/10 md:inset-5" />

      {/* corner crosshairs */}
      {CORNERS.map((pos, i) => (
        <div
          key={i}
          className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${pos}`}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-copper/60" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-copper/60" />
        </div>
      ))}
    </div>
  );
}
