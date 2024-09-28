import tail from "tailwindcss-safe-area";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
        50: "#effaff",
        100: "#daf3ff",
        200: "#bdebff",
        300: "#90dfff",
        400: "#5ccbfe",
        500: "#36affb",
        600: "#2092f0",
        700: "#197fe6",
        800: "#1a62b3",
        900: "#1b548d",
        950: "#153356",
      },
      neutral: {
        50: "#f5f8f8",
        100: "#edf1f2",
        200: "#dee5e7",
        300: "#c9d4d8",
        400: "#b2c0c7",
        500: "#9eabb6",
        600: "#8895a3",
        700: "#737f8c",
        800: "#606a73",
        900: "#50575f",
        950: "#2f3337",
      },
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tail],
};
