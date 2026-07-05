import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        accent: "#C8F135",
        dark: "#0A0A0A",
        light: "#F2F2F2",
        secondary: "#888888",
        border: "#222222",
      },
      borderRadius: {
        "4xl": "48px",
        "5xl": "60px",
      },
    },
  },
  plugins: [],
};

export default config;
