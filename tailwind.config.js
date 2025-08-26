/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#D32F2F',
        'primary-black': '#121212',
        'primary-white': '#FFFFFF',
        'primary-gold': '#FFD700',
      },
      fontFamily: {
        'livvic': ['Livvic', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
