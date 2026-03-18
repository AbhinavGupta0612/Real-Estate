/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        red: {
          50: "#fff1f1",
          100: "#ffe0e0",
          500: "#e63946",
          600: "#c1121f",
          700: "#9d0208",
        },
        cream: "#faf8f5",
        warm: "#f5f0eb",
      },
    },
  },
  plugins: [],
}