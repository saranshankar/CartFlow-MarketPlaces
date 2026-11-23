/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F4ED',
          50: '#FDFCF9',
          100: '#F7F4ED',
          200: '#EFE9DE',
        },
        sand: {
          DEFAULT: '#EDE7DC',
          50: '#FAF8F5',
          100: '#EDE7DC',
          200: '#E1D9CA',
          300: '#D5CBB8',
        },
        forest: {
          DEFAULT: '#245343',
          900: '#112A22',
          800: '#183D32', // Primary Brand Deep Forest Green
          700: '#245343', // Primary Action Forest Green
          600: '#2F6753',
          500: '#3D826A',
          100: '#E5EFEA',
          50: '#F0F6F3',
        },
        terracotta: {
          DEFAULT: '#C87552',
          700: '#A95B3B',
          600: '#B86745',
          500: '#C87552', // Accent Terracotta
          400: '#D98967',
          100: '#F8ECE7',
          50: '#FCF5F2',
        },
        beige: {
          DEFAULT: '#D8C8A8',
          600: '#B8A37C',
          500: '#D8C8A8',
          100: '#F5F1E8',
        },
        charcoal: {
          DEFAULT: '#292A26',
          900: '#1E1F1C',
          800: '#292A26', // Primary text
          700: '#3D3E3A',
        },
        olive: {
          DEFAULT: '#77796F',
          700: '#5F6057',
          600: '#77796F', // Secondary text
          500: '#8E9085',
          400: '#A8AAA0',
        },
        warmgrey: {
          DEFAULT: '#E1DED5',
          200: '#E1DED5', // Borders
          100: '#ECE9E2',
        },
        naturalgreen: {
          DEFAULT: '#397653',
          700: '#2C5E41',
          600: '#397653', // Success
          100: '#E9F3ED',
        },
        terracottared: {
          DEFAULT: '#B94C43',
          700: '#9B3931',
          600: '#B94C43', // Error
          100: '#F8ECEB',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(41, 42, 38, 0.05)',
        'warm': '0 4px 16px rgba(41, 42, 38, 0.06), 0 1px 3px rgba(41, 42, 38, 0.04)',
        'warm-lg': '0 12px 32px rgba(41, 42, 38, 0.08), 0 2px 6px rgba(41, 42, 38, 0.04)',
        'warm-xl': '0 20px 48px rgba(41, 42, 38, 0.12), 0 4px 12px rgba(41, 42, 38, 0.06)',
      },
    },
  },
  plugins: [],
}
