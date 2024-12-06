/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D2691E',  // A warm "chocolate brown" color for the main accent
        secondary: '#F4A460',  // A lighter "sandy brown" color for contrast
        highlight: '#FFF8DC',  // A soft "cornsilk" color for light backgrounds
      }
    },
  },
  plugins: [],
};
