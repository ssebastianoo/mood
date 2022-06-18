/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      transitionDuration: {
        '30': '30ms',
      }
    },
  },
  plugins: [],
};
