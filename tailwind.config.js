/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js'
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
          'linear-gradient(to right,#010409 0%,#010409 50%,rgb(14, 17, 22) 75%,rgb(14, 17, 22) 100%)',
        'og-image': 'url("/images/og.png")'
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
  darkMode: 'class'
};
