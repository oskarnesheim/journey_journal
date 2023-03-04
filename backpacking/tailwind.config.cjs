/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
            'theme-green' : '#c9efc7'
        }
      },
    minHeight: {
      '1/2': '50%',
      '3/4': '75%',
  }
    },
    plugins: [],
  }