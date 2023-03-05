/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors:{
            'theme-green' : '#c9efc7',
            'theme-dark' : '#141414',
            'theme-dark2' : '#252525'
        }
      },
    minHeight: {
      '1/2': '50%',
      '3/4': '75%',
  }
    },
    plugins: [],
  }