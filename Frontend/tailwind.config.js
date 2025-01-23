/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        navbar:["Playwrite NG Modern", "cursive"],
        landing:["Bowlby One", "sans-serif"],
        marquee:["Kurale", "serif"],
        feature:["Kurale", "serif"],
      }
    },
  },
  plugins: [],
}

