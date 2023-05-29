/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('https://image.tmdb.org/t/p/original//3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg')",
      },
    },
  },
  plugins: [],
};
