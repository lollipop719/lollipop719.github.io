/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8FBFF',
          100: '#E8F4FD',
          200: '#D4E9F7',
          300: '#C0DEF1',
          400: '#3498DB',
          500: '#2C3E50',
          600: '#1B2631',
        },
        accent: {
          300: '#9B59B6',
          400: '#3498DB',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
