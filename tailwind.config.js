/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF6',
          100: '#F8F4EC',
          200: '#F0E9D9',
          300: '#E5DAC2',
        },
        beige: {
          100: '#E8D9BE',
          200: '#D9C3A3',
          300: '#C9AC85',
        },
        terracota: {
          50: '#FBF0EC',
          100: '#F0D4C8',
          400: '#B86F4F',
          500: '#A85E40',
          600: '#8E4F34',
          700: '#74402B',
        },
        brown: {
          300: '#6B4A3A',
          500: '#3B2921',
          700: '#2A1C16',
          900: '#1A110D',
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
