/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      '1/2': '50vw',
    },
    extend: {
      boxShadow: {
        '3xl': '4px 4px 4px rgba(0, 0, 0, 0.5)',
      },
      transitionDuration: {
        '30': '30ms',
      },
      colors: {
        purple: {
          light: "#6858CE",
          DEFAULT: '#A277FF',
          dark: "#1E1E1E"
        },
        turquoise: "#1566B0",
        yellow: "#FFCA85",
        red: "#FF6767",
        orange: {
          light: "#F9C16E",
          dark: "#FF6767"
        },
      },
    },
  },
  plugins: [],
};
