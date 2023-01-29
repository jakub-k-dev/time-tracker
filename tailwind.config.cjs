const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: {
        main: "#ef233c",
        alt: "#d90429",
        text: "#303030",
      },
      secondary: {
        main: "#555555",
        alt: "#2b2d42",
        text: "#e1e1e1",
      },
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
