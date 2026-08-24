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
        surface: {
          DEFAULT: "#FAFBFC",
          alt: "#F1F5F9",
          muted: "#E2E8F0",
        },
        court: {
          DEFAULT: "#1A56DB",
          light: "#3B82F6",
          dark: "#1E40AF",
          soft: "#EFF6FF",
        },
        tennis: {
          DEFAULT: "#BEF264",
          light: "#D9F99D",
          dark: "#65A30D",
          brand: "#CCFF00",
          muted: "#BEF26433",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          light: "#64748B",
        },
        charcoal: {
          DEFAULT: "#0F172A",
          50: "#334155",
          100: "#1E293B",
          200: "#0F172A",
          900: "#020617",
        },
        cream: "#FAFBFC",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(26, 86, 219, 0.08)",
        card: "0 8px 32px -8px rgba(15, 23, 42, 0.08)",
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
          "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(239,246,255,0.75) 45%, rgba(219,234,254,0.85) 100%)",
        "court-gradient":
          "linear-gradient(135deg, #1A56DB 0%, #2563EB 50%, #1E40AF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
