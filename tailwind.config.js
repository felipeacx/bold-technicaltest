/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#121E6C",
        secondary: "#EE424E",
        darkGray: "#606060",
        lightGray: "#F3F3F3",
        background: "#F6F4F9",
      },
    },
  },
  plugins: [],
}
