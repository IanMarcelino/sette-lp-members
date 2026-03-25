/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: '#1D2938',
        'navy-light': '#2A3A4D',
        'navy-deep': '#141D28',
        terracotta: '#97533E',
        'terracotta-light': '#B06A52',
        cream: '#FAF8F5',
        warm: '#F5F0EB',
        sand: '#E8E0D8',
        stone: '#9A8F85',
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
      },
    },
  },
  plugins: [],
}
