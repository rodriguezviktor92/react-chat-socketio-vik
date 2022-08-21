/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    backgroundImage: {
      'hero-pattern': "url('./assets/pattern.jpg')",
      'dark-pattern': "url('./assets/pattern-dark.jpg')",
    },
    gridTemplateRows: {
      // Complex site-specific row configuration
      'n-layout': '70px auto 70px',
    },
  },
  plugins: [],
};
