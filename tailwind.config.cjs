/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/*.html', './client/**/*.{js,jsx}', './index.html'],
  daisyui: {
    themes: ['light', 'aquatic'],
  },
  // content: [
  //   'node_modules/daisyui/dist/**/*.js',
  //   'node_modules/react-daisyui/dist/**/*.js',
  // ],
  plugins: [require('daisyui')],
};
