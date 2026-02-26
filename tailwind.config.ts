import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#0A1F44",
        },
        accent: {
          blue: "#2F80ED",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B7C3",
        },
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        hero: "4.5rem",
        section: "3rem",
        subheading: "1.5rem",
        body: "1.125rem",
        small: "0.875rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-overlay": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
