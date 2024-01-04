/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './screens/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#005C4A',
          DEFAULT: '#006E58',
          light: '#008F73',
          lighter: '#EAF2EF',
        },
        black: {
          DEFAULT: '#121420',
        },
        white: {
          700: '#F6F6F6',
          DEFAULT: '#FFFFFF',
          600: '#D6D6D6',
        },
        gray: {
          DEFAULT: '#AAAAAA',
        },
        error: {
          DEFAULT: '#E11D48',
        },
        success: {
          DEFAULT: '#93DFC4',
        },
      },
    },
  },
  plugins: [],
};