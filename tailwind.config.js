// TODO: this config file was deprecated with tailwind v4. This configuration should be migrated into global.css
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        primary: '#0976DC',
        offgray: '#f5f5f7',
        lightBorder: '#dce6e9',
        darkBorder: 'rgb(51, 51, 51)'
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-50% - var(--gap)/2))' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': {
              content: 'none'
            },
            'blockquote p:first-of-type::after': {
              content: 'none'
            }
          }
        }
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};
