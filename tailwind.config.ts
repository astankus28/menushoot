import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6EE",
        charcoal: "#1C1A17",
        brown: "#3D2B1F",
        terracotta: "#C4622D",
        "terra-light": "#E8845A",
        gold: "#C49A3C",
        "gold-light": "#E8C96A",
        sage: "#7A8C6E",
        muted: "#8A7E72",
        "warm-white": "#FDF9F3",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
