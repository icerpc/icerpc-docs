/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: 'var(--primary-color)',
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
          },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in-up': 'fade-in-up 0.5s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'), require('flowbite/plugin')]
};
