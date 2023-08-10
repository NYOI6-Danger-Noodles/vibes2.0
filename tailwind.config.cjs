/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/*.html', './client/**/*.{js,jsx}', './index.html'],
  daisyui: {
    themes: ['light', 'aquatic'],
    theme: {
      fontfamily: {
        Caprasimo: ['Caprasimo'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
