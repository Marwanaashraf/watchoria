/** @type {import('tailwindcss').Config} */
module.exports = {
  // /*.{js,jsx,ts,tsx} => every folder end {js,jsx,ts,tsx}
  // /** zero or more
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#DC2626",
        secondry: "#0177D2",
        light_rate: "#EAB308",
        dark_rate: "#F6CA2A",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  darkMode: "class",
};
