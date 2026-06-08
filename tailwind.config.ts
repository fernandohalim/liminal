import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0E0C0B",
        ashen: "#1A1714",
        ember: "#221F1C",
        bone: "#F0EBE3",
        dust: "#7A736C",
        copper: "#B87333",
        rust: "#8B4513",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        struct: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      letterSpacing: {
        brand: "0.35em",
        ultra: "0.5em",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        breathe: "breathe 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
