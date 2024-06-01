import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      blue: {
        50: "#f5f7fa",
        100: "#eaeff4",
        200: "#cfdce8",
        300: "#a6bfd3",
        400: "#759cbb",
        500: "#5480a3",
        600: "#416788",
        700: "#35526f",
        800: "#2f475d",
        900: "#2c3e50",
        950: "#1d2834",
      },
    },
  },
  plugins: [],
};
