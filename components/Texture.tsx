"use client";

export default function Texture() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[88]">
      {/* moving scanlines */}
      <div className="scanlines absolute inset-0 opacity-[0.06]" />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 45%, transparent 52%, rgba(14,12,11,0.65) 100%)",
        }}
      />
      {/* projector flicker */}
      <div className="flickerlayer absolute inset-0 mix-blend-overlay" />
    </div>
  );
}
