import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
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
          // 👇 começa em -50% e vai até 0%
          '0%':   { transform: 'translate3d(-50%,0,0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
      },
      animation: {
        'marquee-left':  'marquee-left var(--marquee-duration,30s) linear infinite',
        'marquee-right': 'marquee-right var(--marquee-duration,30s) linear infinite',
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
