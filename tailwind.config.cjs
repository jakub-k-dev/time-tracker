const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#9999ff",
          alt: "#6666dd",
          text: "#303030",
        },
        secondary: {
          main: "#555555",
          alt: "#2b2d42",
          text: "#e1e1e1",
        },
      },
    },
  },
  plugins: [],
};
