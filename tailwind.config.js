/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      playfair: ['"Playfair Display"', "serif"],
      "open-sans": ['"Open Sans"', "sans-serif"],
    },
  },
  plugins: [],
};
