import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#161B22",
        parchment: "#FAF6EE",
        plasma: "#F3ECDC",
        crimson: {
          DEFAULT: "#A31621",
          deep: "#7A0F1A",
          soft: "#E8B4B8",
        },
        antigenA: "#2E6F6E",
        antigenB: "#C97A2B",
        navy: "#1B2A4A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        cells: "radial-gradient(circle, rgba(163,22,33,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        cells: "18px 18px",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
