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
        darkBorder: 'rgb(51, 51, 51)'
      },
      screens: {
        '5xl': '64rem'
      },
      backgroundImage: {
        'dark-pattern':
          'linear-gradient(to right,#000 0%,#000 50%,rgb(21, 21, 22) 75%,rgb(21, 21, 22) 100%)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class'
};
