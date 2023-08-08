/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/*.html', './client/**/*.{js,jsx}', './index.html'],
  daisyui: {
    themes: ['light', 'aquatic'],
  },
  plugins: [require('daisyui')],
};
