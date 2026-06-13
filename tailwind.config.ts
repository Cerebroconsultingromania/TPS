import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#121212",
          50: "#2a2a2a",
          100: "#1f1f1f",
          200: "#1a1a1a",
          900: "#0a0a0a",
        },
        tennis: {
          DEFAULT: "#C8E632",
          light: "#D4FF00",
          dark: "#A8C420",
          muted: "#C8E63220",
        },
        cream: "#F5F5F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.7) 50%, rgba(18,18,18,0.85) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
