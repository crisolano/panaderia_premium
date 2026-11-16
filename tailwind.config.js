/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crema: {
          50: '#FDFBF6',
          100: '#F8F1E3',
          200: '#F0E6D2',
          300: '#E5D7BE',
        },
        maiz: {
          50: '#FDF8EC',
          100: '#FAEEC8',
          200: '#F0DEA0',
          300: '#E5B84B',
          400: '#D4A536',
          500: '#B8902A',
        },
        cafe: {
          300: '#7A5A48',
          500: '#493326',
          700: '#382519',
          900: '#271811',
        },
        terracota: {
          50: '#FBF0EC',
          100: '#F0D4C8',
          300: '#D08F6F',
          400: '#B86F4F',
          500: '#A85E40',
          600: '#8E4F34',
        },
        verde: {
          50: '#F1F4ED',
          100: '#DCE5D0',
          300: '#8A9970',
          400: '#65734A',
          500: '#55613E',
          600: '#474F33',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
