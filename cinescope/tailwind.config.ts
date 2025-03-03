import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enables dark mode support with the 'class' strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "#FFD700", // Custom gold accent
        purple: {
          700: "#6B21A8",
          900: "#4C1D95",
        },
        pink: {
          600: "#DB2777",
          800: "#9D174D",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
