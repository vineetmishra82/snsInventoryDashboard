/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn-lightBlue': '#0F7BF0',
        'btn-darkBlue' : '#130FF0',
        'btn-firozi' : '#0FECF0'
      },

    },
  },
  plugins: [],
}

