/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meridian: {
          DEFAULT: '#0F1E36',
          950: '#0A1424', // Primary Hover
          900: '#0F1E36', // Primary Brand Meridian Navy
          800: '#172B4D',
          700: '#1E3A66',
          600: '#274B80',
          500: '#325F9E',
          100: '#E9EFF7',
          50: '#F1F5F9',
        },
        slate: {
          900: '#1A202C',
          800: '#2D3748',
          700: '#4A5568', // Secondary
          600: '#4A5568',
          500: '#718096', // Muted text
          400: '#A0AEC0',
          300: '#CBD5E0',
          200: '#E2E8F0', // Border
          100: '#EDF2F7',
          50: '#F7FAFC',
        },
        cyan: {
          DEFAULT: '#00A3C4',
          700: '#007994',
          600: '#008DAA',
          500: '#00A3C4', // Electric Cyan Accent
          400: '#26C6DA',
          100: '#E0F7FA',
          50: '#F0FBFC',
        },
        emerald: {
          DEFAULT: '#10B981',
          700: '#047857',
          600: '#059669',
          500: '#10B981', // Success
          100: '#D1FAE5',
          50: '#ECFDF5',
        },
        canvas: {
          DEFAULT: '#F8FAFC',
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
        },
        card: '#FFFFFF',
        // Aliases for compatibility
        ivory: {
          DEFAULT: '#F8FAFC',
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
        },
        sand: {
          DEFAULT: '#F1F5F9',
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
        },
        forest: {
          DEFAULT: '#0F1E36',
          900: '#0A1424',
          800: '#0F1E36',
          700: '#172B4D',
          600: '#1E3A66',
          500: '#274B80',
          100: '#E9EFF7',
          50: '#F1F5F9',
        },
        charcoal: {
          DEFAULT: '#1A202C',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        olive: {
          DEFAULT: '#718096',
          700: '#4A5568',
          600: '#718096',
          500: '#718096',
          400: '#A0AEC0',
        },
        warmgrey: {
          DEFAULT: '#E2E8F0',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
        naturalgreen: {
          DEFAULT: '#10B981',
          700: '#047857',
          600: '#10B981',
          100: '#D1FAE5',
        },
        terracotta: {
          DEFAULT: '#00A3C4',
          500: '#00A3C4',
        },
        terracottared: {
          DEFAULT: '#EF4444',
          700: '#B91C1C',
          600: '#DC2626',
          100: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Space Grotesk"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 2px rgba(15, 30, 54, 0.04)',
        'warm': '0 4px 12px rgba(15, 30, 54, 0.05), 0 1px 2px rgba(15, 30, 54, 0.03)',
        'warm-lg': '0 10px 24px rgba(15, 30, 54, 0.08), 0 2px 6px rgba(15, 30, 54, 0.04)',
        'warm-xl': '0 20px 40px rgba(15, 30, 54, 0.12), 0 4px 10px rgba(15, 30, 54, 0.05)',
        'meridian': '0 8px 20px rgba(15, 30, 54, 0.15)',
        'cyan-glow': '0 0 15px rgba(0, 163, 196, 0.35)',
      },
    },
  },
  plugins: [],
}
