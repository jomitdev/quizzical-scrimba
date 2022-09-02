/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      karla: ["Karla", "sans-serif"],
    },
    colors: {
      purple: "#293264",
      lightPurple: "#4D5B9E",
      lightGray: "#F5F7FB",
      green: "#94D7A2",
      red: "#F8BCBC",
    },
  },
  plugins: [],
};
