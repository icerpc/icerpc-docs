/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#43A0F7',
        lightBorder: '#dce6e9',
        darkBorder: '#31363C'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
