import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
         keyframes: {
        'marquee-left': {
          '0%':   { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-right': {
          '0%':   { transform: 'translate3d(-50%,0,0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
           floatSquares: {
          "0%": { transform: "translate(0,0)", opacity: "0.5" },
          "50%": { opacity: "0.3" },
          "100%": { transform: "translate(-60px,-60px)", opacity: "0.7" },
        },
        floatSquaresDown: {
          "0%": { transform: "translate(0,0)", opacity: "0.5" },
          "50%": { opacity: "0.3" },
          "100%": { transform: "translate(60px,60px)", opacity: "0.7" },
        },
         jump: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
      },
      animation: {
        'marquee-left':  'marquee-left var(--marquee-duration,30s) linear infinite',
        'marquee-right': 'marquee-right var(--marquee-duration,30s) linear infinite',
         'floatup': "floatSquares 4s linear infinite",
        'floatdown': "floatSquaresDown 4s linear infinite",
         'jump': 'jump 1.2s infinite ease-in-out',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        poppins: ['Poppins', 'sans-serif'],
        krona: ['"Krona One"', 'sans-serif'],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;
