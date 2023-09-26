/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,css}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#43A0F7',
        lightBorder: '#dce6e9',
        dark: 'rgb(26, 28, 33)',
        darkAccent: 'rgb(35, 36, 41)',
        darkBorder: 'rgb(46, 46, 46)'
      },
      screens: {
        '5xl': '64rem'
      },
      backgroundImage: {
        'dark-pattern':
          'linear-gradient(to right, #000 0%, #000 10%, #010409 50%, rgb(14, 17, 22) 75%, rgb(14, 17, 22) 100%)',
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
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')]
};
