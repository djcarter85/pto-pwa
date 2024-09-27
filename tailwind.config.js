import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#197fe6",
          "primary-content": "#d1d5da",
          secondary: "#95a5a6",
          "secondary-content": "#080a0a",
          accent: "#18bc9c",
          "accent-content": "#000d09",
          neutral: "#343a40",
          "neutral-content": "#d2d4d5",
          "base-100": "#f8f9fa",
          "base-200": "#d8d9d9",
          "base-300": "#b8b9ba",
          "base-content": "#151515",
          info: "#3498db",
          "info-content": "#010811",
          success: "#18bc9c",
          "success-content": "#000d09",
          warning: "#f39c12",
          "warning-content": "#140900",
          error: "#e74c3c",
          "error-content": "#130201",
        },
      },
    ],
  },
};
