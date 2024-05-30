/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      mantis: {
        50: "#f6faf3",
        100: "#e9f5e3",
        200: "#d3eac8",
        300: "#afd89d",
        400: "#82bd69",
        500: "#61a146",
        600: "#4c8435",
        700: "#3d692c",
        800: "#345427",
        900: "#2b4522",
        950: "#13250e",
      },
      gray: {
        50: "#f6f7f6",
        100: "#e3e6e1",
        200: "#c6ccc3",
        300: "#a2aa9e",
        400: "#848e80",
        500: "#626d5f",
        600: "#4e564b",
        700: "#40473e",
        800: "#363b34",
        900: "#2f332e",
        950: "#181b18",
      },
      white: "#fff",
      black: "#000",
    },
  },
  plugins: [],
};
