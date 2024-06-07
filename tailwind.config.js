/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      },
      spacing: {
        '128': '32rem',
        '256': '64rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

