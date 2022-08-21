/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    backgroundImage: {
      'hero-pattern': "url('./assets/pattern.jpg')",
    },
    gridTemplateRows: {
      // Complex site-specific row configuration
      'n-layout': '70px auto 70px',
    },
  },
  plugins: [],
};
